import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BadRequestException, ConflictException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseVerifierService } from './firebase-verifier.service';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { getJwtSecret } from './strategies/jwt.strategy';

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: {
    user: {
      findUnique: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
    examSession: {
      updateMany: ReturnType<typeof vi.fn>;
    };
    revisionMistake: {
      findMany: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      createMany: ReturnType<typeof vi.fn>;
      deleteMany: ReturnType<typeof vi.fn>;
    };
    eventLog: {
      updateMany: ReturnType<typeof vi.fn>;
    };
    $transaction: ReturnType<typeof vi.fn>;
  };
  let jwtService: {
    sign: ReturnType<typeof vi.fn>;
  };
  let firebaseVerifier: {
    verifyIdToken: ReturnType<typeof vi.fn>;
  };

  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.useRealTimers();

    prisma = {
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      examSession: {
        updateMany: vi.fn(),
      },
      revisionMistake: {
        findMany: vi.fn(),
        create: vi.fn(),
        createMany: vi.fn().mockResolvedValue({ count: 1 }),
        deleteMany: vi.fn(),
      },
      eventLog: {
        updateMany: vi.fn(),
      },
      $transaction: vi.fn(async (cb: (tx: any) => Promise<any>) => {
        if (typeof cb === 'function') {
          return cb(prisma);
        }
        return Promise.all(cb);
      }),
    };

    jwtService = {
      sign: vi.fn().mockReturnValue('mock_jwt_token'),
    };

    firebaseVerifier = {
      verifyIdToken: vi.fn(),
    };

    authService = new AuthService(
      prisma as unknown as PrismaService,
      jwtService as unknown as JwtService,
      firebaseVerifier as unknown as FirebaseVerifierService,
    );
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.useRealTimers();
  });

  describe('createGuestSession', () => {
    it('should create a new guest user if not found and return accessToken with user', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({
        id: 'u-guest-1',
        guestId: 'guest-uuid-1',
        phoneNumber: null,
        fullName: null,
        role: 'STUDENT',
        selectedClass: 'SSC',
      });

      const result = await authService.createGuestSession('guest-uuid-1');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { guestId: 'guest-uuid-1' },
      });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          guestId: 'guest-uuid-1',
          role: 'STUDENT',
          selectedClass: 'SSC',
        },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'u-guest-1',
        role: 'STUDENT',
        isGuest: true,
      });
      expect(result).toEqual({
        accessToken: 'mock_jwt_token',
        user: {
          id: 'u-guest-1',
          guestId: 'guest-uuid-1',
          role: 'STUDENT',
          selectedClass: 'SSC',
        },
      });
    });

    it('should return existing guest user if found without creating duplicate', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u-guest-existing',
        guestId: 'guest-uuid-existing',
        phoneNumber: null,
        fullName: null,
        role: 'STUDENT',
        selectedClass: 'SSC',
      });

      const result = await authService.createGuestSession('guest-uuid-existing');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { guestId: 'guest-uuid-existing' },
      });
      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'u-guest-existing',
        role: 'STUDENT',
        isGuest: true,
      });
      expect(result.user.id).toBe('u-guest-existing');
    });

    it('throws ForbiddenException when guest login is disabled via env or SystemConfig', async () => {
      process.env.ENABLE_GUEST_LOGIN = 'false';
      await expect(authService.createGuestSession('guest-uuid-disabled')).rejects.toThrow(
        ForbiddenException,
      );

      process.env.ENABLE_GUEST_LOGIN = 'true';
      (prisma as any).systemConfig = {
        findUnique: vi.fn().mockResolvedValue({
          key: 'guest_login_enabled',
          value: 'false',
        }),
        upsert: vi.fn(),
      };

      const config = await authService.getAuthConfig();
      expect(config).toEqual({ guestLoginEnabled: false });
      await expect(authService.createGuestSession('guest-uuid-disabled')).rejects.toThrow(
        ForbiddenException,
      );

      // Admin enables guest login via updateAuthConfig
      (prisma as any).systemConfig.findUnique.mockResolvedValue({
        key: 'guest_login_enabled',
        value: 'true',
      });
      const updated = await authService.updateAuthConfig({ guestLoginEnabled: true });
      expect(updated).toEqual({ guestLoginEnabled: true });
      expect((prisma as any).systemConfig.upsert).toHaveBeenCalledWith({
        where: { key: 'guest_login_enabled' },
        update: { value: 'true' },
        create: { key: 'guest_login_enabled', value: 'true' },
      });
    });
  });

  describe('requestOtp', () => {
    it('should generate and send OTP for valid Bangladesh 11-digit phone number', async () => {
      const response = await authService.requestOtp('01712345678');
      expect(response).toEqual({
        success: true,
        message: 'OTP sent successfully',
      });
    });

    it('should accept E.164 phone number format with +880', async () => {
      const response = await authService.requestOtp('+8801812345678');
      expect(response.success).toBe(true);
    });

    it('should reject invalid phone format with BadRequestException', async () => {
      await expect(authService.requestOtp('invalid-phone')).rejects.toThrow(BadRequestException);
      await expect(authService.requestOtp('012345678')).rejects.toThrow(BadRequestException);
    });
  });

  describe('verifyOtp', () => {
    it('should throw UnauthorizedException if OTP code is invalid', async () => {
      await authService.requestOtp('01712345678');
      await expect(authService.verifyOtp('01712345678', '999999')).rejects.toThrow(UnauthorizedException);
    });

    it('should reject an expired OTP and accept it before expiration', async () => {
      vi.useFakeTimers();
      const phone = '01712345678';

      // Request OTP and extract actually issued code
      await authService.requestOtp(phone);
      const issuedCode = authService['otpStore'].get(authService['normalizePhone'](phone))?.code;
      expect(issuedCode).toBeDefined();
      expect(issuedCode).toMatch(/^\d{6}$/);

      // Before expiration, verifying with that exact code succeeds
      prisma.user.findUnique.mockResolvedValueOnce(null);
      prisma.user.create.mockResolvedValueOnce({
        id: 'u-valid-otp',
        guestId: null,
        phoneNumber: '01712345678',
        role: 'STUDENT',
        selectedClass: 'SSC',
      });

      const validResult = await authService.verifyOtp(phone, issuedCode!);
      expect(validResult.user.phoneNumber).toBe('01712345678');

      // Request new OTP to test expiration
      await authService.requestOtp(phone);
      const newIssuedCode = authService['otpStore'].get(authService['normalizePhone'](phone))?.code;
      expect(newIssuedCode).toBeDefined();

      // Advance clock past the 5-minute TTL (6 minutes)
      vi.advanceTimersByTime(6 * 60 * 1000);

      // Verify that verifying with the issued code rejects after expiration
      await expect(authService.verifyOtp(phone, newIssuedCode!)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should limit invalid attempts to 5 and invalidate OTP', async () => {
      await authService.requestOtp('01712345678');

      // 4 invalid attempts should throw Invalid or expired OTP
      for (let i = 0; i < 4; i++) {
        await expect(authService.verifyOtp('01712345678', '999999')).rejects.toThrow(
          'Invalid or expired OTP',
        );
      }

      // 5th invalid attempt should trigger rate limiting lockout
      await expect(authService.verifyOtp('01712345678', '999999')).rejects.toThrow(
        'Too many invalid attempts. Please request a new OTP.',
      );

      // 6th attempt should find no entry
      await expect(authService.verifyOtp('01712345678', '999999')).rejects.toThrow(
        'Invalid or expired OTP',
      );
    });

    it('should disallow static master OTPs in production mode', async () => {
      process.env.NODE_ENV = 'production';
      delete process.env.ENABLE_TEST_OTP;

      await authService.requestOtp('01712345678');

      // In production mode without stored matching code, 1234 / 0000 should be rejected
      await expect(authService.verifyOtp('01712345678', '1234')).rejects.toThrow(UnauthorizedException);
    });

    it('should accept standard master test OTP 1234 for new phone user without guestId in dev/test mode', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({
        id: 'u-new-phone',
        guestId: null,
        phoneNumber: '01712345678',
        fullName: null,
        role: 'STUDENT',
        selectedClass: 'SSC',
      });

      const result = await authService.verifyOtp('01712345678', '1234');

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          phoneNumber: '01712345678',
          role: 'STUDENT',
          selectedClass: 'SSC',
        },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'u-new-phone',
        role: 'STUDENT',
        isGuest: false,
      });
      expect(result).toEqual({
        accessToken: 'mock_jwt_token',
        user: {
          id: 'u-new-phone',
          guestId: null,
          phoneNumber: '01712345678',
          role: 'STUDENT',
          selectedClass: 'SSC',
        },
        progressMigrated: false,
      });
    });

    it('should login existing phone user when no guestId is provided', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u-existing-phone',
        guestId: null,
        phoneNumber: '01712345678',
        fullName: 'Rahim Khan',
        role: 'STUDENT',
        selectedClass: 'SSC',
      });

      const result = await authService.verifyOtp('01712345678', '1234');

      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(result.progressMigrated).toBe(false);
      expect(result.user.id).toBe('u-existing-phone');
    });

    it('should migrate guest user to permanent user when guestId provided and phone is new', async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // phone check
        .mockResolvedValueOnce({    // guest check
          id: 'u-guest-migrate',
          guestId: 'guest-abc-123',
          phoneNumber: null,
          role: 'STUDENT',
          selectedClass: 'SSC',
        });

      prisma.user.update.mockResolvedValue({
        id: 'u-guest-migrate',
        guestId: null,
        phoneNumber: '01712345678',
        role: 'STUDENT',
        selectedClass: 'SSC',
      });

      const result = await authService.verifyOtp('01712345678', '1234', 'guest-abc-123');

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'u-guest-migrate' },
        data: {
          phoneNumber: '01712345678',
          guestId: null,
        },
      });
      expect(result.progressMigrated).toBe(true);
      expect(result.user.id).toBe('u-guest-migrate');
      expect(result.user.phoneNumber).toBe('01712345678');
      expect(result.user.guestId).toBeNull();
    });

    it('should merge progress and batch insert only non-duplicate mistakes via createMany', async () => {
      const existingUser = {
        id: 'u-existing-phone',
        guestId: null,
        phoneNumber: '01712345678',
        role: 'STUDENT',
        selectedClass: 'SSC',
      };
      const guestUser = {
        id: 'u-guest-merge',
        guestId: 'guest-abc-456',
        phoneNumber: null,
        role: 'STUDENT',
        selectedClass: 'SSC',
      };

      prisma.user.findUnique
        .mockResolvedValueOnce(existingUser) // phone check
        .mockResolvedValueOnce(guestUser);   // guest check

      // Guest has mistakes for q-1 (already owned) and q-2 (new)
      prisma.revisionMistake.findMany
        .mockResolvedValueOnce([
          { id: 'm-1', questionId: 'q-1', attemptCount: 1, resolved: false },
          { id: 'm-2', questionId: 'q-2', attemptCount: 2, resolved: true },
        ])
        .mockResolvedValueOnce([
          { id: 'm-existing-1', questionId: 'q-1', attemptCount: 3, resolved: false },
        ]);

      const result = await authService.verifyOtp('01712345678', '1234', 'guest-abc-456');

      expect(prisma.examSession.updateMany).toHaveBeenCalledWith({
        where: { userId: 'u-guest-merge' },
        data: { userId: 'u-existing-phone' },
      });
      expect(prisma.eventLog.updateMany).toHaveBeenCalledWith({
        where: { userId: 'u-guest-merge' },
        data: { userId: 'u-existing-phone' },
      });

      // Crucial: createMany must be called with ONLY q-2 (not q-1)
      expect(prisma.revisionMistake.createMany).toHaveBeenCalledWith({
        data: [
          {
            userId: 'u-existing-phone',
            questionId: 'q-2',
            attemptCount: 2,
            resolved: true,
          },
        ],
      });

      expect(prisma.revisionMistake.deleteMany).toHaveBeenCalledWith({
        where: { userId: 'u-guest-merge' },
      });
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 'u-guest-merge' },
      });
      expect(result.progressMigrated).toBe(true);
      expect(result.user.id).toBe('u-existing-phone');
    });
  });

  describe('JWT Production Secret Guard', () => {
    it('should return dev secret when not in production and JWT_SECRET is unset', () => {
      delete process.env.JWT_SECRET;
      process.env.NODE_ENV = 'development';
      expect(getJwtSecret()).toBe('pori_jwt_secret_dev');
    });

    it('should throw an Error in production when JWT_SECRET is unset', () => {
      delete process.env.JWT_SECRET;
      process.env.NODE_ENV = 'production';
      expect(() => getJwtSecret()).toThrow('JWT_SECRET environment variable is required in production');
    });

    it('should return JWT_SECRET when set in production', () => {
      process.env.JWT_SECRET = 'super-secret-prod-key';
      process.env.NODE_ENV = 'production';
      expect(getJwtSecret()).toBe('super-secret-prod-key');
    });
  });

  describe('adminLogin', () => {
    it('authenticates ADMIN/EDITOR/REVIEWER user with valid password and omits passwordHash', async () => {
      const { hashPassword } = await import('./password.util');
      const passwordHash = await hashPassword('Asfaque@321');

      prisma.user.findUnique.mockResolvedValue({
        id: 'u-admin-1',
        guestId: null,
        phoneNumber: '01737740010',
        fullName: 'Asfaque (System Admin)',
        passwordHash,
        role: 'ADMIN',
        selectedClass: 'SSC',
      });

      const result = await authService.adminLogin('+8801737740010', 'Asfaque@321');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { phoneNumber: '01737740010' },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'u-admin-1',
        role: 'ADMIN',
        isGuest: false,
      });
      expect(result).toEqual({
        accessToken: 'mock_jwt_token',
        user: {
          id: 'u-admin-1',
          phoneNumber: '01737740010',
          fullName: 'Asfaque (System Admin)',
          role: 'ADMIN',
          selectedClass: 'SSC',
        },
      });
      expect((result.user as unknown as Record<string, unknown>).passwordHash).toBeUndefined();
    });

    it('authenticates EDITOR and REVIEWER users with valid password', async () => {
      const { hashPassword } = await import('./password.util');
      const editorHash = await hashPassword('EditorPass@1');
      const reviewerHash = await hashPassword('ReviewerPass@1');

      prisma.user.findUnique.mockResolvedValueOnce({
        id: 'u-editor-1',
        guestId: null,
        phoneNumber: '01711112222',
        fullName: 'Editor One',
        passwordHash: editorHash,
        role: 'EDITOR',
        selectedClass: 'SSC',
      });

      const editorResult = await authService.adminLogin('01711112222', 'EditorPass@1');
      expect(editorResult.user.role).toBe('EDITOR');
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'u-editor-1',
        role: 'EDITOR',
        isGuest: false,
      });

      prisma.user.findUnique.mockResolvedValueOnce({
        id: 'u-reviewer-1',
        guestId: null,
        phoneNumber: '01711113333',
        fullName: 'Reviewer One',
        passwordHash: reviewerHash,
        role: 'REVIEWER',
        selectedClass: 'SSC',
      });

      const reviewerResult = await authService.adminLogin('01711113333', 'ReviewerPass@1');
      expect(reviewerResult.user.role).toBe('REVIEWER');
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'u-reviewer-1',
        role: 'REVIEWER',
        isGuest: false,
      });
    });

    it('throws UnauthorizedException for wrong password, missing user, or user without passwordHash', async () => {
      const { hashPassword } = await import('./password.util');
      const passwordHash = await hashPassword('Asfaque@321');

      prisma.user.findUnique.mockResolvedValueOnce(null);
      await expect(authService.adminLogin('01737740010', 'Asfaque@321')).rejects.toThrow(
        UnauthorizedException,
      );

      prisma.user.findUnique.mockResolvedValueOnce({
        id: 'u-admin-no-pw',
        phoneNumber: '01737740010',
        passwordHash: null,
        role: 'ADMIN',
      });
      await expect(authService.adminLogin('01737740010', 'Asfaque@321')).rejects.toThrow(
        UnauthorizedException,
      );

      prisma.user.findUnique.mockResolvedValueOnce({
        id: 'u-admin-1',
        phoneNumber: '01737740010',
        passwordHash,
        role: 'ADMIN',
      });
      await expect(authService.adminLogin('01737740010', 'WrongPassword')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('throws ForbiddenException when a STUDENT with passwordHash attempts adminLogin', async () => {
      const { hashPassword } = await import('./password.util');
      const passwordHash = await hashPassword('StudentPass123');

      prisma.user.findUnique.mockResolvedValue({
        id: 'u-student-1',
        phoneNumber: '01712345678',
        passwordHash,
        role: 'STUDENT',
        selectedClass: 'SSC',
      });

      await expect(authService.adminLogin('01712345678', 'StudentPass123')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('throws BadRequestException for invalid phone format or password shorter than 6 characters', async () => {
      await expect(authService.adminLogin('invalid', 'Asfaque@321')).rejects.toThrow(
        BadRequestException,
      );
      await expect(authService.adminLogin('01737740010', '123')).rejects.toThrow(
        BadRequestException,
      );
      await expect(authService.adminLogin('01737740010', '')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('OTP Hardening for Admin/Staff Accounts', () => {
    it('blocks requestOtp and verifyOtp (even master OTP 1234) for ADMIN or password-enabled accounts', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u-admin-1',
        phoneNumber: '01737740010',
        passwordHash: 'salt:hash',
        role: 'ADMIN',
      });

      await expect(authService.requestOtp('01737740010')).rejects.toThrow(ForbiddenException);
      await expect(authService.verifyOtp('01737740010', '1234')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('blocks requestOtp and verifyOtp for non-STUDENT staff without passwordHash and password-enabled STUDENT', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u-editor-no-pw',
        phoneNumber: '01722223333',
        passwordHash: null,
        role: 'EDITOR',
      });

      await expect(authService.requestOtp('01722223333')).rejects.toThrow(ForbiddenException);
      await expect(authService.verifyOtp('01722223333', '1234')).rejects.toThrow(
        ForbiddenException,
      );

      prisma.user.findUnique.mockResolvedValue({
        id: 'u-student-with-pw',
        phoneNumber: '01733334444',
        passwordHash: 'salt:hash',
        role: 'STUDENT',
      });

      await expect(authService.requestOtp('01733334444')).rejects.toThrow(ForbiddenException);
      await expect(authService.verifyOtp('01733334444', '1234')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('rejects verifyOtp with ForbiddenException when guestUser has ADMIN role or passwordHash without $transaction or tokens', async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce({
          id: 'u-existing-student',
          guestId: null,
          phoneNumber: '01712345678',
          role: 'STUDENT',
          passwordHash: null,
          selectedClass: 'SSC',
        })
        .mockResolvedValueOnce({
          id: 'u-guest-admin',
          guestId: 'guest-admin-id',
          phoneNumber: null,
          role: 'ADMIN',
          passwordHash: null,
          selectedClass: 'SSC',
        });

      await expect(
        authService.verifyOtp('01712345678', '1234', 'guest-admin-id'),
      ).rejects.toThrow(ForbiddenException);
      expect(prisma.user.update).not.toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();

      prisma.user.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          id: 'u-guest-pw',
          guestId: 'guest-pw-id',
          phoneNumber: null,
          role: 'STUDENT',
          passwordHash: 'salt:hash',
          selectedClass: 'SSC',
        });

      await expect(
        authService.verifyOtp('01712345678', '1234', 'guest-pw-id'),
      ).rejects.toThrow(ForbiddenException);
      expect(prisma.user.update).not.toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe('updateProfile & bookmark/note migration', () => {
    it('updates fullName and selectedClass for an authenticated user and rejects invalid selectedClass', async () => {
      prisma.user.update.mockResolvedValue({
        id: 'u-1',
        guestId: null,
        phoneNumber: '01712345678',
        fullName: 'তানভীর আহমেদ',
        role: 'STUDENT',
        selectedClass: 'HSC',
      });

      const updated = await (authService as any).updateProfile('u-1', {
        fullName: 'তানভীর আহমেদ',
        selectedClass: 'HSC',
      });

      expect(updated.fullName).toBe('তানভীর আহমেদ');
      expect(updated.selectedClass).toBe('HSC');

      await expect(
        (authService as any).updateProfile('u-1', { selectedClass: 'INVALID' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('accepts all 5 student tracks on updateProfile and rejects INVALID', async () => {
      const tracks = ['CLASS_6_8', 'SSC', 'HSC', 'ADMISSION', 'BCS'] as const;
      for (const track of tracks) {
        prisma.user.update.mockResolvedValueOnce({
          id: 'u-1',
          guestId: null,
          phoneNumber: '01712345678',
          fullName: 'Student',
          role: 'STUDENT',
          selectedClass: track,
        });

        const updated = await (authService as any).updateProfile('u-1', {
          selectedClass: track,
        });
        expect(updated.selectedClass).toBe(track);
      }

      await expect(
        (authService as any).updateProfile('u-1', { selectedClass: 'INVALID' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('merges non-duplicate bookmarks and notes when guest merges into existing phone user', async () => {
      const existingUser = {
        id: 'u-existing-phone',
        guestId: null,
        phoneNumber: '01712345678',
        role: 'STUDENT',
        selectedClass: 'SSC',
      };
      const guestUser = {
        id: 'u-guest-merge',
        guestId: 'guest-abc-789',
        phoneNumber: null,
        role: 'STUDENT',
        selectedClass: 'SSC',
      };

      prisma.user.findUnique
        .mockResolvedValueOnce(existingUser)
        .mockResolvedValueOnce(guestUser);
      prisma.revisionMistake.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      (prisma as any).studentBookmark = {
        findMany: vi
          .fn()
          .mockResolvedValueOnce([
            {
              itemId: 'top_2',
              itemType: 'topic',
              titleBangla: 'বেগ',
              subtitleBangla: 'অধ্যায় ২',
              href: '/lesson/top_2',
            },
          ])
          .mockResolvedValueOnce([
            { itemId: 'top_1', itemType: 'topic' },
          ]),
        createMany: vi.fn().mockResolvedValue({ count: 1 }),
        deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
      };

      (prisma as any).studentNote = {
        findMany: vi
          .fn()
          .mockResolvedValueOnce([
            { topicId: 'top_1', content: 'Guest note ignored' },
            { topicId: 'top_2', content: 'Guest note preserved' },
          ])
          .mockResolvedValueOnce([{ topicId: 'top_1', content: 'Existing note' }]),
        createMany: vi.fn().mockResolvedValue({ count: 1 }),
        deleteMany: vi.fn().mockResolvedValue({ count: 2 }),
      };

      const res = await authService.verifyOtp('01712345678', '1234', 'guest-abc-789');

      expect(res.progressMigrated).toBe(true);
      expect((prisma as any).studentBookmark.createMany).toHaveBeenCalledWith({
        data: [
          expect.objectContaining({
            userId: 'u-existing-phone',
            itemId: 'top_2',
            itemType: 'topic',
          }),
        ],
      });
      expect((prisma as any).studentNote.createMany).toHaveBeenCalledWith({
        data: [
          expect.objectContaining({
            userId: 'u-existing-phone',
            topicId: 'top_2',
            content: 'Guest note preserved',
          }),
        ],
      });
    });
  });

  describe('firebaseLogin', () => {
    it('creates a new student via firebaseLogin and returns isNewUser: true', async () => {
      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-1',
        phoneNumber: '+8801712345678',
        email: 'rafi@example.com',
        emailVerified: true,
        name: 'Firebase Name',
      });
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // firebaseUid
        .mockResolvedValueOnce(null) // phoneNumber
        .mockResolvedValueOnce(null); // email
      prisma.user.create.mockResolvedValue({
        id: 'u-fb-1',
        firebaseUid: 'fb-uid-1',
        phoneNumber: '01712345678',
        email: 'rafi@example.com',
        fullName: 'রাফি আহমেদ',
        role: 'STUDENT',
        selectedClass: 'ADMISSION',
      });

      const result = await authService.firebaseLogin({
        idToken: 'valid-firebase-token',
        fullName: 'রাফি আহমেদ',
        selectedClass: 'ADMISSION',
      });

      expect(firebaseVerifier.verifyIdToken).toHaveBeenCalledWith('valid-firebase-token');
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          firebaseUid: 'fb-uid-1',
          phoneNumber: '01712345678',
          email: 'rafi@example.com',
          fullName: 'রাফি আহমেদ',
          role: 'STUDENT',
          selectedClass: 'ADMISSION',
        },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'u-fb-1',
        role: 'STUDENT',
        isGuest: false,
      });
      expect(result).toEqual({
        accessToken: 'mock_jwt_token',
        isNewUser: true,
        user: {
          id: 'u-fb-1',
          firebaseUid: 'fb-uid-1',
          phoneNumber: '01712345678',
          email: 'rafi@example.com',
          fullName: 'রাফি আহমেদ',
          role: 'STUDENT',
          selectedClass: 'ADMISSION',
        },
      });
    });

    it('links firebaseUid to an existing student matched by phoneNumber without duplicating user', async () => {
      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-link',
        phoneNumber: '+8801712345678',
        email: 'rafi@example.com',
        emailVerified: true,
      });
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // firebaseUid
        .mockResolvedValueOnce({
          id: 'u-existing-student',
          firebaseUid: null,
          phoneNumber: '01712345678',
          email: null,
          fullName: 'রাফি',
          passwordHash: null,
          role: 'STUDENT',
          selectedClass: 'SSC',
        })
        .mockResolvedValueOnce(null); // email collision check
      prisma.user.update.mockResolvedValue({
        id: 'u-existing-student',
        firebaseUid: 'fb-uid-link',
        phoneNumber: '01712345678',
        email: 'rafi@example.com',
        fullName: 'রাফি',
        role: 'STUDENT',
        selectedClass: 'SSC',
      });

      const result = await authService.firebaseLogin({
        idToken: 'firebase-token-phone',
      });

      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'u-existing-student' },
        data: {
          firebaseUid: 'fb-uid-link',
          email: 'rafi@example.com',
        },
      });
      expect(result).toEqual({
        accessToken: 'mock_jwt_token',
        isNewUser: false,
        user: {
          id: 'u-existing-student',
          firebaseUid: 'fb-uid-link',
          phoneNumber: '01712345678',
          email: 'rafi@example.com',
          fullName: 'রাফি',
          role: 'STUDENT',
          selectedClass: 'SSC',
        },
      });
    });

    it('rejects staff/passwordHash account in firebaseLogin with ForbiddenException', async () => {
      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-admin',
        phoneNumber: '+8801737740010',
      });
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // firebaseUid
        .mockResolvedValueOnce({
          id: 'u-admin-1',
          phoneNumber: '01737740010',
          passwordHash: 'salt:hash',
          role: 'ADMIN',
          selectedClass: 'SSC',
        });

      await expect(
        authService.firebaseLogin({ idToken: 'admin-token' }),
      ).rejects.toThrow(ForbiddenException);
      expect(prisma.user.update).not.toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();

      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-student-pw',
        email: 'pwstudent@example.com',
        emailVerified: true,
      });
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // firebaseUid
        .mockResolvedValueOnce({
          id: 'u-student-pw',
          email: 'pwstudent@example.com',
          passwordHash: 'salt:hash',
          role: 'STUDENT',
          selectedClass: 'SSC',
        });

      await expect(
        authService.firebaseLogin({ idToken: 'student-pw-token' }),
      ).rejects.toThrow(ForbiddenException);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('links firebaseUid to existing student matched by normalized email and rejects invalid selectedClass', async () => {
      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-email',
        email: '  Student@Example.com ',
        emailVerified: true,
      });
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // firebaseUid
        .mockResolvedValueOnce({
          id: 'u-existing-email',
          firebaseUid: null,
          phoneNumber: null,
          email: 'student@example.com',
          fullName: 'তানজিম',
          passwordHash: null,
          role: 'STUDENT',
          selectedClass: 'HSC',
        });
      prisma.user.update.mockResolvedValue({
        id: 'u-existing-email',
        firebaseUid: 'fb-uid-email',
        phoneNumber: null,
        email: 'student@example.com',
        fullName: 'তানজিম',
        role: 'STUDENT',
        selectedClass: 'HSC',
      });

      const result = await authService.firebaseLogin({
        idToken: 'firebase-email-token',
      });

      expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { firebaseUid: 'fb-uid-email' },
      });
      expect(prisma.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { email: 'student@example.com' },
      });
      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(result.isNewUser).toBe(false);
      expect(result.user.firebaseUid).toBe('fb-uid-email');

      await expect(
        authService.firebaseLogin({
          idToken: 'firebase-email-token',
          selectedClass: 'INVALID_TRACK',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('does not look up, link, or save email when emailVerified is false', async () => {
      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-unverified',
        email: 'victim@example.com',
        emailVerified: false,
        name: 'Unverified User',
      });
      prisma.user.findUnique.mockResolvedValueOnce(null); // firebaseUid only
      prisma.user.create.mockResolvedValue({
        id: 'u-fb-unverified',
        firebaseUid: 'fb-uid-unverified',
        phoneNumber: null,
        email: null,
        fullName: 'Unverified User',
        role: 'STUDENT',
        selectedClass: 'SSC',
      });

      const result = await authService.firebaseLogin({
        idToken: 'unverified-email-token',
      });

      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { firebaseUid: 'fb-uid-unverified' },
      });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          firebaseUid: 'fb-uid-unverified',
          phoneNumber: null,
          email: null,
          fullName: 'Unverified User',
          role: 'STUDENT',
          selectedClass: 'SSC',
        },
      });
      expect(result.isNewUser).toBe(true);
      expect(result.user.email).toBeNull();
    });

    it('throws ConflictException when matched user already has a different firebaseUid', async () => {
      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-new',
        phoneNumber: '+8801712345678',
      });
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // firebaseUid
        .mockResolvedValueOnce({
          id: 'u-existing',
          firebaseUid: 'fb-uid-original',
          phoneNumber: '01712345678',
          email: null,
          passwordHash: null,
          role: 'STUDENT',
          selectedClass: 'SSC',
        });

      await expect(
        authService.firebaseLogin({ idToken: 'token-mismatch' }),
      ).rejects.toThrow(ConflictException);
      expect(prisma.user.update).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('throws ConflictException when linking phoneNumber or email already owned by another user', async () => {
      // Case A: matched by firebaseUid, phoneNumber belongs to another user
      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-1',
        phoneNumber: '+8801712345678',
      });
      prisma.user.findUnique
        .mockResolvedValueOnce({
          id: 'u-1',
          firebaseUid: 'fb-uid-1',
          phoneNumber: null,
          email: null,
          passwordHash: null,
          role: 'STUDENT',
          selectedClass: 'SSC',
        })
        .mockResolvedValueOnce({
          id: 'u-other-phone-owner',
          phoneNumber: '01712345678',
          role: 'STUDENT',
        });

      await expect(
        authService.firebaseLogin({ idToken: 'token-phone-collision' }),
      ).rejects.toThrow(ConflictException);
      expect(prisma.user.update).not.toHaveBeenCalled();

      // Case B: matched by phoneNumber, verified email belongs to another user
      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-2',
        phoneNumber: '+8801799998888',
        email: 'taken@example.com',
        emailVerified: true,
      });
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // firebaseUid
        .mockResolvedValueOnce({
          id: 'u-2',
          firebaseUid: null,
          phoneNumber: '01799998888',
          email: null,
          passwordHash: null,
          role: 'STUDENT',
          selectedClass: 'SSC',
        })
        .mockResolvedValueOnce({
          id: 'u-other-email-owner',
          email: 'taken@example.com',
          role: 'ADMIN',
        });

      await expect(
        authService.firebaseLogin({ idToken: 'token-email-collision' }),
      ).rejects.toThrow(ConflictException);
      expect(prisma.user.update).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('upgrades a guest user in-place when firebaseLogin is called with guestId for a new Firebase identity', async () => {
      firebaseVerifier.verifyIdToken.mockResolvedValue({
        uid: 'fb-uid-from-guest',
        email: 'upgraded@example.com',
        emailVerified: true,
        name: 'Upgraded Student',
      });
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // firebaseUid
        .mockResolvedValueOnce(null) // email
        .mockResolvedValueOnce({
          id: 'u-guest-upgrade',
          guestId: 'guest_mobile_123',
          firebaseUid: null,
          phoneNumber: null,
          email: null,
          fullName: 'Guest Name',
          passwordHash: null,
          role: 'STUDENT',
          selectedClass: 'HSC',
        });
      prisma.user.update.mockResolvedValue({
        id: 'u-guest-upgrade',
        guestId: null,
        firebaseUid: 'fb-uid-from-guest',
        phoneNumber: null,
        email: 'upgraded@example.com',
        fullName: 'Upgraded Student',
        role: 'STUDENT',
        selectedClass: 'HSC',
      });

      const res = await authService.firebaseLogin({
        idToken: 'fb-token-upgrade',
        guestId: 'guest_mobile_123',
      });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'u-guest-upgrade' },
        data: {
          guestId: null,
          firebaseUid: 'fb-uid-from-guest',
          phoneNumber: null,
          email: 'upgraded@example.com',
          fullName: 'Upgraded Student',
          selectedClass: 'HSC',
        },
      });
      expect(res.user.id).toBe('u-guest-upgrade');
      expect(res.isNewUser).toBe(false);
    });
  });
});
