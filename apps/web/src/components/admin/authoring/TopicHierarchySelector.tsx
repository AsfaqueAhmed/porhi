'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { useLanguageStore } from '@/store/language-store';
import type { ChapterOption, SubjectOption } from './authoring-helpers';

export interface TopicHierarchySelectorProps {
  subjects: SubjectOption[];
  chapters: ChapterOption[];
  availableTopics: { id: string; titleBangla: string }[];
  activeSubjectId: string;
  selectedChapterId: string;
  selectedTopicId: string;
  onSubjectChange: (subjectId: string) => void;
  onChapterChange: (chapterId: string) => void;
  onTopicChange: (topicId: string) => void;
}

export function TopicHierarchySelector({
  subjects,
  chapters,
  availableTopics,
  activeSubjectId,
  selectedChapterId,
  selectedTopicId,
  onSubjectChange,
  onChapterChange,
  onTopicChange,
}: TopicHierarchySelectorProps) {
  const tr = useLanguageStore((s) => s.tr);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {tr('কারিকুলাম টপিক নির্বাচন', 'Curriculum Topic Selection')}
            </h3>
            <p className="text-[11px] text-slate-500">
              {tr(
                'বিষয়, অধ্যায় ও নির্দিষ্ট টপিক নির্বাচন করে কন্টেন্ট ট্যাগিং নিশ্চিত করুন।',
                'Select subject, chapter, and topic to tag your educational content accurately.',
              )}
            </p>
          </div>
        </div>

        {selectedTopicId && (
          <div className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg font-mono self-start sm:self-auto">
            {tr('টপিক আইডি:', 'Topic ID:')} <span className="font-bold text-indigo-700">{selectedTopicId}</span>
          </div>
        )}
      </div>

      {/* 3 Dropdowns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dropdown 1: বিষয় (Subject) */}
        <div>
          <label
            htmlFor="authoring-subject-select"
            className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>{tr('১. বিষয় (Subject)', '1. Subject')}</span>
          </label>
          <select
            id="authoring-subject-select"
            value={activeSubjectId}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full text-xs font-medium p-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all outline-none"
          >
            {subjects.map((sub) => {
              const classLabel =
                sub.classLevel === 'CLASS_9_10'
                  ? 'SSC ৯ম-১০ম'
                  : sub.classLevel === 'HSC' || sub.classLevel === 'CLASS_11_12'
                    ? 'HSC'
                    : sub.classLevel || '';
              return (
                <option key={sub.id} value={sub.id}>
                  {sub.nameBangla} {classLabel ? `(${classLabel})` : ''} •{' '}
                  {sub.syllabusYear || 2026}
                </option>
              );
            })}
          </select>
        </div>

        {/* Dropdown 2: অধ্যায় (Chapter) */}
        <div>
          <label
            htmlFor="authoring-chapter-select"
            className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>{tr('২. অধ্যায় (Chapter)', '2. Chapter')}</span>
          </label>
          <select
            id="authoring-chapter-select"
            value={selectedChapterId}
            onChange={(e) => onChapterChange(e.target.value)}
            className="w-full text-xs font-medium p-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all outline-none"
          >
            {chapters.length === 0 ? (
              <option value="">{tr('অধ্যায় পাওয়া যায়নি...', 'No chapters found...')}</option>
            ) : (
              chapters.map((chap) => (
                <option key={chap.id} value={chap.id}>
                  {chap.titleBangla} ({chap.topics?.length || 0} {tr('টি টপিক', 'topics')})
                </option>
              ))
            )}
          </select>
        </div>

        {/* Dropdown 3: নির্দিষ্ট টপিক (Topic) */}
        <div>
          <label
            htmlFor="authoring-topic-select"
            className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>{tr('৩. নির্দিষ্ট টপিক (Topic)', '3. Topic')}</span>
          </label>
          <select
            id="authoring-topic-select"
            value={selectedTopicId}
            onChange={(e) => onTopicChange(e.target.value)}
            className="w-full text-xs font-medium p-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all outline-none"
          >
            {availableTopics.length === 0 ? (
              <option value="">{tr('(এই অধ্যায়ে কোনো টপিক নেই)', '(No topics in this chapter)')}</option>
            ) : (
              availableTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.titleBangla}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Helpful alert if the selected chapter has no topics */}
      {selectedChapterId && availableTopics.length === 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-xl text-xs text-amber-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-bold">সতর্কতা:</span>
            <span>
              নির্বাচিত অধ্যায়ের অধীনে কোনো টপিক পাওয়া যায়নি। প্রশ্ন বা লেসন সেভ করার পূর্বে টপিক তৈরি করে নিন।
            </span>
          </div>
          <Link
            href="/admin/curriculum"
            className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline shrink-0"
          >
            কারিকুলামে যান ➔
          </Link>
        </div>
      )}
    </div>
  );
}
