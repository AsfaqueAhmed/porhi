import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { GuardianReportDTO } from '@pori/shared';
import { PrismaService } from '../../database/prisma.service';
import { StudentService } from '../student/student.service';

@Injectable()
export class GuardianService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(StudentService) private readonly studentService: StudentService,
  ) {}

  async getReportByShareCode(shareCode: string): Promise<GuardianReportDTO> {
    const trimmedCode = shareCode?.trim();
    if (!trimmedCode) {
      throw new NotFoundException('রিপোর্ট কোড পাওয়া যায়নি।');
    }

    const link = await (this.prisma as any).guardianShareLink.findUnique({
      where: { shareCode: trimmedCode },
    });

    if (!link || !link.isActive) {
      throw new NotFoundException('এই শেয়ার লিংকটি পাওয়া যায়নি বা বাতিল করা হয়েছে।');
    }

    // Touch lastViewedAt non-blockingly
    await (this.prisma as any).guardianShareLink
      .update({
        where: { id: link.id },
        data: { lastViewedAt: new Date() },
      })
      .catch(() => {});

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [student, overview, chapters, subjects, planTasks, completedRehearsals] =
      await Promise.all([
        this.prisma.user.findUnique({
          where: { id: link.userId },
          select: { id: true, fullName: true, selectedClass: true },
        }),
        this.studentService.getOverview('ALL', link.userId),
        this.prisma.chapter.findMany({
          include: {
            subject: { select: { id: true, nameBangla: true } },
            topics: { select: { id: true, titleBangla: true } },
          },
        }),
        this.prisma.subject.findMany({
          select: { id: true, nameBangla: true },
        }),
        typeof (this.prisma as any).studyPlanTask?.findMany === 'function'
          ? (this.prisma as any).studyPlanTask
              .findMany({
                where: { userId: link.userId, scheduledDate: { gte: sevenDaysAgo } },
                select: { status: true, targetMinutes: true },
              })
              .catch(() => [])
          : Promise.resolve([]),
        typeof (this.prisma as any).multiExamRehearsal?.count === 'function'
          ? (this.prisma as any).multiExamRehearsal
              .count({
                where: { userId: link.userId, status: 'COMPLETED' },
              })
              .catch(() => 0)
          : Promise.resolve(0),
      ]);

    const subjectNameMap = new Map<string, string>(
      (subjects as any[]).map((s) => [s.id, s.nameBangla]),
    );

    const topicMastery = overview.practiceStats?.topicMastery || {};
    const chapterMastery: GuardianReportDTO['chapterMastery'] = [];

    for (const ch of chapters as any[]) {
      let totalAttempts = 0;
      let weightedCorrect = 0;
      for (const top of ch.topics || []) {
        const tm = topicMastery[top.id];
        if (tm && tm.attempts > 0) {
          totalAttempts += tm.attempts;
          weightedCorrect += tm.correct;
        }
      }
      if (totalAttempts > 0) {
        chapterMastery.push({
          chapterId: ch.id,
          titleBangla: ch.titleBangla,
          subjectNameBangla: ch.subject?.nameBangla ?? 'বিষয়',
          accuracy: Math.round((weightedCorrect / totalAttempts) * 100),
          questionsAttempted: totalAttempts,
        });
      }
    }

    chapterMastery.sort((a, b) => a.accuracy - b.accuracy || b.questionsAttempted - a.questionsAttempted);

    const tasksArray = Array.isArray(planTasks) ? (planTasks as any[]) : [];
    const weeklyCompletedTasks = tasksArray.filter((t) => t.status === 'COMPLETED').length;
    const weeklyStudyMinutes = tasksArray
      .filter((t) => t.status === 'COMPLETED')
      .reduce((sum, t) => sum + (Number(t.targetMinutes) || 0), 0);

    const recentExams: GuardianReportDTO['recentExams'] = (overview.recentExams || []).map(
      (ex) => {
        const totalMarks = ex.totalQuestions || 0;
        const score = ex.score || 0;
        const accuracy = totalMarks > 0 ? Math.max(0, Math.round((score / totalMarks) * 100)) : 0;
        return {
          id: ex.sessionId,
          subjectNameBangla: subjectNameMap.get(ex.subjectId) ?? 'বিষয়ভিত্তিক পরীক্ষা',
          testType: 'EXAM',
          score,
          totalMarks,
          accuracy,
          submittedAt: ex.completedAt ?? new Date().toISOString(),
        };
      },
    );

    const averageExamAccuracy =
      recentExams.length > 0
        ? Math.round(recentExams.reduce((s, e) => s + e.accuracy, 0) / recentExams.length)
        : overview.practiceStats?.accuracyPercent ?? 0;

    return {
      shareCode: link.shareCode,
      audience: link.audience === 'TEACHER' ? 'TEACHER' : 'PARENT',
      recipientLabel: link.recipientLabel ?? null,
      generatedAt: new Date().toISOString(),
      student: {
        displayName: student?.fullName?.trim() || 'পড়ি শিক্ষার্থী',
        selectedClass: student?.selectedClass || 'SSC',
      },
      summary: {
        completedLessons: overview.completedTopicIds?.length ?? 0,
        streakDays: overview.streakDays ?? 0,
        weeklyStudyMinutes,
        weeklyCompletedTasks,
        weeklyTotalTasks: tasksArray.length,
        averageExamAccuracy,
        totalExamsTaken: recentExams.length,
        totalRehearsalsCompleted: Number(completedRehearsals) || 0,
        dueRevisionCount: overview.dueMistakes?.length ?? 0,
      },
      chapterMastery,
      weakTopics: (overview.weakTopics || []).slice(0, 8).map((w) => ({
        topicId: w.topicId,
        titleBangla: w.topicTitle,
        chapterTitleBangla: w.chapterTitle,
        accuracy: w.accuracy,
        attempts: topicMastery[w.topicId]?.attempts ?? w.mistakeCount ?? 0,
      })),
      recentExams,
    };
  }
}
