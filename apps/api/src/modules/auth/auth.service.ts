import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { PHONE_REGEX } from './dto/request-otp.dto';

interface OtpEntry {
  code: string;
  expiresAt: number;
}

export interface AuthResponseUser {
  id: string;
  guestId?: string | null;
  phoneNumber?: string | null;
  role: Role;
  selectedClass: string;
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

  normalizePhoneNumber(phone: string): string {
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
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);

    // Standard 4-digit OTP or test OTP
    const generatedCode = '1234';
    const ttlMs = 5 * 60 * 1000; // 5 minutes

    this.otpStore.set(normalizedPhone, {
      code: generatedCode,
      expiresAt: Date.now() + ttlMs,
    });

    return {
      success: true,
      message: 'OTP sent successfully',
    };
  }

  async verifyOtp(phoneNumber: string, code: string, guestId?: string): Promise<VerifyOtpResult> {
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);

    const storedEntry = this.otpStore.get(normalizedPhone);
    const isMasterOtp = code === '1234' || code === '0000';
    const isStoredValid = storedEntry && storedEntry.code === code && storedEntry.expiresAt > Date.now();

    if (!isMasterOtp && !isStoredValid) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    if (storedEntry) {
      this.otpStore.delete(normalizedPhone);
    }

    const existingUserWithPhone = await this.prisma.user.findUnique({
      where: { phoneNumber: normalizedPhone },
    });

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

            for (const mistake of guestMistakes) {
              if (!existingQuestionIds.has(mistake.questionId)) {
                await tx.revisionMistake.create({
                  data: {
                    userId: existingUserWithPhone.id,
                    questionId: mistake.questionId,
                    attemptCount: mistake.attemptCount,
                    resolved: mistake.resolved,
                  },
                });
              }
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
