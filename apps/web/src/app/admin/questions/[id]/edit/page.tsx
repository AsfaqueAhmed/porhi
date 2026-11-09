'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { AdminQuestionItem } from '@pori/shared';
import { AuthoringStudio } from '../../../../../components/admin/authoring-studio';
import { apiClient, ApiError } from '@/lib/api-client';
import { formatAdminApiError } from '@/lib/admin-api-errors';

function formatQuestionLoadError(err: unknown): string {
  return formatAdminApiError(err, {
    unauthorized: 'সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।',
    forbidden: 'এই প্রশ্নটি দেখার বা সম্পাদনা করার অনুমতি নেই।',
    serverError: 'প্রশ্নটি লোড করতে সার্ভার ত্রুটি ঘটেছে।',
    unknown: 'প্রশ্নটি লোড করতে ব্যর্থ হয়েছে।',
  });
}

export default function AdminEditQuestionPage() {
  const params = useParams<{ id: string | string[] }>();
  const rawId = params?.id;
  const questionId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [question, setQuestion] = useState<AdminQuestionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadQuestion() {
      if (!questionId) {
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
        const res = await apiClient.get<AdminQuestionItem>(
          `/admin/content/questions/${encodeURIComponent(questionId)}`,
          { scope: 'admin' },
        );
        if (isMounted) {
          setQuestion(res);
        }
      } catch (err: unknown) {
        if (!isMounted) {
          return;
        }
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        } else {
          setErrorMessage(formatQuestionLoadError(err));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadQuestion();
    return () => {
      isMounted = false;
    };
  }, [questionId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/questions"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors"
        >
          ← প্রশ্ন তালিকায় ফিরুন
        </Link>
      </div>

      {loading && (
        <div
          aria-label="প্রশ্ন লোড হচ্ছে"
          className="bg-white rounded-2xl border border-slate-200 p-8 space-y-4 shadow-xs"
        >
          <div className="h-6 w-1/3 bg-slate-100 rounded-lg animate-pulse" />
          <div className="h-24 bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-32 bg-slate-100 rounded-xl animate-pulse" />
        </div>
      )}

      {!loading && notFound && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-4 shadow-xs">
          <h1 className="text-base font-bold text-slate-900">প্রশ্নটি পাওয়া যায়নি</h1>
          <p className="text-xs text-slate-500">
            নির্বাচিত প্রশ্ন আইডিটি বিদ্যমান নেই অথবা সরানো হয়েছে।
          </p>
          <div>
            <Link
              href="/admin/questions"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
            >
              প্রশ্ন তালিকায় ফিরুন
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
            href="/admin/questions"
            className="underline text-rose-900 hover:text-rose-700 shrink-0"
          >
            প্রশ্ন তালিকায় ফিরুন
          </Link>
        </div>
      )}

      {!loading && !notFound && !errorMessage && question && (
        <AuthoringStudio
          mode="edit"
          initialQuestion={question}
          onQuestionUpdated={setQuestion}
        />
      )}
    </div>
  );
}
