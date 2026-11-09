'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { AdminLessonItem } from '@pori/shared';
import { LessonAuthoringStudio } from '@/components/admin/lessons/LessonAuthoringStudio';
import { apiClient, ApiError } from '@/lib/api-client';
import { formatAdminApiError } from '@/lib/admin-api-errors';

function formatLessonLoadError(err: unknown): string {
  return formatAdminApiError(err, {
    unauthorized: 'সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।',
    forbidden: 'এই লেসনটি দেখার বা সম্পাদনা করার অনুমতি নেই।',
    serverError: 'লেসনটি লোড করতে সার্ভার ত্রুটি ঘটেছে।',
    unknown: 'লেসনটি লোড করতে ব্যর্থ হয়েছে।',
  });
}

export default function AdminEditLessonPage() {
  const params = useParams<{ id: string | string[] }>();
  const rawId = params?.id;
  const lessonId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [lesson, setLesson] = useState<AdminLessonItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadLesson() {
      if (!lessonId) {
        if (isMounted) {
          setNotFound(true);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setNotFound(false);
      setErrorMessage(null);

      try {
        const res = await apiClient.get<AdminLessonItem>(
          `/admin/content/lessons/${encodeURIComponent(lessonId)}`,
          { scope: 'admin' },
        );
        if (isMounted) {
          setLesson(res);
        }
      } catch (err: unknown) {
        if (!isMounted) {
          return;
        }
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        } else {
          setErrorMessage(formatLessonLoadError(err));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLesson();
    return () => {
      isMounted = false;
    };
  }, [lessonId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/curriculum/lessons"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors"
        >
          ← লেসন তালিকায় ফিরুন
        </Link>
      </div>

      {loading && (
        <div
          aria-label="লেসন লোড হচ্ছে"
          className="bg-white rounded-2xl border border-slate-200 p-8 space-y-4 shadow-xs"
        >
          <div className="h-6 w-1/3 bg-slate-100 rounded-lg animate-pulse" />
          <div className="h-24 bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-32 bg-slate-100 rounded-xl animate-pulse" />
        </div>
      )}

      {!loading && notFound && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-4 shadow-xs">
          <h1 className="text-base font-bold text-slate-900">লেসনটি পাওয়া যায়নি</h1>
          <p className="text-xs text-slate-500">
            নির্বাচিত লেসন আইডিটি বিদ্যমান নেই অথবা সরানো হয়েছে।
          </p>
          <div>
            <Link
              href="/admin/curriculum/lessons"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
            >
              লেসন তালিকায় ফিরুন
            </Link>
          </div>
        </div>
      )}

      {!loading && errorMessage && (
        <div
          role="alert"
          className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-4 rounded-xl flex items-center justify-between gap-3"
        >
          <span>{errorMessage}</span>
          <Link
            href="/admin/curriculum/lessons"
            className="underline text-rose-900 hover:text-rose-700 shrink-0"
          >
            লেসন তালিকায় ফিরুন
          </Link>
        </div>
      )}

      {!loading && !notFound && !errorMessage && lesson && (
        <LessonAuthoringStudio
          mode="edit"
          initialLesson={lesson}
          onLessonUpdated={setLesson}
        />
      )}
    </div>
  );
}
