import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PracticeRunnerPage from '../src/app/practice/[chapterId]/page';
import { apiClient } from '../src/lib/api-client';
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

describe('PracticeRunnerPage - Topic-only Practice Filtering', () => {
  const qTopic1 = {
    id: 'q_ch1_1_mcq_1',
    topicId: 'top_ssc_physics_ch1_1',
    type: QuestionType.MCQ,
    stem: "গ্রিক শব্দ *'Fusis'* থেকে 'Physics' বা পদার্থবিজ্ঞান শব্দের উৎপত্তি।",
    options: [
      { id: 'opt_1', text: 'প্রকৃতি (Nature)' },
      { id: 'opt_2', text: 'শক্তি (Energy)' },
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
      { id: 'opt_3', text: '২টি' },
      { id: 'opt_4', text: '৪টি' },
    ],
    difficulty: 'MEDIUM',
    status: ContentStatus.PUBLISHED,
    version: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockParams = { chapterId: 'chap_ssc_physics_ch1' };
    mockSearchParams = new URLSearchParams('topicId=top_ssc_physics_ch1_1');
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
      // Question 1 of Topic 1 should be visible
      expect(screen.getByText(/Fusis/i)).toBeDefined();
      // Total count should only be 1 question
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
});
