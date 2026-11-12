import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { GuardianService } from './guardian.service';

describe('GuardianService', () => {
  let service: GuardianService;
  let mockPrisma: any;
  let mockStudentService: any;

  beforeEach(() => {
    mockPrisma = {
      guardianShareLink: {
        findUnique: vi.fn(),
        update: vi.fn().mockResolvedValue({}),
      },
      user: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'stu_1',
          fullName: 'তানভীর আহমেদ',
          selectedClass: 'SSC',
          phoneNumber: '+8801711000000',
          passwordHash: 'secret_hash',
        }),
      },
      chapter: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: 'chap_1',
            titleBangla: 'ভৌত রাশি ও পরিমাপ',
            subject: { id: 'sub_ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
            topics: [{ id: 'top_1', titleBangla: 'মৌলিক রাশি' }],
          },
        ]),
      },
      subject: {
        findMany: vi.fn().mockResolvedValue([
          { id: 'sub_ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
        ]),
      },
      studyPlanTask: {
        findMany: vi.fn().mockResolvedValue([
          { status: 'COMPLETED', targetMinutes: 30 },
          { status: 'PENDING', targetMinutes: 25 },
        ]),
      },
      multiExamRehearsal: {
        count: vi.fn().mockResolvedValue(2),
      },
    };

    mockStudentService = {
      getOverview: vi.fn().mockResolvedValue({
        subjectId: 'ALL',
        curriculumTotals: { totalChapters: 1, totalTopics: 1, totalPublishedLessons: 1, totalPublishedQuestions: 10 },
        completedTopicIds: ['top_1'],
        lastStudiedTopic: null,
        practiceStats: {
          totalAttempts: 10,
          correctAttempts: 8,
          accuracyPercent: 80,
          topicMastery: {
            top_1: { attempts: 10, correct: 8, accuracy: 80 },
          },
        },
        streakDays: 4,
        studyDates: ['2026-11-12'],
        dueMistakes: [{ id: 'm1' }],
        weakTopics: [
          {
            topicId: 'top_1',
            topicTitle: 'মৌলিক রাশি',
            chapterId: 'chap_1',
            chapterTitle: 'ভৌত রাশি ও পরিমাপ',
            accuracy: 50,
            mistakeCount: 2,
          },
        ],
        recentExams: [
          {
            sessionId: 'sess_1',
            subjectId: 'sub_ssc_physics',
            chapterId: 'chap_1',
            score: 8,
            totalQuestions: 10,
            durationSeconds: 600,
            completedAt: '2026-11-12T10:00:00.000Z',
          },
        ],
      }),
    };

    service = new GuardianService(mockPrisma, mockStudentService);
  });

  it('throws NotFoundException when shareCode is missing or revoked', async () => {
    mockPrisma.guardianShareLink.findUnique.mockResolvedValueOnce(null);
    await expect(service.getReportByShareCode('missing')).rejects.toThrow(NotFoundException);

    mockPrisma.guardianShareLink.findUnique.mockResolvedValueOnce({
      id: 'link_1',
      shareCode: 'revoked123',
      isActive: false,
      userId: 'stu_1',
      audience: 'PARENT',
    });
    await expect(service.getReportByShareCode('revoked123')).rejects.toThrow(NotFoundException);
  });

  it('builds read-only Parent/Teacher report reusing StudentService metrics without leaking PII', async () => {
    mockPrisma.guardianShareLink.findUnique.mockResolvedValueOnce({
      id: 'link_1',
      shareCode: 'parent123',
      isActive: true,
      userId: 'stu_1',
      audience: 'TEACHER',
      recipientLabel: 'কবির স্যার',
    });

    const report = await service.getReportByShareCode('parent123');
    const serialized = JSON.stringify(report);

    expect(mockStudentService.getOverview).toHaveBeenCalledWith('ALL', 'stu_1');
    expect(report.audience).toBe('TEACHER');
    expect(report.recipientLabel).toBe('কবির স্যার');
    expect(report.student.displayName).toBe('তানভীর আহমেদ');
    expect(report.summary.streakDays).toBe(4);
    expect(report.summary.weeklyStudyMinutes).toBe(30);
    expect(report.summary.weeklyCompletedTasks).toBe(1);
    expect(report.summary.weeklyTotalTasks).toBe(2);
    expect(report.summary.totalRehearsalsCompleted).toBe(2);
    expect(report.chapterMastery).toHaveLength(1);
    expect(report.chapterMastery[0].accuracy).toBe(80);
    expect(report.recentExams[0].subjectNameBangla).toBe('পদার্থবিজ্ঞান');
    expect(serialized).not.toContain('secret_hash');
    expect(serialized).not.toContain('01711000000');
  });
});
