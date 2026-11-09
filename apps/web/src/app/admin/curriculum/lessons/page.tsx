'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LessonBankManager } from '@/components/admin/lessons/LessonBankManager';

function LessonsPageContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId') || undefined;
  const topicId = searchParams.get('topicId') || undefined;

  return (
    <div className="space-y-6">
      <LessonBankManager initialSubjectId={subjectId} initialTopicId={topicId} />
    </div>
  );
}

export default function AdminLessonsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">
          পাঠ্য লেসন ব্যাংক লোড হচ্ছে...
        </div>
      }
    >
      <LessonsPageContent />
    </Suspense>
  );
}
