import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  formatLocalDateIso,
  getDueTasks,
  getUpcomingReminders,
} from '../src/lib/reminders';
import PlannerPage from '../src/app/planner/page';
import DashboardPage from '../src/app/dashboard/page';
import { useUserStore } from '../src/store/user-store';
import { apiClient } from '../src/lib/api-client';

vi.mock('next/navigation', () => ({
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/planner',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../src/lib/guest-session', () => ({
  ensureGuestSession: vi.fn().mockResolvedValue({ token: 'guest-jwt', guestId: 'guest_1' }),
}));

describe('Track 2: Study Planner & Reminders', () => {
  const today = formatLocalDateIso(new Date());

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
      studyPlanTasks: [],
      completedTopics: [],
      savedMistakes: [],
      topicMastery: {},
      examHistory: [],
      bookmarks: [],
      studyDates: [],
    });
  });

  it('computes due tasks and upcoming reminders deterministically', () => {
    const tasks = [
      {
        id: 't1',
        titleBangla: 'নিউটনের সূত্র রিভিশন',
        scheduledDate: today,
        reminderTime: '18:00',
        targetType: 'REVISION',
        completed: false,
      },
      {
        id: 't2',
        titleBangla: 'সম্পন্ন টাস্ক',
        scheduledDate: today,
        reminderTime: '12:00',
        targetType: 'LESSON',
        completed: true,
      },
      {
        id: 't3',
        titleBangla: 'আগামীকালের প্র্যাকটিস',
        scheduledDate: '2099-12-31',
        reminderTime: '20:00',
        targetType: 'PRACTICE',
        completed: false,
      },
    ];

    expect(getDueTasks(tasks, today).map((t) => t.id)).toEqual(['t1']);
    expect(getUpcomingReminders(tasks, today).map((t) => t.id)).toEqual(['t1']);
  });

  it('loads, auto-generates, creates, and toggles study tasks on PlannerPage', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      tasks: [
        {
          id: 't_existing',
          titleBangla: 'ভেক্টর লেসন',
          scheduledDate: today,
          reminderTime: '18:00',
          targetType: 'LESSON',
          completed: false,
        },
      ],
      todayDueCount: 1,
    } as any);

    vi.mocked(apiClient.post).mockImplementation(async (url: string, body: any) => {
      if (url === '/planner/auto-generate') {
        return {
          createdCount: 1,
          tasks: [
            {
              id: 't_auto_1',
              titleBangla: 'বলের সমীকরণ রিভিশন',
              scheduledDate: today,
              reminderTime: '18:00',
              targetType: 'REVISION',
              completed: false,
            },
          ],
        };
      }
      if (url === '/planner') {
        return {
          id: 't_custom_1',
          ...body,
          completed: false,
        };
      }
      return null;
    });

    vi.mocked(apiClient.patch).mockResolvedValueOnce({
      id: 't_existing',
      completed: true,
    } as any);

    render(<PlannerPage />);

    await waitFor(() => {
      expect(screen.getByText('ভেক্টর লেসন')).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /স্মার্ট ৭-দিনের রুটিন তৈরি করো/i }));
    await waitFor(() => {
      expect(screen.getByText('বলের সমীকরণ রিভিশন')).toBeDefined();
    });

    const input = screen.getByPlaceholderText(/আজকের পড়ার লক্ষ্য/i);
    fireEvent.change(input, { target: { value: 'গতির গ্রাফ অনুশীলন' } });
    fireEvent.click(screen.getByRole('button', { name: /নতুন লক্ষ্য যোগ করো/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith(
        '/planner',
        expect.objectContaining({ titleBangla: 'গতির গ্রাফ অনুশীলন' }),
      );
      expect(screen.getByText('গতির গ্রাফ অনুশীলন')).toBeDefined();
    });

    const existingCheckbox = screen.getByRole('checkbox', { name: 'ভেক্টর লেসন' });
    fireEvent.click(existingCheckbox);
    await waitFor(() => {
      expect(apiClient.patch).toHaveBeenCalledWith('/planner/t_existing', {
        completed: true,
      });
    });
  });

  it('renders Today Study Plan widget and Subject Model Test shortcut on DashboardPage', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error('offline'));
    useUserStore.setState({
      studyPlanTasks: [
        {
          id: 'dash_t1',
          titleBangla: 'গতির সূত্র পড়া',
          scheduledDate: today,
          reminderTime: '19:00',
          targetType: 'LESSON',
          completed: false,
        },
      ],
    });

    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('গতির সূত্র পড়া')).toBeDefined();
    });

    const plannerLink = screen.getByRole('link', { name: /স্টাডি প্ল্যানার দেখো/i });
    expect(plannerLink.getAttribute('href')).toBe('/planner');

    const subjectTestLink = screen.getByRole('link', { name: /পূর্ণ বিষয় মডেল টেস্ট/i });
    expect(subjectTestLink.getAttribute('href')).toBe('/exam/subject/sub_ssc_physics');
  });
});
