import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExamRunnerClient } from '../src/components/student/exam-runner-client';
import { ExamResultView } from '../src/components/student/exam-result-view';
import ProgressPage from '../src/app/progress/page';
import { apiClient } from '../src/lib/api-client';
import { useUserStore } from '../src/store/user-store';

vi.mock('next/navigation', () => ({
  useParams: () => ({ subjectId: 'sub_ssc_physics' }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/exam/subject/sub_ssc_physics',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

vi.mock('../src/lib/guest-session', () => ({
  ensureGuestSession: vi.fn().mockResolvedValue({ token: 'guest-jwt', guestId: 'guest_1' }),
}));

describe('Track 1: Subject Model Tests, Percentiles & History Trends', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    useUserStore.setState({
      token: 'guest-jwt',
      guestId: 'guest_1',
      activeSubject: {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        syllabusYear: 2026,
      },
      examHistory: [],
      topicMastery: {},
      savedMistakes: [],
      completedTopics: [],
    });
  });

  it('starts SUBJECT_TEST without chapterId from ExamRunnerClient in subject mode', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      sessionId: 'sess_sub_1',
      totalQuestions: 25,
      durationSeconds: 1500,
      negativeRatio: 0.25,
      questions: [
        {
          id: 'q1',
          topicId: 'top_1',
          stem: 'বলের এসআই একক কী?',
          options: [
            { id: 'o1', text: 'নিউটন', isCorrect: true },
            { id: 'o2', text: 'জুল', isCorrect: false },
          ],
        },
      ],
    } as any);

    render(<ExamRunnerClient mode="subject" subjectId="sub_ssc_physics" />);

    expect(screen.getByText(/পূর্ণ বিষয় মডেল টেস্ট সেটআপ/i)).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /৫০টি/i }));
    fireEvent.click(screen.getByRole('button', { name: /পরীক্ষা শুরু করো/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith(
        '/exam/start',
        expect.objectContaining({
          testType: 'SUBJECT_TEST',
          subjectId: 'sub_ssc_physics',
          questionLimit: 50,
        }),
      );
    });
  });

  it('displays percentile badge on ExamResultView when percentile is present', () => {
    render(
      <ExamResultView
        result={{
          sessionId: 's1',
          chapterId: 'chap_1',
          chapterTitle: 'পূর্ণ পদার্থবিজ্ঞান মডেল টেস্ট',
          score: 18,
          totalQuestions: 20,
          correctCount: 18,
          wrongCount: 0,
          skippedCount: 2,
          percentile: 88,
          answersWithExplanation: [],
        }}
      />,
    );

    expect(screen.getByText(/পজিশন \/ পারসেন্টাইল/i)).toBeDefined();
    expect(screen.getByText(/৮৮%/)).toBeDefined();
  });

  it('renders GET /exam/history summary, filters, and SVG trend chart on ProgressPage', async () => {
    vi.mocked(apiClient.get).mockImplementation(async (url: string) => {
      if (url.startsWith('/student/overview')) {
        return { completedTopicIds: [], mistakes: [], topicMastery: {}, examHistory: [] };
      }
      if (url.startsWith('/exam/history')) {
        return {
          items: [
            {
              sessionId: 'ses_sub_1',
              testType: 'SUBJECT_TEST',
              subjectId: 'sub_ssc_physics',
              subjectNameBangla: 'পদার্থবিজ্ঞান',
              chapterId: null,
              chapterTitleBangla: null,
              totalQuestions: 25,
              correctCount: 22,
              wrongCount: 2,
              skippedCount: 1,
              score: 21.5,
              accuracyPercent: 88,
              completedAt: '2026-11-12T10:00:00Z',
            },
            {
              sessionId: 'ses_chap_1',
              testType: 'CHAPTER_TEST',
              subjectId: 'sub_ssc_physics',
              subjectNameBangla: 'পদার্থবিজ্ঞান',
              chapterId: 'chap_ssc_physics_ch2',
              chapterTitleBangla: 'অধ্যায় ২: গতি',
              totalQuestions: 10,
              correctCount: 7,
              wrongCount: 2,
              skippedCount: 1,
              score: 6.5,
              accuracyPercent: 70,
              completedAt: '2026-11-10T10:00:00Z',
            },
          ],
          summary: {
            totalTests: 2,
            averageAccuracy: 79,
            bestScorePercent: 88,
            subjectTestsCount: 1,
          },
          trend: [
            {
              sessionId: 'ses_chap_1',
              label: 'অধ্যায় ২: গতি',
              date: '2026-11-10',
              accuracyPercent: 70,
              testType: 'CHAPTER_TEST',
            },
            {
              sessionId: 'ses_sub_1',
              label: 'পদার্থবিজ্ঞান',
              date: '2026-11-12',
              accuracyPercent: 88,
              testType: 'SUBJECT_TEST',
            },
          ],
        };
      }
      return null;
    });

    render(<ProgressPage />);

    await waitFor(() => {
      expect(screen.getByTestId('score-trend-chart')).toBeDefined();
    });

    expect(screen.getByRole('button', { name: /বিষয়ভিত্তিক মডেল টেস্ট/i })).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /বিষয়ভিত্তিক মডেল টেস্ট/i }));

    await waitFor(() => {
      expect(screen.queryByText(/অধ্যায় ২: গতি/)).toBeNull();
    });
  });
});
