import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import type { AdminLessonItem, AdminQuestionItem } from '@pori/shared';
import { StudentSimulatorFrame } from '../src/components/admin/student-simulator-frame';
import { AuthoringStudio } from '../src/components/admin/authoring-studio';
import {
  buildLessonEditEditorialFields,
  buildLessonEditPayload,
  buildLessonPayload,
  createInitialLessonFormState,
  ensureChapterTopicInList,
} from '../src/components/admin/authoring/authoring-helpers';
import AdminNewQuestionPage from '../src/app/admin/questions/new/page';
import AdminEditQuestionPage from '../src/app/admin/questions/[id]/edit/page';
import { apiClient, ApiError } from '../src/lib/api-client';
import { useAdminAuthStore } from '../src/store/admin-auth-store';

const mockReplace = vi.fn();
let mockPathname = '/admin/questions/new';
let mockSearchParams = new URLSearchParams();
let mockParams: Record<string, string> = { id: 'q_motion_mcq_1' };

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: vi.fn(), replace: mockReplace, prefetch: vi.fn() }),
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

const SEEDED_PUBLISHED_MCQ: AdminQuestionItem = {
  id: 'q_motion_mcq_1',
  topicId: 'top_motion_1',
  type: 'MCQ',
  stem: 'ত্বরণ কত?',
  options: [
    { id: 'opt_q1_a', text: '4 ms⁻¹', isCorrect: true },
    { id: 'opt_q1_b', text: '8 ms⁻¹', isCorrect: false },
    { id: 'opt_q1_c', text: '12 ms⁻¹', isCorrect: false },
    { id: 'opt_q1_d', text: '16 ms⁻¹', isCorrect: false },
  ],
  explanation: {
    directAnswer: '4 ms⁻¹',
    coreConcept: 'a = (v - u) / t',
    stepDerivation: 'a = 8 / 2 = 4 ms⁻²',
    distractorAnalysis: {
      opt_q1_a: 'সঠিক উত্তর',
      opt_q1_b: 'বেগ ও সময়ের গুণফল করা হয়েছে',
    },
    textbookCitation: {
      bookTitle: 'পদার্থবিজ্ঞান (৯ম-১০ম শ্রেণি)',
      chapterName: 'দ্বিতীয় অধ্যায়: গতি',
      pageNumber: 45,
    },
    proTipShortcut: 'একক যাচাই করুন',
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
      subject: {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
      },
    },
  },
};

const SEEDED_DRAFT_CQ: AdminQuestionItem = {
  id: 'q_motion_cq_1',
  topicId: 'top_motion_1',
  type: 'CQ_CREATIVE',
  stem: 'উদ্দীপক: একটি গাড়ি 2 ms⁻² সুষম ত্বরণে যাত্রা শুরু করে।',
  options: null,
  explanation: {
    directAnswer: 'ক-ঘ রুব্রিক সমাধান',
    coreConcept: 'গতির সমীকরণসমূহ',
    stepDerivation: 'v = u + at ব্যবহার করে সমাধান',
  },
  cqRubric: {
    ka: { mark: 1, criteria: 'ত্বরণ কাকে বলে?' },
    kha: { mark: 2, criteria: 'সুষম ত্বরণ ব্যাখ্যা কর।' },
    ga: { mark: 3, criteria: '৫ সেকেন্ড পর বেগ নির্ণয় কর।' },
    gha: { mark: 4, criteria: 'বেগ-সময় লেখচিত্র বিশ্লেষণ কর।' },
  },
  difficulty: 'HARD',
  boardSource: 'Rajshahi Board 2024',
  isVerified: false,
  status: 'DRAFT',
  version: 1,
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

describe('StudentSimulatorFrame', () => {
  it('renders student mobile device preview with stem, options, and live feedback', () => {
    const options = [
      { id: 'opt_1', text: 'v = u + at', isCorrect: true },
      { id: 'opt_2', text: 's = vt^2', isCorrect: false },
      { id: 'opt_3', text: 'v^2 = u^2 - 2as', isCorrect: false },
      { id: 'opt_4', text: 's = ut', isCorrect: false },
    ];

    render(
      <StudentSimulatorFrame
        stem="কোনটি সুষম ত্বরণে গতির প্রথম সমীকরণ?"
        options={options}
        coreConcept="ত্বরণ ধ্রুব থাকলে বেগের বৃদ্ধি সময়ের সমানুপাতিক।"
        proTip="স্থির অবস্থান বললে u = 0 ধরবে।"
      />,
    );

    expect(screen.getByText(/লাইভ স্টুডেন্ট সিমুলেটর/i)).toBeDefined();
    expect(screen.getByText(/কোনটি সুষম ত্বরণে গতির প্রথম সমীকরণ/i)).toBeDefined();
    expect(screen.getByText(/v = u \+ at/i)).toBeDefined();

    // Click on option 1
    const optionBtn = screen.getByText(/v = u \+ at/i);
    fireEvent.click(optionBtn);

    // Correct feedback badge
    expect(screen.getByText(/সঠিক উত্তর!/i)).toBeDefined();
  });

  it('renders CQ_CREATIVE rubric preview in StudentSimulatorFrame when questionType is CQ_CREATIVE', () => {
    render(
      <StudentSimulatorFrame
        questionType="CQ_CREATIVE"
        stem="উদ্দীপক: একটি বস্তু স্থির অবস্থান থেকে যাত্রা শুরু করে।"
        options={[]}
        cqRubric={{
          ka: { mark: 1, criteria: 'ত্বরণ কাকে বলে?' },
          kha: { mark: 2, criteria: 'বেগ ও দ্রুতির পার্থক্য লেখ।' },
          ga: { mark: 3, criteria: '' },
          gha: { mark: 4, criteria: '' },
        }}
        coreConcept="সুষম ত্বরণ"
        formulaSteps="v = u + at"
      />,
    );

    expect(screen.getByText(/সৃজনশীল \(CQ\)/i)).toBeDefined();
    expect(screen.getByText(/উদ্দীপক: একটি বস্তু স্থির অবস্থান/i)).toBeDefined();
    expect(screen.queryByText(/ত্বরণ কাকে বলে\?/i)).toBeNull();

    const toggleBtn = screen.getByText(/সমাধান ও রুব্রিক দেখুন/i);
    fireEvent.click(toggleBtn);

    expect(screen.getByText(/ক \(জ্ঞানমূলক\)/i)).toBeDefined();
    expect(screen.getByText(/নম্বর: 1/i)).toBeDefined();
    expect(screen.getByText(/ত্বরণ কাকে বলে\?/i)).toBeDefined();
    expect(screen.getByText(/খ \(অনুধাবনমূলক\)/i)).toBeDefined();
    expect(screen.getByText(/নম্বর: 2/i)).toBeDefined();
    expect(screen.getByText(/বেগ ও দ্রুতির পার্থক্য লেখ।/i)).toBeDefined();
    expect(screen.queryByText(/গ \(প্রয়োগমূলক\)/i)).toBeNull();

    fireEvent.click(screen.getByText(/সমাধান ও রুব্রিক লুকান/i));
    expect(screen.queryByText(/ত্বরণ কাকে বলে\?/i)).toBeNull();
  });
});

describe('Admin Question Authoring & Edit Pages', () => {
  beforeEach(() => {
    mockedApi.get.mockReset();
    mockedApi.post.mockReset();
    mockedApi.patch.mockReset();
    mockReplace.mockReset();
    mockPathname = '/admin/questions/new';
    mockSearchParams = new URLSearchParams();
    mockParams = { id: 'q_motion_mcq_1' };
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

  it('AdminNewQuestionPage starts blank, supports নমুনা ভরুন, and submits CQ_CREATIVE omitting options', async () => {
    mockCurriculumApi();
    mockedApi.post.mockResolvedValueOnce({ id: 'q_new_cq_1' });

    render(<AdminNewQuestionPage />);

    const backLink = screen.getByText(/← প্রশ্ন তালিকায় ফিরুন/i).closest('a');
    expect(backLink?.getAttribute('href')).toBe('/admin/questions');

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });
    await screen.findByRole('option', { name: /গতির সমীকরণ/i });

    const stemInput = screen.getByPlaceholderText(/প্রশ্নের মূল বিবরণ লিখুন/i) as HTMLTextAreaElement;
    expect(stemInput.value).toBe('');

    // Fill sample and verify populated MCQ sample
    fireEvent.click(screen.getByText(/নমুনা ভরুন/i));
    expect(stemInput.value).toContain('স্থির অবস্থান থেকে');

    // Switch to CQ_CREATIVE
    fireEvent.click(screen.getByText(/সৃজনশীল \(CQ\)/i));

    fireEvent.change(stemInput, {
      target: { value: 'উদ্দীপক: একটি গাড়ি 3 ms⁻² ত্বরণে চলছে।' },
    });
    fireEvent.change(screen.getByLabelText(/ক — জ্ঞানমূলক মানদণ্ড/i), {
      target: { value: 'সুষম ত্বরণ কী?' },
    });
    fireEvent.change(screen.getByLabelText(/সরাসরি উত্তর ইনপুট/i), {
      target: { value: 'ক-ঘ নমুনা উত্তর' },
    });
    fireEvent.change(screen.getByLabelText(/মূল ধারণা ইনপুট/i), {
      target: { value: 'গতির মৌলিক ধারণা' },
    });

    const submitBtn = screen
      .getByText(/৬-স্তরের ব্যাখ্যাসহ সৃজনশীল প্রশ্ন জমা দাও/i)
      .closest('button') as HTMLButtonElement;
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledTimes(1);
    });

    const [endpoint, payload, options] = mockedApi.post.mock.calls[0];
    expect(endpoint).toBe('/admin/content/questions');
    expect(options).toEqual({ scope: 'admin' });
    expect(payload).toMatchObject({
      topicId: 'top_motion_1',
      type: 'CQ_CREATIVE',
      stem: 'উদ্দীপক: একটি গাড়ি 3 ms⁻² ত্বরণে চলছে।',
      cqRubric: {
        ka: { mark: 1, criteria: 'সুষম ত্বরণ কী?' },
      },
      explanation: {
        directAnswer: 'ক-ঘ নমুনা উত্তর',
        coreConcept: 'গতির মৌলিক ধারণা',
      },
    });
    expect(payload).not.toHaveProperty('options');

    const listBackLink = (await screen.findByText('তালিকায় ফিরুন')).closest('a');
    expect(listBackLink?.getAttribute('href')).toBe('/admin/questions');
  });

  it('AdminNewQuestionPage redirects ?type=lesson cleanly to /admin/curriculum/lessons/new preserving subjectId and topicId', async () => {
    mockSearchParams = new URLSearchParams(
      'type=lesson&subjectId=sub_ssc_chemistry&topicId=top_chem_1',
    );

    render(<AdminNewQuestionPage />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        '/admin/curriculum/lessons/new?topicId=top_chem_1&subjectId=sub_ssc_chemistry',
      );
    });
    expect(screen.queryByPlaceholderText(/প্রশ্নের মূল বিবরণ লিখুন/i)).toBeNull();
  });

  it('AdminNewQuestionPage removes Lesson tab and targets filtered list on ?type=mcq and ?type=cq back links', async () => {
    mockCurriculumApi();
    mockSearchParams = new URLSearchParams('type=cq&subjectId=sub_ssc_physics&topicId=top_motion_1');

    const cqView = render(<AdminNewQuestionPage />);
    expect(await screen.findByText(/সৃজনশীল \(CQ\)/i, { selector: 'button' })).toBeDefined();
    expect(screen.queryByText(/পাঠ্য লেসন \(Lesson\)/i)).toBeNull();
    expect(screen.getByText(/← প্রশ্ন তালিকায় ফিরুন/i).closest('a')?.getAttribute('href')).toBe(
      '/admin/questions/cq',
    );
    cqView.unmount();

    mockSearchParams = new URLSearchParams('type=mcq&subjectId=sub_ssc_physics&topicId=top_motion_1');
    render(<AdminNewQuestionPage />);
    expect(await screen.findByText(/৬-স্তরের MCQ/i, { selector: 'button' })).toBeDefined();
    expect(screen.queryByText(/পাঠ্য লেসন \(Lesson\)/i)).toBeNull();
    expect(screen.getByText(/← প্রশ্ন তালিকায় ফিরুন/i).closest('a')?.getAttribute('href')).toBe(
      '/admin/questions/mcq',
    );
  });

  it('AdminEditQuestionPage hydrates PUBLISHED MCQ for ADMIN, sends PATCH with preservePublished and dynamic distractors', async () => {
    mockPathname = '/admin/questions/q_motion_mcq_1/edit';
    mockParams = { id: 'q_motion_mcq_1' };

    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/admin/content/questions/q_motion_mcq_1') {
        return SEEDED_PUBLISHED_MCQ;
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
      ...SEEDED_PUBLISHED_MCQ,
      stem: 'সংশোধিত ত্বরণ কত?',
      version: 3,
      status: 'PUBLISHED',
    });

    render(<AdminEditQuestionPage />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/admin/content/questions/q_motion_mcq_1',
        { scope: 'admin' },
      );
    });

    const stemInput = (await screen.findByPlaceholderText(
      /প্রশ্নের মূল বিবরণ লিখুন/i,
    )) as HTMLTextAreaElement;
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });

    expect(stemInput.value).toBe('ত্বরণ কত?');
    expect(screen.queryByText(/নমুনা ভরুন/i)).toBeNull();

    const distractorBInput = screen.getByLabelText(
      'বিকল্প (খ) বিশ্লেষণ',
    ) as HTMLInputElement;
    expect(distractorBInput.value).toBe('বেগ ও সময়ের গুণফল করা হয়েছে');

    expect(screen.getByText(/বর্তমানে প্রকাশিত \(PUBLISHED\) অবস্থায় আছে/i)).toBeDefined();

    const preserveCheckbox = screen.getByLabelText(
      /সরাসরি প্রকাশিত রাখুন \(Keep Published\)/i,
    ) as HTMLInputElement;
    expect(preserveCheckbox.checked).toBe(false);

    fireEvent.click(preserveCheckbox);
    expect(preserveCheckbox.checked).toBe(true);

    fireEvent.change(stemInput, { target: { value: 'সংশোধিত ত্বরণ কত?' } });

    const saveBtn = screen
      .getByText(/পরিবর্তন সংরক্ষণ করুন/i)
      .closest('button') as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/admin/content/questions/q_motion_mcq_1',
        expect.objectContaining({
          topicId: 'top_motion_1',
          type: 'MCQ',
          stem: 'সংশোধিত ত্বরণ কত?',
          preservePublished: true,
          boardSource: 'Dhaka Board 2022',
          explanation: expect.objectContaining({
            distractorAnalysis: expect.objectContaining({
              opt_q1_b: 'বেগ ও সময়ের গুণফল করা হয়েছে',
            }),
          }),
        }),
        { scope: 'admin' },
      );
    });

    expect(await screen.findByText(/সফলভাবে আপডেট করা হয়েছে/i)).toBeDefined();
    expect(screen.getByText(/বর্তমান ভার্সন v3/i)).toBeDefined();
  });

  it('AuthoringStudio edit hides Keep Published for EDITOR, shows Submit for Review on DRAFT, and sends options: null for CQ_CREATIVE', async () => {
    mockCurriculumApi();

    // 1. EDITOR on PUBLISHED question
    act(() => {
      useAdminAuthStore.getState().setSession('ed_jwt', {
        id: 'ed_1',
        phoneNumber: '01811111111',
        role: 'EDITOR',
      });
    });

    const firstView = render(
      <AuthoringStudio mode="edit" initialQuestion={SEEDED_PUBLISHED_MCQ} />,
    );

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });

    expect(screen.getByText(/বর্তমানে প্রকাশিত \(PUBLISHED\) অবস্থায় আছে/i)).toBeDefined();
    expect(screen.queryByLabelText(/সরাসরি প্রকাশিত রাখুন/i)).toBeNull();
    firstView.unmount();

    // 2. DRAFT CQ_CREATIVE edit -> submitForReview + options: null + onQuestionUpdated
    const onQuestionUpdated = vi.fn();
    mockedApi.patch.mockResolvedValueOnce({
      ...SEEDED_DRAFT_CQ,
      status: 'REVIEW',
      version: 2,
    });

    render(
      <AuthoringStudio
        mode="edit"
        initialQuestion={SEEDED_DRAFT_CQ}
        onQuestionUpdated={onQuestionUpdated}
      />,
    );

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledTimes(4);
    });

    const kaInput = screen.getByLabelText(/ক — জ্ঞানমূলক মানদণ্ড/i) as HTMLTextAreaElement;
    expect(kaInput.value).toBe('ত্বরণ কাকে বলে?');

    const submitReviewCheckbox = screen.getByLabelText(
      /রিভিউয়ের জন্য পাঠান \(Submit for Review\)/i,
    ) as HTMLInputElement;
    expect(submitReviewCheckbox.checked).toBe(false);
    fireEvent.click(submitReviewCheckbox);

    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);

    await waitFor(() => {
      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/admin/content/questions/q_motion_cq_1',
        expect.objectContaining({
          type: 'CQ_CREATIVE',
          options: null,
          submitForReview: true,
          cqRubric: expect.objectContaining({
            ka: { mark: 1, criteria: 'ত্বরণ কাকে বলে?' },
          }),
        }),
        { scope: 'admin' },
      );
      expect(onQuestionUpdated).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'q_motion_cq_1', status: 'REVIEW', version: 2 }),
      );
    });
  });

  it('AuthoringStudio edit preserves original topicId on partial chapter lists and handles HTML 502 error cleanly', async () => {
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
        // Partial chapter list that does NOT include chap_motion / top_motion_1
        return [
          {
            id: 'chap_other',
            titleBangla: 'প্রথম অধ্যায়: পরিমাপ',
            topics: [{ id: 'top_other_1', titleBangla: 'ভৌত রাশি' }],
          },
        ];
      }
      return [
        {
          id: 'chap_chem_1',
          titleBangla: 'প্রথম অধ্যায়: রসায়নের ধারণা',
          topics: [{ id: 'top_chem_1', titleBangla: 'রসায়নের পরিধি' }],
        },
      ];
    });

    mockedApi.patch.mockRejectedValueOnce(
      new ApiError(502, 'Bad Gateway', '<html><body>502 Bad Gateway</body></html>'),
    );

    render(<AuthoringStudio mode="edit" initialQuestion={SEEDED_PUBLISHED_MCQ} />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });

    // Submitting must still send original top_motion_1 (NOT top_other_1!)
    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);

    await waitFor(() => {
      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/admin/content/questions/q_motion_mcq_1',
        expect.objectContaining({
          topicId: 'top_motion_1',
        }),
        { scope: 'admin' },
      );
    });

    const alertBanner = await screen.findByRole('alert');
    expect(alertBanner.textContent).not.toContain('<html>');
    expect(alertBanner.textContent).toContain('কন্টেন্ট সংরক্ষণ ব্যর্থ হয়েছে');

    // Manual subject switch intentionally clears preferredTopicRef and selects the new subject topic
    const subjectSelect = screen.getByLabelText(/১\. বিষয়/i) as HTMLSelectElement;
    fireEvent.change(subjectSelect, { target: { value: 'sub_ssc_chemistry' } });
    await screen.findByRole('option', { name: /রসায়নের পরিধি/i });
    expect((screen.getByLabelText(/৩\. নির্দিষ্ট টপিক/i) as HTMLSelectElement).value).toBe(
      'top_chem_1',
    );
  });

  it('AdminEditQuestionPage renders 404 state and role="alert" on 403 error', async () => {
    mockPathname = '/admin/questions/missing_id/edit';
    mockParams = { id: 'missing_id' };

    mockedApi.get.mockRejectedValueOnce(
      new ApiError(404, 'Not Found', { message: 'Question not found' }),
    );

    const notFoundView = render(<AdminEditQuestionPage />);
    expect(await screen.findByText(/প্রশ্নটি পাওয়া যায়নি/i)).toBeDefined();
    expect(screen.getByText('প্রশ্ন তালিকায় ফিরুন').closest('a')?.getAttribute('href')).toBe(
      '/admin/questions',
    );
    notFoundView.unmount();

    mockedApi.get.mockRejectedValueOnce(
      new ApiError(403, 'Forbidden', { message: 'Forbidden' }),
    );

    const forbiddenView = render(<AdminEditQuestionPage />);
    const alert403 = await screen.findByRole('alert');
    expect(alert403.textContent).toMatch(/অনুমতি নেই/i);
    forbiddenView.unmount();

    mockedApi.get.mockRejectedValueOnce(
      new ApiError(401, 'Unauthorized', { message: 'Unauthorized' }),
    );

    render(<AdminEditQuestionPage />);
    const alert401 = await screen.findByRole('alert');
    expect(alert401.textContent).toMatch(/সেশনের মেয়াদ শেষ/i);
  });

  it('AdminEditQuestionPage loads CQ_CREATIVE end-to-end via GET and submits PATCH with options: null and updated cqRubric', async () => {
    mockPathname = '/admin/questions/q_motion_cq_1/edit';
    mockParams = { id: 'q_motion_cq_1' };

    mockedApi.get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/admin/content/questions/q_motion_cq_1') {
        return SEEDED_DRAFT_CQ;
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
      ...SEEDED_DRAFT_CQ,
      cqRubric: {
        ...SEEDED_DRAFT_CQ.cqRubric,
        ka: { mark: 1, criteria: 'সংশোধিত জ্ঞানমূলক প্রশ্ন' },
      },
      version: 2,
    });

    render(<AdminEditQuestionPage />);

    const kaInput = (await screen.findByLabelText(/ক — জ্ঞানমূলক মানদণ্ড/i)) as HTMLTextAreaElement;
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });
    expect(kaInput.value).toBe('ত্বরণ কাকে বলে?');

    fireEvent.change(kaInput, { target: { value: 'সংশোধিত জ্ঞানমূলক প্রশ্ন' } });
    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);

    await waitFor(() => {
      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/admin/content/questions/q_motion_cq_1',
        expect.objectContaining({
          type: 'CQ_CREATIVE',
          options: null,
          cqRubric: expect.objectContaining({
            ka: { mark: 1, criteria: 'সংশোধিত জ্ঞানমূলক প্রশ্ন' },
          }),
        }),
        { scope: 'admin' },
      );
    });
    expect(await screen.findByText(/সৃজনশীল \(CQ\) প্রশ্নটি সফলভাবে আপডেট করা হয়েছে/i)).toBeDefined();
    expect(screen.getByText(/বর্তমান ভার্সন v2/i)).toBeDefined();
  });

  it('AuthoringStudio blocks empty CQ rubric submission in Bengali without calling API', async () => {
    mockCurriculumApi();
    render(<AuthoringStudio initialContentType="CQ" />);

    await screen.findByRole('option', { name: /গতির সমীকরণ/i });

    fireEvent.change(screen.getByPlaceholderText(/প্রশ্নের মূল বিবরণ লিখুন/i), {
      target: { value: 'উদ্দীপক: একটি বস্তু সরলপথে চলছে।' },
    });
    fireEvent.change(screen.getByLabelText(/সরাসরি উত্তর ইনপুট/i), {
      target: { value: 'উত্তর' },
    });
    fireEvent.change(screen.getByLabelText(/মূল ধারণা ইনপুট/i), {
      target: { value: 'গতি' },
    });

    fireEvent.click(
      screen.getByText(/৬-স্তরের ব্যাখ্যাসহ সৃজনশীল প্রশ্ন জমা দাও/i).closest('button')!,
    );

    const alertBanner = await screen.findByRole('alert');
    expect(alertBanner.textContent).toContain(
      'সৃজনশীল (CQ) প্রশ্নের জন্য অন্তত একটি অংশের (ক/খ/গ/ঘ) মানদণ্ড লিখুন।',
    );
    expect(mockedApi.post).not.toHaveBeenCalled();
  });

  it('AuthoringStudio shows ARCHIVED read-only banner with return link and disables save', async () => {
    mockCurriculumApi();
    const archivedQuestion: AdminQuestionItem = {
      ...SEEDED_PUBLISHED_MCQ,
      id: 'q_archived_guard_1',
      status: 'ARCHIVED',
    };

    render(<AuthoringStudio mode="edit" initialQuestion={archivedQuestion} />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });

    expect(
      screen.getByText(/এই প্রশ্নটি আর্কাইভ \(ARCHIVED\) অবস্থায় আছে — সরাসরি সম্পাদনা করা যাবে না।/i),
    ).toBeDefined();
    const backLink = screen.getByText('প্রশ্ন তালিকায় ফিরুন').closest('a');
    expect(backLink?.getAttribute('href')).toBe('/admin/questions');

    const saveBtn = screen
      .getByText(/পরিবর্তন সংরক্ষণ করুন/i)
      .closest('button') as HTMLButtonElement;
    expect(saveBtn.disabled).toBe(true);

    const form = saveBtn.closest('form') as HTMLFormElement;
    fireEvent.submit(form);
    expect(mockedApi.patch).not.toHaveBeenCalled();
  });

  it('AuthoringStudio edit clears stale chapter/topic on subject switch to empty or failing /chapters', async () => {
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
            id: 'chap_motion',
            titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
            topics: [{ id: 'top_motion_1', titleBangla: 'গতির সমীকরণ' }],
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

    render(<AuthoringStudio mode="edit" initialQuestion={SEEDED_PUBLISHED_MCQ} />);

    await screen.findByRole('option', { name: /খালি বিষয়/i });
    const subjectSelect = screen.getByLabelText(/১\. বিষয়/i) as HTMLSelectElement;
    const chapterSelect = screen.getByLabelText(/২\. অধ্যায়/i) as HTMLSelectElement;
    const topicSelect = screen.getByLabelText(/৩\. নির্দিষ্ট টপিক/i) as HTMLSelectElement;

    // 1. Switch to subject with 0 chapters -> clears chapter & topic instead of keeping top_motion_1
    fireEvent.change(subjectSelect, { target: { value: 'sub_empty' } });
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_empty/chapters',
        { scope: 'admin' },
      );
      expect(chapterSelect.value).toBe('');
      expect(topicSelect.value).toBe('');
    });

    // Submitting must block with topic-required error rather than patching top_motion_1
    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);
    const emptyTopicAlert = await screen.findByRole('alert');
    expect(emptyTopicAlert.textContent).toContain('একটি নির্দিষ্ট টপিক নির্বাচন করুন');
    expect(mockedApi.patch).not.toHaveBeenCalled();

    // 2. Switch to subject whose /chapters rejects -> clears chapter & topic and shows error banner
    fireEvent.change(subjectSelect, { target: { value: 'sub_fail' } });
    const failAlert = await screen.findByRole('alert');
    expect(failAlert.textContent).not.toContain('একটি নির্দিষ্ট টপিক নির্বাচন করুন');
    expect(chapterSelect.value).toBe('');
    expect(topicSelect.value).toBe('');
    expect(mockedApi.patch).not.toHaveBeenCalled();
  });

  it('AuthoringStudio create omits textbookCitation when citationBook is blank and trims stem/options on submit', async () => {
    mockCurriculumApi();
    mockedApi.post.mockResolvedValueOnce({ id: 'q_trimmed_1' });

    render(<AuthoringStudio />);
    await screen.findByRole('option', { name: /গতির সমীকরণ/i });

    const stemInput = screen.getByPlaceholderText(/প্রশ্নের মূল বিবরণ লিখুন/i) as HTMLTextAreaElement;
    fireEvent.change(stemInput, { target: { value: '  ত্বরণ কী?  ' } });

    fireEvent.change(screen.getByPlaceholderText('বিকল্প ক এর টেক্সট'), {
      target: { value: '  বেগ পরিবর্তনের হার  ' },
    });
    fireEvent.change(screen.getByPlaceholderText('বিকল্প খ এর টেক্সট'), {
      target: { value: '  সরণের হার  ' },
    });
    fireEvent.change(screen.getByPlaceholderText('বিকল্প গ এর টেক্সট'), {
      target: { value: '  বল  ' },
    });
    fireEvent.change(screen.getByPlaceholderText('বিকল্প ঘ এর টেক্সট'), {
      target: { value: '  কাজ  ' },
    });
    fireEvent.change(screen.getByLabelText(/সরাসরি উত্তর ইনপুট/i), {
      target: { value: '  বেগ পরিবর্তনের হার  ' },
    });
    fireEvent.change(screen.getByLabelText(/মূল ধারণা ইনপুট/i), {
      target: { value: '  a = dv/dt  ' },
    });

    fireEvent.click(screen.getByText(/৬-স্তরের ব্যাখ্যাসহ প্রশ্ন জমা দাও/i).closest('button')!);

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledTimes(1);
    });

    const [, payload] = mockedApi.post.mock.calls[0] as [string, Record<string, unknown>];
    expect(payload.stem).toBe('ত্বরণ কী?');
    expect(payload.options).toEqual([
      { id: 'opt_1', text: 'বেগ পরিবর্তনের হার', isCorrect: true },
      { id: 'opt_2', text: 'সরণের হার', isCorrect: false },
      { id: 'opt_3', text: 'বল', isCorrect: false },
      { id: 'opt_4', text: 'কাজ', isCorrect: false },
    ]);
    expect(payload.explanation).toEqual({
      directAnswer: 'বেগ পরিবর্তনের হার',
      coreConcept: 'a = dv/dt',
    });
    expect(payload.explanation).not.toHaveProperty('textbookCitation');
  });

  it('AuthoringStudio resets stale messages and preserves fallback chapter when initialQuestion.id changes', async () => {
    mockCurriculumApi();
    mockedApi.patch.mockResolvedValueOnce({
      ...SEEDED_PUBLISHED_MCQ,
      version: 3,
    });

    const { rerender } = render(
      <AuthoringStudio mode="edit" initialQuestion={SEEDED_PUBLISHED_MCQ} />,
    );
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/curriculum/subjects/sub_ssc_physics/chapters',
        { scope: 'admin' },
      );
    });

    fireEvent.click(screen.getByText(/পরিবর্তন সংরক্ষণ করুন/i).closest('button')!);
    expect(await screen.findByText(/সফলভাবে আপডেট করা হয়েছে/i)).toBeDefined();

    const secondQuestion: AdminQuestionItem = {
      ...SEEDED_DRAFT_CQ,
      id: 'q_second_2',
      topicId: 'top_second_missing',
      topic: {
        id: 'top_second_missing',
        titleBangla: 'নিউটনের সূত্র',
        chapter: {
          id: 'chap_force',
          titleBangla: 'তৃতীয় অধ্যায়: বল',
          subject: {
            id: 'sub_ssc_physics',
            code: 'ssc_physics',
            nameBangla: 'পদার্থবিজ্ঞান',
          },
        },
      },
    };

    rerender(<AuthoringStudio mode="edit" initialQuestion={secondQuestion} />);

    await waitFor(() => {
      expect(screen.queryByText(/সফলভাবে আপডেট করা হয়েছে/i)).toBeNull();
    });
    expect((screen.getByLabelText(/২\. অধ্যায়/i) as HTMLSelectElement).value).toBe('chap_force');
    expect((screen.getByLabelText(/৩\. নির্দিষ্ট টপিক/i) as HTMLSelectElement).value).toBe(
      'top_second_missing',
    );
  });
});

describe('Lesson authoring helpers', () => {
  const SAMPLE_ADMIN_LESSON: AdminLessonItem = {
    id: 'les_1',
    topicId: 'top_motion_1',
    titleBangla: 'গতির সমীকরণ পাঠ',
    learningGoal: 'সমীকরণ প্রয়োগ করা',
    explanation: '$v = u + at$',
    importantTerms: [{ termBangla: 'বেগ', termEnglish: 'Velocity', definition: 'সরণের হার' }],
    workedExample: { problem: 'সমস্যা ১', stepByStepSolution: 'সমাধান ১' },
    memoryAid: 'v=u+at',
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
        subject: { id: 'sub_ssc_physics', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
      },
    },
  };

  it('hydrates LessonFormState, preserves workedExample when solution-only, and builds edit payloads & editorial fields', () => {
    const hydrated = createInitialLessonFormState(SAMPLE_ADMIN_LESSON);
    expect(hydrated.lessonTitle).toBe('গতির সমীকরণ পাঠ');
    expect(hydrated.terms).toEqual([
      { termBangla: 'বেগ', termEnglish: 'Velocity', definition: 'সরণের হার' },
    ]);
    expect(hydrated.workedExampleProblem).toBe('সমস্যা ১');
    expect(hydrated.workedExampleSolution).toBe('সমাধান ১');
    expect(hydrated.memoryAid).toBe('v=u+at');

    const solutionOnlyCreate = buildLessonPayload({
      topicId: 'top_motion_1',
      lessonTitle: '  শিরোনাম  ',
      learningGoal: '  লক্ষ্য  ',
      lessonExplanation: '  ব্যাখ্যা  ',
      terms: [{ termBangla: ' বল ', termEnglish: ' Force ', definition: ' ধাক্কা ' }],
      workedExampleProblem: '   ',
      workedExampleSolution: '  শুধু সমাধান  ',
      memoryAid: '   ',
    });
    expect(solutionOnlyCreate.workedExample).toEqual({
      problem: '',
      stepByStepSolution: 'শুধু সমাধান',
    });
    expect(solutionOnlyCreate.memoryAid).toBeUndefined();

    const clearedEdit = buildLessonEditPayload({
      topicId: 'top_motion_1',
      lessonTitle: 'শিরোনাম',
      learningGoal: 'লক্ষ্য',
      lessonExplanation: 'ব্যাখ্যা',
      terms: [{ termBangla: 'বল', termEnglish: '', definition: '' }],
      workedExampleProblem: ' ',
      workedExampleSolution: ' ',
      memoryAid: ' ',
    });
    expect(clearedEdit.workedExample).toBeNull();
    expect(clearedEdit.memoryAid).toBeNull();

    expect(buildLessonEditEditorialFields(SAMPLE_ADMIN_LESSON, 'ADMIN', true, false)).toEqual({
      preservePublished: true,
    });
    expect(buildLessonEditEditorialFields(SAMPLE_ADMIN_LESSON, 'EDITOR', true, false)).toEqual({
      preservePublished: false,
    });
    expect(
      buildLessonEditEditorialFields({ ...SAMPLE_ADMIN_LESSON, status: 'DRAFT' }, 'EDITOR', false, true),
    ).toEqual({ submitForReview: true });

    const widenedChapters = ensureChapterTopicInList([], SAMPLE_ADMIN_LESSON.topic);
    expect(widenedChapters).toHaveLength(1);
    expect(widenedChapters[0].topics[0].id).toBe('top_motion_1');
  });
});

