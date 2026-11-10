'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguageStore } from '@/store/language-store';

export interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
}

export function LanguageToggle({ className = '', showIcon = true }: LanguageToggleProps) {
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  return (
    <div
      className={`inline-flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {showIcon && (
        <span className="pl-2 pr-1 text-slate-400">
          <Languages className="w-3.5 h-3.5" />
        </span>
      )}
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        aria-label="বাংলা ভাষা"
        className={`px-2 py-1 rounded-lg transition-all ${
          language === 'bn'
            ? 'bg-white text-indigo-700 shadow-xs font-extrabold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        বাং
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-label="English language"
        className={`px-2 py-1 rounded-lg transition-all ${
          language === 'en'
            ? 'bg-white text-indigo-700 shadow-xs font-extrabold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        EN
      </button>
    </div>
  );
}
