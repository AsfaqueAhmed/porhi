'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  AlertOctagon,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { toBanglaDigits } from '@/components/navigation/persistent-nav';
import { LatexRenderer } from '@/components/math/latex-renderer';

export default function ProgressPage() {
  const { activeSubject } = useUserStore();
  const subjectName = activeSubject?.nameBangla || 'পদার্থবিজ্ঞান';

  const weakTopics = [
    {
      id: 'topic-motion-4',
      chapterName: 'গতি',
      topicTitle: 'পরন্ত বস্তুর সূত্রাবলী ও লেখচিত্র বিশ্লেষণ',
      accuracy: 45,
      mistakeCount: 4,
      lessonHref: '/lesson/topic-motion-4',
      practiceHref: '/practice/ch-motion',
    },
    {
      id: 'topic-force-3',
      chapterName: 'বল',
      topicTitle: 'ঘর্ষণ বল ও গতীয় ঘর্ষণ গুণাঙ্ক',
      accuracy: 52,
      mistakeCount: 3,
      lessonHref: '/lesson/topic-force-3',
      practiceHref: '/practice/ch-force',
    },
  ];

  const recentMistakes = [
    {
      id: 'm-1',
      stem: 'মুক্তভাবে পড়ন্ত বস্তু $1\\text{ s}$, $2\\text{ s}$, $3\\text{ s}$ এ যে দূরত্ব অতিক্রম করে তার অনুপাত কত?',
      yourAnswer: '$1 : 2 : 3$',
      correctAnswer: '$1 : 4 : 9$',
      conceptNote: 'দূরত্ব সময়ের বর্গের সমানুপাতিক ($h \\propto t^2$), সরাসরি সময়ের সমানুপাতিক নয়।',
    },
    {
      id: 'm-2',
      stem: 'একটি বস্তু $5\\text{ ms}^{-1}$ আদিবেগে এবং $2\\text{ ms}^{-2}$ সুষম ত্বরণে $4\\text{ s}$ চললে এর শেষবেগ কত হবে?',
      yourAnswer: '$10\\text{ ms}^{-1}$',
      correctAnswer: '$13\\text{ ms}^{-1}$',
      conceptNote: 'গতির সমীকরণ $v = u + at = 5 + (2 \\times 4) = 13\\text{ ms}^{-1}$।',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
          ব্যক্তিগত অ্যানালিটিক্স
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
          অগ্রগতি ও দুর্বলতা রিপোর্ট
        </h1>
        <p className="text-sm text-slate-600">
          {subjectName} বিষয়ে তোমার বর্তমান দক্ষতা, বারবার ভুল হওয়া টপিক এবং সিলেবাস কভারেজ।
        </p>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500">সিলেবাস কভারেজ</div>
          <div className="text-2xl font-black text-slate-900">৬৫%</div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }} />
          </div>
          <div className="text-xs text-slate-500 pt-1">১৪টির মধ্যে ৯টি টপিক সম্পন্ন</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500">গড় নির্ভুলতা (Accuracy)</div>
          <div className="text-2xl font-black text-emerald-600">৭৮%</div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '78%' }} />
          </div>
          <div className="text-xs text-slate-500 pt-1">মোট ১৮৪টি প্রশ্নের মধ্যে ১৪৪টি সঠিক</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500">অনুশীলন ও মডেল টেস্ট</div>
          <div className="text-2xl font-black text-amber-600">১২টি সেশন</div>
          <div className="text-xs text-slate-600 pt-3">
            সর্বশেষ মডেল টেস্ট স্কোর: <span className="font-bold text-slate-900">১৮/২০</span>
          </div>
        </div>
      </div>

      {/* Weak Topics Section */}
      <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 text-rose-600 font-bold text-lg border-b border-rose-50 pb-3">
          <TrendingDown className="w-5 h-5 text-rose-500" />
          <span>দুর্বল টপিক রিপোর্ট (অতিরিক্ত অনুশীলন প্রয়োজন)</span>
        </div>

        <p className="text-xs text-slate-600">
          যেসব টপিকে তোমার সঠিক উত্তরের হার ৬০% এর নিচে, সেগুলোতে ধারণা পরিষ্কার করতে পুনরায় লেসন পড়ুন।
        </p>

        <div className="space-y-3">
          {weakTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  অধ্যায়: {topic.chapterName}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{topic.topicTitle}</h3>
                <div className="text-xs text-slate-600 flex items-center gap-3">
                  <span>নির্ভুলতা: <strong className="text-rose-600">{toBanglaDigits(topic.accuracy)}%</strong></span>
                  <span>•</span>
                  <span>ভুল হয়েছে: <strong>{toBanglaDigits(topic.mistakeCount)}টি প্রশ্ন</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={topic.lessonHref}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>লেসন পড়ো</span>
                </Link>
                <Link
                  href={topic.practiceHref}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>অনুশীলন করো</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mistake Notebook (ভুল নোটবুক) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <AlertOctagon className="w-5 h-5 text-amber-500" />
            <span>ভুল প্রশ্নের নোটবুক (Mistakes List)</span>
          </div>
          <span className="text-xs font-semibold text-slate-500">সাম্প্রতিক ভুলসমূহ</span>
        </div>

        <div className="space-y-4">
          {recentMistakes.map((m) => (
            <div key={m.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-sm font-semibold text-slate-900">
                <LatexRenderer content={m.stem} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
                  <span className="font-bold">তোমার দেওয়া ভুল উত্তর: </span>
                  <LatexRenderer content={m.yourAnswer} />
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold">
                  <span className="font-bold">সঠিক উত্তর: </span>
                  <LatexRenderer content={m.correctAnswer} />
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-bold text-indigo-700">মনে রাখার টেকনিক: </span>
                <LatexRenderer content={m.conceptNote} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
