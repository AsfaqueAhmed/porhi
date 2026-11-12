'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ExamRunnerClient } from '@/components/student/exam-runner-client';

export default function SubjectExamPage() {
  const params = useParams();
  const subjectId = (params?.subjectId as string) || 'sub_ssc_physics';

  return <ExamRunnerClient mode="subject" subjectId={subjectId} />;
}
