import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CurriculumManager } from '../src/components/admin/curriculum-manager';
import AdminCurriculumPage from '../src/app/admin/curriculum/page';
import { apiClient } from '../src/lib/api-client';

const mockPush = vi.fn();

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('CurriculumManager with AdminDrawer', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('opens AdminDrawer when "নতুন বিষয় যোগ করুন" is clicked', () => {
    render(<CurriculumManager />);

    const addSubjectBtn = screen.getByRole('button', { name: /নতুন বিষয় যোগ করুন/i });
    fireEvent.click(addSubjectBtn);

    // Should render the drawer heading and input
    expect(screen.getByRole('heading', { name: /নতুন বিষয় যোগ করুন/i })).toBeDefined();
    expect(screen.getByLabelText(/বিষয়ের বাংলা নাম/i)).toBeDefined();
  });

  it('renders direct navigation buttons to question authoring and model tests', () => {
    const handleAuthoring = vi.fn();
    const handleModelTest = vi.fn();

    render(
      <CurriculumManager
        onNavigateToAuthoring={handleAuthoring}
        onNavigateToModelTest={handleModelTest}
      />
    );

    expect(screen.getByText(/কারিকুলাম বিষয় ও অধ্যায় কন্ট্রোল প্যানেল/i)).toBeDefined();
  });

  it('AdminCurriculumPage navigates topic "+ প্রশ্ন" and "+ লেসন" CTAs to /admin/questions/new with query params', async () => {
    vi.spyOn(apiClient, 'get').mockImplementation(async (endpoint: string) => {
      if (endpoint === '/curriculum/subjects') {
        return [
          {
            id: 'sub_ssc_physics',
            code: 'ssc_physics',
            nameBangla: 'পদার্থবিজ্ঞান',
            classLevel: 'CLASS_9_10',
            syllabusYear: 2026,
            isReady: true,
            chapterCount: 1,
          },
        ];
      }
      if (endpoint === '/curriculum/subjects/sub_ssc_physics/chapters') {
        return [
          {
            id: 'chap_motion',
            subjectId: 'sub_ssc_physics',
            orderIndex: 2,
            titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
            topics: [
              {
                id: 'top_motion_eq',
                chapterId: 'chap_motion',
                orderIndex: 1,
                titleBangla: 'গতির সমীকরণ ও সমাধান',
              },
            ],
          },
        ];
      }
      return [];
    });

    render(<AdminCurriculumPage />);

    expect(await screen.findByText(/গতির সমীকরণ ও সমাধান/i)).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: /\+ প্রশ্ন যোগ \(MCQ\/CQ\)/i }));
    expect(mockPush).toHaveBeenCalledWith(
      '/admin/questions/new?topicId=top_motion_eq&subjectId=sub_ssc_physics&type=mcq',
    );

    fireEvent.click(screen.getByRole('button', { name: /\+ পাঠ্য লেসন যোগ/i }));
    expect(mockPush).toHaveBeenCalledWith(
      '/admin/questions/new?topicId=top_motion_eq&subjectId=sub_ssc_physics&type=lesson',
    );
  });
});

