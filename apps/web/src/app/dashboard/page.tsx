'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, ArrowRight, BookOpen, Clock, AlertCircle, PlayCircle, Trophy, BarChart2 } from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { toBanglaDigits } from '@/components/navigation/persistent-nav';

export default function DashboardPage() {
  const { activeSubject, streakDays } = useUserStore();

  const currentSubjectTitle = activeSubject?.nameBangla || 'পদার্থবিজ্ঞান';
  const currentProgram = activeSubject?.program || 'SSC';
  const currentYear = activeSubject?.syllabusYear ? toBanglaDigits(activeSubject.syllabusYear) : '২০২৬';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Welcome & Streak Banner */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-semibold bg-indigo-500/40 text-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
              {currentSubjectTitle} • {currentProgram} {currentYear}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-2 tracking-tight">
              স্বাগতম! আজ কী পড়বে?
            </h1>
            <p className="text-sm text-indigo-100 mt-1">
              ধারাবাহিক পড়াশোনা তোমার মেধা ও আত্মবিশ্বাস গড়ে তোলে।
            </p>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 self-start md:self-auto">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Flame className="w-6 h-6 fill-orange-400" />
            </div>
            <div>
              <div className="text-2xl font-black">{toBanglaDigits(streakDays)} দিন</div>
              <div className="text-xs text-indigo-200">অব্যাহত স্ট্রিক 🔥</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Next Action Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <PlayCircle className="w-4 h-4" />
            <span>পরবর্তী প্রস্তাবিত পাঠ</span>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
            চলমান অধ্যায়: গতি
          </span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            টপিক: গতির সমীকরণ ও ত্বরণের বিশ্লেষণ
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            গতিশক্তি, ত্বরণ এবং দূরত্ব নির্ণয়ের মূল সমীকরণসমূহের গাণিতিক উপপাদন ও বাস্তব প্রয়োগ।
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/lesson/topic-motion-1"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <span>পড়া চালিয়ে যান</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/practice/ch-motion"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
          >
            <span>সরাসরি MCQ প্র্যাকটিস</span>
          </Link>
        </div>
      </div>

      {/* Review Due & Quick Jump Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Review Due */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>রিভিশন প্রয়োজন (স্পেসড রিপিটেশন)</span>
            </div>
            <span className="text-xs font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
              ২টি টপিক
            </span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            স্মৃতি স্থায়ী করার জন্য পূর্বে ভুল হওয়া কিছু প্রশ্নের পুনরাবৃত্তি অনুশীলন করুন।
          </p>
          <div className="space-y-2">
            <div className="bg-white p-3 rounded-lg border border-amber-200 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-800">বলের সূত্র ও ঘর্ষণ গুণাঙ্ক</span>
              <Link href="/practice/ch-force" className="text-indigo-600 hover:underline font-bold">
                রিভিউ শুরু →
              </Link>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-200 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-800">কাজের একক ও মাত্রা সমীকরণ</span>
              <Link href="/practice/ch-work" className="text-indigo-600 hover:underline font-bold">
                রিভিউ শুরু →
              </Link>
            </div>
          </div>
        </div>

        {/* Study Navigation Hub */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>কুইক স্টাডি হাব</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {currentSubjectTitle} বিষয়ের সম্পূর্ণ কারিকুলাম ও পরীক্ষা
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href={`/curriculum/${activeSubject?.id || 'sub-ssc-phy'}`}
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex flex-col gap-1 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>অধ্যায় ও টপিক সূচি</span>
            </Link>
            <Link
              href="/exam/ch-motion"
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex flex-col gap-1 transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>অধ্যায়ভিত্তিক পরীক্ষা</span>
            </Link>
            <Link
              href="/progress"
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex flex-col gap-1 transition-colors"
            >
              <BarChart2 className="w-4 h-4 text-emerald-600" />
              <span>দুর্বলতা ও প্রগ্রেস</span>
            </Link>
            <Link
              href="/subjects"
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex flex-col gap-1 transition-colors"
            >
              <AlertCircle className="w-4 h-4 text-purple-600" />
              <span>বিষয় পরিবর্তন</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
