import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  AutoGeneratePlanDto,
  CreateStudyTaskDto,
  UpdateStudyTaskDto,
} from './dto/planner.dto';

function addDaysIso(baseDateIso: string, offsetDays: number): string {
  const base = new Date(`${baseDateIso}T00:00:00.000Z`);
  if (Number.isNaN(base.getTime())) {
    return new Date(Date.now() + offsetDays * 86400000).toISOString().slice(0, 10);
  }
  return new Date(base.getTime() + offsetDays * 86400000)
    .toISOString()
    .slice(0, 10);
}

@Injectable()
export class PlannerService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async listTasks(userId?: string) {
    if (!userId || typeof (this.prisma as any).studyPlanTask?.findMany !== 'function') {
      return { tasks: [], todayDueCount: 0 };
    }

    const tasks = await (this.prisma as any).studyPlanTask.findMany({
      where: { userId },
      orderBy: [{ scheduledDate: 'asc' }, { createdAt: 'asc' }],
      take: 100,
    });

    const today = new Date().toISOString().slice(0, 10);
    const todayDueCount = (tasks as any[]).filter(
      (task) => !task.completed && task.scheduledDate <= today,
    ).length;

    return { tasks, todayDueCount };
  }

  async createTask(userId: string, dto: CreateStudyTaskDto) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    if (!dto?.titleBangla?.trim()) {
      throw new BadRequestException('titleBangla is required');
    }

    return (this.prisma as any).studyPlanTask.create({
      data: {
        userId,
        titleBangla: dto.titleBangla.trim(),
        scheduledDate: dto.scheduledDate,
        reminderTime: dto.reminderTime ?? null,
        targetType: dto.targetType ?? 'CUSTOM',
        subjectId: dto.subjectId ?? null,
        chapterId: dto.chapterId ?? null,
        topicId: dto.topicId ?? null,
        completed: false,
      },
    });
  }

  async autoGeneratePlan(userId: string, dto: AutoGeneratePlanDto = {}) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    const startDate = dto.startDate || new Date().toISOString().slice(0, 10);
    const existingTasks = await (this.prisma as any).studyPlanTask
      .findMany({
        where: { userId, completed: false },
        select: { topicId: true },
      })
      .catch(() => []);

    const scheduledTopicIds = new Set<string>(
      (existingTasks as any[])
        .map((t) => t?.topicId)
        .filter((id): id is string => typeof id === 'string' && id.length > 0),
    );

    const candidates: Array<{
      topicId: string;
      chapterId?: string;
      subjectId?: string;
      titleBangla: string;
      targetType: string;
    }> = [];

    if (typeof (this.prisma.revisionMistake as any)?.findMany === 'function') {
      const mistakes = await (this.prisma.revisionMistake as any)
        .findMany({
          where: { userId, resolved: false },
          include: {
            question: {
              select: {
                topic: {
                  select: {
                    id: true,
                    titleBangla: true,
                    chapterId: true,
                    chapter: { select: { subjectId: true } },
                  },
                },
              },
            },
          },
          take: 14,
        })
        .catch(() => []);

      for (const m of mistakes as any[]) {
        const topic = m?.question?.topic;
        if (!topic?.id || scheduledTopicIds.has(topic.id)) continue;
        if (dto.subjectId && topic.chapter?.subjectId !== dto.subjectId) continue;
        scheduledTopicIds.add(topic.id);
        candidates.push({
          topicId: topic.id,
          chapterId: topic.chapterId,
          subjectId: topic.chapter?.subjectId,
          titleBangla: `${topic.titleBangla} — ভুল সংশোধন ও রিভিশন`,
          targetType: 'REVISION',
        });
      }
    }

    if (candidates.length < 7 && typeof (this.prisma as any).topic?.findMany === 'function') {
      const topicWhere: any = dto.subjectId
        ? { chapter: { subjectId: dto.subjectId } }
        : {};
      const topics = await (this.prisma as any).topic
        .findMany({
          where: topicWhere,
          include: { chapter: { select: { subjectId: true } } },
          orderBy: { orderIndex: 'asc' },
          take: 20,
        })
        .catch(() => []);

      for (const topic of topics as any[]) {
        if (candidates.length >= 7) break;
        if (!topic?.id || scheduledTopicIds.has(topic.id)) continue;
        scheduledTopicIds.add(topic.id);
        candidates.push({
          topicId: topic.id,
          chapterId: topic.chapterId,
          subjectId: topic.chapter?.subjectId,
          titleBangla: `${topic.titleBangla} — লেসন ও অনুশীলন`,
          targetType: 'LESSON',
        });
      }
    }

    const selected = candidates.slice(0, 7);
    const createdTasks: any[] = [];

    for (let i = 0; i < selected.length; i++) {
      const item = selected[i];
      const created = await (this.prisma as any).studyPlanTask.create({
        data: {
          userId,
          subjectId: item.subjectId ?? dto.subjectId ?? null,
          chapterId: item.chapterId ?? null,
          topicId: item.topicId,
          titleBangla: item.titleBangla,
          scheduledDate: addDaysIso(startDate, i),
          reminderTime: '18:00',
          targetType: item.targetType,
          completed: false,
        },
      });
      createdTasks.push(created);
    }

    return {
      createdCount: createdTasks.length,
      tasks: createdTasks,
    };
  }

  async updateTask(userId: string, taskId: string, dto: UpdateStudyTaskDto) {
    const existing = await (this.prisma as any).studyPlanTask.findUnique({
      where: { id: taskId },
    });

    if (!existing) {
      throw new NotFoundException(`Study task not found with id: ${taskId}`);
    }
    if (existing.userId !== userId) {
      throw new ForbiddenException('You do not have access to this study task');
    }

    const data: Record<string, any> = {};
    if (dto.completed !== undefined) {
      data.completed = dto.completed;
      data.completedAt = dto.completed ? new Date() : null;
    }
    if (dto.titleBangla !== undefined) {
      data.titleBangla = dto.titleBangla.trim();
    }
    if (dto.scheduledDate !== undefined) {
      data.scheduledDate = dto.scheduledDate;
    }
    if (dto.reminderTime !== undefined) {
      data.reminderTime = dto.reminderTime;
    }

    return (this.prisma as any).studyPlanTask.update({
      where: { id: taskId },
      data,
    });
  }

  async deleteTask(userId: string, taskId: string) {
    const existing = await (this.prisma as any).studyPlanTask.findUnique({
      where: { id: taskId },
    });

    if (!existing) {
      throw new NotFoundException(`Study task not found with id: ${taskId}`);
    }
    if (existing.userId !== userId) {
      throw new ForbiddenException('You do not have access to this study task');
    }

    await (this.prisma as any).studyPlanTask.delete({
      where: { id: taskId },
    });

    return { deleted: true, id: taskId };
  }
}
