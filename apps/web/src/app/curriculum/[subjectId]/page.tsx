'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Play,
  Trophy,
  Layers,
  Search,
  Bookmark,
  Zap,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { toBanglaDigits } from '@/lib/formatters';
import { useLanguageStore } from '@/store/language-store';
import { useUserStore } from '@/store/user-store';
import {
  getFallbackChaptersForSubject,
  ChapterItem,
  TopicItem,
} from '@/lib/curriculum-data';
import { CurriculumPageSkeleton } from '@/components/ui/shimmer';
import {
  listDownloadedPacks,
  saveChapterPack,
  removeChapterPack,
} from '@/lib/offline-store';
import type { OfflineChapterPackDTO } from '@pori/shared';

type TopicFilterMode = 'ALL' | 'LAB' | 'INCOMPLETE' | 'BOOKMARKED';

export default function CurriculumPage() {
  const params = useParams();
  const subjectId = (params?.subjectId as string) || 'sub_ssc_physics';
  const { tr, language } = useLanguageStore();
  const { completedTopics, topicMastery, bookmarks, toggleBookmark } = useUserStore();

  const [chapters, setChapters] = useState<ChapterItem[]>(() =>
    getFallbackChaptersForSubject(subjectId),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<TopicFilterMode>('ALL');
  const [downloadedChapterIds, setDownloadedChapterIds] = useState<Set<string>>(new Set());
  const [downloadingChapterId, setDownloadingChapterId] = useState<string | null>(null);

  useEffect(() => {
    listDownloadedPacks()
      .then((packs) => {
        setDownloadedChapterIds(new Set(packs.map((p) => p.chapterId)));
      })
      .catch(() => {});
  }, []);

  const handleToggleOfflinePack = async (chapter: ChapterItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloadedChapterIds.has(chapter.id)) {
      await removeChapterPack(chapter.id);
      setDownloadedChapterIds((prev) => {
        const next = new Set(prev);
        next.delete(chapter.id);
        return next;
      });
      return;
    }

    setDownloadingChapterId(chapter.id);
    try {
      const pack = await apiClient.get<OfflineChapterPackDTO>(
        `/curriculum/chapter/${chapter.id}/offline-pack`
      );
      if (pack && pack.chapterId) {
        await saveChapterPack(pack);
        setDownloadedChapterIds((prev) => new Set(prev).add(chapter.id));
      }
    } catch {
      // Ignore download errors cleanly
    } finally {
      setDownloadingChapterId(null);
    }
  };

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
  const totalCompleted = chapters.reduce(
    (acc, c) => acc + (c.topics?.filter((t) => completedTopics.includes(t.id)).length || 0),
    0
  );
  const overallProgressPct = totalTopics > 0 ? Math.min(100, Math.round((totalCompleted / totalTopics) * 100)) : 0;

  const isTopicInteractiveLab = (topic: TopicItem) =>
    Boolean(topic.hasInteractiveLab || /Lab/i.test(topic.titleBangla));

  const getTopicStatus = (topicId: string): 'MASTERED' | 'IN_PROGRESS' | 'NEEDS_REVISION' | 'NOT_STARTED' => {
    const isCompleted = completedTopics.includes(topicId);
    const stats = topicMastery[topicId];
    if (stats && stats.attempted >= 3 && stats.correct / stats.attempted < 0.5) {
      return 'NEEDS_REVISION';
    }
    if (isCompleted || (stats && stats.attempted >= 3 && stats.correct / stats.attempted >= 0.7)) {
      return 'MASTERED';
    }
    if (stats && stats.attempted > 0) {
      return 'IN_PROGRESS';
    }
    return 'NOT_STARTED';
  };

  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return chapters
      .map((ch) => {
        const chapterTitleMatches = q && ch.titleBangla.toLowerCase().includes(q);
        const matchingTopics = (ch.topics || []).filter((topic) => {
          const matchesQuery =
            !q || chapterTitleMatches || topic.titleBangla.toLowerCase().includes(q);
          if (!matchesQuery) return false;

          if (filterMode === 'LAB') {
            return isTopicInteractiveLab(topic);
          }
          if (filterMode === 'INCOMPLETE') {
            return getTopicStatus(topic.id) !== 'MASTERED';
          }
          if (filterMode === 'BOOKMARKED') {
            return bookmarks.some((b) => b.id === topic.id && b.type === 'topic');
          }
          return true;
        });

        return {
          ...ch,
          filteredTopics: matchingTopics,
        };
      })
      .filter((ch) => (filterMode === 'ALL' && !q ? true : ch.filteredTopics.length > 0));
  }, [chapters, searchQuery, filterMode, completedTopics, topicMastery, bookmarks]);

  const allCollapsed = chapters.length > 0 && collapsedIds.size === chapters.length;

  if (isLoading) {
    return <CurriculumPageSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
          <Link href="/subjects" className="hover:underline">
            {tr('বিষয়সমূহ', 'Subjects')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{tr('কারিকুলাম সূচি', 'Curriculum Index')}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
              {tr('অধ্যায় ও টপিক সিলেবাস', 'Chapter & Topic Syllabus')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {tr(
                'প্রতিটি অধ্যায়ের টপিকভিত্তিক লেসন পড়ুন, ৬-স্তরের ব্যাখ্যার সাথে MCQ অনুশীলন করুন এবং শেষে মডেল টেস্ট দিন।',
                'Read topic-wise lessons, practice MCQs with 6-layer explanations, and take chapter model tests.'
              )}
            </p>
          </div>

          {/* Overall Subject Progress Card & Full Subject Exam CTA */}
          <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 min-w-[210px]">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-1.5">
                <span>{tr('সামগ্রিক অগ্রগতি', 'Overall Progress')}</span>
                <span>
                  {language === 'bn'
                    ? `${toBanglaDigits(totalCompleted)}/${toBanglaDigits(totalTopics)} (${toBanglaDigits(overallProgressPct)}%)`
                    : `${totalCompleted}/${totalTopics} (${overallProgressPct}%)`}
                </span>
              </div>
              <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all"
                  style={{ width: `${overallProgressPct}%` }}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/exam/subject/${subjectId}`}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>{tr('পূর্ণ বিষয় মডেল টেস্ট', 'Full Subject Model Test')}</span>
              </Link>
              <Link
                href="/board-archive"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
              >
                <span>{tr('বোর্ড প্রশ্ন ব্যাংক', 'Board Archive')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Filter Pills */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tr('অধ্যায় বা টপিক খুঁজুন...', 'Search chapters or topics...')}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterMode === 'ALL'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tr('সব টপিক', 'All Topics')}
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('LAB')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterMode === 'LAB'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {tr('⚡ ইন্টারেক্টিভ ল্যাব', '⚡ Interactive Lab')}
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('INCOMPLETE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterMode === 'INCOMPLETE'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tr('অসম্পন্ন', 'Incomplete')}
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('BOOKMARKED')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterMode === 'BOOKMARKED'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tr('বুকমার্ক করা', 'Bookmarked')}
            </button>
          </div>
        </div>
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
        {filteredChapters.map((chapter) => {
          const isCollapsed = collapsedIds.has(chapter.id);
          const topicCount = chapter.topics?.length || 0;
          const completedInChapter = (chapter.topics || []).filter(
            (t) => getTopicStatus(t.id) === 'MASTERED'
          ).length;
          const chapterProgressPct =
            topicCount > 0 ? Math.min(100, Math.round((completedInChapter / topicCount) * 100)) : 0;

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
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-600 text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                    {language === 'bn' ? toBanglaDigits(chapter.orderIndex) : chapter.orderIndex}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">
                        {tr('অধ্যায় ', 'Chapter ')}
                        {language === 'bn' ? toBanglaDigits(chapter.orderIndex) : chapter.orderIndex}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                        {language === 'bn' ? toBanglaDigits(topicCount) : topicCount} {tr('টপিক', 'topics')}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {language === 'bn'
                          ? `${toBanglaDigits(completedInChapter)}/${toBanglaDigits(topicCount)} সম্পন্ন`
                          : `${completedInChapter}/${topicCount} Completed`}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate mt-0.5">
                      {chapter.titleBangla}
                    </h2>
                    {/* Chapter Progress Bar */}
                    <div className="w-full max-w-xs h-1.5 bg-slate-200/80 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${chapterProgressPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action buttons & Collapse Icon */}
                <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleToggleOfflinePack(chapter, e)}
                    disabled={downloadingChapterId === chapter.id}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-colors border cursor-pointer disabled:opacity-60 ${
                      downloadedChapterIds.has(chapter.id)
                        ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {downloadedChapterIds.has(chapter.id) ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{tr('অফলাইন সংরক্ষিত', 'Saved Offline')}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-indigo-600" />
                        <span>
                          {downloadingChapterId === chapter.id
                            ? tr('ডাউনলোড হচ্ছে...', 'Saving...')
                            : tr('অফলাইন ডাউনলোড', 'Save Offline')}
                        </span>
                      </>
                    )}
                  </button>

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
                  {chapter.filteredTopics.map((topic, index) => {
                    const status = getTopicStatus(topic.id);
                    const hasLab = isTopicInteractiveLab(topic);
                    const isBookmarked = bookmarks.some((b) => b.id === topic.id && b.type === 'topic');

                    return (
                      <Link
                        key={topic.id}
                        href={`/lesson/${topic.id}`}
                        className="p-3.5 sm:p-4 px-4 sm:px-5 flex items-center justify-between gap-3 hover:bg-indigo-50/40 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                          <span className="text-xs text-slate-400 font-medium w-7 shrink-0">
                            {language === 'bn'
                              ? `${toBanglaDigits(chapter.orderIndex)}.${toBanglaDigits(topic.orderIndex || index + 1)}`
                              : `${chapter.orderIndex}.${topic.orderIndex || index + 1}`}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                                {topic.titleBangla}
                              </span>

                              {hasLab && (
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200 shrink-0">
                                  <Zap className="w-2.5 h-2.5" /> ⚡ ল্যাব
                                </span>
                              )}

                              {status === 'MASTERED' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                                  {tr('✓ সম্পন্ন', '✓ Mastered')}
                                </span>
                              )}
                              {status === 'IN_PROGRESS' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold shrink-0">
                                  {tr('⏳ চলমান', '⏳ In Progress')}
                                </span>
                              )}
                              {status === 'NEEDS_REVISION' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold shrink-0">
                                  {tr('⚠️ রিভিশন প্রয়োজন', '⚠️ Needs Revision')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            aria-label="বুকমার্ক করুন"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleBookmark({
                                id: topic.id,
                                type: 'topic',
                                titleBangla: topic.titleBangla,
                                subtitleBangla: chapter.titleBangla,
                                href: `/lesson/${topic.id}`,
                              });
                            }}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isBookmarked
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                                : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-600'
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-600' : ''}`} />
                          </button>

                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-indigo-600">
                            <span className="hidden sm:inline">{tr('লেসন পড়ুন', 'Read Lesson')}</span>
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
