import {
  Injectable,
  Inject,
  Optional,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { randomInt } from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { normalizeBangladeshPhone } from './phone.util';
import { verifyPassword } from './password.util';
import { FirebaseVerifierService } from './firebase-verifier.service';
import { ProgramTrack, STUDENT_TRACKS } from './dto/update-profile.dto';

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
  isNewUser?: boolean;
  user: {
    id: string;
    guestId: string | null;
    role: Role;
    selectedClass: string;
    isGuest?: boolean;
  };
}

export interface AuthConfigResult {
  guestLoginEnabled: boolean;
}

export interface VerifyOtpResult {
  accessToken: string;
  user: AuthResponseUser;
  progressMigrated: boolean;
}

export interface FirebaseAuthResult {
  accessToken: string;
  isNewUser: boolean;
  user: {
    id: string;
    firebaseUid: string | null;
    phoneNumber: string | null;
    email: string | null;
    fullName: string | null;
    role: Role;
    selectedClass: string;
  };
}

@Injectable()
export class AuthService {
  private readonly otpStore = new Map<string, OtpEntry>();

  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Optional()
    @Inject(FirebaseVerifierService)
    private readonly firebaseVerifier?: FirebaseVerifierService,
  ) {}

  private cleanupExpiredOtps(): void {
    const now = Date.now();
    for (const [phone, entry] of this.otpStore.entries()) {
      if (entry.expiresAt <= now) {
        this.otpStore.delete(phone);
      }
    }
  }

  private assertOtpAllowed(
    user: { role: Role; passwordHash?: string | null } | null,
  ): void {
    if (user && (user.role !== Role.STUDENT || Boolean(user.passwordHash))) {
      throw new ForbiddenException(
        'Staff accounts must log in via the admin portal with a password',
      );
    }
  }

  normalizePhoneNumber(phone: string): string {
    try {
      return normalizeBangladeshPhone(phone);
    } catch {
      throw new BadRequestException('Invalid phone number format');
    }
  }

  normalizePhone(phone: string): string {
    return this.normalizePhoneNumber(phone);
  }

  static readonly GUEST_LOGIN_CONFIG_KEY = 'guest_login_enabled';

  private isEnvGuestLoginEnabled(): boolean {
    const raw = process.env.ENABLE_GUEST_LOGIN?.trim().toLowerCase();
    if (raw === 'false' || raw === '0' || raw === 'no' || raw === 'off') {
      return false;
    }
    return true;
  }

  async isGuestLoginEnabled(): Promise<boolean> {
    try {
      const systemConfigModel = (this.prisma as any).systemConfig;
      if (typeof systemConfigModel?.findUnique === 'function') {
        const record = await systemConfigModel.findUnique({
          where: { key: AuthService.GUEST_LOGIN_CONFIG_KEY },
        });
        if (record && typeof record.value === 'string') {
          const val = record.value.trim().toLowerCase();
          if (val === 'true' || val === '1') return true;
          if (val === 'false' || val === '0') return false;
        }
      }
    } catch {
      // Fallback to environment variable if table/query is unavailable
    }
    return this.isEnvGuestLoginEnabled();
  }

  async getAuthConfig(): Promise<AuthConfigResult> {
    const guestLoginEnabled = await this.isGuestLoginEnabled();
    return { guestLoginEnabled };
  }

  async updateAuthConfig(dto: { guestLoginEnabled: boolean }): Promise<AuthConfigResult> {
    if (typeof dto?.guestLoginEnabled !== 'boolean') {
      throw new BadRequestException('guestLoginEnabled must be a boolean');
    }
    const systemConfigModel = (this.prisma as any).systemConfig;
    if (typeof systemConfigModel?.upsert === 'function') {
      await systemConfigModel.upsert({
        where: { key: AuthService.GUEST_LOGIN_CONFIG_KEY },
        update: { value: String(dto.guestLoginEnabled) },
        create: {
          key: AuthService.GUEST_LOGIN_CONFIG_KEY,
          value: String(dto.guestLoginEnabled),
        },
      });
    } else {
      process.env.ENABLE_GUEST_LOGIN = String(dto.guestLoginEnabled);
    }
    return { guestLoginEnabled: dto.guestLoginEnabled };
  }

  async createGuestSession(guestId: string): Promise<GuestAuthResult> {
    const enabled = await this.isGuestLoginEnabled();
    if (!enabled) {
      throw new ForbiddenException('Guest login is currently disabled');
    }

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
    this.assertOtpAllowed(existingUser);

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
    this.assertOtpAllowed(existingUserWithPhone);

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
      this.assertOtpAllowed(guestUser);

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
          await this.mergeGuestDataIntoUser(guestUser.id, existingUserWithPhone.id);
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

  private async mergeGuestDataIntoUser(guestUserId: string, targetUserId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.examSession.updateMany({
        where: { userId: guestUserId },
        data: { userId: targetUserId },
      });

      await tx.eventLog.updateMany({
        where: { userId: guestUserId },
        data: { userId: targetUserId },
      });

      const guestMistakes = await tx.revisionMistake.findMany({
        where: { userId: guestUserId },
      });
      const existingMistakes = await tx.revisionMistake.findMany({
        where: { userId: targetUserId },
      });
      const existingQuestionIds = new Set(existingMistakes.map((m: { questionId: string }) => m.questionId));

      const newMistakes = guestMistakes
        .filter((m: { questionId: string }) => !existingQuestionIds.has(m.questionId))
        .map((m: { questionId: string; attemptCount: number; resolved: boolean }) => ({
          userId: targetUserId,
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
        where: { userId: guestUserId },
      });

      if (typeof (tx as any).studentBookmark?.findMany === 'function') {
        const guestBookmarks = await (tx as any).studentBookmark.findMany({
          where: { userId: guestUserId },
        });
        const existingBookmarks = await (tx as any).studentBookmark.findMany({
          where: { userId: targetUserId },
        });
        const existingKeys = new Set(
          existingBookmarks.map(
            (b: { itemId: string; itemType: string }) => `${b.itemType}:${b.itemId}`,
          ),
        );
        const newBookmarks = guestBookmarks
          .filter(
            (b: { itemId: string; itemType: string }) =>
              !existingKeys.has(`${b.itemType}:${b.itemId}`),
          )
          .map(
            (b: {
              itemId: string;
              itemType: string;
              titleBangla: string;
              subtitleBangla?: string | null;
              href: string;
            }) => ({
              userId: targetUserId,
              itemId: b.itemId,
              itemType: b.itemType,
              titleBangla: b.titleBangla,
              subtitleBangla: b.subtitleBangla ?? null,
              href: b.href,
            }),
          );

        if (newBookmarks.length > 0) {
          await (tx as any).studentBookmark.createMany({ data: newBookmarks });
        }
        await (tx as any).studentBookmark.deleteMany({
          where: { userId: guestUserId },
        });
      }

      if (typeof (tx as any).studentNote?.findMany === 'function') {
        const guestNotes = await (tx as any).studentNote.findMany({
          where: { userId: guestUserId },
        });
        const existingNotes = await (tx as any).studentNote.findMany({
          where: { userId: targetUserId },
        });
        const existingTopicIds = new Set(
          existingNotes.map((n: { topicId: string }) => n.topicId),
        );
        const newNotes = guestNotes
          .filter((n: { topicId: string }) => !existingTopicIds.has(n.topicId))
          .map((n: { topicId: string; content: string }) => ({
            userId: targetUserId,
            topicId: n.topicId,
            content: n.content,
          }));

        if (newNotes.length > 0) {
          await (tx as any).studentNote.createMany({ data: newNotes });
        }
        await (tx as any).studentNote.deleteMany({
          where: { userId: guestUserId },
        });
      }

      await tx.user.delete({
        where: { id: guestUserId },
      });
    });
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

  private formatProfileResponse(user: User) {
    return {
      id: user.id,
      guestId: user.guestId,
      firebaseUid: user.firebaseUid ?? null,
      phoneNumber: user.phoneNumber,
      email: user.email ?? null,
      fullName: user.fullName ?? null,
      role: user.role,
      selectedClass: user.selectedClass,
      isGuest: !user.phoneNumber && !!user.guestId,
    };
  }

  async updateProfile(
    userId: string,
    dto: { fullName?: string; selectedClass?: string },
  ) {
    const data: { fullName?: string | null; selectedClass?: string } = {};

    if (dto.selectedClass !== undefined) {
      if (!STUDENT_TRACKS.includes(dto.selectedClass as ProgramTrack)) {
        throw new BadRequestException(
          'selectedClass must be one of CLASS_6_8, SSC, HSC, ADMISSION, BCS',
        );
      }
      data.selectedClass = dto.selectedClass;
    }

    if (dto.fullName !== undefined) {
      const trimmed = dto.fullName.trim();
      if (trimmed.length > 80) {
        throw new BadRequestException('fullName must be 80 characters or fewer');
      }
      data.fullName = trimmed.length > 0 ? trimmed : null;
    }

    if (Object.keys(data).length === 0) {
      const existing = await this.getUserById(userId);
      return this.formatProfileResponse(existing);
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data,
    });

    return this.formatProfileResponse(updated);
  }

  async firebaseLogin(dto: {
    idToken: string;
    fullName?: string;
    selectedClass?: string;
    guestId?: string;
  }): Promise<FirebaseAuthResult> {
    if (dto.selectedClass !== undefined && !STUDENT_TRACKS.includes(dto.selectedClass as ProgramTrack)) {
      throw new BadRequestException(
        'selectedClass must be one of CLASS_6_8, SSC, HSC, ADMISSION, BCS',
      );
    }

    let requestedFullName: string | null = null;
    if (dto.fullName !== undefined) {
      const trimmed = dto.fullName.trim();
      if (trimmed.length > 80) {
        throw new BadRequestException('fullName must be 80 characters or fewer');
      }
      requestedFullName = trimmed.length > 0 ? trimmed : null;
    }

    if (!this.firebaseVerifier) {
      throw new UnauthorizedException('Firebase authentication is not configured');
    }

    const decoded = await this.firebaseVerifier.verifyIdToken(dto.idToken);

    let normalizedPhone: string | null = null;
    if (decoded.phoneNumber) {
      try {
        normalizedPhone = normalizeBangladeshPhone(decoded.phoneNumber);
      } catch {
        const trimmed = decoded.phoneNumber.trim();
        normalizedPhone = trimmed.length > 0 ? trimmed : null;
      }
    }

    const verifiedEmail =
      decoded.email && decoded.emailVerified === true
        ? decoded.email.trim().toLowerCase()
        : null;

    let user = await this.prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });

    if (!user && normalizedPhone) {
      user = await this.prisma.user.findUnique({
        where: { phoneNumber: normalizedPhone },
      });
    }

    if (!user && verifiedEmail) {
      user = await this.prisma.user.findUnique({
        where: { email: verifiedEmail },
      });
    }

    this.assertOtpAllowed(user);

    const trimmedGuestId = dto.guestId?.trim();
    let guestUser: User | null = null;
    if (trimmedGuestId) {
      guestUser = await this.prisma.user.findUnique({
        where: { guestId: trimmedGuestId },
      });
      this.assertOtpAllowed(guestUser);
    }

    const resolvedFullName = requestedFullName ?? (decoded.name?.trim() || null);
    let isNewUser = false;

    if (!user && guestUser) {
      // Upgrade guest account in place to permanent Firebase user
      isNewUser = !guestUser.fullName && !resolvedFullName;
      user = await this.prisma.user.update({
        where: { id: guestUser.id },
        data: {
          guestId: null,
          firebaseUid: decoded.uid,
          phoneNumber: normalizedPhone ?? guestUser.phoneNumber,
          email: verifiedEmail ?? guestUser.email,
          fullName: resolvedFullName
            ? resolvedFullName.slice(0, 80)
            : guestUser.fullName,
          selectedClass:
              (dto.selectedClass as ProgramTrack | undefined) ??
              guestUser.selectedClass,
        },
      });
    } else if (!user) {
      isNewUser = true;
      user = await this.prisma.user.create({
        data: {
          firebaseUid: decoded.uid,
          phoneNumber: normalizedPhone,
          email: verifiedEmail,
          fullName: resolvedFullName ? resolvedFullName.slice(0, 80) : null,
          role: Role.STUDENT,
          selectedClass: (dto.selectedClass as ProgramTrack | undefined) ?? 'SSC',
        },
      });
    } else {
      if (user.firebaseUid && user.firebaseUid !== decoded.uid) {
        throw new ConflictException(
          'Account is already linked to a different Firebase user',
        );
      }

      if (guestUser && guestUser.id !== user.id) {
        await this.mergeGuestDataIntoUser(guestUser.id, user.id);
      }

      const updateData: {
        firebaseUid?: string;
        phoneNumber?: string;
        email?: string;
        fullName?: string;
      } = {};

      if (!user.firebaseUid) {
        updateData.firebaseUid = decoded.uid;
      }
      if (normalizedPhone && !user.phoneNumber) {
        const existingByPhone = await this.prisma.user.findUnique({
          where: { phoneNumber: normalizedPhone },
        });
        if (existingByPhone && existingByPhone.id !== user.id) {
          throw new ConflictException(
            'Phone number is already associated with another account',
          );
        }
        updateData.phoneNumber = normalizedPhone;
      }
      if (verifiedEmail && !user.email) {
        const existingByEmail = await this.prisma.user.findUnique({
          where: { email: verifiedEmail },
        });
        if (existingByEmail && existingByEmail.id !== user.id) {
          throw new ConflictException(
            'Email is already associated with another account',
          );
        }
        updateData.email = verifiedEmail;
      }
      if (!user.fullName && resolvedFullName) {
        updateData.fullName = resolvedFullName.slice(0, 80);
      }

      if (Object.keys(updateData).length > 0) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: updateData,
        });
      }
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.role,
      isGuest: false,
    });

    return {
      accessToken,
      isNewUser,
      user: {
        id: user.id,
        firebaseUid: user.firebaseUid ?? null,
        phoneNumber: user.phoneNumber ?? null,
        email: user.email ?? null,
        fullName: user.fullName ?? null,
        role: user.role,
        selectedClass: user.selectedClass,
      },
    };
  }
}
