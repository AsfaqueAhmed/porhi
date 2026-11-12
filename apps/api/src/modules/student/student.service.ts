import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { ContentStatus } from '@prisma/client';

const SUBJECT_CODE_ALIASES: Record<string, string> = {
  sub_ssc_physics: 'ssc_physics',
  'sub-ssc-phy': 'ssc_physics',
  'phy-ssc': 'ssc_physics',
  sub_ssc_chemistry: 'ssc_chemistry',
  'sub-ssc-chem': 'ssc_chemistry',
  'chem-ssc': 'ssc_chemistry',
  sub_class8_science: 'class8_science',
  sub_hsc_physics_1: 'hsc_physics_1',
  sub_admission_physics: 'admission_ka_physics',
  sub_bcs_preliminary: 'bcs_preliminary',
};

export interface StudentOverviewResponse {
  subjectId: string;
  curriculumTotals: {
    totalChapters: number;
    totalTopics: number;
    totalPublishedLessons: number;
    totalPublishedQuestions: number;
  };
  completedTopicIds: string[];
  lastStudiedTopic: {
    topicId: string;
    topicTitle: string;
    chapterId: string;
    chapterTitle: string;
    timestamp: string;
  } | null;
  practiceStats: {
    totalAttempts: number;
    correctAttempts: number;
    accuracyPercent: number;
    topicMastery: Record<string, { attempts: number; correct: number; accuracy: number }>;
  };
  streakDays: number;
  studyDates: string[];
  dueMistakes: Array<{
    id: string;
    questionId: string;
    attemptCount: number;
    updatedAt: string;
    topicId: string;
    topicTitle: string;
    chapterId: string;
    chapterTitle: string;
    stem: string;
    correctOptionText: string;
    conceptNote: string;
  }>;
  weakTopics: Array<{
    topicId: string;
    topicTitle: string;
    chapterId: string;
    chapterTitle: string;
    accuracy: number;
    mistakeCount: number;
  }>;
  recentExams: Array<{
    sessionId: string;
    chapterId: string | null;
    subjectId: string;
    score: number;
    totalQuestions: number;
    durationSeconds: number;
    completedAt: string | null;
  }>;
  bookmarks?: Array<{
    id: string;
    type: 'topic' | 'question';
    titleBangla: string;
    subtitleBangla?: string | null;
    href: string;
    createdAt: string;
  }>;
  lessonNotes?: Record<string, string>;
}

function calculateConsecutiveStreak(dateStrings: string[]): number {
  if (!dateStrings || dateStrings.length === 0) return 0;
  const uniqueDates = Array.from(new Set(dateStrings)).sort().reverse();
  const todayStr = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterday) {
    return 0;
  }

  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1] + 'T00:00:00Z');
    const curr = new Date(uniqueDates[i] + 'T00:00:00Z');
    const diffDays = Math.round((prev.getTime() - curr.getTime()) / 86400000);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  private async resolveSubject(subjectIdOrCode: string) {
    if (!subjectIdOrCode) return null;

    let subject = await this.prisma.subject?.findUnique?.({
      where: { id: subjectIdOrCode },
    });

    if (!subject) {
      const aliasCode =
        SUBJECT_CODE_ALIASES[subjectIdOrCode.toLowerCase()] || subjectIdOrCode;
      subject = await this.prisma.subject?.findUnique?.({
        where: { code: aliasCode },
      });
    }

    if (!subject && (this.prisma.subject as any)?.findFirst) {
      const aliasCode =
        SUBJECT_CODE_ALIASES[subjectIdOrCode.toLowerCase()] || subjectIdOrCode;
      subject = await (this.prisma.subject as any).findFirst({
        where: {
          OR: [{ id: subjectIdOrCode }, { code: subjectIdOrCode }, { code: aliasCode }],
        },
      });
    }

    return subject;
  }

  async getOverview(
    subjectId: string = 'sub_ssc_physics',
    userId?: string,
  ): Promise<StudentOverviewResponse> {
    const subject = await this.resolveSubject(subjectId);
    const resolvedSubjectId = subject?.id || subjectId || 'sub_ssc_physics';

    const chapters =
      (await this.prisma.chapter?.findMany?.({
        where: subject ? { subjectId: subject.id } : {},
        orderBy: { orderIndex: 'asc' },
        include: {
          topics: {
            orderBy: { orderIndex: 'asc' },
          },
        },
      })) || [];

    const topicMap = new Map<
      string,
      { topicId: string; topicTitle: string; chapterId: string; chapterTitle: string }
    >();

    for (const ch of chapters as any[]) {
      for (const top of ch.topics || []) {
        topicMap.set(top.id, {
          topicId: top.id,
          topicTitle: top.titleBangla,
          chapterId: ch.id,
          chapterTitle: ch.titleBangla,
        });
      }
    }

    const allTopicIds = Array.from(topicMap.keys());
    const totalChapters = chapters.length;
    const totalTopics = allTopicIds.length;

    let totalPublishedLessons = totalTopics;
    let totalPublishedQuestions = 0;

    if (typeof (this.prisma.lesson as any)?.count === 'function' && allTopicIds.length > 0) {
      try {
        totalPublishedLessons = await (this.prisma.lesson as any).count({
          where: { topicId: { in: allTopicIds }, status: ContentStatus.PUBLISHED },
        });
      } catch {
        // Fallback
      }
    }

    if (typeof (this.prisma.question as any)?.count === 'function' && allTopicIds.length > 0) {
      try {
        totalPublishedQuestions = await (this.prisma.question as any).count({
          where: { topicId: { in: allTopicIds }, status: ContentStatus.PUBLISHED },
        });
      } catch {
        // Fallback
      }
    }

    if (!userId) {
      return {
        subjectId: resolvedSubjectId,
        curriculumTotals: {
          totalChapters,
          totalTopics,
          totalPublishedLessons,
          totalPublishedQuestions,
        },
        completedTopicIds: [],
        lastStudiedTopic: null,
        practiceStats: {
          totalAttempts: 0,
          correctAttempts: 0,
          accuracyPercent: 0,
          topicMastery: {},
        },
        streakDays: 0,
        studyDates: [],
        dueMistakes: [],
        weakTopics: [],
        recentExams: [],
        bookmarks: [],
        lessonNotes: {},
      };
    }

    // Fetch user events, mistakes, exam sessions, bookmarks, and lesson notes
    const [events, mistakes, examSessions, bookmarkRows, noteRows] = await Promise.all([
      this.prisma.eventLog?.findMany?.({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: 250,
      }) || Promise.resolve([]),
      this.prisma.revisionMistake?.findMany?.({
        where: { userId, resolved: false },
        include: {
          question: {
            include: {
              topic: {
                include: {
                  chapter: true,
                },
              },
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 25,
      }) || Promise.resolve([]),
      this.prisma.examSession?.findMany?.({
        where: { userId, status: 'COMPLETED' },
        orderBy: { completedAt: 'desc' },
        take: 10,
      }) || Promise.resolve([]),
      typeof (this.prisma as any).studentBookmark?.findMany === 'function'
        ? (this.prisma as any).studentBookmark
            .findMany({
              where: { userId },
              orderBy: { createdAt: 'desc' },
              take: 50,
            })
            .catch(() => [])
        : Promise.resolve([]),
      typeof (this.prisma as any).studentNote?.findMany === 'function'
        ? (this.prisma as any).studentNote
            .findMany({
              where: { userId },
              orderBy: { updatedAt: 'desc' },
              take: 100,
            })
            .catch(() => [])
        : Promise.resolve([]),
    ]);

    const completedSet = new Set<string>();
    let lastStudiedTopic: StudentOverviewResponse['lastStudiedTopic'] = null;
    const studyDateSet = new Set<string>();
    const practiceQuestionAttempts: Array<{ questionId: string; isCorrect: boolean }> = [];

    for (const ev of events as any[]) {
      if (ev.timestamp) {
        const dStr = new Date(ev.timestamp).toISOString().slice(0, 10);
        studyDateSet.add(dStr);
      }

      const payload = (ev.payload || {}) as any;
      if (ev.eventType === 'LESSON_OPEN' || ev.eventType === 'LESSON_COMPLETE') {
        const tId = payload.topicId;
        if (tId && typeof tId === 'string') {
          completedSet.add(tId);
          if (!lastStudiedTopic && topicMap.has(tId)) {
            const meta = topicMap.get(tId)!;
            lastStudiedTopic = {
              ...meta,
              timestamp: new Date(ev.timestamp || Date.now()).toISOString(),
            };
          }
        }
      } else if (ev.eventType === 'PRACTICE_ATTEMPT') {
        if (payload.questionId) {
          practiceQuestionAttempts.push({
            questionId: payload.questionId,
            isCorrect: Boolean(payload.isCorrect),
          });
        }
      }
    }

    for (const sess of examSessions as any[]) {
      if (sess.completedAt) {
        studyDateSet.add(new Date(sess.completedAt).toISOString().slice(0, 10));
      }
    }

    // Resolve question -> topicId for practice attempts
    const attemptedQuestionIds = Array.from(
      new Set(practiceQuestionAttempts.map((a) => a.questionId)),
    );
    const questionTopicLookup = new Map<string, string>();
    if (attemptedQuestionIds.length > 0 && typeof this.prisma.question?.findMany === 'function') {
      try {
        const qs = await this.prisma.question.findMany({
          where: { id: { in: attemptedQuestionIds } },
          select: { id: true, topicId: true },
        });
        for (const q of qs as any[]) {
          if (q.id && q.topicId) {
            questionTopicLookup.set(q.id, q.topicId);
          }
        }
      } catch {
        // Fallback
      }
    }

    let totalAttempts = 0;
    let correctAttempts = 0;
    const topicMastery: Record<string, { attempts: number; correct: number; accuracy: number }> = {};

    for (const att of practiceQuestionAttempts) {
      totalAttempts++;
      if (att.isCorrect) correctAttempts++;
      const tId = questionTopicLookup.get(att.questionId);
      if (tId) {
        const entry = topicMastery[tId] || { attempts: 0, correct: 0, accuracy: 0 };
        entry.attempts++;
        if (att.isCorrect) entry.correct++;
        entry.accuracy = Math.round((entry.correct / entry.attempts) * 100);
        topicMastery[tId] = entry;
      }
    }

    const accuracyPercent =
      totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

    // Format dueMistakes and count mistakes per topic
    const mistakeCountByTopic = new Map<string, number>();
    const dueMistakes: StudentOverviewResponse['dueMistakes'] = (mistakes as any[]).map((m) => {
      const q = m.question || {};
      const top = q.topic || {};
      const ch = top.chapter || {};
      const tId = q.topicId || top.id || '';
      if (tId) {
        mistakeCountByTopic.set(tId, (mistakeCountByTopic.get(tId) || 0) + 1);
      }

      const options = Array.isArray(q.options) ? q.options : [];
      const correctOpt = options.find((o: any) => o.isCorrect);
      const explanation = (q.explanation || {}) as any;

      return {
        id: m.id,
        questionId: m.questionId,
        attemptCount: m.attemptCount || 1,
        updatedAt: new Date(m.updatedAt || Date.now()).toISOString(),
        topicId: tId,
        topicTitle: top.titleBangla || topicMap.get(tId)?.topicTitle || 'অধ্যায় টপিক',
        chapterId: ch.id || topicMap.get(tId)?.chapterId || 'chap_ssc_physics_ch1',
        chapterTitle: ch.titleBangla || topicMap.get(tId)?.chapterTitle || 'পদার্থবিজ্ঞান',
        stem: q.stem || '',
        correctOptionText: correctOpt?.text || explanation.directAnswer || '',
        conceptNote: explanation.coreConcept || explanation.proTipShortcut || explanation.directAnswer || '',
      };
    });

    // Compute weak topics (accuracy < 60% or unresolved mistakes >= 1)
    const candidateWeakTopicIds = new Set<string>([
      ...Object.keys(topicMastery).filter((tId) => topicMastery[tId].accuracy < 60),
      ...Array.from(mistakeCountByTopic.keys()),
    ]);

    const weakTopics: StudentOverviewResponse['weakTopics'] = Array.from(candidateWeakTopicIds)
      .map((tId) => {
        const meta = topicMap.get(tId);
        const mastery = topicMastery[tId];
        const mCount = mistakeCountByTopic.get(tId) || 0;
        const acc = mastery ? mastery.accuracy : 0;
        return {
          topicId: tId,
          topicTitle: meta?.topicTitle || 'টপিক অনুশীলন',
          chapterId: meta?.chapterId || 'chap_ssc_physics_ch1',
          chapterTitle: meta?.chapterTitle || 'প্রথম অধ্যায়',
          accuracy: acc,
          mistakeCount: mCount,
        };
      })
      .sort((a, b) => b.mistakeCount - a.mistakeCount || a.accuracy - b.accuracy);

    const studyDates = Array.from(studyDateSet).sort();
    const streakDays = calculateConsecutiveStreak(studyDates);

    const recentExams: StudentOverviewResponse['recentExams'] = (examSessions as any[]).map((s) => ({
      sessionId: s.id,
      chapterId: s.chapterId ?? null,
      subjectId: s.subjectId,
      score: s.score ?? 0,
      totalQuestions: s.totalQuestions ?? 0,
      durationSeconds: s.durationSeconds ?? 0,
      completedAt: s.completedAt ? new Date(s.completedAt).toISOString() : null,
    }));

    const bookmarks: NonNullable<StudentOverviewResponse['bookmarks']> = (bookmarkRows as any[]).map(
      (b) => ({
        id: b.itemId,
        type: (b.itemType === 'question' ? 'question' : 'topic') as 'topic' | 'question',
        titleBangla: b.titleBangla,
        subtitleBangla: b.subtitleBangla ?? null,
        href: b.href,
        createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : new Date().toISOString(),
      }),
    );

    const lessonNotes: Record<string, string> = {};
    for (const n of noteRows as any[]) {
      if (n.topicId && typeof n.content === 'string') {
        lessonNotes[n.topicId] = n.content;
      }
    }

    return {
      subjectId: resolvedSubjectId,
      curriculumTotals: {
        totalChapters,
        totalTopics,
        totalPublishedLessons,
        totalPublishedQuestions,
      },
      completedTopicIds: Array.from(completedSet),
      lastStudiedTopic,
      practiceStats: {
        totalAttempts,
        correctAttempts,
        accuracyPercent,
        topicMastery,
      },
      streakDays,
      studyDates,
      dueMistakes,
      weakTopics,
      recentExams,
      bookmarks,
      lessonNotes,
    };
  }

  async markLessonComplete(
    userId: string | undefined,
    dto: { topicId: string; lessonId?: string; timeSpentSeconds?: number },
  ) {
    if (userId && dto?.topicId && typeof this.prisma.eventLog?.create === 'function') {
      await this.prisma.eventLog
        .create({
          data: {
            userId,
            eventType: 'LESSON_COMPLETE',
            payload: {
              topicId: dto.topicId,
              lessonId: dto.lessonId || null,
              timeSpentSeconds: dto.timeSpentSeconds ?? 0,
            },
          },
        })
        .catch((err: any) => {
          this.logger.warn(`Failed to log LESSON_COMPLETE: ${err?.message ?? err}`);
        });
    }

    return {
      success: true,
      topicId: dto?.topicId || '',
    };
  }

  async resolveMistake(userId: string | undefined, questionId: string) {
    if (userId && questionId && typeof (this.prisma.revisionMistake as any)?.updateMany === 'function') {
      await (this.prisma.revisionMistake as any)
        .updateMany({
          where: { userId, questionId },
          data: { resolved: true },
        })
        .catch(() => {});
    }

    return {
      success: true,
      questionId,
    };
  }

  async toggleBookmark(
    userId: string | undefined,
    dto: {
      itemId: string;
      itemType: 'topic' | 'question';
      titleBangla: string;
      subtitleBangla?: string;
      href: string;
    },
  ): Promise<{ bookmarked: boolean }> {
    if (!userId || !dto?.itemId || typeof (this.prisma as any).studentBookmark?.findUnique !== 'function') {
      return { bookmarked: false };
    }

    const existing = await (this.prisma as any).studentBookmark.findUnique({
      where: {
        userId_itemId_itemType: {
          userId,
          itemId: dto.itemId,
          itemType: dto.itemType,
        },
      },
    });

    let bookmarked: boolean;
    if (existing) {
      await (this.prisma as any).studentBookmark.delete({
        where: { id: existing.id },
      });
      bookmarked = false;
    } else {
      await (this.prisma as any).studentBookmark.create({
        data: {
          userId,
          itemId: dto.itemId,
          itemType: dto.itemType,
          titleBangla: dto.titleBangla,
          subtitleBangla: dto.subtitleBangla ?? null,
          href: dto.href,
        },
      });
      bookmarked = true;
    }

    if (typeof this.prisma.eventLog?.create === 'function') {
      await this.prisma.eventLog
        .create({
          data: {
            userId,
            eventType: 'BOOKMARK_TOGGLE',
            payload: {
              itemId: dto.itemId,
              itemType: dto.itemType,
              bookmarked,
            },
          },
        })
        .catch(() => {});
    }

    return { bookmarked };
  }

  async saveNote(
    userId: string | undefined,
    topicId: string,
    content: string,
  ): Promise<{ success: boolean; topicId: string; content: string }> {
    const rawContent = typeof content === 'string' ? content : '';
    const isEmpty = rawContent.trim().length === 0;

    if (!userId || !topicId) {
      return { success: true, topicId: topicId || '', content: isEmpty ? '' : rawContent };
    }

    if (isEmpty) {
      if (typeof (this.prisma as any).studentNote?.deleteMany === 'function') {
        await (this.prisma as any).studentNote
          .deleteMany({
            where: { userId, topicId },
          })
          .catch(() => {});
      }
      return { success: true, topicId, content: '' };
    }

    if (typeof (this.prisma as any).studentNote?.upsert === 'function') {
      await (this.prisma as any).studentNote.upsert({
        where: {
          userId_topicId: {
            userId,
            topicId,
          },
        },
        create: {
          userId,
          topicId,
          content: rawContent,
        },
        update: {
          content: rawContent,
        },
      });
    }

    return { success: true, topicId, content: rawContent };
  }

  async submitFeedback(
    userId: string | undefined,
    dto: {
      contentType: 'LESSON' | 'QUESTION';
      contentId: string;
      helpful: boolean;
      comment?: string;
    },
  ): Promise<{ success: boolean }> {
    if (userId && dto?.contentId && typeof this.prisma.eventLog?.create === 'function') {
      await this.prisma.eventLog
        .create({
          data: {
            userId,
            eventType: 'EXPLANATION_FEEDBACK',
            payload: {
              contentType: dto.contentType,
              contentId: dto.contentId,
              helpful: dto.helpful,
              comment: dto.comment?.trim() || null,
            },
          },
        })
        .catch((err: any) => {
          this.logger.warn(`Failed to log EXPLANATION_FEEDBACK: ${err?.message ?? err}`);
        });
    }

    return { success: true };
  }

  async syncOfflineActivity(
    userId: string | undefined,
    payload: {
      lessonCompletes?: Array<{
        offlineEventId: string;
        topicId: string;
        chapterId?: string;
        subjectId?: string;
        completedAt?: string;
      }>;
      practiceAttempts?: Array<{
        offlineEventId: string;
        questionId: string;
        topicId?: string;
        isCorrect: boolean;
        selectedOptionId?: string | null;
        attemptedAt?: string;
      }>;
      examSubmissions?: Array<{
        offlineSessionId: string;
        subjectId: string;
        chapterId?: string | null;
        testType?: string;
        durationSeconds?: number;
        answers: Array<{ questionId: string; selectedOptionId?: string | null }>;
        submittedAt?: string;
      }>;
    },
  ): Promise<{ syncedLessons: number; syncedAttempts: number; syncedExams: number }> {
    if (!userId) {
      return { syncedLessons: 0, syncedAttempts: 0, syncedExams: 0 };
    }

    const recentEvents =
      typeof this.prisma.eventLog?.findMany === 'function'
        ? await this.prisma.eventLog
            .findMany({
              where: {
                userId,
                eventType: {
                  in: ['LESSON_COMPLETE', 'PRACTICE_ATTEMPT', 'TEST_SUBMIT'],
                },
              },
              take: 500,
            })
            .catch(() => [])
        : [];

    const existingEventIds = new Set<string>();
    const existingSessionIds = new Set<string>();
    for (const ev of recentEvents as any[]) {
      const p = ev?.payload;
      if (p && typeof p === 'object') {
        if (typeof p.offlineEventId === 'string') existingEventIds.add(p.offlineEventId);
        if (typeof p.offlineSessionId === 'string') existingSessionIds.add(p.offlineSessionId);
      }
    }

    let syncedLessons = 0;
    for (const item of payload?.lessonCompletes ?? []) {
      if (!item?.topicId || !item?.offlineEventId) continue;
      if (existingEventIds.has(item.offlineEventId)) continue;
      existingEventIds.add(item.offlineEventId);

      if (typeof this.prisma.eventLog?.create === 'function') {
        await this.prisma.eventLog
          .create({
            data: {
              userId,
              eventType: 'LESSON_COMPLETE',
              payload: {
                topicId: item.topicId,
                offlineEventId: item.offlineEventId,
                offlineSynced: true,
                completedAt: item.completedAt ?? new Date().toISOString(),
              },
            },
          })
          .catch(() => {});
      }
      syncedLessons++;
    }

    let syncedAttempts = 0;
    for (const att of payload?.practiceAttempts ?? []) {
      if (!att?.questionId || !att?.offlineEventId) continue;
      if (existingEventIds.has(att.offlineEventId)) continue;
      existingEventIds.add(att.offlineEventId);

      const cqMatch =
        typeof att.selectedOptionId === 'string'
          ? /^cq:(\d+),(\d+),(\d+),(\d+)$/.exec(att.selectedOptionId.trim())
          : null;
      const parsedCq = cqMatch
        ? {
            ka: Number(cqMatch[1]),
            kha: Number(cqMatch[2]),
            ga: Number(cqMatch[3]),
            gha: Number(cqMatch[4]),
          }
        : null;
      const isCqSelfAssess =
        parsedCq !== null &&
        parsedCq.ka >= 0 &&
        parsedCq.ka <= 1 &&
        parsedCq.kha >= 0 &&
        parsedCq.kha <= 2 &&
        parsedCq.ga >= 0 &&
        parsedCq.ga <= 3 &&
        parsedCq.gha >= 0 &&
        parsedCq.gha <= 4;

      if (typeof this.prisma.eventLog?.create === 'function') {
        const cqTotalScore = isCqSelfAssess
          ? parsedCq.ka + parsedCq.kha + parsedCq.ga + parsedCq.gha
          : 0;
        const eventPayload = isCqSelfAssess
          ? {
              questionId: att.questionId,
              topicId: att.topicId ?? null,
              type: 'CQ_CREATIVE',
              selfScores: parsedCq,
              totalScore: cqTotalScore,
              maxScore: 10,
              selectedOptionId: att.selectedOptionId,
              isCorrect: cqTotalScore >= 6,
              offlineEventId: att.offlineEventId,
              offlineSynced: true,
              attemptedAt: att.attemptedAt ?? new Date().toISOString(),
            }
          : {
              questionId: att.questionId,
              topicId: att.topicId ?? null,
              selectedOptionId: att.selectedOptionId ?? null,
              isCorrect: att.isCorrect,
              offlineEventId: att.offlineEventId,
              offlineSynced: true,
              attemptedAt: att.attemptedAt ?? new Date().toISOString(),
            };

        await this.prisma.eventLog
          .create({
            data: {
              userId,
              eventType: 'PRACTICE_ATTEMPT',
              payload: eventPayload,
            },
          })
          .catch(() => {});
      }

      if (
        !isCqSelfAssess &&
        att.isCorrect === false &&
        typeof (this.prisma.revisionMistake as any)?.upsert === 'function'
      ) {
        await (this.prisma.revisionMistake as any)
          .upsert({
            where: {
              userId_questionId: {
                userId,
                questionId: att.questionId,
              },
            },
            create: {
              userId,
              questionId: att.questionId,
              wrongCount: 1,
              resolved: false,
            },
            update: {
              wrongCount: { increment: 1 },
              resolved: false,
            },
          })
          .catch(() => {});
      }

      syncedAttempts++;
    }

    let syncedExams = 0;
    for (const exam of payload?.examSubmissions ?? []) {
      if (!exam?.offlineSessionId || !exam?.subjectId) continue;
      if (existingSessionIds.has(exam.offlineSessionId)) continue;
      existingSessionIds.add(exam.offlineSessionId);

      const submittedAnswers = Array.isArray(exam.answers) ? exam.answers : [];
      const questionIds = Array.from(
        new Set(submittedAnswers.map((a) => a.questionId).filter(Boolean)),
      );

      const questions =
        questionIds.length > 0 && typeof this.prisma.question?.findMany === 'function'
          ? await this.prisma.question
              .findMany({ where: { id: { in: questionIds } } })
              .catch(() => [])
          : [];

      const qMap = new Map<string, any>((questions as any[]).map((q) => [q.id, q]));

      let correctCount = 0;
      let wrongCount = 0;
      let skippedCount = 0;
      const evaluatedAnswers: any[] = [];

      for (const ans of submittedAnswers) {
        const q = qMap.get(ans.questionId);
        const options = Array.isArray(q?.options) ? q.options : [];
        const correctOpt = options.find((o: any) => o?.isCorrect === true);
        const correctOptionId = correctOpt?.id ?? null;

        if (!ans.selectedOptionId) {
          skippedCount++;
          evaluatedAnswers.push({
            questionId: ans.questionId,
            topicId: q?.topicId ?? null,
            selectedOptionId: null,
            correctOptionId,
            isCorrect: false,
            skipped: true,
          });
        } else {
          const isCorrect =
            correctOptionId !== null && ans.selectedOptionId === correctOptionId;
          if (isCorrect) {
            correctCount++;
          } else {
            wrongCount++;
            if (typeof (this.prisma.revisionMistake as any)?.upsert === 'function') {
              await (this.prisma.revisionMistake as any)
                .upsert({
                  where: {
                    userId_questionId: {
                      userId,
                      questionId: ans.questionId,
                    },
                  },
                  create: {
                    userId,
                    questionId: ans.questionId,
                    wrongCount: 1,
                    resolved: false,
                  },
                  update: {
                    wrongCount: { increment: 1 },
                    resolved: false,
                  },
                })
                .catch(() => {});
            }
          }

          evaluatedAnswers.push({
            questionId: ans.questionId,
            topicId: q?.topicId ?? null,
            selectedOptionId: ans.selectedOptionId,
            correctOptionId,
            isCorrect,
            skipped: false,
          });
        }
      }

      const totalQuestions = Math.max(submittedAnswers.length, evaluatedAnswers.length);
      const rawNegativeRatio = exam.negativeRatio;
      const negativeRatio =
        typeof rawNegativeRatio === 'number' &&
        Number.isFinite(rawNegativeRatio) &&
        rawNegativeRatio >= 0 &&
        rawNegativeRatio <= 1.0
          ? rawNegativeRatio
          : 0.25;
      const score = Math.max(
        0,
        parseFloat((correctCount - wrongCount * negativeRatio).toFixed(4)),
      );
      const submittedAtDate = exam.submittedAt ? new Date(exam.submittedAt) : new Date();

      if (typeof (this.prisma.examSession as any)?.create === 'function') {
        await (this.prisma.examSession as any)
          .create({
            data: {
              userId,
              testType: exam.testType || 'OFFLINE_CHAPTER_TEST',
              subjectId: exam.subjectId,
              chapterId: exam.chapterId ?? null,
              totalQuestions,
              durationSeconds:
                exam.durationSeconds ?? Math.max(60, totalQuestions * 60),
              negativeRatio,
              score,
              status: 'COMPLETED',
              startedAt: submittedAtDate,
              completedAt: submittedAtDate,
              answers: evaluatedAnswers as any,
            },
          })
          .catch(() => {});
      }

      if (typeof this.prisma.eventLog?.create === 'function') {
        await this.prisma.eventLog
          .create({
            data: {
              userId,
              eventType: 'TEST_SUBMIT',
              payload: {
                offlineSessionId: exam.offlineSessionId,
                offlineSynced: true,
                score,
                totalQuestions,
                correctCount,
                wrongCount,
                skippedCount,
              },
            },
          })
          .catch(() => {});
      }

      syncedExams++;
    }

    return { syncedLessons, syncedAttempts, syncedExams };
  }

  private formatShareLink(link: any) {
    return {
      id: link.id,
      shareCode: link.shareCode,
      audience: link.audience === 'TEACHER' ? 'TEACHER' : 'PARENT',
      recipientLabel: link.recipientLabel ?? null,
      isActive: Boolean(link.isActive),
      sharePath: `/guardian/${link.shareCode}`,
      createdAt: new Date(link.createdAt || Date.now()).toISOString(),
      revokedAt: link.revokedAt ? new Date(link.revokedAt).toISOString() : null,
      lastViewedAt: link.lastViewedAt ? new Date(link.lastViewedAt).toISOString() : null,
    };
  }

  async createShareLink(
    userId: string | undefined,
    dto: { audience: 'PARENT' | 'TEACHER'; recipientLabel?: string },
  ) {
    if (!userId) {
      throw new UnauthorizedException('অগ্রগতি শেয়ার লিংক তৈরি করতে সক্রিয় সেশন প্রয়োজন।');
    }
    const shareCode = randomBytes(6).toString('hex');
    const created = await (this.prisma as any).guardianShareLink.create({
      data: {
        userId,
        shareCode,
        audience: dto.audience === 'TEACHER' ? 'TEACHER' : 'PARENT',
        recipientLabel: dto.recipientLabel?.trim() || null,
        isActive: true,
      },
    });
    return this.formatShareLink(created);
  }

  async listShareLinks(userId: string | undefined) {
    if (!userId) {
      return [];
    }
    const links = await (this.prisma as any).guardianShareLink.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return (links as any[]).map((link) => this.formatShareLink(link));
  }

  async revokeShareLink(userId: string | undefined, id: string) {
    if (!userId) {
      throw new UnauthorizedException('লিংক বাতিল করতে সক্রিয় সেশন প্রয়োজন।');
    }
    const existing = await (this.prisma as any).guardianShareLink.findUnique({
      where: { id },
    });
    if (!existing || existing.userId !== userId) {
      throw new NotFoundException('শেয়ার লিংক পাওয়া যায়নি।');
    }
    const updated = await (this.prisma as any).guardianShareLink.update({
      where: { id },
      data: {
        isActive: false,
        revokedAt: new Date(),
      },
    });
    return this.formatShareLink(updated);
  }
}
