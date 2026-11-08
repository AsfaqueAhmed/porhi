'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, ChevronRight, Play, Trophy } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { toBanglaDigits } from '@/lib/formatters';

interface TopicItem {
  id: string;
  chapterId: string;
  orderIndex: number;
  titleBangla: string;
}

interface ChapterItem {
  id: string;
  subjectId: string;
  orderIndex: number;
  titleBangla: string;
  topics: TopicItem[];
}

const DEFAULT_CHAPTERS: ChapterItem[] = [
  {
    id: 'ch-motion',
    subjectId: 'sub-ssc-phy',
    orderIndex: 2,
    titleBangla: 'গতি (Motion)',
    topics: [
      {
        id: 'topic-motion-1',
        chapterId: 'ch-motion',
        orderIndex: 1,
        titleBangla: 'স্কেলার ও ভেক্টর রাশি',
      },
      {
        id: 'topic-motion-2',
        chapterId: 'ch-motion',
        orderIndex: 2,
        titleBangla: 'দূরত্ব ও সরণ, দ্রুতি ও বেগ',
      },
      {
        id: 'topic-motion-3',
        chapterId: 'ch-motion',
        orderIndex: 3,
        titleBangla: 'গতির সমীকরণসমূহ ও গাণিতিক প্রয়োগ',
      },
      {
        id: 'topic-motion-4',
        chapterId: 'ch-motion',
        orderIndex: 4,
        titleBangla: 'পরন্ত বস্তুর সূত্রাবলী',
      },
    ],
  },
  {
    id: 'ch-force',
    subjectId: 'sub-ssc-phy',
    orderIndex: 3,
    titleBangla: 'বল (Force)',
    topics: [
      {
        id: 'topic-force-1',
        chapterId: 'ch-force',
        orderIndex: 1,
        titleBangla: 'নিউটনের গতিসূত্র ও জড়তা',
      },
      {
        id: 'topic-force-2',
        chapterId: 'ch-force',
        orderIndex: 2,
        titleBangla: 'ভরবেগ ও ভরবেগের সংরক্ষণ সূত্র',
      },
      {
        id: 'topic-force-3',
        chapterId: 'ch-force',
        orderIndex: 3,
        titleBangla: 'ঘর্ষণ ও ঘর্ষণের প্রকারভেদ',
      },
    ],
  },
  {
    id: 'ch-work',
    subjectId: 'sub-ssc-phy',
    orderIndex: 4,
    titleBangla: 'কাজ, ক্ষমতা ও শক্তি (Work, Power & Energy)',
    topics: [
      {
        id: 'topic-work-1',
        chapterId: 'ch-work',
        orderIndex: 1,
        titleBangla: 'কাজের ধারণা, সমীকরণ ও প্রকারভেদ',
      },
      {
        id: 'topic-work-2',
        chapterId: 'ch-work',
        orderIndex: 2,
        titleBangla: 'বিভব শক্তি ও গতিশক্তি',
      },
      {
        id: 'topic-work-3',
        chapterId: 'ch-work',
        orderIndex: 3,
        titleBangla: 'শক্তির নিত্যতা নীতি ও কর্মদক্ষতা',
      },
    ],
  },
];

export default function CurriculumPage() {
  const params = useParams();
  const subjectId = (params?.subjectId as string) || 'sub-ssc-phy';
  const [chapters, setChapters] = useState<ChapterItem[]>(DEFAULT_CHAPTERS);

  useEffect(() => {
    async function fetchChapters() {
      try {
        const res = await apiClient.get<ChapterItem[]>(`/curriculum/subjects/${subjectId}/chapters`);
        if (res && Array.isArray(res) && res.length > 0) {
          setChapters(res);
        }
      } catch {
        // Keep default chapters
      }
    }
    fetchChapters();
  }, [subjectId]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
          <Link href="/subjects" className="hover:underline">
            বিষয়সমূহ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>কারিকুলাম সূচি</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          অধ্যায় ও টপিক সিলেবাস
        </h1>
        <p className="text-sm text-slate-600">
          প্রতিটি অধ্যায়ের টপিকভিত্তিক লেসন পড়ুন, ৬-স্তরের ব্যাখ্যার সাথে MCQ অনুশীলন করুন এবং শেষে মডেল টেস্ট দিন।
        </p>
      </div>

      {/* Chapters list */}
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Chapter Header */}
            <div className="bg-slate-50/80 p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {toBanglaDigits(chapter.orderIndex)}
                </span>
                <div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                    অধ্যায় {toBanglaDigits(chapter.orderIndex)}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">{chapter.titleBangla}</h2>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <Link
                  href={`/practice/${chapter.id}`}
                  className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors border border-indigo-200"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>MCQ প্র্যাকটিস</span>
                </Link>
                <Link
                  href={`/exam/${chapter.id}`}
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>মডেল টেস্ট</span>
                </Link>
              </div>
            </div>

            {/* Topics List */}
            <div className="divide-y divide-slate-100">
              {chapter.topics.map((topic, index) => (
                <Link
                  key={topic.id}
                  href={`/lesson/${topic.id}`}
                  className="p-4 px-5 flex items-center justify-between hover:bg-indigo-50/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-medium w-5">
                      {toBanglaDigits(chapter.orderIndex)}.{toBanglaDigits(index + 1)}
                    </span>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {topic.titleBangla}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-indigo-600">
                    <span className="hidden sm:inline">লেসন পড়ুন</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
