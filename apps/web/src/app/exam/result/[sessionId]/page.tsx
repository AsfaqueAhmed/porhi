'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { ExamPageSkeleton } from '@/components/ui/shimmer';
import { DEFAULT_CHAPTERS } from '@/lib/curriculum-data';
import { useLanguageStore } from '@/store/language-store';
import {
  ExamResultView,
  ExamResultData,
  ExamResultAnswerItem,
} from '@/components/student/exam-result-view';

interface SessionApiResponse {
  sessionId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | string;
  testType?: string;
  subjectId?: string;
  chapterId?: string;
  score?: number;
  totalQuestions?: number;
  correctCount?: number;
  wrongCount?: number;
  skippedCount?: number;
  durationSeconds?: number;
  negativeRatio?: number;
  negativeDeduction?: number;
  percentile?: number | null;
  answersWithExplanation?: ExamResultAnswerItem[];
}

export default function ExamResultPage() {
  const params = useParams();
  const sessionId = (params?.sessionId as string) || '';
  const { tr } = useLanguageStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inProgressChapterId, setInProgressChapterId] = useState<string | null>(null);
  const [resultData, setResultData] = useState<ExamResultData | null>(null);

  useEffect(() => {
    let active = true;
    async function loadSession() {
      if (!sessionId) {
        setError(tr('সেশন আইডি পাওয়া যায়নি।', 'Session ID not found.'));
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const res = await apiClient.get<SessionApiResponse>(`/exam/session/${sessionId}`);
        if (!active) return;

        if (res.status === 'IN_PROGRESS') {
          setInProgressChapterId(res.chapterId || 'chap_ssc_physics_ch2');
          setIsLoading(false);
          return;
        }

        const cId = res.chapterId || 'chap_ssc_physics_ch2';
        const resolvedChapter = DEFAULT_CHAPTERS.find((c) => c.id === cId);
        setResultData({
          sessionId: res.sessionId,
          chapterId: cId,
          chapterTitle: resolvedChapter?.titleBangla || 'মডেল টেস্ট',
          score: res.score ?? 0,
          totalQuestions: res.totalQuestions ?? res.answersWithExplanation?.length ?? 0,
          correctCount: res.correctCount ?? 0,
          wrongCount: res.wrongCount ?? 0,
          skippedCount: res.skippedCount ?? 0,
          durationSeconds: res.durationSeconds,
          negativeRatio: res.negativeRatio ?? 0,
          negativeDeduction: res.negativeDeduction ?? 0,
          percentile: res.percentile ?? null,
          answersWithExplanation: res.answersWithExplanation || [],
        });
      } catch {
        if (active) {
          setError(tr('পরীক্ষার ফলাফল লোড করা যায়নি।', 'Could not load exam result.'));
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }
    loadSession();
    return () => {
      active = false;
    };
  }, [sessionId, tr]);

  if (isLoading) {
    return <ExamPageSkeleton />;
  }

  if (inProgressChapterId) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
        <h1 className="text-lg font-bold text-slate-900">
          {tr('এই পরীক্ষাটি এখনো চলমান আছে', 'This exam session is still in progress')}
        </h1>
        <p className="text-sm text-slate-500">
          {tr(
            'অসম্পূর্ণ পরীক্ষাটি সম্পূর্ণ করে ফলাফল দেখতে নিচের বাটনে ক্লিক করো।',
            'Click below to resume and submit your in-progress exam.'
          )}
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href={`/exam/${inProgressChapterId}`}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold"
          >
            {tr('পরীক্ষা পুনরায় শুরু করো', 'Resume Exam')}
          </Link>
        </div>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h1 className="text-lg font-bold text-slate-900">
          {error || tr('ফলাফল পাওয়া যায়নি।', 'Result not found.')}
        </h1>
        <Link
          href="/progress"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tr('অগ্রগতি ড্যাশবোর্ডে ফিরে যাও', 'Back to Progress')}</span>
        </Link>
      </div>
    );
  }

  return <ExamResultView result={resultData} />;
}
