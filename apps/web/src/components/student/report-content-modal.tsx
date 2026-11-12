'use client';

import React, { useState } from 'react';
import { Flag, X, CheckCircle2, Send } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { ensureGuestSession } from '@/lib/guest-session';
import { useUserStore } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import type { ReportCategory } from '@pori/shared';

export interface ReportContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'LESSON' | 'QUESTION';
  contentId: string;
  topicId?: string;
  contentLabel?: string;
}

const CATEGORIES: Array<{ value: ReportCategory; bn: string; en: string }> = [
  { value: 'WRONG_ANSWER', bn: 'ভুল উত্তর বা চিহ্নিতকরণ', en: 'Wrong Answer / Key' },
  { value: 'TYPO_OR_LATEX', bn: 'টাইপো বা LaTeX ফরম্যাটিং সমস্যা', en: 'Typo or Formula Issue' },
  { value: 'UNCLEAR_EXPLANATION', bn: 'অস্পষ্ট বা কঠিন ব্যাখ্যা', en: 'Unclear Explanation' },
  { value: 'CURRICULUM_MISMATCH', bn: 'পাঠ্যসূচি বা অধ্যায় অসামঞ্জস্য', en: 'Curriculum Mismatch' },
  { value: 'OTHER', bn: 'অন্যান্য সমস্যা', en: 'Other Issue' },
];

export const ReportContentModal: React.FC<ReportContentModalProps> = ({
  isOpen,
  onClose,
  contentType,
  contentId,
  topicId,
  contentLabel,
}) => {
  const { tr } = useLanguageStore();
  const addReportedIssue = useUserStore((s) => s.addReportedIssue);

  const [category, setCategory] = useState<ReportCategory>('WRONG_ANSWER');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = description.trim();
    if (!trimmed) {
      setErrorMsg(tr('অনুগ্রহ করে সমস্যার বিবরণ লেখো।', 'Please describe the issue.'));
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    try {
      await ensureGuestSession().catch(() => {});
      const created = await apiClient.post<any>('/content-reports', {
        contentType,
        contentId,
        topicId,
        category,
        description: trimmed,
      });

      addReportedIssue({
        id: created?.id || `rep_local_${Date.now()}`,
        contentType,
        contentId,
        topicId: topicId ?? null,
        category,
        description: trimmed,
        status: created?.status || 'OPEN',
        resolutionNote: created?.resolutionNote ?? null,
        createdAt: created?.createdAt || new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      addReportedIssue({
        id: `rep_local_${Date.now()}`,
        contentType,
        contentId,
        topicId: topicId ?? null,
        category,
        description: trimmed,
        status: 'OPEN',
        resolutionNote: null,
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setDescription('');
    setErrorMsg(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={tr('কনটেন্ট ভুল রিপোর্ট করো', 'Report Content Issue')}
    >
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
            <Flag className="w-4 h-4 text-rose-600" />
            <span>{tr('কনটেন্ট ভুল রিপোর্ট করো', 'Report Content Issue')}</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label={tr('বন্ধ করো', 'Close')}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {submitted ? (
            <div className="text-center space-y-4 py-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold text-slate-900">
                  {tr('ধন্যবাদ! তোমার রিপোর্টটি জমা হয়েছে', 'Thank you! Your report has been submitted')}
                </p>
                <p className="text-xs text-slate-500">
                  {tr(
                    'আমাদের রিভিউ টিম শীঘ্রই এটি যাচাই করে সমাধান করবে।',
                    'Our editorial review team will verify and fix it shortly.',
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
              >
                {tr('ঠিক আছে', 'Done')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {contentLabel && (
                <div className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-600 line-clamp-2">
                  <span className="font-bold text-slate-800 mr-1">
                    {contentType === 'LESSON' ? tr('পাঠ:', 'Lesson:') : tr('প্রশ্ন:', 'Question:')}
                  </span>
                  {contentLabel}
                </div>
              )}

              <div>
                <label
                  htmlFor="report-category"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  {tr('ভুলের ধরন', 'Issue Category')}
                </label>
                <select
                  id="report-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ReportCategory)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {tr(c.bn, c.en)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="report-description"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  {tr('সমস্যার বিবরণ', 'Details')}
                </label>
                <textarea
                  id="report-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={tr(
                    'বিস্তারিত লেখো (কী ভুল আছে বা সঠিক কী হওয়া উচিত)...',
                    'Describe what is wrong or unclear...',
                  )}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {errorMsg && <p className="text-xs font-semibold text-rose-600">{errorMsg}</p>}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  {tr('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{tr('রিপোর্ট পাঠাও', 'Submit Report')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
