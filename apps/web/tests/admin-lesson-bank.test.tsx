import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import type { AdminLessonItem, ListLessonsResponse } from '@pori/shared';
import AdminLessonsPage from '../src/app/admin/curriculum/lessons/page';
import { LessonBankManager } from '../src/components/admin/lessons/LessonBankManager';
import { LessonDetailDrawer } from '../src/components/admin/lessons/LessonDetailDrawer';
import { apiClient, ApiError } from '../src/lib/api-client';
import { useAdminAuthStore } from '../src/store/admin-auth-store';

let mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/curriculum/lessons',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => mockSearchParams,
}));

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

const MOCK_LESSONS: AdminLessonItem[] = [
  {
    id: 'les_motion_1',
    topicId: 'top_motion_1',
    titleBangla: 'নিউটনের গতির সূত্রাবলী',
    learningGoal: 'নিউটনের তিনটি সূত্র ব্যাখ্যা করা',
    explanation: 'বল $F = ma$ এবং জড়তা বোঝা।',
    importantTerms: [
      { termBangla: 'জড়তা', termEnglish: 'Inertia', definition: 'অবস্থা পরিবর্তনে বাধা' },
    ],
    workedExample: {
      problem: '$5\\text{ kg}$ বস্তুর ত্বরণ $2\\text{ m/s}^2$ হলে বল কত?',
      stepByStepSolution: '$F = 5 \\times 2 = 10\\text{ N}$',
    },
    memoryAid: 'প্রথম জড়তা, দ্বিতীয় F=ma',
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
    id: 'les_draft_2',
    topicId: 'top_motion_1',
    titleBangla: 'ভরবেগ ও সংঘর্ষ',
    learningGoal: 'ভরবেগের সংরক্ষণ সূত্র প্রয়োগ',
    explanation: '$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$',
    importantTerms: [{ termBangla: 'ভরবেগ' }],
    workedExample: null,
    memoryAid: null,
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

function mockDefaultLessonsApi(items = MOCK_LESSONS) {
  const response: ListLessonsResponse = {
    items,
    total: items.length,
    page: 1,
    limit: 20,
    totalPages: 1,
    statusCounts: {
      ALL: items.length,
      DRAFT: items.filter((l) => l.status === 'DRAFT').length,
      REVIEW: items.filter((l) => l.status === 'REVIEW').length,
      CORRECTION: items.filter((l) => l.status === 'CORRECTION').length,
      PUBLISHED: items.filter((l) => l.status === 'PUBLISHED').length,
      ARCHIVED: items.filter((l) => l.status === 'ARCHIVED').length,
    },
  };

  mockedApi.get.mockImplementation(async (endpoint: string) => {
    if (endpoint === '/curriculum/subjects') {
      return [{ id: 'sub_phy', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' }];
    }
    if (endpoint === '/curriculum/subjects/sub_phy/chapters') {
      return [
        {
          id: 'chap_motion',
          titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
          topics: [{ id: 'top_motion_1', titleBangla: 'গতির সমীকরণ' }],
        },
      ];
    }
    if (endpoint.startsWith('/admin/content/lessons')) {
      return response;
    }
    return [];
  });
}

async function waitForInitialLessonsLoad(expectedTitle = /নিউটনের গতির সূত্রাবলী/i) {
  expect(await screen.findByText(expectedTitle)).toBeDefined();
  await waitFor(() => {
    expect(screen.queryByLabelText('লেসন লোড হচ্ছে')).toBeNull();
    expect(mockedApi.get).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
  });
}

describe('LessonBankManager & AdminLessonsPage', () => {
  beforeEach(() => {
    mockedApi.get.mockReset();
    mockedApi.post.mockReset();
    mockedApi.patch.mockReset();
    mockSearchParams = new URLSearchParams();
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

  it('AdminLessonsPage pre-filters from URL query params and preserves them on "+ নতুন লেসন যোগ" href', async () => {
    mockSearchParams = new URLSearchParams('subjectId=sub_phy&topicId=top_motion_1');
    mockDefaultLessonsApi();

    render(<AdminLessonsPage />);

    await waitForInitialLessonsLoad();
    await screen.findByRole('option', { name: 'দ্বিতীয় অধ্যায়: গতি' });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_phy/chapters',
        { scope: 'admin' },
      );
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('subjectId=sub_phy'),
        { scope: 'admin' },
      );
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('topicId=top_motion_1'),
        { scope: 'admin' },
      );
      expect((screen.getByLabelText(/বিষয় ফিল্টার/i) as HTMLSelectElement).value).toBe('sub_phy');
      expect((screen.getByLabelText(/অধ্যায় ফিল্টার/i) as HTMLSelectElement).value).toBe(
        'chap_motion',
      );
      expect((screen.getByLabelText(/টপিক ফিল্টার/i) as HTMLSelectElement).value).toBe(
        'top_motion_1',
      );
    });

    const addLink = screen.getByText(/\+ নতুন লেসন যোগ/i).closest('a');
    expect(addLink?.getAttribute('href')).toBe(
      '/admin/curriculum/lessons/new?subjectId=sub_phy&topicId=top_motion_1',
    );
  });

  it('renders lesson bank table, status counts, terminology pills, and enforces ADMIN / EDITOR / REVIEWER RBAC', async () => {
    mockDefaultLessonsApi();
    const { rerender } = render(<LessonBankManager />);

    await waitForInitialLessonsLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

    expect(screen.getByText(/সর্বমোট: 2/i)).toBeDefined();
    expect(screen.getByText(/Published: 1/i)).toBeDefined();
    expect(screen.getByText(/Draft: 1/i)).toBeDefined();
    expect(screen.getAllByText(/1টি পরিভাষা/i)).toHaveLength(2);
    expect(screen.getByText(/v2/i)).toBeDefined();
    expect(screen.getByText(/v1/i)).toBeDefined();

    // ADMIN sees Add, Edit, and Archive on both PUBLISHED and DRAFT rows
    expect(screen.getByText(/\+ নতুন লেসন যোগ/i).closest('a')?.getAttribute('href')).toBe(
      '/admin/curriculum/lessons/new',
    );
    const editLinks = screen.getAllByText(/^সম্পাদনা$/i);
    expect(editLinks).toHaveLength(2);
    expect(editLinks[0].closest('a')?.getAttribute('href')).toBe(
      '/admin/curriculum/lessons/les_motion_1/edit',
    );
    expect(screen.getAllByText(/^আর্কাইভ$/i)).toHaveLength(2);

    // EDITOR can edit both and archive DRAFT, but cannot archive PUBLISHED
    act(() => {
      useAdminAuthStore.getState().setSession('ed_jwt', {
        id: 'ed_1',
        phoneNumber: '01811111111',
        role: 'EDITOR',
      });
    });
    rerender(<LessonBankManager />);
    await waitFor(() => {
      expect(screen.getByText(/\+ নতুন লেসন যোগ/i)).toBeDefined();
      expect(screen.getAllByText(/^সম্পাদনা$/i)).toHaveLength(2);
      expect(screen.getAllByText(/^আর্কাইভ$/i)).toHaveLength(1);
    });

    // REVIEWER hides Add, Edit, and Archive actions while keeping "বিস্তারিত দেখুন"
    act(() => {
      useAdminAuthStore.getState().setSession('rev_jwt', {
        id: 'rev_1',
        phoneNumber: '01911111111',
        role: 'REVIEWER',
      });
    });
    rerender(<LessonBankManager />);
    await waitFor(() => {
      expect(screen.queryByText(/\+ নতুন লেসন যোগ/i)).toBeNull();
      expect(screen.queryByText(/^সম্পাদনা$/i)).toBeNull();
      expect(screen.queryByText(/^আর্কাইভ$/i)).toBeNull();
      expect(screen.getAllByRole('button', { name: /বিস্তারিত দেখুন/i })).toHaveLength(2);
    });
  });

  it('opens LessonDetailDrawer via "বিস্তারিত দেখুন" and clickable title button, guards whitespace-only JSON fields, and closes via Escape, "বন্ধ করুন", and backdrop', async () => {
    const lessonWithWhitespaceFields: AdminLessonItem = {
      ...MOCK_LESSONS[0],
      importantTerms: [
        { termBangla: 'বেগ', termEnglish: '   ', definition: '   ' },
        { termBangla: '   ', termEnglish: 'Ignored', definition: 'Should be skipped' },
      ],
      workedExample: { problem: '   ', stepByStepSolution: '   ' },
      memoryAid: '   ',
      createdAt: '   ',
    };
    mockDefaultLessonsApi([lessonWithWhitespaceFields, MOCK_LESSONS[1]]);
    render(<LessonBankManager />);

    await waitForInitialLessonsLoad();

    // 1. Open via clickable title button and confirm it has block styling
    const titleButton = screen.getByRole('button', { name: /^নিউটনের গতির সূত্রাবলী/i });
    expect(titleButton.className).toContain('block');
    fireEvent.click(titleButton);

    const drawer = screen.getByRole('dialog', { name: /লেসনের বিস্তারিত/i });
    expect(drawer).toBeDefined();
    expect(within(drawer).getByText(/ID: les_motion_1/i)).toBeDefined();
    expect(within(drawer).getByText(/নিউটনের তিনটি সূত্র ব্যাখ্যা করা/i)).toBeDefined();
    expect(within(drawer).getByText('বেগ')).toBeDefined();
    expect(within(drawer).getByText(/তৈরি: —/i)).toBeDefined();

    // Whitespace-only optional JSON/string fields must NOT render empty cards
    expect(within(drawer).queryByText('Ignored')).toBeNull();
    expect(within(drawer).queryByText(/গাণিতিক উদাহরণ/i)).toBeNull();
    expect(within(drawer).queryByText(/মনে রাখার টেকনিক/i)).toBeNull();

    // Close via footer "বন্ধ করুন" button
    fireEvent.click(within(drawer).getByText('বন্ধ করুন'));
    expect(screen.queryByRole('dialog', { name: /লেসনের বিস্তারিত/i })).toBeNull();

    // 2. Open via "বিস্তারিত দেখুন" and close via backdrop click
    fireEvent.click(screen.getAllByRole('button', { name: /বিস্তারিত দেখুন/i })[0]);
    const reopenedDrawer = screen.getByRole('dialog', { name: /লেসনের বিস্তারিত/i });
    const backdrop = reopenedDrawer.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop);
    expect(screen.queryByRole('dialog', { name: /লেসনের বিস্তারিত/i })).toBeNull();

    // 3. Open second lesson via "বিস্তারিত দেখুন" and close via Escape
    fireEvent.click(screen.getAllByRole('button', { name: /বিস্তারিত দেখুন/i })[1]);
    expect(screen.getByRole('dialog', { name: /লেসনের বিস্তারিত/i })).toBeDefined();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /লেসনের বিস্তারিত/i })).toBeNull();
  });

  it('renders rich workedExample & memoryAid in drawer, coordinates Escape with archive confirmation modal, and archives DRAFT lesson cleanly', async () => {
    mockDefaultLessonsApi();
    mockedApi.post.mockResolvedValueOnce({ ...MOCK_LESSONS[1], status: 'ARCHIVED' });
    render(<LessonBankManager />);

    await waitForInitialLessonsLoad();

    // Open PUBLISHED lesson drawer and confirm workedExample & memoryAid render
    fireEvent.click(screen.getAllByRole('button', { name: /বিস্তারিত দেখুন/i })[0]);
    const pubDrawer = screen.getByRole('dialog', { name: /লেসনের বিস্তারিত/i });
    expect(within(pubDrawer).getByText(/গাণিতিক উদাহরণ/i)).toBeDefined();
    expect(within(pubDrawer).getByText(/মনে রাখার টেকনিক/i)).toBeDefined();
    expect(within(pubDrawer).getByText(/প্রথম জড়তা, দ্বিতীয় F=ma/i)).toBeDefined();
    expect(
      within(pubDrawer).getByText(/সম্পাদনা করুন/i).closest('a')?.getAttribute('href'),
    ).toBe('/admin/curriculum/lessons/les_motion_1/edit');
    fireEvent.click(within(pubDrawer).getByText('বন্ধ করুন'));

    // Open DRAFT lesson drawer
    fireEvent.click(screen.getAllByRole('button', { name: /বিস্তারিত দেখুন/i })[1]);
    expect(screen.getByRole('dialog', { name: /লেসনের বিস্তারিত/i })).toBeDefined();

    // Click Archive inside drawer -> confirmation modal opens ON TOP of drawer
    fireEvent.click(screen.getByRole('button', { name: /আর্কাইভ করুন/i }));
    expect(screen.getByRole('dialog', { name: /লেসন আর্কাইভ নিশ্চিতকরণ/i })).toBeDefined();
    expect(screen.getByRole('dialog', { name: /লেসনের বিস্তারিত/i })).toBeDefined();

    // Escape closes ONLY confirmation modal while keeping drawer open
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /লেসন আর্কাইভ নিশ্চিতকরণ/i })).toBeNull();
    expect(screen.getByRole('dialog', { name: /লেসনের বিস্তারিত/i })).toBeDefined();

    // Re-open archive confirmation modal and confirm
    fireEvent.click(screen.getByRole('button', { name: /আর্কাইভ করুন/i }));
    fireEvent.click(screen.getByText(/আর্কাইভ নিশ্চিত করুন/i));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/admin/content/lessons/les_draft_2/archive',
        undefined,
        { scope: 'admin' },
      );
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(screen.getByText(/লেসনটি সফলভাবে আর্কাইভ করা হয়েছে/i)).toBeDefined();
    });
  });

  it('clears BOTH confirmation modal and LessonDetailDrawer when archiving fails from inside the drawer so role="alert" is visible', async () => {
    mockDefaultLessonsApi();
    mockedApi.post.mockRejectedValueOnce(
      new ApiError(403, 'Forbidden', { message: 'Only Admin can archive published lessons' }),
    );
    render(<LessonBankManager />);

    await waitForInitialLessonsLoad();

    fireEvent.click(screen.getAllByRole('button', { name: /বিস্তারিত দেখুন/i })[0]);
    expect(screen.getByRole('dialog', { name: /লেসনের বিস্তারিত/i })).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: /আর্কাইভ করুন/i }));
    fireEvent.click(screen.getByText(/আর্কাইভ নিশ্চিত করুন/i));

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('অনুমতি নেই');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('supports cascading filters, debounced search, filter reset, pagination, and displays 403/500 role="alert" errors', async () => {
    mockDefaultLessonsApi();
    const { unmount } = render(<LessonBankManager />);

    await waitForInitialLessonsLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

    fireEvent.change(screen.getByLabelText(/বিষয় ফিল্টার/i), { target: { value: 'sub_phy' } });
    const chapterSelect = screen.getByLabelText(/অধ্যায় ফিল্টার/i) as HTMLSelectElement;
    await waitFor(() => expect(chapterSelect.disabled).toBe(false));
    fireEvent.change(chapterSelect, { target: { value: 'chap_motion' } });

    const topicSelect = screen.getByLabelText(/টপিক ফিল্টার/i) as HTMLSelectElement;
    await waitFor(() => expect(topicSelect.disabled).toBe(false));
    fireEvent.change(topicSelect, { target: { value: 'top_motion_1' } });

    fireEvent.change(screen.getByLabelText(/অবস্থা ফিল্টার/i), { target: { value: 'DRAFT' } });
    fireEvent.change(screen.getByPlaceholderText(/লেসনের শিরোনাম বা শিখনফল খুঁজুন/i), {
      target: { value: 'ভরবেগ' },
    });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('topicId=top_motion_1'),
        { scope: 'admin' },
      );
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('status=DRAFT'),
        { scope: 'admin' },
      );
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('search=%E0%A6%AD%E0%A6%B0%E0%A6%AC%E0%A7%87%E0%A6%97'),
        { scope: 'admin' },
      );
    });

    fireEvent.click(screen.getByText(/ফিল্টার রিসেট/i));
    await waitFor(() => {
      expect((screen.getByLabelText(/বিষয় ফিল্টার/i) as HTMLSelectElement).value).toBe('');
      expect(screen.getByText(/\+ নতুন লেসন যোগ/i).closest('a')?.getAttribute('href')).toBe(
        '/admin/curriculum/lessons/new',
      );
    });
    unmount();

    // 403 error
    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/admin/content/lessons')) {
        throw new ApiError(403, 'Forbidden', { message: 'Forbidden' });
      }
      return [];
    });
    const forbiddenView = render(<LessonBankManager />);
    const alert403 = await screen.findByRole('alert');
    expect(alert403.textContent).toContain('অনুমতি নেই');
    forbiddenView.unmount();

    // 500 error & REVIEWER empty state hides Add CTA
    act(() => {
      useAdminAuthStore.getState().setSession('rev_jwt', {
        id: 'rev_1',
        phoneNumber: '01911111111',
        role: 'REVIEWER',
      });
    });
    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/admin/content/lessons')) {
        throw new ApiError(500, 'Internal Server Error', {});
      }
      return [];
    });
    const serverErrorView = render(<LessonBankManager />);
    const alert500 = await screen.findByRole('alert');
    expect(alert500.textContent).toContain('সার্ভার ত্রুটি ঘটেছে');
    serverErrorView.unmount();

    mockDefaultLessonsApi([]);
    render(<LessonBankManager />);
    await screen.findByText(/নির্বাচিত ফিল্টারে কোনো লেসন পাওয়া যায়নি/i);
    expect(screen.queryByText(/নতুন লেসন যোগ করুন/i)).toBeNull();
  });

  it('hides Edit/Archive on ARCHIVED rows & drawer, advances pagination, clamps page on archive, and strips HTML on 502', async () => {
    const page1Item: AdminLessonItem = {
      ...MOCK_LESSONS[0],
      id: 'les_page1',
      titleBangla: 'প্রথম পাতার লেসন',
      status: 'ARCHIVED',
    };
    const page2Item: AdminLessonItem = {
      ...MOCK_LESSONS[1],
      id: 'les_page2_last',
      titleBangla: 'দ্বিতীয় পাতার শেষ লেসন',
      status: 'DRAFT',
    };

    let page2Archived = false;
    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/curriculum/subjects') return [];
      if (endpoint.startsWith('/admin/content/lessons')) {
        const isPage2 = endpoint.includes('page=2');
        if (!page2Archived) {
          return {
            items: isPage2 ? [page2Item] : [page1Item],
            total: 21,
            page: isPage2 ? 2 : 1,
            limit: 20,
            totalPages: 2,
            statusCounts: {
              ALL: 20,
              DRAFT: 1,
              REVIEW: 0,
              CORRECTION: 0,
              PUBLISHED: 19,
              ARCHIVED: 1,
            },
          } satisfies ListLessonsResponse;
        }
        return {
          items: isPage2 ? [] : [page1Item],
          total: 20,
          page: isPage2 ? 2 : 1,
          limit: 20,
          totalPages: 1,
          statusCounts: {
            ALL: 19,
            DRAFT: 0,
            REVIEW: 0,
            CORRECTION: 0,
            PUBLISHED: 19,
            ARCHIVED: 2,
          },
        } satisfies ListLessonsResponse;
      }
      return [];
    });
    mockedApi.post.mockImplementation(async () => {
      page2Archived = true;
      return { ...page2Item, status: 'ARCHIVED' };
    });

    const firstView = render(<LessonBankManager />);
    await waitForInitialLessonsLoad(/প্রথম পাতার লেসন/i);
    expect(screen.queryByText(/^সম্পাদনা$/i)).toBeNull();
    expect(screen.queryByText(/^আর্কাইভ$/i)).toBeNull();
    expect(screen.getByText(/Archived: 1/i)).toBeDefined();

    // Open ARCHIVED lesson drawer -> Edit & Archive also hidden
    fireEvent.click(screen.getByRole('button', { name: /বিস্তারিত দেখুন/i }));
    expect(screen.queryByText(/সম্পাদনা করুন/i)).toBeNull();
    expect(screen.queryByRole('button', { name: /আর্কাইভ করুন/i })).toBeNull();
    fireEvent.click(screen.getByText('বন্ধ করুন'));

    // Advance to page 2 and archive last item -> clamps back to page 1
    fireEvent.click(screen.getByText(/পরের পাতা/i));
    await screen.findByText(/দ্বিতীয় পাতার শেষ লেসন/i);
    expect(screen.getByText(/মোট 21টি লেসন • পাতা 2 \/ 2/i)).toBeDefined();

    fireEvent.click(screen.getByText(/^আর্কাইভ$/i));
    fireEvent.click(screen.getByText(/আর্কাইভ নিশ্চিত করুন/i));

    await waitFor(() => {
      const lessonGetCalls = mockedApi.get.mock.calls
        .map(([endpoint]) => endpoint)
        .filter((endpoint) => endpoint.startsWith('/admin/content/lessons'));
      expect(lessonGetCalls[lessonGetCalls.length - 1]).toContain('page=1');
      expect(screen.getByText(/মোট 20টি লেসন • পাতা 1 \/ 1/i)).toBeDefined();
    });
    firstView.unmount();

    // HTML 502 error sanitization
    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint.startsWith('/admin/content/lessons')) {
        throw new ApiError(502, 'Bad Gateway', '<html><body>502 Bad Gateway</body></html>');
      }
      return [];
    });
    render(<LessonBankManager />);
    const alert502 = await screen.findByRole('alert');
    expect(alert502.textContent).toContain('সার্ভার ত্রুটি ঘটেছে');
    expect(alert502.textContent).not.toContain('<html>');
  });

  it('enforces EDITOR and REVIEWER RBAC directly inside LessonDetailDrawer and encodes lesson ID in Edit href', () => {
    const encodedIdLesson: AdminLessonItem = {
      ...MOCK_LESSONS[0],
      id: 'les/special?id=1',
    };
    const onClose = vi.fn();
    const onRequestArchive = vi.fn();

    // EDITOR on PUBLISHED: Edit visible (URL-encoded), Archive hidden, Close visible
    const { rerender } = render(
      <LessonDetailDrawer
        lesson={encodedIdLesson}
        isOpen
        onClose={onClose}
        canEdit
        isAdmin={false}
        onRequestArchive={onRequestArchive}
      />,
    );
    const editLink = screen.getByText(/সম্পাদনা করুন/i).closest('a');
    expect(editLink?.getAttribute('href')).toBe(
      `/admin/curriculum/lessons/${encodeURIComponent('les/special?id=1')}/edit`,
    );
    expect(screen.queryByRole('button', { name: /আর্কাইভ করুন/i })).toBeNull();
    expect(screen.getByText('বন্ধ করুন')).toBeDefined();

    // EDITOR on DRAFT: Edit AND Archive visible, clicking Archive invokes callback
    rerender(
      <LessonDetailDrawer
        lesson={MOCK_LESSONS[1]}
        isOpen
        onClose={onClose}
        canEdit
        isAdmin={false}
        onRequestArchive={onRequestArchive}
      />,
    );
    expect(screen.getByText(/সম্পাদনা করুন/i)).toBeDefined();
    const archiveBtn = screen.getByRole('button', { name: /আর্কাইভ করুন/i });
    fireEvent.click(archiveBtn);
    expect(onRequestArchive).toHaveBeenCalledWith(MOCK_LESSONS[1]);

    // REVIEWER on DRAFT & PUBLISHED: BOTH Edit and Archive hidden, Close visible
    rerender(
      <LessonDetailDrawer
        lesson={MOCK_LESSONS[0]}
        isOpen
        onClose={onClose}
        canEdit={false}
        isAdmin={false}
        onRequestArchive={onRequestArchive}
      />,
    );
    expect(screen.queryByText(/সম্পাদনা করুন/i)).toBeNull();
    expect(screen.queryByRole('button', { name: /আর্কাইভ করুন/i })).toBeNull();
    expect(screen.getByText('বন্ধ করুন')).toBeDefined();

    rerender(
      <LessonDetailDrawer
        lesson={MOCK_LESSONS[1]}
        isOpen
        onClose={onClose}
        canEdit={false}
        isAdmin={false}
        onRequestArchive={onRequestArchive}
      />,
    );
    expect(screen.queryByText(/সম্পাদনা করুন/i)).toBeNull();
    expect(screen.queryByRole('button', { name: /আর্কাইভ করুন/i })).toBeNull();
    fireEvent.click(screen.getByText('বন্ধ করুন'));
    expect(onClose).toHaveBeenCalled();
  });

  it('syncs same-subject initialTopicId updates cleanly and matches table term count & hierarchy display without dangling separators', async () => {
    const lessonMissingChapter: AdminLessonItem = {
      ...MOCK_LESSONS[0],
      importantTerms: [
        { termBangla: 'জড়তা', termEnglish: 'Inertia', definition: 'অবস্থা পরিবর্তনে বাধা' },
        { termBangla: '   ', termEnglish: 'Ignored' },
      ],
      topic: {
        id: 'top_force_1',
        titleBangla: 'নিউটনের সূত্র',
        chapter: {
          id: 'chap_force',
          titleBangla: '',
          subject: { id: 'sub_phy', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
        },
      },
    };

    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/curriculum/subjects') {
        return [{ id: 'sub_phy', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' }];
      }
      if (endpoint === '/curriculum/subjects/sub_phy/chapters') {
        return [
          {
            id: 'chap_motion',
            titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
            topics: [{ id: 'top_motion_1', titleBangla: 'গতির সমীকরণ' }],
          },
          {
            id: 'chap_force',
            titleBangla: 'তৃতীয় অধ্যায়: বল',
            topics: [{ id: 'top_force_1', titleBangla: 'নিউটনের সূত্র' }],
          },
        ];
      }
      if (endpoint.startsWith('/admin/content/lessons')) {
        return {
          items: [lessonMissingChapter],
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
          statusCounts: { ALL: 1, DRAFT: 0, REVIEW: 0, CORRECTION: 0, PUBLISHED: 1, ARCHIVED: 0 },
        } satisfies ListLessonsResponse;
      }
      return [];
    });

    const { rerender } = render(
      <LessonBankManager initialSubjectId="sub_phy" initialTopicId="top_motion_1" />,
    );

    await waitForInitialLessonsLoad();
    await screen.findByRole('option', { name: 'তৃতীয় অধ্যায়: বল' });

    const chapterSelect = screen.getByLabelText(/অধ্যায় ফিল্টার/i) as HTMLSelectElement;
    const topicSelect = screen.getByLabelText(/টপিক ফিল্টার/i) as HTMLSelectElement;

    await waitFor(() => {
      expect(chapterSelect.value).toBe('chap_motion');
      expect(topicSelect.disabled).toBe(false);
      expect(topicSelect.value).toBe('top_motion_1');
    });

    // Table row counts only valid terms and omits dangling '>' when chapter title is empty
    expect(screen.getByText(/1টি পরিভাষা/i)).toBeDefined();
    expect(screen.queryByText(/>\s*নিউটনের সূত্র/i)).toBeNull();

    // Update initialTopicId within the SAME subject -> chapter matches top_force_1 and topic dropdown stays enabled
    rerender(<LessonBankManager initialSubjectId="sub_phy" initialTopicId="top_force_1" />);

    await waitFor(() => {
      expect(chapterSelect.value).toBe('chap_force');
      expect(topicSelect.disabled).toBe(false);
      expect(topicSelect.value).toBe('top_force_1');
      expect(
        screen.getByText(/\+ নতুন লেসন যোগ/i).closest('a')?.getAttribute('href'),
      ).toBe('/admin/curriculum/lessons/new?subjectId=sub_phy&topicId=top_force_1');
    });
  });

  it('clears stale chapters during in-flight subject switches and keeps modal/drawer open on Escape while archiving is in flight', async () => {
    let resolvePhyChapters!: (val: unknown) => void;
    let resolveChemChapters!: (val: unknown) => void;
    let resolveArchive!: (val: unknown) => void;

    mockedApi.get.mockImplementation((endpoint: string) => {
      if (endpoint === '/curriculum/subjects') {
        return Promise.resolve([
          { id: 'sub_phy', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
          { id: 'sub_chem', code: 'ssc_chemistry', nameBangla: 'রসায়ন' },
        ]);
      }
      if (endpoint === '/curriculum/subjects/sub_phy/chapters') {
        return new Promise((resolve) => {
          resolvePhyChapters = resolve;
        });
      }
      if (endpoint === '/curriculum/subjects/sub_chem/chapters') {
        return new Promise((resolve) => {
          resolveChemChapters = resolve;
        });
      }
      if (endpoint.startsWith('/admin/content/lessons')) {
        return Promise.resolve({
          items: MOCK_LESSONS,
          total: MOCK_LESSONS.length,
          page: 1,
          limit: 20,
          totalPages: 1,
          statusCounts: { ALL: 2, DRAFT: 1, REVIEW: 0, CORRECTION: 0, PUBLISHED: 1, ARCHIVED: 0 },
        } satisfies ListLessonsResponse);
      }
      return Promise.resolve([]);
    });

    mockedApi.post.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveArchive = resolve;
        }),
    );

    render(<LessonBankManager />);
    await waitForInitialLessonsLoad();
    await screen.findByRole('option', { name: 'পদার্থবিজ্ঞান' });

    const subjectSelect = screen.getByLabelText(/বিষয় ফিল্টার/i) as HTMLSelectElement;
    const chapterSelect = screen.getByLabelText(/অধ্যায় ফিল্টার/i) as HTMLSelectElement;

    // Select Physics and wait for Physics chapter to populate
    fireEvent.change(subjectSelect, { target: { value: 'sub_phy' } });
    await act(async () => {
      resolvePhyChapters([
        {
          id: 'chap_motion',
          titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
          topics: [{ id: 'top_motion_1', titleBangla: 'গতির সমীকরণ' }],
        },
      ]);
    });
    expect(await screen.findByRole('option', { name: 'দ্বিতীয় অধ্যায়: গতি' })).toBeDefined();
    fireEvent.change(chapterSelect, { target: { value: 'chap_motion' } });
    expect(chapterSelect.value).toBe('chap_motion');

    // Switch to Chemistry while Chemistry /chapters is still in-flight -> stale Physics chapters must clear immediately
    fireEvent.change(subjectSelect, { target: { value: 'sub_chem' } });
    expect(chapterSelect.value).toBe('');
    expect(screen.queryByRole('option', { name: 'দ্বিতীয় অধ্যায়: গতি' })).toBeNull();

    // Now resolve Chemistry chapters cleanly
    await act(async () => {
      resolveChemChapters([
        {
          id: 'chap_chem_1',
          titleBangla: 'প্রথম অধ্যায়: রসায়ন',
          topics: [{ id: 'top_chem_1', titleBangla: 'রসায়নের ধারণা' }],
        },
      ]);
    });
    expect(await screen.findByRole('option', { name: 'প্রথম অধ্যায়: রসায়ন' })).toBeDefined();

    // Open drawer and start archiving -> Escape MUST NOT close confirmation modal or drawer while request is pending
    fireEvent.click(screen.getAllByRole('button', { name: /বিস্তারিত দেখুন/i })[1]);
    fireEvent.click(screen.getByRole('button', { name: /আর্কাইভ করুন/i }));
    fireEvent.click(screen.getByText(/আর্কাইভ নিশ্চিত করুন/i));

    expect(screen.getByText(/আর্কাইভ হচ্ছে.../i)).toBeDefined();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('dialog', { name: /লেসন আর্কাইভ নিশ্চিতকরণ/i })).toBeDefined();
    expect(screen.getByRole('dialog', { name: /লেসনের বিস্তারিত/i })).toBeDefined();

    await act(async () => {
      resolveArchive({ ...MOCK_LESSONS[1], status: 'ARCHIVED' });
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(screen.getByText(/লেসনটি সফলভাবে আর্কাইভ করা হয়েছে/i)).toBeDefined();
    });
  });
});
