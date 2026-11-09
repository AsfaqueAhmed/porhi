import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { QuestionBankManager } from '../src/components/admin/question-bank-manager';
import { useAdminAuthStore } from '../src/store/admin-auth-store';
import { apiClient, ApiError } from '../src/lib/api-client';
import type { AdminQuestionItem, ListQuestionsResponse } from '@pori/shared';

vi.mock('../src/lib/api-client', async () => {
  const actual = await vi.importActual<typeof import('../src/lib/api-client')>(
    '../src/lib/api-client',
  );
  return {
    ...actual,
    apiClient: {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  };
});

const mockedApi = vi.mocked(apiClient);

const MOCK_QUESTIONS: AdminQuestionItem[] = [
  {
    id: 'q_motion_mcq_1',
    topicId: 'top_motion_1',
    type: 'MCQ',
    stem: 'স্থির অবস্থান থেকে সুষম ত্বরণে চলমান বস্তুর বেগ কত?',
    options: [
      { id: 'opt_q1_a', text: '4 m/s', isCorrect: true },
      { id: 'opt_q1_b', text: '8 m/s', isCorrect: false },
    ],
    explanation: {
      directAnswer: '4 m/s',
      coreConcept: 'v = u + at',
    },
    cqRubric: null,
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: 'PUBLISHED',
    version: 2,
    createdAt: '2026-11-08T00:00:00Z',
    updatedAt: '2026-11-09T00:00:00Z',
    topic: {
      id: 'top_motion_1',
      titleBangla: 'গতির সমীকরণ',
      chapter: {
        id: 'chap_motion',
        titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
        subject: { id: 'sub_phy', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
      },
    },
  },
  {
    id: 'q_motion_cq_draft',
    topicId: 'top_motion_1',
    type: 'CQ_CREATIVE',
    stem: 'একটি গাড়ি $2\\text{ m/s}^2$ ত্বরণে যাত্রা শুরু করল।',
    options: null,
    explanation: {
      directAnswer: 'ক-ঘ সমাধান',
      coreConcept: 'গতির সূত্র',
    },
    cqRubric: { ka: { mark: 1, criteria: 'ত্বরণ কী?' } },
    difficulty: 'HARD',
    boardSource: 'Rajshahi 2024',
    isVerified: false,
    status: 'DRAFT',
    version: 1,
    createdAt: '2026-11-08T00:00:00Z',
    updatedAt: '2026-11-09T01:00:00Z',
    topic: {
      id: 'top_motion_1',
      titleBangla: 'গতির সমীকরণ',
      chapter: {
        id: 'chap_motion',
        titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
        subject: { id: 'sub_phy', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
      },
    },
  },
];

function mockDefaultApi(items = MOCK_QUESTIONS) {
  const listResponse: ListQuestionsResponse = {
    items,
    total: items.length,
    page: 1,
    limit: 20,
    totalPages: 1,
    statusCounts: {
      ALL: items.length,
      DRAFT: items.filter((q) => q.status === 'DRAFT').length,
      REVIEW: items.filter((q) => q.status === 'REVIEW').length,
      CORRECTION: items.filter((q) => q.status === 'CORRECTION').length,
      PUBLISHED: items.filter((q) => q.status === 'PUBLISHED').length,
      ARCHIVED: items.filter((q) => q.status === 'ARCHIVED').length,
    },
  };

  mockedApi.get.mockImplementation(async (endpoint: string) => {
    if (endpoint === '/curriculum/subjects') {
      return [
        {
          id: 'sub_phy',
          code: 'ssc_physics',
          nameBangla: 'পদার্থবিজ্ঞান',
          classLevel: 'CLASS_9_10',
          syllabusYear: 2026,
          isReady: true,
        },
      ];
    }
    if (endpoint.startsWith('/curriculum/subjects/sub_phy/chapters')) {
      return [
        {
          id: 'chap_motion',
          subjectId: 'sub_phy',
          orderIndex: 2,
          titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
          topics: [
            {
              id: 'top_motion_1',
              chapterId: 'chap_motion',
              orderIndex: 1,
              titleBangla: 'গতির সমীকরণ',
            },
          ],
        },
      ];
    }
    if (endpoint.startsWith('/admin/content/questions')) {
      return listResponse;
    }
    return [];
  });
}

describe('QuestionBankManager', () => {
  beforeEach(() => {
    mockedApi.get.mockReset();
    mockedApi.post.mockReset();
    mockedApi.patch.mockReset();
    useAdminAuthStore.getState().setSession('adm_jwt', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      fullName: 'Asfaque',
      role: 'ADMIN',
    });
  });

  afterEach(() => {
    useAdminAuthStore.getState().logout();
  });

  it('renders fetched questions, status summary, add CTAs, and edit links for ADMIN', async () => {
    mockDefaultApi();
    render(<QuestionBankManager />);

    expect(screen.getByText(/প্রশ্ন ব্যাংক ও তালিকা/i)).toBeDefined();
    expect(await screen.findByText(/স্থির অবস্থান থেকে সুষম ত্বরণে/i)).toBeDefined();
    expect(screen.getByText(/Dhaka Board 2022/i)).toBeDefined();
    expect(screen.getByText(/Rajshahi 2024/i)).toBeDefined();
    expect(screen.getByText(/v2/i)).toBeDefined();

    const addQuestionLink = screen.getByText(/\+ নতুন প্রশ্ন যোগ করুন/i).closest('a');
    expect(addQuestionLink?.getAttribute('href')).toBe('/admin/questions/new');

    const addLessonLink = screen.getByText(/\+ নতুন লেসন যোগ/i).closest('a');
    expect(addLessonLink?.getAttribute('href')).toBe('/admin/questions/new?type=lesson');

    const editLinks = screen.getAllByText(/সম্পাদনা/i);
    expect(editLinks[0].closest('a')?.getAttribute('href')).toBe(
      '/admin/questions/q_motion_mcq_1/edit',
    );
    expect(screen.getAllByText(/^আর্কাইভ$/i)).toHaveLength(2);
  });

  it('enforces role-based actions: EDITOR omits Archive on PUBLISHED, REVIEWER hides Edit & Archive', async () => {
    useAdminAuthStore.getState().setSession('ed_jwt', {
      id: 'ed_1',
      phoneNumber: '01811111111',
      role: 'EDITOR',
    });
    mockDefaultApi();
    const { rerender } = render(<QuestionBankManager />);

    await screen.findByText(/স্থির অবস্থান থেকে সুষম ত্বরণে/i);
    expect(screen.getAllByText(/সম্পাদনা/i)).toHaveLength(2);
    // Only the DRAFT row exposes Archive for EDITOR (not PUBLISHED row)
    expect(screen.getAllByText(/^আর্কাইভ$/i)).toHaveLength(1);

    useAdminAuthStore.getState().setSession('rev_jwt', {
      id: 'rev_1',
      phoneNumber: '01911111111',
      role: 'REVIEWER',
    });
    rerender(<QuestionBankManager />);

    await waitFor(() => {
      expect(screen.queryByText(/সম্পাদনা/i)).toBeNull();
      expect(screen.queryByText(/^আর্কাইভ$/i)).toBeNull();
    });
  });

  it('triggers cascading subject/chapter/topic & status filters and updates API query params', async () => {
    mockDefaultApi();
    render(<QuestionBankManager />);

    await screen.findByText(/স্থির অবস্থান থেকে সুষম ত্বরণে/i);

    const subjectSelect = screen.getByLabelText(/বিষয় ফিল্টার/i);
    fireEvent.change(subjectSelect, { target: { value: 'sub_phy' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_phy/chapters',
        { scope: 'admin' },
      );
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('subjectId=sub_phy'),
        { scope: 'admin' },
      );
    });

    const statusSelect = screen.getByLabelText(/অবস্থা ফিল্টার/i);
    fireEvent.change(statusSelect, { target: { value: 'DRAFT' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('status=DRAFT'),
        { scope: 'admin' },
      );
    });

    const searchInput = screen.getByPlaceholderText(/প্রশ্ন বা বোর্ডের উৎস খুঁজুন/i);
    fireEvent.change(searchInput, { target: { value: 'Dhaka' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('search=Dhaka'),
        { scope: 'admin' },
      );
    });
  });

  it('opens inline archive confirmation modal, calls POST archive, and refreshes list', async () => {
    mockDefaultApi();
    mockedApi.post.mockResolvedValue({ ...MOCK_QUESTIONS[0], status: 'ARCHIVED' });
    render(<QuestionBankManager />);

    await screen.findByText(/স্থির অবস্থান থেকে সুষম ত্বরণে/i);

    const archiveButtons = screen.getAllByText(/^আর্কাইভ$/i);
    fireEvent.click(archiveButtons[0]);

    expect(screen.getByRole('dialog')).toBeDefined();
    const confirmBtn = screen.getByText(/আর্কাইভ নিশ্চিত করুন/i);
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/admin/content/questions/q_motion_mcq_1/archive',
        undefined,
        { scope: 'admin' },
      );
    });
  });

  it('displays role=alert error banner when loading fails with 403', async () => {
    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/admin/content/questions')) {
        throw new ApiError(403, 'Forbidden', { message: 'Forbidden resource' });
      }
      return [];
    });

    render(<QuestionBankManager />);

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('অনুমতি নেই');
  });

  it('supports chapter/topic cascading filters, propagates subjectId/topicId to add CTAs, and resets filters', async () => {
    mockDefaultApi();
    render(<QuestionBankManager />);

    await screen.findByText(/স্থির অবস্থান থেকে সুষম ত্বরণে/i);

    fireEvent.change(screen.getByLabelText(/বিষয় ফিল্টার/i), { target: { value: 'sub_phy' } });

    const chapterSelect = screen.getByLabelText(/অধ্যায় ফিল্টার/i) as HTMLSelectElement;
    await waitFor(() => {
      expect(chapterSelect.disabled).toBe(false);
    });
    fireEvent.change(chapterSelect, { target: { value: 'chap_motion' } });

    const topicSelect = screen.getByLabelText(/টপিক ফিল্টার/i) as HTMLSelectElement;
    await waitFor(() => {
      expect(topicSelect.disabled).toBe(false);
    });
    fireEvent.change(topicSelect, { target: { value: 'top_motion_1' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('topicId=top_motion_1'),
        { scope: 'admin' },
      );
    });

    const addQuestionHref = screen.getByText(/\+ নতুন প্রশ্ন যোগ করুন/i).closest('a')?.getAttribute('href');
    expect(addQuestionHref).toBe('/admin/questions/new?subjectId=sub_phy&topicId=top_motion_1');

    const addLessonHref = screen.getByText(/\+ নতুন লেসন যোগ/i).closest('a')?.getAttribute('href');
    expect(addLessonHref).toBe('/admin/questions/new?type=lesson&subjectId=sub_phy&topicId=top_motion_1');

    fireEvent.click(screen.getByText(/ফিল্টার রিসেট/i));

    await waitFor(() => {
      expect((screen.getByLabelText(/বিষয় ফিল্টার/i) as HTMLSelectElement).value).toBe('');
      expect(screen.getByText(/\+ নতুন প্রশ্ন যোগ করুন/i).closest('a')?.getAttribute('href')).toBe(
        '/admin/questions/new',
      );
    });
  });

  it('advances pagination without spurious search-debounce reset and hides actions for ARCHIVED rows', async () => {
    const archivedItem: AdminQuestionItem = {
      ...MOCK_QUESTIONS[0],
      id: 'q_archived_1',
      stem: 'আর্কাইভ করা প্রশ্ন নমুনা',
      status: 'ARCHIVED',
    };

    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/curriculum/subjects') return [];
      if (endpoint.startsWith('/admin/content/questions')) {
        return {
          items: [archivedItem],
          total: 25,
          page: endpoint.includes('page=2') ? 2 : 1,
          limit: 20,
          totalPages: 2,
          statusCounts: {
            ALL: 0,
            DRAFT: 0,
            REVIEW: 0,
            CORRECTION: 0,
            PUBLISHED: 0,
            ARCHIVED: 1,
          },
        } satisfies ListQuestionsResponse;
      }
      return [];
    });

    render(<QuestionBankManager />);

    await screen.findByText(/আর্কাইভ করা প্রশ্ন নমুনা/i);
    expect(screen.queryByText(/সম্পাদনা/i)).toBeNull();
    expect(screen.queryByText(/^আর্কাইভ$/i)).toBeNull();
    expect(screen.getByText(/Archived: 1/i)).toBeDefined();

    fireEvent.click(screen.getByText(/পরের পাতা/i));

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('page=2'),
        { scope: 'admin' },
      );
    });

    // Wait past 250ms debounce interval to confirm page remains 2
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(screen.getByText(/মোট 25টি প্রশ্ন • পাতা 2 \/ 2/i)).toBeDefined();
  });

  it('shows error banner if archiving fails with 403', async () => {
    mockDefaultApi();
    mockedApi.post.mockRejectedValueOnce(
      new ApiError(403, 'Forbidden', { message: 'Only Admin can archive published questions' }),
    );
    render(<QuestionBankManager />);

    await screen.findByText(/স্থির অবস্থান থেকে সুষম ত্বরণে/i);

    fireEvent.click(screen.getAllByText(/^আর্কাইভ$/i)[0]);
    fireEvent.click(screen.getByText(/আর্কাইভ নিশ্চিত করুন/i));

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('অনুমতি নেই');
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
