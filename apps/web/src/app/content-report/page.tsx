'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Flag, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { ensureGuestSession } from '@/lib/guest-session';
import { useUserStore, ReportedIssueItem } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import type { ReportCategory } from '@pori/shared';

function ContentReportForm() {
  const searchParams = useSearchParams();
  const { tr } = useLanguageStore();
  const { token, reportedIssues, addReportedIssue } = useUserStore();

  const initialType =
    searchParams.get('type')?.toUpperCase() === 'LESSON' ? 'LESSON' : 'QUESTION';
  const initialId = searchParams.get('id') || '';
  const initialTopicId = searchParams.get('topicId') || '';

  const [contentType, setContentType] = useState<'LESSON' | 'QUESTION'>(initialType);
  const [contentId, setContentId] = useState(initialId);
  const [category, setCategory] = useState<ReportCategory>('WRONG_ANSWER');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [serverReports, setServerReports] = useState<ReportedIssueItem[]>([]);

  useEffect(() => {
    if (!token) return;
    Promise.resolve(apiClient.get<ReportedIssueItem[]>('/content-reports/mine'))
      .then((rows) => {
        if (Array.isArray(rows)) setServerReports(rows);
      })
      .catch(() => {});
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentId.trim() || !description.trim()) {
      setErrorMsg(tr('কনটেন্ট আইডি এবং সমস্যার বিবরণ দুটোই প্রয়োজন।', 'Content ID and description are required.'));
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    setSubmittedMsg(null);
    try {
      await ensureGuestSession().catch(() => {});
      const created = await apiClient.post<any>('/content-reports', {
        contentType,
        contentId: contentId.trim(),
        topicId: initialTopicId || undefined,
        category,
        description: description.trim(),
      });
      const record: ReportedIssueItem = {
        id: created?.id || `rep_local_${Date.now()}`,
        contentType,
        contentId: contentId.trim(),
        topicId: initialTopicId || null,
        category,
        description: description.trim(),
        status: created?.status || 'OPEN',
        resolutionNote: null,
        createdAt: created?.createdAt || new Date().toISOString(),
      };
      addReportedIssue(record);
      setServerReports((prev) => [record, ...prev.filter((r) => r.id !== record.id)]);
      setDescription('');
      setSubmittedMsg(tr('ধন্যবাদ! তোমার রিপোর্টটি সফলভাবে জমা হয়েছে।', 'Report submitted successfully!'));
    } catch (err: any) {
      setErrorMsg(err?.message || tr('রিপোর্ট পাঠানো যায়নি। কনটেন্ট আইডি যাচাই করো।', 'Could not submit report.'));
    } finally {
      setSubmitting(false);
    }
  };

  const allReports = React.useMemo(() => {
    const map = new Map<string, ReportedIssueItem>();
    for (const r of serverReports) map.set(r.id, r);
    for (const r of reportedIssues) if (!map.has(r.id)) map.set(r.id, r);
    return Array.from(map.values());
  }, [serverReports, reportedIssues]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{tr('অ্যাকাউন্টে ফিরে যাও', 'Back to Account')}</span>
        </Link>
      </div>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">
              {tr('কনটেন্ট ভুল বা অস্পষ্টতা রিপোর্ট', 'Report a Content Error')}
            </h1>
            <p className="text-xs text-slate-500">
              {tr(
                'ভুল উত্তর, ভাঙা গাণিতিক সূত্র বা অস্পষ্ট বাংলা ব্যাখ্যা জানাও — আমরা দ্রুত সংশোধন করব।',
                'Report wrong answers, broken formulas, or unclear explanations.',
              )}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {tr('কনটেন্টের ধরন', 'Content Type')}
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as 'LESSON' | 'QUESTION')}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900"
              >
                <option value="QUESTION">{tr('প্রশ্ন (Question)', 'Question')}</option>
                <option value="LESSON">{tr('পাঠ (Lesson)', 'Lesson')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {tr('ভুলের ধরন', 'Issue Category')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ReportCategory)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900"
              >
                <option value="WRONG_ANSWER">{tr('ভুল উত্তর', 'Wrong Answer')}</option>
                <option value="TYPO_OR_LATEX">{tr('টাইপো বা LaTeX সমস্যা', 'Typo or LaTeX')}</option>
                <option value="UNCLEAR_EXPLANATION">{tr('অস্পষ্ট ব্যাখ্যা', 'Unclear Explanation')}</option>
                <option value="CURRICULUM_MISMATCH">{tr('পাঠ্যসূচি অসামঞ্জস্য', 'Curriculum Mismatch')}</option>
                <option value="OTHER">{tr('অন্যান্য', 'Other')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {tr('কনটেন্ট আইডি', 'Content ID')}
            </label>
            <input
              type="text"
              value={contentId}
              onChange={(e) => setContentId(e.target.value)}
              placeholder="e.g. les_... or q_..."
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {tr('বিস্তারিত বিবরণ', 'Description')}
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={tr('সমস্যাটি বিস্তারিত লেখো...', 'Describe the issue...')}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm text-slate-900"
            />
          </div>

          {errorMsg && <p className="text-xs font-semibold text-rose-600">{errorMsg}</p>}
          {submittedMsg && (
            <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{submittedMsg}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs disabled:opacity-60 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{tr('রিপোর্ট পাঠাও', 'Submit Report')}</span>
          </button>
        </form>
      </section>

      {allReports.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900">
            {tr('সাম্প্রতিক রিপোর্টসমূহ', 'Recent Reports')}
          </h2>
          <ul className="space-y-2">
            {allReports.map((rep) => (
              <li
                key={rep.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>
                    {rep.contentType} • {rep.contentId}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px]">
                    {rep.status}
                  </span>
                </div>
                <p className="text-slate-600">{rep.description}</p>
                {rep.resolutionNote && (
                  <p className="text-emerald-700 font-semibold">{rep.resolutionNote}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function ContentReportPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto p-6 text-xs text-slate-500">লোড হচ্ছে...</div>}>
      <ContentReportForm />
    </Suspense>
  );
}
