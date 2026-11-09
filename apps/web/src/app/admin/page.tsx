'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Layers,
  FileQuestion,
  ShieldAlert,
  ArrowRight,
  GitFork,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SubjectDTO } from '@pori/shared';
import { apiClient } from '@/lib/api-client';

interface SubjectWithCount extends SubjectDTO {
  chapterCount?: number;
}

export default function AdminOverviewPage() {
  const [subjects, setSubjects] = useState<SubjectWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSummary = async () => {
      try {
        const data = await apiClient.get<SubjectWithCount[]>('/curriculum/subjects', {
          scope: 'admin',
        });
        if (isMounted && Array.isArray(data)) {
          setSubjects(data);
        }
      } catch {
        // Fallback or empty state
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSummary();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalChapters = subjects.reduce((acc, s) => acc + (s.chapterCount || 0), 0);
  const readySubjects = subjects.filter((s) => s.isReady).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/70 rounded-3xl p-6 md:p-8 text-slate-900 shadow-xs border border-indigo-100/80">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>এডটেক কন্ট্রোল ওভারভিউ ও সিলেবাস কন্ট্রোল</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              স্বাগতম, poRi কনটেন্ট অপারেশনস প্যানেলে
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              SSC ও HSC সিলেবাসের বিষয়, অধ্যায়, টপিক, পাঠ্য লেসন এবং ৬-লেয়ার ব্যাখ্যাসমৃদ্ধ প্রশ্ন ব্যাংক পরিচালনা করুন এক জায়গায়।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/curriculum"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all hover:scale-102"
            >
              <GitFork className="w-4 h-4" />
              <span>কারিকুলাম এক্সপ্লোরার</span>
            </Link>
            <Link
              href="/admin/curriculum/lessons"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>পাঠ্য লেসন</span>
            </Link>
            <Link
              href="/admin/questions"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <FileQuestion className="w-4 h-4 text-indigo-600" />
              <span>প্রশ্ন ব্যাংক</span>
            </Link>
          </div>
        </div>

        {/* Ambient background accent */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Subjects */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">মোট বিষয়</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {loading ? '...' : subjects.length}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {readySubjects}টি প্রস্তুত
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">SSC ও HSC সমন্বিত সিলেবাস</p>
        </div>

        {/* Card 2: Chapters */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">মোট অধ্যায়</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {loading ? '...' : totalChapters}
            </div>
            <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
              সকল বিষয়
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">NCTB পাঠ্যসূচি অনুযায়ী বিন্যস্ত</p>
        </div>

        {/* Card 3: Questions */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">৬-লেয়ার প্রশ্ন ব্যাংক</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileQuestion className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">১২+</div>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              MCQ ও CQ
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">সম্পূর্ণ ব্যাখ্যা ও NCTB রেফারেন্সসহ</p>
        </div>

        {/* Card 4: Pending Reviews */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">পেন্ডিং রিভিউ</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">৩</div>
            <Link
              href="/admin/reviews"
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
            >
              রিভিউ করুন <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">অনুমোদনের অপেক্ষায় থাকা কনটেন্ট</p>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <span>দ্রুত অ্যাকশন ও ওয়ার্কফ্লো</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Link
            href="/admin/curriculum"
            className="group p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <GitFork className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs mt-3">নতুন বিষয় বা অধ্যায় যোগ</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                কারিকুলাম ট্রিতে ড্রয়ার ওপেন করে তাৎক্ষণিক নতুন বিষয় ও অধ্যায় তৈরি করুন।
              </p>
            </div>
            <span className="mt-3 text-[11px] font-bold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              কারিকুলামে যান <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            href="/admin/questions/new"
            className="group p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileQuestion className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs mt-3">৬-লেয়ার প্রশ্ন তৈরি</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                KaTeX ম্যাথ টুলবার ও লাইভ মোবাইল সিমুলেটরসহ নিখুঁত ব্যাখ্যা লিখুন।
              </p>
            </div>
            <span className="mt-3 text-[11px] font-bold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              স্টুডিও খুলুন <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            href="/admin/model-tests"
            className="group p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Trophy className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs mt-3">মডেল টেস্ট কনফিগার</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                অধ্যায়ভিত্তিক সময়সীমা, নেগেটিভ মার্কিং পেনাল্টি এবং পাস মার্ক নির্ধারণ করুন।
              </p>
            </div>
            <span className="mt-3 text-[11px] font-bold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              কনফিগার করুন <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            href="/admin/reviews"
            className="group p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs mt-3">পাবলিশ ও অডিট</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                স্টুডেন্ট সিমুলেটরে লাইভ টেস্ট করে কনটেন্ট এপ্রুভ বা রিজেক্ট করুন।
              </p>
            </div>
            <span className="mt-3 text-[11px] font-bold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              রিভিউ কনসোলে যান <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>

      {/* Subject Syllabus Readiness Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">সিলেবাস কভারেজ ও বিষয়ের স্ট্যাটাস</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              বর্তমানে রেজিস্টার্ড বিষয়সমূহ এবং তাদের অধ্যায় সংখ্যার লাইভ তালিকা
            </p>
          </div>
          <Link
            href="/admin/curriculum"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            সকল বিষয় দেখুন <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {subjects.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              {loading ? 'ডেটা লোড হচ্ছে...' : 'কোনো বিষয় পাওয়া যায়নি। কারিকুলামে নতুন বিষয় যোগ করুন।'}
            </div>
          ) : (
            subjects.map((sub) => (
              <div
                key={sub.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
                    {sub.nameBangla.slice(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{sub.nameBangla}</span>
                      <span className="text-[10px] font-mono text-slate-400">({sub.code})</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium">
                        {sub.classLevel === 'CLASS_9_10' ? 'SSC (৯ম-১০ম)' : 'HSC (১১দশ-১২শ)'}
                      </span>
                      <span>•</span>
                      <span>{sub.chapterCount || 0}টি অধ্যায়</span>
                      <span>•</span>
                      <span>শিক্ষাবর্ষ {sub.syllabusYear}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {sub.isReady ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      লাইভ সিলেবাস
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-3 h-3 text-amber-500" />
                      ড্রাফট মোড
                    </span>
                  )}

                  <Link
                    href={`/admin/curriculum?subjectId=${sub.id}`}
                    className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="অধ্যায়সমূহ দেখুন"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
