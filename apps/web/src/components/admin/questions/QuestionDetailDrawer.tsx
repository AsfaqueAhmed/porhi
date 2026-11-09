'use client';

import React from 'react';
import Link from 'next/link';
import { Archive, BookOpen, CheckCircle2, Pencil, ShieldCheck, Sparkles } from 'lucide-react';
import type { AdminQuestionItem, CQRubric, ExplanationObject } from '@pori/shared';
import { AdminDrawer } from '../layout/AdminDrawer';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { formatAdminDateTime, getContentStatusBadge } from '../content-status-badge';

export interface QuestionDetailDrawerProps {
  question: AdminQuestionItem | null;
  isOpen: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
  canEdit: boolean;
  isAdmin: boolean;
  onRequestArchive: (question: AdminQuestionItem) => void;
}

const CQ_DETAIL_PARTS: Array<{ key: keyof CQRubric; title: string }> = [
  { key: 'ka', title: 'ক — জ্ঞানমূলক মানদণ্ড' },
  { key: 'kha', title: 'খ — অনুধাবনমূলক মানদণ্ড' },
  { key: 'ga', title: 'গ — প্রয়োগমূলক মানদণ্ড' },
  { key: 'gha', title: 'ঘ — উচ্চতর দক্ষতা মানদণ্ড' },
];

export function QuestionDetailDrawer({
  question,
  isOpen,
  onClose,
  closeOnEscape = true,
  canEdit,
  isAdmin,
  onRequestArchive,
}: QuestionDetailDrawerProps) {
  if (!isOpen || !question) {
    return null;
  }

  const statusMeta = getContentStatusBadge(question.status);
  const showEdit = canEdit && question.status !== 'ARCHIVED';
  const showArchive =
    canEdit &&
    question.status !== 'ARCHIVED' &&
    (question.status !== 'PUBLISHED' || isAdmin);

  const options = Array.isArray(question.options) ? question.options : [];
  const optionIds = new Set(options.map((opt) => opt.id));
  const distractorAnalysis = question.explanation?.distractorAnalysis ?? {};
  const unmappedDistractors = Object.entries(distractorAnalysis).filter(
    ([key, val]) => !optionIds.has(key) && typeof val === 'string' && val.trim().length > 0,
  );
  const rawNotes = (question.explanation as ExplanationObject & { distractorNotes?: unknown })
    ?.distractorNotes;
  const distractorNotes = typeof rawNotes === 'string' && rawNotes.trim() ? rawNotes.trim() : null;

  const cqParts = CQ_DETAIL_PARTS.filter(({ key }) =>
    Boolean(question.cqRubric?.[key]?.criteria?.trim()),
  );
  const totalCqMark = cqParts.reduce(
    (sum, { key }) => sum + (question.cqRubric?.[key]?.mark ?? 0),
    0,
  );

  const hierarchyLabel = [
    question.topic?.chapter?.subject?.nameBangla || 'অজানা বিষয়',
    question.topic?.chapter?.titleBangla,
    question.topic?.titleBangla,
  ]
    .filter(Boolean)
    .join(' > ');

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      closeOnEscape={closeOnEscape}
      widthClass="max-w-xl"
      title="প্রশ্নের বিস্তারিত (Question Details)"
      subtitle={hierarchyLabel}
      footer={
        <div className="w-full flex flex-wrap items-center justify-end gap-2.5">
          {showEdit && (
            <Link
              href={`/admin/questions/${question.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>সম্পাদনা করুন</span>
            </Link>
          )}
          {showArchive && (
            <button
              type="button"
              onClick={() => onRequestArchive(question)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>আর্কাইভ করুন</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      }
    >
      {/* Metadata Cards */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-600">
            ID: {question.id}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              question.type === 'CQ_CREATIVE'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-sky-50 text-sky-700 border-sky-200'
            }`}
          >
            {question.type === 'CQ_CREATIVE' ? 'সৃজনশীল (CQ)' : 'MCQ'}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusMeta.className}`}
          >
            {statusMeta.label}
          </span>
          <span className="text-[11px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
            v{question.version}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              question.isVerified
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>{question.isVerified ? 'যাচাইকৃত' : 'অযাচাইকৃত'}</span>
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
            {question.difficulty}
          </span>
          {question.boardSource && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
              {question.boardSource}
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-600 font-medium">{hierarchyLabel}</div>
      </div>

      {/* Question Stem */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {question.type === 'CQ_CREATIVE' ? 'সৃজনশীল উদ্দীপক' : 'প্রশ্নের বিবরণ'}
        </h3>
        <div className="text-sm font-semibold text-slate-900 leading-relaxed">
          <LatexRenderer content={question.stem} />
        </div>
      </div>

      {/* MCQ Options & Per-Option Distractor Notes */}
      {question.type === 'MCQ' && options.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            বিকল্পসমূহ ও সঠিক উত্তর
          </h3>
          <ol className="space-y-2">
            {options.map((opt, idx) => {
              const label = ['ক', 'খ', 'গ', 'ঘ'][idx] || String(idx + 1);
              const note = distractorAnalysis[opt.id]?.trim();
              return (
                <li
                  key={opt.id}
                  className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                    opt.isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50/60 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 font-semibold">
                      <span className="inline-flex w-5 h-5 rounded-full bg-white border border-slate-300 items-center justify-center text-[10px] font-bold shrink-0">
                        {label}
                      </span>
                      <LatexRenderer content={opt.text} />
                    </div>
                    {opt.isCorrect && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>সঠিক উত্তর</span>
                      </span>
                    )}
                  </div>
                  {note && (
                    <div className="pl-7 text-[11px] text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-700">নোট: </span>
                      <LatexRenderer content={note} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {/* CQ Rubric */}
      {question.type === 'CQ_CREATIVE' && cqParts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              সৃজনশীল (CQ) রুব্রিক
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              মোট নম্বর: {totalCqMark}
            </span>
          </div>
          <div className="space-y-2">
            {cqParts.map(({ key, title }) => {
              const part = question.cqRubric?.[key];
              if (!part) return null;
              return (
                <div
                  key={key}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{title}</span>
                    <span className="font-mono text-indigo-700">নম্বর: {part.mark}</span>
                  </div>
                  <div className="text-slate-700 leading-relaxed">
                    <LatexRenderer content={part.criteria} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6-Layer Explanation & Citation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          ৬-স্তরের ব্যাখ্যা ও রেফারেন্স
        </h3>

        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 space-y-1">
          <div className="text-[11px] font-bold text-emerald-900">সরাসরি উত্তর</div>
          <div className="text-slate-800">
            <LatexRenderer content={question.explanation?.directAnswer || '—'} />
          </div>
        </div>

        <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3 space-y-1">
          <div className="text-[11px] font-bold text-indigo-900">মূল ধারণা</div>
          <div className="text-slate-800">
            <LatexRenderer content={question.explanation?.coreConcept || '—'} />
          </div>
        </div>

        {question.explanation?.stepDerivation && (
          <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3 space-y-1">
            <div className="text-[11px] font-bold text-purple-900">ধাপওয়ারী সমাধান</div>
            <div className="text-slate-800 leading-relaxed">
              <LatexRenderer content={question.explanation.stepDerivation} />
            </div>
          </div>
        )}

        {(unmappedDistractors.length > 0 || distractorNotes) && (
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3 space-y-1">
            <div className="text-[11px] font-bold text-amber-900">
              ডিস্ট্র্যাক্টর বিশ্লেষণ / সাধারণ নোট
            </div>
            {distractorNotes && (
              <div className="text-slate-800">
                <LatexRenderer content={distractorNotes} />
              </div>
            )}
            {unmappedDistractors.map(([key, note]) => (
              <div key={key} className="text-slate-700">
                <span className="font-mono font-bold mr-1.5">{key}:</span>
                <LatexRenderer content={note} />
              </div>
            ))}
          </div>
        )}

        {question.explanation?.textbookCitation?.bookTitle && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2 text-slate-700">
            <BookOpen className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">NCTB পাঠ্যবই রেফারেন্স: </span>
              <span>
                {question.explanation.textbookCitation.bookTitle}
                {question.explanation.textbookCitation.chapterName
                  ? ` • ${question.explanation.textbookCitation.chapterName}`
                  : ''}
                {question.explanation.textbookCitation.pageNumber !== undefined &&
                question.explanation.textbookCitation.pageNumber !== null
                  ? ` • পৃষ্ঠা: ${question.explanation.textbookCitation.pageNumber}`
                  : ''}
              </span>
            </div>
          </div>
        )}

        {question.explanation?.proTipShortcut && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2 text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">প্রো-টিপ / শর্টকাট: </span>
              <LatexRenderer content={question.explanation.proTipShortcut} />
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>তৈরি: {formatAdminDateTime(question.createdAt)}</span>
          <span>সর্বশেষ হালনাগাদ: {formatAdminDateTime(question.updatedAt)}</span>
        </div>
      </div>
    </AdminDrawer>
  );
}
