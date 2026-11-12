import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UnauthorizedException } from '@nestjs/common';

const mockVerifyIdToken = vi.fn();
const mockGetApps = vi.fn();
const mockInitializeApp = vi.fn();
const mockCert = vi.fn((sa) => ({ type: 'cert', sa }));
const mockApplicationDefault = vi.fn(() => ({ type: 'adc' }));
const mockGetAuth = vi.fn((_app?: unknown) => ({ verifyIdToken: mockVerifyIdToken }));

vi.mock('firebase-admin/app', () => ({
  getApps: () => mockGetApps(),
  initializeApp: (opts: unknown) => mockInitializeApp(opts),
  cert: (sa: unknown) => mockCert(sa),
  applicationDefault: () => mockApplicationDefault(),
}));

vi.mock('firebase-admin/auth', () => ({
  getAuth: (app: unknown) => mockGetAuth(app),
}));

import { FirebaseVerifierService } from './firebase-verifier.service';

describe('FirebaseVerifierService', () => {
  const originalEnv = { ...process.env };
  let service: FirebaseVerifierService;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    delete process.env.FIREBASE_PROJECT_ID;
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;

    vi.clearAllMocks();
    mockGetApps.mockReturnValue([]);
    mockInitializeApp.mockReturnValue({ name: '[DEFAULT]' });

    service = new FirebaseVerifierService();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('throws UnauthorizedException when Firebase config env vars are missing', async () => {
    await expect(service.verifyIdToken('some-token')).rejects.toThrow(UnauthorizedException);
    expect(mockInitializeApp).not.toHaveBeenCalled();
  });

  it('throws UnauthorizedException when idToken is empty', async () => {
    process.env.FIREBASE_PROJECT_ID = 'pori-test';
    await expect(service.verifyIdToken('   ')).rejects.toThrow(UnauthorizedException);
  });

  it('throws UnauthorizedException when FIREBASE_SERVICE_ACCOUNT_JSON is invalid JSON', async () => {
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON = '{not-valid-json';
    await expect(service.verifyIdToken('valid-token')).rejects.toThrow(UnauthorizedException);
  });

  it('initializes lazily from FIREBASE_SERVICE_ACCOUNT_JSON and returns decoded claims', async () => {
    const sa = { project_id: 'pori-prod', client_email: 'fb@pori.iam', private_key: 'pem' };
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON = JSON.stringify(sa);
    mockVerifyIdToken.mockResolvedValue({
      uid: 'uid-123',
      phone_number: '+8801712345678',
      email: 'student@example.com',
      email_verified: true,
      name: 'Student Name',
    });

    const result = await service.verifyIdToken('valid-jwt');

    expect(mockCert).toHaveBeenCalledWith(sa);
    expect(mockInitializeApp).toHaveBeenCalledWith({
      credential: { type: 'cert', sa },
      projectId: 'pori-prod',
    });
    expect(mockVerifyIdToken).toHaveBeenCalledWith('valid-jwt');
    expect(result).toEqual({
      uid: 'uid-123',
      phoneNumber: '+8801712345678',
      email: 'student@example.com',
      emailVerified: true,
      name: 'Student Name',
    });

    mockVerifyIdToken.mockResolvedValueOnce({
      uid: 'uid-unverified',
      email: 'unverified@example.com',
      email_verified: false,
    });
    const unverified = await service.verifyIdToken('unverified-jwt');
    expect(unverified.emailVerified).toBe(false);
  });

  it('initializes lazily from FIREBASE_PROJECT_ID and throws UnauthorizedException if verifyIdToken fails', async () => {
    process.env.FIREBASE_PROJECT_ID = 'pori-dev';
    mockVerifyIdToken.mockRejectedValue(new Error('Token expired'));

    await expect(service.verifyIdToken('expired-jwt')).rejects.toThrow(UnauthorizedException);
    expect(mockInitializeApp).toHaveBeenCalledWith({ projectId: 'pori-dev' });
  });
});
