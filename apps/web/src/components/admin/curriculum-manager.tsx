'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Plus,
  BookOpen,
  Eye,
  Layers,
  FileText,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Trophy,
  CheckCircle,
  Search,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { apiClient, ApiError } from '@/lib/api-client';
import { useAdminAuthStore, type AdminPortalRole } from '@/store/admin-auth-store';
import { useLanguageStore } from '@/store/language-store';
import { AdminDrawer } from './layout/AdminDrawer';

type MutationPermissionScope = 'ADMIN_ONLY' | 'EDITOR_OR_ADMIN';

function formatApiErrorMessage(
  err: ApiError,
  requiredScope: MutationPermissionScope = 'ADMIN_ONLY',
): string {
  if (err.status === 401) {
    return 'সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।';
  }
  if (err.status === 403) {
    return requiredScope === 'EDITOR_OR_ADMIN'
      ? 'এই কাজটি করার অনুমতি নেই (Editor বা Admin অধিকার প্রয়োজন)।'
      : 'এই কাজটি করার অনুমতি নেই (Admin অধিকার প্রয়োজন)।';
  }
  if (err.status === 409) {
    return 'এই কোড বা তথ্য ইতোমধ্যে সংরক্ষিত আছে।';
  }
  return 'সার্ভারে সংরক্ষণ ব্যর্থ হয়েছে। অনুগ্রহ করে তথ্য যাচাই করুন।';
}

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

const DEFAULT_SUBJECTS: SubjectItem[] = [
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
];

export interface CurriculumManagerProps {
  userRole?: AdminPortalRole;
  initialSubjectId?: string;
  onNavigateToAuthoring?: (topicId: string, subjectId: string, type: 'MCQ' | 'LESSON') => void;
  onNavigateToLessons?: (topicId: string, subjectId: string) => void;
  onNavigateToModelTest?: (chapterId: string, subjectId: string) => void;
}

export function CurriculumManager({
  userRole,
  initialSubjectId,
  onNavigateToAuthoring,
  onNavigateToLessons,
  onNavigateToModelTest,
}: CurriculumManagerProps) {
  const tr = useLanguageStore((s) => s.tr);
  const adminUser = useAdminAuthStore((s) => s.adminUser);
  const role = userRole ?? adminUser?.role;
  const isAdmin = role ? role === 'ADMIN' : true;
  const canEdit = role ? role === 'ADMIN' || role === 'EDITOR' : true;

  const [subjects, setSubjects] = useState<SubjectItem[]>(DEFAULT_SUBJECTS);
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [subjectSearchQuery, setSubjectSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadSubjects() {
      try {
        const res = await apiClient.get<SubjectItem[]>('/curriculum/subjects', {
          scope: 'admin',
        });
        if (isMounted && Array.isArray(res) && res.length > 0) {
          setSubjects(res);
          const preferred =
            (initialSubjectId && res.find((s) => s.id === initialSubjectId)) ||
            res.find((s) => s.code === 'ssc_physics') ||
            res[0];
          setSelectedSubjectId(preferred.id);
        }
      } catch {
        if (isMounted) {
          setSubjects(DEFAULT_SUBJECTS);
        }
      }
    }
    loadSubjects();
    return () => {
      isMounted = false;
    };
  }, [initialSubjectId]);

  useEffect(() => {
    let isMounted = true;
    if (!selectedSubjectId) return;
    async function loadChapters() {
      if (isMounted) setLoading(true);
      try {
        const res = await apiClient.get<ChapterItem[]>(
          `/curriculum/subjects/${selectedSubjectId}/chapters`,
          { scope: 'admin' },
        );
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
    setErrorMessage(null);
    setBannerMessage(null);
    try {
      await apiClient.post(`/admin/content/subjects/${sId}/toggle-ready`, {});
      setSubjects((prev) =>
        prev.map((s) => (s.id === sId ? { ...s, isReady: !s.isReady } : s))
      );
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setErrorMessage(formatApiErrorMessage(err, 'ADMIN_ONLY'));
        return;
      }
      setSubjects((prev) =>
        prev.map((s) => (s.id === sId ? { ...s, isReady: !s.isReady } : s))
      );
    }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setBannerMessage(null);
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
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setErrorMessage(formatApiErrorMessage(err, 'ADMIN_ONLY'));
        setShowAddSubject(false);
        return;
      }
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
    setErrorMessage(null);
    setBannerMessage(null);
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
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setErrorMessage(formatApiErrorMessage(err, 'EDITOR_OR_ADMIN'));
        setShowAddChapter(false);
        return;
      }
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
    setErrorMessage(null);
    setBannerMessage(null);
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
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setErrorMessage(formatApiErrorMessage(err, 'EDITOR_OR_ADMIN'));
        setShowAddTopic(false);
        return;
      }
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

  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  const filteredSubjects = subjects.filter((s) => {
    const query = subjectSearchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      s.nameBangla.toLowerCase().includes(query) ||
      s.code.toLowerCase().includes(query) ||
      s.classLevel.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Error Notification Banner */}
      {errorMessage && (
        <div
          role="alert"
          className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2 shadow-xs"
        >
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Notification Banner */}
      {bannerMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{bannerMessage}</span>
        </div>
      )}

      {/* Section 1: Subject Directory & Enterprise Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {tr('কারিকুলাম কনফিগারেশন', 'Curriculum Configuration')}
              </span>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                {subjects.length}{tr('টি বিষয় নথিভুক্ত', ' subjects listed')}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-indigo-600" />
              <span>{tr('কারিকুলাম বিষয় ও অধ্যায় কন্ট্রোল প্যানেল', 'Curriculum Subjects & Chapters Control Panel')}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {tr(
                'সকল বিষয়ের তালিকা, সিলেবাসের বছর, অধ্যায় সংখ্যা এবং শিক্ষার্থী দৃশ্যমানতা পরিচালনা করুন।',
                'Manage all subjects, syllabus years, chapter counts, and student visibility.',
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
            {/* Search Input Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={subjectSearchQuery}
                onChange={(e) => setSubjectSearchQuery(e.target.value)}
                placeholder={tr('বিষয় খুঁজুন...', 'Search subject...')}
                className="pl-8.5 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-44 sm:w-56 transition-all"
              />
            </div>

            {/* "+ Add New Subject" Action Button - ADMIN only */}
            {isAdmin && (
              <button
                type="button"
                onClick={() => setShowAddSubject(true)}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{tr('+ নতুন বিষয় যোগ করুন', '+ Add New Subject')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Subjects List / Data Table */}
        <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white">
          {/* Table Header (Visible on Desktop) */}
          <div className="hidden md:grid md:grid-cols-12 gap-3 px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-4">{tr('বিষয় ও পরিচিতি', 'Subject & Details')}</div>
            <div className="col-span-3">{tr('শ্রেণী ও সিলেবাস বছর', 'Class & Syllabus Year')}</div>
            <div className="col-span-2">{tr('অধ্যায় সংখ্যা', 'Chapters')}</div>
            <div className="col-span-3 text-right">{tr('দৃশ্যমানতা ও নিয়ন্ত্রণ', 'Visibility & Control')}</div>
          </div>

          {/* Subjects Rows */}
          {filteredSubjects.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              {tr('কোনো বিষয় পাওয়া যায়নি।', 'No subjects found.')}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredSubjects.map((sub) => {
                const isSelected = sub.id === selectedSubjectId;
                const chapterCountDisplay =
                  sub.id === selectedSubjectId
                    ? chapters.length
                    : (sub.chapterCount ?? 0);

                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubjectId(sub.id)}
                    className={`p-4 transition-all flex flex-col md:grid md:grid-cols-12 gap-3 md:items-center cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/50 border-l-4 border-l-indigo-600 shadow-2xs'
                        : 'bg-white hover:bg-slate-50/70 border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* Subject Avatar & Bengali Name + Code */}
                    <div className="col-span-4 flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {sub.nameBangla.slice(0, 1)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-sm text-slate-900 truncate">
                            {sub.nameBangla}
                          </span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                              <span>{tr('সক্রিয় বিষয়', 'Active Subject')}</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 block mt-0.5 truncate">
                          id: {sub.id} • {tr('কোড:', 'Code:')} {sub.code}
                        </span>
                      </div>
                    </div>

                    {/* Class Level & Syllabus Year */}
                    <div className="col-span-3 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-lg text-[11px]">
                        {sub.classLevel === 'CLASS_9_10'
                          ? tr('SSC (৯ম-১০ম)', 'SSC (Class 9-10)')
                          : sub.classLevel === 'HSC' || sub.classLevel === 'CLASS_11_12'
                          ? tr('HSC (১১দশ-১২শ)', 'HSC (Class 11-12)')
                          : tr('ভর্তি পরীক্ষা', 'Admission')}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        • {sub.syllabusYear} {tr('শিক্ষাবর্ষ', 'Syllabus Year')}
                      </span>
                    </div>

                    {/* Chapter Count */}
                    <div className="col-span-2 flex items-center gap-1.5 text-xs text-slate-600">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-bold text-slate-800">{chapterCountDisplay}{tr('টি', '')}</span>
                      <span className="text-slate-500 text-[11px]">{tr('অধ্যায়', 'Chapters')}</span>
                    </div>

                    {/* Visibility Switch & Select/View Chapters Button */}
                    <div className="col-span-3 flex items-center justify-between md:justify-end gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                      {/* Live / Draft Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleReady(sub.id);
                        }}
                        title={sub.isReady ? tr('শিক্ষার্থীদের জন্য সচল', 'Active for students') : tr('খসড়া অবস্থায় সংরক্ষিত', 'Saved as draft')}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors border ${
                          sub.isReady
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                        }`}
                      >
                        {sub.isReady ? (
                          <>
                            <ToggleRight className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{tr('সচল (Live)', 'Live')}</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>{tr('খসড়া (Draft)', 'Draft')}</span>
                          </>
                        )}
                      </button>

                      {/* Select / View Chapters Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubjectId(sub.id);
                        }}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-2xs shrink-0 ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <span>{isSelected ? tr('অধ্যায় সক্রিয় ✓', 'Active Chapters ✓') : tr('অধ্যায় দেখুন', 'View Chapters')}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Section 2 & 3: Subject-wise Chapters & Chapter-wise Topics/Sections */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
              {tr('অধ্যায় ও পাঠ্যক্রম কাঠামো', 'Chapters & Curriculum Structure')}
            </div>
            <h3 className="font-bold text-slate-900 text-sm mt-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>{activeSubject?.nameBangla} {tr('বিষয়ের অধ্যায় ও টপিক কাঠামো', 'Chapters & Topics Structure')}</span>
            </h3>
          </div>

          {canEdit && (
            <button
              type="button"
              onClick={() => setShowAddChapter(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{tr('+ এই বিষয়ে নতুন অধ্যায় যোগ করুন', '+ Add New Chapter')}</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">{tr('অধ্যায়সমূহ লোড হচ্ছে...', 'Loading chapters...')}</div>
        ) : chapters.length === 0 ? (
          <div className="p-10 text-center border border-dashed border-slate-300 rounded-2xl text-xs text-slate-500 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-medium">
              &ldquo;{activeSubject?.nameBangla}&rdquo; {tr('বিষয়ে এখনও কোনো অধ্যায় যুক্ত করা হয়নি।', 'has no chapters added yet.')}
            </p>
            {canEdit && (
              <button
                type="button"
                onClick={() => setShowAddChapter(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>{tr('প্রথম অধ্যায় তৈরি করুন', 'Create First Chapter')}</span>
              </button>
            )}
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
                        ({chap.topics?.length || 0}{tr('টি সেকশন/টপিক', ' topics/sections')})
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
                        <span>{tr('অধ্যায় মডেল টেস্ট', 'Chapter Model Test')}</span>
                      </button>

                      {/* Add Topic/Section Button - canEdit only */}
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => {
                            setTargetChapterId(chap.id);
                            setShowAddTopic(true);
                          }}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-200 hover:bg-indigo-50 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{tr('+ টপিক/সেকশন যোগ', '+ Add Topic')}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Chapter-wise Topics/Sections List */}
                  {isExpanded && (
                    <div className="p-4 bg-white border-t border-slate-100 space-y-3">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {tr('অধ্যায়ের টপিক ও সেকশনসমূহ:', 'Chapter Topics & Sections:')}
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

                              {/* Topic-wise Actions: Add Question / View Lessons / Add Lesson */}
                              <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                                {canEdit && (
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
                                    <span>{tr('+ প্রশ্ন যোগ (MCQ/CQ)', '+ Add Question (MCQ/CQ)')}</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onNavigateToLessons) {
                                      onNavigateToLessons(t.id, selectedSubjectId);
                                    }
                                  }}
                                  className="text-[11px] font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                                >
                                  <Eye className="w-3 h-3 text-slate-500" />
                                  <span>{tr('লেসন দেখুন', 'View Lessons')}</span>
                                </button>

                                {canEdit && (
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
                                    <span>{tr('+ পাঠ্য লেসন যোগ', '+ Add Lesson')}</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl text-xs text-slate-400 space-y-2">
                          <p>{tr('এই অধ্যায়ে এখনও কোনো টপিক বা সেকশন যুক্ত করা হয়নি।', 'No topics or sections added to this chapter yet.')}</p>
                          {canEdit && (
                            <button
                              type="button"
                              onClick={() => {
                                setTargetChapterId(chap.id);
                                setShowAddTopic(true);
                              }}
                              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
                            >
                              <Plus className="w-3 h-3" />
                              <span>{tr('প্রথম টপিক যুক্ত করুন', 'Add First Topic')}</span>
                            </button>
                          )}
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
        title={tr('নতুন বিষয় যোগ করুন', 'Add New Subject')}
        subtitle={tr('সিলেবাসে নতুন বিষয় কোড ও শ্রেণি নির্ধারণ করুন', 'Set new subject code and class level')}
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowAddSubject(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              {tr('বাতিল', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={(e) => handleCreateSubject(e as any)}
              disabled={actionLoading}
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
            >
              {actionLoading ? tr('সংরক্ষণ হচ্ছে...', 'Saving...') : tr('বিষয় সংরক্ষণ করো', 'Save Subject')}
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateSubject} className="space-y-4">
          <div>
            <label htmlFor="newSubNameBangla" className="block text-xs font-bold text-slate-700 mb-1">
              {tr('বিষয়ের বাংলা নাম', 'Subject Bengali Name')}
            </label>
            <input
              id="newSubNameBangla"
              type="text"
              required
              value={newSubNameBangla}
              onChange={(e) => setNewSubNameBangla(e.target.value)}
              placeholder={tr('যেমন: জীববিজ্ঞান, উচ্চতর গণিত', 'e.g. Biology, Higher Math')}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="newSubCode" className="block text-xs font-bold text-slate-700 mb-1">
              {tr('ইউনিক কোড (English Slugs)', 'Unique Code (English Slug)')}
            </label>
            <input
              id="newSubCode"
              type="text"
              required
              value={newSubCode}
              onChange={(e) => setNewSubCode(e.target.value)}
              placeholder={tr('যেমন: ssc_biology, ssc_higher_math', 'e.g. ssc_biology, ssc_higher_math')}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="newSubClassLevel" className="block text-xs font-bold text-slate-700 mb-1">{tr('শ্রেণি স্তর', 'Class Level')}</label>
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
              <label htmlFor="newSubSyllabusYear" className="block text-xs font-bold text-slate-700 mb-1">{tr('সিলেবাস বছর', 'Syllabus Year')}</label>
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
              <span>{tr('শিক্ষার্থীদের জন্য এখনই সচল করুন (Live Ready)', 'Make live for students now (Live Ready)')}</span>
            </label>
          </div>
        </form>
      </AdminDrawer>

      {/* Drawer: Add Chapter */}
      <AdminDrawer
        isOpen={showAddChapter}
        onClose={() => setShowAddChapter(false)}
        title={tr('নতুন অধ্যায় যোগ করুন', 'Add New Chapter')}
        subtitle={tr(
          `"${activeSubject?.nameBangla}" বিষয়ের অধীনে নতুন অধ্যায় তৈরি করুন`,
          `Create a new chapter under "${activeSubject?.nameBangla}"`,
        )}
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowAddChapter(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {tr('বাতিল', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={(e) => handleCreateChapter(e as any)}
              disabled={actionLoading}
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow"
            >
              {actionLoading ? tr('যোগ হচ্ছে...', 'Adding...') : tr('অধ্যায় সংরক্ষণ করো', 'Save Chapter')}
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateChapter} className="space-y-4">
          <div>
            <label htmlFor="newChapterTitle" className="block text-xs font-bold text-slate-700 mb-1">
              {tr('অধ্যায়ের নাম ও নম্বর (বাংলায়)', 'Chapter Name & Number')}
            </label>
            <input
              id="newChapterTitle"
              type="text"
              required
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              placeholder={tr('যেমন: ৩য় অধ্যায়: বল (Force)', 'e.g. Chapter 3: Force')}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </AdminDrawer>

      {/* Drawer: Add Topic */}
      <AdminDrawer
        isOpen={showAddTopic}
        onClose={() => setShowAddTopic(false)}
        title={tr('নতুন টপিক বা সেকশন যোগ করুন', 'Add New Topic / Section')}
        subtitle={tr('অধ্যায়ের অধীনে নতুন পাঠ্য টপিক যুক্ত করুন', 'Add a new topic under this chapter')}
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowAddTopic(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {tr('বাতিল', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={(e) => handleCreateTopic(e as any)}
              disabled={actionLoading}
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow"
            >
              {actionLoading ? tr('যোগ হচ্ছে...', 'Adding...') : tr('টপিক সংরক্ষণ করো', 'Save Topic')}
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateTopic} className="space-y-4">
          <div>
            <label htmlFor="newTopicTitle" className="block text-xs font-bold text-slate-700 mb-1">
              {tr('টপিক/সেকশনের নাম (বাংলায়)', 'Topic / Section Name')}
            </label>
            <input
              id="newTopicTitle"
              type="text"
              required
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              placeholder={tr('যেমন: নিউটনের ১ম গতিসূত্র ও জড়তা', "e.g. Newton's 1st Law & Inertia")}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </AdminDrawer>
    </div>
  );
}
