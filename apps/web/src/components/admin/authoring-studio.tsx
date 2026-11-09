'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { MathToolbar } from '@/components/admin/math-toolbar';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { apiClient, ApiError } from '@/lib/api-client';
import { StudentSimulatorFrame } from './student-simulator-frame';

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
        .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
        .join(', ');
      if (joined) {
        return joined;
      }
    } else if (typeof rawMessage === 'string' && rawMessage.trim()) {
      return rawMessage.trim();
    }
  } else if (typeof err.data === 'string' && err.data.trim()) {
    return err.data.trim();
  }

  if (err.status === 400) {
    return 'কন্টেন্টের তথ্য সঠিক নয়। অনুগ্রহ করে ইনপুট যাচাই করুন।';
  }

  return 'কন্টেন্ট সংরক্ষণ ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
}

interface AuthoringStudioProps {
  onContentCreated?: () => void;
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

export function AuthoringStudio({
  onContentCreated,
  initialTopicId,
  initialSubjectId,
  initialContentType,
}: AuthoringStudioProps) {
  const [contentType, setContentType] = useState<'MCQ' | 'LESSON' | 'CQ'>(
    initialContentType || 'MCQ'
  );
  const [subjects, setSubjects] = useState<SubjectOption[]>(DEFAULT_SUBJECTS);
  const [activeSubjectId, setActiveSubjectId] = useState(
    initialSubjectId || 'sub_ssc_physics'
  );
  const [chapters, setChapters] = useState<ChapterOption[]>(
    DEFAULT_CHAPTERS_MAP['sub_ssc_physics'] || []
  );
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chap_ssc_physics_ch2');
  const [selectedTopicId, setSelectedTopicId] = useState(
    initialTopicId || 'top_ssc_physics_motion_eq'
  );

  useEffect(() => {
    if (initialTopicId) setSelectedTopicId(initialTopicId);
  }, [initialTopicId]);

  useEffect(() => {
    if (initialSubjectId) setActiveSubjectId(initialSubjectId);
  }, [initialSubjectId]);

  useEffect(() => {
    if (initialContentType) setContentType(initialContentType);
  }, [initialContentType]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // MCQ Form State
  const [mcqStem, setMcqStem] = useState('স্থির অবস্থান থেকে $2\\text{ ms}^{-2}$ সুষম ত্বরণে চলা একটি গাড়ি $4\\text{ s}$ পর কত বেগ অর্জন করবে?');
  const [mcqDifficulty, setMcqDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('MEDIUM');
  const [mcqBoardSource, setMcqBoardSource] = useState('Dhaka Board 2024');
  const [mcqOptions, setMcqOptions] = useState([
    { id: 'opt_1', text: '4 ms⁻¹', isCorrect: false },
    { id: 'opt_2', text: '8 ms⁻¹', isCorrect: true },
    { id: 'opt_3', text: '16 ms⁻¹', isCorrect: false },
    { id: 'opt_4', text: '20 ms⁻¹', isCorrect: false },
  ]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(1);

  // 6-Layer Explanations
  const [directAnswer, setDirectAnswer] = useState('সঠিক উত্তর (খ) 8 ms⁻¹।');
  const [coreConcept, setCoreConcept] = useState('গতির ১ম সমীকরণ: $v = u + at$ অনুযায়ী শেষ বেগ আদি বেগ ও ত্বরণ-সময়ের গুণফলের সমষ্টি।');
  const [stepDerivation, setStepDerivation] = useState('দেওয়া আছে:\n$u = 0\\text{ ms}^{-1}$ (স্থির অবস্থান)\n$a = 2\\text{ ms}^{-2}$\n$t = 4\\text{ s}$\n\nঅতএব, $v = 0 + (2 \\times 4) = 8\\text{ ms}^{-1}$।');
  const [distractorA, setDistractorA] = useState('এটি কেবল সময়ের মান (4 s), বেগ নয়।');
  const [distractorB, setDistractorB] = useState('সঠিক গণনা: $v = at = 2 \\times 4 = 8\\text{ ms}^{-1}$।');
  const [distractorC, setDistractorC] = useState('দূরত্বের সূত্র $s = \\frac{1}{2}at^2$ এর সাথে বিভ্রান্তির ফলে ভুল।');
  const [distractorD, setDistractorD] = useState('ভুল গুণন।');
  const [citationBook, setCitationBook] = useState('পদার্থবিজ্ঞান (৯ম-১০ম শ্রেণি)');
  const [citationChapter, setCitationChapter] = useState('দ্বিতীয় অধ্যায়: গতি');
  const [citationPage, setCitationPage] = useState('৪৫');
  const [proTip, setProTip] = useState('স্থির অবস্থান থেকে শুরু বললে $u = 0$, ফলে সরাসরি $v = at$ গুণ করলেই উত্তর চলে আসে।');

  // Lesson Form State
  const [lessonTitle, setLessonTitle] = useState('নিউটনের ৩য় গতিসূত্র ও রকেটের উড্ডয়ন');
  const [learningGoal, setLearningGoal] = useState('ক্রিয়া ও প্রতিক্রিয়া বলের সমতা ও দিক বুঝতে পারা এবং রকেটের ভরবেগ সংরক্ষণ ব্যাখ্যা করা।');
  const [lessonExplanation, setLessonExplanation] = useState('প্রত্যেক ক্রিয়ারই একটি সমান ও বিপরীত প্রতিক্রিয়া আছে:\n$$F_1 = -F_2$$\n\nভরবেগের পরিবর্তন:\n$$m_1 v_1 + m_2 v_2 = 0$$');
  const [terms, setTerms] = useState([
    { termBangla: 'ক্রিয়া বল', termEnglish: 'Action Force', definition: 'একটি বস্তু অপর বস্তুর ওপর যে বল প্রয়োগ করে।' },
    { termBangla: 'প্রতিক্রিয়া বল', termEnglish: 'Reaction Force', definition: 'দ্বিতীয় বস্তু প্রথম বস্তুর ওপর যে বিপরীতমুখী বল দেয়।' },
  ]);
  const [workedExampleProblem, setWorkedExampleProblem] = useState('$500\\text{ kg}$ ভরের রকেট থেকে $1000\\text{ ms}^{-1}$ বেগে গ্যাস নির্গত হলে...');
  const [workedExampleSolution, setWorkedExampleSolution] = useState('ভরবেগের সংরক্ষণ সূত্র ব্যবহার করে: $m_R v_R = m_g v_g$');
  const [memoryAid, setMemoryAid] = useState('মনে রাখার ছন্দ: "বল দিলে বল পাবে, উল্টো দিকে সমান যাবে!"');

  // 1. Fetch available subjects
  useEffect(() => {
    let isMounted = true;
    async function fetchSubjects() {
      try {
        const res = await apiClient.get<SubjectOption[]>('/curriculum/subjects', {
          scope: 'admin',
        });
        if (isMounted && Array.isArray(res) && res.length > 0) {
          setSubjects(res);
          if (!initialSubjectId) {
            const hasCurrent = res.some((s) => s.id === activeSubjectId);
            if (!hasCurrent) {
              const defaultSub = res.find((s) => s.code === 'ssc_physics') || res[0];
              setActiveSubjectId(defaultSub.id);
            }
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
  }, [initialSubjectId, activeSubjectId]);

  // 2. Fetch chapters & topics for activeSubjectId
  useEffect(() => {
    let isMounted = true;
    async function fetchHierarchy() {
      try {
        const res = await apiClient.get<ChapterOption[]>(
          `/curriculum/subjects/${activeSubjectId}/chapters`,
          { scope: 'admin' },
        );
        if (isMounted && Array.isArray(res)) {
          setChapters(res);

          if (res.length > 0) {
            let matchedChap: ChapterOption | undefined;
            let matchedTopicId = '';

            if (initialTopicId) {
              matchedChap = res.find((c) =>
                (c.topics || []).some((t) => t.id === initialTopicId)
              );
              if (matchedChap) {
                matchedTopicId = initialTopicId;
              }
            }

            if (!matchedChap) {
              matchedChap = res.find((c) => (c.topics || []).length > 0) || res[0];
              matchedTopicId = matchedChap?.topics?.[0]?.id || '';
            }

            setSelectedChapterId(matchedChap.id);
            setSelectedTopicId(matchedTopicId);
            if (matchedChap.titleBangla) {
              setCitationChapter(matchedChap.titleBangla);
            }
          } else {
            setSelectedChapterId('');
            setSelectedTopicId('');
          }
        }
      } catch {
        // Fallback to static mock hierarchy if API fails
        if (isMounted) {
          const fallback = DEFAULT_CHAPTERS_MAP[activeSubjectId] || [];
          setChapters(fallback);
          if (fallback.length > 0) {
            const target = fallback.find((c) => (c.topics || []).length > 0) || fallback[0];
            setSelectedChapterId(target.id);
            setSelectedTopicId(target.topics?.[0]?.id || '');
            setCitationChapter(target.titleBangla);
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
  }, [activeSubjectId, initialTopicId]);

  const handleSubjectChange = (subjectId: string) => {
    setActiveSubjectId(subjectId);
    const sub = subjects.find((s) => s.id === subjectId);
    if (sub) {
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
      setCitationChapter(chap.titleBangla);
      const firstTopicId = chap.topics?.[0]?.id || '';
      setSelectedTopicId(firstTopicId);
    } else {
      setSelectedTopicId('');
    }
  };

  const handleTopicChange = (topicId: string) => {
    setSelectedTopicId(topicId);
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
      }))
    );
  };

  const handleOptionTextChange = (index: number, text: string) => {
    setMcqOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, text } : opt))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!selectedTopicId) {
      setErrorMessage('একটি নির্দিষ্ট টপিক নির্বাচন করুন। টপিক ছাড়া প্রশ্ন বা লেসন তৈরি করা যাবে না।');
      setIsSubmitting(false);
      return;
    }

    try {
      if (contentType === 'MCQ') {
        const payload = {
          topicId: selectedTopicId || 'top_ssc_physics_motion_eq',
          type: 'MCQ',
          stem: mcqStem,
          difficulty: mcqDifficulty,
          boardSource: mcqBoardSource || undefined,
          options: mcqOptions.map((opt, i) => ({
            id: opt.id || `opt_${i + 1}`,
            text: opt.text,
            isCorrect: i === correctOptionIndex,
          })),
          explanation: {
            directAnswer,
            coreConcept,
            stepDerivation,
            distractorAnalysis: {
              opt_1: distractorA,
              opt_2: distractorB,
              opt_3: distractorC,
              opt_4: distractorD,
            },
            textbookCitation: {
              bookTitle: citationBook,
              chapterName: citationChapter,
              pageNumber: parseInt(citationPage) || 45,
            },
            proTipShortcut: proTip,
          },
        };

        await apiClient.post('/admin/content/questions', payload);
        setSuccessMessage('✅ ৬-স্তরের ব্যাখ্যাসহ MCQ প্রশ্ন সফলভাবে তৈরি হয়েছে এবং রিভিউ কিউতে যুক্ত করা হয়েছে!');
      } else if (contentType === 'LESSON') {
        const payload = {
          topicId: selectedTopicId || 'top_ssc_physics_motion_eq',
          titleBangla: lessonTitle,
          learningGoal,
          explanation: lessonExplanation,
          importantTerms: terms.filter((t) => t.termBangla.trim()),
          workedExample: workedExampleProblem
            ? { problem: workedExampleProblem, stepByStepSolution: workedExampleSolution }
            : undefined,
          memoryAid: memoryAid || undefined,
        };

        await apiClient.post('/admin/content/lessons', payload);
        setSuccessMessage('✅ NCTB লেসন খসড়া সফলভাবে সংরক্ষিত হয়েছে এবং সম্পাদকীয় পর্যালোচনায় পাঠানো হয়েছে!');
      }

      if (onContentCreated) {
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

  const activeChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];
  const availableTopics = activeChapter?.topics || [];

  return (
    <div className="space-y-6">
      {/* Type Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-indigo-600" />
            <span>অথরিং স্টুডিও (Content Authoring Studio)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            কাঠামোগত ইনপুট, LaTeX সমীকরণ ও ৬-স্তরের ব্যাখ্যার সাথে নতুন কন্টেন্ট তৈরি করুন।
          </p>
        </div>

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

      {/* Success / Error Banners */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>১. বিষয় (Subject)</span>
            </label>
            <select
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
                    {sub.nameBangla} {classLabel ? `(${classLabel})` : ''} • {sub.syllabusYear || 2026}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Dropdown 2: অধ্যায় (Chapter) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>২. অধ্যায় (Chapter)</span>
            </label>
            <select
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>৩. নির্দিষ্ট টপিক (Topic)</span>
            </label>
            <select
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
              <span>নির্বাচিত অধ্যায়ের অধীনে কোনো টপিক পাওয়া যায়নি। প্রশ্ন বা লেসন সেভ করার পূর্বে টপিক তৈরি করে নিন।</span>
            </div>
            <a
              href="/admin/curriculum"
              className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline shrink-0"
            >
              কারিকুলামে যান ➔
            </a>
          </div>
        )}
      </div>

      {/* MCQ Studio Form with Real-Time Split Simulator */}
      {contentType === 'MCQ' && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Question Input and 6 Layers */}
            <div className="lg:col-span-7 space-y-6">
          {/* Question Stem & Math Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>প্রশ্নের বিবরণ (Question Stem)</span>
              </h3>
              <div className="flex items-center gap-2">
                <select
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
                  value={mcqBoardSource}
                  onChange={(e) => setMcqBoardSource(e.target.value)}
                  placeholder="বোর্ড পরীক্ষার উৎস"
                  className="text-xs p-1.5 border border-slate-300 rounded-lg w-32"
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

          {/* 4 Options */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              ৪টি উত্তর বিকল্প ও সঠিক উত্তর নির্বাচন
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mcqOptions.map((opt, i) => {
                const label = ['ক', 'খ', 'গ', 'ঘ'][i];
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
                      <span className="text-xs font-bold text-slate-700">বিকল্প ({label})</span>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  স্তর ১: সরাসরি উত্তর (Direct Answer)
                </label>
                <input
                  type="text"
                  required
                  value={directAnswer}
                  onChange={(e) => setDirectAnswer(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              {/* Layer 2: Core Concept */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  স্তর ২: মূল ধারণা (Core Concept)
                </label>
                <input
                  type="text"
                  required
                  value={coreConcept}
                  onChange={(e) => setCoreConcept(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            {/* Layer 3: Step Derivation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                স্তর ৩: গাণিতিক প্রতিপাদন ও ধাপ (Step Derivation with KaTeX)
              </label>
              <textarea
                rows={3}
                required
                value={stepDerivation}
                onChange={(e) => setStepDerivation(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-mono"
              />
            </div>

            {/* Layer 4: Distractor Analysis for all 4 options */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700">
                স্তর ৪: অপশন বিশ্লেষণ (Distractor Analysis — প্রতিটি অপশন কেন ভুল/সঠিক)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500">বিকল্প (ক) কারণ:</span>
                  <input
                    type="text"
                    value={distractorA}
                    onChange={(e) => setDistractorA(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 rounded-lg mt-0.5"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500">বিকল্প (খ) কারণ:</span>
                  <input
                    type="text"
                    value={distractorB}
                    onChange={(e) => setDistractorB(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 rounded-lg mt-0.5"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500">বিকল্প (গ) কারণ:</span>
                  <input
                    type="text"
                    value={distractorC}
                    onChange={(e) => setDistractorC(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 rounded-lg mt-0.5"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500">বিকল্প (ঘ) কারণ:</span>
                  <input
                    type="text"
                    value={distractorD}
                    onChange={(e) => setDistractorD(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 rounded-lg mt-0.5"
                  />
                </div>
              </div>
            </div>

            {/* Layer 5: Textbook Citation & Layer 6: Pro-Tip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">পাঠ্যবইয়ের নাম</label>
                <input
                  type="text"
                  value={citationBook}
                  onChange={(e) => setCitationBook(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">অধ্যায়</label>
                <input
                  type="text"
                  value={citationChapter}
                  onChange={(e) => setCitationChapter(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">পৃষ্ঠা নম্বর</label>
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
                  <span>{isSubmitting ? 'সংরক্ষণ হচ্ছে...' : '৬-স্তরের ব্যাখ্যাসহ প্রশ্ন জমা দাও'}</span>
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Real-Time Interactive Student Mobile Simulator */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <StudentSimulatorFrame
                stem={mcqStem}
                options={mcqOptions.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect }))}
                coreConcept={coreConcept}
                distractors={{ a: distractorA, b: distractorB, c: distractorC, d: distractorD }}
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
      {contentType === 'LESSON' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">লেসনের শিরোনাম ও শিখনফল</h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">পাঠের শিরোনাম (বাংলায়)</label>
              <input
                type="text"
                required
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">শিখনফল (Learning Goal)</label>
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
              <h3 className="text-sm font-bold text-slate-900">গুরুত্বপূর্ণ পরিভাষা ও সংজ্ঞা (Terminology)</h3>
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
                <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
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
            <h3 className="text-sm font-bold text-slate-900">গাণিতিক উদাহরণ ও মনে রাখার টেকনিক</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">গাণিতিক সমস্যা (Problem)</label>
                <textarea
                  rows={2}
                  value={workedExampleProblem}
                  onChange={(e) => setWorkedExampleProblem(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ধাপওয়ারী সমাধান (Solution)</label>
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
