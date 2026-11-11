'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpen,
  Target,
  Lightbulb,
  Calculator,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  CheckSquare,
  CheckCircle2,
  XCircle,
  StickyNote,
  ChevronRight,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { RichContentRenderer } from '@/components/content/rich-content-renderer';
import { InteractiveSimulationRunner } from '@/components/content/interactive-simulation-runner';
import { apiClient } from '@/lib/api-client';
import { LessonDTO, ContentStatus, QuestionDTO } from '@pori/shared';
import { useLanguageStore } from '@/store/language-store';
import { useUserStore } from '@/store/user-store';
import { findTopicHierarchy, findAdjacentTopics } from '@/lib/curriculum-data';
import { toBanglaDigits } from '@/lib/formatters';
import { LessonPageSkeleton } from '@/components/ui/shimmer';

const SAMPLE_LESSON: LessonDTO = {
  id: 'lesson-motion-equations',
  topicId: 'topic-motion-3',
  titleBangla: 'গতির সমীকরণসমূহ ও গাণিতিক বিশ্লেষণ',
  learningGoal: 'সুসম ত্বরণে চলমান বস্তুর গতির চারটি মৌলিক সমীকরণ ($v = u + at$, $s = \\frac{u+v}{2}t$, $s = ut + \\frac{1}{2}at^2$, $v^2 = u^2 + 2as$) প্রতিপাদন ও এদের গাণিতিক প্রয়োগ ব্যাখ্যা করতে পারবে।',
  explanation: `
কোনো বস্তু যদি $u$ আদিবেগ নিয়ে $a$ সুষম ত্বরণে $t$ সময় ধরে চলে এবং $v$ শেষবেগ প্রাপ্ত হয়ে $s$ দূরত্ব অতিক্রম করে, তবে এদের পারস্পরিক সম্পর্ক নির্ধারণকারী সমীকরণসমূহকে গতির সমীকরণ বলা হয়।

### প্রথম সমীকরণ:
ত্বরণের সংজ্ঞানুযায়ী, সময়ের সাথে বেগের পরিবর্তনের হারকে ত্বরণ বলে:
$$a = \\frac{v - u}{t} \\implies v = u + at$$

### দ্বিতীয় সমীকরণ (গড় বেগের সাহায্যে):
সুষম ত্বরণের ক্ষেত্রে গড় বেগ হলো আদিবেগ ও শেষবেগের গাণিতিক গড়:
$$v_{\\text{avg}} = \\frac{u + v}{2}$$
অতএব, অতিক্রান্ত দূরত্ব:
$$s = v_{\\text{avg}} \\times t = \\left(\\frac{u + v}{2}\\right)t$$

### তৃতীয় সমীকরণ:
প্রথম সমীকরণ থেকে $v = u + at$ এর মান দ্বিতীয় সমীকরণে বসালে পাওয়া যায়:
$$s = ut + \\frac{1}{2}at^2$$

### চতুর্থ সমীকরণ (সময় বর্জন সমীকরণ):
প্রথম সমীকরণ হতে $t = \\frac{v - u}{a}$ মান নিয়ে দ্বিতীয় সমীকরণে প্রতিস্থাপন করলে পাই:
$$v^2 = u^2 + 2as$$
`,
  importantTerms: [
    {
      termBangla: 'আদিবেগ',
      termEnglish: 'Initial Velocity (u)',
      definition: 'গণনা শুরুর মুহূর্তে বস্তুর বেগ। স্থির অবস্থান থেকে শুরু হলে $u = 0$ ধরা হয়।',
    },
    {
      termBangla: 'সুষম ত্বরণ',
      termEnglish: 'Uniform Acceleration (a)',
      definition: 'যদি গতিশীল কোনো বস্তুর বেগ বৃদ্ধির হার সর্বদা সমান থাকে। যেমন অভিকর্ষজ ত্বরণ $g = 9.8 \\text{ m/s}^2$।',
    },
    {
      termBangla: 'অতিক্রান্ত দূরত্ব ও সরণ',
      termEnglish: 'Displacement (s)',
      definition: 'নির্দিষ্ট দিকে বস্তুর অবস্থানের পরিবর্তনকে সরণ বলে। এর একক মিটার ($m$)।',
    },
  ],
  workedExample: {
    problem: 'একটি স্থির ট্রেন $2\\text{ ms}^{-2}$ সুষম ত্বরণে চলতে শুরু করল। $10\\text{ s}$ পর ট্রেনটির বেগ কত হবে এবং এটি কত দূরত্ব অতিক্রম করবে?',
    stepByStepSolution: `
**প্রদত্ত উপাত্ত:**
- আদিবেগ, $u = 0\\text{ ms}^{-1}$ (যেহেতু স্থির অবস্থান থেকে শুরু)
- ত্বরণ, $a = 2\\text{ ms}^{-2}$
- সময়, $t = 10\\text{ s}$

**১. বেগ নির্ণয় ($v$):**
$$v = u + at = 0 + (2 \\times 10) = 20\\text{ ms}^{-1}$$

**২. অতিক্রান্ত দূরত্ব নির্ণয় ($s$):**
$$s = ut + \\frac{1}{2}at^2 = (0 \\times 10) + \\frac{1}{2} \\times 2 \\times (10)^2 = 100\\text{ m}$$

**উত্তর:** ট্রেনটির শেষবেগ $20\\text{ ms}^{-1}$ এবং অতিক্রান্ত দূরত্ব $100\\text{ m}$।
`,
  },
  memoryAid: 'সূত্র বাছাই কৌশল: প্রশ্নে যদি সময় ($t$) না দেওয়া থাকে, সরাসরি $v^2 = u^2 + 2as$ ব্যবহার করো। স্থির অবস্থা বলা থাকলে শুরুতেই $u = 0$ বসিয়ে সমীকরণ সহজ করে নাও।',
  status: ContentStatus.PUBLISHED,
  version: 1,
};

export default function LessonPage() {
  const params = useParams();
  const topicId = (params?.topicId as string) || 'topic-motion-3';
  const { tr, language } = useLanguageStore();
  const {
    completedTopics,
    bookmarks,
    lessonNotes,
    recordLessonVisit,
    markTopicCompleted,
    recordPracticeAttempt,
    toggleBookmark,
    saveLessonNote,
  } = useUserStore();

  const [lesson, setLesson] = useState<LessonDTO>(SAMPLE_LESSON);
  const [isLoadingLesson, setIsLoadingLesson] = useState(true);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const fallbackHierarchy = findTopicHierarchy(topicId);
  const chapterId = lesson?.topic?.chapter?.id || fallbackHierarchy.chapterId;
  const chapterTitle = lesson?.topic?.chapter?.titleBangla || fallbackHierarchy.chapterTitle;
  const subjectId = lesson?.topic?.chapter?.subject?.id || fallbackHierarchy.subjectId;
  const adjacent = findAdjacentTopics(topicId);

  const isCompleted = completedTopics.includes(topicId);
  const isBookmarked = bookmarks.some((b) => b.id === topicId && b.type === 'topic');
  const currentNote = lessonNotes[topicId] || '';

  const [quickQuestion, setQuickQuestion] = useState<QuestionDTO | null>(null);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    isCorrect?: boolean;
    explanation?: any;
  } | null>(null);

  useEffect(() => {
    async function fetchLesson() {
      setIsLoadingLesson(true);
      try {
        const res = await apiClient.get<LessonDTO>(`/lessons/topic/${topicId}`);
        if (res && res.titleBangla) {
          setLesson(res);
          recordLessonVisit(
            topicId,
            res.titleBangla,
            res?.topic?.chapter?.id || fallbackHierarchy.chapterId,
            res?.topic?.chapter?.titleBangla || fallbackHierarchy.chapterTitle
          );
        } else {
          recordLessonVisit(
            topicId,
            fallbackHierarchy.topicTitle,
            fallbackHierarchy.chapterId,
            fallbackHierarchy.chapterTitle
          );
        }
      } catch {
        recordLessonVisit(
          topicId,
          fallbackHierarchy.topicTitle,
          fallbackHierarchy.chapterId,
          fallbackHierarchy.chapterTitle
        );
      } finally {
        setIsLoadingLesson(false);
      }
    }
    fetchLesson();
  }, [topicId]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const questions = await apiClient.get<QuestionDTO[]>(
          `/practice/chapter/${chapterId}/questions?topicId=${encodeURIComponent(topicId)}`
        );
        if (questions && questions.length > 0) {
          const match = questions.find((q) => q.topicId === topicId) || questions[0];
          setQuickQuestion(match);
          setSelectedOptId(null);
          setIsAnswered(false);
          setSubmitResult(null);
        }
      } catch {
        // Fallback: keep null
      }
    }
    fetchQuestions();
  }, [chapterId, topicId]);

  const handleMarkComplete = async () => {
    markTopicCompleted(topicId, lesson.titleBangla, chapterId, chapterTitle);
    try {
      await apiClient.post('/student/lesson-complete', {
        topicId,
        lessonId: lesson.id,
      });
    } catch {
      // Offline fallback: local store already updated
    }
  };

  const handleSelectOption = async (optId: string) => {
    if (isAnswered || !quickQuestion) return;
    setSelectedOptId(optId);
    setIsAnswered(true);

    try {
      const res = await apiClient.post<{
        isCorrect: boolean;
        correctOptionId: string;
        explanation: any;
      }>('/practice/submit', {
        questionId: quickQuestion.id,
        selectedOptionId: optId,
      });

      if (res) {
        setSubmitResult({
          isCorrect: res.isCorrect,
          explanation: res.explanation,
        });
        setQuickQuestion((prev) =>
          prev
            ? {
                ...prev,
                options: prev.options?.map((opt) => ({
                  ...opt,
                  isCorrect: opt.id === res.correctOptionId,
                })),
              }
            : null
        );
        recordPracticeAttempt({
          questionId: quickQuestion.id,
          stemBangla: quickQuestion.stem,
          topicId,
          topicTitle: lesson.titleBangla,
          chapterId,
          chapterTitle,
          selectedKey: optId,
          correctKey: res.correctOptionId,
          explanationBangla: res.explanation?.directAnswer || res.explanation?.coreConcept,
          isCorrect: res.isCorrect,
        });
      }
    } catch {
      // Offline fallback
      const localOpt = quickQuestion.options?.find((o) => o.id === optId);
      const correctOpt = quickQuestion.options?.find((o) => o.isCorrect);
      recordPracticeAttempt({
        questionId: quickQuestion.id,
        stemBangla: quickQuestion.stem,
        topicId,
        topicTitle: lesson.titleBangla,
        chapterId,
        chapterTitle,
        selectedKey: optId,
        correctKey: correctOpt?.id || optId,
        isCorrect: Boolean(localOpt?.isCorrect),
      });
    }
  };

  if (isLoadingLesson) {
    return <LessonPageSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-3xl mx-auto pb-8 sm:pb-10">
      {/* Breadcrumb & Topic Progress Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <Link href={`/curriculum/${subjectId}`} className="text-indigo-600 hover:underline truncate">
              {chapterTitle}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-slate-700 font-bold">
              {language === 'bn'
                ? `টপিক ${toBanglaDigits(adjacent.topicIndex)}/${toBanglaDigits(adjacent.totalInChapter)}`
                : `Topic ${adjacent.topicIndex}/${adjacent.totalInChapter}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleMarkComplete}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              {isCompleted ? tr('✓ পাঠ সম্পন্ন', '✓ Completed') : tr('পাঠ সম্পন্ন করুন', 'Mark Complete')}
            </button>

            <button
              type="button"
              onClick={() =>
                toggleBookmark({
                  id: topicId,
                  type: 'topic',
                  titleBangla: lesson.titleBangla,
                  subtitleBangla: chapterTitle,
                  href: `/lesson/${topicId}`,
                })
              }
              aria-label="বুকমার্ক"
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
              <span>{tr('বুকমার্ক', 'Bookmark')}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNoteOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                currentNote
                  ? 'bg-purple-50 border-purple-200 text-purple-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <StickyNote className="w-3.5 h-3.5" />
              <span>{tr('আমার নোট', 'My Note')}</span>
            </button>
          </div>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-2 pt-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{tr('অধ্যায়ভিত্তিক বিস্তারিত পাঠ', 'Chapter Detailed Lesson')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            {lesson.titleBangla}
          </h1>
        </div>

        {/* Collapsible Personal Note Scratchpad */}
        {isNoteOpen && (
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              {tr('ব্যক্তিগত স্টাডি নোট (স্বয়ংক্রিয়ভাবে সংরক্ষিত):', 'Personal Study Note (Auto-saved):')}
            </label>
            <textarea
              rows={3}
              value={currentNote}
              onChange={(e) => saveLessonNote(topicId, e.target.value)}
              placeholder="এই পাঠের মূল সূত্র বা নোট লিখে রাখো..."
              className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Learning Goal (শিখনফল) */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
          <span>{tr('পাঠের শিখনফল', 'Learning Goals')}</span>
        </div>
        <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed pl-0 sm:pl-7">
          <LatexRenderer content={lesson.learningGoal} />
        </div>
      </div>

      {/* Interactive Physics Simulation Lab (if available) */}
      {lesson.interactiveWidgetUrl && (
        <InteractiveSimulationRunner
          widgetUrl={lesson.interactiveWidgetUrl}
          title={lesson.titleBangla}
        />
      )}

      {/* Main Explanation with RichContentRenderer */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-6 md:p-8 space-y-3 sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-slate-150 pb-3 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-indigo-600 shrink-0" />
            <span>{tr('মূল বিষয়বস্তু ও গাণিতিক প্রতিপাদন', 'Core Concept & Mathematical Derivation')}</span>
          </h2>
          <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
            {tr('এনসিটিবি পাঠ্যবই সংস্করণ', 'NCTB Edition')}
          </span>
        </div>
        <div className="text-slate-800 leading-relaxed text-sm sm:text-base space-y-3 sm:space-y-4">
          <RichContentRenderer content={lesson.explanation} />
        </div>
      </div>

      {/* Important Terms (পারিভাষিক শব্দাবলি) */}
      {lesson.importantTerms && lesson.importantTerms.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs p-3.5 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg border-b border-slate-150 pb-2.5 sm:pb-3">
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
            <span>{tr('জরুরি পারিভাষিক শব্দ ও সংজ্ঞাসমূহ', 'Essential Terminology & Definitions')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
            {lesson.importantTerms.map((term, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 sm:space-y-1.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{term.termBangla}</h3>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-mono shrink-0">{term.termEnglish}</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <LatexRenderer content={term.definition} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Worked Example (হাতে-কলমে উদাহরণ) */}
      {lesson.workedExample && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-6 md:p-8 space-y-3 sm:space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-150 pb-2.5 sm:pb-3.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Calculator className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
            </div>
            <h3 className="text-base sm:text-xl font-bold text-slate-900">
              {tr('বাস্তব উদাহরণ ও ধাপে ধাপে সমাধান', 'Worked Example & Step-by-Step Solution')}
            </h3>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-purple-50/60 border border-purple-200/80 space-y-1 sm:space-y-1.5">
            <span className="text-[11px] sm:text-xs font-bold text-purple-900 uppercase tracking-wider">
              {tr('সমস্যা:', 'Problem:')}
            </span>
            <div className="text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed font-medium">
              <LatexRenderer content={lesson.workedExample.problem} />
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5 sm:space-y-2">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-900 uppercase tracking-wider">
              {tr('ধাপে ধাপে সমাধান:', 'Step-by-Step Solution:')}
            </span>
            <div className="text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed">
              <RichContentRenderer content={lesson.workedExample.stepByStepSolution} />
            </div>
          </div>
        </div>
      )}

      {/* Memory Aid (মনে রাখার টেকনিক) */}
      {lesson.memoryAid && (
        <div className="bg-amber-50/80 border border-amber-300 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex items-start gap-2.5 sm:gap-3">
          <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-bold text-amber-900 text-xs sm:text-sm">{tr('মনে রাখার টিপস ও ট্রিকস', 'Memory Aids & Shortcuts')}</h3>
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <LatexRenderer content={lesson.memoryAid} />
            </div>
          </div>
        </div>
      )}

      {/* Quick Practice (কুইক MCQ অনুশীলন) */}
      {quickQuestion && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-indigo-200/90 shadow-2xs p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {tr('পাঠের শিখন যাচাই • MCQ অনুশীলন', 'Lesson Quick Check • MCQ Practice')}
                </h3>
                <p className="text-xs text-slate-500">
                  {chapterTitle ? `${chapterTitle} • ` : ''}
                  {tr('এই পাঠের ওপর ধারণা যাচাই করতে সঠিক উত্তরটি নির্বাচন করো', 'Select the correct option to test your understanding')}
                </p>
              </div>
            </div>
            <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {tr('কুইক প্র্যাকটিস', 'Quick Practice')}
            </span>
          </div>

          {/* Stem */}
          <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
            <LatexRenderer content={quickQuestion.stem} />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
            {quickQuestion.options?.map((opt, idx) => {
              const letters = language === 'bn' ? ['ক', 'খ', 'গ', 'ঘ'] : ['A', 'B', 'C', 'D'];
              const letter = letters[idx] || String(idx + 1);
              const isChosen = selectedOptId === opt.id;

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
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswered}
                  className={`w-full p-3 sm:p-4 rounded-xl border text-left flex items-center justify-between transition-all ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {letter}
                    </span>
                    <div className="text-xs sm:text-sm text-slate-800">
                      <LatexRenderer content={opt.text} />
                    </div>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0 ml-2">
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isChosen ? (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback / Explanation */}
          {isAnswered && submitResult?.explanation && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                {submitResult.isCorrect ? (
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {tr('চমৎকার! তোমার উত্তর সঠিক হয়েছে।', 'Great job! Your answer is correct.')}
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    {tr('উত্তরটি সঠিক হয়নি। সঠিক সমাধানটি নিচে দেখে নাও:', 'Incorrect. Review the solution below:')}
                  </span>
                )}
              </div>
              {submitResult.explanation.directAnswer && (
                <p className="text-xs sm:text-sm text-slate-700">
                  <LatexRenderer content={submitResult.explanation.directAnswer} />
                </p>
              )}
              {submitResult.explanation.coreConcept && (
                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-2">
                  <LatexRenderer content={submitResult.explanation.coreConcept} />
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Previous / Next Topic Sequential Cards */}
      {(adjacent.prevTopic || adjacent.nextTopic) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {adjacent.prevTopic ? (
            <Link
              href={`/lesson/${adjacent.prevTopic.id}`}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-colors flex items-center gap-3 group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
                  {tr('পূর্ববর্তী টপিক', 'Previous Topic')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-700 truncate block">
                  {adjacent.prevTopic.titleBangla}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {adjacent.nextTopic && (
            <Link
              href={`/lesson/${adjacent.nextTopic.id}`}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-colors flex items-center justify-between gap-3 text-right group"
            >
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide block">
                  {tr('পরবর্তী টপিক', 'Next Topic')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-700 truncate block">
                  {adjacent.nextTopic.titleBangla}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0" />
            </Link>
          )}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-slate-200">
        <Link
          href={`/curriculum/${subjectId}`}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
        >
          <span>{tr('← অধ্যায় সূচিতে ফেরত যান', '← Back to Chapter Index')}</span>
        </Link>
        <Link
          href={`/practice/${chapterId}?topicId=${encodeURIComponent(topicId)}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow transition-colors"
        >
          <span>{tr('MCQ অনুশীলন শুরু করো', 'Start MCQ Practice Now')}</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>
    </div>
  );
}
