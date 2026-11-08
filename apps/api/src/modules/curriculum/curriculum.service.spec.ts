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
        _count: { chapters: 14 },
      });
      expect(result[1]).toMatchObject({
        id: 'sub_2',
        chapterCount: 0,
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
  });
});
