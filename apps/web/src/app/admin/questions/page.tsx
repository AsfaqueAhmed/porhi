'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthoringStudio } from '../../../components/admin/authoring-studio';

function QuestionsPageContent() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId') || undefined;
  const subjectId = searchParams.get('subjectId') || undefined;
  const rawType = searchParams.get('type')?.toUpperCase();
  const contentType =
    rawType === 'LESSON' ? 'LESSON' : rawType === 'CQ' ? 'CQ' : 'MCQ';

  return (
    <div className="space-y-6">
      <AuthoringStudio
        initialTopicId={topicId}
        initialSubjectId={subjectId}
        initialContentType={contentType}
      />
    </div>
  );
}

export default function AdminQuestionsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">
          প্রশ্ন ও লেসন স্টুডিও লোড হচ্ছে...
        </div>
      }
    >
      <QuestionsPageContent />
    </Suspense>
  );
}
