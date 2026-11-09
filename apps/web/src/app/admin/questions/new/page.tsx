'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AuthoringStudio } from '../../../../components/admin/authoring-studio';

function resolveContentType(rawType: string | null): 'MCQ' | 'LESSON' | 'CQ' {
  const normalized = rawType?.trim().toLowerCase();
  if (normalized === 'lesson') {
    return 'LESSON';
  }
  if (normalized === 'cq' || normalized === 'cq_creative') {
    return 'CQ';
  }
  return 'MCQ';
}

function NewQuestionPageContent() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId') || undefined;
  const subjectId = searchParams.get('subjectId') || undefined;
  const contentType = resolveContentType(searchParams.get('type'));

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
