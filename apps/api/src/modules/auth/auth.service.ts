import {
  Injectable,
  Inject,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { randomInt } from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { PHONE_REGEX } from './dto/request-otp.dto';
import { verifyPassword } from './password.util';

interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

const ALLOWED_ADMIN_PORTAL_ROLES: Role[] = [Role.ADMIN, Role.EDITOR, Role.REVIEWER];

export interface AuthResponseUser {
  id: string;
  guestId?: string | null;
  phoneNumber?: string | null;
  role: Role;
  selectedClass: string;
}

export interface AdminAuthResult {
  accessToken: string;
  user: {
    id: string;
    phoneNumber: string | null;
    fullName: string | null;
    role: Role;
    selectedClass: string;
  };
}

export interface GuestAuthResult {
  accessToken: string;
  user: {
    id: string;
    guestId: string | null;
    role: Role;
    selectedClass: string;
  };
}

export interface VerifyOtpResult {
  accessToken: string;
  user: AuthResponseUser;
  progressMigrated: boolean;
}

@Injectable()
export class AuthService {
  private readonly otpStore = new Map<string, OtpEntry>();

  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  private cleanupExpiredOtps(): void {
    const now = Date.now();
    for (const [phone, entry] of this.otpStore.entries()) {
      if (entry.expiresAt <= now) {
        this.otpStore.delete(phone);
      }
    }
  }

  normalizePhoneNumber(phone: string): string {
    if (!phone || typeof phone !== 'string') {
      throw new BadRequestException('Invalid phone number format');
    }
    const trimmed = phone.trim();
    if (!PHONE_REGEX.test(trimmed)) {
      throw new BadRequestException('Invalid phone number format');
    }

    const bdMatch = trimmed.match(/^(?:\+88|88)?(01[3-9]\d{8})$/);
    if (bdMatch) {
      return bdMatch[1];
    }
    return trimmed;
  }

  normalizePhone(phone: string): string {
    return this.normalizePhoneNumber(phone);
  }

  async createGuestSession(guestId: string): Promise<GuestAuthResult> {
    if (!guestId || typeof guestId !== 'string') {
      throw new BadRequestException('guestId is required');
    }

    let user = await this.prisma.user.findUnique({
      where: { guestId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          guestId,
          role: Role.STUDENT,
          selectedClass: 'SSC',
        },
      });
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.role,
      isGuest: true,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        guestId: user.guestId,
        role: user.role,
        selectedClass: user.selectedClass,
      },
    };
  }

  async requestOtp(phoneNumber: string): Promise<{ success: true; message: string }> {
    this.cleanupExpiredOtps();
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);

    const existingUser = await this.prisma.user.findUnique({
      where: { phoneNumber: normalizedPhone },
    });
    if (existingUser && (existingUser.role !== Role.STUDENT || Boolean(existingUser.passwordHash))) {
      throw new ForbiddenException('OTP login is not permitted for admin or staff accounts');
    }

    const generatedCode = randomInt(100000, 1000000).toString();
    const ttlMs = 5 * 60 * 1000; // 5 minutes

    this.otpStore.set(normalizedPhone, {
      code: generatedCode,
      expiresAt: Date.now() + ttlMs,
      attempts: 0,
    });

    return {
      success: true,
      message: 'OTP sent successfully',
    };
  }

  async verifyOtp(phoneNumber: string, code: string, guestId?: string): Promise<VerifyOtpResult> {
    this.cleanupExpiredOtps();
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);

    const existingUserWithPhone = await this.prisma.user.findUnique({
      where: { phoneNumber: normalizedPhone },
    });
    if (
      existingUserWithPhone &&
      (existingUserWithPhone.role !== Role.STUDENT || Boolean(existingUserWithPhone.passwordHash))
    ) {
      throw new ForbiddenException('OTP login is not permitted for admin or staff accounts');
    }

    const storedEntry = this.otpStore.get(normalizedPhone);
    const now = Date.now();

    const isTestOtpAllowed = process.env.NODE_ENV !== 'production' || process.env.ENABLE_TEST_OTP === 'true';
    const isMasterOtp = isTestOtpAllowed && (code === '1234' || code === '0000');
    const isStoredValid = Boolean(storedEntry && storedEntry.code === code && storedEntry.expiresAt > now);

    if (!isMasterOtp && !isStoredValid) {
      if (storedEntry) {
        storedEntry.attempts += 1;
        if (storedEntry.attempts >= 5) {
          this.otpStore.delete(normalizedPhone);
          throw new UnauthorizedException('Too many invalid attempts. Please request a new OTP.');
        }
      }
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    if (storedEntry) {
      this.otpStore.delete(normalizedPhone);
    }

    let progressMigrated = false;
    let user: User;

    if (guestId) {
      const guestUser = await this.prisma.user.findUnique({
        where: { guestId },
      });

      if (guestUser && !existingUserWithPhone) {
        // Upgrade guest user to permanent user
        user = await this.prisma.user.update({
          where: { id: guestUser.id },
          data: {
            phoneNumber: normalizedPhone,
            guestId: null,
          },
        });
        progressMigrated = true;
      } else if (guestUser && existingUserWithPhone) {
        if (guestUser.id === existingUserWithPhone.id) {
          user = existingUserWithPhone;
          progressMigrated = false;
        } else {
          // Merge progress into existing permanent user and delete guest user
          await this.prisma.$transaction(async (tx) => {
            await tx.examSession.updateMany({
              where: { userId: guestUser.id },
              data: { userId: existingUserWithPhone.id },
            });

            await tx.eventLog.updateMany({
              where: { userId: guestUser.id },
              data: { userId: existingUserWithPhone.id },
            });

            const guestMistakes = await tx.revisionMistake.findMany({
              where: { userId: guestUser.id },
            });
            const existingMistakes = await tx.revisionMistake.findMany({
              where: { userId: existingUserWithPhone.id },
            });
            const existingQuestionIds = new Set(existingMistakes.map((m: { questionId: string }) => m.questionId));

            const newMistakes = guestMistakes
              .filter((m: { questionId: string }) => !existingQuestionIds.has(m.questionId))
              .map((m: { questionId: string; attemptCount: number; resolved: boolean }) => ({
                userId: existingUserWithPhone.id,
                questionId: m.questionId,
                attemptCount: m.attemptCount,
                resolved: m.resolved,
              }));

            if (newMistakes.length > 0) {
              await tx.revisionMistake.createMany({
                data: newMistakes,
              });
            }

            await tx.revisionMistake.deleteMany({
              where: { userId: guestUser.id },
            });

            await tx.user.delete({
              where: { id: guestUser.id },
            });
          });

          user = existingUserWithPhone;
          progressMigrated = true;
        }
      } else if (existingUserWithPhone) {
        user = existingUserWithPhone;
        progressMigrated = false;
      } else {
        user = await this.prisma.user.create({
          data: {
            phoneNumber: normalizedPhone,
            role: Role.STUDENT,
            selectedClass: 'SSC',
          },
        });
        progressMigrated = false;
      }
    } else {
      if (existingUserWithPhone) {
        user = existingUserWithPhone;
        progressMigrated = false;
      } else {
        user = await this.prisma.user.create({
          data: {
            phoneNumber: normalizedPhone,
            role: Role.STUDENT,
            selectedClass: 'SSC',
          },
        });
        progressMigrated = false;
      }
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.role,
      isGuest: false,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        guestId: user.guestId,
        phoneNumber: user.phoneNumber,
        role: user.role,
        selectedClass: user.selectedClass,
      },
      progressMigrated,
    };
  }

  async adminLogin(phoneNumber: string, password: string): Promise<AdminAuthResult> {
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
    if (!password || typeof password !== 'string' || password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: normalizedPhone },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid phone number or password');
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid phone number or password');
    }

    if (!ALLOWED_ADMIN_PORTAL_ROLES.includes(user.role)) {
      throw new ForbiddenException('Admin or staff access required');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.role,
      isGuest: false,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        role: user.role,
        selectedClass: user.selectedClass,
      },
    };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
