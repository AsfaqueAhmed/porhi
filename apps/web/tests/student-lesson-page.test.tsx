import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LessonPage from '../src/app/lesson/[topicId]/page';
import { apiClient } from '../src/lib/api-client';
import { useUserStore } from '../src/store/user-store';
import { ContentStatus, QuestionType } from '@pori/shared';

let mockTopicParam = 'top_ssc_physics_ch1_1';

vi.mock('next/navigation', () => ({
  useParams: () => ({ topicId: mockTopicParam }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => `/lesson/${mockTopicParam}`,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('LessonPage - MCQ অনুশীলন and Navigation', () => {
  const sampleLessonCh1 = {
    id: 'les_ch1_1',
    topicId: 'top_ssc_physics_ch1_1',
    titleBangla: '১.১ পদার্থবিজ্ঞান (Physics)',
    learningGoal: 'পদার্থবিজ্ঞানের পরিসর ও ক্রমবিকাশ ব্যাখ্যা করতে পারা।',
    explanation: 'পদার্থবিজ্ঞান হলো বিজ্ঞানের একটি প্রাচীনতম শাখা।',
    importantTerms: [
      {
        termBangla: 'প্রাকৃতিক দর্শন',
        termEnglish: 'Natural Philosophy',
        definition: 'প্রকৃতির নিয়ম সম্পর্কিত প্রাচীন অধ্যয়ন।',
      },
    ],
    workedExample: {
      problem: 'পরিমাপের উদাহরণ',
      stepByStepSolution: 'ধাপে ধাপে সমাধান...',
    },
    memoryAid: 'মনে রাখার টেকনিক: প্রকৃতি থেকেই ফিজিক্স।',
    status: ContentStatus.PUBLISHED,
    version: 1,
    topic: {
      id: 'top_ssc_physics_ch1_1',
      titleBangla: '১.১ পদার্থবিজ্ঞান',
      chapter: {
        id: 'chap_ssc_physics_ch1',
        titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
        subject: {
          id: 'sub_ssc_physics',
          code: 'ssc_physics',
          nameBangla: 'পদার্থবিজ্ঞান',
        },
      },
    },
  };

  const sampleCh1Question = {
    id: 'q_ch1_1_mcq_1',
    topicId: 'top_ssc_physics_ch1_1',
    type: QuestionType.MCQ,
    stem: "গ্রিক শব্দ *'Fusis'* থেকে 'Physics' বা পদার্থবিজ্ঞান শব্দের উৎপত্তি। *'Fusis'* শব্দের অর্থ কী?",
    options: [
      { id: 'opt_1_1a', text: 'প্রকৃতি (Nature)' },
      { id: 'opt_1_1b', text: 'শক্তি (Energy)' },
      { id: 'opt_1_1c', text: 'পদার্থ (Matter)' },
      { id: 'opt_1_1d', text: 'মহাবিশ্ব (Cosmos)' },
    ],
    difficulty: 'EASY',
    status: ContentStatus.PUBLISHED,
    version: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockTopicParam = 'top_ssc_physics_ch1_1';
    useUserStore.setState({
      token: null,
      guestId: null,
      completedTopics: [],
      lastVisitedTopic: null,
      topicMastery: {},
      savedMistakes: [],
      bookmarks: [],
      lessonNotes: {},
      studyDates: [],
    });
  });

  it('renders correct chapter practice link and curriculum back link for Chapter 1 lesson (never hardcoded ch-motion)', async () => {
    vi.mocked(apiClient.get).mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/lessons/topic/')) {
        return sampleLessonCh1 as any;
      }
      if (endpoint.includes('/practice/chapter/')) {
        return [sampleCh1Question] as any;
      }
      return null as any;
    });

    render(<LessonPage />);

    await waitFor(() => {
      expect(screen.getByText('১.১ পদার্থবিজ্ঞান (Physics)')).toBeDefined();
    });

    // Check back button links to /curriculum/sub_ssc_physics
    const backBtn = screen.getByText('← অধ্যায় সূচিতে ফেরত যান').closest('a');
    expect(backBtn).toBeDefined();
    expect(backBtn?.getAttribute('href')).toBe('/curriculum/sub_ssc_physics');

    // Check MCQ Practice CTA button links to Chapter 1 practice
    const practiceBtn = screen.getByText('MCQ অনুশীলন শুরু করো').closest('a');
    expect(practiceBtn).toBeDefined();
    expect(practiceBtn?.getAttribute('href')).toBe(
      '/practice/chap_ssc_physics_ch1?topicId=top_ssc_physics_ch1_1'
    );
    expect(practiceBtn?.getAttribute('href')).not.toBe('/practice/ch-motion');
  });

  it('renders Quick Practice card with question matching lesson topic and handles instant answer submission', async () => {
    vi.mocked(apiClient.get).mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/lessons/topic/')) {
        return sampleLessonCh1 as any;
      }
      if (endpoint.includes('/practice/chapter/')) {
        return [sampleCh1Question] as any;
      }
      return null as any;
    });

    vi.mocked(apiClient.post).mockResolvedValueOnce({
      isCorrect: true,
      correctOptionId: 'opt_1_1a',
      explanation: {
        directAnswer: 'সঠিক উত্তর ক: প্রকৃতি (Nature)।',
        coreConcept: "গ্রিক শব্দ *'Fusis'* এর অর্থ হলো প্রকৃতি।",
      },
    });

    render(<LessonPage />);

    // Wait for quick practice to appear
    await waitFor(() => {
      expect(screen.getByText('পাঠের শিখন যাচাই • MCQ অনুশীলন')).toBeDefined();
      expect(screen.getAllByText(/Fusis/i).length).toBeGreaterThan(0);
    });

    // Click correct option
    const natureOpt = screen.getByText('প্রকৃতি (Nature)');
    fireEvent.click(natureOpt);

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/practice/submit', {
        questionId: 'q_ch1_1_mcq_1',
        selectedOptionId: 'opt_1_1a',
      });
      expect(screen.getByText(/চমৎকার! তোমার উত্তর সঠিক হয়েছে/i)).toBeDefined();
      expect(screen.getByText('সঠিক উত্তর ক: প্রকৃতি (Nature)।')).toBeDefined();
    });
  });

  it('correctly maps Chapter 2 topics to chap_ssc_physics_ch2 practice runner', async () => {
    mockTopicParam = 'top_ssc_physics_ch2_7';

    vi.mocked(apiClient.get).mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/lessons/topic/')) {
        return {
          id: 'les_ch2_7',
          topicId: 'top_ssc_physics_ch2_7',
          titleBangla: '২.৭ গতির সমীকরণ',
          learningGoal: 'গতির সমীকরণ প্রতিপাদন',
          explanation: 'গতির সমীকরণসমূহ...',
          status: ContentStatus.PUBLISHED,
          version: 1,
        } as any;
      }
      return [] as any;
    });

    render(<LessonPage />);

    await waitFor(() => {
      expect(screen.getByText('২.৭ গতির সমীকরণ')).toBeDefined();
    });

    const practiceBtn = screen.getByText('MCQ অনুশীলন শুরু করো').closest('a');
    expect(practiceBtn?.getAttribute('href')).toBe(
      '/practice/chap_ssc_physics_ch2?topicId=top_ssc_physics_ch2_7'
    );
  });

  it('records lastVisitedTopic, supports marking lesson complete, saving notes, and renders next/prev topic navigation', async () => {
    mockTopicParam = 'top_ssc_physics_ch1_2';

    vi.mocked(apiClient.get).mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/lessons/topic/')) {
        return {
          ...sampleLessonCh1,
          topicId: 'top_ssc_physics_ch1_2',
          titleBangla: '১.২ পদার্থবিজ্ঞানের পরিসর (Scope of Physics)',
        } as any;
      }
      return [] as any;
    });

    render(<LessonPage />);

    await waitFor(() => {
      expect(screen.getByText('১.২ পদার্থবিজ্ঞানের পরিসর (Scope of Physics)')).toBeDefined();
    });

    expect(useUserStore.getState().lastVisitedTopic?.topicId).toBe('top_ssc_physics_ch1_2');

    // Previous and Next topic links
    const prevLink = screen.getByRole('link', { name: /পূর্ববর্তী টপিক/i });
    const nextLink = screen.getByRole('link', { name: /পরবর্তী টপিক/i });
    expect(prevLink.getAttribute('href')).toBe('/lesson/top_ssc_physics_ch1_1');
    expect(nextLink.getAttribute('href')).toBe('/lesson/top_ssc_physics_ch1_3');

    // Mark complete button
    const completeBtn = screen.getByRole('button', { name: /পাঠ সম্পন্ন করুন/i });
    fireEvent.click(completeBtn);
    expect(useUserStore.getState().completedTopics).toContain('top_ssc_physics_ch1_2');
    expect(screen.getByRole('button', { name: /✓ পাঠ সম্পন্ন/i })).toBeDefined();

    // Open personal note and save
    const noteBtn = screen.getByRole('button', { name: /আমার নোট/i });
    fireEvent.click(noteBtn);
    const noteInput = screen.getByPlaceholderText(/এই পাঠের মূল সূত্র বা নোট লিখে রাখো/i);
    fireEvent.change(noteInput, { target: { value: 'ক্লাসিক্যাল ও মডার্ন ফিজিক্স' } });
    expect(useUserStore.getState().lessonNotes['top_ssc_physics_ch1_2']).toBe('ক্লাসিক্যাল ও মডার্ন ফিজিক্স');
  });

  it('tracks active reading time on lesson-complete, sends Bengali explanation feedback, and opens content error report modal', async () => {
    useUserStore.setState({ token: 'stu_tok_1' } as any);
    vi.mocked(apiClient.get).mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/lessons/topic/')) {
        return sampleLessonCh1 as any;
      }
      return [] as any;
    });
    vi.mocked(apiClient.post).mockResolvedValue({ success: true });

    render(<LessonPage />);

    await waitFor(() => {
      expect(screen.getByText('১.১ পদার্থবিজ্ঞান (Physics)')).toBeDefined();
    });

    // Lesson complete sends timeSpentSeconds
    fireEvent.click(screen.getByRole('button', { name: /পাঠ সম্পন্ন করুন/i }));
    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/student/lesson-complete', {
        topicId: 'top_ssc_physics_ch1_1',
        lessonId: 'les_ch1_1',
        timeSpentSeconds: expect.any(Number),
      });
    });

    // Bengali explanation feedback
    fireEvent.click(screen.getByRole('button', { name: /হ্যাঁ, পরিষ্কার/i }));
    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/student/feedback', {
        contentType: 'LESSON',
        contentId: 'les_ch1_1',
        helpful: true,
      });
    });

    // Report error modal trigger
    fireEvent.click(screen.getByRole('button', { name: /ভুল রিপোর্ট/i }));
    expect(screen.getByText(/কনটেন্ট ভুল রিপোর্ট করো/i)).toBeDefined();
  });
});
