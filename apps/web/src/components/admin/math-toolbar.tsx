'use client';

import React, { useState } from 'react';
import { Copy, Check, Calculator } from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';

interface MathToolbarProps {
  onInsert?: (formula: string) => void;
  className?: string;
}

interface FormulaItem {
  label: string;
  latex: string;
  preview: string;
}

const FORMULA_PRESETS: { category: string; items: FormulaItem[] }[] = [
  {
    category: 'মৌলিক সমীকরণ (Basic)',
    items: [
      { label: 'ভগ্নাংশ', latex: '\\frac{a}{b}', preview: '\\frac{a}{b}' },
      { label: 'বর্গমূল', latex: '\\sqrt{x}', preview: '\\sqrt{x}' },
      { label: 'ঘাত (Power)', latex: 'x^{2}', preview: 'x^2' },
      { label: 'সাবস্ক্রিপ্ট', latex: 'v_{0}', preview: 'v_0' },
      { label: 'গুণ চিহ্ন', latex: '\\times', preview: '\\times' },
    ],
  },
  {
    category: 'গতির সূত্র (Kinematics)',
    items: [
      { label: '১ম সূত্র', latex: 'v = u + at', preview: 'v = u + at' },
      { label: '২য় সূত্র', latex: 's = \\frac{u + v}{2} \\times t', preview: 's = \\frac{u + v}{2}t' },
      { label: '৩য় সূত্র', latex: 's = ut + \\frac{1}{2}at^2', preview: 's = ut + \\frac{1}{2}at^2' },
      { label: '৪র্থ সূত্র', latex: 'v^2 = u^2 + 2as', preview: 'v^2 = u^2 + 2as' },
      { label: 'নিউটনের ২য়', latex: 'F = ma', preview: 'F = ma' },
    ],
  },
  {
    category: 'একক (Units)',
    items: [
      { label: 'বেগ (ms⁻¹)', latex: '\\text{ ms}^{-1}', preview: '\\text{ ms}^{-1}' },
      { label: 'ত্বরণ (ms⁻²)', latex: '\\text{ ms}^{-2}', preview: '\\text{ ms}^{-2}' },
      { label: 'ভর (kg)', latex: '\\text{ kg}', preview: '\\text{ kg}' },
      { label: 'বল (N)', latex: '\\text{ N}', preview: '\\text{ N}' },
      { label: 'কাজ (J)', latex: '\\text{ J}', preview: '\\text{ J}' },
    ],
  },
  {
    category: 'প্রতীক (Symbols)',
    items: [
      { label: 'ডেল্টা (Δt)', latex: '\\Delta t', preview: '\\Delta t' },
      { label: 'থিটা (θ)', latex: '\\theta', preview: '\\theta' },
      { label: 'পাই (π)', latex: '\\pi', preview: '\\pi' },
      { label: 'ঘনত্ব (ρ)', latex: '\\rho', preview: '\\rho' },
      { label: 'তরঙ্গদৈর্ঘ্য (λ)', latex: '\\lambda', preview: '\\lambda' },
    ],
  },
];

export function MathToolbar({ onInsert, className = '' }: MathToolbarProps) {
  const [activeCategory, setActiveCategory] = useState(FORMULA_PRESETS[0].category);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);
  const [customMath, setCustomMath] = useState('s = ut + \\frac{1}{2}at^2');

  const handleCopyOrInsert = (latex: string) => {
    if (onInsert) {
      onInsert(latex);
    }
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(`$${latex}$`).catch(() => {});
      setCopiedFormula(latex);
      setTimeout(() => setCopiedFormula(null), 1500);
    }
  };

  const currentPreset = FORMULA_PRESETS.find((p) => p.category === activeCategory) || FORMULA_PRESETS[0];

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 ${className}`}>
      {/* Category selector */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <Calculator className="w-4 h-4 text-indigo-600" />
          <span>LaTeX গণিত ও সমীকরণ টুলবার</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">ক্লিক করলেই টেক্সটে যুক্ত হবে</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FORMULA_PRESETS.map((p) => (
          <button
            key={p.category}
            type="button"
            onClick={() => setActiveCategory(p.category)}
            className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${
              activeCategory === p.category
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {p.category}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {currentPreset.items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleCopyOrInsert(item.latex)}
            className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 bg-white hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-center group"
          >
            <div className="text-xs font-mono text-slate-800 min-h-[20px] flex items-center justify-center">
              <LatexRenderer content={`$${item.preview}$`} />
            </div>
            <span className="text-[10px] text-slate-400 font-medium mt-1 group-hover:text-indigo-600">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Instant Scratchpad / Live Renderer */}
      <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            value={customMath}
            onChange={(e) => setCustomMath(e.target.value)}
            placeholder="পরীক্ষামূলক LaTeX লিখুন (যেমন: E = mc^2)"
            className="w-full text-xs font-mono p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <div className="text-xs overflow-x-auto">
            <LatexRenderer content={`$${customMath || ' '}$`} />
          </div>
          <button
            type="button"
            onClick={() => handleCopyOrInsert(customMath)}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 ml-2 shrink-0"
          >
            {copiedFormula === customMath ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">যুক্ত হয়েছে</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>যুক্ত করো</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
