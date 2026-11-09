'use client';

import React, { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthoringStudio } from '../../../../components/admin/authoring-studio';

function resolveQuestionType(rawType: string | null): 'MCQ' | 'CQ' {
  const normalized = rawType?.trim().toLowerCase();
  if (normalized === 'cq' || normalized === 'cq_creative') {
    return 'CQ';
  }
  return 'MCQ';
}

function NewQuestionPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId') || undefined;
  const subjectId = searchParams.get('subjectId') || undefined;
  const rawType = searchParams.get('type');
  const normalizedType = rawType?.trim().toLowerCase();
  const isLessonRedirect = normalizedType === 'lesson';

  useEffect(() => {
    if (!isLessonRedirect) {
      return;
    }
    const params = new URLSearchParams();
    if (topicId) params.set('topicId', topicId);
    if (subjectId) params.set('subjectId', subjectId);
    const qs = params.toString();
    router.replace(qs ? `/admin/curriculum/lessons/new?${qs}` : '/admin/curriculum/lessons/new');
  }, [isLessonRedirect, router, subjectId, topicId]);

  if (isLessonRedirect) {
    return (
      <div className="p-8 text-center text-xs text-slate-400">
        পাঠ্য লেসন স্টুডিওতে রিডাইরেক্ট করা হচ্ছে...
      </div>
    );
  }

  const contentType = resolveQuestionType(rawType);
  const backHref =
    normalizedType === 'mcq'
      ? '/admin/questions/mcq'
      : normalizedType === 'cq' || normalizedType === 'cq_creative'
        ? '/admin/questions/cq'
        : '/admin/questions';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors"
        >
          ← প্রশ্ন তালিকায় ফিরুন
        </Link>
      </div>

      <AuthoringStudio
        mode="create"
        initialTopicId={topicId}
        initialSubjectId={subjectId}
        initialContentType={contentType}
      />
    </div>
  );
}

export default function AdminNewQuestionPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">
          অথরিং স্টুডিও লোড হচ্ছে...
        </div>
      }
    >
      <NewQuestionPageContent />
    </Suspense>
  );
}
