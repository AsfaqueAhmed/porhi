import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardPage from '../src/app/dashboard/page';
import ProgressPage from '../src/app/progress/page';
import { useUserStore } from '../src/store/user-store';
import { apiClient } from '../src/lib/api-client';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useParams: () => ({}),
  usePathname: () => '/dashboard',
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('DashboardPage & ProgressPage Dynamic Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.setState({
      activeSubject: {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        syllabusYear: 2026,
        program: 'SSC',
      },
      streakDays: 3,
      completedTopics: [],
      lastVisitedTopic: null,
      topicMastery: {},
      savedMistakes: [],
      examHistory: [],
      bookmarks: [],
      lessonNotes: {},
      studyDates: [],
    });
  });

  it('renders DashboardPage with 0 activity cleanly (no NaN%), points to first real curriculum topic, and renders live mistakes queue', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error('offline'));

    useUserStore.setState({
      savedMistakes: [
        {
          questionId: 'q_ch3_1',
          stemBangla: 'নিউটনের দ্বিতীয় সূত্র কোনটি?',
          topicId: 'top_ssc_physics_ch3_5',
          topicTitle: '৩.৫ নিউটনের দ্বিতীয় সূত্র ও বল পরিমাপ',
          chapterId: 'chap_ssc_physics_ch3',
          chapterTitle: 'তৃতীয় অধ্যায়: বল (Force)',
          selectedKey: 'B',
          correctKey: 'A',
          explanationBangla: 'F = ma হলো নিউটনের দ্বিতীয় সূত্র।',
          wrongCount: 2,
          resolved: false,
          lastWrongAt: '2026-11-12T00:00:00.000Z',
        },
      ],
    });

    const { container } = render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText(/স্বাগতম/i)).toBeDefined();
    });

    // Never renders NaN
    expect(container.textContent).not.toContain('NaN');

    // Primary continue learning CTA links to first real curriculum topic when lastVisitedTopic is null
    const continueBtn = screen.getByRole('link', { name: /পড়া চালিয়ে যান/i });
    expect(continueBtn.getAttribute('href')).toBe('/lesson/top_ssc_physics_ch1_1');

    // Spaced repetition queue shows the real unresolved mistake topic
    expect(screen.getByText(/৩\.৫ নিউটনের দ্বিতীয় সূত্র ও বল পরিমাপ/i)).toBeDefined();
    const reviewLinks = screen.getAllByRole('link', { name: /রিভিউ শুরু/i });
    expect(reviewLinks[0].getAttribute('href')).toBe(
      '/practice/chap_ssc_physics_ch3?topicId=top_ssc_physics_ch3_5&mode=mistakes'
    );
  });

  it('hydrates DashboardPage from GET /student/overview when server responds', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      streakDays: 5,
      activityDays: ['2026-11-12'],
      lastActivity: {
        topicId: 'top_ssc_physics_ch2_7',
        topicTitle: '২.৭ গতির সমীকরণ (Equations of Motion)',
        chapterId: 'chap_ssc_physics_ch2',
        chapterTitle: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
        timestamp: '2026-11-12T00:00:00.000Z',
      },
      topicStats: {
        top_ssc_physics_ch1_1: {
          completedLesson: true,
          attempted: 4,
          correct: 4,
          accuracyPercent: 100,
          status: 'MASTERED',
        },
      },
      unresolvedMistakes: [],
      recentExams: [],
    });

    render(<DashboardPage />);

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith('/student/overview?subjectId=sub_ssc_physics');
      expect(screen.getByText(/২\.৭ গতির সমীকরণ/i)).toBeDefined();
    });

    const continueBtn = screen.getByRole('link', { name: /পড়া চালিয়ে যান/i });
    expect(continueBtn.getAttribute('href')).toBe('/lesson/top_ssc_physics_ch2_7');
  });

  it('renders dynamic ProgressPage metrics, Chapter Mastery Matrix, Weak Topics, and resolves mistakes in Mistake Notebook', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error('offline'));
    vi.mocked(apiClient.post).mockResolvedValue({ resolvedCount: 1 });

    useUserStore.setState({
      completedTopics: ['top_ssc_physics_ch1_1', 'top_ssc_physics_ch1_2'],
      topicMastery: {
        top_ssc_physics_ch1_1: {
          attempted: 5,
          correct: 4,
          lastPracticedAt: '2026-11-12T00:00:00.000Z',
        },
        top_ssc_physics_ch3_5: {
          attempted: 5,
          correct: 2, // 40% accuracy -> weak topic
          lastPracticedAt: '2026-11-12T00:00:00.000Z',
        },
      },
      savedMistakes: [
        {
          questionId: 'q_mistake_99',
          stemBangla: 'মহাকর্ষীয় ধ্রুবক G এর একক কোনটি?',
          topicId: 'top_ssc_physics_ch3_5',
          topicTitle: '৩.৫ নিউটনের দ্বিতীয় সূত্র ও বল পরিমাপ',
          chapterId: 'chap_ssc_physics_ch3',
          chapterTitle: 'তৃতীয় অধ্যায়: বল (Force)',
          selectedKey: 'খ',
          correctKey: 'ক',
          explanationBangla: 'নিউটন মিটার বর্গ প্রতি কেজি বর্গ।',
          wrongCount: 1,
          resolved: false,
          lastWrongAt: '2026-11-12T00:00:00.000Z',
        },
      ],
      examHistory: [
        {
          examSessionId: 'exam_1',
          chapterId: 'chap_ssc_physics_ch1',
          chapterTitle: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
          score: 9,
          totalQuestions: 10,
          accuracyPercent: 90,
          submittedAt: '2026-11-12T00:00:00.000Z',
        },
      ],
    });

    render(<ProgressPage />);

    await waitFor(() => {
      expect(screen.getByText(/অগ্রগতি ও দুর্বলতা রিপোর্ট/i)).toBeDefined();
    });

    // Total attempted = 10, total correct = 6 -> 60% average accuracy (not hardcoded 78%)
    expect(screen.getByText('৬০%')).toBeDefined();
    expect(screen.queryByText('১৮৪টি প্রশ্নের মধ্যে ১৪৪টি সঠিক')).toBeNull();

    // Chapter Mastery Matrix is rendered
    expect(screen.getByText(/অধ্যায়ভিত্তিক দক্ষতা ম্যাট্রিক্স/i)).toBeDefined();

    // Weak topic report shows top_ssc_physics_ch3_5
    expect(screen.getAllByText(/৩\.৫ নিউটনের দ্বিতীয় সূত্র ও বল পরিমাপ/i).length).toBeGreaterThanOrEqual(1);

    // Mistake notebook shows the unresolved mistake and allows resolving it
    expect(screen.getByText(/মহাকর্ষীয় ধ্রুবক G এর একক কোনটি/i)).toBeDefined();
    const resolveBtn = screen.getByRole('button', { name: /✓ বুঝতে পেরেছি/i });
    fireEvent.click(resolveBtn);

    expect(useUserStore.getState().savedMistakes[0].resolved).toBe(true);
  });
});
