'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  PenTool,
  HelpCircle,
  BookOpen,
  Sparkles,
  CheckCircle,
  Plus,
  Trash2,
  Send,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import type { AdminQuestionItem, CQRubric } from '@pori/shared';
import { MathToolbar } from '@/components/admin/math-toolbar';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { apiClient, ApiError } from '@/lib/api-client';
import { useAdminAuthStore } from '@/store/admin-auth-store';
import { StudentSimulatorFrame } from './student-simulator-frame';

function isHtmlPayload(value: string): boolean {
  return /^\s*</.test(value);
}

function formatAuthoringApiError(err: ApiError): string {
  if (err.status === 401) {
    return 'সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।';
  }
  if (err.status === 403) {
    return 'এই কাজটি করার অনুমতি নেই (Editor বা Admin অধিকার প্রয়োজন)।';
  }

  if (err.data && typeof err.data === 'object' && 'message' in err.data) {
    const rawMessage = (err.data as { message?: unknown }).message;
    if (Array.isArray(rawMessage)) {
      const joined = rawMessage
        .filter(
          (item): item is string =>
            typeof item === 'string' && item.trim().length > 0 && !isHtmlPayload(item),
        )
        .join(', ');
      if (joined) {
        return joined;
      }
    } else if (
      typeof rawMessage === 'string' &&
      rawMessage.trim() &&
      !isHtmlPayload(rawMessage)
    ) {
      return rawMessage.trim();
    }
  } else if (
    typeof err.data === 'string' &&
    err.data.trim() &&
    !isHtmlPayload(err.data)
  ) {
    return err.data.trim();
  }

  if (err.status === 400) {
    return 'কন্টেন্টের তথ্য সঠিক নয়। অনুগ্রহ করে ইনপুট যাচাই করুন।';
  }

  return 'কন্টেন্ট সংরক্ষণ ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
}

function toAsciiDigits(value: string): string {
  return value.replace(/[০-৯]/g, (digit) => String('০১২৩৪৫৬৭৮৯'.indexOf(digit)));
}

export interface AuthoringStudioProps {
  mode?: 'create' | 'edit';
  initialQuestion?: AdminQuestionItem;
  onContentCreated?: () => void;
  onQuestionUpdated?: (updated: AdminQuestionItem) => void;
  initialTopicId?: string;
  initialSubjectId?: string;
  initialContentType?: 'MCQ' | 'LESSON' | 'CQ';
}

interface SubjectOption {
  id: string;
  code: string;
  nameBangla: string;
  classLevel?: string;
  syllabusYear?: number;
}

interface ChapterOption {
  id: string;
  titleBangla: string;
  topics: { id: string; titleBangla: string }[];
}

interface McqOptionDraft {
  id: string;
  text: string;
  isCorrect: boolean;
}

const DEFAULT_SUBJECTS: SubjectOption[] = [
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

const DEFAULT_CHAPTERS_MAP: Record<string, ChapterOption[]> = {
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

const EMPTY_OPTIONS: McqOptionDraft[] = [
  { id: 'opt_1', text: '', isCorrect: true },
  { id: 'opt_2', text: '', isCorrect: false },
  { id: 'opt_3', text: '', isCorrect: false },
  { id: 'opt_4', text: '', isCorrect: false },
];

const EMPTY_RUBRIC: CQRubric = {
  ka: { mark: 1, criteria: '' },
  kha: { mark: 2, criteria: '' },
  ga: { mark: 3, criteria: '' },
  gha: { mark: 4, criteria: '' },
};

const CQ_RUBRIC_PARTS = [
  { key: 'ka', title: 'ক — জ্ঞানমূলক মানদণ্ড', placeholder: 'ক অংশের জ্ঞানমূলক প্রশ্ন ও মূল্যায়ন মানদণ্ড লিখুন...' },
  { key: 'kha', title: 'খ — অনুধাবনমূলক মানদণ্ড', placeholder: 'খ অংশের অনুধাবনমূলক প্রশ্ন ও মূল্যায়ন মানদণ্ড লিখুন...' },
  { key: 'ga', title: 'গ — প্রয়োগমূলক মানদণ্ড', placeholder: 'গ অংশের প্রয়োগমূলক সমস্যা ও সমাধান ধাপ লিখুন...' },
  { key: 'gha', title: 'ঘ — উচ্চতর দক্ষতা মানদণ্ড', placeholder: 'ঘ অংশের বিশ্লেষণমূলক প্রশ্ন ও মূল্যায়ন মানদণ্ড লিখুন...' },
] as const;

function normalizeDifficulty(difficulty?: string): 'EASY' | 'MEDIUM' | 'HARD' {
  if (difficulty === 'EASY' || difficulty === 'MEDIUM' || difficulty === 'HARD') {
    return difficulty;
  }
  return 'MEDIUM';
}

function normalizeOptions(options?: AdminQuestionItem['options']): McqOptionDraft[] {
  if (!Array.isArray(options) || options.length === 0) {
    return EMPTY_OPTIONS.map((opt) => ({ ...opt }));
  }
  return options.map((opt, idx) => ({
    id: opt.id || `opt_${idx + 1}`,
    text: opt.text || '',
    isCorrect: Boolean(opt.isCorrect),
  }));
}

function normalizeRubric(rubric?: Partial<CQRubric> | null): CQRubric {
  return {
    ka: { mark: rubric?.ka?.mark ?? 1, criteria: rubric?.ka?.criteria ?? '' },
    kha: { mark: rubric?.kha?.mark ?? 2, criteria: rubric?.kha?.criteria ?? '' },
    ga: { mark: rubric?.ga?.mark ?? 3, criteria: rubric?.ga?.criteria ?? '' },
    gha: { mark: rubric?.gha?.mark ?? 4, criteria: rubric?.gha?.criteria ?? '' },
  };
}

function buildEditEditorialFields(
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

export function AuthoringStudio({
  mode = 'create',
  initialQuestion,
  onContentCreated,
  onQuestionUpdated,
  initialTopicId,
  initialSubjectId,
  initialContentType,
}: AuthoringStudioProps) {
  const isEditMode = mode === 'edit' && Boolean(initialQuestion);
  const adminRole = useAdminAuthStore((s) => s.adminUser?.role);

  const [contentType, setContentType] = useState<'MCQ' | 'LESSON' | 'CQ'>(() => {
    if (isEditMode && initialQuestion) {
      return initialQuestion.type === 'CQ_CREATIVE' ? 'CQ' : 'MCQ';
    }
    return initialContentType || 'MCQ';
  });

  const [subjects, setSubjects] = useState<SubjectOption[]>(() => {
    const seededSubject = initialQuestion?.topic?.chapter?.subject;
    if (seededSubject && !DEFAULT_SUBJECTS.some((s) => s.id === seededSubject.id)) {
      return [
        {
          id: seededSubject.id,
          code: seededSubject.code,
          nameBangla: seededSubject.nameBangla,
        },
        ...DEFAULT_SUBJECTS,
      ];
    }
    return DEFAULT_SUBJECTS;
  });

  const [activeSubjectId, setActiveSubjectId] = useState<string>(() => {
    if (isEditMode && initialQuestion?.topic?.chapter?.subject?.id) {
      return initialQuestion.topic.chapter.subject.id;
    }
    return initialSubjectId || 'sub_ssc_physics';
  });

  const [chapters, setChapters] = useState<ChapterOption[]>(() => {
    if (isEditMode && initialQuestion?.topic?.chapter) {
      return [
        {
          id: initialQuestion.topic.chapter.id,
          titleBangla: initialQuestion.topic.chapter.titleBangla,
          topics: [
            {
              id: initialQuestion.topic.id,
              titleBangla: initialQuestion.topic.titleBangla,
            },
          ],
        },
      ];
    }
    return DEFAULT_CHAPTERS_MAP[initialSubjectId || 'sub_ssc_physics'] || [];
  });

  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    if (isEditMode && initialQuestion?.topic?.chapter?.id) {
      return initialQuestion.topic.chapter.id;
    }
    return isEditMode ? '' : 'chap_ssc_physics_ch2';
  });

  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    if (isEditMode && initialQuestion?.topicId) {
      return initialQuestion.topicId;
    }
    return initialTopicId || 'top_ssc_physics_motion_eq';
  });

  const preferredTopicRef = useRef<string | undefined>(
    isEditMode ? initialQuestion?.topicId : initialTopicId,
  );
  const hydratedQuestionIdRef = useRef<string | null>(
    isEditMode && initialQuestion ? initialQuestion.id : null,
  );

  useEffect(() => {
    if (!isEditMode && initialTopicId) {
      preferredTopicRef.current = initialTopicId;
      setSelectedTopicId(initialTopicId);
    }
  }, [isEditMode, initialTopicId]);

  useEffect(() => {
    if (!isEditMode && initialSubjectId) {
      setActiveSubjectId(initialSubjectId);
    }
  }, [isEditMode, initialSubjectId]);

  useEffect(() => {
    if (!isEditMode && initialContentType) {
      setContentType(initialContentType);
    }
  }, [isEditMode, initialContentType]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Editorial flags (edit mode)
  const [preservePublished, setPreservePublished] = useState(false);
  const [submitForReview, setSubmitForReview] = useState(false);

  // Question Form State (MCQ + CQ)
  const [mcqStem, setMcqStem] = useState<string>(() =>
    isEditMode && initialQuestion ? initialQuestion.stem || '' : '',
  );
  const [mcqDifficulty, setMcqDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>(() =>
    isEditMode && initialQuestion
      ? normalizeDifficulty(initialQuestion.difficulty)
      : 'MEDIUM',
  );
  const [mcqBoardSource, setMcqBoardSource] = useState<string>(() =>
    isEditMode && initialQuestion ? initialQuestion.boardSource ?? '' : '',
  );

  const initialOpts =
    isEditMode && initialQuestion ? normalizeOptions(initialQuestion.options) : EMPTY_OPTIONS;
  const [mcqOptions, setMcqOptions] = useState<McqOptionDraft[]>(() =>
    initialOpts.map((opt) => ({ ...opt })),
  );
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(() =>
    Math.max(0, initialOpts.findIndex((opt) => opt.isCorrect)),
  );
  const [cqRubric, setCqRubric] = useState<CQRubric>(() =>
    isEditMode && initialQuestion
      ? normalizeRubric(initialQuestion.cqRubric)
      : normalizeRubric(EMPTY_RUBRIC),
  );

  // 6-Layer Explanations
  const [directAnswer, setDirectAnswer] = useState<string>(() =>
    isEditMode && initialQuestion ? initialQuestion.explanation?.directAnswer ?? '' : '',
  );
  const [coreConcept, setCoreConcept] = useState<string>(() =>
    isEditMode && initialQuestion ? initialQuestion.explanation?.coreConcept ?? '' : '',
  );
  const [stepDerivation, setStepDerivation] = useState<string>(() =>
    isEditMode && initialQuestion ? initialQuestion.explanation?.stepDerivation ?? '' : '',
  );
  const [distractorMap, setDistractorMap] = useState<Record<string, string>>(() =>
    isEditMode && initialQuestion
      ? { ...(initialQuestion.explanation?.distractorAnalysis ?? {}) }
      : {},
  );
  const [citationBook, setCitationBook] = useState<string>(() =>
    isEditMode && initialQuestion
      ? initialQuestion.explanation?.textbookCitation?.bookTitle ?? ''
      : '',
  );
  const [citationChapter, setCitationChapter] = useState<string>(() =>
    isEditMode && initialQuestion
      ? initialQuestion.explanation?.textbookCitation?.chapterName ?? ''
      : '',
  );
  const [citationPage, setCitationPage] = useState<string>(() =>
    isEditMode &&
    initialQuestion?.explanation?.textbookCitation?.pageNumber !== undefined
      ? String(initialQuestion.explanation.textbookCitation.pageNumber)
      : '',
  );
  const [proTip, setProTip] = useState<string>(() =>
    isEditMode && initialQuestion ? initialQuestion.explanation?.proTipShortcut ?? '' : '',
  );

  // Lesson Form State (create mode)
  const [lessonTitle, setLessonTitle] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [lessonExplanation, setLessonExplanation] = useState('');
  const [terms, setTerms] = useState([{ termBangla: '', termEnglish: '', definition: '' }]);
  const [workedExampleProblem, setWorkedExampleProblem] = useState('');
  const [workedExampleSolution, setWorkedExampleSolution] = useState('');
  const [memoryAid, setMemoryAid] = useState('');

  // Re-hydrate if initialQuestion changes to a different question ID in edit mode
  useEffect(() => {
    if (mode !== 'edit' || !initialQuestion) {
      return;
    }
    if (hydratedQuestionIdRef.current === initialQuestion.id) {
      return;
    }
    hydratedQuestionIdRef.current = initialQuestion.id;
    setContentType(initialQuestion.type === 'CQ_CREATIVE' ? 'CQ' : 'MCQ');
    preferredTopicRef.current = initialQuestion.topicId;
    if (initialQuestion.topic?.chapter?.subject?.id) {
      setActiveSubjectId(initialQuestion.topic.chapter.subject.id);
    }
    if (initialQuestion.topic?.chapter?.id) {
      setSelectedChapterId(initialQuestion.topic.chapter.id);
    }
    setSelectedTopicId(initialQuestion.topicId);
    setMcqStem(initialQuestion.stem || '');
    setMcqDifficulty(normalizeDifficulty(initialQuestion.difficulty));
    setMcqBoardSource(initialQuestion.boardSource ?? '');
    const opts = normalizeOptions(initialQuestion.options);
    setMcqOptions(opts);
    setCorrectOptionIndex(Math.max(0, opts.findIndex((o) => o.isCorrect)));
    setCqRubric(normalizeRubric(initialQuestion.cqRubric));
    setDirectAnswer(initialQuestion.explanation?.directAnswer ?? '');
    setCoreConcept(initialQuestion.explanation?.coreConcept ?? '');
    setStepDerivation(initialQuestion.explanation?.stepDerivation ?? '');
    setDistractorMap({ ...(initialQuestion.explanation?.distractorAnalysis ?? {}) });
    setCitationBook(initialQuestion.explanation?.textbookCitation?.bookTitle ?? '');
    setCitationChapter(initialQuestion.explanation?.textbookCitation?.chapterName ?? '');
    setCitationPage(
      initialQuestion.explanation?.textbookCitation?.pageNumber !== undefined
        ? String(initialQuestion.explanation.textbookCitation.pageNumber)
        : '',
    );
    setProTip(initialQuestion.explanation?.proTipShortcut ?? '');
    setPreservePublished(false);
    setSubmitForReview(false);
  }, [mode, initialQuestion]);

  const seededSubjectId = initialQuestion?.topic?.chapter?.subject?.id;
  const seededSubjectCode = initialQuestion?.topic?.chapter?.subject?.code;
  const seededSubjectNameBangla = initialQuestion?.topic?.chapter?.subject?.nameBangla;

  // 1. Fetch available subjects
  useEffect(() => {
    let isMounted = true;
    async function fetchSubjects() {
      try {
        const res = await apiClient.get<SubjectOption[]>('/curriculum/subjects', {
          scope: 'admin',
        });
        if (isMounted && Array.isArray(res) && res.length > 0) {
          if (
            isEditMode &&
            seededSubjectId &&
            seededSubjectCode &&
            seededSubjectNameBangla &&
            !res.some((s) => s.id === seededSubjectId)
          ) {
            setSubjects([
              {
                id: seededSubjectId,
                code: seededSubjectCode,
                nameBangla: seededSubjectNameBangla,
              },
              ...res,
            ]);
          } else {
            setSubjects(res);
          }
          if (!initialSubjectId && !isEditMode) {
            setActiveSubjectId((current) => {
              if (res.some((s) => s.id === current)) {
                return current;
              }
              const defaultSub = res.find((s) => s.code === 'ssc_physics') || res[0];
              return defaultSub.id;
            });
          }
        }
      } catch {
        // Fallback default
      }
    }
    fetchSubjects();
    return () => {
      isMounted = false;
    };
  }, [
    initialSubjectId,
    isEditMode,
    seededSubjectId,
    seededSubjectCode,
    seededSubjectNameBangla,
  ]);

  // 2. Fetch chapters & topics for activeSubjectId
  useEffect(() => {
    let isMounted = true;
    async function fetchHierarchy() {
      try {
        const res = await apiClient.get<ChapterOption[]>(
          `/curriculum/subjects/${activeSubjectId}/chapters`,
          { scope: 'admin' },
        );
        if (!isMounted || !Array.isArray(res)) {
          return;
        }

        if (res.length > 0) {
          const targetTopic = preferredTopicRef.current;
          let matchedChap: ChapterOption | undefined;
          let matchedTopicId = '';

          if (targetTopic) {
            matchedChap = res.find((c) =>
              (c.topics || []).some((t) => t.id === targetTopic),
            );
            if (matchedChap) {
              matchedTopicId = targetTopic;
            } else if (isEditMode) {
              // Preflight Ruling #2: preserve original edited question topic on partial lists
              return;
            }
          }

          if (!matchedChap) {
            matchedChap = res.find((c) => (c.topics || []).length > 0) || res[0];
            matchedTopicId = matchedChap?.topics?.[0]?.id || '';
          }

          setChapters(res);
          setSelectedChapterId(matchedChap.id);
          setSelectedTopicId(matchedTopicId);
          if (!isEditMode && matchedChap.titleBangla) {
            setCitationChapter((prev) => prev || matchedChap!.titleBangla);
          }
        } else if (!isEditMode) {
          setChapters(res);
          setSelectedChapterId('');
          setSelectedTopicId('');
        }
      } catch {
        // Fallback to static mock hierarchy if API fails in create mode
        if (isMounted && !isEditMode) {
          const fallback = DEFAULT_CHAPTERS_MAP[activeSubjectId] || [];
          setChapters(fallback);
          if (fallback.length > 0) {
            const target = fallback.find((c) => (c.topics || []).length > 0) || fallback[0];
            setSelectedChapterId(target.id);
            setSelectedTopicId(target.topics?.[0]?.id || '');
            setCitationChapter((prev) => prev || target.titleBangla);
          } else {
            setSelectedChapterId('');
            setSelectedTopicId('');
          }
        }
      }
    }
    fetchHierarchy();
    return () => {
      isMounted = false;
    };
  }, [activeSubjectId, isEditMode]);

  const handleSubjectChange = (subjectId: string) => {
    preferredTopicRef.current = undefined;
    setActiveSubjectId(subjectId);
    const sub = subjects.find((s) => s.id === subjectId);
    if (sub && !isEditMode) {
      const classStr =
        sub.classLevel === 'CLASS_9_10'
          ? '৯ম-১০ম শ্রেণি'
          : sub.classLevel === 'HSC' || sub.classLevel === 'CLASS_11_12'
            ? 'একাদশ-দ্বাদশ শ্রেণি'
            : '';
      setCitationBook(`${sub.nameBangla}${classStr ? ` (${classStr})` : ''}`);
    }
  };

  const handleChapterChange = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    const chap = chapters.find((c) => c.id === chapterId);
    if (chap) {
      if (!isEditMode) {
        setCitationChapter(chap.titleBangla);
      }
      const firstTopicId = chap.topics?.[0]?.id || '';
      setSelectedTopicId(firstTopicId);
    } else {
      setSelectedTopicId('');
    }
  };

  const handleTopicChange = (topicId: string) => {
    setSelectedTopicId(topicId);
  };

  const handleFillSample = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (contentType === 'MCQ') {
      setMcqStem(
        'স্থির অবস্থান থেকে $2\\text{ ms}^{-2}$ সুষম ত্বরণে চলা একটি গাড়ি $4\\text{ s}$ পর কত বেগ অর্জন করবে?',
      );
      setMcqDifficulty('MEDIUM');
      setMcqBoardSource('Dhaka Board 2024');
      setMcqOptions([
        { id: 'opt_1', text: '4 ms⁻¹', isCorrect: false },
        { id: 'opt_2', text: '8 ms⁻¹', isCorrect: true },
        { id: 'opt_3', text: '16 ms⁻¹', isCorrect: false },
        { id: 'opt_4', text: '20 ms⁻¹', isCorrect: false },
      ]);
      setCorrectOptionIndex(1);
      setDirectAnswer('সঠিক উত্তর (খ) 8 ms⁻¹।');
      setCoreConcept(
        'গতির ১ম সমীকরণ: $v = u + at$ অনুযায়ী শেষ বেগ আদি বেগ ও ত্বরণ-সময়ের গুণফলের সমষ্টি।',
      );
      setStepDerivation(
        'দেওয়া আছে:\n$u = 0\\text{ ms}^{-1}$ (স্থির অবস্থান)\n$a = 2\\text{ ms}^{-2}$\n$t = 4\\text{ s}$\n\nঅতএব, $v = 0 + (2 \\times 4) = 8\\text{ ms}^{-1}$।',
      );
      setDistractorMap({
        opt_1: 'এটি কেবল সময়ের মান (4 s), বেগ নয়।',
        opt_2: 'সঠিক গণনা: $v = at = 2 \\times 4 = 8\\text{ ms}^{-1}$।',
        opt_3: 'দূরত্বের সূত্র $s = \\frac{1}{2}at^2$ এর সাথে বিভ্রান্তির ফলে ভুল।',
        opt_4: 'ভুল গুণন।',
      });
      setCitationBook('পদার্থবিজ্ঞান (৯ম-১০ম শ্রেণি)');
      setCitationChapter('দ্বিতীয় অধ্যায়: গতি');
      setCitationPage('45');
      setProTip(
        'স্থির অবস্থান থেকে শুরু বললে $u = 0$, ফলে সরাসরি $v = at$ গুণ করলেই উত্তর চলে আসে।',
      );
    } else if (contentType === 'CQ') {
      setMcqStem(
        'স্থির অবস্থান থেকে একটি গাড়ি $2\\text{ ms}^{-2}$ সুষম ত্বরণে $6\\text{ s}$ চলার পর সমবেগে চলতে শুরু করল।',
      );
      setMcqDifficulty('HARD');
      setMcqBoardSource('Rajshahi Board 2024');
      setCqRubric({
        ka: { mark: 1, criteria: 'সুষম ত্বরণ কাকে বলে?' },
        kha: { mark: 2, criteria: 'সমবেগে চলমান বস্তুর ত্বরণ শূন্য হয় কেন?' },
        ga: { mark: 3, criteria: '$6\\text{ s}$ পর গাড়িটির বেগ ও অতিক্রান্ত দূরত্ব নির্ণয় কর।' },
        gha: { mark: 4, criteria: 'গাড়িটির গতির বেগ-সময় লেখচিত্র অঙ্কন ও বিশ্লেষণ কর।' },
      });
      setDirectAnswer('গ-এর উত্তর: বেগ $12\\text{ ms}^{-1}$, দূরত্ব $36\\text{ m}$।');
      setCoreConcept('সুষম ত্বরণে $v = u + at$ এবং $s = ut + \\frac{1}{2}at^2$ প্রযোজ্য।');
      setStepDerivation('$v = 0 + 2 \\times 6 = 12\\text{ ms}^{-1}$; $s = \\frac{1}{2} \\times 2 \\times 36 = 36\\text{ m}$।');
      setCitationBook('পদার্থবিজ্ঞান (৯ম-১০ম শ্রেণি)');
      setCitationChapter('দ্বিতীয় অধ্যায়: গতি');
      setCitationPage('49');
      setProTip('লেখচিত্রের ঢাল ত্বরণ নির্দেশ করে।');
    } else {
      setLessonTitle('নিউটনের ৩য় গতিসূত্র ও রকেটের উড্ডয়ন');
      setLearningGoal(
        'ক্রিয়া ও প্রতিক্রিয়া বলের সমতা ও দিক বুঝতে পারা এবং রকেটের ভরবেগ সংরক্ষণ ব্যাখ্যা করা।',
      );
      setLessonExplanation(
        'প্রত্যেক ক্রিয়ারই একটি সমান ও বিপরীত প্রতিক্রিয়া আছে:\n$$F_1 = -F_2$$\n\nভরবেগের পরিবর্তন:\n$$m_1 v_1 + m_2 v_2 = 0$$',
      );
      setTerms([
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
      ]);
      setWorkedExampleProblem(
        '$500\\text{ kg}$ ভরের রকেট থেকে $1000\\text{ ms}^{-1}$ বেগে গ্যাস নির্গত হলে...',
      );
      setWorkedExampleSolution('ভরবেগের সংরক্ষণ সূত্র ব্যবহার করে: $m_R v_R = m_g v_g$');
      setMemoryAid('মনে রাখার ছন্দ: "বল দিলে বল পাবে, উল্টো দিকে সমান যাবে!"');
    }
  };

  const handleInsertFormulaIntoMcq = (formula: string) => {
    setMcqStem((prev) => `${prev} $${formula}$ `);
  };

  const handleInsertFormulaIntoLesson = (formula: string) => {
    setLessonExplanation((prev) => `${prev} $${formula}$ `);
  };

  const handleAddTerm = () => {
    setTerms([...terms, { termBangla: '', termEnglish: '', definition: '' }]);
  };

  const handleRemoveTerm = (idx: number) => {
    setTerms(terms.filter((_, i) => i !== idx));
  };

  const handleOptionCorrectChange = (index: number) => {
    setCorrectOptionIndex(index);
    setMcqOptions((prev) =>
      prev.map((opt, i) => ({
        ...opt,
        isCorrect: i === index,
      })),
    );
  };

  const handleOptionTextChange = (index: number, text: string) => {
    setMcqOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, text } : opt)),
    );
  };

  const handleRubricChange = (
    key: keyof CQRubric,
    field: 'mark' | 'criteria',
    value: string | number,
  ) => {
    setCqRubric((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!selectedTopicId) {
      setErrorMessage(
        'একটি নির্দিষ্ট টপিক নির্বাচন করুন। টপিক ছাড়া প্রশ্ন বা লেসন তৈরি করা যাবে না।',
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const parsedPage = Number.parseInt(toAsciiDigits(citationPage), 10);
      const hasCitation =
        Boolean(citationBook.trim()) ||
        Boolean(citationChapter.trim()) ||
        (Number.isFinite(parsedPage) && parsedPage > 0);

      const baseExplanation = {
        directAnswer: directAnswer.trim(),
        coreConcept: coreConcept.trim(),
        ...(stepDerivation.trim() ? { stepDerivation: stepDerivation.trim() } : {}),
        ...(hasCitation
          ? {
              textbookCitation: {
                bookTitle: citationBook.trim(),
                chapterName: citationChapter.trim(),
                ...(Number.isFinite(parsedPage) && parsedPage > 0
                  ? { pageNumber: parsedPage }
                  : {}),
              },
            }
          : {}),
        ...(proTip.trim() ? { proTipShortcut: proTip.trim() } : {}),
      };

      if (contentType === 'CQ') {
        const cqRubricPayload: Partial<CQRubric> = {};
        for (const part of CQ_RUBRIC_PARTS) {
          const item = cqRubric[part.key];
          if (item && item.criteria.trim()) {
            cqRubricPayload[part.key] = {
              mark: Number.isFinite(item.mark) && item.mark >= 0 ? item.mark : 0,
              criteria: item.criteria.trim(),
            };
          }
        }

        if (Object.keys(cqRubricPayload).length === 0) {
          setErrorMessage(
            'সৃজনশীল (CQ) প্রশ্নের জন্য অন্তত একটি অংশের (ক/খ/গ/ঘ) মানদণ্ড লিখুন।',
          );
          setIsSubmitting(false);
          return;
        }

        // Preflight Ruling #1: omit options on POST create, send options: null only on PATCH edit
        const cqCreatePayload = {
          topicId: selectedTopicId,
          type: 'CQ_CREATIVE' as const,
          stem: mcqStem,
          cqRubric: cqRubricPayload,
          difficulty: mcqDifficulty,
          boardSource: mcqBoardSource.trim() || undefined,
          explanation: baseExplanation,
        };

        if (isEditMode && initialQuestion) {
          const updated = await apiClient.patch<AdminQuestionItem>(
            `/admin/content/questions/${initialQuestion.id}`,
            {
              ...cqCreatePayload,
              options: null,
              ...buildEditEditorialFields(
                initialQuestion,
                mcqBoardSource,
                adminRole,
                preservePublished,
                submitForReview,
              ),
            },
            { scope: 'admin' },
          );
          setSuccessMessage('✅ সৃজনশীল (CQ) প্রশ্নটি সফলভাবে আপডেট করা হয়েছে!');
          setPreservePublished(false);
          setSubmitForReview(false);
          onQuestionUpdated?.(updated);
        } else {
          await apiClient.post('/admin/content/questions', cqCreatePayload, {
            scope: 'admin',
          });
          setSuccessMessage(
            '✅ ৬-স্তরের ব্যাখ্যাসহ সৃজনশীল (CQ) প্রশ্ন সফলভাবে তৈরি হয়েছে!',
          );
        }
      } else if (contentType === 'MCQ') {
        const distractorPayload: Record<string, string> = {};
        for (const opt of mcqOptions) {
          const analysis = distractorMap[opt.id]?.trim();
          if (analysis) {
            distractorPayload[opt.id] = analysis;
          }
        }

        const mcqPayload = {
          topicId: selectedTopicId,
          type: 'MCQ' as const,
          stem: mcqStem,
          difficulty: mcqDifficulty,
          boardSource: mcqBoardSource.trim() || undefined,
          options: mcqOptions.map((opt, i) => ({
            id: opt.id || `opt_${i + 1}`,
            text: opt.text,
            isCorrect: i === correctOptionIndex,
          })),
          explanation: {
            ...baseExplanation,
            ...(Object.keys(distractorPayload).length > 0
              ? { distractorAnalysis: distractorPayload }
              : {}),
          },
        };

        if (isEditMode && initialQuestion) {
          const updated = await apiClient.patch<AdminQuestionItem>(
            `/admin/content/questions/${initialQuestion.id}`,
            {
              ...mcqPayload,
              ...buildEditEditorialFields(
                initialQuestion,
                mcqBoardSource,
                adminRole,
                preservePublished,
                submitForReview,
              ),
            },
            { scope: 'admin' },
          );
          setSuccessMessage('✅ প্রশ্নটি সফলভাবে আপডেট করা হয়েছে!');
          setPreservePublished(false);
          setSubmitForReview(false);
          onQuestionUpdated?.(updated);
        } else {
          await apiClient.post('/admin/content/questions', mcqPayload, { scope: 'admin' });
          setSuccessMessage(
            '✅ ৬-স্তরের ব্যাখ্যাসহ MCQ প্রশ্ন সফলভাবে তৈরি হয়েছে এবং রিভিউ কিউতে যুক্ত করা হয়েছে!',
          );
        }
      } else if (contentType === 'LESSON') {
        const payload = {
          topicId: selectedTopicId,
          titleBangla: lessonTitle,
          learningGoal,
          explanation: lessonExplanation,
          importantTerms: terms.filter((t) => t.termBangla.trim()),
          workedExample: workedExampleProblem
            ? { problem: workedExampleProblem, stepByStepSolution: workedExampleSolution }
            : undefined,
          memoryAid: memoryAid || undefined,
        };

        await apiClient.post('/admin/content/lessons', payload, { scope: 'admin' });
        setSuccessMessage(
          '✅ NCTB লেসন খসড়া সফলভাবে সংরক্ষিত হয়েছে এবং সম্পাদকীয় পর্যালোচনায় পাঠানো হয়েছে!',
        );
      }

      if (!isEditMode && onContentCreated) {
        onContentCreated();
      }
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setErrorMessage(formatAuthoringApiError(err));
      } else if (err instanceof Error && err.message.trim()) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('কন্টেন্ট সংরক্ষণ ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeChapter =
    chapters.find((c) => c.id === selectedChapterId) ||
    (!isEditMode ? chapters[0] : undefined);
  const availableTopics = activeChapter?.topics || [];

  return (
    <div className="space-y-6">
      {/* Header & Type Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-indigo-600" />
            <span>
              {isEditMode
                ? 'প্রশ্ন সম্পাদনা (Edit Question)'
                : 'অথরিং স্টুডিও (Content Authoring Studio)'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isEditMode && initialQuestion
              ? `প্রশ্ন আইডি: ${initialQuestion.id} • বর্তমান ভার্সন v${initialQuestion.version} (${initialQuestion.status})`
              : 'কাঠামোগত ইনপুট, LaTeX সমীকরণ ও ৬-স্তরের ব্যাখ্যার সাথে নতুন কন্টেন্ট তৈরি করুন।'}
          </p>
        </div>

        {isEditMode && initialQuestion ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700">
            <span>
              {initialQuestion.type === 'CQ_CREATIVE' ? 'সৃজনশীল (CQ)' : 'MCQ'} • v
              {initialQuestion.version}
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleFillSample}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              নমুনা ভরুন
            </button>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setContentType('MCQ')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  contentType === 'MCQ'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ৬-স্তরের MCQ
              </button>
              <button
                type="button"
                onClick={() => setContentType('CQ')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  contentType === 'CQ'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                সৃজনশীল (CQ)
              </button>
              <button
                type="button"
                onClick={() => setContentType('LESSON')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  contentType === 'LESSON'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                পাঠ্য লেসন (Lesson)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Mode Editorial Status Warning / Review Controls */}
      {isEditMode && initialQuestion?.status === 'PUBLISHED' && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-start gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              এই প্রশ্নটি বর্তমানে প্রকাশিত (PUBLISHED) অবস্থায় আছে। সংরক্ষণ করলে এটি স্বয়ংক্রিয়ভাবে REVIEW অবস্থায় যাবে।
            </span>
          </div>
          {adminRole === 'ADMIN' && (
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-amber-950 pl-6">
              <input
                type="checkbox"
                checked={preservePublished}
                onChange={(e) => setPreservePublished(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>সরাসরি প্রকাশিত রাখুন (Keep Published)</span>
            </label>
          )}
        </div>
      )}

      {isEditMode &&
        (initialQuestion?.status === 'DRAFT' ||
          initialQuestion?.status === 'CORRECTION') && (
          <div className="bg-indigo-50/70 border border-indigo-200 text-indigo-950 rounded-2xl p-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={submitForReview}
                onChange={(e) => setSubmitForReview(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>রিভিউয়ের জন্য পাঠান (Submit for Review)</span>
            </label>
          </div>
        )}

      {/* Success / Error Banners */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3.5 rounded-xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <Link
            href="/admin/questions"
            className="underline font-bold text-emerald-900 hover:text-emerald-700 shrink-0"
          >
            তালিকায় ফিরুন
          </Link>
        </div>
      )}
      {errorMessage && (
        <div
          role="alert"
          className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2"
        >
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Target Topic Selection: 3-Tier Cascading Dropdowns */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                কারিকুলাম টপিক নির্বাচন
              </h3>
              <p className="text-[11px] text-slate-500">
                বিষয়, অধ্যায় ও নির্দিষ্ট টপিক নির্বাচন করে কন্টেন্ট ট্যাগিং নিশ্চিত করুন।
              </p>
            </div>
          </div>

          {selectedTopicId && (
            <div className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg font-mono self-start sm:self-auto">
              টপিক আইডি: <span className="font-bold text-indigo-700">{selectedTopicId}</span>
            </div>
          )}
        </div>

        {/* 3 Dropdowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Dropdown 1: বিষয় (Subject) */}
          <div>
            <label
              htmlFor="authoring-subject-select"
              className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>১. বিষয় (Subject)</span>
            </label>
            <select
              id="authoring-subject-select"
              value={activeSubjectId}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full text-xs font-medium p-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all outline-none"
            >
              {subjects.map((sub) => {
                const classLabel =
                  sub.classLevel === 'CLASS_9_10'
                    ? 'SSC ৯ম-১০ম'
                    : sub.classLevel === 'HSC' || sub.classLevel === 'CLASS_11_12'
                      ? 'HSC'
                      : sub.classLevel || '';
                return (
                  <option key={sub.id} value={sub.id}>
                    {sub.nameBangla} {classLabel ? `(${classLabel})` : ''} •{' '}
                    {sub.syllabusYear || 2026}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Dropdown 2: অধ্যায় (Chapter) */}
          <div>
            <label
              htmlFor="authoring-chapter-select"
              className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>২. অধ্যায় (Chapter)</span>
            </label>
            <select
              id="authoring-chapter-select"
              value={selectedChapterId}
              onChange={(e) => handleChapterChange(e.target.value)}
              className="w-full text-xs font-medium p-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all outline-none"
            >
              {chapters.length === 0 ? (
                <option value="">অধ্যায় পাওয়া যায়নি...</option>
              ) : (
                chapters.map((chap) => (
                  <option key={chap.id} value={chap.id}>
                    {chap.titleBangla} ({chap.topics?.length || 0}টি টপিক)
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Dropdown 3: নির্দিষ্ট টপিক (Topic) */}
          <div>
            <label
              htmlFor="authoring-topic-select"
              className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>৩. নির্দিষ্ট টপিক (Topic)</span>
            </label>
            <select
              id="authoring-topic-select"
              value={selectedTopicId}
              onChange={(e) => handleTopicChange(e.target.value)}
              className="w-full text-xs font-medium p-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all outline-none"
            >
              {availableTopics.length === 0 ? (
                <option value="">(এই অধ্যায়ে কোনো টপিক নেই)</option>
              ) : (
                availableTopics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.titleBangla}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Helpful alert if the selected chapter has no topics */}
        {selectedChapterId && availableTopics.length === 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-xl text-xs text-amber-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-bold">সতর্কতা:</span>
              <span>
                নির্বাচিত অধ্যায়ের অধীনে কোনো টপিক পাওয়া যায়নি। প্রশ্ন বা লেসন সেভ করার পূর্বে টপিক তৈরি করে নিন।
              </span>
            </div>
            <Link
              href="/admin/curriculum"
              className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline shrink-0"
            >
              কারিকুলামে যান ➔
            </Link>
          </div>
        )}
      </div>

      {/* MCQ & CQ Studio Form with Real-Time Split Simulator */}
      {(contentType === 'MCQ' || contentType === 'CQ') && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Question Input and 6 Layers */}
            <div className="lg:col-span-7 space-y-6">
              {/* Question Stem & Math Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>
                      {contentType === 'CQ'
                        ? 'সৃজনশীল উদ্দীপক (CQ Stimulus / Stem)'
                        : 'প্রশ্নের বিবরণ (Question Stem)'}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <select
                      aria-label="প্রশ্নের কাঠিন্য"
                      value={mcqDifficulty}
                      onChange={(e) =>
                        setMcqDifficulty(e.target.value as 'EASY' | 'MEDIUM' | 'HARD')
                      }
                      className="text-xs font-bold p-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                    >
                      <option value="EASY">সহজ (EASY)</option>
                      <option value="MEDIUM">মাঝারি (MEDIUM)</option>
                      <option value="HARD">কঠিন (HARD)</option>
                    </select>
                    <input
                      type="text"
                      aria-label="বোর্ড পরীক্ষার উৎস"
                      value={mcqBoardSource}
                      onChange={(e) => setMcqBoardSource(e.target.value)}
                      placeholder="বোর্ড পরীক্ষার উৎস"
                      className="text-xs p-1.5 border border-slate-300 rounded-lg w-36"
                    />
                  </div>
                </div>

                <MathToolbar onInsert={handleInsertFormulaIntoMcq} />

                <textarea
                  rows={3}
                  required
                  value={mcqStem}
                  onChange={(e) => setMcqStem(e.target.value)}
                  placeholder="প্রশ্নের মূল বিবরণ লিখুন..."
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />

                {/* Live KaTeX Preview */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>লাইভ সমীকরণ প্রিভিউ:</span>
                  </span>
                  <div className="text-xs text-slate-900">
                    <LatexRenderer content={mcqStem} />
                  </div>
                </div>
              </div>

              {/* MCQ Options OR CQ Rubric */}
              {contentType === 'MCQ' ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    ৪টি উত্তর বিকল্প ও সঠিক উত্তর নির্বাচন
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mcqOptions.map((opt, i) => {
                      const label = ['ক', 'খ', 'গ', 'ঘ'][i] || String(i + 1);
                      const isSelectedCorrect = correctOptionIndex === i;
                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border transition-all ${
                            isSelectedCorrect
                              ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-slate-700">
                              বিকল্প ({label})
                            </span>
                            <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-emerald-700">
                              <input
                                type="radio"
                                name="correctOption"
                                checked={isSelectedCorrect}
                                onChange={() => handleOptionCorrectChange(i)}
                                className="text-emerald-600 focus:ring-emerald-500"
                              />
                              <span>সঠিক উত্তর</span>
                            </label>
                          </div>
                          <input
                            type="text"
                            required
                            value={opt.text}
                            onChange={(e) => handleOptionTextChange(i, e.target.value)}
                            placeholder={`বিকল্প ${label} এর টেক্সট`}
                            className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    সৃজনশীল (CQ) ৪ অংশের প্রশ্ন ও মূল্যায়ন রুব্রিক
                  </h3>
                  <div className="space-y-3">
                    {CQ_RUBRIC_PARTS.map((part) => (
                      <div
                        key={part.key}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <label
                            htmlFor={`cq-${part.key}-criteria`}
                            className="text-xs font-bold text-slate-800"
                          >
                            {part.title}
                          </label>
                          <div className="flex items-center gap-1.5 text-xs">
                            <label
                              htmlFor={`cq-${part.key}-mark`}
                              className="text-[11px] font-semibold text-slate-600"
                            >
                              নম্বর:
                            </label>
                            <input
                              id={`cq-${part.key}-mark`}
                              type="number"
                              min={0}
                              value={cqRubric[part.key].mark}
                              onChange={(e) =>
                                handleRubricChange(
                                  part.key,
                                  'mark',
                                  Math.max(0, Number.parseInt(e.target.value, 10) || 0),
                                )
                              }
                              className="w-14 text-xs p-1 text-center border border-slate-300 rounded-lg bg-white font-mono"
                            />
                          </div>
                        </div>
                        <textarea
                          id={`cq-${part.key}-criteria`}
                          rows={2}
                          value={cqRubric[part.key].criteria}
                          onChange={(e) =>
                            handleRubricChange(part.key, 'criteria', e.target.value)
                          }
                          placeholder={part.placeholder}
                          className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6-Layer Explanations Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    ৬-স্তরের বিশ্লেষণ ও ডিপ এক্সপ্ল্যানেশন সিস্টেম (6-Layer System)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Layer 1: Direct Answer */}
                  <div>
                    <label
                      htmlFor="authoring-direct-answer"
                      className="block text-xs font-bold text-slate-700 mb-1"
                    >
                      স্তর ১: সরাসরি উত্তর (Direct Answer)
                    </label>
                    <input
                      id="authoring-direct-answer"
                      type="text"
                      aria-label="সরাসরি উত্তর ইনপুট"
                      required
                      value={directAnswer}
                      onChange={(e) => setDirectAnswer(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>

                  {/* Layer 2: Core Concept */}
                  <div>
                    <label
                      htmlFor="authoring-core-concept"
                      className="block text-xs font-bold text-slate-700 mb-1"
                    >
                      স্তর ২: মূল ধারণা (Core Concept)
                    </label>
                    <input
                      id="authoring-core-concept"
                      type="text"
                      aria-label="মূল ধারণা ইনপুট"
                      required
                      value={coreConcept}
                      onChange={(e) => setCoreConcept(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                {/* Layer 3: Step Derivation */}
                <div>
                  <label
                    htmlFor="authoring-step-derivation"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    স্তর ৩: গাণিতিক প্রতিপাদন ও ধাপ (Step Derivation with KaTeX)
                  </label>
                  <textarea
                    id="authoring-step-derivation"
                    rows={3}
                    value={stepDerivation}
                    onChange={(e) => setStepDerivation(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                {/* Layer 4: Dynamic option.id Distractor Analysis (MCQ only) */}
                {contentType === 'MCQ' && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700">
                      স্তর ৪: অপশন বিশ্লেষণ (Distractor Analysis — প্রতিটি অপশন কেন ভুল/সঠিক)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mcqOptions.map((opt, idx) => {
                        const label = ['ক', 'খ', 'গ', 'ঘ'][idx] || String(idx + 1);
                        return (
                          <div key={opt.id}>
                            <span className="text-[11px] font-semibold text-slate-500">
                              বিকল্প ({label}) কারণ:
                            </span>
                            <input
                              type="text"
                              aria-label={`বিকল্প (${label}) বিশ্লেষণ`}
                              value={distractorMap[opt.id] ?? ''}
                              onChange={(e) =>
                                setDistractorMap((prev) => ({
                                  ...prev,
                                  [opt.id]: e.target.value,
                                }))
                              }
                              className="w-full text-xs p-2 border border-slate-200 rounded-lg mt-0.5"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Layer 5: Textbook Citation & Layer 6: Pro-Tip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      পাঠ্যবইয়ের নাম
                    </label>
                    <input
                      type="text"
                      value={citationBook}
                      onChange={(e) => setCitationBook(e.target.value)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      অধ্যায়
                    </label>
                    <input
                      type="text"
                      value={citationChapter}
                      onChange={(e) => setCitationChapter(e.target.value)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      পৃষ্ঠা নম্বর
                    </label>
                    <input
                      type="text"
                      value={citationPage}
                      onChange={(e) => setCitationPage(e.target.value)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    স্তর ৬: প্রো-টিপ ও সময় বাঁচানোর কৌশল (Pro-Tip / Shortcut)
                  </label>
                  <input
                    type="text"
                    value={proTip}
                    onChange={(e) => setProTip(e.target.value)}
                    placeholder="শর্টকাট কৌশল লিখুন..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'সংরক্ষণ হচ্ছে...'
                      : isEditMode
                        ? 'পরিবর্তন সংরক্ষণ করুন'
                        : contentType === 'CQ'
                          ? '৬-স্তরের ব্যাখ্যাসহ সৃজনশীল প্রশ্ন জমা দাও'
                          : '৬-স্তরের ব্যাখ্যাসহ প্রশ্ন জমা দাও'}
                  </span>
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Real-Time Interactive Student Mobile Simulator */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <StudentSimulatorFrame
                questionType={contentType === 'CQ' ? 'CQ_CREATIVE' : 'MCQ'}
                stem={mcqStem}
                options={mcqOptions.map((o) => ({
                  id: o.id,
                  text: o.text,
                  isCorrect: o.isCorrect,
                }))}
                cqRubric={cqRubric}
                coreConcept={coreConcept}
                distractors={distractorMap}
                formulaSteps={stepDerivation}
                citationBook={citationBook}
                citationChapter={citationChapter}
                citationPage={citationPage}
                proTip={proTip}
              />
            </div>
          </div>
        </form>
      )}

      {/* Lesson Studio Form */}
      {contentType === 'LESSON' && !isEditMode && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">লেসনের শিরোনাম ও শিখনফল</h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                পাঠের শিরোনাম (বাংলায়)
              </label>
              <input
                type="text"
                required
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                শিখনফল (Learning Goal)
              </label>
              <input
                type="text"
                required
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                মূল ব্যাখ্যা (LaTeX সমীকরণসহ)
              </label>
              <MathToolbar onInsert={handleInsertFormulaIntoLesson} className="mb-2" />
              <textarea
                rows={4}
                required
                value={lessonExplanation}
                onChange={(e) => setLessonExplanation(e.target.value)}
                className="w-full text-xs p-3 border border-slate-300 rounded-xl font-mono"
              />
            </div>

            {/* Live KaTeX Preview */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500">ব্যাখ্যা লাইভ প্রিভিউ:</span>
              <div className="text-xs text-slate-900">
                <LatexRenderer content={lessonExplanation} />
              </div>
            </div>
          </div>

          {/* Important Terms Table Builder */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                গুরুত্বপূর্ণ পরিভাষা ও সংজ্ঞা (Terminology)
              </h3>
              <button
                type="button"
                onClick={handleAddTerm}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>নতুন শব্দ যোগ করো</span>
              </button>
            </div>

            <div className="space-y-2">
              {terms.map((t, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <input
                    type="text"
                    required
                    placeholder="বাংলা শব্দ"
                    value={t.termBangla}
                    onChange={(e) => {
                      const updated = [...terms];
                      updated[idx].termBangla = e.target.value;
                      setTerms(updated);
                    }}
                    className="w-full sm:w-1/4 text-xs p-2 border border-slate-300 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="English Term"
                    value={t.termEnglish}
                    onChange={(e) => {
                      const updated = [...terms];
                      updated[idx].termEnglish = e.target.value;
                      setTerms(updated);
                    }}
                    className="w-full sm:w-1/4 text-xs p-2 border border-slate-300 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="সংজ্ঞা বা সংক্ষিপ্ত ব্যাখ্যা"
                    value={t.definition}
                    onChange={(e) => {
                      const updated = [...terms];
                      updated[idx].definition = e.target.value;
                      setTerms(updated);
                    }}
                    className="w-full sm:w-2/4 text-xs p-2 border border-slate-300 rounded-lg bg-white"
                  />
                  {terms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTerm(idx)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Worked Example & Memory Aid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              গাণিতিক উদাহরণ ও মনে রাখার টেকনিক
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  গাণিতিক সমস্যা (Problem)
                </label>
                <textarea
                  rows={2}
                  value={workedExampleProblem}
                  onChange={(e) => setWorkedExampleProblem(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ধাপওয়ারী সমাধান (Solution)
                </label>
                <textarea
                  rows={2}
                  value={workedExampleSolution}
                  onChange={(e) => setWorkedExampleSolution(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                মনে রাখার টেকনিক / ছন্দ (Mnemonic)
              </label>
              <input
                type="text"
                value={memoryAid}
                onChange={(e) => setMemoryAid(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'সম্পূর্ণ লেসন খসড়া জমা দাও'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
