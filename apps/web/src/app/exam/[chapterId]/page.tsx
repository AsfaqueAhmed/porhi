'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Trophy,
  Save,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { apiClient } from '@/lib/api-client';
import { useUserStore } from '@/store/user-store';
import { QuestionDTO, QuestionType, ContentStatus } from '@pori/shared';
import { toBanglaDigits } from '@/lib/formatters';
import { useLanguageStore } from '@/store/language-store';
import { ExamPageSkeleton } from '@/components/ui/shimmer';

const EXAM_QUESTIONS: QuestionDTO[] = [
  {
    id: 'exam-q-1',
    topicId: 'topic-motion-1',
    type: QuestionType.MCQ,
    stem: 'নিচের কোনটি স্কেলার রাশি?',
    options: [
      { id: 'opt-1a', text: 'ত্বরণ', isCorrect: false },
      { id: 'opt-1b', text: 'বেগ', isCorrect: false },
      { id: 'opt-1c', text: 'দূরত্ব', isCorrect: true },
      { id: 'opt-1d', text: 'বল', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর (গ) দূরত্ব।',
      coreConcept: 'যেসব ভৌত রাশি প্রকাশের জন্য শুধু মানের প্রয়োজন হয় কিন্তু দিকের প্রয়োজন হয় না, তাদের স্কেলার রাশি বলে। দূরত্ব কেবল পথ নির্দেশ করে, নির্দিষ্ট দিক নয়।',
    },
    difficulty: 'EASY',
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'exam-q-2',
    topicId: 'topic-motion-2',
    type: QuestionType.MCQ,
    stem: 'একটি গাড়ি স্থির অবস্থান থেকে $3\\text{ ms}^{-2}$ সুষম ত্বরণে চললে $5\\text{ s}$ পর এর বেগ কত হবে?',
    options: [
      { id: 'opt-2a', text: '$8\\text{ ms}^{-1}$', isCorrect: false },
      { id: 'opt-2b', text: '$15\\text{ ms}^{-1}$', isCorrect: true },
      { id: 'opt-2c', text: '$20\\text{ ms}^{-1}$', isCorrect: false },
      { id: 'opt-2d', text: '$45\\text{ ms}^{-1}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর (খ) $15\\text{ ms}^{-1}$।',
      coreConcept: 'গতির ১ম সমীকরণ: $v = u + at$। এখানে $u = 0, a = 3, t = 5$। সুতরাং $v = 0 + (3 \\times 5) = 15\\text{ ms}^{-1}$।',
    },
    difficulty: 'EASY',
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'exam-q-3',
    topicId: 'topic-motion-3',
    type: QuestionType.MCQ,
    stem: 'মুক্তভাবে পড়ন্ত বস্তু $1\\text{ s}$, $2\\text{ s}$, $3\\text{ s}$ এ যে দূরত্ব অতিক্রম করে তার অনুপাত কত?',
    options: [
      { id: 'opt-3a', text: '$1 : 2 : 3$', isCorrect: false },
      { id: 'opt-3b', text: '$1 : 3 : 5$', isCorrect: false },
      { id: 'opt-3c', text: '$1 : 4 : 9$', isCorrect: true },
      { id: 'opt-3d', text: '$1 : 8 : 27$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর (গ) $1 : 4 : 9$।',
      coreConcept: 'গ্যালিলিওর পড়ন্ত বস্তুর ৩য় সূত্র অনুসারে $h \\propto t^2$। তাই অতিক্রান্ত মোট দূরত্বের অনুপাত $1^2 : 2^2 : 3^2 = 1 : 4 : 9$।',
    },
    difficulty: 'MEDIUM',
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];

export default function ExamRunnerPage() {
  const params = useParams();
  const chapterId = (params?.chapterId as string) || 'ch-motion';
  const activeSubject = useUserStore((s) => s.activeSubject);
  const { tr, language } = useLanguageStore();

  const [questions, setQuestions] = useState<QuestionDTO[]>(EXAM_QUESTIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize Exam Session
  useEffect(() => {
    async function startSession() {
      setIsLoading(true);
      try {
        const res = await apiClient.post<{ sessionId: string; questions?: QuestionDTO[] }>('/exam/start', {
          testType: 'CHAPTER_TEST',
          subjectId: activeSubject?.id || 'sub_ssc_physics',
          chapterId,
          durationSeconds: 15 * 60,
          negativeRatio: 0.25,
        });
        if (res.sessionId) {
          setSessionId(res.sessionId);
        }
        if (res.questions && res.questions.length > 0) {
          setQuestions(res.questions);
        }
      } catch {
        // Fallback local session
        setSessionId('local_sess_' + Date.now());
      } finally {
        setIsLoading(false);
      }
    }
    startSession();
  }, [chapterId, activeSubject?.id]);

  const handleSubmitExam = useCallback(async () => {
    setIsSubmitted(true);
    if (sessionId && !sessionId.startsWith('local_sess_')) {
      try {
        const formattedAnswers = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
          questionId,
          selectedOptionId,
          timeSpent: 0,
        }));
        await apiClient.post(`/exam/submit/${sessionId}`, { answers: formattedAnswers });
      } catch {
        // Offline submission
      }
    }
  }, [sessionId, answers]);

  // Countdown Timer: pure decrements
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  // Auto-submit when countdown finishes
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmitExam();
    }
  }, [timeLeft, isSubmitted, handleSubmitExam]);

  // Autosave Heartbeat every 10 seconds
  useEffect(() => {
    if (isSubmitted || !sessionId) return;

    const heartbeat = setInterval(async () => {
      setIsSaving(true);
      try {
        if (!sessionId.startsWith('local_sess_')) {
          const formattedAnswers = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
            questionId,
            selectedOptionId,
            timeSpent: 0,
          }));
          await apiClient.put(`/exam/heartbeat/${sessionId}`, { answers: formattedAnswers });
        }
      } catch {
        // Offline heartbeat fallback
      } finally {
        setIsSaving(false);
      }
    }, 10000);

    return () => clearInterval(heartbeat);
  }, [answers, sessionId, isSubmitted]);

  const handleSelectOption = (qId: string, optId: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const toggleFlag = (qId: string) => {
    setFlagged((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Format time mm:ss
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const minsStr = mins.toString().padStart(2, '0');
    const secsStr = secs.toString().padStart(2, '0');
    return language === 'bn' 
      ? `${toBanglaDigits(minsStr)}:${toBanglaDigits(secsStr)}`
      : `${minsStr}:${secsStr}`;
  };

  const currentQ = questions[currentIndex] || questions[0];
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  // Calculate results
  const correctCount = questions.filter((q) => {
    const chosen = answers[q.id];
    return q.options?.find((o) => o.id === chosen)?.isCorrect;
  }).length;
  const incorrectCount = answeredCount - correctCount;
  const skippedCount = questions.length - answeredCount;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  if (isLoading) {
    return <ExamPageSkeleton />;
  }

  // Result Sheet View
  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {tr('মডেল টেস্ট ফলাফল শিট', 'Model Test Result Sheet')}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
              {tr('তোমার অর্জিত স্কোর: ', 'Your Score: ')}
              {language === 'bn' ? toBanglaDigits(correctCount) : correctCount} / {language === 'bn' ? toBanglaDigits(questions.length) : questions.length} ({language === 'bn' ? toBanglaDigits(scorePercent) : scorePercent}%)
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
              <div className="text-xl font-bold text-emerald-700">
                {language === 'bn' ? toBanglaDigits(correctCount) : correctCount}
              </div>
              <div className="text-xs text-emerald-600 font-semibold">{tr('সঠিক উত্তর', 'Correct')}</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
              <div className="text-xl font-bold text-rose-700">
                {language === 'bn' ? toBanglaDigits(incorrectCount) : incorrectCount}
              </div>
              <div className="text-xs text-rose-600 font-semibold">{tr('ভুল উত্তর', 'Incorrect')}</div>
            </div>
            <div className="bg-slate-100 border border-slate-200 p-3 rounded-xl">
              <div className="text-xl font-bold text-slate-700">
                {language === 'bn' ? toBanglaDigits(skippedCount) : skippedCount}
              </div>
              <div className="text-xs text-slate-600 font-semibold">{tr('উত্তরবিহীন', 'Skipped')}</div>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-3">
            <button
              onClick={() => {
                setAnswers({});
                setFlagged({});
                setTimeLeft(15 * 60);
                setIsSubmitted(false);
                setCurrentIndex(0);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{tr('পুনরায় পরীক্ষা দাও', 'Retake Exam')}</span>
            </button>
            <Link
              href="/progress"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow"
            >
              <span>{tr('অগ্রগতি ড্যাশবোর্ড দেখুন', 'View Progress Dashboard')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">{tr('প্রশ্নোত্তর ও বিশ্লেষণ পর্যালোচনা', 'Review Questions & Analysis')}</h2>
          {questions.map((q, idx) => {
            const chosenId = answers[q.id];
            const correctOpt = q.options?.find((o) => o.isCorrect);
            const isRight = chosenId === correctOpt?.id;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold text-sm text-slate-900">
                    {tr('প্রশ্ন ', 'Question ')}{language === 'bn' ? toBanglaDigits(idx + 1) : idx + 1}.
                  </span>
                  {chosenId ? (
                    isRight ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {tr('সঠিক (+১)', 'Correct (+1)')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> {tr('ভুল (০)', 'Incorrect (0)')}
                      </span>
                    )
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {tr('উত্তরবিহীন', 'Skipped')}
                    </span>
                  )}
                </div>

                <div className="text-slate-900 font-medium text-sm">
                  <LatexRenderer content={q.stem} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options?.map((opt) => {
                    const isChosen = opt.id === chosenId;
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-lg border ${
                          opt.isCorrect
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                            : isChosen
                            ? 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <LatexRenderer content={opt.text} />
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 text-xs text-indigo-950 space-y-1">
                    <span className="font-bold text-indigo-800">{tr('ব্যাখ্যা:', 'Explanation:')}</span>
                    <LatexRenderer content={q.explanation.directAnswer || q.explanation.coreConcept} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Exam Runner View
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Bar with Timer & Autosave Status */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{tr('অবশিষ্ট সময়', 'Time Remaining')}</div>
            <div
              className={`text-lg font-black font-mono ${
                timeLeft < 180 ? 'text-rose-600 animate-pulse' : 'text-slate-900'
              }`}
            >
              {formatTimer(timeLeft)}
            </div>
          </div>
        </div>

        {/* Autosave Heartbeat Indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Save className={`w-3.5 h-3.5 ${isSaving ? 'text-indigo-600 animate-spin' : 'text-emerald-500'}`} />
          <span className="hidden sm:inline">{tr('অটোসেভ সক্রিয়', 'Autosave Active')}</span>
        </div>

        {/* Finish Exam Button */}
        <button
          onClick={handleSubmitExam}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          {tr('পরীক্ষা সাবমিট করো', 'Submit Exam')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Question Panel (Left/Center) */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                {tr('প্রশ্ন ', 'Question ')}{language === 'bn' ? toBanglaDigits(currentIndex + 1) : currentIndex + 1} / {language === 'bn' ? toBanglaDigits(questions.length) : questions.length}
              </span>

              <button
                onClick={() => toggleFlag(currentQ.id)}
                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  flagged[currentQ.id]
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {flagged[currentQ.id] ? tr('★ ফ্ল্যাগ করা হয়েছে', '★ Flagged') : tr('☆ ফ্ল্যাগ করে রাখো', '☆ Flag for Review')}
              </button>
            </div>

            {/* Stem */}
            <div className="text-lg font-semibold text-slate-900 leading-relaxed">
              <LatexRenderer content={currentQ?.stem} />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQ?.options?.map((opt, idx) => {
                const isChosen = answers[currentQ.id] === opt.id;
                const letters = language === 'bn' ? ['ক', 'খ', 'গ', 'ঘ'] : ['A', 'B', 'C', 'D'];
                const letter = letters[idx] || String(idx + 1);

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      isChosen
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-2 ring-indigo-500/30'
                        : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isChosen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {letter}
                    </span>
                    <div className="text-sm">
                      <LatexRenderer content={opt.text} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{tr('পূর্ববর্তী', 'Previous')}</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow"
              >
                <span>{tr('পরবর্তী প্রশ্ন', 'Next Question')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow"
              >
                <span>{tr('পরীক্ষা সমাপ্ত করো', 'Finish Exam')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator Panel (Right Sidebar) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4 h-fit md:sticky md:top-20">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>{tr('প্রশ্ন নেভিগেটর', 'Question Navigator')}</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {language === 'bn' ? toBanglaDigits(answeredCount) : answeredCount} / {language === 'bn' ? toBanglaDigits(questions.length) : questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(100, Math.round((answeredCount / (questions.length || 1)) * 100))}%` }}
              />
            </div>
          </div>

          {/* Compact Question Grid (scrollable if >30 questions) */}
          <div className="grid grid-cols-6 gap-2 max-h-[340px] overflow-y-auto p-1.5 select-none">
            {questions.map((q, idx) => {
              const isAnswered = Boolean(answers[q.id]);
              const isFlag = Boolean(flagged[q.id]);
              const isCurrent = idx === currentIndex;

              let btnStyle = '';
              if (isAnswered) {
                btnStyle = isCurrent
                  ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-500 ring-offset-2 font-black shadow-sm'
                  : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 font-bold shadow-xs';
              } else if (isCurrent) {
                btnStyle = 'bg-indigo-50 text-indigo-700 border-indigo-500 ring-2 ring-indigo-500 ring-offset-1 font-black shadow-xs';
              } else if (isFlag) {
                btnStyle = 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 font-bold';
              } else {
                btnStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 font-medium';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative aspect-square rounded-xl border text-xs flex items-center justify-center transition-all ${btnStyle}`}
                  title={`${tr('প্রশ্ন', 'Question')} ${idx + 1}`}
                >
                  <span>{language === 'bn' ? toBanglaDigits(idx + 1) : idx + 1}</span>
                  {isFlag && (
                    <span
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white shadow-xs"
                      title={tr('পর্যালোচনার জন্য ফ্ল্যাগড', 'Flagged for Review')}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Compact Legend with stats */}
          <div className="space-y-1.5 pt-3 text-xs text-slate-600 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-600 shrink-0" />
                <span className="truncate">
                  {tr('উত্তর সম্পন্ন', 'Answered')} ({language === 'bn' ? toBanglaDigits(answeredCount) : answeredCount})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 shrink-0" />
                <span className="truncate">
                  {tr('বাকি প্রশ্ন', 'Remaining')} ({language === 'bn' ? toBanglaDigits(questions.length - answeredCount) : questions.length - answeredCount})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="relative w-3 h-3 rounded bg-amber-50 border border-amber-300 shrink-0 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </span>
              <span>
                {tr('পর্যালোচনার জন্য ফ্ল্যাগড', 'Flagged for Review')} ({language === 'bn' ? toBanglaDigits(flaggedCount) : flaggedCount})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
