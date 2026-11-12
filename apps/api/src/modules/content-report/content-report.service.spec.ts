import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ContentStatus, ReportStatus } from '@prisma/client';
import { ContentReportService } from './content-report.service';

describe('ContentReportService', () => {
  let service: ContentReportService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      lesson: {
        findUnique: vi.fn(),
        updateMany: vi.fn(),
      },
      question: {
        findUnique: vi.fn(),
        updateMany: vi.fn(),
      },
      contentReport: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
      },
      eventLog: {
        create: vi.fn().mockResolvedValue({ id: 'ev_1' }),
      },
    };
    service = new ContentReportService(prisma);
  });

  it('creates an OPEN content report for an existing lesson and resolves topicId', async () => {
    prisma.lesson.findUnique.mockResolvedValue({ id: 'les_1', topicId: 'top_1', status: ContentStatus.PUBLISHED });
    prisma.contentReport.create.mockResolvedValue({
      id: 'rep_1',
      userId: 'user_1',
      contentType: 'LESSON',
      contentId: 'les_1',
      topicId: 'top_1',
      category: 'TYPO_OR_LATEX',
      description: 'সূত্রে $v = u + at$ লেখাটি ভেঙে গেছে',
      status: ReportStatus.OPEN,
      resolutionNote: null,
      createdAt: new Date('2026-11-12T08:00:00Z'),
    });

    const res = await service.submitReport('user_1', {
      contentType: 'LESSON',
      contentId: 'les_1',
      category: 'TYPO_OR_LATEX',
      description: 'সূত্রে $v = u + at$ লেখাটি ভেঙে গেছে',
    });

    expect(res.id).toBe('rep_1');
    expect(res.status).toBe(ReportStatus.OPEN);
    expect(res.topicId).toBe('top_1');
    expect(prisma.contentReport.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: 'user_1',
        contentType: 'LESSON',
        contentId: 'les_1',
        topicId: 'top_1',
        category: 'TYPO_OR_LATEX',
        status: ReportStatus.OPEN,
      }),
    });
  });

  it('throws NotFoundException if reported question does not exist and BadRequestException for blank description', async () => {
    await expect(
      service.submitReport('user_1', {
        contentType: 'QUESTION',
        contentId: 'q_missing',
        category: 'WRONG_ANSWER',
        description: '   ',
      }),
    ).rejects.toThrow(BadRequestException);

    prisma.question.findUnique.mockResolvedValue(null);
    await expect(
      service.submitReport('user_1', {
        contentType: 'QUESTION',
        contentId: 'q_missing',
        category: 'WRONG_ANSWER',
        description: 'সঠিক উত্তর খ হওয়া উচিত',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('lists reports submitted by the authenticated user and returns [] for anonymous', async () => {
    const anon = await service.listMyReports(undefined);
    expect(anon).toEqual([]);

    prisma.contentReport.findMany.mockResolvedValue([
      {
        id: 'rep_2',
        contentType: 'QUESTION',
        contentId: 'q_1',
        topicId: 'top_1',
        category: 'WRONG_ANSWER',
        description: 'বিকল্প ক ভুল',
        status: ReportStatus.RESOLVED,
        resolutionNote: 'উত্তর সংশোধন করা হয়েছে',
        createdAt: new Date('2026-11-12T09:00:00Z'),
      },
    ]);

    const mine = await service.listMyReports('user_1');
    expect(mine).toHaveLength(1);
    expect(mine[0]).toMatchObject({
      id: 'rep_2',
      status: ReportStatus.RESOLVED,
      resolutionNote: 'উত্তর সংশোধন করা হয়েছে',
    });
  });
});
