import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PracticeRunnerPage from '../src/app/practice/[chapterId]/page';
import { apiClient } from '../src/lib/api-client';
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
});
