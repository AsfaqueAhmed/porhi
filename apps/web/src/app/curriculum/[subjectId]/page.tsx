'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, ChevronRight, ChevronDown, Play, Trophy, Layers, CheckSquare } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { toBanglaDigits } from '@/lib/formatters';
import { useLanguageStore } from '@/store/language-store';
import { DEFAULT_CHAPTERS, ChapterItem, TopicItem } from '@/lib/curriculum-data';
import { CurriculumPageSkeleton } from '@/components/ui/shimmer';

export default function CurriculumPage() {
  const params = useParams();
  const subjectId = (params?.subjectId as string) || 'sub_ssc_physics';
  const { tr, language } = useLanguageStore();
  const [chapters, setChapters] = useState<ChapterItem[]>(DEFAULT_CHAPTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchChapters() {
      setIsLoading(true);
      try {
        const res = await apiClient.get<ChapterItem[]>(`/curriculum/subjects/${subjectId}/chapters`);
        if (res && Array.isArray(res) && res.length > 0) {
          setChapters(res);
        }
      } catch {
        // Keep default chapters
      } finally {
        setIsLoading(false);
      }
    }
    fetchChapters();
  }, [subjectId]);

  const toggleChapter = (chapterId: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setCollapsedIds(new Set());
  };

  const collapseAll = () => {
    setCollapsedIds(new Set(chapters.map((c) => c.id)));
  };

  const totalTopics = chapters.reduce((acc, c) => acc + (c.topics?.length || 0), 0);
  const allCollapsed = chapters.length > 0 && collapsedIds.size === chapters.length;

  if (isLoading) {
    return <CurriculumPageSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
          <Link href="/subjects" className="hover:underline">
            {tr('বিষয়সমূহ', 'Subjects')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{tr('কারিকুলাম সূচি', 'Curriculum Index')}</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
          {tr('অধ্যায় ও টপিক সিলেবাস', 'Chapter & Topic Syllabus')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {tr(
            'প্রতিটি অধ্যায়ের টপিকভিত্তিক লেসন পড়ুন, ৬-স্তরের ব্যাখ্যার সাথে MCQ অনুশীলন করুন এবং শেষে মডেল টেস্ট দিন।',
            'Read topic-wise lessons, practice MCQs with 6-layer explanations, and take chapter model tests.'
          )}
        </p>
      </div>

      {/* Toolbar: Stats & Expand/Collapse All */}
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>
            {language === 'bn' ? toBanglaDigits(chapters.length) : chapters.length}{' '}
            {tr('টি অধ্যায়', ' Chapters')} •{' '}
            {language === 'bn' ? toBanglaDigits(totalTopics) : totalTopics}{' '}
            {tr('টি টপিক', ' Topics')}
          </span>
        </div>

        <button
          type="button"
          onClick={allCollapsed ? expandAll : collapseAll}
          className="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors"
        >
          {allCollapsed
            ? tr('সবগুলো খুলুন (Expand All)', 'Expand All')
            : tr('সবগুলো সঙ্কুচিত করুন (Collapse All)', 'Collapse All')}
        </button>
      </div>

      {/* Chapters list */}
      <div className="space-y-3 sm:space-y-4">
        {chapters.map((chapter) => {
          const isCollapsed = collapsedIds.has(chapter.id);
          const topicCount = chapter.topics?.length || 0;

          return (
            <div
              key={chapter.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
            >
              {/* Collapsible Chapter Header */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggleChapter(chapter.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleChapter(chapter.id);
                  }
                }}
                aria-expanded={!isCollapsed}
                className="bg-slate-50/90 hover:bg-slate-100/80 p-3.5 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-600 text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                    {language === 'bn' ? toBanglaDigits(chapter.orderIndex) : chapter.orderIndex}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">
                        {tr('অধ্যায় ', 'Chapter ')}
                        {language === 'bn' ? toBanglaDigits(chapter.orderIndex) : chapter.orderIndex}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                        {language === 'bn' ? toBanglaDigits(topicCount) : topicCount} {tr('টপিক', 'topics')}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                      {chapter.titleBangla}
                    </h2>
                  </div>
                </div>

                {/* Action buttons & Collapse Icon */}
                <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                  <Link
                    href={`/practice/${chapter.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-colors border border-indigo-200"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{tr('MCQ প্র্যাকটিস', 'MCQ Practice')}</span>
                  </Link>

                  <Link
                    href={`/exam/${chapter.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-colors"
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tr('মডেল টেস্ট', 'Model Test')}</span>
                  </Link>

                  {/* Accordion Chevron */}
                  <div className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors">
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                        isCollapsed ? '-rotate-90' : 'rotate-0'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Topics List (Collapsible Body) */}
              {!isCollapsed && (
                <div className="divide-y divide-slate-100 animate-in fade-in duration-200">
                  {chapter.topics.map((topic, index) => (
                    <Link
                      key={topic.id}
                      href={`/lesson/${topic.id}`}
                      className="p-3.5 sm:p-4 px-4 sm:px-5 flex items-center justify-between hover:bg-indigo-50/40 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <span className="text-xs text-slate-400 font-medium w-6 shrink-0">
                          {language === 'bn'
                            ? `${toBanglaDigits(chapter.orderIndex)}.${toBanglaDigits(index + 1)}`
                            : `${chapter.orderIndex}.${index + 1}`}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                          {topic.titleBangla}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-400 group-hover:text-indigo-600 shrink-0">
                        <span className="hidden sm:inline">{tr('লেসন পড়ুন', 'Read Lesson')}</span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
