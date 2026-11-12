import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { ContentStatus, ReportStatus, Role } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('ContentReport & Admin Triage (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  let users: any[] = [];
  let topics: any[] = [];
  let lessons: any[] = [];
  let questions: any[] = [];
  let reports: any[] = [];

  let studentToken: string;
  let adminToken: string;

  const mockPrismaService = {
    $transaction: async (cb: any) => cb(mockPrismaService),
    user: {
      findUnique: async ({ where }: any) => {
        if (where.id) return users.find((u) => u.id === where.id) || null;
        return null;
      },
    },
    lesson: {
      findUnique: async ({ where }: any) => lessons.find((l) => l.id === where.id) || null,
      findMany: async ({ where }: any) => {
        if (where?.id?.in) return lessons.filter((l) => where.id.in.includes(l.id));
        return lessons;
      },
      updateMany: async ({ where, data }: any) => {
        let count = 0;
        for (const l of lessons) {
          if (l.id === where.id) {
            Object.assign(l, data);
            count++;
          }
        }
        return { count };
      },
    },
    question: {
      findUnique: async ({ where }: any) => questions.find((q) => q.id === where.id) || null,
      findMany: async ({ where }: any) => {
        if (where?.id?.in) return questions.filter((q) => where.id.in.includes(q.id));
        return questions;
      },
      updateMany: async ({ where, data }: any) => {
        let count = 0;
        for (const q of questions) {
          if (q.id === where.id) {
            Object.assign(q, data);
            count++;
          }
        }
        return { count };
      },
    },
    topic: {
      findMany: async ({ where }: any) => {
        if (where?.id?.in) return topics.filter((t) => where.id.in.includes(t.id));
        return topics;
      },
    },
    eventLog: {
      create: async ({ data }: any) => ({ id: `ev_${Date.now()}`, ...data }),
    },
    contentReport: {
      create: async ({ data }: any) => {
        const rec = {
          id: `rep_${reports.length + 1}`,
          ...data,
          resolutionNote: null,
          resolvedById: null,
          resolvedAt: null,
          createdAt: new Date('2026-11-12T06:00:00Z'),
          updatedAt: new Date('2026-11-12T06:00:00Z'),
        };
        reports.push(rec);
        return rec;
      },
      findUnique: async ({ where }: any) => reports.find((r) => r.id === where.id) || null,
      findMany: async ({ where }: any) => {
        return reports
          .filter((r) => {
            if (where?.userId && r.userId !== where.userId) return false;
            if (where?.status && r.status !== where.status) return false;
            if (where?.category && r.category !== where.category) return false;
            if (where?.contentType && r.contentType !== where.contentType) return false;
            return true;
          })
          .map((r) => ({
            ...r,
            user: users.find((u) => u.id === r.userId) || null,
          }));
      },
      update: async ({ where, data }: any) => {
        const rec = reports.find((r) => r.id === where.id);
        if (!rec) return null;
        Object.assign(rec, data, { updatedAt: new Date() });
        return rec;
      },
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  beforeEach(() => {
    users = [
      { id: 'stu-1', phoneNumber: '01711111111', fullName: 'রাফি', role: Role.STUDENT, selectedClass: 'SSC' },
      { id: 'adm-1', phoneNumber: '01799999999', fullName: 'অ্যাডমিন', role: Role.ADMIN, selectedClass: 'SSC' },
    ];
    topics = [{ id: 'top-1', titleBangla: '১.১ গতি', chapter: { titleBangla: 'গতি' } }];
    lessons = [{ id: 'les-1', topicId: 'top-1', titleBangla: 'বেগ ও ত্বরণ', status: ContentStatus.PUBLISHED, isVerified: true }];
    questions = [{ id: 'q-1', topicId: 'top-1', stem: 'ত্বরণের একক কী?', status: ContentStatus.PUBLISHED, isVerified: true }];
    reports = [];

    studentToken = jwtService.sign({ sub: 'stu-1', role: Role.STUDENT, isGuest: false });
    adminToken = jwtService.sign({ sub: 'adm-1', role: Role.ADMIN, isGuest: false });
  });

  it('allows student to submit and view own report, restricts admin triage queue to staff, and allows resolving with moveContentToCorrection', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/content-reports')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        contentType: 'QUESTION',
        contentId: 'q-1',
        category: 'WRONG_ANSWER',
        description: 'সঠিক একক m/s^2 হবে, কিন্তু অপশনে m/s চিহ্নিত আছে।',
      })
      .expect(201);

    expect(createRes.body.status).toBe(ReportStatus.OPEN);
    expect(createRes.body.topicId).toBe('top-1');
    const reportId = createRes.body.id;

    const myRes = await request(app.getHttpServer())
      .get('/content-reports/mine')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);
    expect(myRes.body).toHaveLength(1);
    expect(myRes.body[0].id).toBe(reportId);

    // Student cannot access admin queue
    await request(app.getHttpServer())
      .get('/admin/content/reports')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(403);

    // Admin fetches triage queue
    const queueRes = await request(app.getHttpServer())
      .get('/admin/content/reports')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(queueRes.body.items).toHaveLength(1);
    expect(queueRes.body.summary.openCount).toBe(1);

    // Admin resolves report and moves question to CORRECTION
    const resolveRes = await request(app.getHttpServer())
      .patch(`/admin/content/reports/${reportId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        status: ReportStatus.RESOLVED,
        resolutionNote: 'প্রশ্নটি সংশোধনের জন্য পাঠানো হয়েছে।',
        moveContentToCorrection: true,
      })
      .expect(200);

    expect(resolveRes.body.report.status).toBe(ReportStatus.RESOLVED);
    expect(resolveRes.body.movedToCorrection).toBe(true);
    expect(questions[0].status).toBe(ContentStatus.CORRECTION);
    expect(questions[0].isVerified).toBe(false);
  });
});
