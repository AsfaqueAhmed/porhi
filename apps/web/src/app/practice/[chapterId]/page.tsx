'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { apiClient } from '@/lib/api-client';
import { QuestionDTO, QuestionType, ContentStatus } from '@pori/shared';
import { toBanglaDigits } from '@/lib/formatters';
import { useUserStore } from '@/store/user-store';

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

export default function PracticeRunnerPage() {
  const params = useParams();
  const chapterId = (params?.chapterId as string) || 'ch-motion';
  const activeSubject = useUserStore((s) => s.activeSubject);

  const [questions, setQuestions] = useState<QuestionDTO[]>(SAMPLE_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [openLayers, setOpenLayers] = useState<Record<string, boolean>>({
    direct: true,
    concept: true,
    derivation: true,
    distractors: false,
    citation: false,
    protip: true,
  });

  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await apiClient.get<QuestionDTO[]>(`/practice/chapter/${chapterId}/questions`);
        if (res && Array.isArray(res) && res.length > 0) {
          setQuestions(res);
        }
      } catch {
        // Fallback to sample questions
      }
    }
    loadQuestions();
  }, [chapterId]);

  const currentQ = questions[currentIndex] || questions[0];
  const selectedOptionId = selectedAnswers[currentQ?.id];
  const isAnswered = Boolean(selectedOptionId);

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return; // Prevent re-selection
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
  };

  const toggleLayer = (layer: string) => {
    setOpenLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const correctCount = questions.filter((q) => {
    const chosen = selectedAnswers[q.id];
    return q.options?.find((o) => o.id === chosen)?.isCorrect;
  }).length;

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header and Progress */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            MCQ অনুশীলন
          </span>
          <h1 className="text-xl font-bold text-slate-900">
            প্রশ্ন {toBanglaDigits(currentIndex + 1)} / {toBanglaDigits(questions.length)}
          </h1>
        </div>

        {/* Score indicator */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
            সঠিক: {toBanglaDigits(correctCount)}
          </span>
          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
            সম্পন্ন: {toBanglaDigits(answeredCount)}/{toBanglaDigits(questions.length)}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Stem */}
        <div className="text-lg font-semibold text-slate-900 leading-relaxed">
          <LatexRenderer content={currentQ?.stem} />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQ?.options?.map((opt, idx) => {
            const isChosen = selectedOptionId === opt.id;
            const letters = ['ক', 'খ', 'গ', 'ঘ'];
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
      {isAnswered && currentQ.explanation && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0.5">
          <div className="bg-slate-900 text-white p-4 font-bold text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>৬-স্তরের তাৎক্ষণিক ব্যাখ্যা ও বিশ্লেষণ</span>
          </div>

          {/* Layer 1: Direct Answer */}
          <div className="border-b border-slate-100">
            <button
              onClick={() => toggleLayer('direct')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
            >
              <span>১. সরাসরি উত্তর (Direct Answer)</span>
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
              <span>২. মূল তত্ত্ব ও কনসেপ্ট (Core Concept)</span>
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
                <span>৩. ধাপে ধাপে গাণিতিক প্রতিপাদন (Step Derivation)</span>
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
                <span>৪. ভুল অপশনগুলোর বিশ্লেষণ (Distractor Analysis)</span>
                {openLayers.distractors ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openLayers.distractors && (
                <div className="p-4 pt-1 space-y-2 text-xs text-slate-600">
                  {Object.entries(currentQ.explanation.distractorAnalysis).map(([optKey, desc]) => (
                    <div key={optKey} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="font-bold text-rose-600 mr-1.5">অপশন {optKey}:</span>
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
                <span>৫. পাঠ্যবই রেফারেন্স (NCTB Textbook Citation)</span>
                {openLayers.citation ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openLayers.citation && (
                <div className="p-4 pt-1 text-xs text-slate-700 bg-slate-50/50 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>
                    {currentQ.explanation.textbookCitation.bookTitle} •{' '}
                    {currentQ.explanation.textbookCitation.chapterName}
                    {currentQ.explanation.textbookCitation.pageNumber &&
                      ` (পৃষ্ঠা ${toBanglaDigits(currentQ.explanation.textbookCitation.pageNumber)})`}
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
                <span>৬. প্রো-টিপ ও শর্টকাট (Pro Tip & Shortcut)</span>
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

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পূর্ববর্তী প্রশ্ন</span>
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
          <Link
            href={`/curriculum/${activeSubject?.id || 'sub-ssc-phy'}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow"
          >
            <span>অনুশীলন সম্পন্ন</span>
            <CheckCircle2 className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
