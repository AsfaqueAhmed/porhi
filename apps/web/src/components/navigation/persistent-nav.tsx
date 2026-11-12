'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  BarChart3,
  ChevronRight,
  Search,
  Bookmark,
  Flame,
  X,
  Zap,
  CheckCircle2,
  User,
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import { LanguageToggle } from '@/components/navigation/LanguageToggle';
import { toBanglaDigits } from '@/lib/formatters';
import { DEFAULT_CHAPTERS } from '@/lib/curriculum-data';

export { toBanglaDigits };

interface PersistentNavProps {
  currentPath?: string;
}

export const PersistentNav: React.FC<PersistentNavProps> = ({ currentPath: propPath }) => {
  const pathname = usePathname();
  const activePath = propPath || pathname || '/dashboard';
  const activeSubject = useUserStore((s) => s.activeSubject);
  const streakDays = useUserStore((s) => s.streakDays);
  const bookmarks = useUserStore((s) => s.bookmarks);
  const completedTopics = useUserStore((s) => s.completedTopics);
  const toggleBookmark = useUserStore((s) => s.toggleBookmark);
  const user = useUserStore((s) => s.user);

  const t = useLanguageStore((s) => s.t);
  const formatDigits = useLanguageStore((s) => s.formatDigits);
  const lang = useLanguageStore((s) => s.language);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsBookmarksOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const items: Array<{
      topicId: string;
      topicTitle: string;
      chapterId: string;
      chapterTitle: string;
      hasInteractiveLab?: boolean;
      isCompleted: boolean;
    }> = [];

    for (const ch of DEFAULT_CHAPTERS) {
      const chapterMatches = q && ch.titleBangla.toLowerCase().includes(q);
      for (const top of ch.topics) {
        const topicMatches =
          !q ||
          chapterMatches ||
          top.titleBangla.toLowerCase().includes(q) ||
          (q.includes('ল্যাব') && top.hasInteractiveLab) ||
          (q.includes('lab') && top.hasInteractiveLab);
        if (topicMatches) {
          items.push({
            topicId: top.id,
            topicTitle: top.titleBangla,
            chapterId: ch.id,
            chapterTitle: ch.titleBangla,
            hasInteractiveLab: top.hasInteractiveLab,
            isCompleted: completedTopics.includes(top.id),
          });
        }
      }
    }
    return items.slice(0, 18);
  }, [searchQuery, completedTopics]);

  const destinations = [
    {
      name: t('nav.home'),
      href: '/dashboard',
      icon: Home,
      isActive: activePath === '/dashboard',
    },
    {
      name: t('nav.subjects'),
      href: '/subjects',
      icon: BookOpen,
      isActive: activePath === '/subjects' || activePath.startsWith('/curriculum'),
    },
    {
      name: t('nav.progress'),
      href: '/progress',
      icon: BarChart3,
      isActive: activePath === '/progress',
    },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm" aria-label="Main Navigation">
      {/* Top Banner / Active Subject Indicator */}
      <div className="bg-indigo-50 border-b border-indigo-100 px-3 sm:px-4 py-1.5 text-xs font-medium text-indigo-900 flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          {activeSubject ? (
            <span className="truncate">
              {t('common.currentSubject')}: {activeSubject.nameBangla}
              {activeSubject.program || activeSubject.syllabusYear
                ? ` (${[activeSubject.program, activeSubject.syllabusYear ? formatDigits(activeSubject.syllabusYear) : null]
                    .filter(Boolean)
                    .join(' ')})`
                : ''}
            </span>
          ) : (
            <span className="text-gray-600 truncate">{t('common.selectSubject')}</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold"
            title={lang === 'en' ? 'Study Streak' : 'ধারাবাহিকতা'}
          >
            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
            {formatDigits(streakDays)} {lang === 'en' ? 'd' : 'দিন'}
          </span>
          <Link
            href="/subjects"
            className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold flex items-center shrink-0"
          >
            {t('action.edit')} <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
          <div className="md:hidden">
            <LanguageToggle showIcon={false} />
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14 gap-2">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-indigo-700 shrink-0">
          <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-base shadow">
            প
          </span>
          <span className="tracking-tight">পড়ি (poRi)</span>
        </Link>

        {/* Quick Actions + Desktop Links & Language Switch */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={() => {
              setIsBookmarksOpen(false);
              setIsSearchOpen(true);
            }}
            aria-label="দ্রুত অনুসন্ধান"
            className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">{lang === 'en' ? 'Quick Search' : 'দ্রুত অনুসন্ধান'}</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-bold bg-white text-slate-500 rounded border border-slate-200">
              ⌘K
            </kbd>
          </button>

          {/* Bookmarks Drawer Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(false);
                setIsBookmarksOpen((prev) => !prev);
              }}
              aria-label="বুকমার্ক তালিকা"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
              {bookmarks.length > 0 && (
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {formatDigits(bookmarks.length)}
                </span>
              )}
            </button>

            {isBookmarksOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
                    {lang === 'en' ? 'Saved Bookmarks' : 'সংরক্ষিত বুকমার্ক'} ({formatDigits(bookmarks.length)})
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsBookmarksOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {bookmarks.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    {lang === 'en'
                      ? 'No bookmarks saved yet. Bookmark topics or questions to revisit quickly.'
                      : 'এখনো কোনো টপিক বা প্রশ্ন বুকমার্ক করা হয়নি।'}
                  </p>
                ) : (
                  <ul className="space-y-2 max-h-64 overflow-y-auto">
                    {bookmarks.map((bm) => (
                      <li
                        key={`${bm.type}-${bm.id}`}
                        className="flex items-start justify-between gap-2 p-2 rounded-xl hover:bg-slate-50 border border-slate-100"
                      >
                        <Link
                          href={bm.href}
                          onClick={() => setIsBookmarksOpen(false)}
                          className="text-xs font-semibold text-slate-800 hover:text-indigo-600 line-clamp-2 flex-1"
                        >
                          {bm.titleBangla}
                          {bm.subtitleBangla && (
                            <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                              {bm.subtitleBangla}
                            </span>
                          )}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            toggleBookmark({
                              id: bm.id,
                              type: bm.type,
                              titleBangla: bm.titleBangla,
                              subtitleBangla: bm.subtitleBangla,
                              href: bm.href,
                            })
                          }
                          aria-label="বুকমার্ক মুছুন"
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-1">
            {destinations.map((dest) => {
              const Icon = dest.icon;
              return (
                <Link
                  key={dest.href}
                  href={dest.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    dest.isActive
                      ? 'bg-indigo-100 text-indigo-800 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{dest.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          <Link
            href="/account"
            aria-label={lang === 'en' ? 'Account & Settings' : 'অ্যাকাউন্ট ও সেটিংস'}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              activePath === '/account'
                ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline max-w-[90px] truncate">
              {user?.fullName || (lang === 'en' ? 'Account' : 'অ্যাকাউন্ট')}
            </span>
          </Link>
        </div>
      </div>

      {/* Quick Search Dialog Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-16 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="দ্রুত অনুসন্ধান ডায়ালগ"
        >
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 flex items-center gap-2.5 bg-slate-50">
              <Search className="w-4 h-4 text-indigo-600 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="অধ্যায় বা টপিক খুঁজুন (যেমন: ভৌত রাশি, বল, ওহমের সূত্র, ল্যাব)..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="অনুসন্ধান বন্ধ করুন"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-3 divide-y divide-slate-100">
              {searchResults.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  কোনো টপিক বা অধ্যায় পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করো।
                </div>
              ) : (
                searchResults.map((item) => (
                  <div
                    key={item.topicId}
                    className="py-2.5 px-2 hover:bg-indigo-50/60 rounded-xl transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/lesson/${item.topicId}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="text-sm font-bold text-slate-900 hover:text-indigo-700 flex items-center gap-2 truncate"
                      >
                        <span className="truncate">{item.topicTitle}</span>
                        {item.hasInteractiveLab && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold shrink-0">
                            <Zap className="w-2.5 h-2.5" /> ⚡ ল্যাব
                          </span>
                        )}
                        {item.isCompleted && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </Link>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{item.chapterTitle}</p>
                    </div>
                    <Link
                      href={`/practice/${item.chapterId}?topicId=${item.topicId}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg shrink-0"
                    >
                      অনুশীলন
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-6 py-2 flex justify-around items-center shadow-lg">
        {destinations.map((dest) => {
          const Icon = dest.icon;
          return (
            <Link
              key={dest.href}
              href={dest.href}
              className={`flex flex-col items-center gap-1 text-xs font-medium py-1 px-3 rounded-lg transition-colors ${
                dest.isActive
                  ? 'text-indigo-600 font-bold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{dest.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
