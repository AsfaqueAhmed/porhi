'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Bookmark,
  RotateCcw,
  Award,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { apiClient } from '@/lib/api-client';
import { QuestionDTO, QuestionType, ContentStatus } from '@pori/shared';
import { toBanglaDigits } from '@/lib/formatters';
import { useUserStore } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import { findTopicHierarchy, DEFAULT_CHAPTERS } from '@/lib/curriculum-data';
import { PracticePageSkeleton } from '@/components/ui/shimmer';

const SAMPLE_QUESTIONS: QuestionDTO[] = [
  {
    id: 'q-mcq-1',
    topicId: 'topic-motion-3',
    type: QuestionType.MCQ,
    stem: 'একটি বস্তু $5\\text{ ms}^{-1}$ আদিবেগে এবং $2\\text{ ms}^{-2}$ সুষম ত্বরণে $4\\text{ s}$ চললে এর শেষবেগ কত হবে?',
    options: [
      { id: 'opt-a', text: '$10\\text{ ms}^{-1}$', isCorrect: false },
      { id: 'opt-b', text: '$13\\text{ ms}^{-1}$', isCorrect: true },
      { id: 'opt-c', text: '$15\\text{ ms}^{-1}$', isCorrect: false },
      { id: 'opt-d', text: '$20\\text{ ms}^{-1}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর হলো (খ) $13\\text{ ms}^{-1}$।',
      coreConcept: 'গতির প্রথম সমীকরণ $v = u + at$ অনুযায়ী সুষম ত্বরণে চলমান বস্তুর শেষবেগ আদিবেগ এবং ত্বরণ ও সময়ের গুণফলের সমষ্টির সমান।',
      stepDerivation: `
এখানে:
- আদিবেগ, $u = 5\\text{ ms}^{-1}$
- ত্বরণ, $a = 2\\text{ ms}^{-2}$
- সময়, $t = 4\\text{ s}$

সূত্রে মান বসিয়ে:
$$v = u + at = 5 + (2 \\times 4) = 5 + 8 = 13\\text{ ms}^{-1}$$
`,
      distractorAnalysis: {
        'ক': '$10\\text{ ms}^{-1}$: ত্বরণ ও সময় গুণ করা হয়নি, কেবল অনুমানের ভুল।',
        'গ': '$15\\text{ ms}^{-1}$: আদিবেগের সাথে $10$ যোগ করার ভুল হিসাব।',
        'ঘ': '$20\\text{ ms}^{-1}$: সরাসরি $5 \\times 4 = 20$ হিসাব করা হয়েছে যা সম্পূর্ণ ভুল সূত্র।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 42,
      },
      proTipShortcut: 'শর্টকাট: ত্বরণ মানে প্রতি সেকেন্ডে বেগ কতটা বাড়ে। এখানে ৪ সেকেন্ডে বেগ বাড়বে $2 \\times 4 = 8$। কাজেই আদিবেগ ৫ এর সাথে ৮ যোগ করলেই মুখে মুখে ১৩ পাওয়া যায়!',
    },
    difficulty: 'EASY',
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q-mcq-2',
    topicId: 'topic-motion-3',
    type: QuestionType.MCQ,
    stem: 'স্থির অবস্থান থেকে মুক্তভাবে পড়ন্ত কোনো বস্তু $3\\text{ s}$ এ $h$ দূরত্ব অতিক্রম করলে, $6\\text{ s}$ এ কত দূরত্ব অতিক্রম করবে?',
    options: [
      { id: 'opt-2a', text: '$2h$', isCorrect: false },
      { id: 'opt-2b', text: '$3h$', isCorrect: false },
      { id: 'opt-2c', text: '$4h$', isCorrect: true },
      { id: 'opt-2d', text: '$9h$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর হলো (গ) $4h$।',
      coreConcept: 'গ্যালিলিওর পড়ন্ত বস্তুর ৩য় সূত্রানুসারে, স্থির অবস্থান থেকে মুক্তভাবে পড়ন্ত বস্তুর অতিক্রান্ত দূরত্ব সময়ের বর্গের সমানুপাতিক ($h \\propto t^2$)।',
      stepDerivation: `
যেহেতু $h \\propto t^2$, তাই:
$$\\frac{h_2}{h_1} = \\left(\\frac{t_2}{t_1}\\right)^2$$
এখানে $t_1 = 3\\text{ s}$ এবং $t_2 = 6\\text{ s}$:
$$\\frac{h_2}{h} = \\left(\\frac{6}{3}\\right)^2 = (2)^2 = 4 \\implies h_2 = 4h$$
`,
      distractorAnalysis: {
        'ক': '$2h$: সময়ের অনুপাতকে সরাসরি দূরত্বের অনুপাত ধরে ফেলার ভুল ($h \\propto t$ ভাবলে এমন ভুল হয়)।',
        'খ': '$3h$: ৩ সেকেন্ডে $h$ হলে ৬ সেকেন্ডে দ্বিগুণ বা তিনগুণ অনুমানের ভুল।',
        'ঘ': '$9h$: সময় $3^2$ ভেবে ভুল বর্গ করা হয়েছে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 48,
      },
      proTipShortcut: 'সময় যত গুণ বাড়ে, অতিক্রান্ত দূরত্ব তার বর্গের গুণ বাড়ে। সময় ২ গুণ হলে দূরত্ব $2^2 = 4$ গুণ হবে।',
    },
    difficulty: 'MEDIUM',
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];

type DifficultyFilter = 'ALL' | 'EASY' | 'MEDIUM' | 'HARD';

export default function PracticeRunnerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const chapterId = (params?.chapterId as string) || 'chap_ssc_physics_ch2';
  const topicId = searchParams?.get('topicId') || '';
  const initialMode = searchParams?.get('mode') === 'mistakes' ? 'MISTAKES' : 'ALL';

  const {
    activeSubject,
    bookmarks,
    savedMistakes,
    recordPracticeAttempt,
    toggleBookmark,
  } = useUserStore();
  const { tr, language } = useLanguageStore();

  const [questions, setQuestions] = useState<QuestionDTO[]>(SAMPLE_QUESTIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('ALL');
  const [practiceMode, setPracticeMode] = useState<'ALL' | 'MISTAKES'>(initialMode);
  const [openLayers, setOpenLayers] = useState<Record<string, boolean>>({
    direct: true,
    concept: true,
    derivation: true,
    distractors: false,
    citation: false,
    protip: true,
  });

  const resolvedChapter = DEFAULT_CHAPTERS.find((c) => c.id === chapterId);
  const chapterTitle = resolvedChapter?.titleBangla || 'অধ্যায় অনুশীলন';

  useEffect(() => {
    async function loadQuestions() {
      setIsLoading(true);
      try {
        const query = topicId ? `?topicId=${encodeURIComponent(topicId)}` : '';
        const res = await apiClient.get<QuestionDTO[]>(`/practice/chapter/${chapterId}/questions${query}`);
        if (res && Array.isArray(res)) {
          const filtered = topicId ? res.filter((q) => !q.topicId || q.topicId === topicId) : res;
          setQuestions(filtered);
        }
      } catch {
        if (topicId) {
          const topicFiltered = SAMPLE_QUESTIONS.filter((q) => q.topicId === topicId);
          setQuestions(topicFiltered);
        } else {
          setQuestions(SAMPLE_QUESTIONS);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadQuestions();
  }, [chapterId, topicId]);

  const activeQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (difficultyFilter !== 'ALL' && (q.difficulty || 'MEDIUM') !== difficultyFilter) {
        return false;
      }
      if (practiceMode === 'MISTAKES') {
        const isLocallyWrongInSession =
          selectedAnswers[q.id] &&
          !q.options?.find((o) => o.id === selectedAnswers[q.id])?.isCorrect;
        const isInSavedMistakes = savedMistakes.some(
          (m) => m.questionId === q.id && !m.resolved
        );
        return Boolean(isLocallyWrongInSession || isInSavedMistakes);
      }
      return true;
    });
  }, [questions, difficultyFilter, practiceMode, selectedAnswers, savedMistakes]);

  const safeIndex = activeQuestions.length > 0 ? Math.min(currentIndex, activeQuestions.length - 1) : 0;
  const currentQ = activeQuestions[safeIndex] || activeQuestions[0];
  const selectedOptionId = currentQ ? selectedAnswers[currentQ.id] : undefined;
  const isAnswered = Boolean(selectedOptionId);

  const handleSelectOption = async (optId: string) => {
    if (!currentQ || isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));

    const hierarchy = findTopicHierarchy(currentQ.topicId || topicId || chapterId);
    let isCorrectResult = Boolean(currentQ.options?.find((o) => o.id === optId)?.isCorrect);
    let correctOptionIdResult = currentQ.options?.find((o) => o.isCorrect)?.id || optId;
    let explanationResult: any = currentQ.explanation;

    try {
      const res = await apiClient.post<{
        isCorrect: boolean;
        correctOptionId: string;
        explanation: any;
      }>('/practice/submit', {
        questionId: currentQ.id,
        selectedOptionId: optId,
      });

      if (res) {
        isCorrectResult = res.isCorrect;
        correctOptionIdResult = res.correctOptionId;
        if (res.explanation) {
          explanationResult = res.explanation;
        }
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === currentQ.id
              ? {
                  ...q,
                  explanation: res.explanation || q.explanation,
                  options: q.options?.map((o) => ({
                    ...o,
                    isCorrect: o.id === res.correctOptionId,
                  })),
                }
              : q
          )
        );
      }
    } catch {
      // Offline fallback: keep local questions
    }

    recordPracticeAttempt({
      questionId: currentQ.id,
      stemBangla: currentQ.stem,
      topicId: currentQ.topicId || hierarchy.topicId,
      topicTitle: hierarchy.topicTitle,
      chapterId,
      chapterTitle: resolvedChapter?.titleBangla || hierarchy.chapterTitle,
      selectedKey: optId,
      correctKey: correctOptionIdResult,
      explanationBangla: explanationResult?.directAnswer || explanationResult?.coreConcept,
      isCorrect: isCorrectResult,
    });
  };

  // Keyboard shortcuts (1-4, Left/Right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tagName = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)) return;
      if (!currentQ) return;

      if (['1', '2', '3', '4'].includes(e.key) && !isAnswered) {
        const idx = Number(e.key) - 1;
        const targetOpt = currentQ.options?.[idx];
        if (targetOpt) {
          handleSelectOption(targetOpt.id);
        }
      } else if (e.key === 'ArrowRight' && safeIndex < activeQuestions.length - 1) {
        setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' && safeIndex > 0) {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, isAnswered, safeIndex, activeQuestions.length]);

  const toggleLayer = (layer: string) => {
    setOpenLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const correctCount = activeQuestions.filter((q) => {
    const chosen = selectedAnswers[q.id];
    return q.options?.find((o) => o.id === chosen)?.isCorrect;
  }).length;

  const answeredCount = activeQuestions.filter((q) => Boolean(selectedAnswers[q.id])).length;
  const wrongInSessionCount = answeredCount - correctCount;
  const isAllActiveAnswered = activeQuestions.length > 0 && answeredCount === activeQuestions.length;
  const sessionAccuracyPct =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  if (isLoading) {
    return <PracticePageSkeleton />;
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {topicId ? tr('টপিকভিত্তিক MCQ অনুশীলন', 'Topic MCQ Practice') : tr('MCQ অনুশীলন', 'MCQ Practice')}
            </span>
            <h1 className="text-xl font-bold text-slate-900">
              {tr('অনুশীলন প্রশ্ন', 'Practice Questions')}
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-lg font-bold text-slate-800">
            {tr('এই টপিকের জন্য বর্তমানে কোনো MCQ প্রশ্ন পাওয়া যায়নি', 'No MCQs currently found for this topic')}
          </h2>
          <p className="text-sm text-slate-500">
            {tr('অধ্যায়ের সকল প্রশ্নের সাথে অনুশীলন করতে নিচের বাটনে চাপ দিন।', 'Click below to practice all MCQs from this chapter.')}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href={`/practice/${chapterId}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              {tr('সম্পূর্ণ অধ্যায় অনুশীলন করো', 'Practice Full Chapter')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isQuestionBookmarked = currentQ
    ? bookmarks.some((b) => b.id === currentQ.id && b.type === 'question')
    : false;

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-12">
      {/* Header and Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {topicId ? tr('টপিকভিত্তিক MCQ অনুশীলন', 'Topic MCQ Practice') : chapterTitle}
            </span>
            <h1 className="text-xl font-bold text-slate-900">
              {tr('প্রশ্ন ', 'Question ')}
              {language === 'bn' ? toBanglaDigits(safeIndex + 1) : safeIndex + 1} /{' '}
              {language === 'bn' ? toBanglaDigits(activeQuestions.length || 1) : activeQuestions.length || 1}
            </h1>
          </div>

          {/* Score indicator */}
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              {tr('সঠিক: ', 'Correct: ')}{language === 'bn' ? toBanglaDigits(correctCount) : correctCount}
            </span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {tr('সম্পন্ন: ', 'Completed: ')}
              {language === 'bn' ? toBanglaDigits(answeredCount) : answeredCount}/
              {language === 'bn' ? toBanglaDigits(activeQuestions.length) : activeQuestions.length}
            </span>
          </div>
        </div>

        {/* Difficulty & Mistake Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { key: 'ALL', labelBn: 'সব', labelEn: 'All' },
                { key: 'EASY', labelBn: 'সহজ', labelEn: 'Easy' },
                { key: 'MEDIUM', labelBn: 'মধ্যম', labelEn: 'Medium' },
                { key: 'HARD', labelBn: 'কঠিন', labelEn: 'Hard' },
              ] as const
            ).map((pill) => (
              <button
                key={pill.key}
                type="button"
                onClick={() => {
                  setDifficultyFilter(pill.key);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  difficultyFilter === pill.key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tr(pill.labelBn, pill.labelEn)}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setPracticeMode((prev) => (prev === 'MISTAKES' ? 'ALL' : 'MISTAKES'));
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              practiceMode === 'MISTAKES'
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
            }`}
          >
            {tr('ভুল প্রশ্ন রিভিউ', 'Mistakes Review')}
          </button>
        </div>
      </div>

      {activeQuestions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-slate-700">
            {tr('এই ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি।', 'No questions match the selected filter.')}
          </p>
          <button
            type="button"
            onClick={() => {
              setDifficultyFilter('ALL');
              setPracticeMode('ALL');
              setCurrentIndex(0);
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            {tr('সকল প্রশ্ন দেখাও', 'Show All Questions')}
          </button>
        </div>
      ) : (
        <>
          {/* Question Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  currentQ?.difficulty === 'EASY'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : currentQ?.difficulty === 'HARD'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {currentQ?.difficulty === 'EASY'
                  ? tr('সহজ', 'Easy')
                  : currentQ?.difficulty === 'HARD'
                  ? tr('কঠিন', 'Hard')
                  : tr('মধ্যম', 'Medium')}
              </span>

              <button
                type="button"
                aria-label="প্রশ্ন বুকমার্ক"
                onClick={() =>
                  currentQ &&
                  toggleBookmark({
                    id: currentQ.id,
                    type: 'question',
                    titleBangla: currentQ.stem.slice(0, 80),
                    subtitleBangla: chapterTitle,
                    href: `/practice/${chapterId}${topicId ? `?topicId=${topicId}` : ''}`,
                  })
                }
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                  isQuestionBookmarked
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-indigo-600'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isQuestionBookmarked ? 'fill-indigo-600' : ''}`} />
                <span>{tr('বুকমার্ক', 'Bookmark')}</span>
              </button>
            </div>

            {/* Stem */}
            <div className="text-lg font-semibold text-slate-900 leading-relaxed">
              <LatexRenderer content={currentQ?.stem} />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQ?.options?.map((opt, idx) => {
                const isChosen = selectedOptionId === opt.id;
                const letters = language === 'bn' ? ['ক', 'খ', 'গ', 'ঘ'] : ['A', 'B', 'C', 'D'];
                const letter = letters[idx] || String(idx + 1);

                let btnStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50';
                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500/30';
                  } else if (isChosen && !opt.isCorrect) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold';
                  } else {
                    btnStyle = 'border-slate-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {letter}
                      </span>
                      <div className="text-sm">
                        <LatexRenderer content={opt.text} />
                      </div>
                    </div>

                    {isAnswered && (
                      <div>
                        {opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {isChosen && !opt.isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6-Layer Instant Explanation Accordion */}
          {isAnswered && currentQ?.explanation && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0.5">
              <div className="bg-slate-900 text-white p-4 font-bold text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{tr('৬-স্তরের তাৎক্ষণিক ব্যাখ্যা ও বিশ্লেষণ', '6-Layer Instant Explanation & Breakdown')}</span>
              </div>

              {/* Layer 1: Direct Answer */}
              <div className="border-b border-slate-100">
                <button
                  onClick={() => toggleLayer('direct')}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
                >
                  <span>{tr('১. সরাসরি উত্তর (Direct Answer)', '1. Direct Answer')}</span>
                  {openLayers.direct ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openLayers.direct && (
                  <div className="p-4 pt-1 text-sm text-slate-700 font-medium">
                    <LatexRenderer content={currentQ.explanation.directAnswer} />
                  </div>
                )}
              </div>

              {/* Layer 2: Core Concept */}
              <div className="border-b border-slate-100">
                <button
                  onClick={() => toggleLayer('concept')}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
                >
                  <span>{tr('২. মূল তত্ত্ব ও কনসেপ্ট (Core Concept)', '2. Core Concept & Theory')}</span>
                  {openLayers.concept ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openLayers.concept && (
                  <div className="p-4 pt-1 text-sm text-slate-700 leading-relaxed">
                    <LatexRenderer content={currentQ.explanation.coreConcept} />
                  </div>
                )}
              </div>

              {/* Layer 3: Step Derivation */}
              {currentQ.explanation.stepDerivation && (
                <div className="border-b border-slate-100">
                  <button
                    onClick={() => toggleLayer('derivation')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
                  >
                    <span>{tr('৩. ধাপে ধাপে গাণিতিক প্রতিপাদন (Step Derivation)', '3. Step-by-Step Derivation')}</span>
                    {openLayers.derivation ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {openLayers.derivation && (
                    <div className="p-4 pt-1 text-sm text-slate-800">
                      <LatexRenderer content={currentQ.explanation.stepDerivation} />
                    </div>
                  )}
                </div>
              )}

              {/* Layer 4: Distractor Analysis */}
              {currentQ.explanation.distractorAnalysis && (
                <div className="border-b border-slate-100">
                  <button
                    onClick={() => toggleLayer('distractors')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
                  >
                    <span>{tr('৪. ভুল অপশনগুলোর বিশ্লেষণ (Distractor Analysis)', '4. Distractor Analysis')}</span>
                    {openLayers.distractors ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {openLayers.distractors && (
                    <div className="p-4 pt-1 space-y-2 text-xs text-slate-600">
                      {Object.entries(currentQ.explanation.distractorAnalysis).map(([optKey, desc]) => (
                        <div key={optKey} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="font-bold text-rose-600 mr-1.5">{tr('অপশন ', 'Option ')}{optKey}:</span>
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Layer 5: Textbook Citation */}
              {currentQ.explanation.textbookCitation && (
                <div className="border-b border-slate-100">
                  <button
                    onClick={() => toggleLayer('citation')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
                  >
                    <span>{tr('৫. পাঠ্যবই রেফারেন্স (NCTB Textbook Citation)', '5. NCTB Textbook Citation')}</span>
                    {openLayers.citation ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {openLayers.citation && (
                    <div className="p-4 pt-1 text-xs text-slate-700 bg-slate-50/50 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>
                        {currentQ.explanation.textbookCitation.bookTitle} •{' '}
                        {currentQ.explanation.textbookCitation.chapterName}
                        {currentQ.explanation.textbookCitation.pageNumber &&
                          ` (${tr('পৃষ্ঠা ', 'Page ')}${language === 'bn' ? toBanglaDigits(currentQ.explanation.textbookCitation.pageNumber) : currentQ.explanation.textbookCitation.pageNumber})`}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Layer 6: Pro Tip / Shortcut */}
              {currentQ.explanation.proTipShortcut && (
                <div>
                  <button
                    onClick={() => toggleLayer('protip')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-amber-900 bg-amber-50/50 hover:bg-amber-50"
                  >
                    <span>{tr('৬. প্রো-টিপ ও শর্টকাট (Pro Tip & Shortcut)', '6. Pro Tip & Shortcut')}</span>
                    {openLayers.protip ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-amber-600" />}
                  </button>
                  {openLayers.protip && (
                    <div className="p-4 pt-1 text-xs text-amber-950 font-medium bg-amber-50/30">
                      <LatexRenderer content={currentQ.explanation.proTipShortcut} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Practice Session Summary Card (when all active questions answered) */}
          {isAllActiveAnswered && (
            <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {tr('অনুশীলন সারসংক্ষেপ', 'Practice Session Summary')}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {language === 'bn'
                        ? `সঠিক: ${toBanglaDigits(correctCount)}টি • ভুল: ${toBanglaDigits(wrongInSessionCount)}টি • নির্ভুলতা: ${toBanglaDigits(sessionAccuracyPct)}%`
                        : `Correct: ${correctCount} • Wrong: ${wrongInSessionCount} • Accuracy: ${sessionAccuracyPct}%`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {wrongInSessionCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const wrongIds = new Set(
                        activeQuestions
                          .filter(
                            (q) =>
                              selectedAnswers[q.id] &&
                              !q.options?.find((o) => o.id === selectedAnswers[q.id])?.isCorrect
                          )
                          .map((q) => q.id)
                      );
                      setSelectedAnswers((prev) => {
                        const next = { ...prev };
                        for (const id of wrongIds) {
                          delete next[id];
                        }
                        return next;
                      });
                      setPracticeMode('MISTAKES');
                      setCurrentIndex(0);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{tr('ভুল প্রশ্নগুলো আবার অনুশীলন করো', 'Retry Incorrect Questions')}</span>
                  </button>
                )}

                <Link
                  href={`/exam/${chapterId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                >
                  <span>{tr('অধ্যায়ের মডেল টেস্ট দাও', 'Take Chapter Model Test')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={safeIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{tr('পূর্ববর্তী প্রশ্ন', 'Previous Question')}</span>
            </button>

            {safeIndex < activeQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow"
              >
                <span>{tr('পরবর্তী প্রশ্ন', 'Next Question')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href={`/curriculum/${activeSubject?.id || 'sub_ssc_physics'}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow"
              >
                <span>{tr('অনুশীলন সম্পন্ন', 'Finish Practice')}</span>
                <CheckCircle2 className="w-4 h-4" />
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
