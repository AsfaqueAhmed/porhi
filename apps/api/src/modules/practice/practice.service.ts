import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SubmitPracticeDto } from './dto/submit-practice.dto';

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
      },
    });

    return questions.map((q) => {
      const options = Array.isArray(q.options) ? q.options : [];
      const shuffled = shuffle(options);
      const sanitizedOptions = shuffled.map((opt: any) => {
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

  async submitPractice(dto: SubmitPracticeDto, explicitUserId?: string) {
    if (!dto?.questionId || typeof dto.questionId !== 'string' || !dto.questionId.trim()) {
      throw new BadRequestException('questionId is required and must be a non-empty string');
    }

    if (!dto?.selectedOptionId || typeof dto.selectedOptionId !== 'string' || !dto.selectedOptionId.trim()) {
      throw new BadRequestException('selectedOptionId is required and must be a non-empty string');
    }

    const userId = explicitUserId || dto.userId;

    const question = await this.prisma.question.findUnique({
      where: { id: dto.questionId },
    });

    if (!question) {
      throw new NotFoundException(`Question not found with id: ${dto.questionId}`);
    }

    const options = Array.isArray(question.options) ? (question.options as any[]) : [];
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

      await this.prisma.eventLog.create({
        data: {
          userId,
          eventType: 'PRACTICE_ATTEMPT',
          payload: {
            questionId: dto.questionId,
            selectedOptionId: dto.selectedOptionId,
            isCorrect,
          },
        },
      });
    }

    return {
      isCorrect,
      correctOptionId,
      explanation: question.explanation,
    };
  }
}
