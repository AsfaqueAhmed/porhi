import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { INestApplication, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { FirebaseVerifierService } from '../src/modules/auth/firebase-verifier.service';

interface MockUser {
  id: string;
  guestId: string | null;
  firebaseUid?: string | null;
  phoneNumber: string | null;
  email?: string | null;
  fullName: string | null;
  passwordHash?: string | null;
  role: 'STUDENT' | 'EDITOR' | 'REVIEWER' | 'ADMIN';
  selectedClass: string;
  createdAt: Date;
  updatedAt: Date;
}

describe('AuthModule (e2e)', () => {
  let app: INestApplication;
  let users: MockUser[] = [];
  let subjects: any[] = [];
  let examSessions: any[] = [];
  let revisionMistakes: any[] = [];
  let eventLogs: any[] = [];

  const mockPrismaService = {
    user: {
      findUnique: async ({
        where,
      }: {
        where: { id?: string; guestId?: string; firebaseUid?: string; phoneNumber?: string; email?: string };
      }) => {
        if (where.id) return users.find((u) => u.id === where.id) || null;
        if (where.guestId) return users.find((u) => u.guestId === where.guestId) || null;
        if (where.firebaseUid) return users.find((u) => u.firebaseUid === where.firebaseUid) || null;
        if (where.phoneNumber) return users.find((u) => u.phoneNumber === where.phoneNumber) || null;
        if (where.email) return users.find((u) => u.email === where.email) || null;
        return null;
      },
      create: async ({ data }: { data: any }) => {
        const newUser: MockUser = {
          id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          guestId: data.guestId ?? null,
          firebaseUid: data.firebaseUid ?? null,
          phoneNumber: data.phoneNumber ?? null,
          email: data.email ?? null,
          fullName: data.fullName ?? null,
          passwordHash: data.passwordHash ?? null,
          role: data.role ?? 'STUDENT',
          selectedClass: data.selectedClass ?? 'SSC',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        users.push(newUser);
        return newUser;
      },
      update: async ({ where, data }: { where: { id: string }; data: any }) => {
        const idx = users.findIndex((u) => u.id === where.id);
        if (idx === -1) throw new Error('User not found');
        const updated = {
          ...users[idx],
          ...data,
          updatedAt: new Date(),
        };
        users[idx] = updated;
        return updated;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const idx = users.findIndex((u) => u.id === where.id);
        if (idx === -1) throw new Error('User not found');
        const [removed] = users.splice(idx, 1);
        return removed;
      },
    },
    examSession: {
      updateMany: async ({ where, data }: any) => {
        let count = 0;
        examSessions = examSessions.map((s) => {
          if (s.userId === where.userId) {
            count++;
            return { ...s, ...data };
          }
          return s;
        });
        return { count };
      },
    },
    revisionMistake: {
      findMany: async ({ where }: any) => {
        return revisionMistakes.filter((m) => m.userId === where.userId);
      },
      create: async ({ data }: any) => {
        const newMistake = { id: `m_${Date.now()}`, ...data };
        revisionMistakes.push(newMistake);
        return newMistake;
      },
      createMany: async ({ data }: any) => {
        const items = Array.isArray(data) ? data : [data];
        for (const item of items) {
          revisionMistakes.push({ id: `m_${Date.now()}_${Math.random()}`, ...item });
        }
        return { count: items.length };
      },
      deleteMany: async ({ where }: any) => {
        let count = 0;
        revisionMistakes = revisionMistakes.filter((m) => {
          if (m.userId === where.userId) {
            count++;
            return false;
          }
          return true;
        });
        return { count };
      },
    },
    eventLog: {
      updateMany: async ({ where, data }: any) => {
        let count = 0;
        eventLogs = eventLogs.map((e) => {
          if (e.userId === where.userId) {
            count++;
            return { ...e, ...data };
          }
          return e;
        });
        return { count };
      },
    },
    subject: {
      findUnique: async ({ where }: { where: { id?: string; code?: string } }) => {
        if (where.id) return subjects.find((s) => s.id === where.id) || null;
        if (where.code) return subjects.find((s) => s.code === where.code) || null;
        return null;
      },
      create: async ({ data }: { data: any }) => {
        const newSubject = {
          id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          code: data.code,
          nameBangla: data.nameBangla,
          classLevel: data.classLevel,
          syllabusYear: data.syllabusYear ?? 2026,
          isReady: data.isReady ?? false,
        };
        subjects.push(newSubject);
        return newSubject;
      },
    },
    $transaction: async (fn: any) => {
      if (typeof fn === 'function') {
        return fn(mockPrismaService);
      }
      return Promise.all(fn);
    },
  };

  const mockFirebaseVerifier = {
    verifyIdToken: async (idToken: string) => {
      if (idToken === 'valid-google-token') {
        return {
          uid: 'fb_e2e_uid_1',
          email: 'e2estudent@example.com',
          name: 'E2E Student',
        };
      }
      throw new UnauthorizedException('Invalid Firebase ID token');
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(FirebaseVerifierService)
      .useValue(mockFirebaseVerifier)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  beforeEach(() => {
    users = [];
    subjects = [];
    examSessions = [];
    revisionMistakes = [];
    eventLogs = [];
  });

  describe('POST /auth/guest', () => {
    it('should create guest session with valid guestId', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'guest-uuid-101' })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toMatchObject({
        guestId: 'guest-uuid-101',
        role: 'STUDENT',
        selectedClass: 'SSC',
      });
      expect(response.body.user.id).toBeDefined();
    });

    it('should reject missing guestId with 400', async () => {
      await request(app.getHttpServer())
        .post('/auth/guest')
        .send({})
        .expect(400);
    });
  });

  describe('POST /auth/request-otp', () => {
    it('should accept valid BD phone number', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/request-otp')
        .send({ phoneNumber: '01712345678' })
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        message: 'OTP sent successfully',
      });
    });

    it('should reject invalid phone format with 400', async () => {
      await request(app.getHttpServer())
        .post('/auth/request-otp')
        .send({ phoneNumber: '12345' })
        .expect(400);
    });
  });

  describe('POST /auth/verify-otp', () => {
    it('should reject invalid OTP code with 401', async () => {
      await request(app.getHttpServer())
        .post('/auth/request-otp')
        .send({ phoneNumber: '01712345678' });

      await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({
          phoneNumber: '01712345678',
          code: '999999',
        })
        .expect(401);
    });

    it('should authenticate and create user with valid test OTP 1234', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({
          phoneNumber: '01712345678',
          code: '1234',
        })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user).toMatchObject({
        phoneNumber: '01712345678',
        role: 'STUDENT',
        selectedClass: 'SSC',
      });
      expect(response.body.progressMigrated).toBe(false);
    });
  });

  describe('GET /auth/me', () => {
    it('should reject request without token with 401', async () => {
      await request(app.getHttpServer())
        .get('/auth/me')
        .expect(401);
    });

    it('should return user profile with valid Bearer token', async () => {
      const guestRes = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'guest-me-test' });

      const token = guestRes.body.accessToken;

      const meRes = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(meRes.body.guestId).toBe('guest-me-test');
      expect(meRes.body.role).toBe('STUDENT');
      expect(meRes.body.isGuest).toBe(true);
    });
  });

  describe('Full Guest to Phone OTP Migration Journey', () => {
    it('should start as guest, migrate to phone user, and retain access', async () => {
      // 1. Guest explores the platform
      const guestRes = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'guest-journey-123' })
        .expect(201);

      const guestToken = guestRes.body.accessToken;
      const guestUserId = guestRes.body.user.id;
      expect(guestUserId).toBeDefined();

      // 2. Guest can access protected /auth/me
      const guestProfile = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${guestToken}`)
        .expect(200);

      expect(guestProfile.body.id).toBe(guestUserId);
      expect(guestProfile.body.isGuest).toBe(true);

      // 3. User requests OTP
      await request(app.getHttpServer())
        .post('/auth/request-otp')
        .send({ phoneNumber: '01799998888' })
        .expect(201);

      // 4. User verifies OTP with guestId to trigger migration
      const verifyRes = await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({
          phoneNumber: '01799998888',
          code: '1234',
          guestId: 'guest-journey-123',
        })
        .expect(201);

      expect(verifyRes.body.progressMigrated).toBe(true);
      expect(verifyRes.body.user.id).toBe(guestUserId);
      expect(verifyRes.body.user.phoneNumber).toBe('01799998888');
      expect(verifyRes.body.user.guestId).toBeNull();

      const permanentToken = verifyRes.body.accessToken;

      // 5. Permanent token accesses /auth/me
      const permanentProfile = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${permanentToken}`)
        .expect(200);

      expect(permanentProfile.body.id).toBe(guestUserId);
      expect(permanentProfile.body.phoneNumber).toBe('01799998888');
      expect(permanentProfile.body.guestId).toBeNull();
      expect(permanentProfile.body.isGuest).toBe(false);
    });
  });

  describe('POST /auth/admin/login & Admin RBAC', () => {
    it('logs in seeded ADMIN with password, accesses /auth/me & /admin/content/subjects, rejects bad password and blocks OTP bypass', async () => {
      const { hashPassword } = await import('../src/modules/auth/password.util');
      const passwordHash = await hashPassword('Asfaque@321');
      users.push({
        id: 'usr_admin_1',
        guestId: null,
        phoneNumber: '01737740010',
        fullName: 'Asfaque (System Admin)',
        passwordHash,
        role: 'ADMIN',
        selectedClass: 'SSC',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // 1. Rejects invalid password with 401
      await request(app.getHttpServer())
        .post('/auth/admin/login')
        .send({ phoneNumber: '01737740010', password: 'WrongPassword' })
        .expect(401);

      // 2. Rejects malformed login payload with 400
      await request(app.getHttpServer())
        .post('/auth/admin/login')
        .send({ phoneNumber: '01737740010', password: '123' })
        .expect(400);

      // 3. Blocks OTP takeover even with dev master OTP 1234
      await request(app.getHttpServer())
        .post('/auth/request-otp')
        .send({ phoneNumber: '01737740010' })
        .expect(403);

      await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({ phoneNumber: '01737740010', code: '1234' })
        .expect(403);

      await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({ phoneNumber: '+8801737740010', code: '1234' })
        .expect(403);

      // 4. Valid password login returns JWT and sanitized admin user
      const loginRes = await request(app.getHttpServer())
        .post('/auth/admin/login')
        .send({ phoneNumber: '01737740010', password: 'Asfaque@321' })
        .expect(201);

      expect(loginRes.body.accessToken).toBeDefined();
      expect(loginRes.body.user).toMatchObject({
        id: 'usr_admin_1',
        phoneNumber: '01737740010',
        fullName: 'Asfaque (System Admin)',
        role: 'ADMIN',
        selectedClass: 'SSC',
      });
      expect(loginRes.body.user.passwordHash).toBeUndefined();

      const adminToken = loginRes.body.accessToken;

      // 5. Token validates on /auth/me without exposing passwordHash
      const meRes = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(meRes.body.role).toBe('ADMIN');
      expect(meRes.body.passwordHash).toBeUndefined();

      // 6. Admin token grants access to protected /admin/content/subjects
      const subjectRes = await request(app.getHttpServer())
        .post('/admin/content/subjects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          code: 'ssc_biology',
          nameBangla: 'জীববিজ্ঞান',
          classLevel: 'CLASS_9_10',
        })
        .expect(201);

      expect(subjectRes.body.code).toBe('ssc_biology');

      // 7. Student OTP token is rejected with 403 on /admin/content/subjects
      const studentVerifyRes = await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({ phoneNumber: '01755556666', code: '1234' })
        .expect(201);

      await request(app.getHttpServer())
        .post('/admin/content/subjects')
        .set('Authorization', `Bearer ${studentVerifyRes.body.accessToken}`)
        .send({
          code: 'ssc_math',
          nameBangla: 'গণিত',
          classLevel: 'CLASS_9_10',
        })
        .expect(403);
    });

    it('rejects STUDENT with passwordHash on /auth/admin/login and blocks OTP login', async () => {
      const { hashPassword } = await import('../src/modules/auth/password.util');
      const passwordHash = await hashPassword('StudentPass123');
      users.push({
        id: 'usr_student_pw',
        guestId: null,
        phoneNumber: '01788887777',
        fullName: 'Student With Pw',
        passwordHash,
        role: 'STUDENT',
        selectedClass: 'SSC',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await request(app.getHttpServer())
        .post('/auth/admin/login')
        .send({ phoneNumber: '01788887777', password: 'StudentPass123' })
        .expect(403);

      await request(app.getHttpServer())
        .post('/auth/request-otp')
        .send({ phoneNumber: '01788887777' })
        .expect(403);

      await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({ phoneNumber: '01788887777', code: '1234' })
        .expect(403);
    });
  });

  describe('POST /auth/firebase & 5-track PATCH /auth/profile', () => {
    it('exchanges a valid Firebase token, validates 5 tracks on DTOs, and rejects invalid tokens', async () => {
      await request(app.getHttpServer())
        .post('/auth/firebase')
        .send({ idToken: 'bad-token' })
        .expect(401);

      await request(app.getHttpServer())
        .post('/auth/firebase')
        .send({ idToken: 'valid-google-token', selectedClass: 'INVALID' })
        .expect(400);

      const createRes = await request(app.getHttpServer())
        .post('/auth/firebase')
        .send({
          idToken: 'valid-google-token',
          fullName: 'সাব্বির',
          selectedClass: 'CLASS_6_8',
        })
        .expect(201);

      expect(createRes.body.isNewUser).toBe(true);
      expect(createRes.body.accessToken).toBeDefined();
      expect(createRes.body.user).toMatchObject({
        firebaseUid: 'fb_e2e_uid_1',
        email: 'e2estudent@example.com',
        fullName: 'সাব্বির',
        role: 'STUDENT',
        selectedClass: 'CLASS_6_8',
      });

      const loginAgainRes = await request(app.getHttpServer())
        .post('/auth/firebase')
        .send({ idToken: 'valid-google-token' })
        .expect(201);

      expect(loginAgainRes.body.isNewUser).toBe(false);
      expect(loginAgainRes.body.user.id).toBe(createRes.body.user.id);

      const patchRes = await request(app.getHttpServer())
        .patch('/auth/profile')
        .set('Authorization', `Bearer ${createRes.body.accessToken}`)
        .send({ selectedClass: 'BCS' })
        .expect(200);

      expect(patchRes.body.selectedClass).toBe('BCS');

      await request(app.getHttpServer())
        .patch('/auth/profile')
        .set('Authorization', `Bearer ${createRes.body.accessToken}`)
        .send({ selectedClass: 'INVALID' })
        .expect(400);
    });
  });
});
