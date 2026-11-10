import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContentStatus, Prisma, Role } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import {
  CONTENT_HIERARCHY_INCLUDE,
  aggregateStatusCounts,
  buildTopicFilter,
  parseListPagination,
  validateBaseListQuery,
} from './admin-content-query.util';
import {
  createLessonRecord,
  normalizeImportantTerms,
  normalizeInteractiveWidgetUrl,
  normalizeMemoryAid,
  normalizeWorkedExample,
  resolveLessonEditStatus,
  validateRequiredLessonStrings,
} from './content-admin-lessons.helpers';
import { CreateLessonAdminDto } from './dto/create-lesson-admin.dto';
import { ListLessonsQueryDto } from './dto/list-lessons-query.dto';
import { UpdateLessonAdminDto } from './dto/update-lesson-admin.dto';

@Injectable()
export class ContentAdminLessonsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async createLesson(dto: CreateLessonAdminDto) {
    return createLessonRecord(this.prisma, dto);
  }

  async listLessons(query: ListLessonsQueryDto = {}) {
    validateBaseListQuery(query);

    const baseWhere: Prisma.LessonWhereInput = {};
    if (query.topicId?.trim()) {
      baseWhere.topicId = query.topicId.trim();
    }

    const topicFilter = buildTopicFilter(query);
    if (topicFilter) {
      baseWhere.topic = topicFilter;
    }

    const trimmedSearch = query.search?.trim();
    if (trimmedSearch) {
      baseWhere.OR = [
        { titleBangla: { contains: trimmedSearch, mode: 'insensitive' } },
        { learningGoal: { contains: trimmedSearch, mode: 'insensitive' } },
      ];
    }

    const where: Prisma.LessonWhereInput = { ...baseWhere };
    if (query.status) {
      where.status = query.status;
    } else if (query.includeArchived !== 'true') {
      where.status = { not: ContentStatus.ARCHIVED };
    }

    const { page, limit, skip } = parseListPagination(query);

    const [items, total, groupedCounts] = await Promise.all([
      this.prisma.lesson.findMany({
        where,
        include: CONTENT_HIERARCHY_INCLUDE,
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.lesson.count({ where }),
      this.prisma.lesson.groupBy({
        by: ['status'],
        where: baseWhere,
        _count: { _all: true },
      }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      statusCounts: aggregateStatusCounts(groupedCounts),
    };
  }

  async getLessonById(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: CONTENT_HIERARCHY_INCLUDE,
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }

    return lesson;
  }

  async updateLesson(id: string, dto: UpdateLessonAdminDto, actorRole: Role) {
    if (!dto || typeof dto !== 'object' || Array.isArray(dto)) {
      throw new BadRequestException('Update payload must be an object');
    }
    if (dto.topicId !== undefined && typeof dto.topicId !== 'string') {
      throw new BadRequestException('topicId must be a string');
    }
    if (dto.titleBangla !== undefined && typeof dto.titleBangla !== 'string') {
      throw new BadRequestException('titleBangla must be a string');
    }
    if (dto.learningGoal !== undefined && typeof dto.learningGoal !== 'string') {
      throw new BadRequestException('learningGoal must be a string');
    }
    if (dto.explanation !== undefined && typeof dto.explanation !== 'string') {
      throw new BadRequestException('explanation must be a string');
    }
    if (
      dto.preservePublished !== undefined &&
      dto.preservePublished !== null &&
      typeof dto.preservePublished !== 'boolean'
    ) {
      throw new BadRequestException('preservePublished must be a boolean');
    }
    if (
      dto.submitForReview !== undefined &&
      dto.submitForReview !== null &&
      typeof dto.submitForReview !== 'boolean'
    ) {
      throw new BadRequestException('submitForReview must be a boolean');
    }

    const existing = await this.prisma.lesson.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    if (existing.status === ContentStatus.ARCHIVED) {
      throw new BadRequestException('Archived lessons cannot be edited directly');
    }
    if (dto.preservePublished === true && actorRole !== Role.ADMIN) {
      throw new ForbiddenException('Only Admin can keep a lesson published during edit');
    }

    const mergedStrings = validateRequiredLessonStrings({
      topicId: dto.topicId !== undefined ? dto.topicId : existing.topicId,
      titleBangla: dto.titleBangla !== undefined ? dto.titleBangla : existing.titleBangla,
      learningGoal: dto.learningGoal !== undefined ? dto.learningGoal : existing.learningGoal,
      explanation: dto.explanation !== undefined ? dto.explanation : existing.explanation,
    });

    const mergedTerms = normalizeImportantTerms(
      dto.importantTerms !== undefined ? dto.importantTerms : existing.importantTerms,
      { requireAtLeastOne: true },
    );
    const mergedWorkedExample = normalizeWorkedExample(
      dto.workedExample !== undefined ? dto.workedExample : existing.workedExample,
    );
    const mergedMemoryAid = normalizeMemoryAid(
      dto.memoryAid !== undefined ? dto.memoryAid : existing.memoryAid,
    );
    const mergedInteractiveWidgetUrl =
      dto.interactiveWidgetUrl !== undefined
        ? normalizeInteractiveWidgetUrl(dto.interactiveWidgetUrl)
        : existing.interactiveWidgetUrl;

    const topic = await this.prisma.topic.findUnique({
      where: { id: mergedStrings.topicId },
    });
    if (!topic) {
      throw new NotFoundException(`Topic with id ${mergedStrings.topicId} not found`);
    }

    const nextStatus = resolveLessonEditStatus(
      existing.status,
      actorRole,
      dto.preservePublished,
      dto.submitForReview,
    );

    return this.prisma.lesson.update({
      where: { id },
      data: {
        topicId: mergedStrings.topicId,
        titleBangla: mergedStrings.titleBangla,
        learningGoal: mergedStrings.learningGoal,
        explanation: mergedStrings.explanation,
        importantTerms: mergedTerms as unknown as Prisma.InputJsonValue,
        workedExample:
          mergedWorkedExample === null
            ? Prisma.DbNull
            : (mergedWorkedExample as unknown as Prisma.InputJsonValue),
        memoryAid: mergedMemoryAid,
        interactiveWidgetUrl: mergedInteractiveWidgetUrl,
        status: nextStatus,
        version: { increment: 1 },
      },
      include: CONTENT_HIERARCHY_INCLUDE,
    });
  }

  async archiveLesson(id: string, actorRole: Role) {
    const existing = await this.prisma.lesson.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    if (existing.status === ContentStatus.PUBLISHED && actorRole !== Role.ADMIN) {
      throw new ForbiddenException('Only Admin can archive published lessons');
    }

    return this.prisma.lesson.update({
      where: { id },
      data: {
        status: ContentStatus.ARCHIVED,
      },
      include: CONTENT_HIERARCHY_INCLUDE,
    });
  }
}
