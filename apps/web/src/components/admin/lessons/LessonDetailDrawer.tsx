'use client';

import React from 'react';
import Link from 'next/link';
import { Archive, BookOpen, Calculator, Lightbulb, Pencil, Tag } from 'lucide-react';
import type { AdminLessonItem, LessonTermItem } from '@pori/shared';
import { useLanguageStore } from '@/store/language-store';
import { AdminDrawer } from '../layout/AdminDrawer';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { RichContentRenderer } from '@/components/content/rich-content-renderer';
import { InteractiveSimulationRunner } from '@/components/content/interactive-simulation-runner';
import { formatAdminDateTime, getContentStatusBadge } from '../content-status-badge';

export interface LessonDetailDrawerProps {
  lesson: AdminLessonItem | null;
  isOpen: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
  canEdit: boolean;
  isAdmin: boolean;
  onRequestArchive: (lesson: AdminLessonItem) => void;
}

export function LessonDetailDrawer({
  lesson,
  isOpen,
  onClose,
  closeOnEscape = true,
  canEdit,
  isAdmin,
  onRequestArchive,
}: LessonDetailDrawerProps) {
  const language = useLanguageStore((s) => s.language);
  const tr = useLanguageStore((s) => s.tr);

  if (!isOpen || !lesson) {
    return null;
  }

  const statusMeta = getContentStatusBadge(lesson.status, language);
  const showEdit = canEdit && lesson.status !== 'ARCHIVED';
  const showArchive =
    canEdit &&
    lesson.status !== 'ARCHIVED' &&
    (lesson.status !== 'PUBLISHED' || isAdmin);

  const hierarchyLabel = [
    lesson.topic?.chapter?.subject?.nameBangla || tr('অজানা বিষয়', 'Unknown Subject'),
    lesson.topic?.chapter?.titleBangla,
    lesson.topic?.titleBangla,
  ]
    .filter(Boolean)
    .join(' > ');

  const validTerms = Array.isArray(lesson.importantTerms)
    ? lesson.importantTerms.filter(
        (term): term is LessonTermItem =>
          Boolean(term) &&
          typeof term.termBangla === 'string' &&
          term.termBangla.trim().length > 0,
      )
    : [];

  const workedProblem =
    typeof lesson.workedExample?.problem === 'string'
      ? lesson.workedExample.problem.trim()
      : '';
  const workedSolution =
    typeof lesson.workedExample?.stepByStepSolution === 'string'
      ? lesson.workedExample.stepByStepSolution.trim()
      : '';
  const hasWorkedExample = Boolean(workedProblem || workedSolution);

  const memoryAid =
    typeof lesson.memoryAid === 'string' ? lesson.memoryAid.trim() : '';

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      closeOnEscape={closeOnEscape}
      widthClass="max-w-xl"
      title={tr('লেসনের বিস্তারিত', 'Lesson Details')}
      subtitle={hierarchyLabel}
      footer={
        <div className="w-full flex flex-wrap items-center justify-end gap-2.5">
          {showEdit && (
            <Link
              href={`/admin/curriculum/lessons/${encodeURIComponent(lesson.id)}/edit`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>{tr('সম্পাদনা করুন', 'Edit Lesson')}</span>
            </Link>
          )}
          {showArchive && (
            <button
              type="button"
              onClick={() => onRequestArchive(lesson)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>{tr('আর্কাইভ করুন', 'Archive Lesson')}</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors"
          >
            {tr('বন্ধ করুন', 'Close')}
          </button>
        </div>
      }
    >
      {/* Metadata Card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-600">
            ID: {lesson.id}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusMeta.className}`}
          >
            {statusMeta.label}
          </span>
          <span className="text-[11px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
            v{lesson.version}
          </span>
        </div>
        <div className="text-[11px] text-slate-600 font-medium">{hierarchyLabel}</div>
      </div>

      {/* Title & Learning Goal */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {tr('পাঠের শিরোনাম', 'Lesson Title')}
          </h3>
          <div className="text-sm font-bold text-slate-900 mt-1 leading-relaxed">
            <LatexRenderer content={lesson.titleBangla} />
          </div>
        </div>

        <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3 space-y-1">
          <div className="text-[11px] font-bold text-indigo-900">
            {tr('শিখনফল', 'Learning Goal')}
          </div>
          <div className="text-xs text-slate-800 leading-relaxed">
            <LatexRenderer content={lesson.learningGoal} />
          </div>
        </div>
      </div>

      {/* Interactive Simulation (if present) */}
      {lesson.interactiveWidgetUrl && (
        <InteractiveSimulationRunner
          widgetUrl={lesson.interactiveWidgetUrl}
          title={lesson.titleBangla}
        />
      )}

      {/* Core Explanation with Rich Content (Audio, Video, Images, KaTeX) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>{tr('মূল ব্যাখ্যা ও কনটেন্ট', 'Core Content & Explanation')}</span>
        </div>
        <div className="text-xs text-slate-800 leading-relaxed">
          <RichContentRenderer content={lesson.explanation} />
        </div>
      </div>

      {/* Important Terms */}
      {validTerms.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-indigo-600" />
              <span>{tr('গুরুত্বপূর্ণ পরিভাষা', 'Key Terminology')}</span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {validTerms.length}{tr('টি', ' terms')}
            </span>
          </div>
          <ul className="space-y-2">
            {validTerms.map((term, idx) => {
              const termBangla = term.termBangla.trim();
              const termEnglish =
                typeof term.termEnglish === 'string' ? term.termEnglish.trim() : '';
              const definition =
                typeof term.definition === 'string' ? term.definition.trim() : '';
              return (
                <li
                  key={`${termBangla}-${idx}`}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1"
                >
                  <div className="flex flex-wrap items-center gap-2 font-bold text-slate-900">
                    <span>{termBangla}</span>
                    {termEnglish && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                        {termEnglish}
                      </span>
                    )}
                  </div>
                  {definition && (
                    <div className="text-slate-700 leading-relaxed">
                      <LatexRenderer content={definition} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {hasWorkedExample && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-purple-600" />
            <span>{tr('গাণিতিক উদাহরণ', 'Worked Example')}</span>
          </div>

          {workedProblem && (
            <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3 space-y-1">
              <div className="text-[11px] font-bold text-purple-900">{tr('গাণিতিক সমস্যা', 'Problem Statement')}</div>
              <div className="text-slate-800 leading-relaxed">
                <LatexRenderer content={workedProblem} />
              </div>
            </div>
          )}

          {workedSolution && (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 space-y-1">
              <div className="text-[11px] font-bold text-emerald-900">{tr('ধাপওয়ারী সমাধান', 'Step-by-Step Solution')}</div>
              <div className="text-slate-800 leading-relaxed">
                <LatexRenderer content={workedSolution} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Memory Aid & Timestamps */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs">
        {memoryAid && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-amber-950">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-[11px] font-bold text-amber-900">
                {tr('মনে রাখার টেকনিক / ছন্দ', 'Memory Aid / Mnemonic')}
              </div>
              <div className="text-slate-800">
                <LatexRenderer content={memoryAid} />
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>{tr('তৈরি:', 'Created:')} {formatAdminDateTime(lesson.createdAt, language)}</span>
          <span>{tr('সর্বশেষ হালনাগাদ:', 'Last Updated:')} {formatAdminDateTime(lesson.updatedAt, language)}</span>
        </div>
      </div>
    </AdminDrawer>
  );
}
