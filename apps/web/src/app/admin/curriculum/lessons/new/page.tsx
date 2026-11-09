'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LessonAuthoringStudio } from '@/components/admin/lessons/LessonAuthoringStudio';

function NewLessonPageContent() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId') || undefined;
  const subjectId = searchParams.get('subjectId') || undefined;

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

      <LessonAuthoringStudio
        mode="create"
        initialTopicId={topicId}
        initialSubjectId={subjectId}
      />
    </div>
  );
}

export default function AdminNewLessonPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">
          লেসন স্টুডিও লোড হচ্ছে...
        </div>
      }
    >
      <NewLessonPageContent />
    </Suspense>
  );
}
