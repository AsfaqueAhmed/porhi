import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { hashPassword, verifyPassword } from './password.util';
import { seedAdminUser } from '../../../prisma/seed';

describe('password.util', () => {
  it('hashes a password with a random salt and verifies the matching password', async () => {
    const hash1 = await hashPassword('Asfaque@321');
    const hash2 = await hashPassword('Asfaque@321');

    expect(hash1).toContain(':');
    expect(hash1).not.toBe(hash2);
    expect(await verifyPassword('Asfaque@321', hash1)).toBe(true);
    expect(await verifyPassword('Asfaque@321', hash2)).toBe(true);
  });

  it('rejects wrong passwords and malformed stored hashes safely', async () => {
    const stored = await hashPassword('Asfaque@321');

    expect(await verifyPassword('WrongPass@123', stored)).toBe(false);
    expect(await verifyPassword('', stored)).toBe(false);
    expect(await verifyPassword('Asfaque@321', '')).toBe(false);
    expect(await verifyPassword('Asfaque@321', 'invalidhashwithoutcolon')).toBe(false);
    expect(await verifyPassword('Asfaque@321', 'salt:nothex')).toBe(false);
    expect(await verifyPassword('Asfaque@321', 'a:b:c')).toBe(false);
    expect(await verifyPassword('Asfaque@321', `:${'ab'.repeat(64)}`)).toBe(false);
    expect(await verifyPassword('Asfaque@321', `salt:${'ab'.repeat(32)}`)).toBe(false);
  });
});

describe('seedAdminUser', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.ADMIN_SEED_PHONE;
    delete process.env.ADMIN_SEED_PASSWORD;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it('upserts default system admin 01737740010 with verifiable hashed password Asfaque@321', async () => {
    const upsertMock = vi.fn().mockResolvedValue({ id: 'usr_admin_seed' });
    const mockPrisma = { user: { upsert: upsertMock } } as unknown as PrismaClient;

    await seedAdminUser(mockPrisma);

    expect(upsertMock).toHaveBeenCalledTimes(1);
    const callArg = upsertMock.mock.calls[0][0];
    expect(callArg.where).toEqual({ phoneNumber: '01737740010' });
    expect(callArg.create.role).toBe('ADMIN');
    expect(callArg.update.role).toBe('ADMIN');
    expect(callArg.create.fullName).toBe('Asfaque (System Admin)');
    expect(callArg.update.fullName).toBe('Asfaque (System Admin)');
    expect(callArg.create.selectedClass).toBe('SSC');
    expect(callArg.create.passwordHash).toBeDefined();
    expect(callArg.create.passwordHash).not.toBe('Asfaque@321');
    expect(callArg.update.passwordHash).toBe(callArg.create.passwordHash);
    expect(await verifyPassword('Asfaque@321', callArg.create.passwordHash)).toBe(true);
  });

  it('respects ADMIN_SEED_PHONE and ADMIN_SEED_PASSWORD environment overrides', async () => {
    process.env.ADMIN_SEED_PHONE = '01811223344';
    process.env.ADMIN_SEED_PASSWORD = 'CustomAdminPass#99';

    const upsertMock = vi.fn().mockResolvedValue({ id: 'usr_admin_custom' });
    const mockPrisma = { user: { upsert: upsertMock } } as unknown as PrismaClient;

    await seedAdminUser(mockPrisma);

    expect(upsertMock).toHaveBeenCalledTimes(1);
    const callArg = upsertMock.mock.calls[0][0];
    expect(callArg.where).toEqual({ phoneNumber: '01811223344' });
    expect(callArg.create.phoneNumber).toBe('01811223344');
    expect(await verifyPassword('CustomAdminPass#99', callArg.create.passwordHash)).toBe(true);
  });

  it('skips seeding and logs a warning in production when ADMIN_SEED_PASSWORD is omitted', async () => {
    process.env.NODE_ENV = 'production';
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const upsertMock = vi.fn();
    const mockPrisma = { user: { upsert: upsertMock } } as unknown as PrismaClient;

    await seedAdminUser(mockPrisma);

    expect(upsertMock).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});
