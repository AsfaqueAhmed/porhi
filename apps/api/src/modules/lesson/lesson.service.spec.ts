import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { PrismaService } from '../../database/prisma.service';
import { ContentStatus, Role } from '@prisma/client';

describe('LessonService', () => {
  let lessonService: LessonService;
  let prisma: {
    lesson: {
      findFirst: ReturnType<typeof vi.fn>;
    };
    eventLog: {
      create: ReturnType<typeof vi.fn>;
    };
  };

  const mockLesson = {
    id: 'les_1',
    topicId: 'top_1',
    titleBangla: 'নিউটনের গতির সূত্র',
    learningGoal: 'নিউটনের তিনটি গতিসূত্র ব্যাখ্যা ও গাণিতিক প্রয়োগ করতে পারা',
    explanation: '# নিউটনের গতিসূত্র\n\nবল $F = ma$',
    importantTerms: [
      {
        termBangla: 'জড়তা',
        termEnglish: 'Inertia',
        definition: 'বস্তু যে অবস্থায় আছে চিরকাল সেই অবস্থায় থাকতে চাওয়ার প্রবণতা',
      },
    ],
    workedExample: {
      problem: '$5\\text{ kg}$ ভরের বস্তুর ওপর $10\\text{ N}$ বল প্রয়োগ করলে ত্বরণ কত?',
      stepByStepSolution: '$a = \\frac{F}{m} = \\frac{10}{5} = 2\\text{ m/s}^2$',
    },
    memoryAid: 'প্রথম সূত্র: জড়তা, দ্বিতীয় সূত্র: $F=ma$, তৃতীয় সূত্র: সমান ও বিপরীত প্রতিক্রিয়া',
    status: ContentStatus.PUBLISHED,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    prisma = {
      lesson: {
        findFirst: vi.fn(),
      },
      eventLog: {
        create: vi.fn().mockResolvedValue({ id: 'ev_1' }),
      },
    };

    lessonService = new LessonService(prisma as unknown as PrismaService);
  });

  describe('getLessonByTopic', () => {
    it('should return published lesson for topic with all core components', async () => {
      prisma.lesson.findFirst.mockResolvedValue(mockLesson);

      const result = await lessonService.getLessonByTopic('top_1');

      expect(prisma.lesson.findFirst).toHaveBeenCalledWith({
        where: { topicId: 'top_1', status: ContentStatus.PUBLISHED },
        orderBy: { version: 'desc' },
      });

      expect(result).toEqual(mockLesson);
      expect(result.learningGoal).toBeDefined();
      expect(result.explanation).toContain('$F = ma$');
      expect(result.importantTerms).toHaveLength(1);
      expect(result.workedExample).toBeDefined();
      expect(result.memoryAid).toBeDefined();
      expect(prisma.eventLog.create).not.toHaveBeenCalled();
    });

    it('should log LESSON_OPEN event if authenticated user is present', async () => {
      prisma.lesson.findFirst.mockResolvedValue(mockLesson);

      const user = { id: 'usr_123', role: Role.STUDENT };
      const result = await lessonService.getLessonByTopic('top_1', user);

      expect(result).toEqual(mockLesson);
      expect(prisma.eventLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'usr_123',
          eventType: 'LESSON_OPEN',
          payload: {
            topicId: 'top_1',
            lessonId: 'les_1',
          },
        },
      });
    });

    it('should throw NotFoundException if no published lesson exists for regular user', async () => {
      prisma.lesson.findFirst.mockResolvedValue(null);

      await expect(lessonService.getLessonByTopic('top_missing')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return latest draft if requested by editor', async () => {
      const draftLesson = {
        ...mockLesson,
        id: 'les_draft',
        status: ContentStatus.DRAFT,
        version: 2,
      };

      prisma.lesson.findFirst.mockResolvedValue(draftLesson);

      const editor = { id: 'usr_editor', role: Role.EDITOR };
      const result = await lessonService.getLessonByTopic('top_1', editor, true);

      expect(prisma.lesson.findFirst).toHaveBeenCalledWith({
        where: { topicId: 'top_1', status: ContentStatus.DRAFT },
        orderBy: { version: 'desc' },
      });

      expect(result.status).toBe(ContentStatus.DRAFT);
      expect(prisma.eventLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'usr_editor',
          eventType: 'LESSON_OPEN',
          payload: {
            topicId: 'top_1',
            lessonId: 'les_draft',
          },
        },
      });
    });

    it('should throw ForbiddenException if draft is requested by non-editor', async () => {
      const student = { id: 'usr_student', role: Role.STUDENT };

      await expect(
        lessonService.getLessonByTopic('top_1', student, true),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should fallback to draft for editor if no published lesson exists', async () => {
      const draftLesson = {
        ...mockLesson,
        id: 'les_draft_fallback',
        status: ContentStatus.DRAFT,
      };

      prisma.lesson.findFirst
        .mockResolvedValueOnce(null) // first check for published returns null
        .mockResolvedValueOnce(draftLesson); // fallback check returns draft

      const editor = { id: 'usr_editor', role: Role.EDITOR };
      const result = await lessonService.getLessonByTopic('top_1', editor, false);

      expect(result.id).toBe('les_draft_fallback');
    });
  });
});
