'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart3, ChevronRight } from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import { LanguageToggle } from '@/components/navigation/LanguageToggle';
import { toBanglaDigits } from '@/lib/formatters';

export { toBanglaDigits };

interface PersistentNavProps {
  currentPath?: string;
}

export const PersistentNav: React.FC<PersistentNavProps> = ({ currentPath: propPath }) => {
  const pathname = usePathname();
  const activePath = propPath || pathname || '/dashboard';
  const activeSubject = useUserStore((s) => s.activeSubject);
  const t = useLanguageStore((s) => s.t);
  const formatDigits = useLanguageStore((s) => s.formatDigits);

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
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-indigo-700">
          <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-base shadow">
            প
          </span>
          <span className="tracking-tight">পড়ি (poRi)</span>
        </Link>

        {/* Desktop Links & Language Switch */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1">
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
          <LanguageToggle />
        </div>
      </div>

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
