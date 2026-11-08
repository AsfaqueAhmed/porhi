'use client';

import React, { useState, useEffect } from 'react';
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
import { QuestionDTO, QuestionType, ContentStatus } from '@pori/shared';
import { toBanglaDigits } from '@/components/navigation/persistent-nav';

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

  const [questions, setQuestions] = useState<QuestionDTO[]>(EXAM_QUESTIONS);
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
      try {
        const res = await apiClient.post<{ sessionId: string; questions?: QuestionDTO[] }>('/exam/start', {
          chapterId,
          durationMinutes: 15,
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
      }
    }
    startSession();
  }, [chapterId]);

  // Countdown Timer
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  // Autosave Heartbeat every 10 seconds
  useEffect(() => {
    if (isSubmitted || !sessionId) return;

    const heartbeat = setInterval(async () => {
      setIsSaving(true);
      try {
        await apiClient.put(`/exam/heartbeat/${sessionId}`, { answers });
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

  const handleSubmitExam = async () => {
    setIsSubmitted(true);
    if (sessionId) {
      try {
        await apiClient.post(`/exam/submit/${sessionId}`, { answers });
      } catch {
        // Offline submission
      }
    }
  };

  // Format time mm:ss
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${toBanglaDigits(mins.toString().padStart(2, '0'))}:${toBanglaDigits(secs.toString().padStart(2, '0'))}`;
  };

  const currentQ = questions[currentIndex] || questions[0];
  const answeredCount = Object.keys(answers).length;

  // Calculate results
  const correctCount = questions.filter((q) => {
    const chosen = answers[q.id];
    return q.options?.find((o) => o.id === chosen)?.isCorrect;
  }).length;
  const incorrectCount = answeredCount - correctCount;
  const skippedCount = questions.length - answeredCount;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

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
              মডেল টেস্ট ফলাফল শিট
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
              তোমার অর্জিত স্কোর: {toBanglaDigits(correctCount)} / {toBanglaDigits(questions.length)} ({toBanglaDigits(scorePercent)}%)
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
              <div className="text-xl font-bold text-emerald-700">{toBanglaDigits(correctCount)}</div>
              <div className="text-xs text-emerald-600 font-semibold">সঠিক উত্তর</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
              <div className="text-xl font-bold text-rose-700">{toBanglaDigits(incorrectCount)}</div>
              <div className="text-xs text-rose-600 font-semibold">ভুল উত্তর</div>
            </div>
            <div className="bg-slate-100 border border-slate-200 p-3 rounded-xl">
              <div className="text-xl font-bold text-slate-700">{toBanglaDigits(skippedCount)}</div>
              <div className="text-xs text-slate-600 font-semibold">উত্তরবিহীন</div>
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
              <span>পুনরায় পরীক্ষা দাও</span>
            </button>
            <Link
              href="/progress"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow"
            >
              <span>অগ্রগতি ড্যাশবোর্ড দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">প্রশ্নোত্তর ও বিশ্লেষণ পর্যালোচনা</h2>
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
                    প্রশ্ন {toBanglaDigits(idx + 1)}.
                  </span>
                  {chosenId ? (
                    isRight ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> সঠিক (+১)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> ভুল (০)
                      </span>
                    )
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      উত্তরবিহীন
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
                    <span className="font-bold text-indigo-800">ব্যাখ্যা:</span>
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
            <div className="text-xs text-slate-500 font-medium">অবশিষ্ট সময়</div>
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
          <span className="hidden sm:inline">অটোসেভ সক্রিয়</span>
        </div>

        {/* Finish Exam Button */}
        <button
          onClick={handleSubmitExam}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          পরীক্ষা সাবমিট করো
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Question Panel (Left/Center) */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                প্রশ্ন {toBanglaDigits(currentIndex + 1)} / {toBanglaDigits(questions.length)}
              </span>

              <button
                onClick={() => toggleFlag(currentQ.id)}
                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  flagged[currentQ.id]
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {flagged[currentQ.id] ? '★ ফ্ল্যাগ করা হয়েছে' : '☆ ফ্ল্যাগ করে রাখো'}
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
                const letters = ['ক', 'খ', 'গ', 'ঘ'];
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
              <span>পূর্ববর্তী</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow"
              >
                <span>পরবর্তী প্রশ্ন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow"
              >
                <span>পরীক্ষা সমাপ্ত করো</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator Panel (Right Sidebar) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 h-fit">
          <h3 className="font-bold text-slate-900 text-sm">প্রশ্ন নেভিগেটর</h3>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = Boolean(answers[q.id]);
              const isFlag = Boolean(flagged[q.id]);
              const isCurrent = idx === currentIndex;

              let style = 'bg-slate-100 text-slate-700 border-slate-200';
              if (isCurrent) {
                style = 'ring-2 ring-indigo-600 border-indigo-600 font-bold';
              }
              if (isAnswered) {
                style += ' bg-indigo-600 text-white border-indigo-600';
              } else if (isFlag) {
                style += ' bg-amber-100 text-amber-900 border-amber-300';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-full aspect-square rounded-xl border text-xs font-bold flex items-center justify-center transition-all ${style}`}
                >
                  {toBanglaDigits(idx + 1)}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-2 text-xs text-slate-600 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-indigo-600" />
              <span>উত্তর সম্পন্ন ({toBanglaDigits(answeredCount)})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
              <span>বাকি প্রশ্ন ({toBanglaDigits(questions.length - answeredCount)})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300" />
              <span>পর্যালোচনার জন্য ফ্ল্যাগড</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
