import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { act, cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
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

async function waitForInitialLoad(expectedQuestionText = /স্থির অবস্থান থেকে সুষম ত্বরণে/i) {
  expect(await screen.findByText(expectedQuestionText)).toBeDefined();
  await waitFor(() => {
    expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    expect(mockedApi.get).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
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
    cleanup();
    act(() => {
      useAdminAuthStore.getState().logout();
    });
  });

  it('renders fetched questions, status summary, add CTAs, and edit links for ADMIN', async () => {
    mockDefaultApi();
    render(<QuestionBankManager />);

    expect(screen.getByText(/প্রশ্ন ব্যাংক ও তালিকা/i)).toBeDefined();
    await waitForInitialLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

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
    act(() => {
      useAdminAuthStore.getState().setSession('ed_jwt', {
        id: 'ed_1',
        phoneNumber: '01811111111',
        role: 'EDITOR',
      });
    });
    mockDefaultApi();
    const { rerender } = render(<QuestionBankManager />);

    await waitForInitialLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

    expect(screen.getAllByText(/সম্পাদনা/i)).toHaveLength(2);
    // Only the DRAFT row exposes Archive for EDITOR (not PUBLISHED row)
    expect(screen.getAllByText(/^আর্কাইভ$/i)).toHaveLength(1);

    act(() => {
      useAdminAuthStore.getState().setSession('rev_jwt', {
        id: 'rev_1',
        phoneNumber: '01911111111',
        role: 'REVIEWER',
      });
    });
    rerender(<QuestionBankManager />);

    await waitFor(() => {
      expect(screen.queryByText(/সম্পাদনা/i)).toBeNull();
      expect(screen.queryByText(/^আর্কাইভ$/i)).toBeNull();
    });
  });

  it('triggers cascading subject/chapter/topic, type & status filters and updates API query params', async () => {
    mockDefaultApi();
    render(<QuestionBankManager />);

    await waitForInitialLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

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
      expect(screen.getByRole('option', { name: 'দ্বিতীয় অধ্যায়: গতি' })).toBeDefined();
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    });

    const typeSelect = screen.getByLabelText(/প্রশ্নের ধরন ফিল্টার/i);
    fireEvent.change(typeSelect, { target: { value: 'CQ_CREATIVE' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('type=CQ_CREATIVE'),
        { scope: 'admin' },
      );
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    });

    fireEvent.change(typeSelect, { target: { value: 'MCQ' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('type=MCQ'),
        { scope: 'admin' },
      );
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    });

    const statusSelect = screen.getByLabelText(/অবস্থা ফিল্টার/i);
    fireEvent.change(statusSelect, { target: { value: 'DRAFT' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('status=DRAFT'),
        { scope: 'admin' },
      );
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    });

    const searchInput = screen.getByPlaceholderText(/প্রশ্ন বা বোর্ডের উৎস খুঁজুন/i);
    fireEvent.change(searchInput, { target: { value: 'Dhaka' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('search=Dhaka'),
        { scope: 'admin' },
      );
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    });
  });

  it('opens inline archive confirmation modal, calls POST archive, closes dialog, shows banner, and refreshes list', async () => {
    mockDefaultApi();
    mockedApi.post.mockResolvedValue({ ...MOCK_QUESTIONS[0], status: 'ARCHIVED' });
    render(<QuestionBankManager />);

    await waitForInitialLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

    const initialQuestionGetCount = mockedApi.get.mock.calls.filter(([endpoint]) =>
      endpoint.startsWith('/admin/content/questions'),
    ).length;

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
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(screen.getByText(/প্রশ্নটি সফলভাবে আর্কাইভ করা হয়েছে/i)).toBeDefined();
      const postArchiveQuestionGetCount = mockedApi.get.mock.calls.filter(([endpoint]) =>
        endpoint.startsWith('/admin/content/questions'),
      ).length;
      expect(postArchiveQuestionGetCount).toBe(initialQuestionGetCount + 1);
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    });

    // Success banner clears when a filter changes
    fireEvent.change(screen.getByLabelText(/অবস্থা ফিল্টার/i), { target: { value: 'DRAFT' } });
    await waitFor(() => {
      expect(screen.queryByText(/প্রশ্নটি সফলভাবে আর্কাইভ করা হয়েছে/i)).toBeNull();
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    });
  });

  it('dismisses archive confirmation modal via Cancel button and Escape key without archiving', async () => {
    mockDefaultApi();
    render(<QuestionBankManager />);

    await waitForInitialLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

    fireEvent.click(screen.getAllByText(/^আর্কাইভ$/i)[0]);
    expect(screen.getByRole('dialog')).toBeDefined();

    fireEvent.click(screen.getByText(/^বাতিল$/i));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(mockedApi.post).not.toHaveBeenCalled();

    fireEvent.click(screen.getAllByText(/^আর্কাইভ$/i)[0]);
    expect(screen.getByRole('dialog')).toBeDefined();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(mockedApi.post).not.toHaveBeenCalled();
  });

  it('displays role=alert error banners for 403, 401, 500, and raw HTML 502 responses without leaking HTML', async () => {
    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/admin/content/questions')) {
        throw new ApiError(403, 'Forbidden', { message: 'Forbidden resource' });
      }
      return [];
    });

    const { unmount } = render(<QuestionBankManager />);
    const alert403 = await screen.findByRole('alert');
    expect(alert403.textContent).toContain('অনুমতি নেই');
    unmount();

    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/admin/content/questions')) {
        throw new ApiError(401, 'Unauthorized', { message: 'Unauthorized' });
      }
      return [];
    });

    const second = render(<QuestionBankManager />);
    const alert401 = await screen.findByRole('alert');
    expect(alert401.textContent).toContain('সেশনের মেয়াদ শেষ হয়েছে');
    second.unmount();

    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/admin/content/questions')) {
        throw new ApiError(500, 'Internal Server Error', {});
      }
      return [];
    });

    const third = render(<QuestionBankManager />);
    const alert500 = await screen.findByRole('alert');
    expect(alert500.textContent).toContain('সার্ভার ত্রুটি ঘটেছে');
    third.unmount();

    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/admin/content/questions')) {
        throw new ApiError(502, 'Bad Gateway', '<html><body>502 Bad Gateway</body></html>');
      }
      return [];
    });

    render(<QuestionBankManager />);
    const alert502 = await screen.findByRole('alert');
    expect(alert502.textContent).toContain('সার্ভার ত্রুটি ঘটেছে');
    expect(alert502.textContent).not.toContain('<html>');
  });

  it('renders empty state CTA when no questions match filters', async () => {
    mockDefaultApi([]);
    render(<QuestionBankManager />);

    await screen.findByText(/নির্বাচিত ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি/i);
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

    const emptyCta = screen.getByText(/^নতুন প্রশ্ন যোগ করুন$/i).closest('a');
    expect(emptyCta?.getAttribute('href')).toBe('/admin/questions/new');
  });

  it('supports chapter/topic cascading filters, propagates subjectId/topicId to add CTAs, and resets filters', async () => {
    mockDefaultApi();
    render(<QuestionBankManager />);

    await waitForInitialLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

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
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
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
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
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

    await waitForInitialLoad(/আর্কাইভ করা প্রশ্ন নমুনা/i);
    expect(screen.queryByText(/সম্পাদনা/i)).toBeNull();
    expect(screen.queryByText(/^আর্কাইভ$/i)).toBeNull();
    expect(screen.getByText(/Archived: 1/i)).toBeDefined();

    fireEvent.click(screen.getByText(/পরের পাতা/i));

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('page=2'),
        { scope: 'admin' },
      );
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    });

    // Wait past 250ms debounce interval to confirm page remains 2
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });
    expect(screen.getByText(/মোট 25টি প্রশ্ন • পাতা 2 \/ 2/i)).toBeDefined();
  });

  it('clamps out-of-range page back to page 1 after archiving the only item on page 2', async () => {
    const page1Item: AdminQuestionItem = {
      ...MOCK_QUESTIONS[0],
      id: 'q_page1_only',
      stem: 'প্রথম পাতার প্রশ্ন',
    };
    const page2Item: AdminQuestionItem = {
      ...MOCK_QUESTIONS[1],
      id: 'q_page2_last',
      stem: 'দ্বিতীয় পাতার শেষ প্রশ্ন',
      status: 'DRAFT',
    };

    let page2Archived = false;
    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/curriculum/subjects') return [];
      if (endpoint.startsWith('/admin/content/questions')) {
        const isPage2 = endpoint.includes('page=2');
        if (!page2Archived) {
          return {
            items: isPage2 ? [page2Item] : [page1Item],
            total: 21,
            page: isPage2 ? 2 : 1,
            limit: 20,
            totalPages: 2,
            statusCounts: {
              ALL: 21,
              DRAFT: 1,
              REVIEW: 0,
              CORRECTION: 0,
              PUBLISHED: 20,
              ARCHIVED: 0,
            },
          } satisfies ListQuestionsResponse;
        }
        return {
          items: isPage2 ? [] : [page1Item],
          total: 20,
          page: isPage2 ? 2 : 1,
          limit: 20,
          totalPages: 1,
          statusCounts: {
            ALL: 20,
            DRAFT: 0,
            REVIEW: 0,
            CORRECTION: 0,
            PUBLISHED: 20,
            ARCHIVED: 1,
          },
        } satisfies ListQuestionsResponse;
      }
      return [];
    });

    mockedApi.post.mockImplementation(async () => {
      page2Archived = true;
      return { ...page2Item, status: 'ARCHIVED' };
    });

    render(<QuestionBankManager />);

    await waitForInitialLoad(/প্রথম পাতার প্রশ্ন/i);
    fireEvent.click(screen.getByText(/পরের পাতা/i));

    await screen.findByText(/দ্বিতীয় পাতার শেষ প্রশ্ন/i);
    expect(screen.getByText(/মোট 21টি প্রশ্ন • পাতা 2 \/ 2/i)).toBeDefined();

    fireEvent.click(screen.getAllByText(/^আর্কাইভ$/i)[0]);
    fireEvent.click(screen.getByText(/আর্কাইভ নিশ্চিত করুন/i));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/admin/content/questions/q_page2_last/archive',
        undefined,
        { scope: 'admin' },
      );
      const questionGetCalls = mockedApi.get.mock.calls
        .map(([endpoint]) => endpoint)
        .filter((endpoint) => endpoint.startsWith('/admin/content/questions'));
      expect(questionGetCalls[questionGetCalls.length - 1]).toContain('page=1');
      expect(screen.getByText(/প্রথম পাতার প্রশ্ন/i)).toBeDefined();
      expect(screen.getByText(/মোট 20টি প্রশ্ন • পাতা 1 \/ 1/i)).toBeDefined();
      expect(screen.getByText(/প্রশ্নটি সফলভাবে আর্কাইভ করা হয়েছে/i)).toBeDefined();
      expect(screen.queryByLabelText('প্রশ্ন লোড হচ্ছে')).toBeNull();
    });
  });

  it('clears stale chapters immediately when switching to another subject', async () => {
    let resolveChemChapters: ((val: unknown) => void) | null = null;
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
          {
            id: 'sub_chem',
            code: 'ssc_chemistry',
            nameBangla: 'রসায়ন',
            classLevel: 'CLASS_9_10',
            syllabusYear: 2026,
            isReady: true,
          },
        ];
      }
      if (endpoint === '/curriculum/subjects/sub_phy/chapters') {
        return [
          {
            id: 'chap_motion',
            subjectId: 'sub_phy',
            orderIndex: 2,
            titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
            topics: [],
          },
        ];
      }
      if (endpoint === '/curriculum/subjects/sub_chem/chapters') {
        return new Promise((resolve) => {
          resolveChemChapters = resolve;
        });
      }
      if (endpoint.startsWith('/admin/content/questions')) {
        return {
          items: MOCK_QUESTIONS,
          total: MOCK_QUESTIONS.length,
          page: 1,
          limit: 20,
          totalPages: 1,
          statusCounts: {
            ALL: 2,
            DRAFT: 1,
            REVIEW: 0,
            CORRECTION: 0,
            PUBLISHED: 1,
            ARCHIVED: 0,
          },
        } satisfies ListQuestionsResponse;
      }
      return [];
    });

    render(<QuestionBankManager />);
    await waitForInitialLoad();
    await screen.findByRole('option', { name: 'রসায়ন' });

    const subjectSelect = screen.getByLabelText(/বিষয় ফিল্টার/i);
    fireEvent.change(subjectSelect, { target: { value: 'sub_phy' } });
    await screen.findByRole('option', { name: 'দ্বিতীয় অধ্যায়: গতি' });

    fireEvent.change(subjectSelect, { target: { value: 'sub_chem' } });
    expect(screen.queryByRole('option', { name: 'দ্বিতীয় অধ্যায়: গতি' })).toBeNull();

    await waitFor(() => {
      expect(resolveChemChapters).not.toBeNull();
    });
    resolveChemChapters!([
      {
        id: 'chap_chem_1',
        subjectId: 'sub_chem',
        orderIndex: 1,
        titleBangla: 'প্রথম অধ্যায়: রসায়নের ধারণা',
        topics: [],
      },
    ]);

    await screen.findByRole('option', { name: 'প্রথম অধ্যায়: রসায়নের ধারণা' });
  });

  it('shows error banner if archiving fails with 403', async () => {
    mockDefaultApi();
    mockedApi.post.mockRejectedValueOnce(
      new ApiError(403, 'Forbidden', { message: 'Only Admin can archive published questions' }),
    );
    render(<QuestionBankManager />);

    await waitForInitialLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

    fireEvent.click(screen.getAllByText(/^আর্কাইভ$/i)[0]);
    fireEvent.click(screen.getByText(/আর্কাইভ নিশ্চিত করুন/i));

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('অনুমতি নেই');
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
