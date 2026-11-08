'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Clock, BookMarked, ArrowRight } from 'lucide-react';
import { useUserStore, ActiveSubject } from '@/store/user-store';
import { apiClient } from '@/lib/api-client';
import { toBanglaDigits } from '@/components/navigation/persistent-nav';

interface SubjectItem {
  id: string;
  code: string;
  nameBangla: string;
  syllabusYear: number;
  classLevel: string;
  isReady: boolean;
  program?: string;
}

const DEFAULT_SUBJECTS: SubjectItem[] = [
  {
    id: 'sub-ssc-phy',
    code: 'PHY-SSC',
    nameBangla: 'পদার্থবিজ্ঞান',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: true,
  },
  {
    id: 'sub-ssc-chem',
    code: 'CHEM-SSC',
    nameBangla: 'রসায়ন',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: true,
  },
  {
    id: 'sub-ssc-math',
    code: 'GMATH-SSC',
    nameBangla: 'সাধারণ গণিত',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: false,
  },
  {
    id: 'sub-ssc-hmath',
    code: 'HMATH-SSC',
    nameBangla: 'উচ্চতর গণিত',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: false,
  },
  {
    id: 'sub-ssc-bio',
    code: 'BIO-SSC',
    nameBangla: 'জীববিজ্ঞান',
    syllabusYear: 2026,
    classLevel: 'CLASS_9_10',
    program: 'SSC',
    isReady: false,
  },
  {
    id: 'sub-hsc-phy',
    code: 'PHY-HSC',
    nameBangla: 'পদার্থবিজ্ঞান ১ম ও ২য় পত্র',
    syllabusYear: 2026,
    classLevel: 'CLASS_11_12',
    program: 'HSC',
    isReady: false,
  },
];

export default function SubjectsPage() {
  const router = useRouter();
  const { activeSubject, setActiveSubject } = useUserStore();
  const [subjects, setSubjects] = useState<SubjectItem[]>(DEFAULT_SUBJECTS);
  const [filter, setFilter] = useState<'ALL' | 'SSC' | 'HSC'>('ALL');

  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await apiClient.get<SubjectItem[]>('/curriculum/subjects');
        if (data && Array.isArray(data) && data.length > 0) {
          setSubjects(
            data.map((s) => ({
              ...s,
              program: s.classLevel === 'CLASS_11_12' ? 'HSC' : 'SSC',
            }))
          );
        }
      } catch {
        // Keep default subjects
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
    if (filter === 'ALL') return true;
    return s.program === filter;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            বিষয় ক্যাটালগ
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            তোমার প্রয়োজনীয় বিষয়টি নির্বাচন করে কারিকুলাম ও অনুশীলন শুরু করো।
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-slate-200/70 p-1 rounded-xl self-start">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সকল বিষয়
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

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSubjects.map((item) => {
          const isSelected = activeSubject?.id === item.id;
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
                      {item.program} • {toBanglaDigits(item.syllabusYear)}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{item.nameBangla}</h3>
                  </div>
                </div>

                {/* Status Badge */}
                {item.isReady ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>প্রস্তুত</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
                    <Clock className="w-3.5 h-3.5" />
                    <span>শীঘ্রই আসছে</span>
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {item.isReady ? (
                  <>
                    <span className="text-slate-500">
                      {isSelected ? 'বর্তমানে সক্রিয় বিষয়' : 'কারিকুলাম ও অধ্যায়সমূহ দেখুন'}
                    </span>
                    <span className="font-bold text-indigo-600 flex items-center gap-1">
                      প্রবেশ করো <ArrowRight className="w-3 h-3" />
                    </span>
                  </>
                ) : (
                  <span className="text-slate-400">বিষয়বস্তু সম্পাদনার কাজ প্রক্রিয়াধীন</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
