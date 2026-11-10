'use client';

import React, { useRef, useState } from 'react';
import {
  Plus,
  Send,
  Trash2,
  Image as ImageIcon,
  Volume2,
  Video,
  Sparkles,
  Upload,
} from 'lucide-react';
import type { MediaCategory } from '@pori/shared';
import { MathToolbar } from '@/components/admin/math-toolbar';
import { RichContentRenderer } from '@/components/content/rich-content-renderer';
import { InteractiveSimulationRunner } from '@/components/content/interactive-simulation-runner';
import { MediaUploadModal } from '@/components/admin/lessons/MediaUploadModal';
import type { LessonFormState, LessonTermDraft } from './authoring-helpers';

export interface LessonAuthoringFormProps {
  lessonForm: LessonFormState;
  mode?: 'create' | 'edit';
  isArchived?: boolean;
  isSubmitting: boolean;
  onLessonFormChange: React.Dispatch<React.SetStateAction<LessonFormState>>;
  onSubmit: (e: React.FormEvent) => void;
}

export function LessonAuthoringForm({
  lessonForm,
  mode = 'create',
  isArchived = false,
  isSubmitting,
  onLessonFormChange,
  onSubmit,
}: LessonAuthoringFormProps) {
  const explanationRef = useRef<HTMLTextAreaElement>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<MediaCategory>('IMAGE');

  const updateField = <K extends keyof LessonFormState>(
    field: K,
    value: LessonFormState[K],
  ) => {
    onLessonFormChange((prev) => ({ ...prev, [field]: value }));
  };

  const insertSnippetAtCursor = (snippet: string) => {
    const textarea = explanationRef.current;
    if (!textarea) {
      onLessonFormChange((prev) => ({
        ...prev,
        lessonExplanation: prev.lessonExplanation
          ? `${prev.lessonExplanation}\n\n${snippet}`
          : snippet,
      }));
      return;
    }
    const start = textarea.selectionStart ?? lessonForm.lessonExplanation.length;
    const end = textarea.selectionEnd ?? lessonForm.lessonExplanation.length;
    const before = lessonForm.lessonExplanation.substring(0, start);
    const after = lessonForm.lessonExplanation.substring(end);
    const nextVal = `${before}${snippet}${after}`;
    onLessonFormChange((prev) => ({
      ...prev,
      lessonExplanation: nextVal,
    }));
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    });
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
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">লেসনের শিরোনাম ও শিখনফল</h3>

          <div>
            <label
              htmlFor="lesson-title"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              পাঠের শিরোনাম (বাংলায়)
            </label>
            <input
              id="lesson-title"
              type="text"
              required
              value={lessonForm.lessonTitle}
              onChange={(e) => updateField('lessonTitle', e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label
              htmlFor="lesson-learning-goal"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              শিখনফল (Learning Goal)
            </label>
            <input
              id="lesson-learning-goal"
              type="text"
              required
              value={lessonForm.learningGoal}
              onChange={(e) => updateField('learningGoal', e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label
              htmlFor="lesson-explanation"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              মূল ব্যাখ্যা (LaTeX সমীকরণ ও মিডিয়াসহ)
            </label>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <button
                type="button"
                onClick={() => {
                  setModalCategory('IMAGE');
                  setIsMediaModalOpen(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                <span>ছবি যোগ</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalCategory('AUDIO');
                  setIsMediaModalOpen(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>অডিও ক্লিপ</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalCategory('VIDEO');
                  setIsMediaModalOpen(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-rose-600" />
                <span>ভিডিও লেকচার</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalCategory('INTERACTIVE');
                  setIsMediaModalOpen(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>সিমুলেশন ফাইল</span>
              </button>
            </div>
            <MathToolbar
              onInsert={(formula) =>
                insertSnippetAtCursor(`$${formula}$ `)
              }
              className="mb-2"
            />
            <textarea
              ref={explanationRef}
              id="lesson-explanation"
              rows={5}
              required
              value={lessonForm.lessonExplanation}
              onChange={(e) => updateField('lessonExplanation', e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl font-mono"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500">ব্যাখ্যা লাইভ প্রিভিউ:</span>
            <div className="text-xs text-slate-900 bg-white p-3 rounded-lg border border-slate-200">
              <RichContentRenderer content={lessonForm.lessonExplanation} />
            </div>
          </div>
        </div>

        {/* Dedicated Interactive Simulation Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">
                ইন্টারেক্টিভ সিমুলেশন (Interactive HTML Widget)
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setModalCategory('INTERACTIVE');
                setIsMediaModalOpen(true);
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>সিমুলেশন ফাইল আপলোড</span>
            </button>
          </div>

          <div>
            <label
              htmlFor="lesson-interactive-url"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              সিমুলেশন লিঙ্ক / URL (HTML বা ZIP থেকে এক্সট্রাক্ট করা পাথ)
            </label>
            <div className="flex items-center gap-2">
              <input
                id="lesson-interactive-url"
                type="text"
                placeholder="/uploads/interactive/... বা https://..."
                value={lessonForm.interactiveWidgetUrl || ''}
                onChange={(e) => updateField('interactiveWidgetUrl', e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-mono"
              />
              {lessonForm.interactiveWidgetUrl && (
                <button
                  type="button"
                  onClick={() => updateField('interactiveWidgetUrl', '')}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0 border border-rose-200"
                  title="সিমুলেশন মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {lessonForm.interactiveWidgetUrl ? (
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block">সিমুলেশন লাইভ প্রিভিউ:</span>
              <InteractiveSimulationRunner
                widgetUrl={lessonForm.interactiveWidgetUrl}
                title={lessonForm.lessonTitle || 'সিমুলেশন'}
              />
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 italic">
              কোনো ইন্টার‍্যাক্টিভ সিমুলেশন সংযুক্ত করা হয়নি (ঐচ্ছিক)। সাউন্ড বা ফিজিক্স ল্যাব থাকলে যুক্ত করতে পারেন।
            </p>
          )}
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
                  aria-label={`পরিভাষা ${idx + 1} বাংলা শব্দ`}
                  placeholder="বাংলা শব্দ"
                  value={t.termBangla}
                  onChange={(e) => handleTermChange(idx, 'termBangla', e.target.value)}
                  className="w-full sm:w-1/4 text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />
                <input
                  type="text"
                  aria-label={`পরিভাষা ${idx + 1} English Term`}
                  placeholder="English Term"
                  value={t.termEnglish}
                  onChange={(e) => handleTermChange(idx, 'termEnglish', e.target.value)}
                  className="w-full sm:w-1/4 text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />
                <input
                  type="text"
                  aria-label={`পরিভাষা ${idx + 1} সংজ্ঞা`}
                  placeholder="সংজ্ঞা বা সংক্ষিপ্ত ব্যাখ্যা"
                  value={t.definition}
                  onChange={(e) => handleTermChange(idx, 'definition', e.target.value)}
                  className="w-full sm:w-2/4 text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />
                {lessonForm.terms.length > 1 && (
                  <button
                    type="button"
                    aria-label={`পরিভাষা ${idx + 1} মুছুন`}
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
              <label
                htmlFor="lesson-worked-problem"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                গাণিতিক সমস্যা (Problem)
              </label>
              <textarea
                id="lesson-worked-problem"
                rows={2}
                value={lessonForm.workedExampleProblem}
                onChange={(e) => updateField('workedExampleProblem', e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>
            <div>
              <label
                htmlFor="lesson-worked-solution"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                ধাপওয়ারী সমাধান (Solution)
              </label>
              <textarea
                id="lesson-worked-solution"
                rows={2}
                value={lessonForm.workedExampleSolution}
                onChange={(e) => updateField('workedExampleSolution', e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lesson-memory-aid"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              মনে রাখার টেকনিক / ছন্দ (Mnemonic)
            </label>
            <input
              id="lesson-memory-aid"
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
            disabled={isSubmitting || isArchived}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>
              {isSubmitting
                ? 'সংরক্ষণ হচ্ছে...'
                : mode === 'edit'
                  ? 'পরিবর্তন সংরক্ষণ করুন'
                  : 'সম্পূর্ণ লেসন খসড়া জমা দাও'}
            </span>
          </button>
        </div>
      </form>

      <MediaUploadModal
        isOpen={isMediaModalOpen}
        initialCategory={modalCategory}
        onClose={() => setIsMediaModalOpen(false)}
        onInsertTag={(tag) => insertSnippetAtCursor(tag)}
        onSelectSimulation={(url) => updateField('interactiveWidgetUrl', url)}
      />
    </>
  );
}
