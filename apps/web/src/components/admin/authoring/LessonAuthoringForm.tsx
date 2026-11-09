'use client';

import React from 'react';
import { Plus, Send, Trash2 } from 'lucide-react';
import { MathToolbar } from '@/components/admin/math-toolbar';
import { LatexRenderer } from '@/components/math/latex-renderer';
import type { LessonFormState, LessonTermDraft } from './authoring-helpers';

export interface LessonAuthoringFormProps {
  lessonForm: LessonFormState;
  isSubmitting: boolean;
  onLessonFormChange: React.Dispatch<React.SetStateAction<LessonFormState>>;
  onSubmit: (e: React.FormEvent) => void;
}

export function LessonAuthoringForm({
  lessonForm,
  isSubmitting,
  onLessonFormChange,
  onSubmit,
}: LessonAuthoringFormProps) {
  const updateField = <K extends keyof LessonFormState>(
    field: K,
    value: LessonFormState[K],
  ) => {
    onLessonFormChange((prev) => ({ ...prev, [field]: value }));
  };

  const handleTermChange = (
    idx: number,
    field: keyof LessonTermDraft,
    value: string,
  ) => {
    onLessonFormChange((prev) => ({
      ...prev,
      terms: prev.terms.map((term, i) =>
        i === idx ? { ...term, [field]: value } : term,
      ),
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">লেসনের শিরোনাম ও শিখনফল</h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            পাঠের শিরোনাম (বাংলায়)
          </label>
          <input
            type="text"
            required
            value={lessonForm.lessonTitle}
            onChange={(e) => updateField('lessonTitle', e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            শিখনফল (Learning Goal)
          </label>
          <input
            type="text"
            required
            value={lessonForm.learningGoal}
            onChange={(e) => updateField('learningGoal', e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            মূল ব্যাখ্যা (LaTeX সমীকরণসহ)
          </label>
          <MathToolbar
            onInsert={(formula) =>
              onLessonFormChange((prev) => ({
                ...prev,
                lessonExplanation: `${prev.lessonExplanation} $${formula}$ `,
              }))
            }
            className="mb-2"
          />
          <textarea
            rows={4}
            required
            value={lessonForm.lessonExplanation}
            onChange={(e) => updateField('lessonExplanation', e.target.value)}
            className="w-full text-xs p-3 border border-slate-300 rounded-xl font-mono"
          />
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[11px] font-bold text-slate-500">ব্যাখ্যা লাইভ প্রিভিউ:</span>
          <div className="text-xs text-slate-900">
            <LatexRenderer content={lessonForm.lessonExplanation} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            গুরুত্বপূর্ণ পরিভাষা ও সংজ্ঞা (Terminology)
          </h3>
          <button
            type="button"
            onClick={() =>
              onLessonFormChange((prev) => ({
                ...prev,
                terms: [...prev.terms, { termBangla: '', termEnglish: '', definition: '' }],
              }))
            }
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন শব্দ যোগ করো</span>
          </button>
        </div>

        <div className="space-y-2">
          {lessonForm.terms.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200"
            >
              <input
                type="text"
                required
                placeholder="বাংলা শব্দ"
                value={t.termBangla}
                onChange={(e) => handleTermChange(idx, 'termBangla', e.target.value)}
                className="w-full sm:w-1/4 text-xs p-2 border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="text"
                placeholder="English Term"
                value={t.termEnglish}
                onChange={(e) => handleTermChange(idx, 'termEnglish', e.target.value)}
                className="w-full sm:w-1/4 text-xs p-2 border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="text"
                required
                placeholder="সংজ্ঞা বা সংক্ষিপ্ত ব্যাখ্যা"
                value={t.definition}
                onChange={(e) => handleTermChange(idx, 'definition', e.target.value)}
                className="w-full sm:w-2/4 text-xs p-2 border border-slate-300 rounded-lg bg-white"
              />
              {lessonForm.terms.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    onLessonFormChange((prev) => ({
                      ...prev,
                      terms: prev.terms.filter((_, i) => i !== idx),
                    }))
                  }
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          গাণিতিক উদাহরণ ও মনে রাখার টেকনিক
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              গাণিতিক সমস্যা (Problem)
            </label>
            <textarea
              rows={2}
              value={lessonForm.workedExampleProblem}
              onChange={(e) => updateField('workedExampleProblem', e.target.value)}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ধাপওয়ারী সমাধান (Solution)
            </label>
            <textarea
              rows={2}
              value={lessonForm.workedExampleSolution}
              onChange={(e) => updateField('workedExampleSolution', e.target.value)}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            মনে রাখার টেকনিক / ছন্দ (Mnemonic)
          </label>
          <input
            type="text"
            value={lessonForm.memoryAid}
            onChange={(e) => updateField('memoryAid', e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'সম্পূর্ণ লেসন খসড়া জমা দাও'}</span>
        </button>
      </div>
    </form>
  );
}
