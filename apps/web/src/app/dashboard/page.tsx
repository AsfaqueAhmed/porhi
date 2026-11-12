'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Flame,
  ArrowRight,
  BookOpen,
  Clock,
  AlertCircle,
  PlayCircle,
  Trophy,
  BarChart2,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';
import { useUserStore, ServerOverviewPayload } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import { toBanglaDigits } from '@/lib/formatters';
import { DEFAULT_CHAPTERS } from '@/lib/curriculum-data';
import { apiClient } from '@/lib/api-client';
import { ensureGuestSession } from '@/lib/guest-session';

export default function DashboardPage() {
  const {
    activeSubject,
    streakDays,
    completedTopics,
    lastVisitedTopic,
    savedMistakes,
    bookmarks,
    studyDates,
    hydrateFromServerOverview,
  } = useUserStore();
  const { tr, language } = useLanguageStore();

  const subjectId = activeSubject?.id || 'sub_ssc_physics';

  useEffect(() => {
    async function fetchOverview() {
      try {
        await ensureGuestSession().catch(() => {});
        const res = await apiClient.get<ServerOverviewPayload>(
          `/student/overview?subjectId=${encodeURIComponent(subjectId)}`
        );
        if (res) {
          hydrateFromServerOverview(res);
        }
      } catch {
        // Offline / guest fallback: use local learning store
      }
    }
    fetchOverview();
  }, [subjectId, hydrateFromServerOverview]);

  const currentSubjectTitle = tr(activeSubject?.nameBangla || 'পদার্থবিজ্ঞান', 'Physics');
  const currentProgram = activeSubject?.program || 'SSC';
  const currentYear =
    language === 'bn'
      ? activeSubject?.syllabusYear
        ? toBanglaDigits(activeSubject.syllabusYear)
        : '২০২৬'
      : activeSubject?.syllabusYear || '2026';

  const totalTopics = useMemo(
    () => DEFAULT_CHAPTERS.reduce((sum, ch) => sum + ch.topics.length, 0),
    []
  );
  const completedCount = completedTopics.length;
  const syllabusPct =
    totalTopics > 0 ? Math.min(100, Math.round((completedCount / totalTopics) * 100)) : 0;

  // Next recommended topic: either lastVisitedTopic or first uncompleted topic
  const recommendedTarget = useMemo(() => {
    if (lastVisitedTopic) {
      return {
        topicId: lastVisitedTopic.topicId,
        topicTitle: lastVisitedTopic.topicTitle,
        chapterId: lastVisitedTopic.chapterId,
        chapterTitle: lastVisitedTopic.chapterTitle,
        isResume: true,
      };
    }

    for (const ch of DEFAULT_CHAPTERS) {
      const nextUncompleted = ch.topics.find((t) => !completedTopics.includes(t.id));
      if (nextUncompleted) {
        return {
          topicId: nextUncompleted.id,
          topicTitle: nextUncompleted.titleBangla,
          chapterId: ch.id,
          chapterTitle: ch.titleBangla,
          isResume: false,
        };
      }
    }

    const firstCh = DEFAULT_CHAPTERS[0];
    const firstTop = firstCh.topics[0];
    return {
      topicId: firstTop.id,
      topicTitle: firstTop.titleBangla,
      chapterId: firstCh.id,
      chapterTitle: firstCh.titleBangla,
      isResume: false,
    };
  }, [lastVisitedTopic, completedTopics]);

  // Group unresolved mistakes by topic for Spaced Repetition queue
  const unresolvedMistakeTopics = useMemo(() => {
    const unresolved = savedMistakes.filter((m) => !m.resolved);
    const map = new Map<
      string,
      {
        topicId: string;
        topicTitle: string;
        chapterId: string;
        chapterTitle: string;
        count: number;
      }
    >();
    for (const m of unresolved) {
      const existing = map.get(m.topicId);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(m.topicId, {
          topicId: m.topicId,
          topicTitle: m.topicTitle,
          chapterId: m.chapterId,
          chapterTitle: m.chapterTitle,
          count: 1,
        });
      }
    }
    return Array.from(map.values()).slice(0, 4);
  }, [savedMistakes]);

  // 7-day activity strip
  const last7Days = useMemo(() => {
    const days: Array<{ iso: string; labelBn: string; labelEn: string; active: boolean; isToday: boolean }> = [];
    const bnDayNames = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
    const enDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const dow = d.getDay();
      days.push({
        iso,
        labelBn: bnDayNames[dow],
        labelEn: enDayNames[dow],
        active: studyDates.includes(iso),
        isToday: i === 0,
      });
    }
    return days;
  }, [studyDates]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Welcome, Streak & 7-Day Activity Banner */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-semibold bg-indigo-500/40 text-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
              {currentSubjectTitle} • {currentProgram} {currentYear}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-2 tracking-tight">
              {tr('স্বাগতম! আজ কী পড়বে?', 'Welcome! What will you study today?')}
            </h1>
            <p className="text-sm text-indigo-100 mt-1">
              {tr(
                'ধারাবাহিক পড়াশোনা তোমার মেধা ও আত্মবিশ্বাস গড়ে তোলে।',
                'Consistent study builds mastery and confidence.'
              )}
            </p>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 self-start md:self-auto">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Flame className="w-6 h-6 fill-orange-400" />
            </div>
            <div>
              <div className="text-2xl font-black">
                {language === 'bn' ? toBanglaDigits(streakDays) : streakDays} {tr('দিন', 'Days')}
              </div>
              <div className="text-xs text-indigo-200">{tr('অব্যাহত স্ট্রিক 🔥', 'Active Streak 🔥')}</div>
            </div>
          </div>
        </div>

        {/* Syllabus Completion Bar & 7-Day Strip */}
        <div className="pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-100">
              <span>{tr('সামগ্রিক সিলেবাস অগ্রগতি', 'Overall Syllabus Progress')}</span>
              <span>
                {language === 'bn'
                  ? `${toBanglaDigits(completedCount)}/${toBanglaDigits(totalTopics)} টপিক (${toBanglaDigits(syllabusPct)}%)`
                  : `${completedCount}/${totalTopics} Topics (${syllabusPct}%)`}
              </span>
            </div>
            <div className="w-full h-2 bg-indigo-950/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all"
                style={{ width: `${syllabusPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {last7Days.map((d) => (
              <div
                key={d.iso}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold flex flex-col items-center ${
                  d.active
                    ? 'bg-emerald-400/20 border border-emerald-300/40 text-emerald-200'
                    : d.isToday
                    ? 'bg-white/10 border border-indigo-300/60 text-white'
                    : 'bg-white/5 border border-white/10 text-indigo-200/70'
                }`}
              >
                <span>{language === 'bn' ? d.labelBn : d.labelEn}</span>
                <span className="mt-0.5">{d.active ? '●' : '○'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Next Action Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <PlayCircle className="w-4 h-4" />
            <span>
              {recommendedTarget.isResume
                ? tr('সর্বশেষ পঠিত টপিক থেকে শুরু করো', 'Resume Where You Left Off')
                : tr('পরবর্তী প্রস্তাবিত পাঠ', 'Recommended Next Lesson')}
            </span>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
            {recommendedTarget.chapterTitle}
          </span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">{recommendedTarget.topicTitle}</h2>
          <p className="text-sm text-slate-600 mt-1">
            {tr(
              'ইন্টারেক্টিভ পাঠ, বাস্তব উদাহরণ ও ৬-স্তরের ব্যাখ্যার সাথে এই টপিকটি সম্পূর্ণ আয়ত্ত করো।',
              'Master this topic with interactive explanations, worked examples, and 6-layer MCQ breakdowns.'
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/lesson/${recommendedTarget.topicId}`}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <span>{tr('পড়া চালিয়ে যান', 'Continue Learning')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/practice/${recommendedTarget.chapterId}?topicId=${encodeURIComponent(recommendedTarget.topicId)}`}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
          >
            <span>{tr('সরাসরি MCQ প্র্যাকটিস', 'Direct MCQ Practice')}</span>
          </Link>
        </div>
      </div>

      {/* Review Due & Quick Jump Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dynamic Spaced Repetition / Revision Queue */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{tr('রিভিশন প্রয়োজন (স্পেসড রিপিটেশন)', 'Revision Due (Spaced Repetition)')}</span>
            </div>
            <span className="text-xs font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
              {language === 'bn'
                ? `${toBanglaDigits(unresolvedMistakeTopics.length)}টি টপিক`
                : `${unresolvedMistakeTopics.length} Topics`}
            </span>
          </div>

          {unresolvedMistakeTopics.length > 0 ? (
            <>
              <p className="text-xs text-amber-800 leading-relaxed">
                {tr(
                  'স্মৃতি স্থায়ী করার জন্য পূর্বে ভুল হওয়া প্রশ্নগুলোর পুনরাবৃত্তি অনুশীলন করুন।',
                  'Review previously missed questions to strengthen retention.'
                )}
              </p>
              <div className="space-y-2">
                {unresolvedMistakeTopics.map((item) => (
                  <div
                    key={item.topicId}
                    className="bg-white p-3 rounded-lg border border-amber-200 flex items-center justify-between gap-2 text-xs font-medium"
                  >
                    <div className="min-w-0">
                      <span className="text-slate-800 font-semibold block truncate">
                        {item.topicTitle}
                      </span>
                      <span className="text-[11px] text-amber-700">
                        {language === 'bn'
                          ? `${toBanglaDigits(item.count)}টি অমীমাংসিত ভুল`
                          : `${item.count} unresolved mistakes`}
                      </span>
                    </div>
                    <Link
                      href={`/practice/${item.chapterId}?topicId=${encodeURIComponent(item.topicId)}&mode=mistakes`}
                      className="text-indigo-600 hover:underline font-bold shrink-0"
                    >
                      {tr('রিভিউ শুরু →', 'Start Review →')}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{tr('সকল ভুল সংশোধিত! কোনো বকেয়া রিভিশন নেই।', 'All caught up! No pending mistakes.')}</span>
              </div>
              <p className="text-xs text-slate-600">
                {tr(
                  'নতুন টপিক অনুশীলন শুরু করে তোমার দক্ষতা আরও বাড়িয়ে নাও।',
                  'Start practicing new topics to build your mastery.'
                )}
              </p>
              <Link
                href={`/practice/${recommendedTarget.chapterId}`}
                className="inline-block text-xs font-bold text-indigo-600 hover:underline pt-1"
              >
                {tr('অধ্যায় অনুশীলন শুরু করো →', 'Start Chapter Practice →')}
              </Link>
            </div>
          )}
        </div>

        {/* Study Navigation Hub + Bookmarks */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>{tr('কুইক স্টাডি হাব', 'Quick Study Hub')}</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {currentSubjectTitle} {tr('বিষয়ের সম্পূর্ণ কারিকুলাম ও পরীক্ষা', 'Full Curriculum & Tests')}
            </p>
          </div>

          {bookmarks.length > 0 && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                <Bookmark className="w-3 h-3 text-indigo-600" />
                <span>{tr('সাম্প্রতিক বুকমার্ক', 'Recent Bookmarks')}</span>
              </div>
              <Link
                href={bookmarks[0].href}
                className="text-xs font-bold text-indigo-700 hover:underline block truncate"
              >
                {bookmarks[0].titleBangla}
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href={`/curriculum/${subjectId}`}
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex flex-col gap-1 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>{tr('অধ্যায় ও টপিক সূচি', 'Curriculum Index')}</span>
            </Link>
            <Link
              href={`/exam/${recommendedTarget.chapterId}`}
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex flex-col gap-1 transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>{tr('অধ্যায়ভিত্তিক পরীক্ষা', 'Chapter Model Test')}</span>
            </Link>
            <Link
              href="/progress"
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex flex-col gap-1 transition-colors"
            >
              <BarChart2 className="w-4 h-4 text-emerald-600" />
              <span>{tr('দুর্বলতা ও প্রগ্রেস', 'Progress & Weaknesses')}</span>
            </Link>
            <Link
              href="/subjects"
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex flex-col gap-1 transition-colors"
            >
              <AlertCircle className="w-4 h-4 text-purple-600" />
              <span>{tr('বিষয় পরিবর্তন', 'Switch Subject')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
