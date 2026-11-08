import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { Role, ContentStatus } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('ContentAdminModule (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  let users: any[] = [];
  let topics: any[] = [];
  let lessons: any[] = [];
  let questions: any[] = [];
  let contentReviews: any[] = [];

  let studentToken: string;
  let editorToken: string;
  let reviewerToken: string;
  let adminToken: string;

  let studentUser: any;
  let editorUser: any;
  let reviewerUser: any;
  let adminUser: any;

  const mockPrismaService = {
    $transaction: async (cb: any) => cb(mockPrismaService),
    user: {
      findUnique: async ({ where }: any) => {
        if (where.id) return users.find((u) => u.id === where.id) || null;
        if (where.guestId) return users.find((u) => u.guestId === where.guestId) || null;
        if (where.phoneNumber) return users.find((u) => u.phoneNumber === where.phoneNumber) || null;
        return null;
      },
    },
    topic: {
      findUnique: async ({ where }: any) => {
        return topics.find((t) => t.id === where.id) || null;
      },
    },
    lesson: {
      findUnique: async ({ where }: any) => {
        return lessons.find((l) => l.id === where.id) || null;
      },
      findMany: async ({ where }: any) => {
        let res = lessons.filter((l) => {
          if (where?.status?.in && !where.status.in.includes(l.status)) return false;
          return true;
        });
        return res;
      },
      create: async ({ data }: any) => {
        const newLesson = {
          id: `les_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          topicId: data.topicId,
          titleBangla: data.titleBangla,
          learningGoal: data.learningGoal,
          explanation: data.explanation,
          importantTerms: data.importantTerms,
          workedExample: data.workedExample ?? null,
          memoryAid: data.memoryAid ?? null,
          status: data.status ?? ContentStatus.DRAFT,
          version: data.version ?? 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        lessons.push(newLesson);
        return newLesson;
      },
      update: async ({ where, data }: any) => {
        const idx = lessons.findIndex((l) => l.id === where.id);
        if (idx === -1) throw new Error('Lesson not found');
        const curr = lessons[idx];
        const updated = {
          ...curr,
          ...data,
          version: data.version?.increment ? curr.version + data.version.increment : curr.version,
          updatedAt: new Date(),
        };
        lessons[idx] = updated;
        return updated;
      },
    },
    question: {
      findUnique: async ({ where }: any) => {
        return questions.find((q) => q.id === where.id) || null;
      },
      findMany: async ({ where }: any) => {
        let res = questions.filter((q) => {
          if (where?.status?.in && !where.status.in.includes(q.status)) return false;
          return true;
        });
        return res;
      },
      create: async ({ data }: any) => {
        const newQuestion = {
          id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          topicId: data.topicId,
          type: data.type ?? 'MCQ',
          stem: data.stem,
          options: data.options ?? null,
          explanation: data.explanation,
          cqRubric: data.cqRubric ?? null,
          difficulty: data.difficulty ?? 'MEDIUM',
          boardSource: data.boardSource ?? null,
          isVerified: data.isVerified ?? false,
          status: data.status ?? ContentStatus.DRAFT,
          version: data.version ?? 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        questions.push(newQuestion);
        return newQuestion;
      },
      update: async ({ where, data }: any) => {
        const idx = questions.findIndex((q) => q.id === where.id);
        if (idx === -1) throw new Error('Question not found');
        const curr = questions[idx];
        const updated = {
          ...curr,
          ...data,
          version: data.version?.increment ? curr.version + data.version.increment : curr.version,
          updatedAt: new Date(),
        };
        questions[idx] = updated;
        return updated;
      },
    },
    contentReview: {
      create: async ({ data }: any) => {
        const review = {
          id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          reviewerId: data.reviewerId,
          contentType: data.contentType,
          contentId: data.contentId,
          action: data.action,
          comment: data.comment ?? null,
          version: data.version,
          createdAt: new Date(),
        };
        contentReviews.push(review);
        return review;
      },
      findMany: async ({ where, include }: any) => {
        return contentReviews
          .filter((r) => r.contentId === where.contentId)
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map((r) => {
            if (include?.reviewer) {
              const rev = users.find((u) => u.id === r.reviewerId);
              return {
                ...r,
                reviewer: rev
                  ? { id: rev.id, fullName: rev.fullName, role: rev.role }
                  : null,
              };
            }
            return r;
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

    jwtService = moduleFixture.get<JwtService>(JwtService);

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
    users = [
      {
        id: 'usr_student',
        fullName: 'Student User',
        role: Role.STUDENT,
        selectedClass: 'SSC',
      },
      {
        id: 'usr_editor',
        fullName: 'Editor User',
        role: Role.EDITOR,
        selectedClass: 'SSC',
      },
      {
        id: 'usr_reviewer',
        fullName: 'Reviewer User',
        role: Role.REVIEWER,
        selectedClass: 'SSC',
      },
      {
        id: 'usr_admin',
        fullName: 'Admin User',
        role: Role.ADMIN,
        selectedClass: 'SSC',
      },
    ];

    studentUser = users[0];
    editorUser = users[1];
    reviewerUser = users[2];
    adminUser = users[3];

    studentToken = jwtService.sign({ sub: studentUser.id, role: studentUser.role });
    editorToken = jwtService.sign({ sub: editorUser.id, role: editorUser.role });
    reviewerToken = jwtService.sign({ sub: reviewerUser.id, role: reviewerUser.role });
    adminToken = jwtService.sign({ sub: adminUser.id, role: adminUser.role });

    topics = [
      {
        id: 'topic_force',
        chapterId: 'chap_force',
        orderIndex: 1,
        titleBangla: 'নিউটনের গতির সূত্র',
      },
    ];

    lessons = [];
    questions = [];
    contentReviews = [];
  });

  describe('Authentication & Role-Based Authorization Enforcement', () => {
    it('should return 401 Unauthorized for unauthenticated requests', async () => {
      await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .send({ topicId: 'topic_force', titleBangla: 'বল' })
        .expect(401);

      await request(app.getHttpServer())
        .post('/admin/content/questions')
        .send({ topicId: 'topic_force', stem: 'ত্বরণ কত?' })
        .expect(401);

      await request(app.getHttpServer())
        .post('/admin/content/review')
        .send({ contentType: 'LESSON', contentId: 'l1', action: 'APPROVE' })
        .expect(401);

      await request(app.getHttpServer())
        .get('/admin/content/pending')
        .expect(401);

      await request(app.getHttpServer())
        .get('/admin/content/reviews/some-id')
        .expect(401);
    });

    it('should reject STUDENT users with 403 Forbidden for all editorial endpoints', async () => {
      await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          topicId: 'topic_force',
          titleBangla: 'বল',
          learningGoal: 'গোল',
          explanation: 'ব্যাখ্যা',
          importantTerms: [{ termBangla: 'জড়তা' }],
        })
        .expect(403);

      await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          topicId: 'topic_force',
          type: 'MCQ',
          stem: 'স্টেম',
          options: [
            { id: 'opt_1', text: 'অপশন ১', isCorrect: true },
            { id: 'opt_2', text: 'অপশন ২', isCorrect: false },
          ],
          explanation: { directAnswer: 'উত্তর', coreConcept: 'কনসেপ্ট' },
          difficulty: 'MEDIUM',
        })
        .expect(403);

      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          contentType: 'LESSON',
          contentId: 'les_dummy',
          action: 'APPROVE',
        })
        .expect(403);

      await request(app.getHttpServer())
        .get('/admin/content/pending')
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(403);

      await request(app.getHttpServer())
        .get('/admin/content/reviews/les_dummy')
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(403);
    });

    it('should reject REVIEWER users when trying to create lessons or questions with 403', async () => {
      await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          topicId: 'topic_force',
          titleBangla: 'বল',
          learningGoal: 'গোল',
          explanation: 'ব্যাখ্যা',
          importantTerms: [{ termBangla: 'জড়তা' }],
        })
        .expect(403);

      await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          topicId: 'topic_force',
          type: 'MCQ',
          stem: 'স্টেম',
          options: [
            { id: 'opt_1', text: 'অপশন ১', isCorrect: true },
            { id: 'opt_2', text: 'অপশন ২', isCorrect: false },
          ],
          explanation: { directAnswer: 'উত্তর', coreConcept: 'কনসেপ্ট' },
          difficulty: 'MEDIUM',
        })
        .expect(403);
    });

    it('should reject EDITOR users when trying to review content with 403', async () => {
      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          contentType: 'LESSON',
          contentId: 'some_id',
          action: 'APPROVE',
        })
        .expect(403);
    });
  });

  describe('Full Editorial Lifecycle (Editor Draft -> Reviewer Changes -> Publish)', () => {
    it('should complete draft creation, pending query, review rejection/correction, and final approval', async () => {
      // 1. Editor creates a draft lesson
      const lessonPayload = {
        topicId: 'topic_force',
        titleBangla: 'নিউটনের গতিসূত্র',
        learningGoal: 'নিউটনের ৩টি সূত্র ব্যাখ্যা ও প্রয়োগ করতে পারা',
        explanation: '# নিউটনের ১ম ও ২য় সূত্র\n\n$F = ma$',
        importantTerms: [
          {
            termBangla: 'জড়তা',
            termEnglish: 'Inertia',
            definition: 'বস্তুর গতির পরিবর্তনকে বাধা দেওয়ার প্রবণতা',
          },
        ],
        workedExample: {
          problem: '$10\\text{ N}$ বল $2\\text{ kg}$ ভরের বস্তুর ওপর কাজ করলে ত্বরণ কত?',
          stepByStepSolution: '$a = F/m = 10/2 = 5\\text{ m/s}^2$',
        },
        memoryAid: '১ম: জড়তা, ২য়: $F=ma$, ৩য়: প্রতিক্রিয়া',
      };

      const createLessonRes = await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${editorToken}`)
        .send(lessonPayload)
        .expect(201);

      const createdLesson = createLessonRes.body;
      expect(createdLesson.id).toBeDefined();
      expect(createdLesson.status).toBe(ContentStatus.DRAFT);
      expect(createdLesson.version).toBe(1);
      expect(createdLesson.titleBangla).toBe(lessonPayload.titleBangla);

      // 2. Editor creates a draft question
      const questionPayload = {
        topicId: 'topic_force',
        type: 'MCQ',
        stem: '$4\\text{ kg}$ ভরের ওপর $12\\text{ N}$ বল প্রয়োগ করলে ত্বরণ কত?',
        options: [
          { id: 'opt_a', text: '$3\\text{ m/s}^2$', isCorrect: true },
          { id: 'opt_b', text: '$48\\text{ m/s}^2$', isCorrect: false },
        ],
        explanation: {
          directAnswer: 'সঠিক উত্তর ক: $3\\text{ m/s}^2$',
          coreConcept: '$a = F/m$',
        },
        difficulty: 'MEDIUM',
        boardSource: 'Dhaka Board 2024',
      };

      const createQuestionRes = await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send(questionPayload)
        .expect(201);

      const createdQuestion = createQuestionRes.body;
      expect(createdQuestion.id).toBeDefined();
      expect(createdQuestion.status).toBe(ContentStatus.DRAFT);
      expect(createdQuestion.version).toBe(1);
      expect(createdQuestion.isVerified).toBe(false);

      // 3. Reviewer inspects pending content
      const pendingRes = await request(app.getHttpServer())
        .get('/admin/content/pending')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(200);

      expect(pendingRes.body.lessons).toHaveLength(1);
      expect(pendingRes.body.lessons[0].id).toBe(createdLesson.id);
      expect(pendingRes.body.questions).toHaveLength(1);
      expect(pendingRes.body.questions[0].id).toBe(createdQuestion.id);

      // 4. Reviewer requests changes on Question
      const requestChangesRes = await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'QUESTION',
          contentId: createdQuestion.id,
          action: 'REQUEST_CHANGES',
          comment: 'Please add 4 full MCQ options instead of 2',
        })
        .expect(201);

      expect(requestChangesRes.body.status).toBe(ContentStatus.CORRECTION);
      expect(requestChangesRes.body.version).toBe(1);

      // Verify question is now in CORRECTION in database
      const questionInDb = questions.find((q) => q.id === createdQuestion.id);
      expect(questionInDb.status).toBe(ContentStatus.CORRECTION);

      // 5. Reviewer approves Lesson -> PUBLISHED and version incremented to 2
      const approveLessonRes = await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'LESSON',
          contentId: createdLesson.id,
          action: 'APPROVE',
          comment: 'Content is verified against NCTB 2026 syllabus',
        })
        .expect(201);

      expect(approveLessonRes.body.status).toBe(ContentStatus.PUBLISHED);
      expect(approveLessonRes.body.version).toBe(2);

      // Verify lesson is now PUBLISHED in database
      const lessonInDb = lessons.find((l) => l.id === createdLesson.id);
      expect(lessonInDb.status).toBe(ContentStatus.PUBLISHED);
      expect(lessonInDb.version).toBe(2);

      // 6. Reviewer checks pending content again
      // Published lesson should NOT be in pending list; question in CORRECTION status MUST still be in pending list
      const pendingRes2 = await request(app.getHttpServer())
        .get('/admin/content/pending')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(200);

      expect(pendingRes2.body.lessons).toHaveLength(0);
      expect(pendingRes2.body.questions).toHaveLength(1);
      expect(pendingRes2.body.questions[0].id).toBe(createdQuestion.id);

      // 7. Reviewer approves Question after editor correction
      const approveQuestionRes = await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'QUESTION',
          contentId: createdQuestion.id,
          action: 'APPROVE',
          comment: 'Approved with full options and LaTeX formula verified',
        })
        .expect(201);

      expect(approveQuestionRes.body.status).toBe(ContentStatus.PUBLISHED);
      expect(approveQuestionRes.body.version).toBe(2);

      // 8. Editor views audit history for Question (including reviewer details)
      const questionReviewsRes = await request(app.getHttpServer())
        .get(`/admin/content/reviews/${createdQuestion.id}`)
        .set('Authorization', `Bearer ${editorToken}`)
        .expect(200);

      expect(questionReviewsRes.body).toHaveLength(2);
      expect(questionReviewsRes.body[0].action).toBe('REQUEST_CHANGES');
      expect(questionReviewsRes.body[0].comment).toContain('Please add 4 full MCQ options');
      expect(questionReviewsRes.body[0].reviewer).toBeDefined();
      expect(questionReviewsRes.body[0].reviewer.role).toBe('REVIEWER');
      expect(questionReviewsRes.body[1].action).toBe('APPROVE');
      expect(questionReviewsRes.body[1].version).toBe(2);
      expect(questionReviewsRes.body[1].reviewer).toBeDefined();

      // 9. Admin views audit history for Lesson (including reviewer details)
      const lessonReviewsRes = await request(app.getHttpServer())
        .get(`/admin/content/reviews/${createdLesson.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(lessonReviewsRes.body).toHaveLength(1);
      expect(lessonReviewsRes.body[0].action).toBe('APPROVE');
      expect(lessonReviewsRes.body[0].version).toBe(2);
      expect(lessonReviewsRes.body[0].reviewer).toBeDefined();
    });

    it('should allow ADMIN to perform both drafting and review actions', async () => {
      // Admin creates lesson
      const adminLessonRes = await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          topicId: 'topic_force',
          titleBangla: 'মহাকর্ষ সূত্র',
          learningGoal: 'মহাকর্ষ ব্যাখ্যা',
          explanation: '$F = G\\frac{m_1 m_2}{r^2}$',
          importantTerms: [{ termBangla: 'মহাকর্ষ' }],
        })
        .expect(201);

      const lessonId = adminLessonRes.body.id;

      // Admin approves lesson
      const adminReviewRes = await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          contentType: 'LESSON',
          contentId: lessonId,
          action: 'APPROVE',
          comment: 'Admin direct approval',
        })
        .expect(201);

      expect(adminReviewRes.body.status).toBe(ContentStatus.PUBLISHED);
      expect(adminReviewRes.body.version).toBe(2);
    });
  });

  describe('Validation & Edge Cases', () => {
    it('should reject invalid CreateLessonAdminDto with 400 Bad Request', async () => {
      // Missing required fields
      await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          // missing titleBangla, learningGoal, explanation, importantTerms
        })
        .expect(400);

      // importantTerms missing termBangla
      await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          titleBangla: 'বল',
          learningGoal: 'গোল',
          explanation: 'ব্যাখ্যা',
          importantTerms: [{ termEnglish: 'Force' }],
        })
        .expect(400);
    });

    it('should reject invalid CreateQuestionAdminDto with 400 Bad Request', async () => {
      // Invalid type and missing stem
      await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          type: 'INVALID_QUESTION_TYPE',
          difficulty: 'MEDIUM',
        })
        .expect(400);

      // MCQ with less than 2 options
      await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          type: 'MCQ',
          stem: 'স্টেম',
          options: [{ id: 'opt_1', text: 'অপশন ১', isCorrect: true }],
          explanation: { directAnswer: 'উত্তর', coreConcept: 'কনসেপ্ট' },
          difficulty: 'MEDIUM',
        })
        .expect(400);

      // MCQ without correct option
      await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          type: 'MCQ',
          stem: 'স্টেম',
          options: [
            { id: 'opt_1', text: 'অপশন ১', isCorrect: false },
            { id: 'opt_2', text: 'অপশন ২', isCorrect: false },
          ],
          explanation: { directAnswer: 'উত্তর', coreConcept: 'কনসেপ্ট' },
          difficulty: 'MEDIUM',
        })
        .expect(400);

      // Explanation missing directAnswer or coreConcept
      await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          type: 'MCQ',
          stem: 'স্টেম',
          options: [
            { id: 'opt_1', text: 'অপশন ১', isCorrect: true },
            { id: 'opt_2', text: 'অপশন ২', isCorrect: false },
          ],
          explanation: { directAnswer: 'উত্তর' },
          difficulty: 'MEDIUM',
        })
        .expect(400);
    });

    it('should reject invalid ReviewContentDto with 400 Bad Request', async () => {
      // Invalid action
      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'LESSON',
          contentId: 'some_id',
          action: 'INVALID_ACTION',
        })
        .expect(400);

      // Invalid contentType
      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'INVALID_TYPE',
          contentId: 'some_id',
          action: 'APPROVE',
        })
        .expect(400);

      // Missing comment when requesting changes or rejecting
      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'LESSON',
          contentId: 'some_id',
          action: 'REQUEST_CHANGES',
          // missing comment
        })
        .expect(400);
    });

    it('should return 404 when topic does not exist for lesson creation', async () => {
      await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'non_existent_topic',
          titleBangla: 'শিরোনাম',
          learningGoal: 'গোল',
          explanation: 'ব্যাখ্যা',
          importantTerms: [{ termBangla: 'জড়তা' }],
        })
        .expect(404);
    });

    it('should return 404 when reviewing non-existent content', async () => {
      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'LESSON',
          contentId: 'non_existent_lesson',
          action: 'APPROVE',
        })
        .expect(404);
    });
  });
});
