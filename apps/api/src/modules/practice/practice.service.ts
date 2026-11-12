import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SubmitPracticeDto } from './dto/submit-practice.dto';
import { CqSelfAssessDto } from './dto/cq-self-assess.dto';
import { ContentStatus } from '@prisma/client';

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

@Injectable()
export class PracticeService {
  private readonly logger = new Logger(PracticeService.name);

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getChapterQuestions(
    chapterId: string,
    topicId?: string,
    difficulty?: string,
    mode?: string,
    userId?: string,
    type?: string,
  ) {
    let resolvedChapterId = chapterId;
    if (chapterId === 'ch-motion') {
      const motionChapter = await this.prisma.chapter.findFirst?.({
        where: {
          OR: [
            { id: 'chap_ssc_physics_ch2' },
            { titleBangla: { contains: 'গতি' } },
          ],
        },
      });
      if (motionChapter) {
        resolvedChapterId = motionChapter.id;
      } else {
        resolvedChapterId = 'chap_ssc_physics_ch2';
      }
    }

    let chapter = await this.prisma.chapter.findUnique({
      where: { id: resolvedChapterId },
    });

    if (!chapter && this.prisma.topic?.findUnique) {
      const topic = await this.prisma.topic.findUnique({
        where: { id: resolvedChapterId },
      });
      if (topic) {
        resolvedChapterId = topic.chapterId;
        chapter = await this.prisma.chapter.findUnique({
          where: { id: resolvedChapterId },
        });
      }
    }

    if (!chapter) {
      throw new NotFoundException(`Chapter not found with id: ${chapterId}`);
    }

    const normalizedType = type?.trim().toUpperCase();
    const typeFilter =
      normalizedType === 'CQ_CREATIVE'
        ? 'CQ_CREATIVE'
        : normalizedType === 'ALL'
          ? { in: ['MCQ', 'CQ_CREATIVE'] }
          : 'MCQ';

    const where: any = {
      type: typeFilter,
      status: ContentStatus.PUBLISHED,
    };

    if (topicId && typeof topicId === 'string' && topicId.trim()) {
      where.topicId = topicId.trim();
    } else {
      where.topic = { chapterId: resolvedChapterId };
    }

    if (difficulty && typeof difficulty === 'string') {
      const normalizedDiff = difficulty.trim().toUpperCase();
      if (['EASY', 'MEDIUM', 'HARD'].includes(normalizedDiff)) {
        where.difficulty = normalizedDiff;
      }
    }

    if (mode === 'mistakes' && userId) {
      where.mistakes = {
        some: {
          userId,
          resolved: false,
        },
      };
    }

    const questions = await this.prisma.question.findMany({
      where,
    });

    const shuffledQuestions = shuffle(questions);

    return shuffledQuestions.map((q) => {
      if (q.type === 'CQ_CREATIVE') {
        return {
          id: q.id,
          topicId: q.topicId,
          type: q.type,
          stem: q.stem,
          options: [],
          cqRubric: q.cqRubric ?? null,
          explanation: q.explanation ?? null,
          difficulty: q.difficulty,
          boardSource: q.boardSource,
          isVerified: q.isVerified,
          version: q.version,
        };
      }

      const options = Array.isArray(q.options) ? q.options : [];
      const shuffledOptions = shuffle(options);
      const sanitizedOptions = shuffledOptions.map((opt: any) => {
        const { isCorrect, ...rest } = opt;
        return rest;
      });

      return {
        id: q.id,
        topicId: q.topicId,
        type: q.type,
        stem: q.stem,
        options: sanitizedOptions,
        difficulty: q.difficulty,
        boardSource: q.boardSource,
        isVerified: q.isVerified,
        version: q.version,
      };
    });
  }

  async submitPractice(dto: SubmitPracticeDto, userId?: string) {
    if (!dto?.questionId || typeof dto.questionId !== 'string' || !dto.questionId.trim()) {
      throw new BadRequestException('questionId is required and must be a non-empty string');
    }

    if (!dto?.selectedOptionId || typeof dto.selectedOptionId !== 'string' || !dto.selectedOptionId.trim()) {
      throw new BadRequestException('selectedOptionId is required and must be a non-empty string');
    }

    const question = await this.prisma.question.findUnique({
      where: { id: dto.questionId },
    });

    if (!question) {
      throw new NotFoundException(`Question not found with id: ${dto.questionId}`);
    }

    const options = Array.isArray(question.options) ? (question.options as any[]) : [];
    const selectedOption = options.find((opt: any) => opt.id === dto.selectedOptionId);

    if (!selectedOption) {
      throw new BadRequestException(
        `Option '${dto.selectedOptionId}' does not belong to question '${dto.questionId}'`,
      );
    }

    const correctOption = options.find((opt: any) => opt.isCorrect === true);
    const correctOptionId = correctOption?.id;
    const isCorrect = Boolean(correctOptionId && dto.selectedOptionId === correctOptionId);

    if (userId) {
      if (!isCorrect) {
        await this.prisma.revisionMistake.upsert({
          where: {
            userId_questionId: {
              userId,
              questionId: dto.questionId,
            },
          },
          create: {
            userId,
            questionId: dto.questionId,
            resolved: false,
            attemptCount: 1,
          },
          update: {
            resolved: false,
            attemptCount: { increment: 1 },
          },
        });
      } else if (typeof (this.prisma.revisionMistake as any)?.updateMany === 'function') {
        await (this.prisma.revisionMistake as any)
          .updateMany({
            where: {
              userId,
              questionId: dto.questionId,
              resolved: false,
            },
            data: {
              resolved: true,
              attemptCount: { increment: 1 },
            },
          })
          .catch(() => {});
      }

      await this.prisma.eventLog
        .create({
          data: {
            userId,
            eventType: 'PRACTICE_ATTEMPT',
            payload: {
              questionId: dto.questionId,
              selectedOptionId: dto.selectedOptionId,
              isCorrect,
            },
          },
        })
        .catch((err) => {
          this.logger.warn(`Failed to log PRACTICE_ATTEMPT event: ${err?.message ?? err}`);
        });
    }

    return {
      isCorrect,
      correctOptionId,
      explanation: question.explanation,
    };
  }

  async submitCqSelfAssess(dto: CqSelfAssessDto, userId?: string) {
    if (!dto?.questionId || typeof dto.questionId !== 'string' || !dto.questionId.trim()) {
      throw new BadRequestException('questionId is required');
    }

    const scores = dto?.selfScores;
    if (!scores || typeof scores !== 'object') {
      throw new BadRequestException('selfScores object is required');
    }

    const { ka, kha, ga, gha } = scores;
    const isValidScore = (v: unknown, max: number) =>
      typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= max;

    if (
      !isValidScore(ka, 1) ||
      !isValidScore(kha, 2) ||
      !isValidScore(ga, 3) ||
      !isValidScore(gha, 4)
    ) {
      throw new BadRequestException(
        'Invalid CQ rubric scores: expected integer ka (0-1), kha (0-2), ga (0-3), gha (0-4)',
      );
    }

    const question = await this.prisma.question.findUnique({
      where: { id: dto.questionId },
    });

    if (!question) {
      throw new NotFoundException(`Question not found with id: ${dto.questionId}`);
    }

    if (question.type !== 'CQ_CREATIVE') {
      throw new BadRequestException('CQ self-assessment is only valid for CQ_CREATIVE questions');
    }

    const totalScore = ka + kha + ga + gha;
    const maxScore = 10;

    if (userId && typeof this.prisma.eventLog?.create === 'function') {
      await this.prisma.eventLog
        .create({
          data: {
            userId,
            eventType: 'PRACTICE_ATTEMPT',
            payload: {
              questionId: question.id,
              topicId: question.topicId,
              type: 'CQ_CREATIVE',
              selfScores: { ka, kha, ga, gha },
              totalScore,
              maxScore,
              isCorrect: totalScore >= 6,
            },
          },
        })
        .catch((err) => {
          this.logger.warn(`Failed to log CQ self-assessment: ${err?.message ?? err}`);
        });
    }

    return {
      success: true,
      questionId: question.id,
      selfScores: { ka, kha, ga, gha },
      totalScore,
      maxScore,
    };
  }
}
