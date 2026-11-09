import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { Role, ContentStatus, Prisma } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('ContentAdminModule (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  let users: any[] = [];
  let subjects: any[] = [];
  let chapters: any[] = [];
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

  const attachTopicHierarchy = (item: any) => {
    const t = topics.find((itemTopic) => itemTopic.id === item.topicId);
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
      findUnique: async ({ where, include }: any) => {
        const found = lessons.find((l) => l.id === where.id) || null;
        if (!found) return null;
        return include?.topic ? attachTopicHierarchy(found) : found;
      },
      findMany: async ({ where, include, skip = 0, take }: any) => {
        const matchWhere = (l: any) => {
          if (where?.topicId && l.topicId !== where.topicId) return false;
          if (where?.status) {
            if (typeof where.status === 'string' && l.status !== where.status) return false;
            if (where.status.in && !where.status.in.includes(l.status)) return false;
            if (where.status.not && l.status === where.status.not) return false;
          }
          if (where?.topic) {
            const t = topics.find((item) => item.id === l.topicId);
            if (!t) return false;
            if (where.topic.chapterId && t.chapterId !== where.topic.chapterId) return false;
            if (where.topic.chapter?.subjectId) {
              const ch = chapters.find((c) => c.id === t.chapterId);
              if (!ch || ch.subjectId !== where.topic.chapter.subjectId) return false;
            }
          }
          if (where?.OR) {
            const needle = (where.OR[0]?.titleBangla?.contains || '').toLowerCase();
            const titleMatch = (l.titleBangla || '').toLowerCase().includes(needle);
            const goalMatch = (l.learningGoal || '').toLowerCase().includes(needle);
            if (!titleMatch && !goalMatch) return false;
          }
          return true;
        };

        let res = lessons
          .filter(matchWhere)
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        if (typeof take === 'number') {
          res = res.slice(skip, skip + take);
        }
        return include?.topic ? res.map(attachTopicHierarchy) : res;
      },
      count: async ({ where }: any) => {
        const list = await mockPrismaService.lesson.findMany({ where });
        return list.length;
      },
      groupBy: async ({ where }: any) => {
        const matched = await mockPrismaService.lesson.findMany({ where });
        const counts = new Map<string, number>();
        for (const l of matched) {
          counts.set(l.status, (counts.get(l.status) || 0) + 1);
        }
        return Array.from(counts.entries()).map(([status, _all]) => ({
          status,
          _count: { _all },
        }));
      },
      create: async ({ data }: any) => {
        const newLesson = {
          id: `les_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          topicId: data.topicId,
          titleBangla: data.titleBangla,
          learningGoal: data.learningGoal,
          explanation: data.explanation,
          importantTerms: data.importantTerms,
          workedExample:
            data.workedExample === Prisma.DbNull ? null : (data.workedExample ?? null),
          memoryAid: data.memoryAid ?? null,
          status: data.status ?? ContentStatus.DRAFT,
          version: data.version ?? 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        lessons.push(newLesson);
        return newLesson;
      },
      update: async ({ where, data, include }: any) => {
        const idx = lessons.findIndex((l) => l.id === where.id);
        if (idx === -1) throw new Error('Lesson not found');
        const curr = lessons[idx];
        const normalized: Record<string, any> = { ...data };
        if (normalized.workedExample === Prisma.DbNull) normalized.workedExample = null;
        const updated = {
          ...curr,
          ...normalized,
          version: data.version?.increment ? curr.version + data.version.increment : curr.version,
          updatedAt: new Date(),
        };
        lessons[idx] = updated;
        return include?.topic ? attachTopicHierarchy(updated) : updated;
      },
    },
    question: {
      findUnique: async ({ where, include }: any) => {
        const found = questions.find((q) => q.id === where.id) || null;
        if (!found) return null;
        if (include?.topic) {
          const t = topics.find((item) => item.id === found.topicId);
          const ch = t ? chapters.find((c) => c.id === t.chapterId) : null;
          const sub = ch ? subjects.find((s) => s.id === ch.subjectId) : null;
          return {
            ...found,
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
        }
        return found;
      },
      findMany: async ({ where, include, skip = 0, take }: any) => {
        const matchWhere = (q: any) => {
          if (where?.topicId && q.topicId !== where.topicId) return false;
          if (where?.type && q.type !== where.type) return false;
          if (where?.status) {
            if (typeof where.status === 'string' && q.status !== where.status) return false;
            if (where.status.in && !where.status.in.includes(q.status)) return false;
            if (where.status.not && q.status === where.status.not) return false;
          }
          if (where?.topic) {
            const t = topics.find((item) => item.id === q.topicId);
            if (!t) return false;
            if (where.topic.chapterId && t.chapterId !== where.topic.chapterId) return false;
            if (where.topic.chapter?.subjectId) {
              const ch = chapters.find((c) => c.id === t.chapterId);
              if (!ch || ch.subjectId !== where.topic.chapter.subjectId) return false;
            }
          }
          if (where?.OR) {
            const needle = (where.OR[0]?.stem?.contains || '').toLowerCase();
            const stemMatch = (q.stem || '').toLowerCase().includes(needle);
            const boardMatch = (q.boardSource || '').toLowerCase().includes(needle);
            if (!stemMatch && !boardMatch) return false;
          }
          return true;
        };

        let res = questions
          .filter(matchWhere)
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        if (typeof take === 'number') {
          res = res.slice(skip, skip + take);
        }
        if (include?.topic) {
          return res.map((q) => {
            const t = topics.find((item) => item.id === q.topicId);
            const ch = t ? chapters.find((c) => c.id === t.chapterId) : null;
            const sub = ch ? subjects.find((s) => s.id === ch.subjectId) : null;
            return {
              ...q,
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
          });
        }
        return res;
      },
      count: async ({ where }: any) => {
        const list = await mockPrismaService.question.findMany({ where });
        return list.length;
      },
      groupBy: async ({ where }: any) => {
        const matched = await mockPrismaService.question.findMany({ where });
        const counts = new Map<string, number>();
        for (const q of matched) {
          counts.set(q.status, (counts.get(q.status) || 0) + 1);
        }
        return Array.from(counts.entries()).map(([status, _all]) => ({
          status,
          _count: { _all },
        }));
      },
      create: async ({ data }: any) => {
        const newQuestion = {
          id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          topicId: data.topicId,
          type: data.type ?? 'MCQ',
          stem: data.stem,
          options: data.options === Prisma.DbNull ? null : (data.options ?? null),
          explanation: data.explanation,
          cqRubric: data.cqRubric === Prisma.DbNull ? null : (data.cqRubric ?? null),
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
      update: async ({ where, data, include }: any) => {
        const idx = questions.findIndex((q) => q.id === where.id);
        if (idx === -1) throw new Error('Question not found');
        const curr = questions[idx];
        const normalized: Record<string, any> = { ...data };
        if (normalized.options === Prisma.DbNull) normalized.options = null;
        if (normalized.cqRubric === Prisma.DbNull) normalized.cqRubric = null;
        const updated = {
          ...curr,
          ...normalized,
          version: data.version?.increment ? curr.version + data.version.increment : curr.version,
          updatedAt: new Date(),
        };
        questions[idx] = updated;
        if (include?.topic) {
          return mockPrismaService.question.findUnique({ where: { id: where.id }, include });
        }
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

    subjects = [
      {
        id: 'sub_phy',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
      },
    ];
    chapters = [
      {
        id: 'chap_force',
        subjectId: 'sub_phy',
        orderIndex: 2,
        titleBangla: 'গতি ও বল',
      },
    ];
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

  describe('Question Bank List, Edit & Archive Endpoints (e2e)', () => {
    it('enforces RBAC across GET list/detail, PATCH edit (including preservePublished), and POST archive', async () => {
      // Seed 1 draft and 1 published question via EDITOR + REVIEWER flow
      const draftRes = await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          type: 'MCQ',
          stem: 'ড্রাফট প্রশ্ন: বলের একক কী?',
          options: [
            { id: 'opt_1', text: 'নিউটন', isCorrect: true },
            { id: 'opt_2', text: 'জুল', isCorrect: false },
          ],
          explanation: { directAnswer: 'নিউটন', coreConcept: 'SI unit' },
          difficulty: 'EASY',
          boardSource: 'Dhaka 2024',
        })
        .expect(201);

      const pubCreateRes = await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          type: 'CQ_CREATIVE',
          stem: 'প্রকাশিত সৃজনশীল উদ্দীপক',
          explanation: { directAnswer: 'ক থেকে ঘ সমাধান', coreConcept: 'F=ma' },
          cqRubric: { ka: { mark: 1, criteria: 'বলের সংজ্ঞা' } },
          difficulty: 'HARD',
          boardSource: 'Rajshahi 2023',
        })
        .expect(201);

      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'QUESTION',
          contentId: pubCreateRes.body.id,
          action: 'APPROVE',
          comment: 'প্রকাশযোগ্য',
        })
        .expect(201);

      // 1. Unauthenticated / STUDENT rejected on list, detail, PATCH, and archive
      await request(app.getHttpServer()).get('/admin/content/questions').expect(401);
      await request(app.getHttpServer()).get(`/admin/content/questions/${draftRes.body.id}`).expect(401);
      await request(app.getHttpServer())
        .patch(`/admin/content/questions/${draftRes.body.id}`)
        .send({ stem: 'Anon edit' })
        .expect(401);
      await request(app.getHttpServer())
        .post(`/admin/content/questions/${draftRes.body.id}/archive`)
        .expect(401);

      await request(app.getHttpServer())
        .get('/admin/content/questions')
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(403);
      await request(app.getHttpServer())
        .get(`/admin/content/questions/${draftRes.body.id}`)
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(403);
      await request(app.getHttpServer())
        .patch(`/admin/content/questions/${draftRes.body.id}`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ stem: 'Student edit' })
        .expect(403);
      await request(app.getHttpServer())
        .post(`/admin/content/questions/${draftRes.body.id}/archive`)
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(403);

      // 1b. Invalid query params rejected with 400 from ValidationPipe
      await request(app.getHttpServer())
        .get('/admin/content/questions?page=-1')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(400);
      await request(app.getHttpServer())
        .get('/admin/content/questions?status=INVALID')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(400);
      await request(app.getHttpServer())
        .get('/admin/content/questions?type=INVALID')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(400);

      // 2. REVIEWER can view list & single item (including 404 on unknown ID), but cannot PATCH or archive
      const listRes = await request(app.getHttpServer())
        .get('/admin/content/questions?subjectId=sub_phy&search=Rajshahi')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(200);

      expect(listRes.body.items).toHaveLength(1);
      expect(listRes.body.items[0].id).toBe(pubCreateRes.body.id);
      expect(listRes.body.items[0].topic.chapter.subject.code).toBe('ssc_physics');
      expect(listRes.body.statusCounts.PUBLISHED).toBe(1);

      const detailRes = await request(app.getHttpServer())
        .get(`/admin/content/questions/${pubCreateRes.body.id}`)
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(200);
      expect(detailRes.body.cqRubric.ka.mark).toBe(1);

      await request(app.getHttpServer())
        .get('/admin/content/questions/non_existent_question_id')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(404);

      await request(app.getHttpServer())
        .patch(`/admin/content/questions/${draftRes.body.id}`)
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({ stem: 'Reviewer cannot edit' })
        .expect(403);

      await request(app.getHttpServer())
        .post(`/admin/content/questions/${draftRes.body.id}/archive`)
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(403);

      // 3. EDITOR cannot preservePublished or archive PUBLISHED question
      await request(app.getHttpServer())
        .patch(`/admin/content/questions/${pubCreateRes.body.id}`)
        .set('Authorization', `Bearer ${editorToken}`)
        .send({ stem: 'Editor edit', preservePublished: true })
        .expect(403);

      await request(app.getHttpServer())
        .post(`/admin/content/questions/${pubCreateRes.body.id}/archive`)
        .set('Authorization', `Bearer ${editorToken}`)
        .expect(403);

      // 4. EDITOR editing PUBLISHED without preservePublished moves it to REVIEW and increments version
      const editorPatchRes = await request(app.getHttpServer())
        .patch(`/admin/content/questions/${pubCreateRes.body.id}`)
        .set('Authorization', `Bearer ${editorToken}`)
        .send({ stem: 'সংশোধিত উদ্দীপক' })
        .expect(200);
      expect(editorPatchRes.body.status).toBe(ContentStatus.REVIEW);
      expect(editorPatchRes.body.version).toBe(3);

      // 5. Re-approve and let ADMIN preservePublished + archive cleanly
      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'QUESTION',
          contentId: pubCreateRes.body.id,
          action: 'APPROVE',
          comment: 'পুনরায় অনুমোদিত',
        })
        .expect(201);

      const adminPatchRes = await request(app.getHttpServer())
        .patch(`/admin/content/questions/${pubCreateRes.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ stem: 'অ্যাডমিন সরাসরি আপডেট', preservePublished: true })
        .expect(200);
      expect(adminPatchRes.body.status).toBe(ContentStatus.PUBLISHED);
      expect(adminPatchRes.body.isVerified).toBe(true);

      const archiveRes = await request(app.getHttpServer())
        .post(`/admin/content/questions/${pubCreateRes.body.id}/archive`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(archiveRes.body.status).toBe(ContentStatus.ARCHIVED);
      expect(archiveRes.body.isVerified).toBe(false);

      // Archived question excluded from default list, present with status=ARCHIVED and includeArchived=true, and blocks direct edit
      const defaultAfterArchive = await request(app.getHttpServer())
        .get('/admin/content/questions')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(defaultAfterArchive.body.items.map((q: any) => q.id)).toEqual([draftRes.body.id]);

      const archivedFilter = await request(app.getHttpServer())
        .get('/admin/content/questions?status=ARCHIVED')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(archivedFilter.body.items).toHaveLength(1);
      expect(archivedFilter.body.items[0].id).toBe(pubCreateRes.body.id);

      const includeArchivedRes = await request(app.getHttpServer())
        .get('/admin/content/questions?includeArchived=true')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(includeArchivedRes.body.items).toHaveLength(2);

      await request(app.getHttpServer())
        .patch(`/admin/content/questions/${pubCreateRes.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ stem: 'আর্কাইভ প্রশ্নে এডিট হবে না' })
        .expect(400);
    });

    it('validates UpdateQuestionAdminDto and nullable fields via ValidationPipe and ContentAdminService', async () => {
      const created = await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          type: 'MCQ',
          stem: 'প্রাথমিক স্টেম',
          options: [
            { id: 'opt_1', text: 'সঠিক', isCorrect: true },
            { id: 'opt_2', text: 'ভুল', isCorrect: false },
          ],
          explanation: { directAnswer: 'সঠিক', coreConcept: 'গতি' },
          difficulty: 'MEDIUM',
          boardSource: 'Cumilla 2023',
        })
        .expect(201);

      // Invalid enum rejected with 400
      await request(app.getHttpServer())
        .patch(`/admin/content/questions/${created.body.id}`)
        .set('Authorization', `Bearer ${editorToken}`)
        .send({ type: 'ESSAY' })
        .expect(400);

      // Nullable boardSource: null clears boardSource, submitForReview moves DRAFT -> REVIEW
      const updatedRes = await request(app.getHttpServer())
        .patch(`/admin/content/questions/${created.body.id}`)
        .set('Authorization', `Bearer ${editorToken}`)
        .send({ boardSource: null, submitForReview: true })
        .expect(200);

      expect(updatedRes.body.boardSource).toBeNull();
      expect(updatedRes.body.status).toBe(ContentStatus.REVIEW);
      expect(updatedRes.body.version).toBe(2);
    });

    it('rejects POST /admin/content/review on an ARCHIVED question with 400 and preserves ARCHIVED status for REVIEWER and ADMIN', async () => {
      const created = await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          type: 'MCQ',
          stem: 'আর্কাইভ রিভিউ গার্ড পরীক্ষা',
          options: [
            { id: 'opt_1', text: 'সঠিক', isCorrect: true },
            { id: 'opt_2', text: 'ভুল', isCorrect: false },
          ],
          explanation: { directAnswer: 'সঠিক', coreConcept: 'গতি' },
          difficulty: 'EASY',
        })
        .expect(201);

      await request(app.getHttpServer())
        .post(`/admin/content/questions/${created.body.id}/archive`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'QUESTION',
          contentId: created.body.id,
          action: 'APPROVE',
        })
        .expect(400);

      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({
          contentType: 'QUESTION',
          contentId: created.body.id,
          action: 'REQUEST_CHANGES',
          comment: 'Should not transition archived question',
        })
        .expect(400);

      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          contentType: 'QUESTION',
          contentId: created.body.id,
          action: 'APPROVE',
        })
        .expect(400);

      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          contentType: 'QUESTION',
          contentId: created.body.id,
          action: 'REJECT',
          comment: 'Admin also blocked from reviewing archived question',
        })
        .expect(400);

      const detailRes = await request(app.getHttpServer())
        .get(`/admin/content/questions/${created.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(detailRes.body.status).toBe(ContentStatus.ARCHIVED);

      const reviewsRes = await request(app.getHttpServer())
        .get(`/admin/content/reviews/${created.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(reviewsRes.body).toHaveLength(0);
    });

    it('clears options to null and persists cqRubric when switching MCQ -> CQ_CREATIVE via PATCH', async () => {
      const created = await request(app.getHttpServer())
        .post('/admin/content/questions')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          type: 'MCQ',
          stem: 'এমসিকিউ থেকে সৃজনশীল রূপান্তর পরীক্ষা',
          options: [
            { id: 'opt_1', text: 'নিউটন', isCorrect: true },
            { id: 'opt_2', text: 'জুল', isCorrect: false },
          ],
          explanation: { directAnswer: 'নিউটন', coreConcept: 'বলের একক' },
          difficulty: 'MEDIUM',
        })
        .expect(201);

      expect(created.body.options).toHaveLength(2);
      expect(created.body.cqRubric).toBeNull();

      const cqRubric = {
        ka: { mark: 1, criteria: 'বলের সংজ্ঞা দাও' },
        kha: { mark: 2, criteria: 'জড়তা ব্যাখ্যা করো' },
      };

      const patchedRes = await request(app.getHttpServer())
        .patch(`/admin/content/questions/${created.body.id}`)
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          type: 'CQ_CREATIVE',
          cqRubric,
        })
        .expect(200);

      expect(patchedRes.body.type).toBe('CQ_CREATIVE');
      expect(patchedRes.body.options).toBeNull();
      expect(patchedRes.body.cqRubric).toEqual(cqRubric);
      expect(patchedRes.body.version).toBe(2);

      const persistedRes = await request(app.getHttpServer())
        .get(`/admin/content/questions/${created.body.id}`)
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(200);

      expect(persistedRes.body.type).toBe('CQ_CREATIVE');
      expect(persistedRes.body.options).toBeNull();
      expect(persistedRes.body.cqRubric).toEqual(cqRubric);
    });
  });

  describe('Lesson Management (List, Detail, Update, Archive) & RBAC', () => {
    it('supports list, detail, search/hierarchy filtering, 401/403/400/404 guards, REVIEWER read-only, and ARCHIVED exclusion', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          titleBangla: 'নিউটনের গতিসূত্র ও বল',
          learningGoal: 'বলের ধারণা ব্যাখ্যা করা',
          explanation: '$F = ma$',
          importantTerms: [{ termBangla: 'বল', termEnglish: 'Force', definition: 'ধাক্কা বা টান' }],
          workedExample: { problem: '$2\\times 3$', stepByStepSolution: '$6$' },
          memoryAid: 'F=ma',
        })
        .expect(201);

      const lessonId = createRes.body.id;

      // Unauthenticated 401 guards
      await request(app.getHttpServer()).get('/admin/content/lessons').expect(401);
      await request(app.getHttpServer()).get(`/admin/content/lessons/${lessonId}`).expect(401);
      await request(app.getHttpServer())
        .patch(`/admin/content/lessons/${lessonId}`)
        .send({ titleBangla: 'অননুমোদিত' })
        .expect(401);
      await request(app.getHttpServer())
        .post(`/admin/content/lessons/${lessonId}/archive`)
        .expect(401);

      // STUDENT 403 guards
      await request(app.getHttpServer())
        .get('/admin/content/lessons')
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(403);
      await request(app.getHttpServer())
        .get(`/admin/content/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(403);
      await request(app.getHttpServer())
        .patch(`/admin/content/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ titleBangla: 'চেষ্টা' })
        .expect(403);
      await request(app.getHttpServer())
        .post(`/admin/content/lessons/${lessonId}/archive`)
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(403);

      // Invalid query params rejected with 400 via ValidationPipe
      await request(app.getHttpServer())
        .get('/admin/content/lessons?page=-1')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(400);
      await request(app.getHttpServer())
        .get('/admin/content/lessons?status=INVALID')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(400);

      const reviewerList = await request(app.getHttpServer())
        .get('/admin/content/lessons?subjectId=sub_phy&search=বল')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(200);

      expect(reviewerList.body.items).toHaveLength(1);
      expect(reviewerList.body.items[0].topic.chapter.subject.code).toBe('ssc_physics');
      expect(reviewerList.body.statusCounts.DRAFT).toBe(1);

      const detailRes = await request(app.getHttpServer())
        .get(`/admin/content/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(200);
      expect(detailRes.body.id).toBe(lessonId);

      await request(app.getHttpServer())
        .get('/admin/content/lessons/missing_lesson_id')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(404);

      // REVIEWER cannot edit or archive
      await request(app.getHttpServer())
        .patch(`/admin/content/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({ titleBangla: 'চেষ্টা' })
        .expect(403);
      await request(app.getHttpServer())
        .post(`/admin/content/lessons/${lessonId}/archive`)
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(403);
    });

    it('enforces PUBLISHED -> REVIEW demotion, ADMIN preservePublished, ARCHIVED edit/review 400 guards, and nullable clearing', async () => {
      const created = await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          titleBangla: 'ভরবেগ ও সংরক্ষণ',
          learningGoal: 'ভরবেগ বোঝা',
          explanation: '$p = mv$',
          importantTerms: [{ termBangla: 'ভরবেগ' }],
          workedExample: { problem: 'উদাহরণ', stepByStepSolution: 'সমাধান' },
          memoryAid: 'p=mv',
        })
        .expect(201);

      const lessonId = created.body.id;

      // Publish via review
      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({ contentType: 'LESSON', contentId: lessonId, action: 'APPROVE' })
        .expect(201);

      // EDITOR cannot preservePublished or archive PUBLISHED
      await request(app.getHttpServer())
        .patch(`/admin/content/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${editorToken}`)
        .send({ preservePublished: true })
        .expect(403);
      await request(app.getHttpServer())
        .post(`/admin/content/lessons/${lessonId}/archive`)
        .set('Authorization', `Bearer ${editorToken}`)
        .expect(403);

      // ADMIN keeps PUBLISHED and clears nullable fields
      const adminPatch = await request(app.getHttpServer())
        .patch(`/admin/content/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          preservePublished: true,
          workedExample: null,
          memoryAid: null,
        })
        .expect(200);
      expect(adminPatch.body.status).toBe(ContentStatus.PUBLISHED);
      expect(adminPatch.body.workedExample).toBeNull();
      expect(adminPatch.body.memoryAid).toBeNull();
      expect(adminPatch.body.version).toBe(3);

      // Reject empty importantTerms on create with 400
      await request(app.getHttpServer())
        .post('/admin/content/lessons')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          topicId: 'topic_force',
          titleBangla: 'শূন্য টার্মস',
          learningGoal: 'লক্ষ্য',
          explanation: 'ব্যাখ্যা',
          importantTerms: [],
        })
        .expect(400);

      // EDITOR edit demotes PUBLISHED -> REVIEW
      const editorPatch = await request(app.getHttpServer())
        .patch(`/admin/content/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${editorToken}`)
        .send({ titleBangla: 'সংশোধিত ভরবেগ' })
        .expect(200);
      expect(editorPatch.body.status).toBe(ContentStatus.REVIEW);
      expect(editorPatch.body.version).toBe(4);

      // Re-approve to PUBLISHED so ADMIN archives a genuinely PUBLISHED lesson
      const reapproveRes = await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({ contentType: 'LESSON', contentId: lessonId, action: 'APPROVE' })
        .expect(201);
      expect(reapproveRes.body.status).toBe(ContentStatus.PUBLISHED);

      // ARCHIVE & verify guards
      const adminArchiveRes = await request(app.getHttpServer())
        .post(`/admin/content/lessons/${lessonId}/archive`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(adminArchiveRes.body.status).toBe(ContentStatus.ARCHIVED);

      await request(app.getHttpServer())
        .patch(`/admin/content/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ titleBangla: 'আর্কাইভে এডিট' })
        .expect(400);

      await request(app.getHttpServer())
        .post('/admin/content/review')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ contentType: 'LESSON', contentId: lessonId, action: 'APPROVE' })
        .expect(400);

      const defaultList = await request(app.getHttpServer())
        .get('/admin/content/lessons')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(defaultList.body.items).toHaveLength(0);
      expect(defaultList.body.statusCounts.ARCHIVED).toBe(1);

      const archivedList = await request(app.getHttpServer())
        .get('/admin/content/lessons?includeArchived=true')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(archivedList.body.items).toHaveLength(1);
    });
  });
});
