import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ContentStatus } from '@prisma/client';
import { StartExamDto } from './dto/start-exam.dto';
import { HeartbeatAnswerDto, HeartbeatExamDto } from './dto/heartbeat-exam.dto';
import { ExamAnswerDto, SubmitExamDto } from './dto/submit-exam.dto';

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

@Injectable()
export class ExamService {
  private readonly logger = new Logger(ExamService.name);

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async startExam(dto: StartExamDto, userId: string) {
    if (dto.chapterId) {
      const chapter = await this.prisma.chapter.findUnique({
        where: { id: dto.chapterId },
      });

      if (!chapter) {
        throw new NotFoundException(`Chapter not found with id: ${dto.chapterId}`);
      }
    }

    const where: any = {
      type: 'MCQ',
      status: ContentStatus.PUBLISHED,
    };

    if (dto.topicId) {
      where.topicId = dto.topicId;
      if (dto.chapterId) {
        where.topic = { chapterId: dto.chapterId };
      }
    } else if (dto.chapterId) {
      where.topic = { chapterId: dto.chapterId };
    }

    const questions = await this.prisma.question.findMany({
      where,
    });

    if (!questions || questions.length === 0) {
      throw new NotFoundException('No published questions found for this exam');
    }

    const shuffledQuestions = shuffle(questions);
    const preparedQuestions = shuffledQuestions.map((q) => {
      const rawOptions = Array.isArray(q.options) ? q.options : [];
      const shuffledOptions = shuffle(rawOptions);
      const sanitizedOptions = shuffledOptions.map((opt: any) => ({
        id: opt.id,
        text: opt.text,
      }));

      return {
        id: q.id,
        stem: q.stem,
        options: sanitizedOptions,
      };
    });

    const durationSeconds = dto.durationSeconds ?? Math.max(60, questions.length * 60);
    const negativeRatio = dto.negativeRatio !== undefined ? dto.negativeRatio : 0.25;

    const initialAnswers = preparedQuestions.map((q) => ({
      questionId: q.id,
      selectedOptionId: null,
      timeSpent: 0,
    }));

    const session = await this.prisma.examSession.create({
      data: {
        userId,
        testType: dto.testType,
        subjectId: dto.subjectId,
        chapterId: dto.chapterId ?? null,
        totalQuestions: preparedQuestions.length,
        durationSeconds,
        negativeRatio,
        score: 0.0,
        answers: initialAnswers as any,
        status: 'IN_PROGRESS',
      },
    });

    return {
      sessionId: session.id,
      totalQuestions: session.totalQuestions,
      durationSeconds: session.durationSeconds,
      negativeRatio: session.negativeRatio,
      questions: preparedQuestions,
    };
  }

  async heartbeat(
    sessionId: string,
    dtoOrAnswers: HeartbeatExamDto | HeartbeatAnswerDto[],
    userId?: string,
  ) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Exam session not found with id: ${sessionId}`);
    }

    if (userId && session.userId !== userId) {
      throw new ForbiddenException('You do not have access to this exam session');
    }

    if (session.status !== 'IN_PROGRESS') {
      throw new BadRequestException('Exam session is not in progress');
    }

    const incomingAnswers = Array.isArray(dtoOrAnswers)
      ? dtoOrAnswers
      : dtoOrAnswers?.answers || [];

    let updatedAnswers: any[] = incomingAnswers;
    if (Array.isArray(session.answers) && session.answers.length > 0) {
      const answerMap = new Map<string, any>();
      for (const ans of session.answers as any[]) {
        if (ans && ans.questionId) {
          answerMap.set(ans.questionId, ans);
        }
      }
      for (const ans of incomingAnswers) {
        if (ans && ans.questionId) {
          answerMap.set(ans.questionId, {
            ...(answerMap.get(ans.questionId) || {}),
            ...ans,
          });
        }
      }
      updatedAnswers = Array.from(answerMap.values());
    }

    await this.prisma.examSession.update({
      where: { id: sessionId },
      data: {
        answers: updatedAnswers as any,
      },
    });

    return {
      success: true,
      sessionId,
      answers: updatedAnswers,
    };
  }

  async submitExam(
    sessionId: string,
    dtoOrAnswers: SubmitExamDto | ExamAnswerDto[],
    userId?: string,
  ) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Exam session not found with id: ${sessionId}`);
    }

    if (userId && session.userId !== userId) {
      throw new ForbiddenException('You do not have access to this exam session');
    }

    if (session.status !== 'IN_PROGRESS') {
      throw new BadRequestException('Exam already submitted');
    }

    const incomingAnswers = Array.isArray(dtoOrAnswers)
      ? dtoOrAnswers
      : dtoOrAnswers?.answers || [];

    const incomingMap = new Map<string, any>();
    for (const ans of incomingAnswers) {
      if (ans && ans.questionId) {
        incomingMap.set(ans.questionId, ans);
      }
    }

    const sessionAnswers = Array.isArray(session.answers)
      ? (session.answers as any[])
      : [];
    const sessionMap = new Map<string, any>();
    for (const ans of sessionAnswers) {
      if (ans && ans.questionId) {
        sessionMap.set(ans.questionId, ans);
      }
    }

    const sessionQuestionIds = sessionAnswers
      .map((a) => a.questionId)
      .filter(Boolean);
    const submittedQuestionIds = incomingAnswers
      .map((a) => a.questionId)
      .filter(Boolean);
    const allQuestionIds = Array.from(
      new Set([...sessionQuestionIds, ...submittedQuestionIds]),
    );

    const questions = await this.prisma.question.findMany({
      where: { id: { in: allQuestionIds } },
    });
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    const answersWithExplanation: any[] = [];

    const orderedQuestionIds =
      sessionQuestionIds.length > 0 ? sessionQuestionIds : allQuestionIds;

    for (const qId of orderedQuestionIds) {
      const q = questionMap.get(qId);
      if (!q) continue;

      const userAns = incomingMap.get(qId) || sessionMap.get(qId);
      const selectedOptionId = userAns?.selectedOptionId ?? null;
      const timeSpent = userAns?.timeSpent ?? 0;

      const options =
        (q.options as Array<{ id: string; text?: string; isCorrect?: boolean }>) ||
        [];
      const correctOption = options.find((o) => o.isCorrect === true);
      const correctOptionId = correctOption?.id;

      let isCorrect = false;

      if (!selectedOptionId) {
        skippedCount++;
        isCorrect = false;
      } else {
        const chosenOption = options.find((o) => o.id === selectedOptionId);
        if (chosenOption?.isCorrect) {
          correctCount++;
          isCorrect = true;
        } else {
          wrongCount++;
          isCorrect = false;

          await this.prisma.revisionMistake.upsert({
            where: {
              userId_questionId: {
                userId: session.userId,
                questionId: qId,
              },
            },
            create: {
              userId: session.userId,
              questionId: qId,
              resolved: false,
              attemptCount: 1,
            },
            update: {
              resolved: false,
              attemptCount: { increment: 1 },
            },
          });
        }
      }

      answersWithExplanation.push({
        questionId: qId,
        stem: q.stem,
        selectedOptionId,
        correctOptionId,
        isCorrect,
        explanation: q.explanation,
        timeSpent,
      });
    }

    const negativeRatio = session.negativeRatio || 0.0;
    const negativeDeduction = parseFloat(
      (wrongCount * negativeRatio).toFixed(4),
    );
    const rawScore = correctCount * 1.0 - negativeDeduction;
    const score = Math.max(0, parseFloat(rawScore.toFixed(4)));

    const totalQuestions = session.totalQuestions || orderedQuestionIds.length;
    const completedAt = new Date();

    await this.prisma.examSession.update({
      where: { id: sessionId },
      data: {
        score,
        status: 'COMPLETED',
        completedAt,
        answers: answersWithExplanation as any,
      },
    });

    await this.prisma.eventLog
      .create({
        data: {
          userId: session.userId,
          eventType: 'TEST_SUBMIT',
          payload: {
            sessionId,
            score,
            totalQuestions,
            correctCount,
            wrongCount,
            skippedCount,
            durationSeconds: session.durationSeconds,
            negativeRatio,
            negativeDeduction,
          },
        },
      })
      .catch((err) => {
        this.logger.warn(`Failed to log TEST_SUBMIT event: ${err?.message ?? err}`);
      });

    return {
      score,
      totalQuestions,
      correctCount,
      wrongCount,
      skippedCount,
      durationSeconds: session.durationSeconds,
      negativeDeduction,
      answersWithExplanation,
    };
  }

  async getSession(sessionId: string, userId: string) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Exam session not found with id: ${sessionId}`);
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('You do not have access to this exam session');
    }

    if (session.status === 'IN_PROGRESS') {
      const rawAnswers = Array.isArray(session.answers)
        ? (session.answers as any[])
        : [];
      const questionIds = rawAnswers.map((a) => a.questionId).filter(Boolean);

      const questions = await this.prisma.question.findMany({
        where: { id: { in: questionIds } },
      });
      const questionMap = new Map(questions.map((q) => [q.id, q]));

      const sanitizedQuestions = questionIds
        .map((qId) => {
          const q = questionMap.get(qId);
          if (!q) return null;
          const rawOptions = Array.isArray(q.options) ? q.options : [];
          const sanitizedOptions = rawOptions.map((opt: any) => ({
            id: opt.id,
            text: opt.text,
          }));
          return {
            id: q.id,
            stem: q.stem,
            options: sanitizedOptions,
          };
        })
        .filter(Boolean);

      return {
        sessionId: session.id,
        status: session.status,
        testType: session.testType,
        subjectId: session.subjectId,
        chapterId: session.chapterId,
        totalQuestions: session.totalQuestions,
        durationSeconds: session.durationSeconds,
        negativeRatio: session.negativeRatio,
        startedAt: session.startedAt,
        answers: session.answers,
        questions: sanitizedQuestions,
      };
    } else {
      const answersWithExplanation = Array.isArray(session.answers)
        ? (session.answers as any[])
        : [];

      let correctCount = 0;
      let wrongCount = 0;
      let skippedCount = 0;

      for (const ans of answersWithExplanation) {
        if (!ans.selectedOptionId) {
          skippedCount++;
        } else if (ans.isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }

      const negativeDeduction = parseFloat(
        (wrongCount * (session.negativeRatio || 0.0)).toFixed(4),
      );

      return {
        sessionId: session.id,
        status: session.status,
        score: session.score,
        totalQuestions: session.totalQuestions,
        correctCount,
        wrongCount,
        skippedCount,
        durationSeconds: session.durationSeconds,
        negativeDeduction,
        startedAt: session.startedAt,
        completedAt: session.completedAt,
        answersWithExplanation,
      };
    }
  }
}
