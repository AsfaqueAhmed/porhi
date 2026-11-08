import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
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

    authService = new AuthService(prisma as unknown as PrismaService, jwtService as unknown as JwtService);
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

    it('should reject expired OTP', async () => {
      vi.useFakeTimers();
      await authService.requestOtp('01712345678');

      // Fast-forward time past 5 minutes (e.g. 6 minutes)
      vi.advanceTimersByTime(6 * 60 * 1000);

      // Even in non-production, non-master expired OTP must be rejected
      await expect(authService.verifyOtp('01712345678', '888888')).rejects.toThrow(UnauthorizedException);
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
});
