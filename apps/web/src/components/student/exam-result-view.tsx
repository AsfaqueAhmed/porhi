'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  BarChart3,
  Clock,
  BookOpen,
  Flag,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { ReportContentModal } from '@/components/student/report-content-modal';
import { toBanglaDigits } from '@/lib/formatters';
import { useLanguageStore } from '@/store/language-store';
import { findTopicHierarchy } from '@/lib/curriculum-data';

export interface ExamResultOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface ExamResultAnswerItem {
  questionId: string;
  topicId?: string;
  stem: string;
  options?: ExamResultOption[];
  selectedOptionId?: string | null;
  correctOptionId?: string;
  isCorrect: boolean;
  explanation?: {
    directAnswer?: string;
    coreConcept?: string;
    formula?: string;
    realLifeExample?: string;
  } | null;
  timeSpent?: number;
}

export interface ExamResultData {
  sessionId?: string;
  chapterId: string;
  chapterTitle: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  durationSeconds?: number;
  negativeRatio?: number;
  negativeDeduction?: number;
  percentile?: number | null;
  answersWithExplanation: ExamResultAnswerItem[];
}

interface ExamResultViewProps {
  result: ExamResultData;
  onRetake?: () => void;
}

function formatNumber(value: number, language: 'bn' | 'en'): string {
  const rounded = Math.round(value * 100) / 100;
  const str = String(rounded);
  return language === 'bn' ? toBanglaDigits(str) : str;
}

function formatDuration(seconds: number, language: 'bn' | 'en'): string {
  const safe = Math.max(0, Math.round(seconds || 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  if (mins === 0) {
    return language === 'bn' ? `${toBanglaDigits(secs)} সে.` : `${secs}s`;
  }
  return language === 'bn'
    ? `${toBanglaDigits(mins)} মি. ${toBanglaDigits(secs)} সে.`
    : `${mins}m ${secs}s`;
}

export function ExamResultView({ result, onRetake }: ExamResultViewProps) {
  const { tr, language } = useLanguageStore();
  const [reportTarget, setReportTarget] = useState<{
    contentId: string;
    topicId?: string;
    label: string;
  } | null>(null);

  const negativeRatio = result.negativeRatio ?? 0;
  const negativeDeduction = result.negativeDeduction ?? 0;
  const totalQ = result.totalQuestions || result.answersWithExplanation.length || 1;
  const scorePercent = Math.max(0, Math.round((result.score / totalQ) * 100));

  const topicBreakdown = useMemo(() => {
    const map: Record<string, { topicTitle: string; total: number; correct: number }> = {};
    for (const ans of result.answersWithExplanation) {
      const tId = ans.topicId || result.chapterId;
      const h = findTopicHierarchy(tId);
      if (!map[tId]) {
        map[tId] = { topicTitle: h.topicTitle, total: 0, correct: 0 };
      }
      map[tId].total += 1;
      if (ans.isCorrect) {
        map[tId].correct += 1;
      }
    }
    return Object.entries(map).map(([tId, info]) => ({
      topicId: tId,
      ...info,
      pct: info.total > 0 ? Math.round((info.correct / info.total) * 100) : 0,
    }));
  }, [result.answersWithExplanation, result.chapterId]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {tr('মডেল টেস্ট ফলাফল শিট', 'Model Test Result Sheet')} • {result.chapterTitle}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
            {tr('তোমার অর্জিত স্কোর: ', 'Your Score: ')}
            {formatNumber(result.score, language)} / {formatNumber(totalQ, language)} (
            {formatNumber(scorePercent, language)}%)
          </h1>
          <p className="text-xs font-semibold text-slate-600 mt-2">
            {negativeRatio > 0
              ? language === 'bn'
                ? `নেগেটিভ মার্কিং: −${formatNumber(negativeDeduction, language)} (প্রতি ভুলে −${formatNumber(negativeRatio, language)})`
                : `Negative Marking: −${negativeDeduction} (−${negativeRatio} per wrong answer)`
              : tr('নেগেটিভ মার্কিং: ০ (নেই)', 'Negative Marking: 0 (Disabled)')}
          </p>
          {typeof result.percentile === 'number' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-800 mt-2">
              <span>{tr('পজিশন / পারসেন্টাইল:', 'Percentile Rank:')}</span>
              <span>{formatNumber(result.percentile, language)}%</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <div className="text-xl font-bold text-emerald-700">
              {formatNumber(result.correctCount, language)}
            </div>
            <div className="text-xs text-emerald-600 font-semibold">{tr('সঠিক উত্তর', 'Correct')}</div>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
            <div className="text-xl font-bold text-rose-700">
              {formatNumber(result.wrongCount, language)}
            </div>
            <div className="text-xs text-rose-600 font-semibold">{tr('ভুল উত্তর', 'Incorrect')}</div>
          </div>
          <div className="bg-slate-100 border border-slate-200 p-3 rounded-xl">
            <div className="text-xl font-bold text-slate-700">
              {formatNumber(result.skippedCount, language)}
            </div>
            <div className="text-xs text-slate-600 font-semibold">{tr('উত্তরবিহীন', 'Skipped')}</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-3">
          {onRetake ? (
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{tr('পুনরায় পরীক্ষা দাও', 'Retake Exam')}</span>
            </button>
          ) : (
            <Link
              href={`/exam/${result.chapterId}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{tr('পুনরায় পরীক্ষা দাও', 'Retake Exam')}</span>
            </Link>
          )}

          {result.wrongCount > 0 && (
            <Link
              href={`/practice/${result.chapterId}?mode=mistakes`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
            >
              <span>{tr('ভুল হওয়া প্রশ্নগুলো প্র্যাকটিস করো', 'Practice Missed Questions')}</span>
            </Link>
          )}

          <Link
            href="/progress"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow"
          >
            <span>{tr('অগ্রগতি ড্যাশবোর্ড দেখুন', 'View Progress Dashboard')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {topicBreakdown.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>{tr('টপিকভিত্তিক ফলাফল বিশ্লেষণ', 'Topic-wise Performance Breakdown')}</span>
          </h2>
          <div className="space-y-3">
            {topicBreakdown.map((tb) => (
              <div key={tb.topicId} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-700">
                  <span>{tb.topicTitle}</span>
                  <div className="flex items-center gap-3">
                    <span>
                      {formatNumber(tb.correct, language)}/{formatNumber(tb.total, language)} (
                      {formatNumber(tb.pct, language)}%)
                    </span>
                    {tb.topicId !== result.chapterId && (
                      <Link
                        href={`/lesson/${tb.topicId}`}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border font-bold ${
                          tb.pct < 70
                            ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                        }`}
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>
                          {tb.pct < 70
                            ? tr('দুর্বল টপিক পড়ো', 'Study Weak Topic')
                            : tr('লেসন দেখো', 'View Lesson')}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      tb.pct >= 70 ? 'bg-emerald-500' : tb.pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${tb.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          {tr('প্রশ্নোত্তর ও বিশ্লেষণ পর্যালোচনা', 'Review Questions & Analysis')}
        </h2>
        {result.answersWithExplanation.map((ans, idx) => {
          const isSkipped = !ans.selectedOptionId;
          const timeLabel = formatDuration(ans.timeSpent || 0, language);

          return (
            <div
              key={ans.questionId}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-sm text-slate-900">
                    {tr('প্রশ্ন ', 'Question ')}
                    {formatNumber(idx + 1, language)}.
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    <span>
                      {tr('সময়: ', 'Time: ')}
                      {timeLabel}
                    </span>
                  </span>
                </div>

                {!isSkipped ? (
                  ans.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {tr('সঠিক (+১)', 'Correct (+1)')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      <XCircle className="w-3.5 h-3.5" />{' '}
                      {negativeRatio > 0
                        ? language === 'bn'
                          ? `ভুল (−${formatNumber(negativeRatio, language)})`
                          : `Incorrect (−${negativeRatio})`
                        : tr('ভুল (০)', 'Incorrect (0)')}
                    </span>
                  )
                ) : (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {tr('উত্তরবিহীন', 'Skipped')}
                  </span>
                )}
              </div>

              <div className="text-slate-900 font-medium text-sm">
                <LatexRenderer content={ans.stem} />
              </div>

              {ans.options && ans.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {ans.options.map((opt) => {
                    const isRightOpt = Boolean(opt.isCorrect || opt.id === ans.correctOptionId);
                    const isChosen = opt.id === ans.selectedOptionId;
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-lg border flex items-center justify-between gap-2 ${
                          isRightOpt
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                            : isChosen
                            ? 'bg-rose-50 border-rose-300 text-rose-950 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <LatexRenderer content={opt.text} />
                        {isRightOpt && (
                          <span className="text-[10px] font-bold text-emerald-700 shrink-0">
                            {tr('সঠিক', 'Correct')}
                          </span>
                        )}
                        {isChosen && !isRightOpt && (
                          <span className="text-[10px] font-bold text-rose-700 shrink-0">
                            {tr('তোমার উত্তর', 'Your pick')}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {ans.explanation && (ans.explanation.directAnswer || ans.explanation.coreConcept) && (
                <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 text-xs text-indigo-950 space-y-1">
                  <span className="font-bold text-indigo-800">{tr('ব্যাখ্যা:', 'Explanation:')}</span>
                  <LatexRenderer
                    content={ans.explanation.directAnswer || ans.explanation.coreConcept || ''}
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                {ans.topicId ? (
                  <Link
                    href={`/lesson/${ans.topicId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{tr('এই টপিকের লেসন পড়ো', 'Read Topic Lesson')}</span>
                  </Link>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  onClick={() =>
                    setReportTarget({
                      contentId: ans.questionId,
                      topicId: ans.topicId,
                      label: ans.stem.slice(0, 80),
                    })
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border border-rose-200 bg-rose-50/70 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{tr('ভুল রিপোর্ট', 'Report Error')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ReportContentModal
        isOpen={Boolean(reportTarget)}
        onClose={() => setReportTarget(null)}
        contentType="QUESTION"
        contentId={reportTarget?.contentId || ''}
        topicId={reportTarget?.topicId}
        contentLabel={reportTarget?.label}
      />
    </div>
  );
}
