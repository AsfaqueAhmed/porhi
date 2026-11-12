import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('ExamModule (e2e)', () => {
  let app: INestApplication;
  let users: any[] = [];
  let chapters: any[] = [];
  let questions: any[] = [];
  let examSessions: any[] = [];
  let revisionMistakes: any[] = [];
  let eventLogs: any[] = [];

  const sampleExplanation = {
    directAnswer: 'সঠিক উত্তর ক: $5\\text{ m/s}^2$।',
    coreConcept: 'নিউটনের গতির দ্বিতীয় সূত্র: $F = ma$।',
    stepDerivation: 'আমরা জানি, $F = ma \\implies a = \\frac{F}{m} = \\frac{10}{2} = 5\\text{ m/s}^2$।',
    distractorAnalysis: {
      opt_2: 'অপশন খ-তে ভর ও বলের গুণফল নেওয়া হয়েছে।',
      opt_3: 'অপশন গ-তে অনুপাত উল্টানো হয়েছে।',
    },
    textbookCitation: {
      bookTitle: 'পদার্থবিজ্ঞান (এসএসসি)',
      chapterName: 'তৃতীয় অধ্যায়: বল',
      pageNumber: 74,
    },
    proTipShortcut: 'ত্বরণ চাইলে সরাসরি $F$ কে $m$ দিয়ে ভাগ করো।',
  };

  const sampleExplanation2 = {
    directAnswer: 'সঠিক উত্তর খ: জুল (Joule)।',
    coreConcept: 'কাজের এসআই একক জুল।',
    stepDerivation: '$W = Fs$, একক $\\text{N}\\cdot\\text{m} = \\text{J}$।',
  };

  const mockPrismaService = {
    user: {
      findUnique: async ({ where }: any) => {
        if (where.id) return users.find((u) => u.id === where.id) || null;
        if (where.guestId) return users.find((u) => u.guestId === where.guestId) || null;
        if (where.phoneNumber) return users.find((u) => u.phoneNumber === where.phoneNumber) || null;
        return null;
      },
      create: async ({ data }: any) => {
        const newUser = {
          id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          guestId: data.guestId ?? null,
          phoneNumber: data.phoneNumber ?? null,
          fullName: data.fullName ?? null,
          role: data.role ?? 'STUDENT',
          selectedClass: data.selectedClass ?? 'SSC',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        users.push(newUser);
        return newUser;
      },
    },
    chapter: {
      findUnique: async ({ where }: any) => {
        return chapters.find((c) => c.id === where.id) || null;
      },
      findMany: async ({ where }: any) => {
        return chapters.filter((c) => {
          if (where.subjectId && c.subjectId !== where.subjectId) return false;
          return true;
        });
      },
    },
    question: {
      findUnique: async ({ where }: any) => {
        return questions.find((q) => q.id === where.id) || null;
      },
      findMany: async ({ where }: any) => {
        return questions.filter((q) => {
          if (where.id?.in && !where.id.in.includes(q.id)) return false;
          if (where.type && q.type !== where.type) return false;
          if (where.status && q.status !== where.status) return false;
          if (where.topicId && q.topicId !== where.topicId) return false;
          if (where.topic?.chapterId && q.topic?.chapterId !== where.topic.chapterId) return false;
          if (where.topic?.chapter?.subjectId) {
            const ch = chapters.find((c) => c.id === q.topic?.chapterId);
            if (!ch || ch.subjectId !== where.topic.chapter.subjectId) return false;
          }
          return true;
        });
      },
    },
    examSession: {
      findUnique: async ({ where }: any) => {
        return examSessions.find((s) => s.id === where.id) || null;
      },
      findMany: async ({ where }: any) => {
        return examSessions.filter((s) => {
          if (where.userId && s.userId !== where.userId) return false;
          if (where.status && s.status !== where.status) return false;
          if (where.subjectId && s.subjectId !== where.subjectId) return false;
          if (where.chapterId && s.chapterId !== where.chapterId) return false;
          if (where.testType && s.testType !== where.testType) return false;
          return true;
        });
      },
      create: async ({ data }: any) => {
        const session = {
          id: `ses_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          userId: data.userId,
          testType: data.testType,
          subjectId: data.subjectId,
          chapterId: data.chapterId ?? null,
          totalQuestions: data.totalQuestions,
          durationSeconds: data.durationSeconds,
          negativeRatio: data.negativeRatio ?? 0.25,
          score: data.score ?? 0.0,
          answers: data.answers ?? [],
          status: data.status ?? 'IN_PROGRESS',
          startedAt: new Date(),
          completedAt: null,
        };
        examSessions.push(session);
        return session;
      },
      update: async ({ where, data }: any) => {
        const idx = examSessions.findIndex((s) => s.id === where.id);
        if (idx === -1) throw new Error('ExamSession not found');
        const updated = {
          ...examSessions[idx],
          ...data,
          updatedAt: new Date(),
        };
        examSessions[idx] = updated;
        return updated;
      },
    },
    revisionMistake: {
      findMany: async ({ where }: any) => {
        return revisionMistakes.filter((m) => {
          if (where.userId && m.userId !== where.userId) return false;
          if (where.questionId && m.questionId !== where.questionId) return false;
          return true;
        });
      },
      upsert: async ({ where, create, update }: any) => {
        const userId = where.userId_questionId?.userId || where.userId;
        const questionId = where.userId_questionId?.questionId || where.questionId;
        const existingIdx = revisionMistakes.findIndex(
          (m) => m.userId === userId && m.questionId === questionId,
        );

        if (existingIdx !== -1) {
          const existing = revisionMistakes[existingIdx];
          const increment = update.attemptCount?.increment ?? 1;
          const updated = {
            ...existing,
            ...update,
            attemptCount: existing.attemptCount + increment,
            resolved: update.resolved !== undefined ? update.resolved : existing.resolved,
            updatedAt: new Date(),
          };
          revisionMistakes[existingIdx] = updated;
          return updated;
        } else {
          const created = {
            id: `rm_${Date.now()}_${Math.random()}`,
            userId,
            questionId,
            resolved: create.resolved ?? false,
            attemptCount: create.attemptCount ?? 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          revisionMistakes.push(created);
          return created;
        }
      },
    },
    eventLog: {
      create: async ({ data }: any) => {
        const log = {
          id: `ev_${Date.now()}_${Math.random()}`,
          userId: data.userId,
          eventType: data.eventType,
          payload: data.payload,
          timestamp: new Date(),
        };
        eventLogs.push(log);
        return log;
      },
      findMany: async ({ where }: any) => {
        return eventLogs.filter((e) => {
          if (where.userId && e.userId !== where.userId) return false;
          if (where.eventType && e.eventType !== where.eventType) return false;
          return true;
        });
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
    examSessions = [];
    revisionMistakes = [];
    eventLogs = [];

    chapters = [
      {
        id: 'chap-physics-force',
        subjectId: 'sub-ssc-physics',
        orderIndex: 3,
        titleBangla: 'বল (Force)',
      },
    ];

    questions = [
      {
        id: 'q-force-1',
        topicId: 'top-force-laws',
        topic: {
          id: 'top-force-laws',
          chapterId: 'chap-physics-force',
        },
        type: 'MCQ',
        stem: '$2\\text{ kg}$ ভরের বস্তুর ওপর $10\\text{ N}$ বল প্রযুক্ত হলে ত্বরণ কত?',
        options: [
          { id: 'opt_1a', text: '$5\\text{ m/s}^2$', isCorrect: true },
          { id: 'opt_1b', text: '$20\\text{ m/s}^2$', isCorrect: false },
          { id: 'opt_1c', text: '$0.2\\text{ m/s}^2$', isCorrect: false },
        ],
        explanation: sampleExplanation,
        difficulty: 'MEDIUM',
        isVerified: true,
        status: 'PUBLISHED',
        version: 1,
      },
      {
        id: 'q-force-2',
        topicId: 'top-force-laws',
        topic: {
          id: 'top-force-laws',
          chapterId: 'chap-physics-force',
        },
        type: 'MCQ',
        stem: 'কাজের এসআই একক কোনটি?',
        options: [
          { id: 'opt_2a', text: 'নিউটন (N)', isCorrect: false },
          { id: 'opt_2b', text: 'জুল (J)', isCorrect: true },
          { id: 'opt_2c', text: 'ওয়াট (W)', isCorrect: false },
        ],
        explanation: sampleExplanation2,
        difficulty: 'EASY',
        isVerified: true,
        status: 'PUBLISHED',
        version: 1,
      },
    ];
  });

  describe('Full Exam Lifecycle: start -> heartbeat -> submit -> result audit', () => {
    it('should complete full exam lifecycle with negative marking, mistake tracking, and event logging', async () => {
      // 1. Authenticate user 1
      const guestRes = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'exam-student-1' })
        .expect(201);

      const token1 = guestRes.body.accessToken;
      const user1Id = guestRes.body.user.id;

      // 2. Start Exam
      const startRes = await request(app.getHttpServer())
        .post('/exam/start')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          testType: 'CHAPTER_TEST',
          subjectId: 'sub-ssc-physics',
          chapterId: 'chap-physics-force',
          negativeRatio: 0.25,
        })
        .expect(201);

      const { sessionId, totalQuestions, durationSeconds, negativeRatio, questions: returnedQuestions } =
        startRes.body;

      expect(sessionId).toBeDefined();
      expect(totalQuestions).toBe(2);
      expect(durationSeconds).toBeGreaterThan(0);
      expect(negativeRatio).toBe(0.25);
      expect(returnedQuestions).toHaveLength(2);

      // Verify that options are stripped of isCorrect and explanation is omitted
      for (const q of returnedQuestions) {
        expect(q.stem).toBeDefined();
        expect(q.explanation).toBeUndefined();
        for (const opt of q.options) {
          expect(opt.id).toBeDefined();
          expect(opt.text).toBeDefined();
          expect(opt.isCorrect).toBeUndefined();
        }
      }

      // 3. Heartbeat autosave
      const heartbeatRes = await request(app.getHttpServer())
        .put(`/exam/heartbeat/${sessionId}`)
        .set('Authorization', `Bearer ${token1}`)
        .send({
          answers: [{ questionId: 'q-force-1', selectedOptionId: 'opt_1a', timeSpent: 25 }],
        })
        .expect(200);

      expect(heartbeatRes.body.success).toBe(true);

      // 4. Resume active session via GET /exam/session/:sessionId
      const resumeRes = await request(app.getHttpServer())
        .get(`/exam/session/${sessionId}`)
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(resumeRes.body.sessionId).toBe(sessionId);
      expect(resumeRes.body.status).toBe('IN_PROGRESS');
      expect(resumeRes.body.questions).toHaveLength(2);
      expect(resumeRes.body.answers).toBeDefined();

      // 5. Submit exam: q-force-1 correct (1.0), q-force-2 wrong (-0.25)
      const submitRes = await request(app.getHttpServer())
        .post(`/exam/submit/${sessionId}`)
        .set('Authorization', `Bearer ${token1}`)
        .send({
          answers: [
            { questionId: 'q-force-1', selectedOptionId: 'opt_1a', timeSpent: 30 }, // correct
            { questionId: 'q-force-2', selectedOptionId: 'opt_2a', timeSpent: 20 }, // wrong (chose N instead of J)
          ],
        })
        .expect(201);

      // Scorecard audit
      // 1 correct (1.0) - 1 wrong (0.25) = 0.75
      expect(submitRes.body.score).toBe(0.75);
      expect(submitRes.body.totalQuestions).toBe(2);
      expect(submitRes.body.correctCount).toBe(1);
      expect(submitRes.body.wrongCount).toBe(1);
      expect(submitRes.body.skippedCount).toBe(0);
      expect(submitRes.body.negativeDeduction).toBe(0.25);
      expect(submitRes.body.answersWithExplanation).toHaveLength(2);

      const ans1 = submitRes.body.answersWithExplanation.find((a: any) => a.questionId === 'q-force-1');
      expect(ans1.isCorrect).toBe(true);
      expect(ans1.topicId).toBe('top-force-laws');
      expect(ans1.selectedOptionId).toBe('opt_1a');
      expect(ans1.correctOptionId).toBe('opt_1a');
      expect(ans1.explanation).toEqual(sampleExplanation);

      const ans2 = submitRes.body.answersWithExplanation.find((a: any) => a.questionId === 'q-force-2');
      expect(ans2.isCorrect).toBe(false);
      expect(ans2.topicId).toBe('top-force-laws');
      expect(ans2.selectedOptionId).toBe('opt_2a');
      expect(ans2.correctOptionId).toBe('opt_2b');
      expect(ans2.explanation).toEqual(sampleExplanation2);

      // 6. Verify RevisionMistake was upserted for q-force-2 only
      expect(revisionMistakes).toHaveLength(1);
      expect(revisionMistakes[0]).toMatchObject({
        userId: user1Id,
        questionId: 'q-force-2',
        resolved: false,
        attemptCount: 1,
      });

      // 7. Verify EventLog contains TEST_SUBMIT
      const submitLogs = eventLogs.filter((e) => e.eventType === 'TEST_SUBMIT');
      expect(submitLogs).toHaveLength(1);
      expect(submitLogs[0]).toMatchObject({
        userId: user1Id,
        eventType: 'TEST_SUBMIT',
        payload: {
          sessionId,
          score: 0.75,
          totalQuestions: 2,
          correctCount: 1,
          wrongCount: 1,
          skippedCount: 0,
        },
      });

      // 8. View completed scorecard via GET /exam/session/:sessionId
      const completedSessionRes = await request(app.getHttpServer())
        .get(`/exam/session/${sessionId}`)
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(completedSessionRes.body.status).toBe('COMPLETED');
      expect(completedSessionRes.body.score).toBe(0.75);
      expect(completedSessionRes.body.correctCount).toBe(1);
      expect(completedSessionRes.body.wrongCount).toBe(1);
      expect(completedSessionRes.body.answersWithExplanation).toHaveLength(2);

      // 9. Re-submission should fail with 400
      await request(app.getHttpServer())
        .post(`/exam/submit/${sessionId}`)
        .set('Authorization', `Bearer ${token1}`)
        .send({ answers: [] })
        .expect(400);

      // 10. Heartbeat on completed session should fail with 400
      await request(app.getHttpServer())
        .put(`/exam/heartbeat/${sessionId}`)
        .set('Authorization', `Bearer ${token1}`)
        .send({ answers: [] })
        .expect(400);
    });

    it('should reject unauthenticated requests with 401', async () => {
      await request(app.getHttpServer())
        .post('/exam/start')
        .send({ testType: 'CHAPTER_TEST', subjectId: 'sub-ssc-physics', chapterId: 'chap-physics-force' })
        .expect(401);

      await request(app.getHttpServer())
        .put('/exam/heartbeat/non-existent-session')
        .send({ answers: [] })
        .expect(401);

      await request(app.getHttpServer())
        .post('/exam/submit/non-existent-session')
        .send({ answers: [] })
        .expect(401);

      await request(app.getHttpServer())
        .get('/exam/session/non-existent-session')
        .expect(401);
    });

    it('should prevent access to other users exam session with 403', async () => {
      // User 1
      const res1 = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'user-alpha' })
        .expect(201);
      const token1 = res1.body.accessToken;

      // User 2
      const res2 = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'user-beta' })
        .expect(201);
      const token2 = res2.body.accessToken;

      // User 1 starts session
      const startRes = await request(app.getHttpServer())
        .post('/exam/start')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          testType: 'CHAPTER_TEST',
          subjectId: 'sub-ssc-physics',
          chapterId: 'chap-physics-force',
        })
        .expect(201);

      const sessionId = startRes.body.sessionId;

      // User 2 tries heartbeat
      await request(app.getHttpServer())
        .put(`/exam/heartbeat/${sessionId}`)
        .set('Authorization', `Bearer ${token2}`)
        .send({ answers: [] })
        .expect(403);

      // User 2 tries get session
      await request(app.getHttpServer())
        .get(`/exam/session/${sessionId}`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(403);

      // User 2 tries submit
      await request(app.getHttpServer())
        .post(`/exam/submit/${sessionId}`)
        .set('Authorization', `Bearer ${token2}`)
        .send({ answers: [] })
        .expect(403);
    });

    it('should reject invalid StartExamDto parameters and subject-chapter mismatch', async () => {
      const guestRes = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'validation-user' })
        .expect(201);
      const token = guestRes.body.accessToken;

      // Invalid testType
      await request(app.getHttpServer())
        .post('/exam/start')
        .set('Authorization', `Bearer ${token}`)
        .send({
          testType: 'INVALID_TYPE',
          subjectId: 'sub-ssc-physics',
          chapterId: 'chap-physics-force',
        })
        .expect(400);

      // Negative ratio > 1.0
      await request(app.getHttpServer())
        .post('/exam/start')
        .set('Authorization', `Bearer ${token}`)
        .send({
          testType: 'CHAPTER_TEST',
          subjectId: 'sub-ssc-physics',
          chapterId: 'chap-physics-force',
          negativeRatio: 1.5,
        })
        .expect(400);

      // Duration < 60s
      await request(app.getHttpServer())
        .post('/exam/start')
        .set('Authorization', `Bearer ${token}`)
        .send({
          testType: 'CHAPTER_TEST',
          subjectId: 'sub-ssc-physics',
          chapterId: 'chap-physics-force',
          durationSeconds: 30,
        })
        .expect(400);

      // Subject-chapter mismatch
      await request(app.getHttpServer())
        .post('/exam/start')
        .set('Authorization', `Bearer ${token}`)
        .send({
          testType: 'CHAPTER_TEST',
          subjectId: 'different-subject',
          chapterId: 'chap-physics-force',
        })
        .expect(400);
    });

    it('supports SUBJECT_TEST start without chapterId, submit with percentile, and GET /exam/history', async () => {
      const guestRes = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'subject-test-user' })
        .expect(201);
      const token = guestRes.body.accessToken;

      const startRes = await request(app.getHttpServer())
        .post('/exam/start')
        .set('Authorization', `Bearer ${token}`)
        .send({
          testType: 'SUBJECT_TEST',
          subjectId: 'sub-ssc-physics',
          questionLimit: 25,
        })
        .expect(201);

      expect(startRes.body.sessionId).toBeDefined();
      expect(startRes.body.questions.length).toBeGreaterThan(0);

      const submitRes = await request(app.getHttpServer())
        .post(`/exam/submit/${startRes.body.sessionId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ answers: [] })
        .expect(201);

      expect(submitRes.body.percentile).toBeTypeOf('number');

      const historyRes = await request(app.getHttpServer())
        .get('/exam/history?testType=SUBJECT_TEST')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(historyRes.body.items).toHaveLength(1);
      expect(historyRes.body.summary.subjectTestsCount).toBe(1);
      expect(historyRes.body.trend).toHaveLength(1);
    });
  });
});

