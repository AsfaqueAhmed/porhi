import type {
  AdminLessonItem,
  AdminQuestionItem,
  CQRubric,
  QuestionTopicHierarchy,
} from '@pori/shared';
import { formatAdminApiError } from '@/lib/admin-api-errors';

export type AuthoringContentType = 'MCQ' | 'CQ';

export interface SubjectOption {
  id: string;
  code: string;
  nameBangla: string;
  classLevel?: string;
  syllabusYear?: number;
}

export interface ChapterOption {
  id: string;
  titleBangla: string;
  topics: { id: string; titleBangla: string }[];
}

export interface McqOptionDraft {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface LessonTermDraft {
  termBangla: string;
  termEnglish: string;
  definition: string;
}

export interface QuestionFormState {
  stem: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  boardSource: string;
  options: McqOptionDraft[];
  correctOptionIndex: number;
  cqRubric: CQRubric;
  directAnswer: string;
  coreConcept: string;
  stepDerivation: string;
  distractorMap: Record<string, string>;
  citationBook: string;
  citationChapter: string;
  citationPage: string;
  proTip: string;
}

export interface LessonFormState {
  lessonTitle: string;
  learningGoal: string;
  lessonExplanation: string;
  interactiveWidgetUrl?: string;
  terms: LessonTermDraft[];
  workedExampleProblem: string;
  workedExampleSolution: string;
  memoryAid: string;
}

export const DEFAULT_SUBJECTS: SubjectOption[] = [
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

export const DEFAULT_CHAPTERS_MAP: Record<string, ChapterOption[]> = {
  sub_ssc_physics: [
    {
      id: 'chap_ssc_physics_ch1',
      titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
      topics: [],
    },
    {
      id: 'chap_ssc_physics_ch2',
      titleBangla: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
      topics: [
        {
          id: 'top_ssc_physics_motion_eq',
          titleBangla: 'গতির সমীকরণ ও সমাধান',
        },
      ],
    },
  ],
  sub_ssc_chemistry: [
    {
      id: 'chap_ssc_chem_ch1',
      titleBangla: 'প্রথম অধ্যায়: রসায়নের ধারণা',
      topics: [
        {
          id: 'top_ssc_chem_ch1_scope',
          titleBangla: 'রসায়নের পরিধি ও গুরুত্ব',
        },
      ],
    },
  ],
};

export const EMPTY_OPTIONS: McqOptionDraft[] = [
  { id: 'opt_1', text: '', isCorrect: true },
  { id: 'opt_2', text: '', isCorrect: false },
  { id: 'opt_3', text: '', isCorrect: false },
  { id: 'opt_4', text: '', isCorrect: false },
];

export const EMPTY_RUBRIC: CQRubric = {
  ka: { mark: 1, criteria: '' },
  kha: { mark: 2, criteria: '' },
  ga: { mark: 3, criteria: '' },
  gha: { mark: 4, criteria: '' },
};

export const CQ_SECTIONS = [
  {
    key: 'ka',
    title: 'ক — জ্ঞানমূলক মানদণ্ড',
    placeholder: 'ক অংশের জ্ঞানমূলক প্রশ্ন ও মূল্যায়ন মানদণ্ড লিখুন...',
  },
  {
    key: 'kha',
    title: 'খ — অনুধাবনমূলক মানদণ্ড',
    placeholder: 'খ অংশের অনুধাবনমূলক প্রশ্ন ও মূল্যায়ন মানদণ্ড লিখুন...',
  },
  {
    key: 'ga',
    title: 'গ — প্রয়োগমূলক মানদণ্ড',
    placeholder: 'গ অংশের প্রয়োগমূলক সমস্যা ও সমাধান ধাপ লিখুন...',
  },
  {
    key: 'gha',
    title: 'ঘ — উচ্চতর দক্ষতা মানদণ্ড',
    placeholder: 'ঘ অংশের বিশ্লেষণমূলক প্রশ্ন ও মূল্যায়ন মানদণ্ড লিখুন...',
  },
] as const;

export const SAMPLE_MCQ_TEMPLATE: Partial<QuestionFormState> = {
  stem: 'স্থির অবস্থান থেকে $2\\text{ ms}^{-2}$ সুষম ত্বরণে চলা একটি গাড়ি $4\\text{ s}$ পর কত বেগ অর্জন করবে?',
  difficulty: 'MEDIUM',
  boardSource: 'Dhaka Board 2024',
  options: [
    { id: 'opt_1', text: '4 ms⁻¹', isCorrect: false },
    { id: 'opt_2', text: '8 ms⁻¹', isCorrect: true },
    { id: 'opt_3', text: '16 ms⁻¹', isCorrect: false },
    { id: 'opt_4', text: '20 ms⁻¹', isCorrect: false },
  ],
  correctOptionIndex: 1,
  directAnswer: 'সঠিক উত্তর (খ) 8 ms⁻¹।',
  coreConcept:
    'গতির ১ম সমীকরণ: $v = u + at$ অনুযায়ী শেষ বেগ আদি বেগ ও ত্বরণ-সময়ের গুণফলের সমষ্টি।',
  stepDerivation:
    'দেওয়া আছে:\n$u = 0\\text{ ms}^{-1}$ (স্থির অবস্থান)\n$a = 2\\text{ ms}^{-2}$\n$t = 4\\text{ s}$\n\nঅতএব, $v = 0 + (2 \\times 4) = 8\\text{ ms}^{-1}$।',
  distractorMap: {
    opt_1: 'এটি কেবল সময়ের মান (4 s), বেগ নয়।',
    opt_2: 'সঠিক গণনা: $v = at = 2 \\times 4 = 8\\text{ ms}^{-1}$।',
    opt_3: 'দূরত্বের সূত্র $s = \\frac{1}{2}at^2$ এর সাথে বিভ্রান্তির ফলে ভুল।',
    opt_4: 'ভুল গুণন।',
  },
  citationBook: 'পদার্থবিজ্ঞান (৯ম-১০ম শ্রেণি)',
  citationChapter: 'দ্বিতীয় অধ্যায়: গতি',
  citationPage: '45',
  proTip: 'স্থির অবস্থান থেকে শুরু বললে $u = 0$, ফলে সরাসরি $v = at$ গুণ করলেই উত্তর চলে আসে।',
};

export const SAMPLE_CQ_TEMPLATE: Partial<QuestionFormState> = {
  stem: 'স্থির অবস্থান থেকে একটি গাড়ি $2\\text{ ms}^{-2}$ সুষম ত্বরণে $6\\text{ s}$ চলার পর সমবেগে চলতে শুরু করল।',
  difficulty: 'HARD',
  boardSource: 'Rajshahi Board 2024',
  cqRubric: {
    ka: { mark: 1, criteria: 'সুষম ত্বরণ কাকে বলে?' },
    kha: { mark: 2, criteria: 'সমবেগে চলমান বস্তুর ত্বরণ শূন্য হয় কেন?' },
    ga: { mark: 3, criteria: '$6\\text{ s}$ পর গাড়িটির বেগ ও অতিক্রান্ত দূরত্ব নির্ণয় কর।' },
    gha: { mark: 4, criteria: 'গাড়িটির গতির বেগ-সময় লেখচিত্র অঙ্কন ও বিশ্লেষণ কর।' },
  },
  directAnswer: 'গ-এর উত্তর: বেগ $12\\text{ ms}^{-1}$, দূরত্ব $36\\text{ m}$।',
  coreConcept: 'সুষম ত্বরণে $v = u + at$ এবং $s = ut + \\frac{1}{2}at^2$ প্রযোজ্য।',
  stepDerivation:
    '$v = 0 + 2 \\times 6 = 12\\text{ ms}^{-1}$; $s = \\frac{1}{2} \\times 2 \\times 36 = 36\\text{ m}$।',
  citationBook: 'পদার্থবিজ্ঞান (৯ম-১০ম শ্রেণি)',
  citationChapter: 'দ্বিতীয় অধ্যায়: গতি',
  citationPage: '49',
  proTip: 'লেখচিত্রের ঢাল ত্বরণ নির্দেশ করে।',
};

export const SAMPLE_LESSON_TEMPLATE: LessonFormState = {
  lessonTitle: 'নিউটনের ৩য় গতিসূত্র ও রকেটের উড্ডয়ন',
  learningGoal:
    'ক্রিয়া ও প্রতিক্রিয়া বলের সমতা ও দিক বুঝতে পারা এবং রকেটের ভরবেগ সংরক্ষণ ব্যাখ্যা করা।',
  lessonExplanation:
    'প্রত্যেক ক্রিয়ারই একটি সমান ও বিপরীত প্রতিক্রিয়া আছে:\n$$F_1 = -F_2$$\n\nভরবেগের পরিবর্তন:\n$$m_1 v_1 + m_2 v_2 = 0$$',
  terms: [
    {
      termBangla: 'ক্রিয়া বল',
      termEnglish: 'Action Force',
      definition: 'একটি বস্তু অপর বস্তুর ওপর যে বল প্রয়োগ করে।',
    },
    {
      termBangla: 'প্রতিক্রিয়া বল',
      termEnglish: 'Reaction Force',
      definition: 'দ্বিতীয় বস্তু প্রথম বস্তুর ওপর যে বিপরীতমুখী বল দেয়।',
    },
  ],
  workedExampleProblem:
    '$500\\text{ kg}$ ভরের রকেট থেকে $1000\\text{ ms}^{-1}$ বেগে গ্যাস নির্গত হলে...',
  workedExampleSolution: 'ভরবেগের সংরক্ষণ সূত্র ব্যবহার করে: $m_R v_R = m_g v_g$',
  memoryAid: 'মনে রাখার ছন্দ: "বল দিলে বল পাবে, উল্টো দিকে সমান যাবে!"',
};

export function createInitialQuestionFormState(
  question?: AdminQuestionItem | null,
): QuestionFormState {
  if (!question) {
    return {
      stem: '',
      difficulty: 'MEDIUM',
      boardSource: '',
      options: EMPTY_OPTIONS.map((opt) => ({ ...opt })),
      correctOptionIndex: 0,
      cqRubric: normalizeRubric(EMPTY_RUBRIC),
      directAnswer: '',
      coreConcept: '',
      stepDerivation: '',
      distractorMap: {},
      citationBook: '',
      citationChapter: '',
      citationPage: '',
      proTip: '',
    };
  }
  const options = normalizeOptions(question.options);
  return {
    stem: question.stem || '',
    difficulty: normalizeDifficulty(question.difficulty),
    boardSource: question.boardSource ?? '',
    options,
    correctOptionIndex: Math.max(
      0,
      options.findIndex((opt) => opt.isCorrect),
    ),
    cqRubric: normalizeRubric(question.cqRubric),
    directAnswer: question.explanation?.directAnswer ?? '',
    coreConcept: question.explanation?.coreConcept ?? '',
    stepDerivation: question.explanation?.stepDerivation ?? '',
    distractorMap: { ...(question.explanation?.distractorAnalysis ?? {}) },
    citationBook: question.explanation?.textbookCitation?.bookTitle ?? '',
    citationChapter: question.explanation?.textbookCitation?.chapterName ?? '',
    citationPage:
      question.explanation?.textbookCitation?.pageNumber !== undefined
        ? String(question.explanation.textbookCitation.pageNumber)
        : '',
    proTip: question.explanation?.proTipShortcut ?? '',
  };
}

export function createEmptyLessonFormState(): LessonFormState {
  return {
    lessonTitle: '',
    learningGoal: '',
    lessonExplanation: '',
    interactiveWidgetUrl: '',
    terms: [{ termBangla: '', termEnglish: '', definition: '' }],
    workedExampleProblem: '',
    workedExampleSolution: '',
    memoryAid: '',
  };
}

export function createInitialLessonFormState(
  lesson?: AdminLessonItem | null,
): LessonFormState {
  if (!lesson) {
    return createEmptyLessonFormState();
  }
  const normalizedTerms: LessonTermDraft[] =
    Array.isArray(lesson.importantTerms) && lesson.importantTerms.length > 0
      ? lesson.importantTerms.map((t) => ({
          termBangla: t.termBangla ?? '',
          termEnglish: t.termEnglish ?? '',
          definition: t.definition ?? '',
        }))
      : [{ termBangla: '', termEnglish: '', definition: '' }];

  return {
    lessonTitle: lesson.titleBangla || '',
    learningGoal: lesson.learningGoal || '',
    lessonExplanation: lesson.explanation || '',
    interactiveWidgetUrl: lesson.interactiveWidgetUrl || '',
    terms: normalizedTerms,
    workedExampleProblem: lesson.workedExample?.problem ?? '',
    workedExampleSolution: lesson.workedExample?.stepByStepSolution ?? '',
    memoryAid: lesson.memoryAid ?? '',
  };
}

export function formatAuthoringApiError(err: unknown): string {
  return formatAdminApiError(err, {
    unauthorized: 'সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।',
    forbidden: 'এই কাজটি করার অনুমতি নেই (Editor বা Admin অধিকার প্রয়োজন)।',
    badRequest: 'কন্টেন্টের তথ্য সঠিক নয়। অনুগ্রহ করে ইনপুট যাচাই করুন।',
    serverError: 'কন্টেন্ট সংরক্ষণ ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
    unknown: 'কন্টেন্ট সংরক্ষণ ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
  });
}

export function formatHierarchyFetchError(err: unknown): string {
  return formatAdminApiError(err, {
    unauthorized: 'সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।',
    forbidden: 'এই কাজটি করার অনুমতি নেই (Editor বা Admin অধিকার প্রয়োজন)।',
    serverError: 'নির্বাচিত বিষয়ের অধ্যায় তালিকা লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
    unknown: 'নির্বাচিত বিষয়ের অধ্যায় তালিকা লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
  });
}

export function toAsciiDigits(value: string): string {
  return value.replace(/[০-৯]/g, (digit) => String('০১২৩৪৫৬৭৮৯'.indexOf(digit)));
}

export function normalizeDifficulty(difficulty?: string): 'EASY' | 'MEDIUM' | 'HARD' {
  if (difficulty === 'EASY' || difficulty === 'MEDIUM' || difficulty === 'HARD') {
    return difficulty;
  }
  return 'MEDIUM';
}

export function normalizeOptions(options?: AdminQuestionItem['options']): McqOptionDraft[] {
  if (!Array.isArray(options) || options.length === 0) {
    return EMPTY_OPTIONS.map((opt) => ({ ...opt }));
  }
  return options.map((opt, idx) => ({
    id: opt.id || `opt_${idx + 1}`,
    text: opt.text || '',
    isCorrect: Boolean(opt.isCorrect),
  }));
}

export function normalizeRubric(rubric?: Partial<CQRubric> | null): CQRubric {
  return {
    ka: { mark: rubric?.ka?.mark ?? 1, criteria: rubric?.ka?.criteria ?? '' },
    kha: { mark: rubric?.kha?.mark ?? 2, criteria: rubric?.kha?.criteria ?? '' },
    ga: { mark: rubric?.ga?.mark ?? 3, criteria: rubric?.ga?.criteria ?? '' },
    gha: { mark: rubric?.gha?.mark ?? 4, criteria: rubric?.gha?.criteria ?? '' },
  };
}

export function buildCqRubricPayload(rubric: CQRubric): Partial<CQRubric> {
  const payload: Partial<CQRubric> = {};
  for (const part of CQ_SECTIONS) {
    const item = rubric[part.key];
    if (item && item.criteria.trim()) {
      payload[part.key] = {
        mark: Number.isFinite(item.mark) && item.mark >= 0 ? item.mark : 0,
        criteria: item.criteria.trim(),
      };
    }
  }
  return payload;
}

export function hasCqRubricCriteria(rubric: CQRubric): boolean {
  return Object.keys(buildCqRubricPayload(rubric)).length > 0;
}

export function buildEditEditorialFields(
  question: AdminQuestionItem,
  boardSource: string,
  adminRole: string | undefined,
  preservePublished: boolean,
  submitForReview: boolean,
) {
  return {
    boardSource: boardSource.trim() || null,
    ...(question.status === 'PUBLISHED'
      ? { preservePublished: adminRole === 'ADMIN' ? preservePublished : false }
      : {}),
    ...(question.status === 'DRAFT' || question.status === 'CORRECTION'
      ? { submitForReview }
      : {}),
  };
}

export interface ExplanationFormInput {
  directAnswer: string;
  coreConcept: string;
  stepDerivation: string;
  citationBook: string;
  citationChapter: string;
  citationPage: string;
  proTip: string;
  distractorAnalysis?: Record<string, string>;
}

export function buildExplanationPayload(input: ExplanationFormInput) {
  const parsedPage = Number.parseInt(toAsciiDigits(input.citationPage), 10);
  const hasBookTitle = Boolean(input.citationBook.trim());

  return {
    directAnswer: input.directAnswer.trim(),
    coreConcept: input.coreConcept.trim(),
    ...(input.stepDerivation.trim() ? { stepDerivation: input.stepDerivation.trim() } : {}),
    ...(hasBookTitle
      ? {
          textbookCitation: {
            bookTitle: input.citationBook.trim(),
            chapterName: input.citationChapter.trim(),
            ...(Number.isFinite(parsedPage) && parsedPage > 0
              ? { pageNumber: parsedPage }
              : {}),
          },
        }
      : {}),
    ...(input.proTip.trim() ? { proTipShortcut: input.proTip.trim() } : {}),
    ...(input.distractorAnalysis && Object.keys(input.distractorAnalysis).length > 0
      ? { distractorAnalysis: input.distractorAnalysis }
      : {}),
  };
}

export function buildDistractorPayload(
  options: McqOptionDraft[],
  distractorMap: Record<string, string>,
): Record<string, string> | undefined {
  const payload: Record<string, string> = {};
  for (const opt of options) {
    const analysis = distractorMap[opt.id]?.trim();
    if (analysis) {
      payload[opt.id] = analysis;
    }
  }
  return Object.keys(payload).length > 0 ? payload : undefined;
}

export function buildCqCreatePayload(params: {
  topicId: string;
  stem: string;
  cqRubric: Partial<CQRubric>;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  boardSource: string;
  explanation: ReturnType<typeof buildExplanationPayload>;
}) {
  return {
    topicId: params.topicId,
    type: 'CQ_CREATIVE' as const,
    stem: params.stem.trim(),
    cqRubric: params.cqRubric,
    difficulty: params.difficulty,
    boardSource: params.boardSource.trim() || undefined,
    explanation: params.explanation,
  };
}

export function buildMcqPayload(params: {
  topicId: string;
  stem: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  boardSource: string;
  options: McqOptionDraft[];
  correctOptionIndex: number;
  explanation: ReturnType<typeof buildExplanationPayload>;
}) {
  return {
    topicId: params.topicId,
    type: 'MCQ' as const,
    stem: params.stem.trim(),
    difficulty: params.difficulty,
    boardSource: params.boardSource.trim() || undefined,
    options: params.options.map((opt, i) => ({
      id: opt.id || `opt_${i + 1}`,
      text: opt.text.trim(),
      isCorrect: i === params.correctOptionIndex,
    })),
    explanation: params.explanation,
  };
}

export function buildLessonPayload(params: {
  topicId: string;
  lessonTitle: string;
  learningGoal: string;
  lessonExplanation: string;
  interactiveWidgetUrl?: string;
  terms: LessonTermDraft[];
  workedExampleProblem: string;
  workedExampleSolution: string;
  memoryAid: string;
}) {
  const hasWorkedExample =
    Boolean(params.workedExampleProblem.trim()) ||
    Boolean(params.workedExampleSolution.trim());

  return {
    topicId: params.topicId,
    titleBangla: params.lessonTitle.trim(),
    learningGoal: params.learningGoal.trim(),
    explanation: params.lessonExplanation.trim(),
    interactiveWidgetUrl: params.interactiveWidgetUrl?.trim() || undefined,
    importantTerms: params.terms
      .filter((t) => t.termBangla.trim())
      .map((t) => ({
        termBangla: t.termBangla.trim(),
        termEnglish: t.termEnglish.trim(),
        definition: t.definition.trim(),
      })),
    workedExample: hasWorkedExample
      ? {
          problem: params.workedExampleProblem.trim(),
          stepByStepSolution: params.workedExampleSolution.trim(),
        }
      : undefined,
    memoryAid: params.memoryAid.trim() || undefined,
  };
}

export function buildLessonEditPayload(params: {
  topicId: string;
  lessonTitle: string;
  learningGoal: string;
  lessonExplanation: string;
  interactiveWidgetUrl?: string;
  terms: LessonTermDraft[];
  workedExampleProblem: string;
  workedExampleSolution: string;
  memoryAid: string;
}) {
  const createShape = buildLessonPayload(params);
  return {
    ...createShape,
    interactiveWidgetUrl: params.interactiveWidgetUrl?.trim() || null,
    workedExample: createShape.workedExample ?? null,
    memoryAid: params.memoryAid.trim() || null,
  };
}

export function buildLessonEditEditorialFields(
  lesson: AdminLessonItem,
  adminRole: string | undefined,
  preservePublished: boolean,
  submitForReview: boolean,
) {
  return {
    ...(lesson.status === 'PUBLISHED'
      ? { preservePublished: adminRole === 'ADMIN' ? preservePublished : false }
      : {}),
    ...(lesson.status === 'DRAFT' || lesson.status === 'CORRECTION'
      ? { submitForReview }
      : {}),
  };
}

export function buildSubjectBookTitle(sub: SubjectOption): string {
  const classStr =
    sub.classLevel === 'CLASS_9_10'
      ? '৯ম-১০ম শ্রেণি'
      : sub.classLevel === 'HSC' || sub.classLevel === 'CLASS_11_12'
        ? 'একাদশ-দ্বাদশ শ্রেণি'
        : '';
  return `${sub.nameBangla}${classStr ? ` (${classStr})` : ''}`;
}

export function ensureSubjectInList(
  subjects: SubjectOption[],
  seededSubject?: { id: string; code: string; nameBangla: string } | null,
): SubjectOption[] {
  if (!seededSubject || subjects.some((s) => s.id === seededSubject.id)) {
    return subjects;
  }
  return [
    {
      id: seededSubject.id,
      code: seededSubject.code,
      nameBangla: seededSubject.nameBangla,
    },
    ...subjects,
  ];
}

export function ensureChapterTopicInList(
  chapters: ChapterOption[],
  topic?: QuestionTopicHierarchy | AdminQuestionItem['topic'] | AdminLessonItem['topic'] | null,
): ChapterOption[] {
  if (!topic?.chapter) {
    return chapters;
  }
  const existingChapter = chapters.find((c) => c.id === topic.chapter.id);
  if (existingChapter) {
    if ((existingChapter.topics || []).some((t) => t.id === topic.id)) {
      return chapters;
    }
    return chapters.map((c) =>
      c.id === topic.chapter.id
        ? {
            ...c,
            topics: [
              ...(c.topics || []),
              { id: topic.id, titleBangla: topic.titleBangla },
            ],
          }
        : c,
    );
  }
  return [
    {
      id: topic.chapter.id,
      titleBangla: topic.chapter.titleBangla,
      topics: [{ id: topic.id, titleBangla: topic.titleBangla }],
    },
    ...chapters,
  ];
}
