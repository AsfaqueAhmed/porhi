'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Play,
  CheckCircle2,
  Sliders,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { toBanglaDigits } from '@/lib/formatters';
import { useLanguageStore } from '@/store/language-store';

interface SubjectItem {
  id: string;
  code: string;
  nameBangla: string;
}

interface ChapterItem {
  id: string;
  titleBangla: string;
  topics?: { id: string; titleBangla: string }[];
}

interface ModelTestPreset {
  id: string;
  titleBangla: string;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  durationMinutes: number;
  totalQuestions: number;
  negativeRatio: number;
  passPercentage: number;
  createdAt: string;
}

const DEFAULT_PRESETS: ModelTestPreset[] = [
  {
    id: 'preset_phys_ch2_std',
    titleBangla: '২য় অধ্যায়: গতি পূর্ণাঙ্গ মডেল টেস্ট (স্ট্যান্ডার্ড)',
    subjectId: 'sub_ssc_physics',
    subjectName: 'পদার্থবিজ্ঞান',
    chapterId: 'chap_ssc_physics_ch2',
    chapterName: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
    durationMinutes: 15,
    totalQuestions: 15,
    negativeRatio: 0.25,
    passPercentage: 40,
    createdAt: '2026-11-01',
  },
  {
    id: 'preset_phys_ch2_speed',
    titleBangla: 'গতির সমীকরণ স্পিড টেস্ট (Speed Drill)',
    subjectId: 'sub_ssc_physics',
    subjectName: 'পদার্থবিজ্ঞান',
    chapterId: 'chap_ssc_physics_ch2',
    chapterName: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
    durationMinutes: 10,
    totalQuestions: 10,
    negativeRatio: 0.50,
    passPercentage: 60,
    createdAt: '2026-11-04',
  },
];

interface ModelTestManagerProps {
  initialSubjectId?: string;
  initialChapterId?: string;
}

export function ModelTestManager({
  initialSubjectId,
  initialChapterId,
}: ModelTestManagerProps = {}) {
  const { tr, language } = useLanguageStore();
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    initialSubjectId || 'sub_ssc_physics'
  );
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState(
    initialChapterId || 'chap_ssc_physics_ch2'
  );
  const [presets, setPresets] = useState<ModelTestPreset[]>(DEFAULT_PRESETS);

  useEffect(() => {
    if (initialSubjectId) setSelectedSubjectId(initialSubjectId);
  }, [initialSubjectId]);

  useEffect(() => {
    if (initialChapterId) setSelectedChapterId(initialChapterId);
  }, [initialChapterId]);

  // New Model Test Form State
  const [testTitle, setTestTitle] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [totalQuestions, setTotalQuestions] = useState(15);
  const [negativeRatio, setNegativeRatio] = useState(0.25);
  const [passPercentage, setPassPercentage] = useState(40);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadSubjects() {
      try {
        const res = await apiClient.get<SubjectItem[]>('/curriculum/subjects', {
          scope: 'admin',
        });
        if (isMounted && Array.isArray(res) && res.length > 0) {
          setSubjects(res);
          const defaultSub = res.find((s) => s.code === 'ssc_physics') || res[0];
          setSelectedSubjectId(defaultSub.id);
        }
      } catch {
        if (isMounted) {
          setSubjects([
            { id: 'sub_ssc_physics', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
            { id: 'sub_ssc_chemistry', code: 'ssc_chemistry', nameBangla: 'রসায়ন' },
          ]);
        }
      }
    }
    loadSubjects();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (!selectedSubjectId) return;
    async function loadChapters() {
      try {
        const res = await apiClient.get<ChapterItem[]>(
          `/curriculum/subjects/${selectedSubjectId}/chapters`,
          { scope: 'admin' },
        );
        if (isMounted && Array.isArray(res)) {
          setChapters(res);
          if (res.length > 0) {
            setSelectedChapterId(res[0].id);
          }
        }
      } catch {
        if (isMounted) {
          setChapters([
            { id: 'chap_ssc_physics_ch1', titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ' },
            { id: 'chap_ssc_physics_ch2', titleBangla: 'দ্বিতীয় অধ্যায়: গতি (Motion)' },
          ]);
        }
      }
    }
    loadChapters();
    return () => {
      isMounted = false;
    };
  }, [selectedSubjectId]);

  const handleCreatePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) return;

    const sub = subjects.find((s) => s.id === selectedSubjectId);
    const chap = chapters.find((c) => c.id === selectedChapterId);

    const newPreset: ModelTestPreset = {
      id: 'preset_' + Date.now(),
      titleBangla: testTitle.trim(),
      subjectId: selectedSubjectId,
      subjectName: sub?.nameBangla || 'পদার্থবিজ্ঞান',
      chapterId: selectedChapterId,
      chapterName: chap?.titleBangla || 'দ্বিতীয় অধ্যায়: গতি',
      durationMinutes,
      totalQuestions,
      negativeRatio,
      passPercentage,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setPresets([newPreset, ...presets]);
    setSuccessMessage(
      tr(
        `✅ "${newPreset.titleBangla}" মডেল টেস্ট সফলভাবে তৈরি ও কনফিগার করা হয়েছে!`,
        `✅ "${newPreset.titleBangla}" model test created and configured successfully!`
      )
    );
    setShowCreateModal(false);
    setTestTitle('');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-indigo-600" />
            <span>
              {tr(
                'অধ্যায় ও বিষয়ভিত্তিক মডেল টেস্ট কনফিগারেশন',
                'Chapter & Subject-wise Model Test Configuration'
              )}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {tr(
              'শিক্ষার্থীদের জন্য অধ্যায়ভিত্তিক সময়সীমাবদ্ধ পরীক্ষা, নেগেটিভ মার্কিং ও পাস নম্বর নির্ধারণ করুন।',
              'Configure chapter-wise timed exams, negative marking, and pass criteria for students.'
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Sliders className="w-4 h-4" />
          <span>{tr('নতুন মডেল টেস্ট তৈরি করো', '+ Create Model Test')}</span>
        </button>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Preset List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {presets.map((preset) => (
          <div
            key={preset.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md">
                  {preset.subjectName}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">id: {preset.id}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm">{preset.titleBangla}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>{preset.chapterName}</span>
              </p>
            </div>

            {/* Test Rules Badges */}
            <div className="grid grid-cols-4 gap-2 text-center bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">{tr('সময়', 'Duration')}</span>
                <strong className="text-slate-800">
                  {language === 'bn' ? toBanglaDigits(preset.durationMinutes) : preset.durationMinutes} {tr('মি.', 'min')}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{tr('প্রশ্ন', 'Questions')}</span>
                <strong className="text-slate-800">
                  {language === 'bn' ? toBanglaDigits(preset.totalQuestions) : preset.totalQuestions} {tr('টি', 'Q')}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{tr('নেগেটিভ', 'Negative')}</span>
                <strong className="text-rose-600">
                  -{language === 'bn' ? toBanglaDigits(preset.negativeRatio) : preset.negativeRatio}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{tr('পাস মার্ক', 'Pass Mark')}</span>
                <strong className="text-emerald-600">
                  {language === 'bn' ? toBanglaDigits(preset.passPercentage) : preset.passPercentage}%
                </strong>
              </div>
            </div>

            {/* Live Test Run Button */}
            <div className="pt-1 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-400">{tr('তারিখ: ', 'Date: ')}{preset.createdAt}</span>
              <Link
                href={`/exam/${preset.chapterId}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-indigo-600" />
                <span>{tr('লাইভ টেস্ট রান দেখুন', 'View Live Test Run')}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Model Test */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>
                {tr(
                  'নতুন অধ্যায়ভিত্তিক মডেল টেস্ট কনফিগার করুন',
                  'Configure New Chapter-wise Model Test'
                )}
              </span>
            </h3>

            <form onSubmit={handleCreatePreset} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {tr('মডেল টেস্টের নাম', 'Model Test Title')}
                </label>
                <input
                  type="text"
                  required
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  placeholder={tr('যেমন: ২য় অধ্যায়: গতি ফাইনাল মডেল টেস্ট', 'e.g. Chapter 2: Motion Final Model Test')}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tr('বিষয়', 'Subject')}
                  </label>
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nameBangla}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tr('অধ্যায়', 'Chapter')}
                  </label>
                  <select
                    value={selectedChapterId}
                    onChange={(e) => setSelectedChapterId(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    {chapters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.titleBangla}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {tr('সময় (মিনিট)', 'Duration (min)')}
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 15)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {tr('মোট প্রশ্ন', 'Total Qs')}
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(parseInt(e.target.value) || 15)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {tr('নেগেটিভ মার্ক', 'Negative Mark')}
                  </label>
                  <select
                    value={negativeRatio}
                    onChange={(e) => setNegativeRatio(parseFloat(e.target.value) || 0.25)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg text-center bg-white"
                  >
                    <option value={0.0}>{tr('০ (নেই)', '0 (None)')}</option>
                    <option value={0.25}>{tr('০.২৫', '0.25')}</option>
                    <option value={0.5}>{tr('০.৫০', '0.50')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {tr('পাস মার্ক %', 'Pass Mark %')}
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={80}
                    value={passPercentage}
                    onChange={(e) => setPassPercentage(parseInt(e.target.value) || 40)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg text-center"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  {tr('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm"
                >
                  {tr('মডেল টেস্ট সংরক্ষণ করো', 'Save Model Test')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
