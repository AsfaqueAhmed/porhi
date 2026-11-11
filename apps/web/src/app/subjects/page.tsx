'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Clock, BookMarked, ArrowRight, Search, Layers, BookOpen } from 'lucide-react';
import { useUserStore, ActiveSubject } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import { apiClient } from '@/lib/api-client';
import { toBanglaDigits } from '@/lib/formatters';
import { DEFAULT_CHAPTERS } from '@/lib/curriculum-data';
import { SubjectsPageSkeleton } from '@/components/ui/shimmer';

interface SubjectItem {
  id: string;
  code: string;
  nameBangla: string;
  syllabusYear: number;
  classLevel: string;
  isReady: boolean;
  program?: string;
  chapterCount?: number;
  topicCount?: number;
}

const DEFAULT_PHYSICS_CHAPTER_COUNT = DEFAULT_CHAPTERS.length;
const DEFAULT_PHYSICS_TOPIC_COUNT = DEFAULT_CHAPTERS.reduce((sum, ch) => sum + ch.topics.length, 0);

const DEFAULT_SUBJECTS: SubjectItem[] = [
  {
    id: 'sub-ssc-phy',
    code: 'PHY-SSC',
    nameBangla: 'পদার্থবিজ্ঞান',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: true,
    chapterCount: DEFAULT_PHYSICS_CHAPTER_COUNT,
    topicCount: DEFAULT_PHYSICS_TOPIC_COUNT,
  },
  {
    id: 'sub-ssc-chem',
    code: 'CHEM-SSC',
    nameBangla: 'রসায়ন',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: true,
    chapterCount: 12,
    topicCount: 72,
  },
  {
    id: 'sub-ssc-math',
    code: 'GMATH-SSC',
    nameBangla: 'সাধারণ গণিত',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: false,
    chapterCount: 17,
    topicCount: 95,
  },
  {
    id: 'sub-ssc-hmath',
    code: 'HMATH-SSC',
    nameBangla: 'উচ্চতর গণিত',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: false,
    chapterCount: 14,
    topicCount: 78,
  },
  {
    id: 'sub-ssc-bio',
    code: 'BIO-SSC',
    nameBangla: 'জীববিজ্ঞান',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: false,
    chapterCount: 14,
    topicCount: 84,
  },
  {
    id: 'sub-hsc-phy',
    code: 'PHY-HSC',
    nameBangla: 'পদার্থবিজ্ঞান ১ম ও ২য় পত্র',
    syllabusYear: 2026,
    classLevel: 'CLASS_11_12',
    program: 'HSC',
    isReady: false,
    chapterCount: 21,
    topicCount: 140,
  },
];

export default function SubjectsPage() {
  const router = useRouter();
  const { activeSubject, setActiveSubject, completedTopics } = useUserStore();
  const { tr, language } = useLanguageStore();
  const [subjects, setSubjects] = useState<SubjectItem[]>(DEFAULT_SUBJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'SSC' | 'HSC'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadSubjects() {
      setIsLoading(true);
      try {
        const data = await apiClient.get<SubjectItem[]>('/curriculum/subjects');
        if (data && Array.isArray(data) && data.length > 0) {
          setSubjects(
            data.map((s) => ({
              ...s,
              program: s.classLevel === 'CLASS_11_12' ? 'HSC' : 'SSC',
              chapterCount:
                s.chapterCount ??
                (s.code.toLowerCase().includes('phy') ? DEFAULT_PHYSICS_CHAPTER_COUNT : 12),
              topicCount:
                s.topicCount ??
                (s.code.toLowerCase().includes('phy') ? DEFAULT_PHYSICS_TOPIC_COUNT : 72),
            }))
          );
        }
      } catch {
        // Keep default subjects
      } finally {
        setIsLoading(false);
      }
    }
    loadSubjects();
  }, []);

  const handleSelectSubject = (s: SubjectItem) => {
    if (!s.isReady) return;
    const selected: ActiveSubject = {
      id: s.id,
      code: s.code,
      nameBangla: s.nameBangla,
      syllabusYear: s.syllabusYear,
      program: s.program || (s.classLevel === 'CLASS_11_12' ? 'HSC' : 'SSC'),
    };
    setActiveSubject(selected);
    router.push(`/curriculum/${s.id}`);
  };

  const filteredSubjects = subjects.filter((s) => {
    const matchesProgram = filter === 'ALL' || s.program === filter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      s.nameBangla.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      (s.program || '').toLowerCase().includes(q);
    return matchesProgram && matchesQuery;
  });

  if (isLoading) {
    return <SubjectsPageSkeleton />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tr('বিষয় ক্যাটালগ', 'Subject Catalog')}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {tr(
              'তোমার প্রয়োজনীয় বিষয়টি নির্বাচন করে কারিকুলাম ও অনুশীলন শুরু করো।',
              'Select your subject to explore curriculum and start practicing.'
            )}
          </p>
        </div>

        {/* Search & Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tr('বিষয় খুঁজুন...', 'Search subject...')}
              className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
            />
          </div>

          <div className="flex bg-slate-200/70 p-1 rounded-xl self-start">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tr('সকল বিষয়', 'All Subjects')}
            </button>
            <button
              onClick={() => setFilter('SSC')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'SSC' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SSC
            </button>
            <button
              onClick={() => setFilter('HSC')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'HSC' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              HSC
            </button>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSubjects.map((item) => {
          const isSelected =
            activeSubject?.id === item.id ||
            (activeSubject?.id === 'sub_ssc_physics' && item.id === 'sub-ssc-phy');
          const chaptersCount = item.chapterCount || DEFAULT_PHYSICS_CHAPTER_COUNT;
          const topicsCount = item.topicCount || DEFAULT_PHYSICS_TOPIC_COUNT;
          const isPhysics =
            item.id.includes('phy') && item.program === 'SSC';
          const completedForSubject = isPhysics ? completedTopics.length : 0;
          const progressPct =
            topicsCount > 0 ? Math.min(100, Math.round((completedForSubject / topicsCount) * 100)) : 0;

          return (
            <div
              key={item.id}
              onClick={() => handleSelectSubject(item)}
              className={`p-5 rounded-2xl border transition-all ${
                item.isReady
                  ? 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md cursor-pointer'
                  : 'bg-slate-50/80 border-slate-200/60 opacity-80 cursor-not-allowed'
              } ${isSelected ? 'ring-2 ring-indigo-600' : ''}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      item.isReady
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'bg-slate-200/60 text-slate-400'
                    }`}
                  >
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {item.program} • {language === 'bn' ? toBanglaDigits(item.syllabusYear) : item.syllabusYear}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{item.nameBangla}</h3>
                  </div>
                </div>

                {/* Status Badge */}
                {item.isReady ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{tr('প্রস্তুত', 'Ready')}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tr('শীঘ্রই আসছে', 'Coming Soon')}</span>
                  </span>
                )}
              </div>

              {/* Metadata Pills */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-semibold">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  {language === 'bn' ? `${toBanglaDigits(chaptersCount)}টি অধ্যায়` : `${chaptersCount} Chapters`}
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'bn' ? `${toBanglaDigits(topicsCount)}টি টপিক` : `${topicsCount} Topics`}
                </span>
              </div>

              {/* Progress Bar for Ready Subjects */}
              {item.isReady && (
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                    <span>{tr('সিলেবাস অগ্রগতি', 'Syllabus Progress')}</span>
                    <span className="text-indigo-700 font-bold">
                      {language === 'bn' ? `${toBanglaDigits(progressPct)}%` : `${progressPct}%`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {item.isReady ? (
                  <>
                    <span className="text-slate-500">
                      {isSelected
                        ? tr('বর্তমানে সক্রিয় বিষয়', 'Currently active subject')
                        : tr('কারিকুলাম ও অধ্যায়সমূহ দেখুন', 'View curriculum & chapters')}
                    </span>
                    <span className="font-bold text-indigo-600 flex items-center gap-1">
                      {tr('প্রবেশ করো', 'Enter')} <ArrowRight className="w-3 h-3" />
                    </span>
                  </>
                ) : (
                  <span className="text-slate-400">
                    {tr('বিষয়বস্তু সম্পাদনার কাজ প্রক্রিয়াধীন', 'Content authoring in progress')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
