import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PracticeRunnerPage from '../src/app/practice/[chapterId]/page';
import { apiClient } from '../src/lib/api-client';
import { ensureGuestSession } from '../src/lib/guest-session';
import { useUserStore } from '../src/store/user-store';
import { ContentStatus, QuestionType } from '@pori/shared';

let mockSearchParams = new URLSearchParams();
let mockParams = { chapterId: 'chap_ssc_physics_ch1' };

vi.mock('next/navigation', () => ({
  useParams: () => mockParams,
  useSearchParams: () => mockSearchParams,
  usePathname: () => `/practice/${mockParams.chapterId}`,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock('../src/lib/guest-session', () => ({
  ensureGuestSession: vi.fn().mockResolvedValue({ token: 'guest-jwt', guestId: 'guest_1' }),
}));

describe('PracticeRunnerPage - Topic-only Practice Filtering & Smart Runner', () => {
  const qTopic1 = {
    id: 'q_ch1_1_mcq_1',
    topicId: 'top_ssc_physics_ch1_1',
    type: QuestionType.MCQ,
    stem: "গ্রিক শব্দ *'Fusis'* থেকে 'Physics' বা পদার্থবিজ্ঞান শব্দের উৎপত্তি।",
    options: [
      { id: 'opt_1', text: 'প্রকৃতি (Nature)', isCorrect: true },
      { id: 'opt_2', text: 'শক্তি (Energy)', isCorrect: false },
    ],
    difficulty: 'EASY',
    status: ContentStatus.PUBLISHED,
    version: 1,
  };

  const qTopic2 = {
    id: 'q_ch1_2_mcq_1',
    topicId: 'top_ssc_physics_ch1_2',
    type: QuestionType.MCQ,
    stem: 'পদার্থবিজ্ঞানের মূল পরিসর কয়টি প্রধান শাখায় বিভক্ত?',
    options: [
      { id: 'opt_3', text: '২টি', isCorrect: true },
      { id: 'opt_4', text: '৪টি', isCorrect: false },
    ],
    difficulty: 'MEDIUM',
    status: ContentStatus.PUBLISHED,
    version: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockParams = { chapterId: 'chap_ssc_physics_ch1' };
    mockSearchParams = new URLSearchParams('topicId=top_ssc_physics_ch1_1');
    useUserStore.setState({
      completedTopics: [],
      lastVisitedTopic: null,
      topicMastery: {},
      savedMistakes: [],
      bookmarks: [],
      lessonNotes: {},
      studyDates: [],
    });
  });

  it('fetches and shows ONLY the MCQs for the requested topic when topicId is present in URL', async () => {
    vi.mocked(apiClient.get).mockImplementation(async (endpoint: string) => {
      if (endpoint.includes('topicId=top_ssc_physics_ch1_1')) {
        return [qTopic1] as any;
      }
      return [qTopic1, qTopic2] as any;
    });

    render(<PracticeRunnerPage />);

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith(
        '/practice/chapter/chap_ssc_physics_ch1/questions?topicId=top_ssc_physics_ch1_1'
      );
      expect(screen.getByText(/Fusis/i)).toBeDefined();
      expect(screen.getByText(/১ \/ ১/)).toBeDefined();
      expect(screen.queryByText(/পদার্থবিজ্ঞানের মূল পরিসর/)).toBeNull();
    });
  });

  it('renders clean empty state with button to practice full chapter if topic has no questions', async () => {
    mockSearchParams = new URLSearchParams('topicId=top_non_existent');

    vi.mocked(apiClient.get).mockResolvedValueOnce([] as any);

    render(<PracticeRunnerPage />);

    await waitFor(() => {
      expect(
        screen.getByText('এই টপিকের জন্য বর্তমানে কোনো MCQ প্রশ্ন পাওয়া যায়নি')
      ).toBeDefined();
      const fullChapterLink = screen.getByText('সম্পূর্ণ অধ্যায় অনুশীলন করো').closest('a');
      expect(fullChapterLink?.getAttribute('href')).toBe('/practice/chap_ssc_physics_ch1');
    });
  });

  it('shows all chapter questions when topicId is not provided (chapter-level practice)', async () => {
    mockSearchParams = new URLSearchParams(); // No topicId

    vi.mocked(apiClient.get).mockResolvedValueOnce([qTopic1, qTopic2] as any);

    render(<PracticeRunnerPage />);

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith(
        '/practice/chapter/chap_ssc_physics_ch1/questions'
      );
      expect(screen.getByText(/১ \/ ২/)).toBeDefined();
    });
  });

  it('supports difficulty filtering (resets currentIndex to 0), records attempts in store, and shows session summary', async () => {
    mockSearchParams = new URLSearchParams(); // Full chapter

    vi.mocked(apiClient.get).mockResolvedValueOnce([qTopic1, qTopic2] as any);
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      isCorrect: false,
      correctOptionId: 'opt_3',
      explanation: {
        directAnswer: 'সঠিক উত্তর ২টি।',
        coreConcept: 'ক্লাসিক্যাল ও আধুনিক পদার্থবিজ্ঞান।',
      },
    });

    render(<PracticeRunnerPage />);

    await waitFor(() => {
      expect(screen.getByText(/১ \/ ২/)).toBeDefined();
    });

    // Move to question 2 first, then filter by MEDIUM to verify index reset
    const nextBtn = screen.getByRole('button', { name: /পরবর্তী প্রশ্ন/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText(/২ \/ ২/)).toBeDefined();

    const mediumFilterBtn = screen.getByRole('button', { name: /মধ্যম/i });
    fireEvent.click(mediumFilterBtn);

    // Should now show 1 / 1 (qTopic2) without crashing
    expect(screen.getByText(/১ \/ ১/)).toBeDefined();
    expect(screen.getByText(/পদার্থবিজ্ঞানের মূল পরিসর/)).toBeDefined();

    // Select wrong answer on qTopic2
    const wrongOpt = screen.getByText('৪টি');
    fireEvent.click(wrongOpt);

    await waitFor(() => {
      expect(useUserStore.getState().savedMistakes.length).toBe(1);
      expect(useUserStore.getState().savedMistakes[0].selectedKey).toBe('৪টি');
      expect(useUserStore.getState().savedMistakes[0].correctKey).toBe('২টি');
      expect(screen.getByText(/অনুশীলন সারসংক্ষেপ/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /ভুল প্রশ্নগুলো আবার অনুশীলন করো/i })).toBeDefined();
    });
  });

  it('switches to Creative (CQ) mode, fetches ?type=CQ_CREATIVE, reveals rubric, and submits 1-10 self-assessment', async () => {
    mockSearchParams = new URLSearchParams();

    const sampleCq = {
      id: 'q_cq_1',
      topicId: 'top_ssc_physics_ch1_5',
      type: 'CQ_CREATIVE',
      stem: 'উদ্দীপক: একটি স্লাইড ক্যালিপার্সের প্রধান স্কেলের পাঠ 2 cm।\n\nক. ভার্নিয়ার ধ্রুবক কী? [১]\nখ. পরিমাপে ত্রুটি কেন হয়? [২]\nগ. ব্যাসার্ধ নির্ণয় করো। [৩]\nঘ. আয়তনের নির্ভুলতা বিশ্লেষণ করো। [৪]',
      options: [],
      cqRubric: {
        ka: { mark: 1, criteria: 'ভার্নিয়ারের ১ ভাগের সাথে প্রধান স্কেলের ১ ভাগের পার্থক্যকে ভার্নিয়ার ধ্রুবক বলে।' },
        kha: { mark: 2, criteria: 'যান্ত্রিক ও ব্যক্তিগত ত্রুটির কারণে পরিমাপে ত্রুটি হয়।' },
        ga: { mark: 3, criteria: 'গ সূত্র প্রয়োগ করে ব্যাসার্ধ নির্ণয়ে ৩ নম্বর।' },
        gha: { mark: 4, criteria: 'আয়তন ও ত্রুটি তুলনাসহ বিশ্লেষণে ৪ নম্বর।' },
      },
      explanation: {
        directAnswer: 'গ. ব্যাসার্ধ 1.02 cm। ঘ. আপেক্ষিক ত্রুটি ২%।',
        coreConcept: 'ভার্নিয়ার পরিমাপ পদ্ধতি।',
      },
      difficulty: 'MEDIUM',
      boardSource: 'Dhaka Board 2024',
      status: ContentStatus.PUBLISHED,
      version: 1,
    };

    vi.mocked(apiClient.get)
      .mockResolvedValueOnce([qTopic1] as any)
      .mockResolvedValueOnce([sampleCq] as any);
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      success: true,
      questionId: 'q_cq_1',
      selfScores: { ka: 1, kha: 2, ga: 2, gha: 3 },
      totalScore: 8,
      maxScore: 10,
    });

    render(<PracticeRunnerPage />);

    await waitFor(() => {
      expect(screen.getByText(/Fusis/i)).toBeDefined();
    });

    // Toggle to Creative (CQ) mode
    fireEvent.click(screen.getByRole('button', { name: /সৃজনশীল \(CQ\)/i }));

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith(
        '/practice/chapter/chap_ssc_physics_ch1/questions?type=CQ_CREATIVE'
      );
      expect(screen.getByText(/স্লাইড ক্যালিপার্সের প্রধান স্কেল/i)).toBeDefined();
      expect(screen.getByText(/Dhaka Board 2024/i)).toBeDefined();
    });

    // Reveal rubric & model answer
    fireEvent.click(screen.getByRole('button', { name: /উত্তর ও মার্কিং রুব্রিক দেখো/i }));
    expect(screen.getByText(/ভার্নিয়ারের ১ ভাগের সাথে/i)).toBeDefined();

    // Update self-scores (ga=2, gha=3)
    const gaInput = screen.getByLabelText(/গ \(প্রয়োগ\)/i);
    const ghaInput = screen.getByLabelText(/ঘ \(উচ্চতর দক্ষতা\)/i);
    fireEvent.change(gaInput, { target: { value: '2' } });
    fireEvent.change(ghaInput, { target: { value: '3' } });

    fireEvent.click(screen.getByRole('button', { name: /স্ব-মূল্যায়ন জমা দাও/i }));

    await waitFor(() => {
      expect(ensureGuestSession).toHaveBeenCalled();
      expect(apiClient.post).toHaveBeenCalledWith('/practice/cq-self-assess', {
        questionId: 'q_cq_1',
        selfScores: { ka: 1, kha: 2, ga: 2, gha: 3 },
      });
      expect(screen.getByText(/স্ব-মূল্যায়ন: ৮ \/ ১০/)).toBeDefined();
    });

    expect(useUserStore.getState().topicMastery['top_ssc_physics_ch1_5']).toBeDefined();
  });
});
