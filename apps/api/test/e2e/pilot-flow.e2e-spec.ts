import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/database/prisma.service';
import {
  pilotData,
  sscPhysicsSubject,
  sscChemistrySubject,
  chapter1,
  chapter2,
  topicMotionEquations,
  lessonMotionEquations,
  mcqQuestion1,
  mcqQuestion2,
  cqQuestion1,
} from '../../prisma/seed';

describe('Pilot Content Seeding & End-to-End Student Journey Flow (e2e)', () => {
  let app: INestApplication;

  let users: any[] = [];
  let subjects: any[] = [];
  let chapters: any[] = [];
  let topics: any[] = [];
  let lessons: any[] = [];
  let questions: any[] = [];
  let examSessions: any[] = [];
  let revisionMistakes: any[] = [];
  let eventLogs: any[] = [];

  const mockPrismaService = {
    $transaction: async (fn: any) => {
      if (typeof fn === 'function') {
        return fn(mockPrismaService);
      }
      return Promise.all(fn);
    },
    user: {
      findUnique: async ({ where }: any) => {
        if (where.id) return users.find((u) => u.id === where.id) || null;
        if (where.guestId) return users.find((u) => u.guestId === where.guestId) || null;
        if (where.phoneNumber) return users.find((u) => u.phoneNumber === where.phoneNumber) || null;
        return null;
      },
      create: async ({ data }: any) => {
        const newUser = {
          id: `usr_pilot_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
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
      update: async ({ where, data }: any) => {
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
    },
    subject: {
      findMany: async ({ where, include, orderBy }: any) => {
        let result = subjects.filter((s) => {
          if (where?.classLevel && s.classLevel !== where.classLevel) return false;
          return true;
        });

        if (include?._count?.select?.chapters) {
          result = result.map((s) => ({
            ...s,
            _count: {
              chapters: chapters.filter((c) => c.subjectId === s.id).length,
            },
          }));
        }

        if (orderBy?.code === 'asc') {
          result = [...result].sort((a, b) => a.code.localeCompare(b.code));
        }

        return result;
      },
      findUnique: async ({ where }: any) => {
        if (where.id) return subjects.find((s) => s.id === where.id) || null;
        if (where.code) return subjects.find((s) => s.code === where.code) || null;
        return null;
      },
    },
    chapter: {
      findUnique: async ({ where }: any) => {
        return chapters.find((c) => c.id === where.id) || null;
      },
      findMany: async ({ where, include, orderBy }: any) => {
        let result = chapters.filter((c) => {
          if (where?.subjectId && c.subjectId !== where.subjectId) return false;
          return true;
        });

        if (orderBy?.orderIndex === 'asc') {
          result = [...result].sort((a, b) => a.orderIndex - b.orderIndex);
        }

        if (include?.topics) {
          result = result.map((c) => {
            let chapterTopics = topics.filter((t) => t.chapterId === c.id);
            if (include.topics.orderBy?.orderIndex === 'asc') {
              chapterTopics = [...chapterTopics].sort((a, b) => a.orderIndex - b.orderIndex);
            }
            return {
              ...c,
              topics: chapterTopics,
            };
          });
        }

        return result;
      },
    },
    topic: {
      findUnique: async ({ where }: any) => {
        return topics.find((t) => t.id === where.id) || null;
      },
      findMany: async ({ where }: any) => {
        return topics.filter((t) => {
          if (where?.chapterId && t.chapterId !== where.chapterId) return false;
          return true;
        });
      },
    },
    lesson: {
      findFirst: async ({ where }: any) => {
        return (
          lessons.find((l) => {
            if (where.topicId && l.topicId !== where.topicId) return false;
            if (where.status && l.status !== where.status) return false;
            return true;
          }) || null
        );
      },
      findUnique: async ({ where }: any) => {
        return lessons.find((l) => l.id === where.id) || null;
      },
    },
    question: {
      findUnique: async ({ where }: any) => {
        return questions.find((q) => q.id === where.id) || null;
      },
      findMany: async ({ where }: any) => {
        return questions.filter((q) => {
          if (where?.id?.in && !where.id.in.includes(q.id)) return false;
          if (where?.type && q.type !== where.type) return false;
          if (where?.status && q.status !== where.status) return false;
          if (where?.topicId && q.topicId !== where.topicId) return false;
          if (where?.topic?.chapterId) {
            const topic = topics.find((t) => t.id === q.topicId);
            if (!topic || topic.chapterId !== where.topic.chapterId) return false;
          }
          return true;
        });
      },
    },
    examSession: {
      findUnique: async ({ where }: any) => {
        return examSessions.find((s) => s.id === where.id) || null;
      },
      create: async ({ data }: any) => {
        const session = {
          id: `ses_pilot_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
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
          if (where?.userId && m.userId !== where.userId) return false;
          if (where?.questionId && m.questionId !== where.questionId) return false;
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
          if (where?.userId && e.userId !== where.userId) return false;
          if (where?.eventType && e.eventType !== where.eventType) return false;
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

    // Deep copy pilot content
    subjects = JSON.parse(JSON.stringify(pilotData.subjects));
    chapters = JSON.parse(JSON.stringify(pilotData.chapters));
    topics = JSON.parse(JSON.stringify(pilotData.topics));
    lessons = JSON.parse(JSON.stringify(pilotData.lessons));
    questions = JSON.parse(JSON.stringify(pilotData.questions));
  });

  it('should verify the authoritative seed content specifications for NCTB 2026 SSC Physics', () => {
    // 1. Subject verification
    expect(sscPhysicsSubject).toMatchObject({
      code: 'ssc_physics',
      nameBangla: 'পদার্থবিজ্ঞান',
      classLevel: 'CLASS_9_10',
      syllabusYear: 2026,
      isReady: true,
    });

    expect(sscChemistrySubject).toMatchObject({
      code: 'ssc_chemistry',
      nameBangla: 'রসায়ন',
      isReady: false,
    });

    // 2. Chapters verification
    expect(chapter1).toMatchObject({
      orderIndex: 1,
      titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
    });

    expect(chapter2).toMatchObject({
      orderIndex: 2,
      titleBangla: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
    });

    // 3. Topic verification
    expect(topicMotionEquations).toMatchObject({
      orderIndex: 1,
      titleBangla: 'গতির সমীকরণ ও সমাধান',
    });

    // 4. Lesson verification
    expect(lessonMotionEquations.titleBangla).toBe('গতির ৪টি মৌলিক সমীকরণ');
    expect(lessonMotionEquations.status).toBe('PUBLISHED');
    expect(lessonMotionEquations.explanation).toContain('$v = u + at$');
    expect(lessonMotionEquations.explanation).toContain('$s = ut + \\frac{1}{2}at^2$');
    expect(lessonMotionEquations.explanation).toContain('$v^2 = u^2 + 2as$');
    expect(lessonMotionEquations.importantTerms).toHaveLength(4);

    const termNames = lessonMotionEquations.importantTerms.map((t) => t.termBangla);
    expect(termNames).toContain('ত্বরণ');
    expect(termNames).toContain('সরণ');
    expect(termNames).toContain('বেগ');
    expect(termNames).toContain('দ্রুতি');

    expect(lessonMotionEquations.workedExample).toBeDefined();
    expect(lessonMotionEquations.memoryAid).toBeDefined();

    // 5. MCQ Question verification
    expect(mcqQuestion1.isVerified).toBe(true);
    expect(mcqQuestion1.status).toBe('PUBLISHED');
    expect(mcqQuestion1.boardSource).toBe('Dhaka Board 2022');
    expect(mcqQuestion1.explanation.directAnswer).toBeDefined();
    expect(mcqQuestion1.explanation.coreConcept).toBeDefined();
    expect(mcqQuestion1.explanation.stepDerivation).toBeDefined();
    expect(mcqQuestion1.explanation.distractorAnalysis).toBeDefined();
    expect(mcqQuestion1.explanation.textbookCitation).toBeDefined();
    expect(mcqQuestion1.explanation.proTipShortcut).toBeDefined();

    // 6. Creative Question (CQ) verification with rubric for ক, খ, গ, ঘ
    expect(cqQuestion1.type).toBe('CQ_CREATIVE');
    expect(cqQuestion1.isVerified).toBe(true);
    expect(cqQuestion1.status).toBe('PUBLISHED');
    expect(cqQuestion1.boardSource).toBe('Rajshahi Board 2023');
    expect(cqQuestion1.cqRubric).toBeDefined();
    expect(cqQuestion1.cqRubric.ka).toMatchObject({ mark: 1 });
    expect(cqQuestion1.cqRubric.kha).toMatchObject({ mark: 2 });
    expect(cqQuestion1.cqRubric.ga).toMatchObject({ mark: 3 });
    expect(cqQuestion1.cqRubric.gha).toMatchObject({ mark: 4 });
  });

  it('should execute the complete 12-step end-to-end student journey with pilot content', async () => {
    // =========================================================================
    // Step 1: Create guest session via POST /auth/guest
    // =========================================================================
    const guestRes = await request(app.getHttpServer())
      .post('/auth/guest')
      .send({ guestId: 'guest-pilot-e2e-student' })
      .expect(201);

    expect(guestRes.body).toHaveProperty('accessToken');
    expect(guestRes.body.user).toMatchObject({
      guestId: 'guest-pilot-e2e-student',
      role: 'STUDENT',
      selectedClass: 'SSC',
    });

    const studentToken = guestRes.body.accessToken;
    const studentUserId = guestRes.body.user.id;
    expect(studentUserId).toBeDefined();

    // =========================================================================
    // Step 2: Query subjects via GET /curriculum/subjects
    // Confirms SSC Physics is ready, syllabusYear is 2026, and chapter count is positive
    // =========================================================================
    const subjectsRes = await request(app.getHttpServer())
      .get('/curriculum/subjects')
      .expect(200);

    expect(Array.isArray(subjectsRes.body)).toBe(true);
    expect(subjectsRes.body.length).toBeGreaterThanOrEqual(2);

    const physicsSub = subjectsRes.body.find((s: any) => s.code === 'ssc_physics');
    expect(physicsSub).toBeDefined();
    expect(physicsSub.nameBangla).toBe('পদার্থবিজ্ঞান');
    expect(physicsSub.classLevel).toBe('CLASS_9_10');
    expect(physicsSub.syllabusYear).toBe(2026);
    expect(physicsSub.isReady).toBe(true);
    expect(physicsSub.chapterCount).toBe(2);

    const chemistrySub = subjectsRes.body.find((s: any) => s.code === 'ssc_chemistry');
    expect(chemistrySub).toBeDefined();
    expect(chemistrySub.nameBangla).toBe('রসায়ন');
    expect(chemistrySub.isReady).toBe(false);

    const subjectId = physicsSub.id;

    // =========================================================================
    // Step 3: Retrieve chapter and topic outline via GET /curriculum/subjects/:subjectId/chapters
    // =========================================================================
    const chaptersRes = await request(app.getHttpServer())
      .get(`/curriculum/subjects/${subjectId}/chapters`)
      .expect(200);

    expect(Array.isArray(chaptersRes.body)).toBe(true);
    expect(chaptersRes.body).toHaveLength(2);

    // Chapter 1
    const ch1 = chaptersRes.body.find((c: any) => c.orderIndex === 1);
    expect(ch1.titleBangla).toBe('প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ');

    // Chapter 2
    const ch2 = chaptersRes.body.find((c: any) => c.orderIndex === 2);
    expect(ch2.titleBangla).toBe('দ্বিতীয় অধ্যায়: গতি (Motion)');
    expect(ch2.topics).toBeDefined();
    expect(ch2.topics.length).toBeGreaterThanOrEqual(1);

    const topic = ch2.topics.find((t: any) => t.orderIndex === 1);
    expect(topic.titleBangla).toBe('গতির সমীকরণ ও সমাধান');

    const chapterId = ch2.id;
    const topicId = topic.id;

    // =========================================================================
    // Step 4: Read published lesson via GET /lessons/topic/:topicId
    // Confirms learning goal, explanation with KaTeX, important terms, worked example, memory aid
    // =========================================================================
    const lessonRes = await request(app.getHttpServer())
      .get(`/lessons/topic/${topicId}`)
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    expect(lessonRes.body.titleBangla).toBe('গতির ৪টি মৌলিক সমীকরণ');
    expect(lessonRes.body.status).toBe('PUBLISHED');
    expect(lessonRes.body.learningGoal).toContain('গতির ৪টি মৌলিক সমীকরণ');
    expect(lessonRes.body.explanation).toContain('$v = u + at$');
    expect(lessonRes.body.explanation).toContain('$s = ut + \\frac{1}{2}at^2$');
    expect(lessonRes.body.explanation).toContain('$v^2 = u^2 + 2as$');
    expect(lessonRes.body.importantTerms).toHaveLength(4);

    const termNames = lessonRes.body.importantTerms.map((t: any) => t.termBangla);
    expect(termNames).toContain('ত্বরণ');
    expect(termNames).toContain('সরণ');
    expect(termNames).toContain('বেগ');
    expect(termNames).toContain('দ্রুতি');

    expect(lessonRes.body.workedExample).toBeDefined();
    expect(lessonRes.body.workedExample.problem).toBeDefined();
    expect(lessonRes.body.workedExample.stepByStepSolution).toBeDefined();
    expect(lessonRes.body.memoryAid).toBeDefined();

    // Verify LESSON_OPEN event logged for student
    const lessonLogs = eventLogs.filter((e) => e.eventType === 'LESSON_OPEN');
    expect(lessonLogs.length).toBeGreaterThanOrEqual(1);
    expect(lessonLogs[0].userId).toBe(studentUserId);
    expect(lessonLogs[0].payload.topicId).toBe(topicId);

    // =========================================================================
    // Step 5: Fetch chapter practice questions via GET /practice/chapter/:chapterId/questions
    // Confirms options are shuffled, isCorrect stripped out, explanation omitted
    // =========================================================================
    const practiceQuestionsRes = await request(app.getHttpServer())
      .get(`/practice/chapter/${chapterId}/questions`)
      .expect(200);

    expect(Array.isArray(practiceQuestionsRes.body)).toBe(true);
    // 2 MCQs in chapter 2
    expect(practiceQuestionsRes.body).toHaveLength(2);

    for (const q of practiceQuestionsRes.body) {
      expect(q.type).toBe('MCQ');
      expect(q.stem).toBeDefined();
      expect(q.explanation).toBeUndefined(); // Explanation stripped out
      expect(q.options).toBeDefined();
      expect(q.options.length).toBe(4);

      for (const opt of q.options) {
        expect(opt.id).toBeDefined();
        expect(opt.text).toBeDefined();
        expect(opt.isCorrect).toBeUndefined(); // isCorrect stripped out
      }
    }

    // =========================================================================
    // Step 6: Submit incorrect MCQ answer via POST /practice/submit
    // Confirms returns 6-layer explanation and creates RevisionMistake
    // =========================================================================
    const incorrectSubmitRes = await request(app.getHttpServer())
      .post('/practice/submit')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        questionId: mcqQuestion1.id,
        selectedOptionId: 'opt_q1_b', // incorrect (64 m/s^2)
      })
      .expect(201);

    expect(incorrectSubmitRes.body.isCorrect).toBe(false);
    expect(incorrectSubmitRes.body.correctOptionId).toBe('opt_q1_a');

    // Verify 6-layer ExplanationObject
    const explanation = incorrectSubmitRes.body.explanation;
    expect(explanation).toBeDefined();
    expect(explanation.directAnswer).toBe('সঠিক উত্তর ক: $4\\text{ m/s}^2$।');
    expect(explanation.coreConcept).toContain('গতির প্রথম সমীকরণ');
    expect(explanation.stepDerivation).toContain('16 - 0');
    expect(explanation.distractorAnalysis).toBeDefined();
    expect(explanation.distractorAnalysis.opt_q1_b).toBeDefined();
    expect(explanation.textbookCitation).toMatchObject({
      bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
      chapterName: 'দ্বিতীয় অধ্যায়: গতি',
      pageNumber: 42,
    });
    expect(explanation.proTipShortcut).toBeDefined();

    // Verify RevisionMistake was created for this question and student
    expect(revisionMistakes).toHaveLength(1);
    expect(revisionMistakes[0]).toMatchObject({
      userId: studentUserId,
      questionId: mcqQuestion1.id,
      attemptCount: 1,
      resolved: false,
    });

    // =========================================================================
    // Step 7: Submit correct MCQ answer via POST /practice/submit
    // Confirms returns isCorrect: true with full explanation
    // =========================================================================
    const correctSubmitRes = await request(app.getHttpServer())
      .post('/practice/submit')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        questionId: mcqQuestion1.id,
        selectedOptionId: 'opt_q1_a', // correct (4 m/s^2)
      })
      .expect(201);

    expect(correctSubmitRes.body.isCorrect).toBe(true);
    expect(correctSubmitRes.body.correctOptionId).toBe('opt_q1_a');
    expect(correctSubmitRes.body.explanation.directAnswer).toBe('সঠিক উত্তর ক: $4\\text{ m/s}^2$।');

    // =========================================================================
    // Step 8: Start chapter test via POST /exam/start
    // Confirms returns active session with randomized questions stripped of answers
    // =========================================================================
    const startExamRes = await request(app.getHttpServer())
      .post('/exam/start')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        testType: 'CHAPTER_TEST',
        subjectId: subjectId,
        chapterId: chapterId,
        negativeRatio: 0.25,
      })
      .expect(201);

    const {
      sessionId,
      totalQuestions,
      durationSeconds,
      negativeRatio,
      questions: examQuestions,
    } = startExamRes.body;

    expect(sessionId).toBeDefined();
    expect(totalQuestions).toBe(2);
    expect(durationSeconds).toBeGreaterThan(0);
    expect(negativeRatio).toBe(0.25);
    expect(examQuestions).toHaveLength(2);

    for (const eq of examQuestions) {
      expect(eq.stem).toBeDefined();
      expect(eq.explanation).toBeUndefined();
      for (const opt of eq.options) {
        expect(opt.id).toBeDefined();
        expect(opt.text).toBeDefined();
        expect(opt.isCorrect).toBeUndefined();
      }
    }

    // =========================================================================
    // Step 9: Send heartbeat answer autosave via PUT /exam/heartbeat/:sessionId
    // =========================================================================
    const heartbeatRes = await request(app.getHttpServer())
      .put(`/exam/heartbeat/${sessionId}`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        answers: [
          {
            questionId: mcqQuestion1.id,
            selectedOptionId: 'opt_q1_a',
            timeSpent: 25,
          },
        ],
      })
      .expect(200);

    expect(heartbeatRes.body.success).toBe(true);

    // =========================================================================
    // Step 10: Resume active session check via GET /exam/session/:sessionId
    // Confirms matches in-progress state with autosaved answers and no leaked answers
    // =========================================================================
    const activeSessionRes = await request(app.getHttpServer())
      .get(`/exam/session/${sessionId}`)
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    expect(activeSessionRes.body.sessionId).toBe(sessionId);
    expect(activeSessionRes.body.status).toBe('IN_PROGRESS');
    expect(activeSessionRes.body.totalQuestions).toBe(2);
    expect(activeSessionRes.body.questions).toHaveLength(2);

    const savedAns = activeSessionRes.body.answers.find(
      (a: any) => a.questionId === mcqQuestion1.id,
    );
    expect(savedAns).toBeDefined();
    expect(savedAns.selectedOptionId).toBe('opt_q1_a');

    // =========================================================================
    // Step 11: Submit chapter test with negative marking penalty
    // Q1: opt_q1_a (correct, +1.0)
    // Q2: opt_q2_b (wrong, -0.25)
    // Score calculation: 1.0 - 0.25 = 0.75
    // =========================================================================
    const submitExamRes = await request(app.getHttpServer())
      .post(`/exam/submit/${sessionId}`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        answers: [
          { questionId: mcqQuestion1.id, selectedOptionId: 'opt_q1_a', timeSpent: 30 },
          { questionId: mcqQuestion2.id, selectedOptionId: 'opt_q2_b', timeSpent: 20 },
        ],
      })
      .expect(201);

    expect(submitExamRes.body.totalQuestions).toBe(2);
    expect(submitExamRes.body.correctCount).toBe(1);
    expect(submitExamRes.body.wrongCount).toBe(1);
    expect(submitExamRes.body.skippedCount).toBe(0);
    expect(submitExamRes.body.negativeDeduction).toBe(0.25);
    expect(submitExamRes.body.score).toBe(0.75); // 1.0 - 0.25 = 0.75
    expect(submitExamRes.body.answersWithExplanation).toHaveLength(2);

    const resultQ1 = submitExamRes.body.answersWithExplanation.find(
      (a: any) => a.questionId === mcqQuestion1.id,
    );
    expect(resultQ1.isCorrect).toBe(true);
    expect(resultQ1.selectedOptionId).toBe('opt_q1_a');
    expect(resultQ1.correctOptionId).toBe('opt_q1_a');
    expect(resultQ1.explanation.directAnswer).toBe('সঠিক উত্তর ক: $4\\text{ m/s}^2$।');

    const resultQ2 = submitExamRes.body.answersWithExplanation.find(
      (a: any) => a.questionId === mcqQuestion2.id,
    );
    expect(resultQ2.isCorrect).toBe(false);
    expect(resultQ2.selectedOptionId).toBe('opt_q2_b');
    expect(resultQ2.correctOptionId).toBe('opt_q2_a');
    expect(resultQ2.explanation.directAnswer).toBe('সঠিক উত্তর ক: $24\\text{ m}$।');

    // Confirm RevisionMistake was upserted for q_motion_mcq_2
    const mcq2Mistake = revisionMistakes.find((m) => m.questionId === mcqQuestion2.id);
    expect(mcq2Mistake).toBeDefined();
    expect(mcq2Mistake.userId).toBe(studentUserId);
    expect(mcq2Mistake.resolved).toBe(false);

    // Confirm TEST_SUBMIT event logged
    const submitLogs = eventLogs.filter((e) => e.eventType === 'TEST_SUBMIT');
    expect(submitLogs).toHaveLength(1);
    expect(submitLogs[0].payload).toMatchObject({
      sessionId,
      score: 0.75,
      correctCount: 1,
      wrongCount: 1,
      negativeDeduction: 0.25,
    });

    // =========================================================================
    // Step 12: Inspect completed test scorecard with review breakdown
    // via GET /exam/session/:sessionId
    // =========================================================================
    const completedSessionRes = await request(app.getHttpServer())
      .get(`/exam/session/${sessionId}`)
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    expect(completedSessionRes.body.sessionId).toBe(sessionId);
    expect(completedSessionRes.body.status).toBe('COMPLETED');
    expect(completedSessionRes.body.score).toBe(0.75);
    expect(completedSessionRes.body.correctCount).toBe(1);
    expect(completedSessionRes.body.wrongCount).toBe(1);
    expect(completedSessionRes.body.skippedCount).toBe(0);
    expect(completedSessionRes.body.negativeDeduction).toBe(0.25);
    expect(completedSessionRes.body.answersWithExplanation).toHaveLength(2);
  });
});
