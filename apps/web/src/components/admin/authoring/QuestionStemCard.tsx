'use client';

import React from 'react';
import { Eye, HelpCircle } from 'lucide-react';
import { MathToolbar } from '@/components/admin/math-toolbar';
import { LatexRenderer } from '@/components/math/latex-renderer';

export interface QuestionStemCardProps {
  isCq: boolean;
  stem: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  boardSource: string;
  onStemChange: (value: string) => void;
  onDifficultyChange: (value: 'EASY' | 'MEDIUM' | 'HARD') => void;
  onBoardSourceChange: (value: string) => void;
  onInsertFormula: (formula: string) => void;
}

export function QuestionStemCard({
  isCq,
  stem,
  difficulty,
  boardSource,
  onStemChange,
  onDifficultyChange,
  onBoardSourceChange,
  onInsertFormula,
}: QuestionStemCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>
            {isCq
              ? 'সৃজনশীল উদ্দীপক (CQ Stimulus / Stem)'
              : 'প্রশ্নের বিবরণ (Question Stem)'}
          </span>
        </h3>
        <div className="flex items-center gap-2">
          <select
            aria-label="প্রশ্নের কাঠিন্য"
            value={difficulty}
            onChange={(e) =>
              onDifficultyChange(e.target.value as 'EASY' | 'MEDIUM' | 'HARD')
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
            value={boardSource}
            onChange={(e) => onBoardSourceChange(e.target.value)}
            placeholder="বোর্ড পরীক্ষার উৎস"
            className="text-xs p-1.5 border border-slate-300 rounded-lg w-36"
          />
        </div>
      </div>

      <MathToolbar onInsert={onInsertFormula} />

      <textarea
        rows={3}
        required
        value={stem}
        onChange={(e) => onStemChange(e.target.value)}
        placeholder="প্রশ্নের মূল বিবরণ লিখুন..."
        className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>লাইভ সমীকরণ প্রিভিউ:</span>
        </span>
        <div className="text-xs text-slate-900">
          <LatexRenderer content={stem} />
        </div>
      </div>
    </div>
  );
}
