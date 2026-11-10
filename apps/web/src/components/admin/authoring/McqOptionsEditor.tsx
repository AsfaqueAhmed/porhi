'use client';

import React from 'react';
import { useLanguageStore } from '@/store/language-store';
import type { McqOptionDraft } from './authoring-helpers';

export interface McqOptionsEditorProps {
  options: McqOptionDraft[];
  correctOptionIndex: number;
  onOptionCorrectChange: (index: number) => void;
  onOptionTextChange: (index: number, text: string) => void;
}

export function McqOptionsEditor({
  options,
  correctOptionIndex,
  onOptionCorrectChange,
  onOptionTextChange,
}: McqOptionsEditorProps) {
  const language = useLanguageStore((s) => s.language);
  const tr = useLanguageStore((s) => s.tr);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-slate-900">
        {tr('৪টি উত্তর বিকল্প ও সঠিক উত্তর নির্বাচন', '4 Options & Correct Answer Selection')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt, i) => {
          const label = language === 'bn' ? (['ক', 'খ', 'গ', 'ঘ'][i] || String(i + 1)) : (['A', 'B', 'C', 'D'][i] || String(i + 1));
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
                <span className="text-xs font-bold text-slate-700">{tr('বিকল্প', 'Option')} ({label})</span>
                <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-emerald-700">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={isSelectedCorrect}
                    onChange={() => onOptionCorrectChange(i)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{tr('সঠিক উত্তর', 'Correct Answer')}</span>
                </label>
              </div>
              <input
                type="text"
                required
                value={opt.text}
                onChange={(e) => onOptionTextChange(i, e.target.value)}
                placeholder={tr(`বিকল্প ${label} এর টেক্সট`, `Option ${label} text`)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
