'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpen,
  Target,
  Lightbulb,
  Calculator,
  ArrowRight,
  Bookmark,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { RichContentRenderer } from '@/components/content/rich-content-renderer';
import { InteractiveSimulationRunner } from '@/components/content/interactive-simulation-runner';
import { apiClient } from '@/lib/api-client';
import { LessonDTO, ContentStatus } from '@pori/shared';
import { useLanguageStore } from '@/store/language-store';

const SAMPLE_LESSON: LessonDTO = {
  id: 'lesson-motion-equations',
  topicId: 'topic-motion-3',
  titleBangla: 'গতির সমীকরণসমূহ ও গাণিতিক বিশ্লেষণ',
  learningGoal: 'সুসম ত্বরণে চলমান বস্তুর গতির চারটি মৌলিক সমীকরণ ($v = u + at$, $s = \\frac{u+v}{2}t$, $s = ut + \\frac{1}{2}at^2$, $v^2 = u^2 + 2as$) প্রতিপাদন ও এদের গাণিতিক প্রয়োগ ব্যাখ্যা করতে পারবে।',
  explanation: `
কোনো বস্তু যদি $u$ আদিবেগ নিয়ে $a$ সুষম ত্বরণে $t$ সময় ধরে চলে এবং $v$ শেষবেগ প্রাপ্ত হয়ে $s$ দূরত্ব অতিক্রম করে, তবে এদের পারস্পরিক সম্পর্ক নির্ধারণকারী সমীকরণসমূহকে গতির সমীকরণ বলা হয়।

### প্রথম সমীকরণ:
ত্বরণের সংজ্ঞানুযায়ী, সময়ের সাথে বেগের পরিবর্তনের হারকে ত্বরণ বলে:
$$a = \\frac{v - u}{t} \\implies v = u + at$$

### দ্বিতীয় সমীকরণ (গড় বেগের সাহায্যে):
সুষম ত্বরণের ক্ষেত্রে গড় বেগ হলো আদিবেগ ও শেষবেগের গাণিতিক গড়:
$$v_{\\text{avg}} = \\frac{u + v}{2}$$
অতএব, অতিক্রান্ত দূরত্ব:
$$s = v_{\\text{avg}} \\times t = \\left(\\frac{u + v}{2}\\right)t$$

### তৃতীয় সমীকরণ:
প্রথম সমীকরণ থেকে $v = u + at$ এর মান দ্বিতীয় সমীকরণে বসালে পাওয়া যায়:
$$s = ut + \\frac{1}{2}at^2$$

### চতুর্থ সমীকরণ (সময় বর্জন সমীকরণ):
প্রথম সমীকরণ হতে $t = \\frac{v - u}{a}$ মান নিয়ে দ্বিতীয় সমীকরণে প্রতিস্থাপন করলে পাই:
$$v^2 = u^2 + 2as$$
`,
  importantTerms: [
    {
      termBangla: 'আদিবেগ',
      termEnglish: 'Initial Velocity (u)',
      definition: 'গণনা শুরুর মুহূর্তে বস্তুর বেগ। স্থির অবস্থান থেকে শুরু হলে $u = 0$ ধরা হয়।',
    },
    {
      termBangla: 'সুষম ত্বরণ',
      termEnglish: 'Uniform Acceleration (a)',
      definition: 'যদি গতিশীল কোনো বস্তুর বেগ বৃদ্ধির হার সর্বদা সমান থাকে। যেমন অভিকর্ষজ ত্বরণ $g = 9.8 \\text{ m/s}^2$।',
    },
    {
      termBangla: 'অতিক্রান্ত দূরত্ব ও সরণ',
      termEnglish: 'Displacement (s)',
      definition: 'নির্দিষ্ট দিকে বস্তুর অবস্থানের পরিবর্তনকে সরণ বলে। এর একক মিটার ($m$)।',
    },
  ],
  workedExample: {
    problem: 'একটি স্থির ট্রেন $2\\text{ ms}^{-2}$ সুষম ত্বরণে চলতে শুরু করল। $10\\text{ s}$ পর ট্রেনটির বেগ কত হবে এবং এটি কত দূরত্ব অতিক্রম করবে?',
    stepByStepSolution: `
**প্রদত্ত উপাত্ত:**
- আদিবেগ, $u = 0\\text{ ms}^{-1}$ (যেহেতু স্থির অবস্থান থেকে শুরু)
- ত্বরণ, $a = 2\\text{ ms}^{-2}$
- সময়, $t = 10\\text{ s}$

**১. বেগ নির্ণয় ($v$):**
$$v = u + at = 0 + (2 \\times 10) = 20\\text{ ms}^{-1}$$

**২. অতিক্রান্ত দূরত্ব নির্ণয় ($s$):**
$$s = ut + \\frac{1}{2}at^2 = (0 \\times 10) + \\frac{1}{2} \\times 2 \\times (10)^2 = 100\\text{ m}$$

**উত্তর:** ট্রেনটির শেষবেগ $20\\text{ ms}^{-1}$ এবং অতিক্রান্ত দূরত্ব $100\\text{ m}$।
`,
  },
  memoryAid: 'সূত্র বাছাই কৌশল: প্রশ্নে যদি সময় ($t$) না দেওয়া থাকে, সরাসরি $v^2 = u^2 + 2as$ ব্যবহার করো। স্থির অবস্থা বলা থাকলে শুরুতেই $u = 0$ বসিয়ে সমীকরণ সহজ করে নাও।',
  status: ContentStatus.PUBLISHED,
  version: 1,
};

export default function LessonPage() {
  const params = useParams();
  const topicId = (params?.topicId as string) || 'topic-motion-3';
  const { tr } = useLanguageStore();
  const [lesson, setLesson] = useState<LessonDTO>(SAMPLE_LESSON);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const res = await apiClient.get<LessonDTO>(`/lessons/topic/${topicId}`);
        if (res && res.titleBangla) {
          setLesson(res);
        }
      } catch {
        // Keep default sample lesson
      }
    }
    fetchLesson();
  }, [topicId]);

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-10">
      {/* Title & Metadata */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{tr('অধ্যায়ভিত্তিক বিস্তারিত পাঠ', 'Chapter Detailed Lesson')}</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {lesson.titleBangla}
        </h1>
      </div>

      {/* Learning Goal (শিখনফল) */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
          <Target className="w-5 h-5 text-emerald-600" />
          <span>{tr('পাঠের শিখনফল', 'Learning Goals')}</span>
        </div>
        <div className="text-sm text-emerald-900 leading-relaxed pl-7">
          <LatexRenderer content={lesson.learningGoal} />
        </div>
      </div>

      {/* Interactive Physics Simulation Lab (if available) */}
      {lesson.interactiveWidgetUrl && (
        <InteractiveSimulationRunner
          widgetUrl={lesson.interactiveWidgetUrl}
          title={lesson.titleBangla}
        />
      )}

      {/* Main Explanation with RichContentRenderer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          {tr('মূল বিষয়বস্তু ও গাণিতিক প্রতিপাদন', 'Core Concept & Mathematical Derivation')}
        </h2>
        <div className="text-slate-800 leading-relaxed text-base space-y-4">
          <RichContentRenderer content={lesson.explanation} />
        </div>
      </div>

      {/* Important Terms (পারিভাষিক শব্দাবলি) */}
      {lesson.importantTerms && lesson.importantTerms.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
            <Bookmark className="w-5 h-5 text-indigo-600" />
            <span>{tr('জরুরি পারিভাষিক শব্দ ও সংজ্ঞাসমূহ', 'Essential Terminology & Definitions')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.importantTerms.map((term, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{term.termBangla}</h3>
                  <span className="text-xs text-slate-500 font-mono">{term.termEnglish}</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <LatexRenderer content={term.definition} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Worked Example (হাতে-কলমে উদাহরণ) */}
      {lesson.workedExample && (
        <div className="bg-slate-900 text-white rounded-2xl shadow-md p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Calculator className="w-5 h-5" />
            <span>{tr('বাস্তব উদাহরণ ও ধাপে ধাপে সমাধান', 'Worked Example & Step-by-Step Solution')}</span>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {tr('সমস্যা:', 'Problem:')}
            </span>
            <div className="text-sm font-medium text-slate-100">
              <LatexRenderer content={lesson.workedExample.problem} />
            </div>
          </div>

          <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/60 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              {tr('ধাপে ধাপে সমাধান:', 'Step-by-Step Solution:')}
            </span>
            <div className="text-sm text-slate-200">
              <LatexRenderer content={lesson.workedExample.stepByStepSolution} />
            </div>
          </div>
        </div>
      )}

      {/* Memory Aid (মনে রাখার টেকনিক) */}
      {lesson.memoryAid && (
        <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-5 flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-amber-900 text-sm">{tr('মনে রাখার টিপস ও ট্রিকস', 'Memory Aids & Shortcuts')}</h3>
            <div className="text-xs text-amber-900 leading-relaxed">
              <LatexRenderer content={lesson.memoryAid} />
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
        <Link
          href="/curriculum/sub-ssc-phy"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          {tr('← অধ্যায় সূচিতে ফেরত যান', '← Back to Chapter Index')}
        </Link>
        <Link
          href="/practice/ch-motion"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow transition-colors"
        >
          <span>{tr('এবার MCQ অনুশীলন শুরু করো', 'Start MCQ Practice Now')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
