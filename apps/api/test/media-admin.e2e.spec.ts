import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { Role } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('MediaAdminModule (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  let studentToken: string;
  let reviewerToken: string;
  let editorToken: string;
  let adminToken: string;

  const users: any[] = [];
  const lessons: any[] = [];
  const topics = [
    {
      id: 'topic_sound',
      chapterId: 'chap_sound',
      orderIndex: 1,
      titleBangla: 'শব্দ ও তরঙ্গ',
    },
  ];
  const chapters = [
    {
      id: 'chap_sound',
      subjectId: 'sub_phy',
      orderIndex: 7,
      titleBangla: 'সপ্তম অধ্যায়: শব্দ ও তরঙ্গ',
    },
  ];
  const subjects = [
    {
      id: 'sub_phy',
      code: 'ssc_physics',
      nameBangla: 'পদার্থবিজ্ঞান',
      classLevel: 'CLASS_9_10',
      syllabusYear: 2026,
      isReady: true,
    },
  ];

  const attachTopicHierarchy = (item: any) => {
    const t = topics.find((topic) => topic.id === item.topicId);
    const ch = t ? chapters.find((c) => c.id === t.chapterId) : null;
    const sub = ch ? subjects.find((s) => s.id === ch.subjectId) : null;
    return {
      ...item,
      topic: t
        ? {
            id: t.id,
            titleBangla: t.titleBangla,
            chapter: ch
              ? {
                  id: ch.id,
                  titleBangla: ch.titleBangla,
                  subject: sub
                    ? { id: sub.id, code: sub.code, nameBangla: sub.nameBangla }
                    : null,
                }
              : null,
          }
        : null,
    };
  };

  const mockPrismaService = {
    $transaction: async (cb: any) => cb(mockPrismaService),
    user: {
      findUnique: async ({ where }: any) => {
        if (where.id) return users.find((u) => u.id === where.id) || null;
        if (where.phoneNumber) return users.find((u) => u.phoneNumber === where.phoneNumber) || null;
        return null;
      },
    },
    topic: {
      findUnique: async ({ where }: any) => topics.find((t) => t.id === where.id) || null,
      findMany: async () => topics,
    },
    lesson: {
      findUnique: async ({ where }: any) => {
        const found = lessons.find((l) => l.id === where.id);
        return found ? attachTopicHierarchy(found) : null;
      },
      findMany: async () => lessons.map((l) => attachTopicHierarchy(l)),
      count: async () => lessons.length,
      create: async ({ data }: any) => {
        const item = {
          id: `les_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          ...data,
          version: data.version || 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        lessons.push(item);
        return attachTopicHierarchy(item);
      },
      update: async ({ where, data }: any) => {
        const idx = lessons.findIndex((l) => l.id === where.id);
        if (idx === -1) throw new Error('Not found');
        const updated = {
          ...lessons[idx],
          ...data,
          version: typeof data.version === 'object' ? lessons[idx].version + 1 : data.version || lessons[idx].version,
          updatedAt: new Date(),
        };
        lessons[idx] = updated;
        return attachTopicHierarchy(updated);
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

    jwtService = app.get(JwtService);

    const studentUser = { id: 'usr_stu', phoneNumber: '01700000001', role: Role.STUDENT };
    const reviewerUser = { id: 'usr_rev', phoneNumber: '01700000002', role: Role.REVIEWER };
    const editorUser = { id: 'usr_ed', phoneNumber: '01700000003', role: Role.EDITOR };
    const adminUser = { id: 'usr_adm', phoneNumber: '01700000004', role: Role.ADMIN };

    users.push(studentUser, reviewerUser, editorUser, adminUser);

    studentToken = jwtService.sign({ sub: studentUser.id, role: studentUser.role });
    reviewerToken = jwtService.sign({ sub: reviewerUser.id, role: reviewerUser.role });
    editorToken = jwtService.sign({ sub: editorUser.id, role: editorUser.role });
    adminToken = jwtService.sign({ sub: adminUser.id, role: adminUser.role });
  });

  afterAll(async () => {
    await app.close();
  });

  it('enforces RBAC guards on POST /admin/media/upload', async () => {
    // 401 Unauthenticated
    await request(app.getHttpServer())
      .post('/admin/media/upload')
      .attach('file', Buffer.from('fake-audio-bytes'), 'audio.mp3')
      .expect(401);

    // 403 STUDENT
    await request(app.getHttpServer())
      .post('/admin/media/upload')
      .set('Authorization', `Bearer ${studentToken}`)
      .attach('file', Buffer.from('fake-audio-bytes'), 'audio.mp3')
      .expect(403);

    // 403 REVIEWER
    await request(app.getHttpServer())
      .post('/admin/media/upload')
      .set('Authorization', `Bearer ${reviewerToken}`)
      .attach('file', Buffer.from('fake-audio-bytes'), 'audio.mp3')
      .expect(403);
  });

  it('allows EDITOR to upload audio and returns public URL under /uploads/audio/', async () => {
    const res = await request(app.getHttpServer())
      .post('/admin/media/upload')
      .set('Authorization', `Bearer ${editorToken}`)
      .attach('file', Buffer.from('fake-audio-bytes'), {
        filename: 'low-freq-wave.mp3',
        contentType: 'audio/mpeg',
      })
      .expect(201);

    expect(res.body.category).toBe('AUDIO');
    expect(res.body.url).toMatch(/^\/uploads\/audio\/.*\.mp3$/);
    expect(res.body.originalName).toBe('low-freq-wave.mp3');

    // Verify static serve
    const staticRes = await request(app.getHttpServer())
      .get(res.body.url)
      .expect(200);
    expect(staticRes.headers['content-type']).toMatch(/audio\/mpeg/);
  });

  it('allows ADMIN to upload interactive simulation and associates it with a Lesson', async () => {
    const htmlContent = '<html><body><h1>Acoustic Resonance Lab</h1></body></html>';
    const uploadRes = await request(app.getHttpServer())
      .post('/admin/media/upload')
      .set('Authorization', `Bearer ${adminToken}`)
      .attach('file', Buffer.from(htmlContent), {
        filename: 'resonance-sim.html',
        contentType: 'text/html',
      })
      .expect(201);

    expect(uploadRes.body.category).toBe('INTERACTIVE');
    expect(uploadRes.body.url).toMatch(/^\/uploads\/interactive\/.*\.html$/);

    // Create lesson with interactiveWidgetUrl
    const lessonRes = await request(app.getHttpServer())
      .post('/admin/content/lessons')
      .set('Authorization', `Bearer ${editorToken}`)
      .send({
        topicId: 'topic_sound',
        titleBangla: 'শব্দ ও তার বৈশিষ্ট্য',
        learningGoal: 'কম্পাঙ্ক ও স্বরের তীক্ষ্ণতা ব্যাখ্যা',
        explanation: 'শব্দের বেগ $v = f\\lambda$',
        interactiveWidgetUrl: uploadRes.body.url,
        importantTerms: [{ termBangla: 'কম্পাঙ্ক', termEnglish: 'Frequency' }],
      })
      .expect(201);

    expect(lessonRes.body.interactiveWidgetUrl).toBe(uploadRes.body.url);

    // Patch lesson: update interactiveWidgetUrl
    const patchRes = await request(app.getHttpServer())
      .patch(`/admin/content/lessons/${lessonRes.body.id}`)
      .set('Authorization', `Bearer ${editorToken}`)
      .send({
        interactiveWidgetUrl: '/uploads/interactive/new-sim.html',
      })
      .expect(200);

    expect(patchRes.body.interactiveWidgetUrl).toBe('/uploads/interactive/new-sim.html');

    // Patch lesson: clear interactiveWidgetUrl to null
    const clearRes = await request(app.getHttpServer())
      .patch(`/admin/content/lessons/${lessonRes.body.id}`)
      .set('Authorization', `Bearer ${editorToken}`)
      .send({
        interactiveWidgetUrl: null,
      })
      .expect(200);

    expect(clearRes.body.interactiveWidgetUrl).toBeNull();
  });
});
