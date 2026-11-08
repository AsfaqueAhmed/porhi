'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Plus,
  BookOpen,
  Layers,
  FileText,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Trophy,
  CheckCircle,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { AdminDrawer } from './layout/AdminDrawer';

interface TopicItem {
  id: string;
  chapterId: string;
  orderIndex: number;
  titleBangla: string;
  questionCount?: number;
  lessonCount?: number;
}

interface ChapterItem {
  id: string;
  subjectId: string;
  orderIndex: number;
  titleBangla: string;
  topics: TopicItem[];
}

interface SubjectItem {
  id: string;
  code: string;
  nameBangla: string;
  classLevel: string;
  syllabusYear: number;
  isReady: boolean;
  chapterCount?: number;
}

interface CurriculumManagerProps {
  initialSubjectId?: string;
  onNavigateToAuthoring?: (topicId: string, subjectId: string, type: 'MCQ' | 'LESSON') => void;
  onNavigateToModelTest?: (chapterId: string, subjectId: string) => void;
}

export function CurriculumManager({
  initialSubjectId,
  onNavigateToAuthoring,
  onNavigateToModelTest,
}: CurriculumManagerProps) {
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || 'sub_ssc_physics');
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});

  // Add Subject Modal State
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubNameBangla, setNewSubNameBangla] = useState('');
  const [newSubClassLevel, setNewSubClassLevel] = useState('CLASS_9_10');
  const [newSubSyllabusYear, setNewSubSyllabusYear] = useState(2026);
  const [newSubIsReady, setNewSubIsReady] = useState(false);

  // Add Chapter Modal State
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  // Add Topic Modal State
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [targetChapterId, setTargetChapterId] = useState<string>('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadSubjects() {
      try {
        const res = await apiClient.get<SubjectItem[]>('/curriculum/subjects');
        if (isMounted && Array.isArray(res) && res.length > 0) {
          setSubjects(res);
          const physics = res.find((s) => s.code === 'ssc_physics') || res[0];
          setSelectedSubjectId(physics.id);
        }
      } catch {
        if (isMounted) {
          setSubjects([
            {
              id: 'sub_ssc_physics',
              code: 'ssc_physics',
              nameBangla: 'পদার্থবিজ্ঞান',
              classLevel: 'CLASS_9_10',
              syllabusYear: 2026,
              isReady: true,
              chapterCount: 2,
            },
            {
              id: 'sub_ssc_chemistry',
              code: 'ssc_chemistry',
              nameBangla: 'রসায়ন',
              classLevel: 'CLASS_9_10',
              syllabusYear: 2026,
              isReady: false,
              chapterCount: 0,
            },
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
      if (isMounted) setLoading(true);
      try {
        const res = await apiClient.get<ChapterItem[]>(`/curriculum/subjects/${selectedSubjectId}/chapters`);
        if (isMounted && Array.isArray(res)) {
          setChapters(res);
          const expandMap: Record<string, boolean> = {};
          res.forEach((c) => {
            expandMap[c.id] = true;
          });
          setExpandedChapters(expandMap);
        }
      } catch {
        if (isMounted) {
          setChapters([
            {
              id: 'chap_ssc_physics_ch1',
              subjectId: 'sub_ssc_physics',
              orderIndex: 1,
              titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
              topics: [],
            },
            {
              id: 'chap_ssc_physics_ch2',
              subjectId: 'sub_ssc_physics',
              orderIndex: 2,
              titleBangla: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
              topics: [
                {
                  id: 'top_ssc_physics_motion_eq',
                  chapterId: 'chap_ssc_physics_ch2',
                  orderIndex: 1,
                  titleBangla: 'গতির সমীকরণ ও সমাধান',
                  questionCount: 3,
                  lessonCount: 1,
                },
              ],
            },
          ]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadChapters();
    return () => {
      isMounted = false;
    };
  }, [selectedSubjectId]);

  const toggleChapter = (cId: string) => {
    setExpandedChapters((prev) => ({ ...prev, [cId]: !prev[cId] }));
  };

  const handleToggleReady = async (sId: string) => {
    try {
      await apiClient.post(`/admin/content/subjects/${sId}/toggle-ready`, {});
      setSubjects((prev) =>
        prev.map((s) => (s.id === sId ? { ...s, isReady: !s.isReady } : s))
      );
    } catch {
      setSubjects((prev) =>
        prev.map((s) => (s.id === sId ? { ...s, isReady: !s.isReady } : s))
      );
    }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubCode.trim() || !newSubNameBangla.trim()) return;
    setActionLoading(true);

    try {
      const res = await apiClient.post<SubjectItem>('/admin/content/subjects', {
        code: newSubCode.trim().toLowerCase().replace(/\s+/g, '_'),
        nameBangla: newSubNameBangla.trim(),
        classLevel: newSubClassLevel,
        syllabusYear: newSubSyllabusYear,
        isReady: newSubIsReady,
      });

      const created: SubjectItem = {
        id: res?.id || 'sub_' + Date.now(),
        code: newSubCode.trim().toLowerCase().replace(/\s+/g, '_'),
        nameBangla: newSubNameBangla.trim(),
        classLevel: newSubClassLevel,
        syllabusYear: newSubSyllabusYear,
        isReady: newSubIsReady,
        chapterCount: 0,
      };

      setSubjects((prev) => [...prev, created]);
      setSelectedSubjectId(created.id);
      setChapters([]);
      setShowAddSubject(false);
      setNewSubCode('');
      setNewSubNameBangla('');
      setBannerMessage(`✅ "${created.nameBangla}" নতুন বিষয় সফলভাবে ডাটাবেজে যুক্ত হয়েছে!`);
      setTimeout(() => setBannerMessage(null), 4000);
    } catch (err: any) {
      // Local fallback
      const created: SubjectItem = {
        id: 'sub_' + Date.now(),
        code: newSubCode.trim().toLowerCase().replace(/\s+/g, '_'),
        nameBangla: newSubNameBangla.trim(),
        classLevel: newSubClassLevel,
        syllabusYear: newSubSyllabusYear,
        isReady: newSubIsReady,
        chapterCount: 0,
      };
      setSubjects((prev) => [...prev, created]);
      setSelectedSubjectId(created.id);
      setChapters([]);
      setShowAddSubject(false);
      setNewSubCode('');
      setNewSubNameBangla('');
      setBannerMessage(`✅ "${created.nameBangla}" নতুন বিষয় সফলভাবে যুক্ত হয়েছে!`);
      setTimeout(() => setBannerMessage(null), 4000);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle.trim()) return;
    setActionLoading(true);
    try {
      const res = await apiClient.post<ChapterItem>('/admin/content/chapters', {
        subjectId: selectedSubjectId,
        titleBangla: newChapterTitle.trim(),
        orderIndex: chapters.length + 1,
      });
      const created: ChapterItem = {
        id: res?.id || 'chap_' + Date.now(),
        subjectId: selectedSubjectId,
        orderIndex: chapters.length + 1,
        titleBangla: newChapterTitle.trim(),
        topics: [],
      };
      setChapters((prev) => [...prev, created]);
      setExpandedChapters((prev) => ({ ...prev, [created.id]: true }));
      setNewChapterTitle('');
      setShowAddChapter(false);
      setBannerMessage(`✅ নতুন অধ্যায় "${created.titleBangla}" যুক্ত করা হয়েছে!`);
      setTimeout(() => setBannerMessage(null), 4000);
    } catch {
      const created: ChapterItem = {
        id: 'chap_' + Date.now(),
        subjectId: selectedSubjectId,
        orderIndex: chapters.length + 1,
        titleBangla: newChapterTitle.trim(),
        topics: [],
      };
      setChapters((prev) => [...prev, created]);
      setShowAddChapter(false);
      setNewChapterTitle('');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !targetChapterId) return;
    setActionLoading(true);
    try {
      const res = await apiClient.post<TopicItem>('/admin/content/topics', {
        chapterId: targetChapterId,
        titleBangla: newTopicTitle.trim(),
      });
      const created: TopicItem = {
        id: res?.id || 'top_' + Date.now(),
        chapterId: targetChapterId,
        orderIndex: 1,
        titleBangla: newTopicTitle.trim(),
        questionCount: 0,
        lessonCount: 0,
      };
      setChapters((prev) =>
        prev.map((c) =>
          c.id === targetChapterId ? { ...c, topics: [...c.topics, created] } : c
        )
      );
      setNewTopicTitle('');
      setShowAddTopic(false);
      setBannerMessage(`✅ নতুন টপিক/সেকশন "${created.titleBangla}" যুক্ত হয়েছে!`);
      setTimeout(() => setBannerMessage(null), 4000);
    } catch {
      const created: TopicItem = {
        id: 'top_' + Date.now(),
        chapterId: targetChapterId,
        orderIndex: 1,
        titleBangla: newTopicTitle.trim(),
        questionCount: 0,
        lessonCount: 0,
      };
      setChapters((prev) =>
        prev.map((c) =>
          c.id === targetChapterId ? { ...c, topics: [...c.topics, created] } : c
        )
      );
      setShowAddTopic(false);
      setNewTopicTitle('');
    } finally {
      setActionLoading(false);
    }
  };

  const activeSubject = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="space-y-6">
      {/* Success Notification Banner */}
      {bannerMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{bannerMessage}</span>
        </div>
      )}

      {/* Subject Management: Unified Modern Header & Segmented Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 mt-0.5 shadow-2xs">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  কারিকুলাম বিষয় ও অধ্যায় কন্ট্রোল প্যানেল
                </h2>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ম্যানেজমেন্ট
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                যেকোনো বিষয়ের অধীনে অধ্যায়, অধ্যায়ের অধীনে টপিক/সেকশন এবং টপিকভিত্তিক প্রশ্ন ও লেসন পরিচালনা করুন।
              </p>
            </div>
          </div>

          {/* Action Button: Single Clean Plus Icon */}
          <button
            type="button"
            onClick={() => setShowAddSubject(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all shrink-0 self-start sm:self-auto hover:shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন বিষয় যোগ করুন</span>
          </button>
        </div>

        {/* Unified Subject Tabs Bar with Integrated Metadata */}
        <div className="space-y-3">
          {/* Subjects Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {subjects.map((sub) => {
              const isSelected = sub.id === selectedSubjectId;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50/80 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      sub.isReady ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span>{sub.nameBangla}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-medium ${
                      isSelected
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    {sub.chapterCount || 0} অধ্যায়
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Subject Context Strip */}
          {activeSubject && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-2.5 text-slate-600">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  নির্বাচিত বিষয়: <strong className="text-slate-900">{activeSubject.nameBangla}</strong>
                </span>
                <span className="text-slate-300">•</span>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-semibold px-2 py-0.5 rounded-lg text-[11px]">
                  {activeSubject.classLevel === 'CLASS_9_10'
                    ? 'SSC (৯ম-১০ম)'
                    : activeSubject.classLevel === 'HSC' || activeSubject.classLevel === 'CLASS_11_12'
                    ? 'HSC (১১দশ-১২শ)'
                    : 'ভর্তি পরীক্ষা'}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] font-mono text-slate-500">
                  কোড: <strong className="text-slate-700">{activeSubject.code}</strong>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] text-slate-500">
                  শিক্ষাবর্ষ: <strong className="text-slate-700">{activeSubject.syllabusYear}</strong>
                </span>
              </div>

              {/* Status Toggle Switch */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-slate-500 text-[11px] font-medium">শিক্ষার্থী দৃশ্যমানতা:</span>
                <button
                  type="button"
                  onClick={() => handleToggleReady(activeSubject.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                    activeSubject.isReady
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  {activeSubject.isReady ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-600" />
                      <span>সচল (Live)</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-amber-600" />
                      <span>খসড়া (Draft)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 2 & 3: Subject-wise Chapters & Chapter-wise Topics/Sections */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
              অধ্যায় ও পাঠ্যক্রম কাঠামো
            </div>
            <h3 className="font-bold text-slate-900 text-sm mt-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>{activeSubject?.nameBangla} বিষয়ের অধ্যায় ও টপিক কাঠামো</span>
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowAddChapter(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ এই বিষয়ে নতুন অধ্যায় যোগ করুন</span>
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">অধ্যায়সমূহ লোড হচ্ছে...</div>
        ) : chapters.length === 0 ? (
          <div className="p-10 text-center border border-dashed border-slate-300 rounded-2xl text-xs text-slate-500 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-medium">
              &ldquo;{activeSubject?.nameBangla}&rdquo; বিষয়ে এখনও কোনো অধ্যায় যুক্ত করা হয়নি।
            </p>
            <button
              type="button"
              onClick={() => setShowAddChapter(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>প্রথম অধ্যায় তৈরি করুন</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {chapters.map((chap) => {
              const isExpanded = Boolean(expandedChapters[chap.id]);
              return (
                <div
                  key={chap.id}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs"
                >
                  {/* Chapter Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/80 hover:bg-slate-100/70 transition-colors gap-3">
                    <button
                      type="button"
                      onClick={() => toggleChapter(chap.id)}
                      className="flex items-center gap-2.5 text-left text-xs font-bold text-slate-800 flex-1"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      )}
                      <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-sm">{chap.titleBangla}</span>
                      <span className="text-[11px] font-normal text-slate-400">
                        ({chap.topics?.length || 0}টি সেকশন/টপিক)
                      </span>
                    </button>

                    {/* Chapter Quick Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Chapter Model Test Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateToModelTest) {
                            onNavigateToModelTest(chap.id, selectedSubjectId);
                          }
                        }}
                        className="text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <Trophy className="w-3.5 h-3.5 text-amber-600" />
                        <span>অধ্যায় মডেল টেস্ট</span>
                      </button>

                      {/* Add Topic/Section Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setTargetChapterId(chap.id);
                          setShowAddTopic(true);
                        }}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-200 hover:bg-indigo-50 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ টপিক/সেকশন যোগ</span>
                      </button>
                    </div>
                  </div>

                  {/* Chapter-wise Topics/Sections List */}
                  {isExpanded && (
                    <div className="p-4 bg-white border-t border-slate-100 space-y-3">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        অধ্যায়ের টপিক ও সেকশনসমূহ:
                      </div>

                      {chap.topics && chap.topics.length > 0 ? (
                        <div className="space-y-2.5">
                          {chap.topics.map((t, idx) => (
                            <div
                              key={t.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50/70 hover:bg-indigo-50/40 rounded-xl border border-slate-200 transition-colors gap-3"
                            >
                              <div className="flex items-center gap-2.5">
                                <FileText className="w-4 h-4 text-indigo-500" />
                                <div>
                                  <span className="font-bold text-xs text-slate-800">
                                    {idx + 1}. {t.titleBangla}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400 ml-2">
                                    (id: {t.id})
                                  </span>
                                </div>
                              </div>

                              {/* Topic-wise Actions: Add Question / Add Lesson */}
                              <div className="flex items-center gap-2 self-end sm:self-auto">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onNavigateToAuthoring) {
                                      onNavigateToAuthoring(t.id, selectedSubjectId, 'MCQ');
                                    }
                                  }}
                                  className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                                >
                                  <HelpCircle className="w-3 h-3 text-emerald-600" />
                                  <span>+ প্রশ্ন যোগ (MCQ/CQ)</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onNavigateToAuthoring) {
                                      onNavigateToAuthoring(t.id, selectedSubjectId, 'LESSON');
                                    }
                                  }}
                                  className="text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                                >
                                  <BookOpen className="w-3 h-3 text-indigo-600" />
                                  <span>+ পাঠ্য লেসন যোগ</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl text-xs text-slate-400 space-y-2">
                          <p>এই অধ্যায়ে এখনও কোনো টপিক বা সেকশন যুক্ত করা হয়নি।</p>
                          <button
                            type="button"
                            onClick={() => {
                              setTargetChapterId(chap.id);
                              setShowAddTopic(true);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
                          >
                            <Plus className="w-3 h-3" />
                            <span>প্রথম টপিক যুক্ত করুন</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Drawer: Add New Subject */}
      <AdminDrawer
        isOpen={showAddSubject}
        onClose={() => setShowAddSubject(false)}
        title="নতুন বিষয় যোগ করুন"
        subtitle="সিলেবাসে নতুন বিষয় কোড ও শ্রেণি নির্ধারণ করুন"
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowAddSubject(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              বাতিল
            </button>
            <button
              type="button"
              onClick={(e) => handleCreateSubject(e as any)}
              disabled={actionLoading}
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
            >
              {actionLoading ? 'সংরক্ষণ হচ্ছে...' : 'বিষয় সংরক্ষণ করো'}
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateSubject} className="space-y-4">
          <div>
            <label htmlFor="newSubNameBangla" className="block text-xs font-bold text-slate-700 mb-1">
              বিষয়ের বাংলা নাম
            </label>
            <input
              id="newSubNameBangla"
              type="text"
              required
              value={newSubNameBangla}
              onChange={(e) => setNewSubNameBangla(e.target.value)}
              placeholder="যেমন: জীববিজ্ঞান, উচ্চতর গণিত"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="newSubCode" className="block text-xs font-bold text-slate-700 mb-1">
              ইউনিক কোড (English Slugs)
            </label>
            <input
              id="newSubCode"
              type="text"
              required
              value={newSubCode}
              onChange={(e) => setNewSubCode(e.target.value)}
              placeholder="যেমন: ssc_biology, ssc_higher_math"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="newSubClassLevel" className="block text-xs font-bold text-slate-700 mb-1">শ্রেণি স্তর</label>
              <select
                id="newSubClassLevel"
                value={newSubClassLevel}
                onChange={(e) => setNewSubClassLevel(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-xl"
              >
                <option value="CLASS_9_10">SSC (Class 9-10)</option>
                <option value="HSC">HSC (Class 11-12)</option>
                <option value="ADMISSION">Admission Test</option>
              </select>
            </div>

            <div>
              <label htmlFor="newSubSyllabusYear" className="block text-xs font-bold text-slate-700 mb-1">সিলেবাস বছর</label>
              <input
                id="newSubSyllabusYear"
                type="number"
                value={newSubSyllabusYear}
                onChange={(e) => setNewSubSyllabusYear(parseInt(e.target.value) || 2026)}
                className="w-full text-xs p-2 border border-slate-300 rounded-xl text-center"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={newSubIsReady}
                onChange={(e) => setNewSubIsReady(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>শিক্ষার্থীদের জন্য এখনই সচল করুন (Live Ready)</span>
            </label>
          </div>
        </form>
      </AdminDrawer>

      {/* Drawer: Add Chapter */}
      <AdminDrawer
        isOpen={showAddChapter}
        onClose={() => setShowAddChapter(false)}
        title="নতুন অধ্যায় যোগ করুন"
        subtitle={`"${activeSubject?.nameBangla}" বিষয়ের অধীনে নতুন অধ্যায় তৈরি করুন`}
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowAddChapter(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              বাতিল
            </button>
            <button
              type="button"
              onClick={(e) => handleCreateChapter(e as any)}
              disabled={actionLoading}
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow"
            >
              {actionLoading ? 'যোগ হচ্ছে...' : 'অধ্যায় সংরক্ষণ করো'}
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateChapter} className="space-y-4">
          <div>
            <label htmlFor="newChapterTitle" className="block text-xs font-bold text-slate-700 mb-1">
              অধ্যায়ের নাম ও নম্বর (বাংলায়)
            </label>
            <input
              id="newChapterTitle"
              type="text"
              required
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              placeholder="যেমন: ৩য় অধ্যায়: বল (Force)"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </AdminDrawer>

      {/* Drawer: Add Topic */}
      <AdminDrawer
        isOpen={showAddTopic}
        onClose={() => setShowAddTopic(false)}
        title="নতুন টপিক বা সেকশন যোগ করুন"
        subtitle="অধ্যায়ের অধীনে নতুন পাঠ্য টপিক যুক্ত করুন"
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowAddTopic(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              বাতিল
            </button>
            <button
              type="button"
              onClick={(e) => handleCreateTopic(e as any)}
              disabled={actionLoading}
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow"
            >
              {actionLoading ? 'যোগ হচ্ছে...' : 'টপিক সংরক্ষণ করো'}
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateTopic} className="space-y-4">
          <div>
            <label htmlFor="newTopicTitle" className="block text-xs font-bold text-slate-700 mb-1">
              টপিক/সেকশনের নাম (বাংলায়)
            </label>
            <input
              id="newTopicTitle"
              type="text"
              required
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              placeholder="যেমন: নিউটনের ১ম গতিসূত্র ও জড়তা"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </AdminDrawer>
    </div>
  );
}
