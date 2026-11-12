import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PlannerService } from './planner.service';
import { PrismaService } from '../../database/prisma.service';

describe('PlannerService', () => {
  let service: PlannerService;
  let prisma: {
    studyPlanTask: {
      findMany: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
    revisionMistake: {
      findMany: ReturnType<typeof vi.fn>;
    };
    topic: {
      findMany: ReturnType<typeof vi.fn>;
    };
  };

  beforeEach(() => {
    prisma = {
      studyPlanTask: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      revisionMistake: {
        findMany: vi.fn(),
      },
      topic: {
        findMany: vi.fn(),
      },
    };
    service = new PlannerService(prisma as unknown as PrismaService);
  });

  it('lists tasks and computes todayDueCount accurately', async () => {
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

    prisma.studyPlanTask.findMany.mockResolvedValue([
      {
        id: 't1',
        userId: 'user-1',
        titleBangla: 'নিউটনের গতিসূত্র রিভিশন',
        scheduledDate: today,
        completed: false,
        targetType: 'REVISION',
      },
      {
        id: 't2',
        userId: 'user-1',
        titleBangla: 'কাজ, ক্ষমতা ও শক্তি প্র্যাকটিস',
        scheduledDate: today,
        completed: true,
        targetType: 'PRACTICE',
      },
      {
        id: 't3',
        userId: 'user-1',
        titleBangla: 'তরঙ্গ মডেল টেস্ট',
        scheduledDate: tomorrow,
        completed: false,
        targetType: 'MODEL_TEST',
      },
    ]);

    const res = await service.listTasks('user-1');
    expect(res.tasks).toHaveLength(3);
    expect(res.todayDueCount).toBe(1);
  });

  it('creates a custom task for authenticated user', async () => {
    prisma.studyPlanTask.create.mockImplementation(async ({ data }: any) => ({
      id: 'task-new',
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const task = await service.createTask('user-1', {
      titleBangla: 'ভৌত রাশি ও পরিমাপ রিভিশন',
      scheduledDate: '2026-11-12',
      reminderTime: '19:00',
      targetType: 'REVISION',
      subjectId: 'sub_phy',
    });

    expect(task.id).toBe('task-new');
    expect(task.completed).toBe(false);
    expect(prisma.studyPlanTask.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: 'user-1',
        titleBangla: 'ভৌত রাশি ও পরিমাপ রিভিশন',
        scheduledDate: '2026-11-12',
        reminderTime: '19:00',
        targetType: 'REVISION',
      }),
    });
  });

  it('autoGeneratePlan prioritizes unresolved mistake topics and avoids duplicate open topic tasks', async () => {
    prisma.studyPlanTask.findMany.mockResolvedValue([
      { topicId: 'top_already', completed: false },
    ]);
    prisma.revisionMistake.findMany.mockResolvedValue([
      {
        question: {
          topicId: 'top_weak',
          topic: {
            id: 'top_weak',
            titleBangla: 'নিউটনের দ্বিতীয় সূত্র',
            chapterId: 'chap_force',
            chapter: { subjectId: 'sub_phy' },
          },
        },
      },
    ]);
    prisma.topic.findMany.mockResolvedValue([
      {
        id: 'top_already',
        titleBangla: 'ভেক্টর',
        chapterId: 'chap_vec',
        chapter: { subjectId: 'sub_phy' },
      },
      {
        id: 'top_next',
        titleBangla: 'কাজ ও শক্তি',
        chapterId: 'chap_work',
        chapter: { subjectId: 'sub_phy' },
      },
    ]);
    prisma.studyPlanTask.create.mockImplementation(async ({ data }: any) => ({
      id: `auto-${data.topicId}`,
      ...data,
    }));

    const res = await service.autoGeneratePlan('user-1', {
      subjectId: 'sub_phy',
      startDate: '2026-11-12',
    });

    expect(res.createdCount).toBe(2);
    expect(res.tasks[0].topicId).toBe('top_weak');
    expect(res.tasks[0].targetType).toBe('REVISION');
    expect(res.tasks[0].scheduledDate).toBe('2026-11-12');
    expect(res.tasks[1].topicId).toBe('top_next');
    expect(res.tasks[1].scheduledDate).toBe('2026-11-13');
  });

  it('updates task completion and enforces user ownership', async () => {
    prisma.studyPlanTask.findUnique.mockResolvedValue({
      id: 't1',
      userId: 'other-user',
    });

    await expect(
      service.updateTask('user-1', 't1', { completed: true }),
    ).rejects.toThrow(ForbiddenException);

    prisma.studyPlanTask.findUnique.mockResolvedValue({
      id: 't1',
      userId: 'user-1',
      completed: false,
    });
    prisma.studyPlanTask.update.mockImplementation(async ({ data }: any) => ({
      id: 't1',
      userId: 'user-1',
      ...data,
    }));

    const updated = await service.updateTask('user-1', 't1', { completed: true });
    expect(updated.completed).toBe(true);
    expect(updated.completedAt).toBeInstanceOf(Date);
  });

  it('deletes task or throws NotFoundException when missing', async () => {
    prisma.studyPlanTask.findUnique.mockResolvedValue(null);
    await expect(service.deleteTask('user-1', 'missing')).rejects.toThrow(
      NotFoundException,
    );

    prisma.studyPlanTask.findUnique.mockResolvedValue({
      id: 't1',
      userId: 'user-1',
    });
    prisma.studyPlanTask.delete.mockResolvedValue({ id: 't1' });

    const res = await service.deleteTask('user-1', 't1');
    expect(res.deleted).toBe(true);
  });
});
