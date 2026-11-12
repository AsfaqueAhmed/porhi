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
import { StartRehearsalDto } from './dto/rehearsal.dto';
import type { MultiExamRehearsalDTO, RehearsalPaperStateDTO } from '@pori/shared';

const GRACE_PERIOD_SECONDS = 120;

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
    if (
      !dto?.testType ||
      !['CHAPTER_TEST', 'TOPIC_TEST', 'WEAK_AREA', 'SUBJECT_TEST'].includes(dto.testType)
    ) {
      throw new BadRequestException(
        'testType must be CHAPTER_TEST, TOPIC_TEST, WEAK_AREA, or SUBJECT_TEST',
      );
    }

    if (!dto?.subjectId || typeof dto.subjectId !== 'string') {
      throw new BadRequestException('subjectId is required');
    }

    if (
      dto.testType !== 'SUBJECT_TEST' &&
      (!dto?.chapterId || typeof dto.chapterId !== 'string')
    ) {
      throw new BadRequestException('chapterId is required');
    }

    if (dto.negativeRatio !== undefined && (dto.negativeRatio < 0 || dto.negativeRatio > 1.0)) {
      throw new BadRequestException('negativeRatio must be between 0 and 1.0');
    }

    if (dto.durationSeconds !== undefined && (dto.durationSeconds < 60 || dto.durationSeconds > 7200)) {
      throw new BadRequestException('durationSeconds must be between 60 and 7200');
    }

    if (dto.questionLimit !== undefined && (dto.questionLimit < 1 || dto.questionLimit > 100)) {
      throw new BadRequestException('questionLimit must be between 1 and 100');
    }

    if (dto.testType === 'SUBJECT_TEST') {
      if (typeof (this.prisma as any).subject?.findUnique === 'function') {
        const subject = await (this.prisma as any).subject
          .findUnique({ where: { id: dto.subjectId } })
          .catch(() => null);
        if (!subject) {
          throw new NotFoundException(`Subject not found with id: ${dto.subjectId}`);
        }
      }
    } else if (dto.chapterId) {
      const chapter = await this.prisma.chapter.findUnique({
        where: { id: dto.chapterId },
      });

      if (!chapter) {
        throw new NotFoundException(`Chapter not found with id: ${dto.chapterId}`);
      }

      if (dto.subjectId && chapter.subjectId !== dto.subjectId) {
        throw new BadRequestException('Chapter does not belong to specified subject');
      }
    }

    const where: any = {
      type: 'MCQ',
      status: ContentStatus.PUBLISHED,
    };

    if (dto.testType === 'SUBJECT_TEST') {
      where.topic = { chapter: { subjectId: dto.subjectId } };
    } else if (dto.topicId) {
      where.topicId = dto.topicId;
      if (dto.chapterId) {
        where.topic = { chapterId: dto.chapterId };
      }
    } else if (dto.chapterId) {
      where.topic = { chapterId: dto.chapterId };
    }

    if (
      dto.testType === 'WEAK_AREA' &&
      !dto.topicId &&
      typeof (this.prisma.revisionMistake as any)?.findMany === 'function'
    ) {
      const mistakes = await (this.prisma.revisionMistake as any)
        .findMany({
          where: { userId, resolved: false },
          include: { question: { select: { topicId: true } } },
          take: 50,
        })
        .catch(() => []);

      const weakTopicIds = Array.from(
        new Set(
          (mistakes as any[])
            .map((m) => m?.question?.topicId)
            .filter((tid): tid is string => typeof tid === 'string' && tid.length > 0),
        ),
      );

      if (weakTopicIds.length > 0) {
        where.topicId = { in: weakTopicIds };
      }
    }

    let questions = await this.prisma.question.findMany({
      where,
    });

    if ((!questions || questions.length === 0) && dto.testType === 'WEAK_AREA' && where.topicId) {
      const fallbackWhere = { ...where };
      delete fallbackWhere.topicId;
      questions = await this.prisma.question.findMany({
        where: fallbackWhere,
      });
    }

    if (!questions || questions.length === 0) {
      throw new NotFoundException('No published questions found for this exam');
    }

    const effectiveLimit =
      dto.questionLimit !== undefined && dto.questionLimit > 0
        ? dto.questionLimit
        : dto.testType === 'SUBJECT_TEST'
          ? 25
          : undefined;
    const shuffledQuestions = shuffle(questions);
    const limitedQuestions = effectiveLimit
      ? shuffledQuestions.slice(0, effectiveLimit)
      : shuffledQuestions;
    const preparedQuestions = limitedQuestions.map((q) => {
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

    const durationSeconds = dto.durationSeconds ?? Math.max(60, preparedQuestions.length * 60);
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
        chapterId: dto.testType === 'SUBJECT_TEST' ? null : (dto.chapterId ?? null),
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
    userId: string,
  ) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Exam session not found with id: ${sessionId}`);
    }

    if (session.userId !== userId) {
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
      // Only update questions that belong to the active exam session
      for (const ans of incomingAnswers) {
        if (ans && ans.questionId && answerMap.has(ans.questionId)) {
          answerMap.set(ans.questionId, {
            ...answerMap.get(ans.questionId),
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
    userId: string,
  ) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Exam session not found with id: ${sessionId}`);
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('You do not have access to this exam session');
    }

    if (session.status !== 'IN_PROGRESS') {
      throw new BadRequestException('Exam already submitted');
    }

    // Enforce exam duration / expiration check with grace period
    const elapsedSeconds =
      (Date.now() - new Date(session.startedAt).getTime()) / 1000;
    if (
      session.durationSeconds &&
      elapsedSeconds > session.durationSeconds + GRACE_PERIOD_SECONDS
    ) {
      throw new BadRequestException('Exam time limit has expired');
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
    const mistakePromises: Promise<any>[] = [];

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

          mistakePromises.push(
            this.prisma.revisionMistake.upsert({
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
            }),
          );
        }
      }

      answersWithExplanation.push({
        questionId: qId,
        topicId: q.topicId,
        stem: q.stem,
        options: (Array.isArray(q.options) ? q.options : []).map((opt: any) => ({
          id: opt.id,
          text: opt.text,
        })),
        selectedOptionId,
        correctOptionId,
        isCorrect,
        explanation: q.explanation,
        timeSpent,
      });
    }

    if (mistakePromises.length > 0) {
      await Promise.all(mistakePromises);
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

    const percentile = await this.computePercentile(
      session.subjectId,
      session.chapterId,
      session.testType,
      score,
    );

    return {
      score,
      totalQuestions,
      correctCount,
      wrongCount,
      skippedCount,
      durationSeconds: session.durationSeconds,
      negativeRatio,
      negativeDeduction,
      percentile: percentile ?? undefined,
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

      const percentile = await this.computePercentile(
        session.subjectId,
        session.chapterId,
        session.testType,
        typeof session.score === 'number' ? session.score : 0,
      );

      return {
        sessionId: session.id,
        status: session.status,
        testType: session.testType,
        subjectId: session.subjectId,
        chapterId: session.chapterId,
        score: session.score,
        totalQuestions: session.totalQuestions,
        correctCount,
        wrongCount,
        skippedCount,
        durationSeconds: session.durationSeconds,
        negativeRatio: session.negativeRatio ?? 0.25,
        negativeDeduction,
        percentile: percentile ?? undefined,
        startedAt: session.startedAt,
        completedAt: session.completedAt,
        answersWithExplanation,
      };
    }
  }

  private async computePercentile(
    subjectId: string,
    chapterId: string | null | undefined,
    testType: string,
    score: number,
  ): Promise<number | null> {
    if (typeof (this.prisma.examSession as any)?.findMany !== 'function') {
      return null;
    }

    const where: any = {
      status: 'COMPLETED',
      subjectId,
    };
    if (testType === 'SUBJECT_TEST') {
      where.testType = 'SUBJECT_TEST';
    } else if (chapterId) {
      where.chapterId = chapterId;
    }

    const peerSessions = await (this.prisma.examSession as any)
      .findMany({
        where,
        select: { score: true },
        take: 500,
      })
      .catch(() => null);

    if (!Array.isArray(peerSessions) || peerSessions.length === 0) {
      return null;
    }

    const belowOrEqual = peerSessions.filter(
      (item: any) => typeof item?.score === 'number' && item.score <= score,
    ).length;

    return Math.round((belowOrEqual / peerSessions.length) * 100);
  }

  async getHistory(
    userId: string,
    filters?: { subjectId?: string; testType?: string },
  ) {
    if (!userId || typeof (this.prisma.examSession as any)?.findMany !== 'function') {
      return {
        items: [],
        summary: {
          totalTests: 0,
          averageAccuracy: 0,
          bestScorePercent: 0,
          subjectTestsCount: 0,
        },
        trend: [],
      };
    }

    const where: any = {
      userId,
      status: 'COMPLETED',
    };
    if (filters?.subjectId) {
      where.subjectId = filters.subjectId;
    }
    if (filters?.testType && filters.testType !== 'ALL') {
      where.testType = filters.testType;
    }

    const sessions = await (this.prisma.examSession as any)
      .findMany({
        where,
        orderBy: { completedAt: 'desc' },
        take: 50,
        include: {
          subject: { select: { nameBangla: true } },
          chapter: { select: { titleBangla: true } },
        },
      })
      .catch(() => []);

    const items = (sessions || []).map((session: any) => {
      const answers = Array.isArray(session.answers) ? session.answers : [];
      let correctCount = 0;
      let wrongCount = 0;
      let skippedCount = 0;

      for (const ans of answers) {
        if (ans?.skipped === true || (!ans?.selectedOptionId && ans?.isCorrect === undefined)) {
          skippedCount++;
        } else if (ans?.isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }

      const totalQuestions = session.totalQuestions || answers.length || 0;
      const accuracyPercent =
        totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

      return {
        sessionId: session.id,
        testType: session.testType,
        subjectId: session.subjectId,
        subjectNameBangla: session.subject?.nameBangla ?? undefined,
        chapterId: session.chapterId ?? null,
        chapterTitleBangla: session.chapter?.titleBangla ?? null,
        totalQuestions,
        correctCount,
        wrongCount,
        skippedCount,
        score: typeof session.score === 'number' ? session.score : 0,
        accuracyPercent,
        completedAt: new Date(session.completedAt || session.startedAt || Date.now()).toISOString(),
      };
    });

    const totalTests = items.length;
    const averageAccuracy =
      totalTests > 0
        ? Math.round(
            items.reduce((sum: number, item: any) => sum + item.accuracyPercent, 0) /
              totalTests,
          )
        : 0;
    const bestScorePercent =
      totalTests > 0
        ? Math.max(...items.map((item: any) => item.accuracyPercent))
        : 0;
    const subjectTestsCount = items.filter(
      (item: any) => item.testType === 'SUBJECT_TEST',
    ).length;

    const trend = [...items]
      .slice(0, 20)
      .reverse()
      .map((item: any) => {
        const d = new Date(item.completedAt);
        const date = Number.isNaN(d.getTime())
          ? ''
          : d.toISOString().slice(0, 10);
        const label =
          item.chapterTitleBangla ||
          item.subjectNameBangla ||
          date;
        return {
          sessionId: item.sessionId,
          label,
          date,
          accuracyPercent: item.accuracyPercent,
          testType: item.testType,
        };
      });

    return {
      items,
      summary: {
        totalTests,
        averageAccuracy,
        bestScorePercent,
        subjectTestsCount,
      },
      trend,
    };
  }

  private formatRehearsal(row: any): MultiExamRehearsalDTO {
    return {
      id: row.id,
      titleBangla: row.titleBangla,
      program: row.program ?? 'SSC',
      currentPaperIndex: row.currentPaperIndex ?? 0,
      status: row.status,
      totalScore: typeof row.totalScore === 'number' ? row.totalScore : null,
      totalMarks: typeof row.totalMarks === 'number' ? row.totalMarks : 0,
      startedAt: new Date(row.startedAt || Date.now()).toISOString(),
      submittedAt: row.submittedAt ? new Date(row.submittedAt).toISOString() : null,
      papers: Array.isArray(row.papers) ? (row.papers as RehearsalPaperStateDTO[]) : [],
    };
  }

  async startRehearsal(userId: string, dto: StartRehearsalDto) {
    if (!dto?.papers || dto.papers.length < 2 || dto.papers.length > 5) {
      throw new BadRequestException('রিহার্সালের জন্য কমপক্ষে ২টি এবং সর্বোচ্চ ৫টি পত্র নির্বাচন করুন।');
    }

    const requestedIds = Array.from(new Set(dto.papers.map((p) => p.subjectId)));
    const subjects = await this.prisma.subject.findMany({
      where: {
        OR: [{ id: { in: requestedIds } }, { code: { in: requestedIds } }],
      },
      select: { id: true, code: true, nameBangla: true, program: true },
    });

    const subjectLookup = new Map<string, any>();
    for (const s of subjects) {
      subjectLookup.set(s.id, s);
      subjectLookup.set(s.code, s);
    }

    const resolvedPapers: RehearsalPaperStateDTO[] = dto.papers.map((paper, idx) => {
      const subject = subjectLookup.get(paper.subjectId);
      if (!subject) {
        throw new NotFoundException(`Subject not found: ${paper.subjectId}`);
      }
      return {
        paperIndex: idx,
        subjectId: subject.id,
        subjectCode: subject.code,
        subjectNameBangla: subject.nameBangla,
        labelBangla: paper.labelBangla?.trim() || `পত্র ${idx + 1}: ${subject.nameBangla}`,
        questionCount: Math.max(1, Math.min(50, Number(paper.questionCount) || 5)),
        durationMinutes: Math.max(1, Math.min(120, Number(paper.durationMinutes) || 10)),
        status: 'PENDING',
        sessionId: null,
        score: null,
        totalMarks: null,
        correctCount: null,
        wrongCount: null,
        unansweredCount: null,
        timeSpentSeconds: null,
        startedAt: null,
        submittedAt: null,
      };
    });

    const firstPaper = resolvedPapers[0];
    const activeSession = await this.startExam(
      {
        testType: 'SUBJECT_TEST',
        subjectId: firstPaper.subjectId,
        questionLimit: firstPaper.questionCount,
        durationSeconds: Math.max(60, Math.min(7200, firstPaper.durationMinutes * 60)),
        negativeRatio: dto.negativeRatio ?? 0.25,
      },
      userId,
    );

    firstPaper.status = 'ACTIVE';
    firstPaper.sessionId = activeSession.sessionId;
    firstPaper.totalMarks = activeSession.totalQuestions;
    firstPaper.startedAt = new Date().toISOString();

    const created = await (this.prisma as any).multiExamRehearsal.create({
      data: {
        userId,
        titleBangla: dto.titleBangla.trim(),
        program: dto.program?.trim() || subjects[0]?.program || 'SSC',
        papers: resolvedPapers as any,
        currentPaperIndex: 0,
        status: 'IN_PROGRESS',
        totalMarks: activeSession.totalQuestions,
      },
    });

    return {
      rehearsal: this.formatRehearsal(created),
      activeSession,
    };
  }

  async getRehearsalHistory(userId: string): Promise<MultiExamRehearsalDTO[]> {
    const rows = await (this.prisma as any).multiExamRehearsal.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      take: 15,
    });
    return (rows as any[]).map((row) => this.formatRehearsal(row));
  }

  async getRehearsal(rehearsalId: string, userId: string) {
    const row = await (this.prisma as any).multiExamRehearsal.findUnique({
      where: { id: rehearsalId },
    });
    if (!row) {
      throw new NotFoundException(`Rehearsal not found with id: ${rehearsalId}`);
    }
    if (row.userId !== userId) {
      throw new ForbiddenException('You do not have access to this exam rehearsal');
    }

    const rehearsal = this.formatRehearsal(row);
    const activePaper = rehearsal.papers.find((p) => p.status === 'ACTIVE' && p.sessionId);
    let activeSession: any = null;
    if (activePaper?.sessionId) {
      activeSession = await this.getSession(activePaper.sessionId, userId).catch(() => null);
    }

    return { rehearsal, activeSession };
  }

  async startRehearsalPaper(rehearsalId: string, paperIndex: number, userId: string) {
    const row = await (this.prisma as any).multiExamRehearsal.findUnique({
      where: { id: rehearsalId },
    });
    if (!row) {
      throw new NotFoundException(`Rehearsal not found with id: ${rehearsalId}`);
    }
    if (row.userId !== userId) {
      throw new ForbiddenException('You do not have access to this exam rehearsal');
    }

    const papers = Array.isArray(row.papers) ? ([...row.papers] as RehearsalPaperStateDTO[]) : [];
    const target = papers[paperIndex];
    if (!target) {
      throw new BadRequestException(`Invalid paper index: ${paperIndex}`);
    }
    if (target.status === 'ACTIVE' && target.sessionId) {
      const existingSession = await this.getSession(target.sessionId, userId);
      return { rehearsal: this.formatRehearsal(row), activeSession: existingSession };
    }
    if (target.status !== 'PENDING' || paperIndex !== row.currentPaperIndex) {
      throw new BadRequestException('এই পত্রটি এখনো শুরু করার উপযোগী নয়।');
    }

    const activeSession = await this.startExam(
      {
        testType: 'SUBJECT_TEST',
        subjectId: target.subjectId,
        questionLimit: target.questionCount,
        durationSeconds: Math.max(60, Math.min(7200, target.durationMinutes * 60)),
      },
      userId,
    );

    papers[paperIndex] = {
      ...target,
      status: 'ACTIVE',
      sessionId: activeSession.sessionId,
      totalMarks: activeSession.totalQuestions,
      startedAt: new Date().toISOString(),
    };

    const totalMarks = papers.reduce((sum, p) => sum + (p.totalMarks ?? 0), 0);

    const updated = await (this.prisma as any).multiExamRehearsal.update({
      where: { id: rehearsalId },
      data: {
        papers: papers as any,
        status: 'IN_PROGRESS',
        currentPaperIndex: paperIndex,
        totalMarks,
      },
    });

    return {
      rehearsal: this.formatRehearsal(updated),
      activeSession,
    };
  }

  async submitRehearsalPaper(
    rehearsalId: string,
    paperIndex: number,
    userId: string,
    dto: SubmitExamDto | ExamAnswerDto[],
  ) {
    const row = await (this.prisma as any).multiExamRehearsal.findUnique({
      where: { id: rehearsalId },
    });
    if (!row) {
      throw new NotFoundException(`Rehearsal not found with id: ${rehearsalId}`);
    }
    if (row.userId !== userId) {
      throw new ForbiddenException('You do not have access to this exam rehearsal');
    }

    const papers = Array.isArray(row.papers) ? ([...row.papers] as RehearsalPaperStateDTO[]) : [];
    const target = papers[paperIndex];
    if (!target || target.status !== 'ACTIVE' || !target.sessionId) {
      throw new BadRequestException('এই পত্রটি সক্রিয় অবস্থায় নেই।');
    }

    const result = await this.submitExam(target.sessionId, dto, userId);
    const nowIso = new Date().toISOString();
    const startedMs = target.startedAt ? new Date(target.startedAt).getTime() : Date.now();
    const timeSpentSeconds = Math.max(0, Math.round((Date.now() - startedMs) / 1000));

    papers[paperIndex] = {
      ...target,
      status: 'SUBMITTED',
      score: result.score,
      totalMarks: result.totalQuestions,
      correctCount: result.correctCount,
      wrongCount: result.wrongCount,
      unansweredCount: result.skippedCount,
      timeSpentSeconds,
      submittedAt: nowIso,
    };

    const hasNextPaper = paperIndex + 1 < papers.length;
    const totalScore = parseFloat(
      papers.reduce((sum, p) => sum + (typeof p.score === 'number' ? p.score : 0), 0).toFixed(4),
    );
    const totalMarks = papers.reduce(
      (sum, p) => sum + (typeof p.totalMarks === 'number' ? p.totalMarks : p.questionCount),
      0,
    );

    const updated = await (this.prisma as any).multiExamRehearsal.update({
      where: { id: rehearsalId },
      data: {
        papers: papers as any,
        currentPaperIndex: hasNextPaper ? paperIndex + 1 : paperIndex,
        status: hasNextPaper ? 'INTERMISSION' : 'COMPLETED',
        totalScore: hasNextPaper ? null : totalScore,
        totalMarks,
        submittedAt: hasNextPaper ? null : new Date(),
      },
    });

    return {
      rehearsal: this.formatRehearsal(updated),
      paperResult: result,
    };
  }
}
