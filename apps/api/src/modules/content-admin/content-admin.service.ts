import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContentStatus, Prisma, Role } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateLessonAdminDto } from './dto/create-lesson-admin.dto';
import { CreateQuestionAdminDto } from './dto/create-question-admin.dto';
import { ReviewContentDto } from './dto/review-content.dto';
import { CreateChapterAdminDto } from './dto/create-chapter-admin.dto';
import { CreateTopicAdminDto } from './dto/create-topic-admin.dto';
import { CreateSubjectAdminDto } from './dto/create-subject-admin.dto';
import { ListQuestionsQueryDto } from './dto/list-questions-query.dto';
import { UpdateQuestionAdminDto } from './dto/update-question-admin.dto';
import { CONTENT_HIERARCHY_INCLUDE } from './admin-content-query.util';
import { createLessonRecord } from './content-admin-lessons.helpers';

export const QUESTION_HIERARCHY_INCLUDE = CONTENT_HIERARCHY_INCLUDE;

@Injectable()
export class ContentAdminService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async createLesson(dto: CreateLessonAdminDto) {
    return createLessonRecord(this.prisma, dto);
  }

  private validateQuestionPayload(payload: {
    topicId?: string;
    type?: string;
    stem?: string;
    options?: any;
    explanation?: any;
    cqRubric?: any;
    difficulty?: string;
  }) {
    if (!payload.topicId || typeof payload.topicId !== 'string' || !payload.topicId.trim()) {
      throw new BadRequestException('topicId is required');
    }
    if (!payload.type || !['MCQ', 'CQ_CREATIVE'].includes(payload.type)) {
      throw new BadRequestException('type must be MCQ or CQ_CREATIVE');
    }
    if (!payload.stem || typeof payload.stem !== 'string' || !payload.stem.trim()) {
      throw new BadRequestException('stem is required');
    }
    if (
      !payload.explanation ||
      typeof payload.explanation !== 'object' ||
      Array.isArray(payload.explanation)
    ) {
      throw new BadRequestException('explanation must be a valid object');
    }
    if (
      typeof payload.explanation.directAnswer !== 'string' ||
      !payload.explanation.directAnswer.trim() ||
      typeof payload.explanation.coreConcept !== 'string' ||
      !payload.explanation.coreConcept.trim()
    ) {
      throw new BadRequestException(
        'explanation must include non-empty directAnswer and coreConcept',
      );
    }
    if (!payload.difficulty || !['EASY', 'MEDIUM', 'HARD'].includes(payload.difficulty)) {
      throw new BadRequestException('difficulty must be EASY, MEDIUM, or HARD');
    }

    if (payload.type === 'MCQ') {
      if (!Array.isArray(payload.options) || payload.options.length < 2) {
        throw new BadRequestException('MCQ questions must include at least 2 options');
      }
      let correctCount = 0;
      for (const opt of payload.options) {
        if (
          !opt ||
          typeof opt !== 'object' ||
          !opt.id ||
          typeof opt.id !== 'string' ||
          !opt.id.trim() ||
          !opt.text ||
          typeof opt.text !== 'string' ||
          !opt.text.trim() ||
          typeof opt.isCorrect !== 'boolean'
        ) {
          throw new BadRequestException('Each option must contain id, text, and isCorrect boolean');
        }
        if (opt.isCorrect) {
          correctCount++;
        }
      }
      if (correctCount !== 1) {
        throw new BadRequestException('MCQ questions must have exactly one correct option');
      }
    }

    if (
      payload.type === 'CQ_CREATIVE' &&
      payload.cqRubric !== undefined &&
      payload.cqRubric !== null
    ) {
      if (typeof payload.cqRubric !== 'object' || Array.isArray(payload.cqRubric)) {
        throw new BadRequestException('cqRubric must be an object keyed by ka, kha, ga, gha');
      }
      const partKeys = ['ka', 'kha', 'ga', 'gha'] as const;
      let validParts = 0;
      for (const key of partKeys) {
        const part = payload.cqRubric[key];
        if (part === undefined) continue;
        if (!part || typeof part !== 'object' || Array.isArray(part)) {
          throw new BadRequestException(`cqRubric.${key} must be an object`);
        }
        const criteriaValid = typeof part.criteria === 'string' && part.criteria.trim().length > 0;
        const markValid =
          typeof part.mark === 'number' && Number.isFinite(part.mark) && part.mark >= 0;
        if (part.mark !== undefined && !markValid) {
          throw new BadRequestException(`cqRubric.${key}.mark must be a non-negative number`);
        }
        if (criteriaValid && markValid) {
          validParts++;
        }
      }
      if (validParts === 0) {
        throw new BadRequestException(
          'CQ_CREATIVE cqRubric must include at least one part (ka, kha, ga, gha) with non-empty criteria and non-negative numeric mark',
        );
      }
    }
  }

  async createQuestion(dto: CreateQuestionAdminDto) {
    this.validateQuestionPayload({
      topicId: dto?.topicId,
      type: dto?.type,
      stem: dto?.stem,
      options: dto?.options,
      explanation: dto?.explanation,
      cqRubric: dto?.cqRubric,
      difficulty: dto?.difficulty,
    });

    const topic = await this.prisma.topic.findUnique({
      where: { id: dto.topicId },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with id ${dto.topicId} not found`);
    }

    return this.prisma.question.create({
      data: {
        topicId: dto.topicId,
        type: dto.type,
        stem: dto.stem,
        options:
          dto.type === 'CQ_CREATIVE'
            ? Prisma.DbNull
            : dto.options !== undefined && dto.options !== null
              ? dto.options
              : Prisma.DbNull,
        explanation: dto.explanation,
        cqRubric:
          dto.type === 'MCQ'
            ? Prisma.DbNull
            : dto.cqRubric !== undefined && dto.cqRubric !== null
              ? dto.cqRubric
              : Prisma.DbNull,
        difficulty: dto.difficulty,
        boardSource: dto.boardSource?.trim() || null,
        status: ContentStatus.DRAFT,
        version: 1,
        isVerified: false,
      },
    });
  }

  async reviewContent(
    reviewerId: string,
    dtoOrContentType: ReviewContentDto | 'LESSON' | 'QUESTION',
    contentIdParam?: string,
    actionParam?: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES',
    commentParam?: string,
  ) {
    let contentType: 'LESSON' | 'QUESTION';
    let contentId: string;
    let action: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES';
    let comment: string | undefined;

    if (typeof dtoOrContentType === 'object') {
      contentType = dtoOrContentType.contentType;
      contentId = dtoOrContentType.contentId;
      action = dtoOrContentType.action;
      comment = dtoOrContentType.comment;
    } else {
      contentType = dtoOrContentType;
      contentId = contentIdParam!;
      action = actionParam!;
      comment = commentParam;
    }

    if (!contentType || !['LESSON', 'QUESTION'].includes(contentType)) {
      throw new BadRequestException('contentType must be LESSON or QUESTION');
    }
    if (!contentId || typeof contentId !== 'string' || !contentId.trim()) {
      throw new BadRequestException('contentId is required');
    }
    if (!action || !['APPROVE', 'REJECT', 'REQUEST_CHANGES'].includes(action)) {
      throw new BadRequestException('action must be APPROVE, REJECT, or REQUEST_CHANGES');
    }
    if (action !== 'APPROVE' && (!comment || !comment.trim())) {
      throw new BadRequestException(
        'A comment explaining required corrections is mandatory when rejecting or requesting changes',
      );
    }

    const runTransaction = async (tx: any) => {
      let existing: any = null;

      if (contentType === 'LESSON') {
        existing = await tx.lesson.findUnique({
          where: { id: contentId },
        });
      } else {
        existing = await tx.question.findUnique({
          where: { id: contentId },
        });
      }

      if (!existing) {
        throw new NotFoundException(`${contentType} with id ${contentId} not found`);
      }

      if (existing.status === ContentStatus.ARCHIVED) {
        throw new BadRequestException('Archived content cannot be reviewed directly');
      }

      const isApprove = action === 'APPROVE';
      const nextStatus = isApprove ? ContentStatus.PUBLISHED : ContentStatus.CORRECTION;

      let updatedContent: any;

      if (contentType === 'LESSON') {
        updatedContent = await tx.lesson.update({
          where: { id: contentId },
          data: {
            status: nextStatus,
            ...(isApprove ? { version: { increment: 1 } } : {}),
          },
        });
      } else {
        updatedContent = await tx.question.update({
          where: { id: contentId },
          data: {
            status: nextStatus,
            ...(isApprove ? { version: { increment: 1 }, isVerified: true } : { isVerified: false }),
          },
        });
      }

      const reviewRecord = await tx.contentReview.create({
        data: {
          reviewerId,
          contentType,
          contentId,
          action,
          comment: comment ?? null,
          version: updatedContent.version,
        },
      });

      return {
        ...updatedContent,
        review: reviewRecord,
      };
    };

    if (typeof this.prisma.$transaction === 'function') {
      return this.prisma.$transaction(runTransaction);
    }
    return runTransaction(this.prisma);
  }

  async getPendingContent() {
    const [lessons, questions] = await Promise.all([
      this.prisma.lesson.findMany({
        where: {
          status: {
            in: [ContentStatus.DRAFT, ContentStatus.REVIEW, ContentStatus.CORRECTION],
          },
        },
        orderBy: { updatedAt: 'desc' },
      }),
      this.prisma.question.findMany({
        where: {
          status: {
            in: [ContentStatus.DRAFT, ContentStatus.REVIEW, ContentStatus.CORRECTION],
          },
        },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return {
      lessons,
      questions,
    };
  }

  async getContentReviews(contentId: string) {
    return this.prisma.contentReview.findMany({
      where: { contentId },
      include: {
        reviewer: {
          select: {
            id: true,
            fullName: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async createChapter(dto: CreateChapterAdminDto) {
    if (!dto.subjectId || !dto.titleBangla) {
      throw new BadRequestException('subjectId and titleBangla are required');
    }
    const subject = await this.prisma.subject.findUnique({
      where: { id: dto.subjectId },
    });
    if (!subject) {
      throw new NotFoundException(`Subject not found with id: ${dto.subjectId}`);
    }

    const maxOrder = await this.prisma.chapter.aggregate({
      where: { subjectId: dto.subjectId },
      _max: { orderIndex: true },
    });
    const orderIndex = dto.orderIndex ?? ((maxOrder._max.orderIndex ?? 0) + 1);

    return this.prisma.chapter.create({
      data: {
        subjectId: dto.subjectId,
        orderIndex,
        titleBangla: dto.titleBangla,
      },
    });
  }

  async createTopic(dto: CreateTopicAdminDto) {
    if (!dto.chapterId || !dto.titleBangla) {
      throw new BadRequestException('chapterId and titleBangla are required');
    }
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: dto.chapterId },
    });
    if (!chapter) {
      throw new NotFoundException(`Chapter not found with id: ${dto.chapterId}`);
    }

    const maxOrder = await this.prisma.topic.aggregate({
      where: { chapterId: dto.chapterId },
      _max: { orderIndex: true },
    });
    const orderIndex = dto.orderIndex ?? ((maxOrder._max.orderIndex ?? 0) + 1);

    return this.prisma.topic.create({
      data: {
        chapterId: dto.chapterId,
        orderIndex,
        titleBangla: dto.titleBangla,
      },
    });
  }

  async toggleSubjectReady(subjectId: string, isReady?: boolean) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new NotFoundException(`Subject not found with id: ${subjectId}`);
    }
    const nextStatus = isReady !== undefined ? isReady : !subject.isReady;
    return this.prisma.subject.update({
      where: { id: subjectId },
      data: { isReady: nextStatus },
    });
  }

  async createSubject(dto: CreateSubjectAdminDto) {
    if (!dto.code || !dto.nameBangla || !dto.classLevel) {
      throw new BadRequestException('code, nameBangla, and classLevel are required');
    }
    const existing = await this.prisma.subject.findUnique({
      where: { code: dto.code },
    });
    if (existing) {
      throw new BadRequestException(`Subject with code ${dto.code} already exists`);
    }

    return this.prisma.subject.create({
      data: {
        code: dto.code,
        nameBangla: dto.nameBangla,
        classLevel: dto.classLevel,
        syllabusYear: dto.syllabusYear ?? 2026,
        isReady: dto.isReady ?? false,
      },
    });
  }

  async getTopicContent(topicId: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id: topicId },
    });
    if (!topic) {
      throw new NotFoundException(`Topic not found with id: ${topicId}`);
    }

    const [lessons, questions] = await Promise.all([
      this.prisma.lesson.findMany({
        where: { topicId, status: { not: ContentStatus.ARCHIVED } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.question.findMany({
        where: { topicId, status: { not: ContentStatus.ARCHIVED } },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      topic,
      lessons,
      questions,
    };
  }

  async listQuestions(query: ListQuestionsQueryDto = {}) {
    if (!query || typeof query !== 'object' || Array.isArray(query)) {
      throw new BadRequestException('Query must be an object');
    }

    const stringFilterFields = [
      'subjectId',
      'chapterId',
      'topicId',
      'search',
      'page',
      'limit',
    ] as const;
    for (const field of stringFilterFields) {
      if (query[field] !== undefined && typeof query[field] !== 'string') {
        throw new BadRequestException(`${field} must be a string`);
      }
    }

    if (
      query.type !== undefined &&
      (typeof query.type !== 'string' || !['MCQ', 'CQ_CREATIVE'].includes(query.type))
    ) {
      throw new BadRequestException('type must be MCQ or CQ_CREATIVE');
    }

    const validStatuses = Object.values(ContentStatus) as string[];
    if (
      query.status !== undefined &&
      (typeof query.status !== 'string' || !validStatuses.includes(query.status))
    ) {
      throw new BadRequestException('Invalid question status filter');
    }

    if (
      query.includeArchived !== undefined &&
      (typeof query.includeArchived !== 'string' ||
        !['true', 'false'].includes(query.includeArchived))
    ) {
      throw new BadRequestException('includeArchived must be true or false');
    }

    if (query.page !== undefined && !/^\d+$/.test(query.page)) {
      throw new BadRequestException('page must be a non-negative integer string');
    }

    if (query.limit !== undefined && !/^\d+$/.test(query.limit)) {
      throw new BadRequestException('limit must be a non-negative integer string');
    }

    const baseWhere: Prisma.QuestionWhereInput = {};
    if (query.topicId?.trim()) {
      baseWhere.topicId = query.topicId.trim();
    }

    const topicFilter: Prisma.TopicWhereInput = {};
    if (query.chapterId?.trim()) {
      topicFilter.chapterId = query.chapterId.trim();
    }
    if (query.subjectId?.trim()) {
      topicFilter.chapter = { subjectId: query.subjectId.trim() };
    }
    if (Object.keys(topicFilter).length > 0) {
      baseWhere.topic = topicFilter;
    }

    if (query.type) {
      baseWhere.type = query.type;
    }

    const trimmedSearch = query.search?.trim();
    if (trimmedSearch) {
      baseWhere.OR = [
        { stem: { contains: trimmedSearch, mode: 'insensitive' } },
        { boardSource: { contains: trimmedSearch, mode: 'insensitive' } },
      ];
    }

    const where: Prisma.QuestionWhereInput = { ...baseWhere };
    if (query.status) {
      where.status = query.status;
    } else if (query.includeArchived !== 'true') {
      where.status = { not: ContentStatus.ARCHIVED };
    }

    const parsedLimit = Number.parseInt(query.limit ?? '20', 10);
    const limit =
      Number.isFinite(parsedLimit) && parsedLimit >= 1
        ? Math.min(100, parsedLimit)
        : 20;
    const MAX_INT32 = 2_147_483_647;
    const maxPage = Math.floor(MAX_INT32 / limit) + 1;
    const parsedPage = Number.parseInt(query.page ?? '1', 10);
    const page =
      Number.isFinite(parsedPage) && parsedPage >= 1
        ? Math.min(maxPage, parsedPage)
        : parsedPage === Infinity
          ? maxPage
          : 1;
    const skip = (page - 1) * limit;

    const [items, total, groupedCounts] = await Promise.all([
      this.prisma.question.findMany({
        where,
        include: QUESTION_HIERARCHY_INCLUDE,
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.question.count({ where }),
      this.prisma.question.groupBy({
        by: ['status'],
        where: baseWhere,
        _count: { _all: true },
      }),
    ]);

    const statusCounts = {
      ALL: 0,
      DRAFT: 0,
      REVIEW: 0,
      CORRECTION: 0,
      PUBLISHED: 0,
      ARCHIVED: 0,
    };

    for (const row of groupedCounts) {
      const count = row._count._all;
      if (row.status === ContentStatus.DRAFT) {
        statusCounts.DRAFT += count;
        statusCounts.ALL += count;
      } else if (row.status === ContentStatus.REVIEW) {
        statusCounts.REVIEW += count;
        statusCounts.ALL += count;
      } else if (row.status === ContentStatus.CORRECTION) {
        statusCounts.CORRECTION += count;
        statusCounts.ALL += count;
      } else if (row.status === ContentStatus.PUBLISHED) {
        statusCounts.PUBLISHED += count;
        statusCounts.ALL += count;
      } else if (row.status === ContentStatus.ARCHIVED) {
        statusCounts.ARCHIVED += count;
      }
    }

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      statusCounts,
    };
  }

  async getQuestionById(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: QUESTION_HIERARCHY_INCLUDE,
    });

    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    return question;
  }

  async updateQuestion(id: string, dto: UpdateQuestionAdminDto, actorRole: Role) {
    if (!dto || typeof dto !== 'object' || Array.isArray(dto)) {
      throw new BadRequestException('Update payload must be an object');
    }

    if (dto.options !== undefined && dto.options !== null && !Array.isArray(dto.options)) {
      throw new BadRequestException('options must be an array or null');
    }
    if (
      dto.cqRubric !== undefined &&
      dto.cqRubric !== null &&
      (typeof dto.cqRubric !== 'object' || Array.isArray(dto.cqRubric))
    ) {
      throw new BadRequestException('cqRubric must be an object or null');
    }
    if (
      dto.boardSource !== undefined &&
      dto.boardSource !== null &&
      typeof dto.boardSource !== 'string'
    ) {
      throw new BadRequestException('boardSource must be a string or null');
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

    const existing = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    if (existing.status === ContentStatus.ARCHIVED) {
      throw new BadRequestException('Archived questions cannot be edited directly');
    }

    if (dto.preservePublished === true && actorRole !== Role.ADMIN) {
      throw new ForbiddenException('Only Admin can keep a question published during edit');
    }

    const nextType = dto.type !== undefined ? dto.type : existing.type;
    const mergedTopicId = dto.topicId !== undefined ? dto.topicId : existing.topicId;
    const mergedStem = dto.stem !== undefined ? dto.stem : existing.stem;
    const mergedDifficulty =
      dto.difficulty !== undefined ? dto.difficulty : existing.difficulty;
    const mergedExplanation =
      dto.explanation !== undefined ? dto.explanation : existing.explanation;
    const mergedOptions =
      nextType === 'CQ_CREATIVE'
        ? null
        : dto.options !== undefined
          ? dto.options
          : existing.options;
    const mergedCqRubric =
      nextType === 'MCQ'
        ? null
        : dto.cqRubric !== undefined
          ? dto.cqRubric
          : existing.cqRubric;
    const mergedBoardSource =
      dto.boardSource !== undefined
        ? typeof dto.boardSource === 'string' && dto.boardSource.trim()
          ? dto.boardSource.trim()
          : null
        : existing.boardSource;

    this.validateQuestionPayload({
      topicId: mergedTopicId,
      type: nextType,
      stem: mergedStem,
      options: mergedOptions,
      explanation: mergedExplanation,
      cqRubric: mergedCqRubric,
      difficulty: mergedDifficulty,
    });

    const topic = await this.prisma.topic.findUnique({
      where: { id: mergedTopicId },
    });
    if (!topic) {
      throw new NotFoundException(`Topic with id ${mergedTopicId} not found`);
    }

    let nextStatus: ContentStatus = existing.status;
    let nextIsVerified = existing.isVerified;

    if (existing.status === ContentStatus.PUBLISHED) {
      if (dto.preservePublished === true && actorRole === Role.ADMIN) {
        nextStatus = ContentStatus.PUBLISHED;
        nextIsVerified = true;
      } else {
        nextStatus = ContentStatus.REVIEW;
        nextIsVerified = false;
      }
    } else if (
      existing.status === ContentStatus.DRAFT ||
      existing.status === ContentStatus.REVIEW ||
      existing.status === ContentStatus.CORRECTION
    ) {
      nextStatus = dto.submitForReview === true ? ContentStatus.REVIEW : existing.status;
      nextIsVerified = false;
    }

    return this.prisma.question.update({
      where: { id },
      data: {
        topicId: mergedTopicId,
        type: nextType,
        stem: mergedStem,
        options:
          mergedOptions === null || mergedOptions === undefined
            ? Prisma.DbNull
            : (mergedOptions as Prisma.InputJsonValue),
        explanation: mergedExplanation as Prisma.InputJsonValue,
        cqRubric:
          mergedCqRubric === null || mergedCqRubric === undefined
            ? Prisma.DbNull
            : (mergedCqRubric as Prisma.InputJsonValue),
        difficulty: mergedDifficulty,
        boardSource: mergedBoardSource,
        status: nextStatus,
        isVerified: nextIsVerified,
        version: { increment: 1 },
      },
      include: QUESTION_HIERARCHY_INCLUDE,
    });
  }

  async archiveQuestion(id: string, actorRole: Role) {
    const existing = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    if (existing.status === ContentStatus.PUBLISHED && actorRole !== Role.ADMIN) {
      throw new ForbiddenException('Only Admin can archive published questions');
    }

    return this.prisma.question.update({
      where: { id },
      data: {
        status: ContentStatus.ARCHIVED,
        isVerified: false,
      },
      include: QUESTION_HIERARCHY_INCLUDE,
    });
  }
}
