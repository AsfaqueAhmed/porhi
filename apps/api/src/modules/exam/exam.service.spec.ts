import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ExamService } from './exam.service';
import { PrismaService } from '../../database/prisma.service';
import { ContentStatus } from '@prisma/client';

describe('ExamService', () => {
  let examService: ExamService;
  let prisma: {
    chapter: {
      findUnique: ReturnType<typeof vi.fn>;
    };
    examSession: {
      findUnique: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
    };
    question: {
      findMany: ReturnType<typeof vi.fn>;
    };
    revisionMistake: {
      upsert: ReturnType<typeof vi.fn>;
    };
    eventLog: {
      create: ReturnType<typeof vi.fn>;
    };
  };

  const sampleExplanation = {
    directAnswer: 'সঠিক উত্তর ক: 5 m/s^2',
    coreConcept: 'F = ma',
    stepDerivation: 'a = F / m = 10 / 2 = 5 m/s^2',
  };

  const sampleQuestion1 = {
    id: 'q1',
    topicId: 'top1',
    type: 'MCQ',
    stem: 'বল ও ত্বরণের সম্পর্ক কী?',
    options: [
      { id: 'opt_1a', text: 'F = ma', isCorrect: true },
      { id: 'opt_1b', text: 'F = m/a', isCorrect: false },
      { id: 'opt_1c', text: 'F = m + a', isCorrect: false },
    ],
    explanation: sampleExplanation,
    status: ContentStatus.PUBLISHED,
  };

  const sampleQuestion2 = {
    id: 'q2',
    topicId: 'top1',
    type: 'MCQ',
    stem: 'কাজের একক কী?',
    options: [
      { id: 'opt_2a', text: 'জুল (Joule)', isCorrect: true },
      { id: 'opt_2b', text: 'নিউটন (Newton)', isCorrect: false },
    ],
    explanation: sampleExplanation,
    status: ContentStatus.PUBLISHED,
  };

  beforeEach(() => {
    prisma = {
      chapter: {
        findUnique: vi.fn(),
      },
      examSession: {
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      question: {
        findMany: vi.fn(),
      },
      revisionMistake: {
        upsert: vi.fn().mockResolvedValue({ id: 'mistake-1' }),
      },
      eventLog: {
        create: vi.fn().mockResolvedValue({ id: 'event-1' }),
      },
    };

    examService = new ExamService(prisma as unknown as PrismaService);
  });

  describe('startExam', () => {
    it('should start exam with published questions, stripped answers/explanations, and default negativeRatio 0.25', async () => {
      prisma.chapter.findUnique.mockResolvedValue({ id: 'chap1', subjectId: 'sub1' });
      prisma.question.findMany.mockResolvedValue([sampleQuestion1, sampleQuestion2]);
      prisma.examSession.create.mockImplementation(async ({ data }) => ({
        id: 'session-123',
        ...data,
      }));

      const result = await examService.startExam(
        {
          testType: 'CHAPTER_TEST',
          subjectId: 'sub1',
          chapterId: 'chap1',
        },
        'user-1',
      );

      expect(prisma.chapter.findUnique).toHaveBeenCalledWith({
        where: { id: 'chap1' },
      });
      expect(prisma.question.findMany).toHaveBeenCalledWith({
        where: {
          type: 'MCQ',
          status: ContentStatus.PUBLISHED,
          topic: { chapterId: 'chap1' },
        },
      });

      expect(prisma.examSession.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-1',
          testType: 'CHAPTER_TEST',
          subjectId: 'sub1',
          chapterId: 'chap1',
          totalQuestions: 2,
          negativeRatio: 0.25,
          status: 'IN_PROGRESS',
        }),
      });

      expect(result.sessionId).toBe('session-123');
      expect(result.totalQuestions).toBe(2);
      expect(result.negativeRatio).toBe(0.25);
      expect(result.questions).toHaveLength(2);

      // Verify options are sanitized
      for (const q of result.questions) {
        expect(q.id).toBeDefined();
        expect(q.stem).toBeDefined();
        expect((q as any).explanation).toBeUndefined();
        for (const opt of q.options) {
          expect(opt.id).toBeDefined();
          expect(opt.text).toBeDefined();
          expect((opt as any).isCorrect).toBeUndefined();
        }
      }
    });

    it('should filter by topicId when provided and accept custom negativeRatio and durationSeconds', async () => {
      prisma.chapter.findUnique.mockResolvedValue({ id: 'chap1', subjectId: 'sub1' });
      prisma.question.findMany.mockResolvedValue([sampleQuestion1]);
      prisma.examSession.create.mockImplementation(async ({ data }) => ({
        id: 'session-456',
        ...data,
      }));

      const result = await examService.startExam(
        {
          testType: 'TOPIC_TEST',
          subjectId: 'sub1',
          chapterId: 'chap1',
          topicId: 'top1',
          negativeRatio: 0.5,
          durationSeconds: 300,
        },
        'user-1',
      );

      expect(prisma.question.findMany).toHaveBeenCalledWith({
        where: {
          type: 'MCQ',
          status: ContentStatus.PUBLISHED,
          topicId: 'top1',
          topic: { chapterId: 'chap1' },
        },
      });

      expect(result.negativeRatio).toBe(0.5);
      expect(result.durationSeconds).toBe(300);
      expect(result.totalQuestions).toBe(1);
    });

    it('should throw NotFoundException if chapter does not exist', async () => {
      prisma.chapter.findUnique.mockResolvedValue(null);

      await expect(
        examService.startExam(
          { testType: 'CHAPTER_TEST', subjectId: 'sub1', chapterId: 'unknown' },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if chapter does not belong to specified subject', async () => {
      prisma.chapter.findUnique.mockResolvedValue({ id: 'chap1', subjectId: 'different-subject' });

      await expect(
        examService.startExam(
          { testType: 'CHAPTER_TEST', subjectId: 'sub1', chapterId: 'chap1' },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if no published questions found', async () => {
      prisma.chapter.findUnique.mockResolvedValue({ id: 'chap1', subjectId: 'sub1' });
      prisma.question.findMany.mockResolvedValue([]);

      await expect(
        examService.startExam(
          { testType: 'CHAPTER_TEST', subjectId: 'sub1', chapterId: 'chap1' },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('heartbeat', () => {
    it('should save autosave answers for IN_PROGRESS session', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        status: 'IN_PROGRESS',
        answers: [{ questionId: 'q1', selectedOptionId: null, timeSpent: 0 }],
      });

      prisma.examSession.update.mockResolvedValue({
        id: 'session-1',
        status: 'IN_PROGRESS',
      });

      const result = await examService.heartbeat(
        'session-1',
        {
          answers: [{ questionId: 'q1', selectedOptionId: 'opt_1a', timeSpent: 12 }],
        },
        'user-1',
      );

      expect(prisma.examSession.update).toHaveBeenCalledWith({
        where: { id: 'session-1' },
        data: {
          answers: [{ questionId: 'q1', selectedOptionId: 'opt_1a', timeSpent: 12 }],
        },
      });
      expect(result.success).toBe(true);
    });

    it('should ignore uninvited questions submitted via heartbeat', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        status: 'IN_PROGRESS',
        answers: [{ questionId: 'q1', selectedOptionId: null, timeSpent: 0 }],
      });

      prisma.examSession.update.mockResolvedValue({
        id: 'session-1',
        status: 'IN_PROGRESS',
      });

      const result = await examService.heartbeat(
        'session-1',
        {
          answers: [
            { questionId: 'q1', selectedOptionId: 'opt_1a', timeSpent: 10 },
            { questionId: 'foreign-q-999', selectedOptionId: 'easy-opt', timeSpent: 5 },
          ],
        },
        'user-1',
      );

      expect(prisma.examSession.update).toHaveBeenCalledWith({
        where: { id: 'session-1' },
        data: {
          answers: [{ questionId: 'q1', selectedOptionId: 'opt_1a', timeSpent: 10 }],
        },
      });
      expect(result.answers).toHaveLength(1);
      expect(result.answers[0].questionId).toBe('q1');
    });

    it('should throw NotFoundException if session does not exist', async () => {
      prisma.examSession.findUnique.mockResolvedValue(null);

      await expect(
        examService.heartbeat('unknown-session', { answers: [] }, 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user does not own session', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'other-user',
        status: 'IN_PROGRESS',
      });

      await expect(
        examService.heartbeat('session-1', { answers: [] }, 'user-1'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw BadRequestException if session is not IN_PROGRESS', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        status: 'COMPLETED',
      });

      await expect(
        examService.heartbeat('session-1', { answers: [] }, 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('submitExam', () => {
    it('should calculate final score with negative penalty (0.25) and include topicId', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        negativeRatio: 0.25,
        totalQuestions: 2,
        durationSeconds: 120,
        startedAt: new Date(),
        status: 'IN_PROGRESS',
        answers: [
          { questionId: 'q1', selectedOptionId: null, timeSpent: 0 },
          { questionId: 'q2', selectedOptionId: null, timeSpent: 0 },
        ],
      });

      prisma.question.findMany.mockResolvedValue([sampleQuestion1, sampleQuestion2]);
      prisma.examSession.update.mockResolvedValue({ id: 'session-1', status: 'COMPLETED' });

      const result = await examService.submitExam(
        'session-1',
        [
          { questionId: 'q1', selectedOptionId: 'opt_1a', timeSpent: 15 }, // correct (1.0)
          { questionId: 'q2', selectedOptionId: 'opt_2b', timeSpent: 20 }, // wrong (-0.25)
        ],
        'user-1',
      );

      // 1 correct (1.0) - 1 wrong (0.25) = 0.75
      expect(result.score).toBe(0.75);
      expect(result.correctCount).toBe(1);
      expect(result.wrongCount).toBe(1);
      expect(result.skippedCount).toBe(0);
      expect(result.negativeDeduction).toBe(0.25);
      expect(result.totalQuestions).toBe(2);

      // Verify RevisionMistake was upserted for the wrong answer (q2)
      expect(prisma.revisionMistake.upsert).toHaveBeenCalledWith({
        where: {
          userId_questionId: {
            userId: 'user-1',
            questionId: 'q2',
          },
        },
        create: {
          userId: 'user-1',
          questionId: 'q2',
          resolved: false,
          attemptCount: 1,
        },
        update: {
          resolved: false,
          attemptCount: { increment: 1 },
        },
      });

      // Verify EventLog was called
      expect(prisma.eventLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-1',
          eventType: 'TEST_SUBMIT',
          payload: expect.objectContaining({
            sessionId: 'session-1',
            score: 0.75,
            correctCount: 1,
            wrongCount: 1,
          }),
        }),
      });

      // Verify answersWithExplanation contains full feedback and topicId
      expect(result.answersWithExplanation).toHaveLength(2);
      expect(result.answersWithExplanation[0]).toMatchObject({
        questionId: 'q1',
        topicId: 'top1',
        isCorrect: true,
        selectedOptionId: 'opt_1a',
        correctOptionId: 'opt_1a',
        explanation: sampleExplanation,
      });
      expect(result.answersWithExplanation[1]).toMatchObject({
        questionId: 'q2',
        topicId: 'top1',
        isCorrect: false,
        selectedOptionId: 'opt_2b',
        correctOptionId: 'opt_2a',
        explanation: sampleExplanation,
      });
    });

    it('should correctly handle skipped answers without negative penalty or mistake recording', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-2',
        userId: 'user-1',
        negativeRatio: 0.25,
        totalQuestions: 2,
        durationSeconds: 120,
        startedAt: new Date(),
        status: 'IN_PROGRESS',
        answers: [
          { questionId: 'q1', selectedOptionId: null, timeSpent: 0 },
          { questionId: 'q2', selectedOptionId: null, timeSpent: 0 },
        ],
      });

      prisma.question.findMany.mockResolvedValue([sampleQuestion1, sampleQuestion2]);
      prisma.examSession.update.mockResolvedValue({ id: 'session-2', status: 'COMPLETED' });

      // q1 correct, q2 skipped (selectedOptionId is null)
      const result = await examService.submitExam(
        'session-2',
        {
          answers: [
            { questionId: 'q1', selectedOptionId: 'opt_1a', timeSpent: 10 },
            { questionId: 'q2', selectedOptionId: null, timeSpent: 5 },
          ],
        },
        'user-1',
      );

      expect(result.score).toBe(1.0);
      expect(result.correctCount).toBe(1);
      expect(result.wrongCount).toBe(0);
      expect(result.skippedCount).toBe(1);
      expect(result.negativeDeduction).toBe(0);

      // No mistake upserted because q2 was skipped
      expect(prisma.revisionMistake.upsert).not.toHaveBeenCalled();
    });

    it('should clamp score to 0 when wrong penalties exceed correct score', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-3',
        userId: 'user-1',
        negativeRatio: 0.5,
        totalQuestions: 2,
        durationSeconds: 120,
        startedAt: new Date(),
        status: 'IN_PROGRESS',
        answers: [
          { questionId: 'q1', selectedOptionId: null, timeSpent: 0 },
          { questionId: 'q2', selectedOptionId: null, timeSpent: 0 },
        ],
      });

      prisma.question.findMany.mockResolvedValue([sampleQuestion1, sampleQuestion2]);
      prisma.examSession.update.mockResolvedValue({ id: 'session-3', status: 'COMPLETED' });

      // 0 correct, 2 wrong -> raw score: 0 - (2 * 0.5) = -1.0, clamped to 0
      const result = await examService.submitExam(
        'session-3',
        [
          { questionId: 'q1', selectedOptionId: 'opt_1b', timeSpent: 10 },
          { questionId: 'q2', selectedOptionId: 'opt_2b', timeSpent: 10 },
        ],
        'user-1',
      );

      expect(result.score).toBe(0);
      expect(result.correctCount).toBe(0);
      expect(result.wrongCount).toBe(2);
      expect(result.negativeDeduction).toBe(1.0);
    });

    it('should throw BadRequestException when exam duration plus grace period has expired', async () => {
      const expiredStartedAt = new Date(Date.now() - (600 + 150) * 1000); // 750s ago for 600s test (grace 120s)
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-expired',
        userId: 'user-1',
        status: 'IN_PROGRESS',
        durationSeconds: 600,
        startedAt: expiredStartedAt,
        answers: [],
      });

      await expect(
        examService.submitExam('session-expired', [], 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if exam is already submitted', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        status: 'COMPLETED',
        startedAt: new Date(),
      });

      await expect(examService.submitExam('session-1', [], 'user-1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw ForbiddenException if user does not own exam session', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'other-user',
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      });

      await expect(
        examService.submitExam('session-1', [], 'user-1'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getSession', () => {
    it('should return active session state with sanitized questions when IN_PROGRESS', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-active',
        userId: 'user-1',
        testType: 'CHAPTER_TEST',
        subjectId: 'sub1',
        chapterId: 'chap1',
        totalQuestions: 1,
        durationSeconds: 60,
        negativeRatio: 0.25,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
        answers: [{ questionId: 'q1', selectedOptionId: 'opt_1a', timeSpent: 10 }],
      });

      prisma.question.findMany.mockResolvedValue([sampleQuestion1]);

      const result = await examService.getSession('session-active', 'user-1');

      expect(result.status).toBe('IN_PROGRESS');
      expect(result.sessionId).toBe('session-active');
      const activeResult = result as { questions: any[] };
      expect(activeResult.questions).toHaveLength(1);
      expect(activeResult.questions[0].id).toBe('q1');
      expect(activeResult.questions[0].explanation).toBeUndefined();
      expect(activeResult.questions[0].options[0].isCorrect).toBeUndefined();
    });

    it('should return completed scorecard when COMPLETED', async () => {
      const completedAnswers = [
        {
          questionId: 'q1',
          topicId: 'top1',
          stem: sampleQuestion1.stem,
          selectedOptionId: 'opt_1a',
          correctOptionId: 'opt_1a',
          isCorrect: true,
          explanation: sampleExplanation,
          timeSpent: 10,
        },
        {
          questionId: 'q2',
          topicId: 'top1',
          stem: sampleQuestion2.stem,
          selectedOptionId: 'opt_2b',
          correctOptionId: 'opt_2a',
          isCorrect: false,
          explanation: sampleExplanation,
          timeSpent: 15,
        },
      ];

      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-completed',
        userId: 'user-1',
        testType: 'CHAPTER_TEST',
        subjectId: 'sub1',
        chapterId: 'chap1',
        totalQuestions: 2,
        durationSeconds: 120,
        negativeRatio: 0.25,
        score: 0.75,
        status: 'COMPLETED',
        startedAt: new Date(),
        completedAt: new Date(),
        answers: completedAnswers,
      });

      const result = await examService.getSession('session-completed', 'user-1');

      expect(result.status).toBe('COMPLETED');
      expect(result.score).toBe(0.75);
      expect(result.correctCount).toBe(1);
      expect(result.wrongCount).toBe(1);
      expect(result.skippedCount).toBe(0);
      expect(result.negativeDeduction).toBe(0.25);
      expect(result.answersWithExplanation).toEqual(completedAnswers);
    });

    it('should throw ForbiddenException if user tries to access another users session', async () => {
      prisma.examSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'other-user',
        status: 'IN_PROGRESS',
      });

      await expect(
        examService.getSession('session-1', 'user-1'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('startExam questionLimit & WEAK_AREA mode', () => {
    it('slices questions to questionLimit and adjusts default durationSeconds', async () => {
      prisma.chapter.findUnique.mockResolvedValue({ id: 'chap1', subjectId: 'sub1' });
      prisma.question.findMany.mockResolvedValue([sampleQuestion1, sampleQuestion2]);
      prisma.examSession.create.mockImplementation(async ({ data }: any) => ({
        id: 'session-limited',
        ...data,
      }));

      const res = await examService.startExam(
        {
          testType: 'CHAPTER_TEST',
          subjectId: 'sub1',
          chapterId: 'chap1',
          questionLimit: 1,
        } as any,
        'user-1',
      );

      expect(res.questions).toHaveLength(1);
      expect(res.totalQuestions).toBe(1);
      expect(res.durationSeconds).toBe(60);
    });

    it('prioritizes unresolved mistake topicIds when testType is WEAK_AREA', async () => {
      prisma.chapter.findUnique.mockResolvedValue({ id: 'chap1', subjectId: 'sub1' });
      (prisma.revisionMistake as any).findMany = vi.fn().mockResolvedValue([
        { questionId: 'q1', question: { topicId: 'top_weak' } },
      ]);
      prisma.question.findMany.mockResolvedValue([sampleQuestion1]);
      prisma.examSession.create.mockImplementation(async ({ data }: any) => ({
        id: 'session-weak',
        ...data,
      }));

      const res = await examService.startExam(
        {
          testType: 'WEAK_AREA',
          subjectId: 'sub1',
          chapterId: 'chap1',
        } as any,
        'user-1',
      );

      expect(prisma.question.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          type: 'MCQ',
          status: ContentStatus.PUBLISHED,
          topicId: { in: ['top_weak'] },
          topic: { chapterId: 'chap1' },
        }),
      });
      expect(res.sessionId).toBe('session-weak');
    });
  });
});
