import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import {
  Shimmer,
  LessonPageSkeleton,
  PracticePageSkeleton,
  CurriculumPageSkeleton,
  SubjectsPageSkeleton,
  ExamPageSkeleton,
  GenericPageSkeleton,
} from '../src/components/ui/shimmer';
import LessonPage from '../src/app/lesson/[topicId]/page';
import PracticeRunnerPage from '../src/app/practice/[chapterId]/page';
import CurriculumPage from '../src/app/curriculum/[subjectId]/page';
import SubjectsPage from '../src/app/subjects/page';
import { apiClient } from '../src/lib/api-client';
import { ContentStatus } from '@pori/shared';

vi.mock('next/navigation', () => ({
  useParams: () => ({ topicId: 'top_ssc_physics_ch1_1', chapterId: 'chap_ssc_physics_ch1', subjectId: 'sub_ssc_physics' }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/lesson/top_ssc_physics_ch1_1',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('Shimmer & Loading States across Pages', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Skeleton Components Direct Rendering', () => {
    it('renders Shimmer base block with custom classes', () => {
      const { container } = render(<Shimmer className="w-20 h-5 my-custom-class" />);
      const block = container.querySelector('[data-testid="shimmer-block"]');
      expect(block).toBeDefined();
      expect(block?.className).toContain('shimmer-effect');
      expect(block?.className).toContain('my-custom-class');
    });

    it('renders LessonPageSkeleton with proper skeleton elements', () => {
      render(<LessonPageSkeleton />);
      expect(screen.getByTestId('lesson-skeleton')).toBeDefined();
      expect(screen.getAllByTestId('shimmer-block').length).toBeGreaterThan(10);
    });

    it('renders PracticePageSkeleton with proper skeleton elements', () => {
      render(<PracticePageSkeleton />);
      expect(screen.getByTestId('practice-skeleton')).toBeDefined();
      expect(screen.getAllByTestId('shimmer-block').length).toBeGreaterThan(5);
    });

    it('renders CurriculumPageSkeleton with proper skeleton elements', () => {
      render(<CurriculumPageSkeleton />);
      expect(screen.getByTestId('curriculum-skeleton')).toBeDefined();
      expect(screen.getAllByTestId('shimmer-block').length).toBeGreaterThan(5);
    });

    it('renders SubjectsPageSkeleton with proper skeleton elements', () => {
      render(<SubjectsPageSkeleton />);
      expect(screen.getByTestId('subjects-skeleton')).toBeDefined();
      expect(screen.getAllByTestId('shimmer-block').length).toBeGreaterThan(5);
    });

    it('renders ExamPageSkeleton and GenericPageSkeleton', () => {
      render(<ExamPageSkeleton />);
      expect(screen.getByTestId('exam-skeleton')).toBeDefined();

      render(<GenericPageSkeleton />);
      expect(screen.getByTestId('generic-skeleton')).toBeDefined();
    });
  });

  describe('Page Integration: Shimmer while data is fetching', () => {
    it('LessonPage shows LessonPageSkeleton while fetching, then displays content', async () => {
      let resolveLesson: (val: any) => void;
      const lessonPromise = new Promise((res) => {
        resolveLesson = res;
      });

      vi.mocked(apiClient.get).mockImplementation(async (endpoint: string) => {
        if (endpoint.startsWith('/lessons/topic/')) {
          return lessonPromise as any;
        }
        return [] as any;
      });

      render(<LessonPage />);

      // While loading, skeleton is visible
      expect(screen.getByTestId('lesson-skeleton')).toBeDefined();
      expect(screen.queryByText('১.১ পদার্থবিজ্ঞান (Physics)')).toBeNull();

      // Resolve API
      resolveLesson!({
        id: 'les_1',
        topicId: 'top_ssc_physics_ch1_1',
        titleBangla: '১.১ পদার্থবিজ্ঞান (Physics)',
        learningGoal: 'শিখনফল লক্ষ্য',
        explanation: 'পদার্থবিজ্ঞান পরিচিতি',
        status: ContentStatus.PUBLISHED,
        version: 1,
      });

      // After resolving, content appears and skeleton disappears
      await waitFor(() => {
        expect(screen.getByText('১.১ পদার্থবিজ্ঞান (Physics)')).toBeDefined();
        expect(screen.queryByTestId('lesson-skeleton')).toBeNull();
      });
    });

    it('PracticeRunnerPage shows PracticePageSkeleton while fetching, then displays content', async () => {
      let resolvePractice: (val: any) => void;
      const practicePromise = new Promise((res) => {
        resolvePractice = res;
      });

      vi.mocked(apiClient.get).mockImplementation(async (endpoint: string) => {
        if (endpoint.includes('/practice/chapter/')) {
          return practicePromise as any;
        }
        return [] as any;
      });

      render(<PracticeRunnerPage />);

      // While loading, skeleton is visible
      expect(screen.getByTestId('practice-skeleton')).toBeDefined();

      // Resolve questions
      resolvePractice!([
        {
          id: 'q_1',
          topicId: 'top_ssc_physics_ch1_1',
          stem: 'ভৌত রাশির পরিমাপ কী?',
          options: [{ id: 'opt_1', text: 'একটি প্রক্রিয়া' }],
          difficulty: 'EASY',
          status: ContentStatus.PUBLISHED,
          version: 1,
        },
      ]);

      await waitFor(() => {
        expect(screen.getByText('ভৌত রাশির পরিমাপ কী?')).toBeDefined();
        expect(screen.queryByTestId('practice-skeleton')).toBeNull();
      });
    });

    it('CurriculumPage shows CurriculumPageSkeleton while fetching, then displays chapters', async () => {
      let resolveCurriculum: (val: any) => void;
      const curriculumPromise = new Promise((res) => {
        resolveCurriculum = res;
      });

      vi.mocked(apiClient.get).mockReturnValue(curriculumPromise as any);

      render(<CurriculumPage />);

      // Skeleton visible
      expect(screen.getByTestId('curriculum-skeleton')).toBeDefined();

      resolveCurriculum!([
        {
          id: 'chap_1',
          subjectId: 'sub_ssc_physics',
          orderIndex: 1,
          titleBangla: 'প্রথম অধ্যায়: গতি ও শক্তি',
          topics: [],
        },
      ]);

      await waitFor(() => {
        expect(screen.getByText('প্রথম অধ্যায়: গতি ও শক্তি')).toBeDefined();
        expect(screen.queryByTestId('curriculum-skeleton')).toBeNull();
      });
    });

    it('SubjectsPage shows SubjectsPageSkeleton while fetching, then displays subjects', async () => {
      let resolveSubjects: (val: any) => void;
      const subjectsPromise = new Promise((res) => {
        resolveSubjects = res;
      });

      vi.mocked(apiClient.get).mockReturnValue(subjectsPromise as any);

      render(<SubjectsPage />);

      // Skeleton visible
      expect(screen.getByTestId('subjects-skeleton')).toBeDefined();

      resolveSubjects!([
        {
          id: 'sub_1',
          code: 'SSC_PHY',
          nameBangla: 'পদার্থবিজ্ঞান ১ম পত্র',
          syllabusYear: 2026,
          classLevel: 'CLASS_9_10',
          isReady: true,
        },
      ]);

      await waitFor(() => {
        expect(screen.getByText('পদার্থবিজ্ঞান ১ম পত্র')).toBeDefined();
        expect(screen.queryByTestId('subjects-skeleton')).toBeNull();
      });
    });
  });
});
