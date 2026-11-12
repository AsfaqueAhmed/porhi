'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Flag,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useLanguageStore } from '@/store/language-store';
import { toBanglaDigits } from '@/lib/formatters';

interface AdminReportRow {
  id: string;
  userId?: string | null;
  reporterName?: string | null;
  contentType: 'LESSON' | 'QUESTION';
  contentId: string;
  topicId?: string | null;
  contentTitle?: string;
  contentStatus?: string | null;
  topicTitleBangla?: string | null;
  chapterTitleBangla?: string | null;
  category: string;
  description: string;
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'DISMISSED';
  resolutionNote?: string | null;
  resolvedAt?: string | null;
  createdAt: string;
}

interface ReportsResponse {
  items: AdminReportRow[];
  summary: {
    total: number;
    openCount: number;
    inReviewCount: number;
    resolvedCount: number;
    dismissedCount: number;
    avgResolutionHours: number | null;
  };
}

export default function AdminReportsPage() {
  const { tr, formatDigits } = useLanguageStore();

  const [data, setData] = useState<ReportsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [notesById, setNotesById] = useState<Record<string, string>>({});
  const [moveCorrectionById, setMoveCorrectionById] = useState<Record<string, boolean>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadReports = async (filter = statusFilter) => {
    setLoading(true);
    try {
      const qs = filter !== 'ALL' ? `?status=${encodeURIComponent(filter)}` : '';
      const res = await apiClient.get<ReportsResponse>(`/admin/content/reports${qs}`);
      if (res && Array.isArray(res.items)) {
        setData(res);
      }
    } catch {
      // Handle offline cleanly
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports(statusFilter);
  }, [statusFilter]);

  const handleResolve = async (
    row: AdminReportRow,
    nextStatus: 'IN_REVIEW' | 'RESOLVED' | 'DISMISSED',
  ) => {
    setSavingId(row.id);
    try {
      const payload = {
        status: nextStatus,
        resolutionNote: (notesById[row.id] ?? row.resolutionNote ?? '').trim() || undefined,
        moveContentToCorrection: Boolean(moveCorrectionById[row.id]),
      };
      const res = await apiClient.patch<{ report: AdminReportRow; movedToCorrection?: boolean }>(
        `/admin/content/reports/${row.id}`,
        payload,
      );

      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.id === row.id
              ? {
                  ...item,
                  status: res?.report?.status || nextStatus,
                  resolutionNote:
                    res?.report?.resolutionNote ?? payload.resolutionNote ?? item.resolutionNote,
                  contentStatus: res?.movedToCorrection ? 'CORRECTION' : item.contentStatus,
                }
              : item,
          ),
        };
      });
    } finally {
      setSavingId(null);
    }
  };

  const summary = data?.summary || {
    total: 0,
    openCount: 0,
    inReviewCount: 0,
    resolvedCount: 0,
    dismissedCount: 0,
    avgResolutionHours: null,
  };

  const items = data?.items || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Flag className="w-5 h-5 text-rose-600" />
            <span>{tr('কনটেন্ট ত্রুটি রিপোর্ট কিউ (Triage Queue)', 'Content Error Reports Triage')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {tr(
              'শিক্ষার্থীদের পাঠানো কনটেন্ট ভুল যাচাই করুন এবং প্রয়োজনে সংশোধন (CORRECTION) কিউতে পাঠান।',
              'Triage student-reported errors and escalate broken lessons or questions into the CORRECTION workflow.',
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadReports(statusFilter)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{tr('রিফ্রেশ', 'Refresh')}</span>
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>{tr('খোলা রিপোর্ট (OPEN)', 'Open Reports')}</span>
          </div>
          <p className="text-2xl font-black text-rose-600 mt-1">{formatDigits(summary.openCount)}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{tr('পর্যালোচনাধীন', 'In Review')}</span>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-1">{formatDigits(summary.inReviewCount)}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{tr('সমাধানকৃত', 'Resolved')}</span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-1">{formatDigits(summary.resolvedCount)}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>{tr('গড় সমাধান সময়', 'Avg Correction Time')}</span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {summary.avgResolutionHours !== null
              ? `${toBanglaDigits(summary.avgResolutionHours)} ${tr('ঘন্টা', 'hrs')}`
              : tr('—', '—')}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { key: 'ALL', label: tr('সকল', 'All') },
          { key: 'OPEN', label: tr('খোলা (OPEN)', 'Open') },
          { key: 'IN_REVIEW', label: tr('পর্যালোচনাধীন', 'In Review') },
          { key: 'RESOLVED', label: tr('সমাধানকৃত', 'Resolved') },
          { key: 'DISMISSED', label: tr('বাতিল', 'Dismissed') },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              statusFilter === tab.key
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reports List */}
      {loading && !data ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
          {tr('রিপোর্ট লোড হচ্ছে...', 'Loading content reports...')}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm font-semibold text-slate-500">
          {tr('এই ফিল্টারে কোনো রিপোর্ট পাওয়া যায়নি।', 'No content reports match this filter.')}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((row) => {
            const editHref =
              row.contentType === 'LESSON'
                ? `/admin/curriculum/lessons/${row.contentId}/edit`
                : `/admin/questions/${row.contentId}/edit`;

            return (
              <div
                key={row.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {row.contentType}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        {row.category}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {row.status}
                      </span>
                      {row.contentStatus && (
                        <span className="text-[11px] font-mono text-slate-500">
                          {tr('স্ট্যাটাস:', 'Content:')} {row.contentStatus}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {row.contentTitle || row.contentId}
                    </h3>
                    {(row.chapterTitleBangla || row.topicTitleBangla) && (
                      <p className="text-xs text-slate-500">
                        {[row.chapterTitleBangla, row.topicTitleBangla].filter(Boolean).join(' • ')}
                      </p>
                    )}
                  </div>

                  <Link
                    href={editHref}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline shrink-0"
                  >
                    <span>{tr('সম্পাদনা করুন', 'Edit Content')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/80 text-xs sm:text-sm text-slate-800">
                  {row.description}
                </div>

                <div className="space-y-3 pt-1 border-t border-slate-100">
                  <input
                    type="text"
                    value={notesById[row.id] ?? row.resolutionNote ?? ''}
                    onChange={(e) =>
                      setNotesById((prev) => ({ ...prev, [row.id]: e.target.value }))
                    }
                    placeholder={tr('সমাধান বা রিভিউ নোট লেখো...', 'Enter resolution or review note...')}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(moveCorrectionById[row.id])}
                        onChange={(e) =>
                          setMoveCorrectionById((prev) => ({
                            ...prev,
                            [row.id]: e.target.checked,
                          }))
                        }
                        className="rounded border-slate-300 text-indigo-600"
                      />
                      <span>
                        {tr(
                          'সংশোধনের জন্য কনটেন্ট CORRECTION কিউতে পাঠাও',
                          'Move target content to CORRECTION workflow',
                        )}
                      </span>
                    </label>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={savingId === row.id}
                        onClick={() => handleResolve(row, 'IN_REVIEW')}
                        className="px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold cursor-pointer disabled:opacity-50"
                      >
                        {tr('পর্যালোচনা শুরু', 'Mark In Review')}
                      </button>
                      <button
                        type="button"
                        disabled={savingId === row.id}
                        onClick={() => handleResolve(row, 'RESOLVED')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                      >
                        {tr('সমাধান চিহ্নিত করো', 'Mark Resolved')}
                      </button>
                      <button
                        type="button"
                        disabled={savingId === row.id}
                        onClick={() => handleResolve(row, 'DISMISSED')}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer disabled:opacity-50"
                      >
                        {tr('বাতিল করো', 'Dismiss')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
