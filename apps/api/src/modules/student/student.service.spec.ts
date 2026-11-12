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

    it('returns streakDays=0 when latest study date is older than yesterday and accuracy=0 when weak topic has no attempts in topicMastery', async () => {
      const oldDate = '2025-01-01T10:00:00.000Z';
      prisma.subject.findUnique.mockResolvedValue({ id: 'sub_1', code: 'ssc_physics' });
      prisma.chapter.findMany.mockResolvedValue([
        {
          id: 'chap_1',
          orderIndex: 1,
          titleBangla: 'ভৌত রাশি ও পরিমাপ',
          topics: [{ id: 'top_1', orderIndex: 1, titleBangla: '১.১ পদার্থবিজ্ঞান' }],
        },
      ]);
      prisma.eventLog.findMany.mockResolvedValue([
        {
          id: 'ev_old',
          userId: 'user-1',
          eventType: 'LESSON_OPEN',
          payload: { topicId: 'top_1' },
          timestamp: new Date(oldDate),
        },
      ]);
      prisma.revisionMistake.findMany.mockResolvedValue([
        {
          id: 'rm_old',
          questionId: 'q_old',
          attemptCount: 1,
          resolved: false,
          updatedAt: new Date(oldDate),
          question: {
            id: 'q_old',
            topicId: 'top_1',
            stem: 'প্রশ্ন',
            options: [],
          },
        },
      ]);
      prisma.examSession.findMany.mockResolvedValue([]);

      const overview = await studentService.getOverview('sub_1', 'user-1');

      expect(overview.streakDays).toBe(0);
      expect(overview.weakTopics[0].accuracy).toBe(0);
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

  describe('bookmarks, lesson notes, and explanation feedback sync', () => {
    it('toggles a student bookmark and logs BOOKMARK_TOGGLE event', async () => {
      prisma.studentBookmark = {
        findUnique: vi.fn().mockResolvedValueOnce(null),
        create: vi.fn().mockResolvedValueOnce({ id: 'bm_1' }),
        delete: vi.fn(),
      };
      prisma.eventLog.create.mockResolvedValue({ id: 'ev_bm' });

      const added = await (studentService as any).toggleBookmark('user-1', {
        itemId: 'top_1',
        itemType: 'topic',
        titleBangla: '১.১ পদার্থবিজ্ঞান',
        subtitleBangla: 'প্রথম অধ্যায়',
        href: '/lesson/top_1',
      });

      expect(added).toEqual({ bookmarked: true });
      expect(prisma.studentBookmark.create).toHaveBeenCalled();

      prisma.studentBookmark.findUnique.mockResolvedValueOnce({ id: 'bm_1' });
      const removed = await (studentService as any).toggleBookmark('user-1', {
        itemId: 'top_1',
        itemType: 'topic',
        titleBangla: '১.১ পদার্থবিজ্ঞান',
        href: '/lesson/top_1',
      });

      expect(removed).toEqual({ bookmarked: false });
      expect(prisma.studentBookmark.delete).toHaveBeenCalledWith({ where: { id: 'bm_1' } });
    });

    it('upserts or deletes a student lesson note', async () => {
      prisma.studentNote = {
        upsert: vi.fn().mockResolvedValue({ id: 'note_1' }),
        deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
      };

      const saved = await (studentService as any).saveNote('user-1', 'top_1', 'সূত্র: $v = u + at$');
      expect(saved).toEqual({ success: true, topicId: 'top_1', content: 'সূত্র: $v = u + at$' });
      expect(prisma.studentNote.upsert).toHaveBeenCalled();

      const cleared = await (studentService as any).saveNote('user-1', 'top_1', '   ');
      expect(cleared).toEqual({ success: true, topicId: 'top_1', content: '' });
      expect(prisma.studentNote.deleteMany).toHaveBeenCalledWith({
        where: { userId: 'user-1', topicId: 'top_1' },
      });
    });

    it('records Bengali explanation feedback in EventLog and hydrates bookmarks & lessonNotes in getOverview', async () => {
      prisma.eventLog.create.mockResolvedValue({ id: 'ev_fb' });
      const fb = await (studentService as any).submitFeedback('user-1', {
        contentType: 'LESSON',
        contentId: 'les_1',
        helpful: true,
        comment: 'খুব সহজভাবে বোঝানো হয়েছে',
      });
      expect(fb).toEqual({ success: true });
      expect(prisma.eventLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-1',
          eventType: 'EXPLANATION_FEEDBACK',
        }),
      });

      prisma.subject.findUnique.mockResolvedValue({ id: 'sub_1', code: 'ssc_physics' });
      prisma.chapter.findMany.mockResolvedValue([]);
      prisma.eventLog.findMany.mockResolvedValue([]);
      prisma.revisionMistake.findMany.mockResolvedValue([]);
      prisma.examSession.findMany.mockResolvedValue([]);
      prisma.studentBookmark = {
        findMany: vi.fn().mockResolvedValue([
          {
            itemId: 'top_1',
            itemType: 'topic',
            titleBangla: '১.১ পদার্থবিজ্ঞান',
            subtitleBangla: 'অধ্যায় ১',
            href: '/lesson/top_1',
            createdAt: new Date('2026-11-12T00:00:00Z'),
          },
        ]),
      };
      prisma.studentNote = {
        findMany: vi.fn().mockResolvedValue([{ topicId: 'top_1', content: 'গুরুত্বপূর্ণ সূত্র' }]),
      };

      const overview = await studentService.getOverview('sub_1', 'user-1');
      expect((overview as any).bookmarks).toHaveLength(1);
      expect((overview as any).bookmarks[0]).toMatchObject({
        id: 'top_1',
        type: 'topic',
        titleBangla: '১.১ পদার্থবিজ্ঞান',
      });
      expect((overview as any).lessonNotes).toEqual({ top_1: 'গুরুত্বপূর্ণ সূত্র' });
    });
  });

  describe('syncOfflineActivity', () => {
    it('replays offline lesson completions, practice attempts, and exam submissions without duplicating', async () => {
      prisma.eventLog.findMany.mockResolvedValue([
        { eventType: 'LESSON_COMPLETE', payload: { offlineEventId: 'ev_done_already' } },
      ]);
      prisma.eventLog.create.mockResolvedValue({ id: 'ev_sync' });
      prisma.revisionMistake.upsert = vi.fn().mockResolvedValue({ id: 'mistake_sync' });
      prisma.question.findMany.mockResolvedValue([
        {
          id: 'q1',
          topicId: 'top_1',
          options: [
            { id: 'opt_a', text: 'A', isCorrect: true },
            { id: 'opt_b', text: 'B', isCorrect: false },
          ],
          explanation: { directAnswer: 'A' },
        },
      ]);
      prisma.examSession.create = vi.fn().mockResolvedValue({ id: 'sess_offline_1' });

      const res = await (studentService as any).syncOfflineActivity('user-1', {
        lessonCompletes: [
          {
            offlineEventId: 'ev_done_already',
            topicId: 'top_old',
            completedAt: '2026-11-12T08:00:00Z',
          },
          {
            offlineEventId: 'ev_new_1',
            topicId: 'top_1',
            completedAt: '2026-11-12T09:00:00Z',
          },
        ],
        practiceAttempts: [
          {
            offlineEventId: 'att_1',
            questionId: 'q1',
            topicId: 'top_1',
            isCorrect: false,
            attemptedAt: '2026-11-12T09:05:00Z',
          },
        ],
        examSubmissions: [
          {
            offlineSessionId: 'off_ses_1',
            subjectId: 'sub_1',
            chapterId: 'chap_1',
            answers: [{ questionId: 'q1', selectedOptionId: 'opt_a' }],
            submittedAt: '2026-11-12T09:15:00Z',
          },
        ],
      });

      expect(res).toEqual({
        syncedLessons: 1,
        syncedAttempts: 1,
        syncedExams: 1,
      });
      expect(prisma.revisionMistake.upsert).toHaveBeenCalledTimes(1);
      expect(prisma.examSession.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-1',
          testType: 'OFFLINE_CHAPTER_TEST',
          status: 'COMPLETED',
          score: 1,
        }),
      });
    });

    it('applies custom negativeRatio (0.5 and 0.0) on offline examSubmissions sync', async () => {
      prisma.eventLog.findMany.mockResolvedValue([]);
      prisma.eventLog.create.mockResolvedValue({ id: 'ev_neg_sync' });
      prisma.revisionMistake.upsert = vi.fn().mockResolvedValue({ id: 'mistake_neg' });
      prisma.question.findMany.mockResolvedValue([
        {
          id: 'q1',
          topicId: 'top_1',
          options: [
            { id: 'opt_a', text: 'A', isCorrect: true },
            { id: 'opt_b', text: 'B', isCorrect: false },
          ],
        },
        {
          id: 'q2',
          topicId: 'top_1',
          options: [
            { id: 'opt_a', text: 'A', isCorrect: true },
            { id: 'opt_b', text: 'B', isCorrect: false },
          ],
        },
      ]);
      prisma.examSession.create = vi.fn().mockResolvedValue({ id: 'sess_neg' });

      const res = await (studentService as any).syncOfflineActivity('user-1', {
        examSubmissions: [
          {
            offlineSessionId: 'off_neg_half',
            subjectId: 'sub_1',
            chapterId: 'chap_1',
            negativeRatio: 0.5,
            answers: [
              { questionId: 'q1', selectedOptionId: 'opt_a' },
              { questionId: 'q2', selectedOptionId: 'opt_b' },
            ],
            submittedAt: '2026-11-12T11:00:00Z',
          },
          {
            offlineSessionId: 'off_neg_zero',
            subjectId: 'sub_1',
            chapterId: 'chap_1',
            negativeRatio: 0,
            answers: [
              { questionId: 'q1', selectedOptionId: 'opt_a' },
              { questionId: 'q2', selectedOptionId: 'opt_b' },
            ],
            submittedAt: '2026-11-12T11:05:00Z',
          },
        ],
      });

      expect(res.syncedExams).toBe(2);
      expect(prisma.examSession.create).toHaveBeenNthCalledWith(1, {
        data: expect.objectContaining({
          negativeRatio: 0.5,
          score: 0.5,
        }),
      });
      expect(prisma.examSession.create).toHaveBeenNthCalledWith(2, {
        data: expect.objectContaining({
          negativeRatio: 0,
          score: 1,
        }),
      });
    });

    it('preserves CQ selfScores and skips revisionMistake.upsert for cq:k,kh,g,gh attempts', async () => {
      prisma.eventLog.findMany.mockResolvedValue([]);
      prisma.eventLog.create.mockResolvedValue({ id: 'ev_cq_sync' });
      prisma.revisionMistake.upsert = vi.fn().mockResolvedValue({ id: 'mistake_sync' });

      const res = await (studentService as any).syncOfflineActivity('user-1', {
        practiceAttempts: [
          {
            offlineEventId: 'att_cq_1',
            questionId: 'q_cq_1',
            topicId: 'top_1',
            selectedOptionId: 'cq:1,1,1,1',
            isCorrect: false,
            attemptedAt: '2026-11-12T10:00:00Z',
          },
          {
            offlineEventId: 'att_mcq_1',
            questionId: 'q_mcq_1',
            topicId: 'top_1',
            selectedOptionId: 'opt_b',
            isCorrect: false,
            attemptedAt: '2026-11-12T10:01:00Z',
          },
        ],
      });

      expect(res).toEqual({
        syncedLessons: 0,
        syncedAttempts: 2,
        syncedExams: 0,
      });

      expect(prisma.eventLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          eventType: 'PRACTICE_ATTEMPT',
          payload: expect.objectContaining({
            questionId: 'q_cq_1',
            topicId: 'top_1',
            type: 'CQ_CREATIVE',
            selfScores: { ka: 1, kha: 1, ga: 1, gha: 1 },
            totalScore: 4,
            maxScore: 10,
            selectedOptionId: 'cq:1,1,1,1',
            isCorrect: false,
            offlineEventId: 'att_cq_1',
            offlineSynced: true,
          }),
        },
      });

      // Only the normal MCQ wrong attempt creates a revisionMistake row
      expect(prisma.revisionMistake.upsert).toHaveBeenCalledTimes(1);
      expect(prisma.revisionMistake.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            userId_questionId: {
              userId: 'user-1',
              questionId: 'q_mcq_1',
            },
          },
        }),
      );
    });
  });
});
