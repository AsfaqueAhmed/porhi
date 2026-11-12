'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  AlertOctagon,
  BookOpen,
  RotateCcw,
  Layers,
  Trophy,
  CheckCircle2,
} from 'lucide-react';
import { useUserStore, ServerOverviewPayload } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import { toBanglaDigits } from '@/lib/formatters';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { DEFAULT_CHAPTERS, findTopicHierarchy } from '@/lib/curriculum-data';
import { apiClient } from '@/lib/api-client';
import { ensureGuestSession } from '@/lib/guest-session';

export default function ProgressPage() {
  const {
    activeSubject,
    completedTopics,
    topicMastery,
    savedMistakes,
    examHistory,
    resolveMistake,
    hydrateFromServerOverview,
  } = useUserStore();
  const { tr, language } = useLanguageStore();
  const subjectName = activeSubject?.nameBangla || 'পদার্থবিজ্ঞান';
  const subjectId = activeSubject?.id || 'sub_ssc_physics';

  const [mistakeTab, setMistakeTab] = useState<'UNRESOLVED' | 'RESOLVED'>('UNRESOLVED');

  useEffect(() => {
    async function loadServerProgress() {
      try {
        await ensureGuestSession().catch(() => {});
        const res = await apiClient.get<ServerOverviewPayload>(
          `/student/overview?subjectId=${encodeURIComponent(subjectId)}`
        );
        if (res) {
          hydrateFromServerOverview(res);
        }
      } catch {
        // Offline / local fallback
      }
    }
    loadServerProgress();
  }, [subjectId, hydrateFromServerOverview]);

  const totalTopics = useMemo(
    () => DEFAULT_CHAPTERS.reduce((sum, ch) => sum + ch.topics.length, 0),
    []
  );
  const completedCount = completedTopics.length;
  const coveragePct =
    totalTopics > 0 ? Math.min(100, Math.round((completedCount / totalTopics) * 100)) : 0;

  const { totalAttempted, totalCorrect, averageAccuracyPct } = useMemo(() => {
    let attempted = 0;
    let correct = 0;
    for (const stats of Object.values(topicMastery)) {
      attempted += stats.attempted || 0;
      correct += stats.correct || 0;
    }
    const pct = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return { totalAttempted: attempted, totalCorrect: correct, averageAccuracyPct: pct };
  }, [topicMastery]);

  const latestExam = examHistory[0] || null;
  const totalSessionsCount = examHistory.length + Object.keys(topicMastery).length;

  // Chapter Mastery Matrix
  const chapterMatrix = useMemo(() => {
    return DEFAULT_CHAPTERS.map((ch) => {
      const chTopicIds = ch.topics.map((t) => t.id);
      const completedInCh = chTopicIds.filter((id) => completedTopics.includes(id)).length;
      let chAttempted = 0;
      let chCorrect = 0;
      for (const id of chTopicIds) {
        const st = topicMastery[id];
        if (st) {
          chAttempted += st.attempted;
          chCorrect += st.correct;
        }
      }
      const accuracy = chAttempted > 0 ? Math.round((chCorrect / chAttempted) * 100) : 0;
      const completionPct =
        ch.topics.length > 0 ? Math.round((completedInCh / ch.topics.length) * 100) : 0;

      return {
        id: ch.id,
        orderIndex: ch.orderIndex,
        titleBangla: ch.titleBangla,
        totalTopics: ch.topics.length,
        completedInCh,
        completionPct,
        chAttempted,
        accuracy,
      };
    });
  }, [completedTopics, topicMastery]);

  // Dynamic Weak Topics Report
  const weakTopics = useMemo(() => {
    const list: Array<{
      id: string;
      chapterId: string;
      chapterName: string;
      topicTitle: string;
      accuracy: number;
      mistakeCount: number;
      lessonHref: string;
      practiceHref: string;
    }> = [];

    for (const [tId, stats] of Object.entries(topicMastery)) {
      if (stats.attempted === 0) continue;
      const acc = Math.round((stats.correct / stats.attempted) * 100);
      const mistakesForTopic = savedMistakes.filter(
        (m) => m.topicId === tId && !m.resolved
      ).length;
      if (acc < 60 || mistakesForTopic > 0) {
        const h = findTopicHierarchy(tId);
        list.push({
          id: tId,
          chapterId: h.chapterId,
          chapterName: h.chapterTitle,
          topicTitle: h.topicTitle,
          accuracy: acc,
          mistakeCount: Math.max(mistakesForTopic, stats.attempted - stats.correct),
          lessonHref: `/lesson/${tId}`,
          practiceHref: `/practice/${h.chapterId}?topicId=${encodeURIComponent(tId)}`,
        });
      }
    }

    return list.sort((a, b) => a.accuracy - b.accuracy).slice(0, 6);
  }, [topicMastery, savedMistakes]);

  const displayedMistakes = useMemo(() => {
    return savedMistakes.filter((m) =>
      mistakeTab === 'UNRESOLVED' ? !m.resolved : m.resolved
    );
  }, [savedMistakes, mistakeTab]);

  const handleResolveMistake = async (questionId: string) => {
    resolveMistake(questionId);
    try {
      await apiClient.post(`/student/mistakes/${encodeURIComponent(questionId)}/resolve`, {});
    } catch {
      // Local store already updated
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
          {tr('ব্যক্তিগত অ্যানালিটিক্স', 'Personal Analytics')}
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
          {tr('অগ্রগতি ও দুর্বলতা রিপোর্ট', 'Progress & Weakness Report')}
        </h1>
        <p className="text-sm text-slate-600">
          {subjectName}{' '}
          {tr(
            'বিষয়ে তোমার বর্তমান দক্ষতা, বারবার ভুল হওয়া টপিক এবং সিলেবাস কভারেজ।',
            'curriculum mastery, frequent mistake topics, and syllabus coverage.'
          )}
        </p>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500">
            {tr('সিলেবাস কভারেজ', 'Syllabus Coverage')}
          </div>
          <div className="text-2xl font-black text-slate-900">
            {language === 'bn' ? `${toBanglaDigits(coveragePct)}%` : `${coveragePct}%`}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${coveragePct}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 pt-1">
            {language === 'bn'
              ? `${toBanglaDigits(totalTopics)}টির মধ্যে ${toBanglaDigits(completedCount)}টি টপিক সম্পন্ন`
              : `${completedCount} of ${totalTopics} topics completed`}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500">
            {tr('গড় নির্ভুলতা (Accuracy)', 'Average Accuracy')}
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {language === 'bn'
              ? `${toBanglaDigits(averageAccuracyPct)}%`
              : `${averageAccuracyPct}%`}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${averageAccuracyPct}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 pt-1">
            {language === 'bn'
              ? `মোট ${toBanglaDigits(totalAttempted)}টি প্রশ্নের মধ্যে ${toBanglaDigits(totalCorrect)}টি সঠিক`
              : `${totalCorrect} of ${totalAttempted} questions correct`}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500">
            {tr('অনুশীলন ও মডেল টেস্ট', 'Practice & Model Tests')}
          </div>
          <div className="text-2xl font-black text-amber-600">
            {language === 'bn'
              ? `${toBanglaDigits(totalSessionsCount)}টি সেশন`
              : `${totalSessionsCount} sessions`}
          </div>
          <div className="text-xs text-slate-600 pt-3">
            {latestExam ? (
              <>
                {tr('সর্বশেষ মডেল টেস্ট স্কোর: ', 'Latest Model Test Score: ')}
                <span className="font-bold text-slate-900">
                  {language === 'bn'
                    ? `${toBanglaDigits(latestExam.score)}/${toBanglaDigits(latestExam.totalQuestions)}`
                    : `${latestExam.score}/${latestExam.totalQuestions}`}
                </span>
              </>
            ) : (
              <span>{tr('এখনো কোনো মডেল টেস্ট দেওয়া হয়নি', 'No model test taken yet')}</span>
            )}
          </div>
        </div>
      </div>

      {/* Chapter Mastery Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>{tr('অধ্যায়ভিত্তিক দক্ষতা ম্যাট্রিক্স', 'Chapter Mastery Matrix')}</span>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {language === 'bn'
              ? `${toBanglaDigits(chapterMatrix.length)}টি অধ্যায়`
              : `${chapterMatrix.length} Chapters`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {chapterMatrix.map((ch) => (
            <div
              key={ch.id}
              className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between gap-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-800 block truncate">
                    {ch.titleBangla}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {language === 'bn'
                      ? `${toBanglaDigits(ch.completedInCh)}/${toBanglaDigits(ch.totalTopics)} টপিক সম্পন্ন • নির্ভুলতা: ${toBanglaDigits(ch.accuracy)}%`
                      : `${ch.completedInCh}/${ch.totalTopics} topics • Accuracy: ${ch.accuracy}%`}
                  </span>
                </div>
                <Link
                  href={`/practice/${ch.id}`}
                  className="text-[11px] font-bold text-indigo-600 hover:underline shrink-0"
                >
                  {tr('অনুশীলন →', 'Practice →')}
                </Link>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all"
                  style={{ width: `${ch.completionPct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak Topics Section */}
      <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 text-rose-600 font-bold text-lg border-b border-rose-50 pb-3">
          <TrendingDown className="w-5 h-5 text-rose-500" />
          <span>
            {tr(
              'দুর্বল টপিক রিপোর্ট (অতিরিক্ত অনুশীলন প্রয়োজন)',
              'Weak Topics Report (Extra Practice Needed)'
            )}
          </span>
        </div>

        {weakTopics.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
            <span>
              {tr(
                'বর্তমানে কোনো দুর্বল টপিক শনাক্ত হয়নি! নিয়মিত অনুশীলন চালিয়ে যাও।',
                'No weak topics detected yet! Keep practicing regularly.'
              )}
            </span>
            <Link
              href={`/curriculum/${subjectId}`}
              className="font-bold text-indigo-700 hover:underline shrink-0"
            >
              {tr('কারিকুলাম দেখো →', 'View Curriculum →')}
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {weakTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    {topic.chapterName}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{topic.topicTitle}</h3>
                  <div className="text-xs text-slate-600 flex items-center gap-3">
                    <span>
                      {tr('নির্ভুলতা: ', 'Accuracy: ')}
                      <strong className="text-rose-600">
                        {language === 'bn' ? toBanglaDigits(topic.accuracy) : topic.accuracy}%
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      {tr('ভুল হয়েছে: ', 'Mistakes: ')}
                      <strong>
                        {language === 'bn'
                          ? toBanglaDigits(topic.mistakeCount)
                          : topic.mistakeCount}{' '}
                        {tr('টি প্রশ্ন', ' questions')}
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={topic.lessonHref}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{tr('লেসন পড়ো', 'Read Lesson')}</span>
                  </Link>
                  <Link
                    href={topic.practiceHref}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{tr('অনুশীলন করো', 'Practice Now')}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Exam History */}
      {examHistory.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>{tr('সাম্প্রতিক মডেল টেস্ট হিস্ট্রি', 'Recent Model Test History')}</span>
          </div>
          <div className="space-y-2.5">
            {examHistory.map((ex) => (
              <div
                key={ex.examSessionId}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{ex.chapterTitle}</span>
                  <span className="text-slate-500">
                    {language === 'bn'
                      ? `স্কোর: ${toBanglaDigits(ex.score)}/${toBanglaDigits(ex.totalQuestions)} (${toBanglaDigits(ex.accuracyPercent)}%)`
                      : `Score: ${ex.score}/${ex.totalQuestions} (${ex.accuracyPercent}%)`}
                  </span>
                </div>
                <Link
                  href={`/exam/${ex.chapterId}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-indigo-600 hover:bg-indigo-50"
                >
                  {tr('আবার দাও', 'Retake')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mistake Notebook (ভুল নোটবুক) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <AlertOctagon className="w-5 h-5 text-amber-500" />
            <span>{tr('ভুল প্রশ্নের নোটবুক (Mistake Notebook)', 'Mistake Notebook')}</span>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl self-start">
            <button
              type="button"
              onClick={() => setMistakeTab('UNRESOLVED')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                mistakeTab === 'UNRESOLVED'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tr('অমীমাংসিত ভুল', 'Unresolved')}
            </button>
            <button
              type="button"
              onClick={() => setMistakeTab('RESOLVED')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                mistakeTab === 'RESOLVED'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tr('সংশোধিত', 'Resolved')}
            </button>
          </div>
        </div>

        {displayedMistakes.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            {mistakeTab === 'UNRESOLVED'
              ? tr('কোনো অমীমাংসিত ভুল প্রশ্ন নেই!', 'No unresolved mistakes!')
              : tr('এখনো কোনো ভুল প্রশ্ন সংশোধিত তালিকায় নেই।', 'No resolved mistakes yet.')}
          </p>
        ) : (
          <div className="space-y-4">
            {displayedMistakes.map((m) => (
              <div
                key={m.questionId}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {m.topicTitle}
                  </span>
                  {!m.resolved && (
                    <button
                      type="button"
                      onClick={() => handleResolveMistake(m.questionId)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{tr('✓ বুঝতে পেরেছি', '✓ Mark Understood')}</span>
                    </button>
                  )}
                </div>

                <div className="text-sm font-semibold text-slate-900">
                  <LatexRenderer content={m.stemBangla} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
                    <span className="font-bold">{tr('তোমার দেওয়া ভুল উত্তর: ', 'Your Answer: ')}</span>
                    <LatexRenderer content={m.selectedKey} />
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold">
                    <span className="font-bold">{tr('সঠিক উত্তর: ', 'Correct Answer: ')}</span>
                    <LatexRenderer content={m.correctKey} />
                  </div>
                </div>

                {m.explanationBangla && (
                  <div className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-indigo-700">
                      {tr('ব্যাখ্যা: ', 'Explanation: ')}
                    </span>
                    <LatexRenderer content={m.explanationBangla} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
