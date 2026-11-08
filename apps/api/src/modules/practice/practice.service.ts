import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SubmitPracticeDto } from './dto/submit-practice.dto';
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

  async getChapterQuestions(chapterId: string) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter not found with id: ${chapterId}`);
    }

    const questions = await this.prisma.question.findMany({
      where: {
        topic: { chapterId },
        type: 'MCQ',
        status: ContentStatus.PUBLISHED,
      },
    });

    const shuffledQuestions = shuffle(questions);

    return shuffledQuestions.map((q) => {
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
}
