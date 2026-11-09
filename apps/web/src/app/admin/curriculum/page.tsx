'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CurriculumManager } from '../../../components/admin/curriculum-manager';

function CurriculumPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId') || undefined;

  const handleNavigateToAuthoring = (
    topicId: string,
    subId: string,
    type: 'MCQ' | 'LESSON'
  ) => {
    router.push(
      `/admin/questions/new?topicId=${encodeURIComponent(topicId)}&subjectId=${encodeURIComponent(
        subId
      )}&type=${type.toLowerCase()}`
    );
  };

  const handleNavigateToModelTest = (chapterId: string, subId: string) => {
    router.push(
      `/admin/model-tests?chapterId=${encodeURIComponent(chapterId)}&subjectId=${encodeURIComponent(
        subId
      )}`
    );
  };

  return (
    <div className="space-y-6">
      <CurriculumManager
        initialSubjectId={subjectId}
        onNavigateToAuthoring={handleNavigateToAuthoring}
        onNavigateToModelTest={handleNavigateToModelTest}
      />
    </div>
  );
}

export default function AdminCurriculumPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">
          কারিকুলাম এক্সপ্লোরার লোড হচ্ছে...
        </div>
      }
    >
      <CurriculumPageContent />
    </Suspense>
  );
}
