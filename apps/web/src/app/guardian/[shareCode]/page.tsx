'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { GuardianAudience, GuardianReportDTO } from '@pori/shared';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  GraduationCap,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { toBanglaDigits } from '@/lib/formatters';

export default function GuardianReportPage() {
  const params = useParams();
  const shareCode = (params?.shareCode as string) || '';

  const [report, setReport] = useState<GuardianReportDTO | null>(null);
  const [lens, setLens] = useState<GuardianAudience>('PARENT');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await apiClient.get<GuardianReportDTO>(
          `/guardian/report/${encodeURIComponent(shareCode)}`,
        );
        if (!active) return;
        setReport(res);
        setLens(res.audience || 'PARENT');
      } catch (err: any) {
        if (active) {
          setError(err?.message || 'এই অগ্রগতি রিপোর্টটি পাওয়া যায়নি বা বাতিল করা হয়েছে।');
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [shareCode]);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="h-64 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-900" />
      </main>
    );
  }

  if (error || !report) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 dark:border-rose-900 dark:bg-rose-950/30">
          <AlertTriangle className="mx-auto h-10 w-10 text-rose-600" />
          <h1 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
            অগ্রগতি রিপোর্ট পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {error || 'শেয়ার লিংকটি মেয়াদোত্তীর্ণ বা বাতিল করা হয়ে থাকতে পারে।'}
          </p>
          <Link
            href="/dashboard"
            className="mt-5 inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
          >
            হোম পেজে ফিরুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6">
      {/* Header Banner */}
      <header className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-6 shadow-sm dark:border-indigo-900 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
              <Shield className="h-3.5 w-3.5" />
              রিড-অনলি অগ্রগতি রিপোর্ট
              {report.recipientLabel ? ` · প্রাপক: ${report.recipientLabel}` : ''}
            </span>
            <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              {report.student.displayName} ({report.student.selectedClass})
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              অভিভাবক ও শিক্ষকের জন্য শিক্ষার্থীর নিয়মিত অধ্যয়ন এবং বিষয়ভিত্তিক দক্ষতার সারসংক্ষেপ
            </p>
          </div>

          <div className="flex rounded-xl bg-white p-1 border border-slate-200 shadow-xs dark:bg-slate-800 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setLens('PARENT')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                lens === 'PARENT'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              অভিভাবক ভিউ
            </button>
            <button
              type="button"
              onClick={() => setLens('TEACHER')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                lens === 'TEACHER'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              শিক্ষক ভিউ
            </button>
          </div>
        </div>
      </header>

      {/* Summary KPI Row */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
            <Flame className="h-4 w-4" />
            <span>ধারাবাহিক স্ট্রিক</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {toBanglaDigits(report.summary.streakDays)} দিন
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <Clock className="h-4 w-4" />
            <span>সাপ্তাহিক পড়াশোনা</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {toBanglaDigits(report.summary.weeklyStudyMinutes)} মি.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <BookOpen className="h-4 w-4" />
            <span>সম্পন্ন লেসন</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {toBanglaDigits(report.summary.completedLessons)}টি
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600">
            <TrendingUp className="h-4 w-4" />
            <span>গড় নির্ভুলতা</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {toBanglaDigits(report.summary.averageExamAccuracy)}%
          </p>
        </div>
      </section>

      {lens === 'PARENT' ? (
        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs dark:border-emerald-900 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              সাপ্তাহিক অধ্যয়ন নিয়মিততা
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              গত ৭ দিনে নির্ধারিত {toBanglaDigits(report.summary.weeklyTotalTasks)}টি পরিকল্পিত কাজের মধ্যে{' '}
              <strong>{toBanglaDigits(report.summary.weeklyCompletedTasks)}টি</strong> সম্পন্ন হয়েছে এবং মোট{' '}
              <strong>{toBanglaDigits(report.summary.totalExamsTaken)}টি</strong> মডেল টেস্ট ও{' '}
              <strong>{toBanglaDigits(report.summary.totalRehearsalsCompleted)}টি</strong> বহু-পত্র রিহার্সাল দিয়েছে।
            </p>
            <div className="mt-4 rounded-xl bg-emerald-50 p-3.5 text-xs text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
              <strong>অভিভাবকের জন্য পরামর্শ:</strong>{' '}
              {report.summary.dueRevisionCount > 0
                ? `বর্তমানে ${toBanglaDigits(report.summary.dueRevisionCount)}টি ভুল প্রশ্নের পুনরাবৃত্তি বাকি আছে — প্রতিদিন অন্তত ১৫ মিনিট রিভিশনে উৎসাহিত করুন।`
                : 'অধ্যয়নের ধারাবাহিকতা চমৎকার! নিয়মিত রুটিন বজায় রাখতে পাশে থাকুন।'}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              সাম্প্রতিক পরীক্ষার ফলাফল
            </h2>
            {report.recentExams.length === 0 ? (
              <p className="mt-3 text-xs text-slate-500">এখনো কোনো টাইমড পরীক্ষা সম্পন্ন হয়নি।</p>
            ) : (
              <div className="mt-3 space-y-2.5">
                {report.recentExams.slice(0, 5).map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs dark:bg-slate-800/50"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {ex.subjectNameBangla}
                      </p>
                      <p className="text-slate-500">{ex.submittedAt.slice(0, 10)}</p>
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-200">
                      {ex.score} / {ex.totalMarks} ({ex.accuracy}%)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              অধ্যায়ভিত্তিক দক্ষতা (Chapter Mastery)
            </h2>
            {report.chapterMastery.length === 0 ? (
              <p className="mt-3 text-xs text-slate-500">এখনো যথেষ্ট অনুশীলন ডেটা তৈরি হয়নি।</p>
            ) : (
              <div className="mt-4 space-y-3">
                {report.chapterMastery.map((ch) => (
                  <div key={ch.chapterId} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {ch.titleBangla}
                      </span>
                      <span className="font-bold text-indigo-600">
                        {ch.accuracy}% ({ch.questionsAttempted} প্রশ্ন)
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${
                          ch.accuracy >= 70
                            ? 'bg-emerald-500'
                            : ch.accuracy >= 50
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(100, ch.accuracy)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-rose-200 bg-white p-5 shadow-xs dark:border-rose-900 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              দুর্বল টপিক ও মনোযোগের ক্ষেত্র (Weak Topics)
            </h2>
            {report.weakTopics.length === 0 ? (
              <p className="mt-3 text-xs text-emerald-600 font-semibold">
                এই মুহূর্তে উল্লেখযোগ্য কোনো দুর্বল টপিক চিহ্নিত হয়নি।
              </p>
            ) : (
              <div className="mt-3 space-y-2.5">
                {report.weakTopics.map((wt) => (
                  <div
                    key={wt.topicId}
                    className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/50 px-3.5 py-2.5 text-xs dark:border-rose-900/40 dark:bg-rose-950/20"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{wt.titleBangla}</p>
                      <p className="text-slate-500">{wt.chapterTitleBangla}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-rose-600">{wt.accuracy}%</span>
                      <p className="text-[11px] text-slate-500">{wt.attempts} প্রচেষ্টা</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
