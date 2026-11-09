import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContentStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateLessonAdminDto } from './dto/create-lesson-admin.dto';
import { CreateQuestionAdminDto } from './dto/create-question-admin.dto';
import { ReviewContentDto } from './dto/review-content.dto';
import { CreateChapterAdminDto } from './dto/create-chapter-admin.dto';
import { CreateTopicAdminDto } from './dto/create-topic-admin.dto';
import { CreateSubjectAdminDto } from './dto/create-subject-admin.dto';
import { ListQuestionsQueryDto } from './dto/list-questions-query.dto';

export const QUESTION_HIERARCHY_INCLUDE = {
  topic: {
    select: {
      id: true,
      titleBangla: true,
      chapter: {
        select: {
          id: true,
          titleBangla: true,
          subject: {
            select: {
              id: true,
              code: true,
              nameBangla: true,
            },
          },
        },
      },
    },
  },
} as const;

@Injectable()
export class ContentAdminService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async createLesson(dto: CreateLessonAdminDto) {
    if (!dto?.topicId || typeof dto.topicId !== 'string' || !dto.topicId.trim()) {
      throw new BadRequestException('topicId is required');
    }
    if (!dto?.titleBangla || typeof dto.titleBangla !== 'string' || !dto.titleBangla.trim()) {
      throw new BadRequestException('titleBangla is required');
    }
    if (!dto?.learningGoal || typeof dto.learningGoal !== 'string' || !dto.learningGoal.trim()) {
      throw new BadRequestException('learningGoal is required');
    }
    if (!dto?.explanation || typeof dto.explanation !== 'string' || !dto.explanation.trim()) {
      throw new BadRequestException('explanation is required');
    }
    if (!Array.isArray(dto?.importantTerms)) {
      throw new BadRequestException('importantTerms must be an array of objects');
    }
    for (const term of dto.importantTerms) {
      if (!term || typeof term !== 'object' || typeof term.termBangla !== 'string' || !term.termBangla.trim()) {
        throw new BadRequestException('Each importantTerm must be an object containing at least termBangla');
      }
    }

    const topic = await this.prisma.topic.findUnique({
      where: { id: dto.topicId },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with id ${dto.topicId} not found`);
    }

    return this.prisma.lesson.create({
      data: {
        topicId: dto.topicId,
        titleBangla: dto.titleBangla,
        learningGoal: dto.learningGoal,
        explanation: dto.explanation,
        importantTerms: dto.importantTerms,
        workedExample: dto.workedExample !== undefined ? dto.workedExample : undefined,
        memoryAid: dto.memoryAid ?? null,
        status: ContentStatus.DRAFT,
        version: 1,
      },
    });
  }

  async createQuestion(dto: CreateQuestionAdminDto) {
    if (!dto?.topicId || typeof dto.topicId !== 'string' || !dto.topicId.trim()) {
      throw new BadRequestException('topicId is required');
    }
    if (!dto?.type || !['MCQ', 'CQ_CREATIVE'].includes(dto.type)) {
      throw new BadRequestException('type must be MCQ or CQ_CREATIVE');
    }
    if (!dto?.stem || typeof dto.stem !== 'string' || !dto.stem.trim()) {
      throw new BadRequestException('stem is required');
    }
    if (!dto?.explanation || typeof dto.explanation !== 'object') {
      throw new BadRequestException('explanation must be a valid object');
    }
    if (
      typeof dto.explanation.directAnswer !== 'string' ||
      !dto.explanation.directAnswer.trim() ||
      typeof dto.explanation.coreConcept !== 'string' ||
      !dto.explanation.coreConcept.trim()
    ) {
      throw new BadRequestException(
        'explanation must include non-empty directAnswer and coreConcept',
      );
    }
    if (!dto?.difficulty || !['EASY', 'MEDIUM', 'HARD'].includes(dto.difficulty)) {
      throw new BadRequestException('difficulty must be EASY, MEDIUM, or HARD');
    }

    if (dto.type === 'MCQ') {
      if (!Array.isArray(dto.options) || dto.options.length < 2) {
        throw new BadRequestException('MCQ questions must include at least 2 options');
      }
      let correctCount = 0;
      for (const opt of dto.options) {
        if (
          !opt ||
          typeof opt !== 'object' ||
          !opt.id ||
          typeof opt.id !== 'string' ||
          !opt.text ||
          typeof opt.text !== 'string' ||
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
        options: dto.options !== undefined ? dto.options : undefined,
        explanation: dto.explanation,
        cqRubric: dto.cqRubric !== undefined ? dto.cqRubric : undefined,
        difficulty: dto.difficulty,
        boardSource: dto.boardSource ?? null,
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
        where: { topicId },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.question.findMany({
        where: { topicId },
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
    if (query.type && !['MCQ', 'CQ_CREATIVE'].includes(query.type)) {
      throw new BadRequestException('type must be MCQ or CQ_CREATIVE');
    }
    if (
      query.status &&
      !['DRAFT', 'REVIEW', 'CORRECTION', 'PUBLISHED', 'ARCHIVED'].includes(query.status)
    ) {
      throw new BadRequestException('Invalid question status filter');
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

    const parsedPage = Number.parseInt(query.page ?? '1', 10);
    const parsedLimit = Number.parseInt(query.limit ?? '20', 10);
    const page = Number.isFinite(parsedPage) && parsedPage >= 1 ? parsedPage : 1;
    const limit =
      Number.isFinite(parsedLimit) && parsedLimit >= 1
        ? Math.min(100, parsedLimit)
        : 20;
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
}
