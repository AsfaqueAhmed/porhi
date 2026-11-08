import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('PracticeModule (e2e)', () => {
  let app: INestApplication;
  let users: any[] = [];
  let chapters: any[] = [];
  let questions: any[] = [];
  let revisionMistakes: any[] = [];
  let eventLogs: any[] = [];

  const sampleExplanation = {
    directAnswer: 'সঠিক উত্তর ক: $5\\text{ m/s}^2$।',
    coreConcept: 'নিউটনের গতির দ্বিতীয় সূত্র: $F = ma$।',
    stepDerivation: 'আমরা জানি, $F = ma \\implies a = \\frac{F}{m} = \\frac{10}{2} = 5\\text{ m/s}^2$।',
    distractorAnalysis: {
      opt_2: 'অপশন খ-তে ভর ও বলের গুণফল নেওয়া হয়েছে।',
      opt_3: 'অপশন গ-তে অনুপাত উল্টানো হয়েছে।',
      opt_4: 'অপশন ঘ সম্পূর্ণ ভুল সূত্র।',
    },
    textbookCitation: {
      bookTitle: 'পদার্থবিজ্ঞান (এসএসসি)',
      chapterName: 'তৃতীয় অধ্যায়: বল',
      pageNumber: 74,
    },
    proTipShortcut: 'ত্বরণ চাইলে সরাসরি $F$ কে $m$ দিয়ে ভাগ করো।',
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
          if (where.type && q.type !== where.type) return false;
          if (where.status && q.status !== where.status) return false;
          if (where.topic?.chapterId && q.topic?.chapterId !== where.topic.chapterId) return false;
          return true;
        });
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
    $transaction: async (fn: any) => {
      if (typeof fn === 'function') {
        return fn(mockPrismaService);
      }
      return Promise.all(fn);
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
    revisionMistakes = [];
    eventLogs = [];

    chapters = [
      {
        id: 'chap-force-101',
        subjectId: 'sub-physics-1',
        orderIndex: 3,
        titleBangla: 'বল (Force)',
      },
    ];

    questions = [
      {
        id: 'q-force-201',
        topicId: 'top-force-1',
        topic: {
          id: 'top-force-1',
          chapterId: 'chap-force-101',
        },
        type: 'MCQ',
        stem: '$2\\text{ kg}$ ভরের বস্তুর ওপর $10\\text{ N}$ বল প্রযুক্ত হলে ত্বরণ কত?',
        options: [
          { id: 'opt_1', text: '$5\\text{ m/s}^2$', isCorrect: true },
          { id: 'opt_2', text: '$20\\text{ m/s}^2$', isCorrect: false },
          { id: 'opt_3', text: '$0.2\\text{ m/s}^2$', isCorrect: false },
          { id: 'opt_4', text: '$8\\text{ m/s}^2$', isCorrect: false },
        ],
        explanation: sampleExplanation,
        difficulty: 'MEDIUM',
        boardSource: 'Dhaka Board 2024',
        isVerified: true,
        status: 'PUBLISHED',
        version: 1,
      },
    ];
  });

  describe('GET /practice/chapter/:chapterId/questions', () => {
    it('should return 404 for non-existent chapter', async () => {
      await request(app.getHttpServer())
        .get('/practice/chapter/unknown-chap/questions')
        .expect(404);
    });

    it('should return chapter MCQs with options randomized and isCorrect stripped out, explanation omitted', async () => {
      const response = await request(app.getHttpServer())
        .get('/practice/chapter/chap-force-101/questions')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);

      const q = response.body[0];
      expect(q.id).toBe('q-force-201');
      expect(q.stem).toBe('$2\\text{ kg}$ ভরের বস্তুর ওপর $10\\text{ N}$ বল প্রযুক্ত হলে ত্বরণ কত?');
      expect(q.type).toBe('MCQ');

      // Explanation MUST be hidden
      expect(q.explanation).toBeUndefined();

      // Options must have isCorrect stripped out
      expect(q.options).toHaveLength(4);
      for (const opt of q.options) {
        expect(opt.id).toBeDefined();
        expect(opt.text).toBeDefined();
        expect(opt.isCorrect).toBeUndefined();
      }

      // Options contain all 4 items
      const optionIds = q.options.map((o: any) => o.id);
      expect(optionIds).toContain('opt_1');
      expect(optionIds).toContain('opt_2');
      expect(optionIds).toContain('opt_3');
      expect(optionIds).toContain('opt_4');
    });

    it('should support route alias /practice/:chapterId/questions and filter out DRAFT questions', async () => {
      // Add a draft question to the chapter
      questions.push({
        id: 'q-draft-301',
        topicId: 'top-force-1',
        topic: { id: 'top-force-1', chapterId: 'chap-force-101' },
        type: 'MCQ',
        stem: 'খসড়া প্রশ্ন',
        options: [{ id: 'opt_draft', text: 'উত্তর', isCorrect: true }],
        explanation: sampleExplanation,
        status: 'DRAFT',
      });

      const response = await request(app.getHttpServer())
        .get('/practice/chap-force-101/questions')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].id).toBe('q-force-201');
    });
  });

  describe('POST /practice/submit', () => {
    it('should reject invalid body with 400', async () => {
      await request(app.getHttpServer())
        .post('/practice/submit')
        .send({})
        .expect(400);

      await request(app.getHttpServer())
        .post('/practice/submit')
        .send({ questionId: 'q-force-201' })
        .expect(400);
    });

    it('should reject option that does not belong to question with 400', async () => {
      await request(app.getHttpServer())
        .post('/practice/submit')
        .send({
          questionId: 'q-force-201',
          selectedOptionId: 'non-existent-option',
        })
        .expect(400);
    });

    it('should return 404 for non-existent question', async () => {
      await request(app.getHttpServer())
        .post('/practice/submit')
        .send({
          questionId: 'missing-q',
          selectedOptionId: 'opt_1',
        })
        .expect(404);
    });

    it('should return isCorrect: true with full explanation on correct answer without recording mistake', async () => {
      // Create guest session to have an authenticated user
      const guestRes = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'guest-practice-user-1' })
        .expect(201);

      const token = guestRes.body.accessToken;

      const submitRes = await request(app.getHttpServer())
        .post('/practice/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({
          questionId: 'q-force-201',
          selectedOptionId: 'opt_1',
        })
        .expect(201);

      expect(submitRes.body.isCorrect).toBe(true);
      expect(submitRes.body.correctOptionId).toBe('opt_1');
      expect(submitRes.body.explanation).toEqual(sampleExplanation);

      // Verify no revision mistake was recorded
      expect(revisionMistakes).toHaveLength(0);

      // Verify event log recorded
      expect(eventLogs).toHaveLength(1);
      expect(eventLogs[0]).toMatchObject({
        eventType: 'PRACTICE_ATTEMPT',
        payload: {
          questionId: 'q-force-201',
          selectedOptionId: 'opt_1',
          isCorrect: true,
        },
      });
    });

    it('should return isCorrect: false with full explanation, upsert RevisionMistake, and increment attemptCount on consecutive mistakes', async () => {
      // Create guest session
      const guestRes = await request(app.getHttpServer())
        .post('/auth/guest')
        .send({ guestId: 'guest-practice-user-2' })
        .expect(201);

      const token = guestRes.body.accessToken;
      const userId = guestRes.body.user.id;

      // 1. First incorrect attempt
      const firstSubmit = await request(app.getHttpServer())
        .post('/practice/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({
          questionId: 'q-force-201',
          selectedOptionId: 'opt_2',
        })
        .expect(201);

      expect(firstSubmit.body.isCorrect).toBe(false);
      expect(firstSubmit.body.correctOptionId).toBe('opt_1');
      expect(firstSubmit.body.explanation).toEqual(sampleExplanation);
      expect(firstSubmit.body.explanation.directAnswer).toBeDefined();
      expect(firstSubmit.body.explanation.coreConcept).toBeDefined();
      expect(firstSubmit.body.explanation.stepDerivation).toBeDefined();
      expect(firstSubmit.body.explanation.distractorAnalysis).toBeDefined();
      expect(firstSubmit.body.explanation.textbookCitation).toBeDefined();
      expect(firstSubmit.body.explanation.proTipShortcut).toBeDefined();

      // Revision mistake created
      expect(revisionMistakes).toHaveLength(1);
      expect(revisionMistakes[0]).toMatchObject({
        userId,
        questionId: 'q-force-201',
        resolved: false,
        attemptCount: 1,
      });

      // 2. Second incorrect attempt for same question
      const secondSubmit = await request(app.getHttpServer())
        .post('/practice/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({
          questionId: 'q-force-201',
          selectedOptionId: 'opt_3',
        })
        .expect(201);

      expect(secondSubmit.body.isCorrect).toBe(false);

      // Revision mistake updated with attemptCount = 2
      expect(revisionMistakes).toHaveLength(1);
      expect(revisionMistakes[0].attemptCount).toBe(2);
      expect(revisionMistakes[0].resolved).toBe(false);

      // Both attempts logged
      expect(eventLogs).toHaveLength(2);
    });
  });
});
