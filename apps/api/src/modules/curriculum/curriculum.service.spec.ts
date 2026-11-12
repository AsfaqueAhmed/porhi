import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { PrismaService } from '../../database/prisma.service';

describe('CurriculumService', () => {
  let curriculumService: CurriculumService;
  let prisma: {
    subject: {
      findMany: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
    };
    chapter: {
      findMany: ReturnType<typeof vi.fn>;
    };
  };

  beforeEach(() => {
    prisma = {
      subject: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      chapter: {
        findMany: vi.fn(),
      },
    };

    curriculumService = new CurriculumService(prisma as unknown as PrismaService);
  });

  describe('getSubjects', () => {
    it('should return all subjects with isReady, classLevel, syllabusYear, and chapter counts', async () => {
      const mockSubjects = [
        {
          id: 'sub_1',
          code: 'ssc_physics',
          nameBangla: 'পদার্থবিজ্ঞান',
          classLevel: 'CLASS_9_10',
          syllabusYear: 2026,
          isReady: true,
          _count: { chapters: 14 },
        },
        {
          id: 'sub_2',
          code: 'ssc_chemistry',
          nameBangla: 'রসায়ন',
          classLevel: 'CLASS_9_10',
          syllabusYear: 2026,
          isReady: false,
          _count: { chapters: 0 },
        },
      ];

      prisma.subject.findMany.mockResolvedValue(mockSubjects);

      const result = await curriculumService.getSubjects();

      expect(prisma.subject.findMany).toHaveBeenCalledWith({
        where: {},
        include: {
          _count: {
            select: { chapters: true },
          },
        },
        orderBy: { code: 'asc' },
      });

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: 'sub_1',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        classLevel: 'CLASS_9_10',
        syllabusYear: 2026,
        isReady: true,
        chapterCount: 14,
        topicCount: 0,
        publishedLessonCount: 0,
        publishedQuestionCount: 0,
        _count: { chapters: 14 },
      });
      expect(result[1]).toMatchObject({
        id: 'sub_2',
        chapterCount: 0,
        topicCount: 0,
        publishedLessonCount: 0,
        publishedQuestionCount: 0,
        isReady: false,
      });
    });

    it('should filter by classLevel if query parameter is provided', async () => {
      prisma.subject.findMany.mockResolvedValue([]);

      await curriculumService.getSubjects('CLASS_9_10');

      expect(prisma.subject.findMany).toHaveBeenCalledWith({
        where: { classLevel: 'CLASS_9_10' },
        include: {
          _count: {
            select: { chapters: true },
          },
        },
        orderBy: { code: 'asc' },
      });
    });
  });

  describe('getChaptersBySubject', () => {
    it('should return chapters ordered by orderIndex with their topics', async () => {
      prisma.subject.findUnique.mockResolvedValue({
        id: 'sub_1',
        nameBangla: 'পদার্থবিজ্ঞান',
      });

      const mockChapters = [
        {
          id: 'chap_1',
          subjectId: 'sub_1',
          orderIndex: 1,
          titleBangla: 'ভৌত রাশি ও পরিমাপ',
          topics: [
            { id: 'top_1', chapterId: 'chap_1', orderIndex: 1, titleBangla: 'পদার্থবিজ্ঞানের পরিসর' },
            { id: 'top_2', chapterId: 'chap_1', orderIndex: 2, titleBangla: 'পরিমাপের একক' },
          ],
        },
        {
          id: 'chap_2',
          subjectId: 'sub_1',
          orderIndex: 2,
          titleBangla: 'গতি',
          topics: [
            { id: 'top_3', chapterId: 'chap_2', orderIndex: 1, titleBangla: 'দূরত্ব ও সরণ' },
          ],
        },
      ];

      prisma.chapter.findMany.mockResolvedValue(mockChapters);

      const result = await curriculumService.getChaptersBySubject('sub_1');

      expect(prisma.subject.findUnique).toHaveBeenCalledWith({
        where: { id: 'sub_1' },
      });

      expect(prisma.chapter.findMany).toHaveBeenCalledWith({
        where: { subjectId: 'sub_1' },
        orderBy: { orderIndex: 'asc' },
        include: {
          topics: {
            orderBy: { orderIndex: 'asc' },
          },
        },
      });

      expect(result).toEqual(mockChapters);
    });

    it('should throw NotFoundException if subject does not exist', async () => {
      prisma.subject.findUnique.mockResolvedValue(null);

      await expect(curriculumService.getChaptersBySubject('non_existent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should resolve subject by code alias (e.g. sub-ssc-phy -> ssc_physics) and enrich topic lesson/lab/question counts when included', async () => {
      prisma.subject.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ id: 'sub_1', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' });

      prisma.chapter.findMany.mockResolvedValue([
        {
          id: 'chap_1',
          subjectId: 'sub_1',
          orderIndex: 1,
          titleBangla: 'ভৌত রাশি ও পরিমাপ',
          topics: [
            {
              id: 'top_1',
              chapterId: 'chap_1',
              orderIndex: 1,
              titleBangla: 'পদার্থবিজ্ঞান',
              lessons: [{ id: 'les_1', interactiveWidgetUrl: '/labs/vernier.html' }],
              questions: [
                { id: 'q_1', type: 'MCQ' },
                { id: 'q_2', type: 'MCQ' },
                { id: 'q_3', type: 'CQ_CREATIVE' },
              ],
            },
          ],
        },
      ]);

      const result = await curriculumService.getChaptersBySubject('sub-ssc-phy');

      expect(result).toHaveLength(1);
      expect(result[0].topics[0]).toMatchObject({
        id: 'top_1',
        lessonCount: 1,
        hasInteractiveLab: true,
        questionCount: 2,
        cqCount: 1,
      });
    });
  });

  describe('getOfflineChapterPack', () => {
    it('returns published lessons and questions packaged for offline use', async () => {
      (prisma.chapter as any).findUnique = vi.fn().mockResolvedValue({
        id: 'chap_1',
        subjectId: 'sub_1',
        titleBangla: 'ভৌত রাশি ও পরিমাপ',
        topics: [
          {
            id: 'top_1',
            titleBangla: 'পদার্থবিজ্ঞান',
            orderIndex: 1,
            lessons: [
              {
                id: 'les_1',
                topicId: 'top_1',
                titleBangla: 'লেসন ১',
                learningGoal: 'লক্ষ্য',
                explanation: 'ব্যাখ্যা',
                importantTerms: [],
                workedExample: null,
                memoryAid: null,
                interactiveWidgetUrl: null,
                version: 2,
                status: 'PUBLISHED',
              },
            ],
            questions: [
              {
                id: 'q_1',
                topicId: 'top_1',
                type: 'MCQ',
                stem: 'বেগের একক কী?',
                options: [
                  { id: 'opt_1', text: 'm/s', isCorrect: true },
                  { id: 'opt_2', text: 'm/s²', isCorrect: false },
                ],
                explanation: { directAnswer: 'm/s' },
                difficulty: 'EASY',
                version: 1,
                status: 'PUBLISHED',
              },
            ],
          },
        ],
      });

      const pack = await (curriculumService as any).getOfflineChapterPack('chap_1');

      expect(pack.chapterId).toBe('chap_1');
      expect(pack.subjectId).toBe('sub_1');
      expect(pack.titleBangla).toBe('ভৌত রাশি ও পরিমাপ');
      expect(pack.topics).toHaveLength(1);
      expect(pack.lessons).toHaveLength(1);
      expect(pack.questions).toHaveLength(1);
      expect(pack.questions[0].options[0].isCorrect).toBe(true);
      expect(pack.versionHash).toBeTruthy();
    });

    it('throws NotFoundException when chapter does not exist', async () => {
      (prisma.chapter as any).findUnique = vi.fn().mockResolvedValue(null);
      await expect(
        (curriculumService as any).getOfflineChapterPack('missing'),
      ).rejects.toThrow(NotFoundException);
    });

    it('includes cqRubric and boardSource in offline chapter pack questions', async () => {
      const cqRubric = {
        k: { prompt: 'জ্ঞানমূলক', marks: 1, answer: 'উত্তর ক' },
        kha: { prompt: 'অনুধাবনমূলক', marks: 2, answer: 'উত্তর খ' },
      };
      (prisma.chapter as any).findUnique = vi.fn().mockResolvedValue({
        id: 'chap_1',
        subjectId: 'sub_1',
        titleBangla: 'বল',
        topics: [
          {
            id: 'top_1',
            titleBangla: 'নিউটনের সূত্র',
            orderIndex: 1,
            lessons: [],
            questions: [
              {
                id: 'q_cq_1',
                topicId: 'top_1',
                type: 'CQ_CREATIVE',
                stem: 'একটি উদ্দীপক...',
                options: null,
                explanation: { directAnswer: 'সমাধান' },
                cqRubric,
                boardSource: 'Dhaka Board 2024',
                difficulty: 'HARD',
                version: 3,
                status: 'PUBLISHED',
              },
              {
                id: 'q_mcq_1',
                topicId: 'top_1',
                type: 'MCQ',
                stem: 'বলের একক কী?',
                options: [{ id: 'opt_1', text: 'N', isCorrect: true }],
                explanation: { directAnswer: 'N' },
                difficulty: 'EASY',
                version: 1,
                status: 'PUBLISHED',
              },
            ],
          },
        ],
      });

      const pack = await curriculumService.getOfflineChapterPack('chap_1');

      expect(pack.questions).toHaveLength(2);
      expect(pack.questions[0]).toMatchObject({
        id: 'q_cq_1',
        cqRubric,
        boardSource: 'Dhaka Board 2024',
      });
      expect(pack.questions[1]).toMatchObject({
        id: 'q_mcq_1',
        cqRubric: null,
        boardSource: null,
      });
    });
  });
});
