'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ModelTestManager } from '../../../components/admin/model-test-manager';

function ModelTestsContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId') || undefined;
  const chapterId = searchParams.get('chapterId') || undefined;

  return (
    <div className="space-y-6">
      <ModelTestManager
        initialSubjectId={subjectId}
        initialChapterId={chapterId}
      />
    </div>
  );
}

export default function AdminModelTestsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">
          মডেল টেস্ট ম্যানেজার লোড হচ্ছে...
        </div>
      }
    >
      <ModelTestsContent />
    </Suspense>
  );
}
