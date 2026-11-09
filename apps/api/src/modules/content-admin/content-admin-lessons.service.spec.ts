import 'reflect-metadata';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { ContentStatus, Prisma, Role } from '@prisma/client';
import { ContentAdminLessonsService } from './content-admin-lessons.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateLessonAdminDto } from './dto/create-lesson-admin.dto';
import { ListLessonsQueryDto } from './dto/list-lessons-query.dto';
import { UpdateLessonAdminDto } from './dto/update-lesson-admin.dto';

describe('ContentAdminLessonsService', () => {
  let service: ContentAdminLessonsService;
  let mockPrisma: any;

  const sampleLesson = {
    id: 'les_motion_1',
    topicId: 'top_motion_1',
    titleBangla: 'গতির মৌলিক ধারণা',
    learningGoal: 'সুষম ও অসম বেগের পার্থক্য বুঝতে পারা',
    explanation: 'সময়ের সাথে অবস্থান পরিবর্তনকে গতি বলে। $v = u + at$',
    importantTerms: [
      { termBangla: 'বেগ', termEnglish: 'Velocity', definition: 'সরণের পরিবর্তনের হার' },
    ],
    workedExample: {
      problem: 'একটি গাড়ি $2\\text{ m/s}^2$ ত্বরণে $5\\text{ s}$ চললে বেগ কত?',
      stepByStepSolution: '$v = 0 + 2 \\times 5 = 10\\text{ m/s}$',
    },
    memoryAid: 'ভুবন জুড়ে ত্বরণ',
    status: ContentStatus.DRAFT,
    version: 1,
    createdAt: new Date('2026-11-08T00:00:00Z'),
    updatedAt: new Date('2026-11-09T00:00:00Z'),
    topic: {
      id: 'top_motion_1',
      titleBangla: 'গতির সমীকরণ',
      chapter: {
        id: 'chap_motion',
        titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
        subject: { id: 'sub_phy', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
      },
    },
  };

  beforeEach(() => {
    mockPrisma = {
      topic: { findUnique: vi.fn() },
      lesson: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
        groupBy: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
    };
    service = new ContentAdminLessonsService(mockPrisma as unknown as PrismaService);
  });

  describe('createLesson', () => {
    it('creates DRAFT lesson with trimmed strings and normalized optional fields', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue({ id: 'top_motion_1' });
      mockPrisma.lesson.create.mockImplementation(async ({ data }: any) => ({
        id: 'les_created_1',
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      const res = await service.createLesson({
        topicId: ' top_motion_1 ',
        titleBangla: '  গতির সূত্র  ',
        learningGoal: '  লক্ষ্য  ',
        explanation: '  ব্যাখ্যা  ',
        importantTerms: [{ termBangla: '  বেগ  ', termEnglish: '  Velocity ' }],
        workedExample: { problem: '  ', stepByStepSolution: '' },
        memoryAid: '   ',
      });

      expect(mockPrisma.lesson.create).toHaveBeenCalledWith({
        data: {
          topicId: 'top_motion_1',
          titleBangla: 'গতির সূত্র',
          learningGoal: 'লক্ষ্য',
          explanation: 'ব্যাখ্যা',
          importantTerms: [{ termBangla: 'বেগ', termEnglish: 'Velocity', definition: '' }],
          workedExample: undefined,
          memoryAid: null,
          status: ContentStatus.DRAFT,
          version: 1,
        },
      });
      expect(res.status).toBe(ContentStatus.DRAFT);
      expect(res.version).toBe(1);
    });

    it('rejects missing topic or invalid importantTerms', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue(null);
      await expect(
        service.createLesson({
          topicId: 'missing',
          titleBangla: 'শিরোনাম',
          learningGoal: 'লক্ষ্য',
          explanation: 'ব্যাখ্যা',
          importantTerms: [{ termBangla: 'জড়তা' }],
        }),
      ).rejects.toThrow(NotFoundException);

      await expect(
        service.createLesson({
          topicId: 'top_motion_1',
          titleBangla: 'শিরোনাম',
          learningGoal: 'লক্ষ্য',
          explanation: 'ব্যাখ্যা',
          importantTerms: [{ termBangla: '   ' }],
        }),
      ).rejects.toThrow(BadRequestException);

      await expect(
        service.createLesson({
          topicId: 'top_motion_1',
          titleBangla: 'শিরোনাম',
          learningGoal: 'লক্ষ্য',
          explanation: 'ব্যাখ্যা',
          importantTerms: [],
        }),
      ).rejects.toThrow(BadRequestException);

      const pipe = new ValidationPipe({ whitelist: true, transform: true });
      await expect(
        pipe.transform(
          {
            topicId: 'top_motion_1',
            titleBangla: 'শিরোনাম',
            learningGoal: 'লক্ষ্য',
            explanation: 'ব্যাখ্যা',
            importantTerms: [],
          },
          { type: 'body', metatype: CreateLessonAdminDto },
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('listLessons', () => {
    it('excludes ARCHIVED by default, applies hierarchy/search filters, clamps page offset, and aggregates statusCounts', async () => {
      mockPrisma.lesson.findMany.mockResolvedValue([sampleLesson]);
      mockPrisma.lesson.count.mockResolvedValue(1);
      mockPrisma.lesson.groupBy.mockResolvedValue([
        { status: ContentStatus.DRAFT, _count: { _all: 2 } },
        { status: ContentStatus.PUBLISHED, _count: { _all: 3 } },
        { status: ContentStatus.ARCHIVED, _count: { _all: 4 } },
      ]);

      const res = await service.listLessons({
        subjectId: 'sub_phy',
        chapterId: 'chap_motion',
        search: 'গতির',
        page: '999999999999',
        limit: '150',
      });

      expect(mockPrisma.lesson.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            topic: {
              chapterId: 'chap_motion',
              chapter: { subjectId: 'sub_phy' },
            },
            OR: [
              { titleBangla: { contains: 'গতির', mode: 'insensitive' } },
              { learningGoal: { contains: 'গতির', mode: 'insensitive' } },
            ],
            status: { not: ContentStatus.ARCHIVED },
          },
          take: 100,
          orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        }),
      );
      expect(res.limit).toBe(100);
      expect(res.page).toBeLessThanOrEqual(Math.floor(2_147_483_647 / 100) + 1);
      expect(res.statusCounts).toEqual({
        ALL: 5,
        DRAFT: 2,
        REVIEW: 0,
        CORRECTION: 0,
        PUBLISHED: 3,
        ARCHIVED: 4,
      });
    });

    it('supports explicit status=ARCHIVED combined with topicId filter', async () => {
      mockPrisma.lesson.findMany.mockResolvedValue([]);
      mockPrisma.lesson.count.mockResolvedValue(0);
      mockPrisma.lesson.groupBy.mockResolvedValue([
        { status: ContentStatus.ARCHIVED, _count: { _all: 2 } },
      ]);

      const res = await service.listLessons({
        topicId: 'top_motion_1',
        status: ContentStatus.ARCHIVED,
      });

      expect(mockPrisma.lesson.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            topicId: 'top_motion_1',
            status: ContentStatus.ARCHIVED,
          },
        }),
      );
      expect(mockPrisma.lesson.groupBy).toHaveBeenCalledWith({
        by: ['status'],
        where: { topicId: 'top_motion_1' },
        _count: { _all: true },
      });
      expect(res.statusCounts.ARCHIVED).toBe(2);
      expect(res.statusCounts.ALL).toBe(0);
    });

    it('throws BadRequestException for invalid query inputs', async () => {
      await expect(service.listLessons({ status: 'UNKNOWN' as any })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listLessons({ includeArchived: 'yes' })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listLessons({ page: '-1' })).rejects.toThrow(BadRequestException);
    });
  });

  describe('getLessonById', () => {
    it('returns lesson with hierarchy or throws NotFoundException', async () => {
      mockPrisma.lesson.findUnique.mockResolvedValue(sampleLesson);
      const found = await service.getLessonById('les_motion_1');
      expect(found.id).toBe('les_motion_1');

      mockPrisma.lesson.findUnique.mockResolvedValue(null);
      await expect(service.getLessonById('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateLesson', () => {
    it('throws NotFoundException when lesson id does not exist', async () => {
      mockPrisma.lesson.findUnique.mockResolvedValueOnce(null);
      await expect(
        service.updateLesson('missing_lesson_id', { titleBangla: 'নতুন' }, Role.ADMIN),
      ).rejects.toThrow(NotFoundException);
    });

    it('blocks editing ARCHIVED lessons (400) and blocks EDITOR preservePublished (403)', async () => {
      mockPrisma.lesson.findUnique.mockResolvedValueOnce({
        ...sampleLesson,
        status: ContentStatus.ARCHIVED,
      });
      await expect(
        service.updateLesson('les_motion_1', { titleBangla: 'নতুন' }, Role.ADMIN),
      ).rejects.toThrow(BadRequestException);

      mockPrisma.lesson.findUnique.mockResolvedValueOnce({
        ...sampleLesson,
        status: ContentStatus.PUBLISHED,
      });
      await expect(
        service.updateLesson('les_motion_1', { preservePublished: true }, Role.EDITOR),
      ).rejects.toThrow(ForbiddenException);
    });

    it('demotes PUBLISHED -> REVIEW unless ADMIN sets preservePublished, normalizes empty workedExample/memoryAid to DbNull/null, and increments version', async () => {
      mockPrisma.lesson.findUnique.mockResolvedValue({
        ...sampleLesson,
        status: ContentStatus.PUBLISHED,
      });
      mockPrisma.topic.findUnique.mockResolvedValue({ id: 'top_motion_1' });
      mockPrisma.lesson.update.mockImplementation(async ({ data }: any) => ({
        ...sampleLesson,
        ...data,
        version: 2,
      }));

      await service.updateLesson(
        'les_motion_1',
        {
          titleBangla: '  আপডেটেড শিরোনাম  ',
          workedExample: { problem: '   ', stepByStepSolution: '' },
          memoryAid: '   ',
        },
        Role.ADMIN,
      );

      expect(mockPrisma.lesson.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'les_motion_1' },
          data: expect.objectContaining({
            titleBangla: 'আপডেটেড শিরোনাম',
            workedExample: Prisma.DbNull,
            memoryAid: null,
            status: ContentStatus.REVIEW,
            version: { increment: 1 },
          }),
        }),
      );

      mockPrisma.lesson.update.mockClear();
      await service.updateLesson(
        'les_motion_1',
        { preservePublished: true, titleBangla: 'প্রকাশিতই থাকবে' },
        Role.ADMIN,
      );
      expect(mockPrisma.lesson.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: ContentStatus.PUBLISHED,
            version: { increment: 1 },
          }),
        }),
      );
    });

    it('handles DRAFT/CORRECTION/REVIEW submitForReview transitions and rejects malformed update payloads', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue({ id: 'top_motion_1' });
      mockPrisma.lesson.update.mockImplementation(async ({ data }: any) => ({
        ...sampleLesson,
        ...data,
        version: 2,
      }));

      mockPrisma.lesson.findUnique.mockResolvedValueOnce({
        ...sampleLesson,
        status: ContentStatus.CORRECTION,
      });
      await service.updateLesson(
        'les_motion_1',
        { titleBangla: 'সংশোধিত', submitForReview: true },
        Role.EDITOR,
      );
      expect(mockPrisma.lesson.update).toHaveBeenLastCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: ContentStatus.REVIEW,
            version: { increment: 1 },
          }),
        }),
      );

      mockPrisma.lesson.findUnique.mockResolvedValueOnce({
        ...sampleLesson,
        status: ContentStatus.CORRECTION,
      });
      await service.updateLesson('les_motion_1', { titleBangla: 'আংশিক' }, Role.EDITOR);
      expect(mockPrisma.lesson.update).toHaveBeenLastCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: ContentStatus.CORRECTION,
            version: { increment: 1 },
          }),
        }),
      );

      await expect(
        service.updateLesson('les_motion_1', null as any, Role.ADMIN),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.updateLesson('les_motion_1', { preservePublished: 'true' as any }, Role.ADMIN),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.updateLesson('les_motion_1', { titleBangla: null as any }, Role.ADMIN),
      ).rejects.toThrow(BadRequestException);

      mockPrisma.lesson.findUnique.mockResolvedValue(sampleLesson);
      await expect(
        service.updateLesson('les_motion_1', { workedExample: [] as any }, Role.ADMIN),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.updateLesson(
          'les_motion_1',
          { workedExample: { problem: 123 as any } },
          Role.ADMIN,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('rejects empty importantTerms on updateLesson and missing topicId (404)', async () => {
      mockPrisma.lesson.findUnique.mockResolvedValue(sampleLesson);
      await expect(
        service.updateLesson('les_motion_1', { importantTerms: [] }, Role.EDITOR),
      ).rejects.toThrow(BadRequestException);

      mockPrisma.topic.findUnique.mockResolvedValue(null);
      await expect(
        service.updateLesson('les_motion_1', { topicId: 'missing_top' }, Role.EDITOR),
      ).rejects.toThrow(NotFoundException);
    });

    it('allows nullable workedExample and memoryAid through ValidationPipe whitelist', async () => {
      const pipe = new ValidationPipe({ whitelist: true, transform: true });
      const parsedUpdate = await pipe.transform(
        { workedExample: null, memoryAid: null, preservePublished: true },
        { type: 'body', metatype: UpdateLessonAdminDto },
      );
      expect(parsedUpdate).toEqual({
        workedExample: null,
        memoryAid: null,
        preservePublished: true,
      });

      const parsedQuery = await pipe.transform(
        { subjectId: 'sub_phy', includeArchived: 'true', page: '2', limit: '20' },
        { type: 'query', metatype: ListLessonsQueryDto },
      );
      expect(parsedQuery.includeArchived).toBe('true');
    });
  });

  describe('archiveLesson', () => {
    it('prevents EDITOR from archiving PUBLISHED lesson, allows ADMIN on PUBLISHED, and sets ARCHIVED status for valid actors', async () => {
      mockPrisma.lesson.findUnique.mockResolvedValueOnce({
        ...sampleLesson,
        status: ContentStatus.PUBLISHED,
      });
      await expect(service.archiveLesson('les_motion_1', Role.EDITOR)).rejects.toThrow(
        ForbiddenException,
      );

      mockPrisma.lesson.findUnique.mockResolvedValueOnce({
        ...sampleLesson,
        status: ContentStatus.PUBLISHED,
      });
      mockPrisma.lesson.update.mockResolvedValueOnce({
        ...sampleLesson,
        status: ContentStatus.ARCHIVED,
      });
      const adminArchived = await service.archiveLesson('les_motion_1', Role.ADMIN);
      expect(adminArchived.status).toBe(ContentStatus.ARCHIVED);

      mockPrisma.lesson.findUnique.mockResolvedValueOnce(sampleLesson);
      mockPrisma.lesson.update.mockResolvedValueOnce({
        ...sampleLesson,
        status: ContentStatus.ARCHIVED,
      });
      const res = await service.archiveLesson('les_motion_1', Role.EDITOR);
      expect(res.status).toBe(ContentStatus.ARCHIVED);

      mockPrisma.lesson.findUnique.mockResolvedValueOnce(null);
      await expect(service.archiveLesson('missing', Role.ADMIN)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
