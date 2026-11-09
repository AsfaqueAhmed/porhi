'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Archive,
  BookOpen,
  CheckCircle2,
  Eye,
  Filter,
  Pencil,
  Plus,
  RotateCcw,
  Search,
} from 'lucide-react';
import type {
  AdminLessonItem,
  LessonStatusCounts,
  ListLessonsResponse,
} from '@pori/shared';
import { apiClient } from '@/lib/api-client';
import { formatAdminApiError } from '@/lib/admin-api-errors';
import { useAdminAuthStore, type AdminPortalRole } from '@/store/admin-auth-store';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { getContentStatusBadge } from '../content-status-badge';
import { LessonDetailDrawer } from './LessonDetailDrawer';

interface SubjectSummary {
  id: string;
  code: string;
  nameBangla: string;
}

interface ChapterSummary {
  id: string;
  titleBangla: string;
  topics: { id: string; titleBangla: string }[];
}

export interface LessonBankManagerProps {
  userRole?: AdminPortalRole;
  initialSubjectId?: string;
  initialTopicId?: string;
}

const EMPTY_COUNTS: LessonStatusCounts = {
  ALL: 0,
  DRAFT: 0,
  REVIEW: 0,
  CORRECTION: 0,
  PUBLISHED: 0,
  ARCHIVED: 0,
};

function formatLessonBankError(err: unknown): string {
  return formatAdminApiError(err, {
    unauthorized: 'সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।',
    forbidden: 'এই লেসন তালিকা বা কার্যক্রম পরিচালনার অনুমতি নেই।',
    serverError: 'লেসন তালিকা লোড বা আপডেট করতে সার্ভার ত্রুটি ঘটেছে।',
    unknown: 'অজানা নেটওয়ার্ক ত্রুটি ঘটেছে।',
  });
}

function truncateText(value: string, maxLength = 120): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
}

export function LessonBankManager({
  userRole,
  initialSubjectId,
  initialTopicId,
}: LessonBankManagerProps) {
  const storeRole = useAdminAuthStore((s) => s.adminUser?.role);
  const role = userRole ?? storeRole;
  const canEdit = role === 'ADMIN' || role === 'EDITOR';
  const isAdmin = role === 'ADMIN';

  const [subjects, setSubjects] = useState<SubjectSummary[]>([]);
  const [chapters, setChapters] = useState<ChapterSummary[]>([]);

  const [subjectId, setSubjectId] = useState(initialSubjectId || '');
  const [chapterId, setChapterId] = useState('');
  const [topicId, setTopicId] = useState(initialTopicId || '');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<AdminLessonItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [statusCounts, setStatusCounts] = useState<LessonStatusCounts>(EMPTY_COUNTS);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [detailItem, setDetailItem] = useState<AdminLessonItem | null>(null);
  const [confirmArchiveItem, setConfirmArchiveItem] = useState<AdminLessonItem | null>(null);
  const [isArchiving, setIsArchiving] = useState(false);

  const isMountedRef = useRef(true);
  const requestSeqRef = useRef(0);
  const topicIdRef = useRef(topicId);
  topicIdRef.current = topicId;
  const prevInitialSubjectRef = useRef(initialSubjectId);
  const prevInitialTopicRef = useRef(initialTopicId);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Sync incoming URL query param prop changes cleanly
  useEffect(() => {
    if (
      prevInitialSubjectRef.current === initialSubjectId &&
      prevInitialTopicRef.current === initialTopicId
    ) {
      return;
    }
    prevInitialSubjectRef.current = initialSubjectId;
    prevInitialTopicRef.current = initialTopicId;
    setSubjectId(initialSubjectId || '');
    setChapterId('');
    setTopicId(initialTopicId || '');
    setPage(1);
  }, [initialSubjectId, initialTopicId]);

  // Debounce search query and reset page ONLY when trimmed value changes
  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed === debouncedSearch) {
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedSearch(trimmed);
      setPage(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchInput, debouncedSearch]);

  // Load subjects once (non-fatal)
  useEffect(() => {
    let isMounted = true;
    async function loadSubjects() {
      try {
        const res = await apiClient.get<SubjectSummary[]>('/curriculum/subjects', {
          scope: 'admin',
        });
        if (isMounted && Array.isArray(res)) {
          setSubjects(res);
        }
      } catch {
        // Non-fatal: filter list stays empty
      }
    }
    loadSubjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Load chapters when subject filter changes and auto-select chapter matching active topicId
  useEffect(() => {
    let isMounted = true;
    setChapters((prev) => (prev.length === 0 ? prev : []));
    if (!subjectId) {
      return;
    }
    async function loadChapters() {
      try {
        const res = await apiClient.get<ChapterSummary[]>(
          `/curriculum/subjects/${subjectId}/chapters`,
          { scope: 'admin' },
        );
        if (!isMounted || !Array.isArray(res)) {
          return;
        }
        setChapters(res);
        const currentTopic = topicIdRef.current;
        if (currentTopic) {
          const matchingChapter = res.find((ch) =>
            (ch.topics || []).some((t) => t.id === currentTopic),
          );
          if (matchingChapter) {
            setChapterId(matchingChapter.id);
          }
        }
      } catch {
        if (isMounted) setChapters([]);
      }
    }
    loadChapters();
    return () => {
      isMounted = false;
    };
  }, [subjectId]);

  const availableTopics = useMemo(() => {
    if (!chapterId) return [];
    return chapters.find((c) => c.id === chapterId)?.topics ?? [];
  }, [chapters, chapterId]);

  const fetchLessons = useCallback(async () => {
    const requestId = ++requestSeqRef.current;
    setLoading(true);
    setErrorMessage(null);
    let willClampPage = false;
    try {
      const params = new URLSearchParams();
      if (subjectId) params.set('subjectId', subjectId);
      if (chapterId) params.set('chapterId', chapterId);
      if (topicId) params.set('topicId', topicId);
      if (statusFilter) params.set('status', statusFilter);
      if (debouncedSearch) params.set('search', debouncedSearch);
      params.set('page', String(page));
      params.set('limit', '20');

      const queryString = params.toString();
      const res = await apiClient.get<ListLessonsResponse>(
        `/admin/content/lessons?${queryString}`,
        { scope: 'admin' },
      );

      if (!isMountedRef.current || requestId !== requestSeqRef.current) {
        return;
      }

      const nextTotalPages = Math.max(1, res.totalPages ?? 1);
      if (page > nextTotalPages) {
        willClampPage = true;
        setPage(nextTotalPages);
        return;
      }

      setItems(Array.isArray(res.items) ? res.items : []);
      setTotal(res.total ?? 0);
      setTotalPages(nextTotalPages);
      setStatusCounts(res.statusCounts ?? EMPTY_COUNTS);
    } catch (err: unknown) {
      if (!isMountedRef.current || requestId !== requestSeqRef.current) {
        return;
      }
      setSuccessMessage(null);
      setErrorMessage(formatLessonBankError(err));
    } finally {
      if (!willClampPage && isMountedRef.current && requestId === requestSeqRef.current) {
        setLoading(false);
      }
    }
  }, [subjectId, chapterId, topicId, statusFilter, debouncedSearch, page]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // Close archive confirmation modal on Escape when idle
  useEffect(() => {
    if (!confirmArchiveItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isArchiving) {
        setConfirmArchiveItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [confirmArchiveItem, isArchiving]);

  const newLessonHref = useMemo(() => {
    const params = new URLSearchParams();
    if (subjectId) params.set('subjectId', subjectId);
    if (topicId) params.set('topicId', topicId);
    const qs = params.toString();
    return qs ? `/admin/curriculum/lessons/new?${qs}` : '/admin/curriculum/lessons/new';
  }, [subjectId, topicId]);

  const handleResetFilters = () => {
    setSuccessMessage(null);
    setSubjectId('');
    setChapterId('');
    setTopicId('');
    setStatusFilter('');
    setSearchInput('');
    setDebouncedSearch('');
    setPage(1);
  };

  const handleConfirmArchive = async () => {
    if (!confirmArchiveItem) return;
    const archivedId = confirmArchiveItem.id;
    setIsArchiving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await apiClient.post(
        `/admin/content/lessons/${archivedId}/archive`,
        undefined,
        { scope: 'admin' },
      );
      if (!isMountedRef.current) return;
      setConfirmArchiveItem(null);
      setDetailItem((curr) => (curr?.id === archivedId ? null : curr));
      setSuccessMessage('লেসনটি সফলভাবে আর্কাইভ করা হয়েছে।');
      await fetchLessons();
    } catch (err: unknown) {
      if (!isMountedRef.current) return;
      setErrorMessage(formatLessonBankError(err));
      setConfirmArchiveItem(null);
      setDetailItem((curr) => (curr?.id === archivedId ? null : curr));
    } finally {
      if (isMountedRef.current) {
        setIsArchiving(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>পাঠ্য লেসন ব্যাংক ও তালিকা</span>
          </h1>
          <p className="text-xs text-slate-500">
            কারিকুলামের সকল পাঠ্য লেসন, পরিভাষা ও গাণিতিক উদাহরণ খুঁজুন, ফিল্টার করুন ও হালনাগাদ করুন।
          </p>

          {/* Status Summary Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              সর্বমোট: {statusCounts.ALL}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Published: {statusCounts.PUBLISHED}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Review: {statusCounts.REVIEW}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
              Draft: {statusCounts.DRAFT}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              Correction: {statusCounts.CORRECTION}
            </span>
            {statusCounts.ARCHIVED > 0 && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 border border-slate-300">
                Archived: {statusCounts.ARCHIVED}
              </span>
            )}
          </div>
        </div>

        {canEdit && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href={newLessonHref}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ নতুন লেসন যোগ</span>
            </Link>
          </div>
        )}
      </div>

      {/* Feedback Alerts */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div
          role="alert"
          className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-3.5 rounded-xl"
        >
          {errorMessage}
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>ফিল্টার ও অনুসন্ধান</span>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-indigo-700 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>ফিল্টার রিসেট</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <select
            aria-label="বিষয় ফিল্টার"
            value={subjectId}
            onChange={(e) => {
              setSuccessMessage(null);
              setSubjectId(e.target.value);
              setChapterId('');
              setTopicId('');
              setPage(1);
            }}
            className="text-xs font-medium p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
          >
            <option value="">সব বিষয়</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.nameBangla}
              </option>
            ))}
          </select>

          <select
            aria-label="অধ্যায় ফিল্টার"
            value={chapterId}
            disabled={!subjectId}
            onChange={(e) => {
              setSuccessMessage(null);
              setChapterId(e.target.value);
              setTopicId('');
              setPage(1);
            }}
            className="text-xs font-medium p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 disabled:opacity-50"
          >
            <option value="">সব অধ্যায়</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.titleBangla}
              </option>
            ))}
          </select>

          <select
            aria-label="টপিক ফিল্টার"
            value={topicId}
            disabled={!chapterId}
            onChange={(e) => {
              setSuccessMessage(null);
              setTopicId(e.target.value);
              setPage(1);
            }}
            className="text-xs font-medium p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 disabled:opacity-50"
          >
            <option value="">সব টপিক</option>
            {availableTopics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titleBangla}
              </option>
            ))}
          </select>

          <select
            aria-label="অবস্থা ফিল্টার"
            value={statusFilter}
            onChange={(e) => {
              setSuccessMessage(null);
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="text-xs font-medium p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
          >
            <option value="">সক্রিয় সব</option>
            <option value="PUBLISHED">Published</option>
            <option value="REVIEW">Review</option>
            <option value="DRAFT">Draft</option>
            <option value="CORRECTION">Correction</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              aria-label="লেসনের শিরোনাম বা শিখনফল খুঁজুন"
              value={searchInput}
              onChange={(e) => {
                setSuccessMessage(null);
                setSearchInput(e.target.value);
              }}
              placeholder="লেসনের শিরোনাম বা শিখনফল খুঁজুন..."
              className="w-full text-xs pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3" aria-label="লেসন লোড হচ্ছে">
            {[1, 2, 3].map((row) => (
              <div key={row} className="h-14 rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <p className="text-xs font-semibold text-slate-500">
              নির্বাচিত ফিল্টারে কোনো লেসন পাওয়া যায়নি।
            </p>
            {canEdit && (
              <Link
                href={newLessonHref}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>নতুন লেসন যোগ করুন</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3">লেসন ও শিখনফল</th>
                  <th className="px-4 py-3">অবস্থান</th>
                  <th className="px-4 py-3">পরিভাষা</th>
                  <th className="px-4 py-3">অবস্থা ও ভার্সন</th>
                  <th className="px-4 py-3 text-right">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {items.map((lesson) => {
                  const statusMeta = getContentStatusBadge(lesson.status);
                  const showEdit = canEdit && lesson.status !== 'ARCHIVED';
                  const showArchive =
                    canEdit &&
                    lesson.status !== 'ARCHIVED' &&
                    (lesson.status !== 'PUBLISHED' || isAdmin);
                  const termCount = Array.isArray(lesson.importantTerms)
                    ? lesson.importantTerms.length
                    : 0;

                  return (
                    <tr key={lesson.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3.5 max-w-md space-y-1">
                        <button
                          type="button"
                          onClick={() => setDetailItem(lesson)}
                          aria-label={truncateText(lesson.titleBangla, 80)}
                          className="block text-left font-semibold text-slate-900 hover:text-indigo-700 leading-relaxed transition-colors cursor-pointer"
                        >
                          <LatexRenderer content={truncateText(lesson.titleBangla)} />
                        </button>
                        <div className="text-[11px] text-slate-500 leading-relaxed">
                          <LatexRenderer content={truncateText(lesson.learningGoal)} />
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-[11px] text-slate-600">
                        <div className="font-semibold text-slate-800">
                          {lesson.topic?.chapter?.subject?.nameBangla || 'অজানা বিষয়'}
                        </div>
                        <div className="text-slate-500">
                          {lesson.topic?.chapter?.titleBangla || ''} &gt;{' '}
                          {lesson.topic?.titleBangla || ''}
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {termCount}টি পরিভাষা
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex flex-col items-start gap-1">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusMeta.className}`}
                          >
                            {statusMeta.label}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            v{lesson.version}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <div className="inline-flex items-center justify-end gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() => setDetailItem(lesson)}
                            aria-label={`বিস্তারিত দেখুন — ${truncateText(lesson.titleBangla, 40)}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>বিস্তারিত দেখুন</span>
                          </button>
                          {showEdit && (
                            <Link
                              href={`/admin/curriculum/lessons/${lesson.id}/edit`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                            >
                              <Pencil className="w-3 h-3" />
                              <span>সম্পাদনা</span>
                            </Link>
                          )}
                          {showArchive && (
                            <button
                              type="button"
                              onClick={() => setConfirmArchiveItem(lesson)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                            >
                              <Archive className="w-3 h-3" />
                              <span>আর্কাইভ</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs text-slate-600">
          <span>
            মোট {total}টি লেসন • পাতা {page} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => {
                setSuccessMessage(null);
                setPage((p) => Math.max(1, p - 1));
              }}
              className="px-3 py-1 rounded-lg border border-slate-300 bg-white font-semibold disabled:opacity-50 hover:bg-slate-100"
            >
              আগের পাতা
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => {
                setSuccessMessage(null);
                setPage((p) => Math.min(totalPages, p + 1));
              }}
              className="px-3 py-1 rounded-lg border border-slate-300 bg-white font-semibold disabled:opacity-50 hover:bg-slate-100"
            >
              পরের পাতা
            </button>
          </div>
        </div>
      </div>

      <LessonDetailDrawer
        lesson={detailItem}
        isOpen={Boolean(detailItem)}
        onClose={() => setDetailItem(null)}
        closeOnEscape={!confirmArchiveItem}
        canEdit={canEdit}
        isAdmin={isAdmin}
        onRequestArchive={(l) => setConfirmArchiveItem(l)}
      />

      {/* Inline Archive Confirmation Modal */}
      {confirmArchiveItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lesson-archive-dialog-title"
          className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 id="lesson-archive-dialog-title" className="text-sm font-bold text-slate-900">
              লেসন আর্কাইভ নিশ্চিতকরণ
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              লেসনটি আর্কাইভ করলে শিক্ষার্থীদের জন্য আর প্রদর্শিত হবে না, তবে বিষয়বস্তুর ইতিহাস ও সংস্করণ সংরক্ষিত থাকবে।
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isArchiving}
                onClick={() => setConfirmArchiveItem(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50"
              >
                বাতিল
              </button>
              <button
                type="button"
                disabled={isArchiving}
                onClick={handleConfirmArchive}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50"
              >
                {isArchiving ? 'আর্কাইভ হচ্ছে...' : 'আর্কাইভ নিশ্চিত করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
