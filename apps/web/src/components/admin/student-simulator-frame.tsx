'use client';

import React, { useEffect, useState } from 'react';
import {
  Smartphone,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  ChevronDown,
  RotateCcw,
  Wifi,
  Battery,
} from 'lucide-react';
import type { CQRubric } from '@pori/shared';
import { LatexRenderer } from '../math/latex-renderer';

export interface SimulatorOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface StudentSimulatorFrameProps {
  questionType?: 'MCQ' | 'CQ_CREATIVE';
  stem: string;
  options: SimulatorOption[];
  cqRubric?: Partial<CQRubric>;
  coreConcept?: string;
  distractors?: Record<string, string | undefined>;
  formulaSteps?: string;
  citationBook?: string;
  citationChapter?: string;
  citationPage?: number | string;
  proTip?: string;
}

const CQ_PART_LABELS = [
  { key: 'ka', label: 'ক (জ্ঞানমূলক)' },
  { key: 'kha', label: 'খ (অনুধাবনমূলক)' },
  { key: 'ga', label: 'গ (প্রয়োগমূলক)' },
  { key: 'gha', label: 'ঘ (উচ্চতর দক্ষতা)' },
] as const;

export function StudentSimulatorFrame({
  questionType = 'MCQ',
  stem,
  options,
  cqRubric,
  coreConcept,
  distractors,
  formulaSteps,
  citationBook,
  citationChapter,
  citationPage,
  proTip,
}: StudentSimulatorFrameProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  useEffect(() => {
    setSelectedId(null);
    setShowExplanation(false);
  }, [questionType]);

  const isCQ = questionType === 'CQ_CREATIVE';
  const selectedOption = options.find((o) => o.id === selectedId);
  const isCorrect = selectedOption?.isCorrect ?? false;
  const hasDistractorNotes = Boolean(
    distractors && Object.values(distractors).some((val) => Boolean(val?.trim())),
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setShowExplanation(true);
  };

  const handleReset = () => {
    setSelectedId(null);
    setShowExplanation(false);
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-2xl flex flex-col items-center">
      {/* Header Info */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-indigo-400 font-bold">
          <Smartphone className="w-4 h-4" />
          <span>লাইভ স্টুডেন্ট সিমুলেটর</span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800 px-2 py-0.5 rounded-lg"
          title="সিমুলেটর রিসেট করুন"
        >
          <RotateCcw className="w-3 h-3" />
          <span>রিসেট</span>
        </button>
      </div>

      {/* Phone Mockup Frame */}
      <div className="w-full max-w-sm mt-4 bg-slate-950 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-700/80 relative">
        {/* Notch / Dynamic Island */}
        <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
        </div>

        {/* Screen Status Bar */}
        <div className="px-4 py-1 flex items-center justify-between text-[10px] text-slate-400 select-none">
          <span className="font-mono font-bold">10:30 AM</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3" />
            <span>4G</span>
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Inner Phone Screen Content */}
        <div className="bg-white rounded-3xl p-4 min-h-[460px] text-slate-800 flex flex-col justify-between overflow-y-auto max-h-[540px]">
          <div className="space-y-4">
            {/* Subject/Topic Badge in App */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100">
                {isCQ ? 'অনুশীলন প্রশ্ন • সৃজনশীল (CQ)' : 'অনুশীলন প্রশ্ন • MCQ'}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">১/১</span>
            </div>

            {/* Question Stem */}
            <div className="text-xs font-semibold text-slate-900 leading-relaxed bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
              {stem.trim() ? (
                <LatexRenderer content={stem} />
              ) : (
                <span className="text-slate-400 italic">
                  বামের এডিটরে প্রশ্ন লিখলে এখানে রিয়েল-টাইমে প্রদর্শিত হবে...
                </span>
              )}
            </div>

            {/* CQ Solution Toggle or MCQ Options List */}
            {isCQ ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowExplanation((prev) => !prev)}
                  className="w-full py-2.5 px-3 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors"
                >
                  {showExplanation ? 'সমাধান ও রুব্রিক লুকান' : 'সমাধান ও রুব্রিক দেখুন'}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {options.map((opt, idx) => {
                  const label = ['ক', 'খ', 'গ', 'ঘ'][idx] || String(idx + 1);
                  const isSelected = selectedId === opt.id;

                  let cardStyle =
                    'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/20';

                  if (selectedId) {
                    if (opt.isCorrect) {
                      cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      cardStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                    } else {
                      cardStyle = 'opacity-50 bg-slate-50 border-slate-200 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect(opt.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between gap-2.5 transition-all shadow-2xs ${cardStyle}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {label}
                        </span>
                        <div className="truncate">
                          {opt.text ? (
                            <LatexRenderer content={opt.text} />
                          ) : (
                            <span className="text-slate-300 italic">বিকল্প খালি</span>
                          )}
                        </div>
                      </div>

                      {selectedId && (
                        <div className="shrink-0">
                          {opt.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isSelected ? (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Answer Result Banner (MCQ only) */}
            {!isCQ && selectedId && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center justify-between animate-in fade-in ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>সঠিক উত্তর! দারুণ হয়েছে।</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>ভুল উত্তর! সঠিক ব্যাখ্যাটি নিচে দেখুন।</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 6-Layer Multi-Layer Explanation in Simulator */}
            {showExplanation && (
              <div className="space-y-2 pt-2 border-t border-slate-100 animate-in fade-in">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                    {isCQ ? 'মূল্যায়ন রুব্রিক ও ৬-লেয়ার সমাধান:' : '৬-লেয়ার কনসেপ্ট সমাধান:'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>

                {isCQ && cqRubric && (
                  <div className="space-y-1.5">
                    {CQ_PART_LABELS.map(({ key, label }) => {
                      const part = cqRubric[key];
                      if (!part || !part.criteria?.trim()) {
                        return null;
                      }
                      return (
                        <div
                          key={key}
                          className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1"
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-800">
                            <span>{label}</span>
                            <span className="font-mono text-indigo-700">নম্বর: {part.mark}</span>
                          </div>
                          <LatexRenderer content={part.criteria} />
                        </div>
                      );
                    })}
                  </div>
                )}

                {coreConcept && (
                  <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100 text-[11px] text-slate-700 space-y-1">
                    <span className="font-bold text-indigo-900 block text-[10px]">
                      ১. কোর সঠিক ব্যাখ্যা:
                    </span>
                    <LatexRenderer content={coreConcept} />
                  </div>
                )}

                {formulaSteps && (
                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 text-[11px] text-slate-700 space-y-1">
                    <span className="font-bold text-purple-900 block text-[10px]">
                      ২. গাণিতিক সূত্র ও ধাপ:
                    </span>
                    <LatexRenderer content={formulaSteps} />
                  </div>
                )}

                {!isCQ && hasDistractorNotes && (
                  <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 text-[11px] text-slate-700 space-y-1">
                    <span className="font-bold text-amber-900 block text-[10px]">
                      ৩. ভুল অপশন কেন ভুল (Distractor Analysis):
                    </span>
                    <p className="text-[10px] text-slate-600">
                      ভুল উত্তরগুলো শিক্ষার্থীদের সাধারণ ধারণাগত ভুল চিহ্নিত করে।
                    </p>
                  </div>
                )}

                {citationBook && (
                  <div className="bg-slate-100 p-2.5 rounded-xl text-[10px] text-slate-600 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>
                      <strong>NCTB রেফারেন্স:</strong> {citationBook}{' '}
                      {citationChapter ? `• ${citationChapter}` : ''}{' '}
                      {citationPage ? `• পৃষ্ঠা: ${citationPage}` : ''}
                    </span>
                  </div>
                )}

                {proTip && (
                  <div className="bg-emerald-50 p-2.5 rounded-xl text-[10px] text-emerald-800 flex items-center gap-2 border border-emerald-200">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      <strong>শর্টকাট প্রো-টিপ:</strong> {proTip}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
