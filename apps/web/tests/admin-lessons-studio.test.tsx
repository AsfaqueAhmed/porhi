import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import type { AdminLessonItem } from '@pori/shared';
import AdminNewLessonPage from '../src/app/admin/curriculum/lessons/new/page';
import AdminEditLessonPage from '../src/app/admin/curriculum/lessons/[id]/edit/page';
import { LessonAuthoringStudio } from '../src/components/admin/lessons/LessonAuthoringStudio';
import { apiClient, ApiError } from '../src/lib/api-client';
import { useAdminAuthStore } from '../src/store/admin-auth-store';

let mockPathname = '/admin/curriculum/lessons/new';
let mockSearchParams = new URLSearchParams();
let mockParams: Record<string, string> = { id: 'les_motion_1' };

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => mockSearchParams,
  useParams: () => mockParams,
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

const SEEDED_PUBLISHED_LESSON: AdminLessonItem = {
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
      subject: {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
      },
    },
  },
};

const SEEDED_DRAFT_LESSON: AdminLessonItem = {
  ...SEEDED_PUBLISHED_LESSON,
  id: 'les_draft_2',
  titleBangla: 'ভরবেগ ও সংঘর্ষ',
  status: 'DRAFT',
  version: 1,
  workedExample: null,
  memoryAid: null,
};

function mockCurriculumApi() {
  mockedApi.get.mockImplementation(async (endpoint: string) => {
    if (endpoint === '/curriculum/subjects') {
      return [
        {
          id: 'sub_ssc_physics',
          code: 'ssc_physics',
          nameBangla: 'পদার্থবিজ্ঞান',
          classLevel: 'CLASS_9_10',
          syllabusYear: 2026,
        },
        {
          id: 'sub_ssc_chemistry',
          code: 'ssc_chemistry',
          nameBangla: 'রসায়ন',
          classLevel: 'CLASS_9_10',
          syllabusYear: 2026,
        },
      ];
    }
    if (endpoint === '/curriculum/subjects/sub_ssc_physics/chapters') {
      return [
        {
          id: 'chap_motion',
          titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
          topics: [{ id: 'top_motion_1', titleBangla: 'গতির সমীকরণ' }],
        },
      ];
    }
    if (endpoint === '/curriculum/subjects/sub_ssc_chemistry/chapters') {
      return [
        {
          id: 'chap_chem_1',
          titleBangla: 'প্রথম অধ্যায়: রসায়নের ধারণা',
          topics: [{ id: 'top_chem_1', titleBangla: 'রসায়নের পরিধি' }],
        },
      ];
    }
    return [];
  });
}

describe('Admin Lesson Authoring & Edit Pages', () => {
  beforeEach(() => {
    mockedApi.get.mockReset();
    mockedApi.post.mockReset();
    mockedApi.patch.mockReset();
    mockPathname = '/admin/curriculum/lessons/new';
    mockSearchParams = new URLSearchParams();
    mockParams = { id: 'les_motion_1' };
    act(() => {
      useAdminAuthStore.getState().setSession('adm_jwt', {
        id: 'adm_1',
        phoneNumber: '01737740010',
        fullName: 'Asfaque',
        role: 'ADMIN',
      });
    });
  });

  afterEach(() => {
    cleanup();
    act(() => {
      useAdminAuthStore.getState().logout();
    });
  });

  it('AdminNewLessonPage starts blank, honors ?subjectId=&topicId=, validates whitespace before POST, and fills sample + creates lesson', async () => {
    mockSearchParams = new URLSearchParams(
      'subjectId=sub_ssc_chemistry&topicId=top_chem_1',
    );
    mockCurriculumApi();
    mockedApi.post.mockResolvedValueOnce({
      ...SEEDED_DRAFT_LESSON,
      id: 'les_new_1',
      topicId: 'top_chem_1',
    });

    render(<AdminNewLessonPage />);

    const backLink = screen.getByText(/← লেসন তালিকায় ফিরুন/i).closest('a');
    expect(backLink?.getAttribute('href')).toBe('/admin/curriculum/lessons');

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_chemistry/chapters',
        { scope: 'admin' },
      );
    });
    await screen.findByRole('option', { name: /রসায়নের পরিধি/i });

    const titleInput = screen.getByLabelText(/পাঠের শিরোনাম/i) as HTMLInputElement;
    const goalInput = screen.getByLabelText(/শিখনফল/i) as HTMLInputElement;
    const explanationInput = screen.getByLabelText(/মূল ব্যাখ্যা/i) as HTMLTextAreaElement;
    const termBanglaInput = screen.getByLabelText(/পরিভাষা 1 বাংলা শব্দ/i) as HTMLInputElement;
    expect(titleInput.value).toBe('');
    expect(goalInput.value).toBe('');
    expect(explanationInput.value).toBe('');
    expect(termBanglaInput.value).toBe('');

    // Whitespace-only input must trigger validation alert without calling POST
    fireEvent.change(titleInput, { target: { value: '   ' } });
    fireEvent.change(goalInput, { target: { value: '   ' } });
    fireEvent.change(explanationInput, { target: { value: '   ' } });
    fireEvent.change(termBanglaInput, { target: { value: '   ' } });
    fireEvent.click(
      screen.getByText(/সম্পূর্ণ লেসন খসড়া জমা দাও/i).closest('button')!,
    );

    const validationAlert = await screen.findByRole('alert');
    expect(validationAlert.textContent).toMatch(/পাঠের শিরোনাম/i);
    expect(mockedApi.post).not.toHaveBeenCalled();

    // Fill sample and submit cleanly
    fireEvent.click(screen.getByText(/নমুনা লেসন ভরুন/i));
    expect(titleInput.value).toContain('নিউটনের ৩য় গতিসূত্র');

    fireEvent.click(
      screen.getByText(/সম্পূর্ণ লেসন খসড়া জমা দাও/i).closest('button')!,
    );

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledTimes(1);
    });

    const [endpoint, payload, options] = mockedApi.post.mock.calls[0];
    expect(endpoint).toBe('/admin/content/lessons');
    expect(options).toEqual({ scope: 'admin' });
    expect(payload).toMatchObject({
      topicId: 'top_chem_1',
      titleBangla: expect.stringContaining('নিউটনের ৩য় গতিসূত্র'),
      importantTerms: expect.arrayContaining([
        expect.objectContaining({ termBangla: 'ক্রিয়া বল' }),
      ]),
    });

    const listBackLink = (await screen.findByText('তালিকায় ফিরুন')).closest('a');
    expect(listBackLink?.getAttribute('href')).toBe('/admin/curriculum/lessons');
  });

  it('AdminEditLessonPage hydrates PUBLISHED lesson for ADMIN, submits PATCH with preservePublished, and omits sample button', async () => {
    mockPathname = '/admin/curriculum/lessons/les_motion_1/edit';
    mockParams = { id: 'les_motion_1' };

    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/admin/content/lessons/les_motion_1') {
        return SEEDED_PUBLISHED_LESSON;
      }
      if (endpoint === '/curriculum/subjects') {
        return [
          {
            id: 'sub_ssc_physics',
            code: 'ssc_physics',
            nameBangla: 'পদার্থবিজ্ঞান',
            classLevel: 'CLASS_9_10',
            syllabusYear: 2026,
          },
        ];
      }
      if (endpoint === '/curriculum/subjects/sub_ssc_physics/chapters') {
        return [
          {
            id: 'chap_motion',
            titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
            topics: [{ id: 'top_motion_1', titleBangla: 'গতির সমীকরণ' }],
          },
        ];
      }
      return [];
    });

    mockedApi.patch.mockResolvedValueOnce({
      ...SEEDED_PUBLISHED_LESSON,
      titleBangla: 'সংশোধিত নিউটনের গতিসূত্র',
      version: 3,
      status: 'PUBLISHED',
    });

    render(<AdminEditLessonPage />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/admin/content/lessons/les_motion_1',
        { scope: 'admin' },
      );
    });

    const titleInput = (await screen.findByLabelText(/পাঠের শিরোনাম/i)) as HTMLInputElement;
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });

    expect(titleInput.value).toBe('নিউটনের গতির সূত্রাবলী');
    expect(screen.queryByText(/নমুনা লেসন ভরুন/i)).toBeNull();
    expect(screen.getByText(/এই লেসনটি বর্তমানে প্রকাশিত \(PUBLISHED\) অবস্থায় আছে/i)).toBeDefined();

    const preserveCheckbox = screen.getByLabelText(
      /সরাসরি প্রকাশিত রাখুন \(Keep Published\)/i,
    ) as HTMLInputElement;
    expect(preserveCheckbox.checked).toBe(false);
    fireEvent.click(preserveCheckbox);
    expect(preserveCheckbox.checked).toBe(true);

    fireEvent.change(titleInput, { target: { value: 'সংশোধিত নিউটনের গতিসূত্র' } });
    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);

    await waitFor(() => {
      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/admin/content/lessons/les_motion_1',
        expect.objectContaining({
          topicId: 'top_motion_1',
          titleBangla: 'সংশোধিত নিউটনের গতিসূত্র',
          preservePublished: true,
        }),
        { scope: 'admin' },
      );
    });

    expect(await screen.findByText(/সফলভাবে আপডেট করা হয়েছে/i)).toBeDefined();
    expect(screen.getByText(/বর্তমান ভার্সন v3/i)).toBeDefined();
  });

  it('LessonAuthoringStudio supports DRAFT/CORRECTION submitForReview', async () => {
    mockCurriculumApi();
    const onLessonUpdated = vi.fn();
    mockedApi.patch.mockResolvedValueOnce({
      ...SEEDED_DRAFT_LESSON,
      status: 'REVIEW',
      version: 2,
    });

    render(
      <LessonAuthoringStudio
        mode="edit"
        initialLesson={SEEDED_DRAFT_LESSON}
        onLessonUpdated={onLessonUpdated}
      />,
    );

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });

    const submitReviewCheckbox = screen.getByLabelText(
      /রিভিউয়ের জন্য পাঠান \(Submit for Review\)/i,
    ) as HTMLInputElement;
    expect(submitReviewCheckbox.checked).toBe(false);
    fireEvent.click(submitReviewCheckbox);
    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);

    await waitFor(() => {
      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/admin/content/lessons/les_draft_2',
        expect.objectContaining({
          submitForReview: true,
          workedExample: null,
          memoryAid: null,
        }),
        { scope: 'admin' },
      );
      expect(onLessonUpdated).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'les_draft_2', status: 'REVIEW', version: 2 }),
      );
    });
  });

  it('LessonAuthoringStudio disables save and blocks PATCH when initialLesson is ARCHIVED', async () => {
    mockCurriculumApi();
    const archivedLesson: AdminLessonItem = {
      ...SEEDED_PUBLISHED_LESSON,
      id: 'les_archived_1',
      status: 'ARCHIVED',
    };
    render(<LessonAuthoringStudio mode="edit" initialLesson={archivedLesson} />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });

    expect(
      screen.getByText(/এই লেসনটি আর্কাইভ \(ARCHIVED\) অবস্থায় আছে — সরাসরি সম্পাদনা করা যাবে না।/i),
    ).toBeDefined();
    const backLink = screen.getByText('লেসন তালিকায় ফিরুন').closest('a');
    expect(backLink?.getAttribute('href')).toBe('/admin/curriculum/lessons');

    const saveBtn = screen
      .getByText(/পরিবর্তন সংরক্ষণ করুন/i)
      .closest('button') as HTMLButtonElement;
    expect(saveBtn.disabled).toBe(true);

    fireEvent.submit(saveBtn.closest('form') as HTMLFormElement);
    expect(mockedApi.patch).not.toHaveBeenCalled();
  });

  it('AdminEditLessonPage renders 404 state and 403/401 role="alert" error states with /admin/curriculum/lessons back link', async () => {
    mockPathname = '/admin/curriculum/lessons/missing_lesson/edit';
    mockParams = { id: 'missing_lesson' };

    mockedApi.get.mockRejectedValueOnce(
      new ApiError(404, 'Not Found', { message: 'Lesson not found' }),
    );
    const notFoundView = render(<AdminEditLessonPage />);
    expect(await screen.findByText(/লেসনটি পাওয়া যায়নি/i)).toBeDefined();
    expect(screen.getByText('লেসন তালিকায় ফিরুন').closest('a')?.getAttribute('href')).toBe(
      '/admin/curriculum/lessons',
    );
    notFoundView.unmount();

    mockedApi.get.mockRejectedValueOnce(
      new ApiError(403, 'Forbidden', { message: 'Forbidden' }),
    );
    const forbiddenView = render(<AdminEditLessonPage />);
    const alert403 = await screen.findByRole('alert');
    expect(alert403.textContent).toMatch(/অনুমতি নেই/i);
    expect(screen.getByText('লেসন তালিকায় ফিরুন').closest('a')?.getAttribute('href')).toBe(
      '/admin/curriculum/lessons',
    );
    forbiddenView.unmount();

    mockedApi.get.mockRejectedValueOnce(
      new ApiError(401, 'Unauthorized', { message: 'Unauthorized' }),
    );
    render(<AdminEditLessonPage />);
    const alert401 = await screen.findByRole('alert');
    expect(alert401.textContent).toMatch(/সেশনের মেয়াদ শেষ/i);
  });

  it('LessonAuthoringStudio hides Keep Published for EDITOR, preserves topicId on partial chapters, clears stale chapter/topic on empty/failing subject switch, and handles 502 HTML errors', async () => {
    act(() => {
      useAdminAuthStore.getState().setSession('ed_jwt', {
        id: 'ed_1',
        phoneNumber: '01811111111',
        role: 'EDITOR',
      });
    });

    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/curriculum/subjects') {
        return [
          {
            id: 'sub_ssc_physics',
            code: 'ssc_physics',
            nameBangla: 'পদার্থবিজ্ঞান',
            classLevel: 'CLASS_9_10',
            syllabusYear: 2026,
          },
          {
            id: 'sub_empty',
            code: 'ssc_empty',
            nameBangla: 'খালি বিষয়',
            classLevel: 'CLASS_9_10',
            syllabusYear: 2026,
          },
          {
            id: 'sub_fail',
            code: 'ssc_fail',
            nameBangla: 'ত্রুটিপূর্ণ বিষয়',
            classLevel: 'CLASS_9_10',
            syllabusYear: 2026,
          },
        ];
      }
      if (endpoint === '/curriculum/subjects/sub_ssc_physics/chapters') {
        return [
          {
            id: 'chap_other',
            titleBangla: 'প্রথম অধ্যায়: পরিমাপ',
            topics: [{ id: 'top_other_1', titleBangla: 'ভৌত রাশি' }],
          },
        ];
      }
      if (endpoint === '/curriculum/subjects/sub_empty/chapters') {
        return [];
      }
      if (endpoint === '/curriculum/subjects/sub_fail/chapters') {
        throw new ApiError(500, 'Internal Server Error', {});
      }
      return [];
    });

    mockedApi.patch.mockRejectedValueOnce(
      new ApiError(502, 'Bad Gateway', '<html><body>502 Bad Gateway</body></html>'),
    );

    render(<LessonAuthoringStudio mode="edit" initialLesson={SEEDED_PUBLISHED_LESSON} />);

    await screen.findByRole('option', { name: /খালি বিষয়/i });
    expect(screen.queryByLabelText(/সরাসরি প্রকাশিত রাখুন/i)).toBeNull();

    // Preserves original topicId on partial chapter list & strips HTML from 502 error
    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);
    await waitFor(() => {
      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/admin/content/lessons/les_motion_1',
        expect.objectContaining({
          topicId: 'top_motion_1',
          preservePublished: false,
        }),
        { scope: 'admin' },
      );
    });
    const alert502 = await screen.findByRole('alert');
    expect(alert502.textContent).not.toContain('<html>');
    expect(alert502.textContent).toContain('কন্টেন্ট সংরক্ষণ ব্যর্থ হয়েছে');

    // Switch to empty subject -> clears chapter & topic and blocks save
    const subjectSelect = screen.getByLabelText(/১\. বিষয়/i) as HTMLSelectElement;
    const chapterSelect = screen.getByLabelText(/২\. অধ্যায়/i) as HTMLSelectElement;
    const topicSelect = screen.getByLabelText(/৩\. নির্দিষ্ট টপিক/i) as HTMLSelectElement;

    fireEvent.change(subjectSelect, { target: { value: 'sub_empty' } });
    await waitFor(() => {
      expect(chapterSelect.value).toBe('');
      expect(topicSelect.value).toBe('');
    });

    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);
    const topicAlert = await screen.findByRole('alert');
    expect(topicAlert.textContent).toContain('একটি নির্দিষ্ট টপিক নির্বাচন করুন');

    // Switch to failing subject -> clears chapter & topic and surfaces hierarchy error
    fireEvent.change(subjectSelect, { target: { value: 'sub_fail' } });
    const failAlert = await screen.findByRole('alert');
    expect(failAlert.textContent).not.toContain('একটি নির্দিষ্ট টপিক নির্বাচন করুন');
    expect(chapterSelect.value).toBe('');
    expect(topicSelect.value).toBe('');
  });

  it('LessonAuthoringStudio allows submitting a term without optional definition and trims payload', async () => {
    mockCurriculumApi();
    mockedApi.post.mockResolvedValueOnce({ ...SEEDED_DRAFT_LESSON, id: 'les_no_def' });

    render(<LessonAuthoringStudio mode="create" />);
    await screen.findByRole('option', { name: /গতির সমীকরণ/i });

    const defInput = screen.getByLabelText(/পরিভাষা 1 সংজ্ঞা/i) as HTMLInputElement;
    expect(defInput.required).toBe(false);

    fireEvent.change(screen.getByLabelText(/পাঠের শিরোনাম/i), {
      target: { value: '  ভরবেগের ধারণা  ' },
    });
    fireEvent.change(screen.getByLabelText(/শিখনফল/i), {
      target: { value: '  ভরবেগ বোঝা  ' },
    });
    fireEvent.change(screen.getByLabelText(/মূল ব্যাখ্যা/i), {
      target: { value: '  $p = mv$  ' },
    });
    fireEvent.change(screen.getByLabelText(/পরিভাষা 1 বাংলা শব্দ/i), {
      target: { value: '  ভরবেগ  ' },
    });

    fireEvent.click(
      screen.getByText(/সম্পূর্ণ লেসন খসড়া জমা দাও/i).closest('button')!,
    );

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/admin/content/lessons',
        {
          topicId: 'top_motion_1',
          titleBangla: 'ভরবেগের ধারণা',
          learningGoal: 'ভরবেগ বোঝা',
          explanation: '$p = mv$',
          importantTerms: [{ termBangla: 'ভরবেগ', termEnglish: '', definition: '' }],
          workedExample: undefined,
          memoryAid: undefined,
        },
        { scope: 'admin' },
      );
    });
  });

  it('LessonAuthoringStudio re-hydrates when initialLesson.id changes in edit mode', async () => {
    mockCurriculumApi();
    const secondLesson: AdminLessonItem = {
      ...SEEDED_DRAFT_LESSON,
      id: 'les_chem_edit',
      topicId: 'top_chem_1',
      titleBangla: 'রাসায়নিক বিক্রিয়া',
      learningGoal: 'রাসায়নিক পরিবর্তন বোঝা',
      explanation: '$2H_2 + O_2 \\rightarrow 2H_2O$',
      importantTerms: [{ termBangla: 'বিক্রিয়া', termEnglish: 'Reaction' }],
      status: 'DRAFT',
      version: 1,
      topic: {
        id: 'top_chem_1',
        titleBangla: 'রসায়নের পরিধি',
        chapter: {
          id: 'chap_chem_1',
          titleBangla: 'প্রথম অধ্যায়: রসায়নের ধারণা',
          subject: {
            id: 'sub_ssc_chemistry',
            code: 'ssc_chemistry',
            nameBangla: 'রসায়ন',
          },
        },
      },
    };
    mockedApi.patch.mockResolvedValueOnce({ ...secondLesson, version: 2 });

    const { rerender } = render(
      <LessonAuthoringStudio mode="edit" initialLesson={SEEDED_PUBLISHED_LESSON} />,
    );

    const titleInput = (await screen.findByLabelText(/পাঠের শিরোনাম/i)) as HTMLInputElement;
    expect(titleInput.value).toBe('নিউটনের গতির সূত্রাবলী');
    const keepPublishedCheckbox = screen.getByLabelText(
      /সরাসরি প্রকাশিত রাখুন \(Keep Published\)/i,
    ) as HTMLInputElement;
    fireEvent.click(keepPublishedCheckbox);
    expect(keepPublishedCheckbox.checked).toBe(true);

    // Switch initialLesson prop to a different lesson ID -> form, hierarchy, and editorial flags re-hydrate
    rerender(<LessonAuthoringStudio mode="edit" initialLesson={secondLesson} />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_chemistry/chapters',
        { scope: 'admin' },
      );
    });

    expect((screen.getByLabelText(/পাঠের শিরোনাম/i) as HTMLInputElement).value).toBe(
      'রাসায়নিক বিক্রিয়া',
    );
    expect((screen.getByLabelText(/১\. বিষয়/i) as HTMLSelectElement).value).toBe(
      'sub_ssc_chemistry',
    );
    expect((screen.getByLabelText(/২\. অধ্যায়/i) as HTMLSelectElement).value).toBe(
      'chap_chem_1',
    );
    expect((screen.getByLabelText(/৩\. নির্দিষ্ট টপিক/i) as HTMLSelectElement).value).toBe(
      'top_chem_1',
    );
    expect(screen.queryByLabelText(/সরাসরি প্রকাশিত রাখুন/i)).toBeNull();
    expect(
      (screen.getByLabelText(/রিভিউয়ের জন্য পাঠান/i) as HTMLInputElement).checked,
    ).toBe(false);

    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);
    await waitFor(() => {
      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/admin/content/lessons/les_chem_edit',
        expect.objectContaining({
          topicId: 'top_chem_1',
          titleBangla: 'রাসায়নিক বিক্রিয়া',
          submitForReview: false,
        }),
        { scope: 'admin' },
      );
    });
  });

  it('LessonAuthoringStudio syncs same-subject initialTopicId in create mode and does not leak Physics defaults for unmapped initialSubjectId', async () => {
    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/curriculum/subjects') {
        return [
          { id: 'sub_ssc_physics', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
          { id: 'sub_custom', code: 'ssc_bio', nameBangla: 'জীববিজ্ঞান' },
        ];
      }
      if (endpoint === '/curriculum/subjects/sub_ssc_physics/chapters') {
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
      return [];
    });

    const { rerender, unmount } = render(
      <LessonAuthoringStudio
        mode="create"
        initialSubjectId="sub_ssc_physics"
        initialTopicId="top_motion_1"
      />,
    );

    const chapterSelect = screen.getByLabelText(/২\. অধ্যায়/i) as HTMLSelectElement;
    const topicSelect = screen.getByLabelText(/৩\. নির্দিষ্ট টপিক/i) as HTMLSelectElement;

    await waitFor(() => {
      expect(chapterSelect.value).toBe('chap_motion');
      expect(topicSelect.value).toBe('top_motion_1');
    });

    rerender(
      <LessonAuthoringStudio
        mode="create"
        initialSubjectId="sub_ssc_physics"
        initialTopicId="top_force_1"
      />,
    );

    await waitFor(() => {
      expect(chapterSelect.value).toBe('chap_force');
      expect(topicSelect.value).toBe('top_force_1');
    });
    unmount();

    // Unmapped initialSubjectId with empty chapters must NOT retain hardcoded chap_ssc_physics_ch2/top_ssc_physics_motion_eq
    render(<LessonAuthoringStudio mode="create" initialSubjectId="sub_custom" />);
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_custom/chapters',
        { scope: 'admin' },
      );
    });
    expect((screen.getByLabelText(/২\. অধ্যায়/i) as HTMLSelectElement).value).toBe('');
    expect((screen.getByLabelText(/৩\. নির্দিষ্ট টপিক/i) as HTMLSelectElement).value).toBe('');
  });

  it('LessonAuthoringStudio supports dynamic term add/delete, MathToolbar insertion, and workedExample + memoryAid submission', async () => {
    mockCurriculumApi();
    mockedApi.post.mockResolvedValueOnce({ ...SEEDED_PUBLISHED_LESSON, id: 'les_full_ui' });

    render(<LessonAuthoringStudio mode="create" />);
    await screen.findByRole('option', { name: /গতির সমীকরণ/i });

    fireEvent.change(screen.getByLabelText(/পাঠের শিরোনাম/i), {
      target: { value: 'বলের সমীকরণ' },
    });
    fireEvent.change(screen.getByLabelText(/শিখনফল/i), {
      target: { value: 'ভগ্নাংশসহ বল নির্ণয়' },
    });

    const explanationInput = screen.getByLabelText(/মূল ব্যাখ্যা/i) as HTMLTextAreaElement;
    fireEvent.change(explanationInput, { target: { value: 'অনুপাত:' } });
    fireEvent.click(screen.getByText('ভগ্নাংশ').closest('button')!);
    expect(explanationInput.value).toContain('$\\frac{a}{b}$');

    // Add 2nd and 3rd terms, then delete term 2
    fireEvent.click(screen.getByText(/নতুন শব্দ যোগ করো/i));
    fireEvent.click(screen.getByText(/নতুন শব্দ যোগ করো/i));

    fireEvent.change(screen.getByLabelText(/পরিভাষা 1 বাংলা শব্দ/i), {
      target: { value: 'ত্বরণ' },
    });
    fireEvent.change(screen.getByLabelText(/পরিভাষা 1 English Term/i), {
      target: { value: 'Acceleration' },
    });
    fireEvent.change(screen.getByLabelText(/পরিভাষা 2 বাংলা শব্দ/i), {
      target: { value: 'মুছে ফেলা শব্দ' },
    });
    fireEvent.change(screen.getByLabelText(/পরিভাষা 3 বাংলা শব্দ/i), {
      target: { value: 'বল' },
    });

    fireEvent.click(screen.getByLabelText('পরিভাষা 2 মুছুন'));
    expect(screen.queryByDisplayValue('মুছে ফেলা শব্দ')).toBeNull();
    expect((screen.getByLabelText(/পরিভাষা 2 বাংলা শব্দ/i) as HTMLInputElement).value).toBe('বল');

    fireEvent.change(screen.getByLabelText(/গাণিতিক সমস্যা \(Problem\)/i), {
      target: { value: '  $m=2, a=3$ হলে $F=?$  ' },
    });
    fireEvent.change(screen.getByLabelText(/ধাপওয়ারী সমাধান \(Solution\)/i), {
      target: { value: '  $F = 2 \\times 3 = 6$  ' },
    });
    fireEvent.change(screen.getByLabelText(/মনে রাখার টেকনিক \/ ছন্দ/i), {
      target: { value: '  F মানেই ma  ' },
    });

    fireEvent.click(
      screen.getByText(/সম্পূর্ণ লেসন খসড়া জমা দাও/i).closest('button')!,
    );

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/admin/content/lessons',
        expect.objectContaining({
          topicId: 'top_motion_1',
          titleBangla: 'বলের সমীকরণ',
          explanation: expect.stringContaining('$\\frac{a}{b}$'),
          importantTerms: [
            { termBangla: 'ত্বরণ', termEnglish: 'Acceleration', definition: '' },
            { termBangla: 'বল', termEnglish: '', definition: '' },
          ],
          workedExample: {
            problem: '$m=2, a=3$ হলে $F=?$',
            stepByStepSolution: '$F = 2 \\times 3 = 6$',
          },
          memoryAid: 'F মানেই ma',
        }),
        { scope: 'admin' },
      );
    });
  });
});
