'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguageStore } from '@/store/language-store';
import type { McqOptionDraft } from './authoring-helpers';

export interface SixLayerExplanationFieldsProps {
  showDistractors: boolean;
  mcqOptions: McqOptionDraft[];
  directAnswer: string;
  coreConcept: string;
  stepDerivation: string;
  distractorMap: Record<string, string>;
  citationBook: string;
  citationChapter: string;
  citationPage: string;
  proTip: string;
  onDirectAnswerChange: (value: string) => void;
  onCoreConceptChange: (value: string) => void;
  onStepDerivationChange: (value: string) => void;
  onDistractorChange: (optionId: string, value: string) => void;
  onCitationBookChange: (value: string) => void;
  onCitationChapterChange: (value: string) => void;
  onCitationPageChange: (value: string) => void;
  onProTipChange: (value: string) => void;
}

export function SixLayerExplanationFields({
  showDistractors,
  mcqOptions,
  directAnswer,
  coreConcept,
  stepDerivation,
  distractorMap,
  citationBook,
  citationChapter,
  citationPage,
  proTip,
  onDirectAnswerChange,
  onCoreConceptChange,
  onStepDerivationChange,
  onDistractorChange,
  onCitationBookChange,
  onCitationChapterChange,
  onCitationPageChange,
  onProTipChange,
}: SixLayerExplanationFieldsProps) {
  const language = useLanguageStore((s) => s.language);
  const tr = useLanguageStore((s) => s.tr);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <h3 className="text-sm font-bold text-slate-900">
          {tr(
            '৬-স্তরের বিশ্লেষণ ও ডিপ এক্সপ্ল্যানেশন সিস্টেম (6-Layer System)',
            '6-Layer Pedagogical Explanation System',
          )}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="authoring-direct-answer"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            {tr('স্তর ১: সরাসরি উত্তর (Direct Answer)', 'Layer 1: Direct Answer')}
          </label>
          <input
            id="authoring-direct-answer"
            type="text"
            aria-label={tr('সরাসরি উত্তর ইনপুট', 'Direct Answer Input')}
            required
            value={directAnswer}
            onChange={(e) => onDirectAnswerChange(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
          />
        </div>

        <div>
          <label
            htmlFor="authoring-core-concept"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            {tr('স্তর ২: মূল ধারণা (Core Concept)', 'Layer 2: Core Concept')}
          </label>
          <input
            id="authoring-core-concept"
            type="text"
            aria-label={tr('মূল ধারণা ইনপুট', 'Core Concept Input')}
            required
            value={coreConcept}
            onChange={(e) => onCoreConceptChange(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="authoring-step-derivation"
          className="block text-xs font-bold text-slate-700 mb-1"
        >
          {tr(
            'স্তর ৩: গাণিতিক প্রতিপাদন ও ধাপ (Step Derivation with KaTeX)',
            'Layer 3: Step-by-Step Derivation (with KaTeX)',
          )}
        </label>
        <textarea
          id="authoring-step-derivation"
          rows={3}
          value={stepDerivation}
          onChange={(e) => onStepDerivationChange(e.target.value)}
          className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-mono"
        />
      </div>

      {showDistractors && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700">
            {tr(
              'স্তর ৪: অপশন বিশ্লেষণ (Distractor Analysis — প্রতিটি অপশন কেন ভুল/সঠিক)',
              'Layer 4: Distractor Analysis (Why each option is right or wrong)',
            )}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mcqOptions.map((opt, idx) => {
              const label = language === 'bn' ? (['ক', 'খ', 'গ', 'ঘ'][idx] || String(idx + 1)) : (['A', 'B', 'C', 'D'][idx] || String(idx + 1));
              return (
                <div key={opt.id}>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {tr('বিকল্প', 'Option')} ({label}) {tr('কারণ:', 'reason:')}
                  </span>
                  <input
                    type="text"
                    aria-label={tr(`বিকল্প (${label}) বিশ্লেষণ`, `Option (${label}) analysis`)}
                    value={distractorMap[opt.id] ?? ''}
                    onChange={(e) => onDistractorChange(opt.id, e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 rounded-lg mt-0.5"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {tr('পাঠ্যবইয়ের নাম', 'Textbook Name')}
          </label>
          <input
            type="text"
            value={citationBook}
            onChange={(e) => onCitationBookChange(e.target.value)}
            className="w-full text-xs p-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{tr('অধ্যায়', 'Chapter')}</label>
          <input
            type="text"
            value={citationChapter}
            onChange={(e) => onCitationChapterChange(e.target.value)}
            className="w-full text-xs p-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {tr('পৃষ্ঠা নম্বর', 'Page Number')}
          </label>
          <input
            type="text"
            value={citationPage}
            onChange={(e) => onCitationPageChange(e.target.value)}
            className="w-full text-xs p-2 border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {tr(
            'স্তর ৬: প্রো-টিপ ও সময় বাঁচানোর কৌশল (Pro-Tip / Shortcut)',
            'Layer 6: Pro-Tip & Time-Saving Shortcut',
          )}
        </label>
        <input
          type="text"
          value={proTip}
          onChange={(e) => onProTipChange(e.target.value)}
          placeholder={tr('শর্টকাট কৌশল লিখুন...', 'Write shortcut technique...')}
          className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
        />
      </div>
    </div>
  );
}
