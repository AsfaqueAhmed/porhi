import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StudentService } from './student.service';
import { PrismaService } from '../../database/prisma.service';

describe('StudentService', () => {
  let studentService: StudentService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      subject: {
        findUnique: vi.fn(),
        findFirst: vi.fn(),
      },
      chapter: {
        findMany: vi.fn(),
      },
      lesson: {
        count: vi.fn(),
      },
      question: {
        count: vi.fn(),
        findMany: vi.fn(),
      },
      eventLog: {
        findMany: vi.fn(),
        create: vi.fn(),
      },
      revisionMistake: {
        findMany: vi.fn(),
        updateMany: vi.fn(),
      },
      examSession: {
        findMany: vi.fn(),
      },
    };

    studentService = new StudentService(prisma as unknown as PrismaService);
  });

  describe('getOverview', () => {
    it('returns curriculum totals and zeroed safe metrics when userId is undefined', async () => {
      prisma.subject.findUnique.mockResolvedValue({
        id: 'sub_1',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
      });
      prisma.chapter.findMany.mockResolvedValue([
        {
          id: 'chap_1',
          orderIndex: 1,
          titleBangla: 'ভৌত রাশি ও পরিমাপ',
          topics: [
            { id: 'top_1', orderIndex: 1, titleBangla: 'পদার্থবিজ্ঞান' },
            { id: 'top_2', orderIndex: 2, titleBangla: 'পরিমাপ' },
          ],
        },
      ]);
      prisma.lesson.count.mockResolvedValue(2);
      prisma.question.count.mockResolvedValue(10);

      const overview = await studentService.getOverview('sub_1', undefined);

      expect(overview.curriculumTotals).toEqual({
        totalChapters: 1,
        totalTopics: 2,
        totalPublishedLessons: 2,
        totalPublishedQuestions: 10,
      });
      expect(overview.completedTopicIds).toEqual([]);
      expect(overview.practiceStats.accuracyPercent).toBe(0);
      expect(Number.isNaN(overview.practiceStats.accuracyPercent)).toBe(false);
      expect(overview.streakDays).toBe(0);
      expect(overview.dueMistakes).toEqual([]);
      expect(overview.weakTopics).toEqual([]);
      expect(overview.recentExams).toEqual([]);
    });

    it('aggregates user events, mistakes, weak topics, and exams when userId is provided', async () => {
      const todayIso = new Date().toISOString();
      prisma.subject.findUnique.mockResolvedValue({
        id: 'sub_1',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
      });
      prisma.chapter.findMany.mockResolvedValue([
        {
          id: 'chap_1',
          orderIndex: 1,
          titleBangla: 'ভৌত রাশি ও পরিমাপ',
          topics: [
            { id: 'top_1', orderIndex: 1, titleBangla: '১.১ পদার্থবিজ্ঞান' },
            { id: 'top_2', orderIndex: 2, titleBangla: '১.২ পরিমাপ' },
          ],
        },
      ]);
      prisma.lesson.count.mockResolvedValue(2);
      prisma.question.count.mockResolvedValue(10);

      prisma.eventLog.findMany.mockResolvedValue([
        {
          id: 'ev_1',
          userId: 'user-1',
          eventType: 'LESSON_COMPLETE',
          payload: { topicId: 'top_1' },
          timestamp: new Date(todayIso),
        },
        {
          id: 'ev_2',
          userId: 'user-1',
          eventType: 'PRACTICE_ATTEMPT',
          payload: { questionId: 'q_1', isCorrect: false },
          timestamp: new Date(todayIso),
        },
        {
          id: 'ev_3',
          userId: 'user-1',
          eventType: 'PRACTICE_ATTEMPT',
          payload: { questionId: 'q_2', isCorrect: true },
          timestamp: new Date(todayIso),
        },
      ]);

      prisma.question.findMany.mockResolvedValue([
        { id: 'q_1', topicId: 'top_1' },
        { id: 'q_2', topicId: 'top_2' },
      ]);

      prisma.revisionMistake.findMany.mockResolvedValue([
        {
          id: 'rm_1',
          questionId: 'q_1',
          attemptCount: 2,
          resolved: false,
          updatedAt: new Date(todayIso),
          question: {
            id: 'q_1',
            topicId: 'top_1',
            stem: 'মাত্রা সমীকরণ কোনটি?',
            options: [
              { id: 'o1', text: '$[L]$', isCorrect: true },
              { id: 'o2', text: '$[T]$', isCorrect: false },
            ],
            explanation: {
              coreConcept: 'দৈর্ঘ্যের মাত্রা $[L]$।',
            },
            topic: {
              id: 'top_1',
              titleBangla: '১.১ পদার্থবিজ্ঞান',
              chapter: {
                id: 'chap_1',
                titleBangla: 'ভৌত রাশি ও পরিমাপ',
              },
            },
          },
        },
      ]);

      prisma.examSession.findMany.mockResolvedValue([
        {
          id: 'sess_1',
          chapterId: 'chap_1',
          subjectId: 'sub_1',
          score: 8,
          totalQuestions: 10,
          durationSeconds: 600,
          completedAt: new Date(todayIso),
          status: 'COMPLETED',
        },
      ]);

      const overview = await studentService.getOverview('sub_1', 'user-1');

      expect(overview.completedTopicIds).toContain('top_1');
      expect(overview.lastStudiedTopic?.topicId).toBe('top_1');
      expect(overview.practiceStats.totalAttempts).toBe(2);
      expect(overview.practiceStats.correctAttempts).toBe(1);
      expect(overview.practiceStats.accuracyPercent).toBe(50);
      expect(overview.dueMistakes).toHaveLength(1);
      expect(overview.dueMistakes[0]).toMatchObject({
        questionId: 'q_1',
        topicId: 'top_1',
        correctOptionText: '$[L]$',
      });
      expect(overview.weakTopics.length).toBeGreaterThanOrEqual(1);
      expect(overview.weakTopics[0].topicId).toBe('top_1');
      expect(overview.recentExams).toHaveLength(1);
      expect(overview.streakDays).toBeGreaterThanOrEqual(1);
    });
  });

  describe('markLessonComplete & resolveMistake', () => {
    it('logs LESSON_COMPLETE event when userId is present', async () => {
      prisma.eventLog.create.mockResolvedValue({ id: 'ev_complete' });

      const res = await studentService.markLessonComplete('user-1', {
        topicId: 'top_ssc_physics_ch1_1',
        lessonId: 'les_1',
      });

      expect(res).toEqual({ success: true, topicId: 'top_ssc_physics_ch1_1' });
      expect(prisma.eventLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          eventType: 'LESSON_COMPLETE',
          payload: {
            topicId: 'top_ssc_physics_ch1_1',
            lessonId: 'les_1',
            timeSpentSeconds: 0,
          },
        },
      });
    });

    it('resolves revision mistake for user and question', async () => {
      prisma.revisionMistake.updateMany.mockResolvedValue({ count: 1 });

      const res = await studentService.resolveMistake('user-1', 'q-1');

      expect(res).toEqual({ success: true, questionId: 'q-1' });
      expect(prisma.revisionMistake.updateMany).toHaveBeenCalledWith({
        where: { userId: 'user-1', questionId: 'q-1' },
        data: { resolved: true },
      });
    });
  });
});
