'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileQuestion,
  GitFork,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { useAdminAuthStore } from '@/store/admin-auth-store';

export interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
}

interface SidebarSubItem {
  label: string;
  href: string;
  exactMatch?: boolean;
}

interface SidebarNavGroup {
  key?: 'curriculum' | 'questions';
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  exactMatch?: boolean;
  children?: SidebarSubItem[];
}

const NAV_ITEMS: SidebarNavGroup[] = [
  {
    label: 'ড্যাশবোর্ড ওভারভিউ',
    href: '/admin',
    icon: LayoutDashboard,
    badge: 'মেট্রিক্স',
    exactMatch: true,
  },
  {
    key: 'curriculum',
    label: 'কারিকুলাম ও পাঠ',
    href: '/admin/curriculum',
    icon: GitFork,
    badge: 'মূল গঠন',
    children: [
      { label: 'বিষয়, অধ্যায় ও টপিক', href: '/admin/curriculum', exactMatch: true },
      { label: 'পাঠ্য লেসন', href: '/admin/curriculum/lessons' },
    ],
  },
  {
    key: 'questions',
    label: 'প্রশ্ন ব্যাংক ও স্টুডিও',
    href: '/admin/questions',
    icon: FileQuestion,
    badge: '৬-লেয়ার',
    children: [
      { label: 'MCQ প্রশ্ন', href: '/admin/questions/mcq' },
      { label: 'সৃজনশীল (CQ)', href: '/admin/questions/cq' },
    ],
  },
  {
    label: 'মডেল টেস্ট ম্যানেজার',
    href: '/admin/model-tests',
    icon: Trophy,
    badge: 'পরীক্ষা',
  },
  {
    label: 'রিভিউ ও অডিট কনসোল',
    href: '/admin/reviews',
    icon: ShieldCheck,
    badge: 'অনুমোদন',
  },
];

export function AdminSidebar({
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname() ?? '';
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const router = useRouter();
  const adminUser = useAdminAuthStore((s) => s.adminUser);
  const logout = useAdminAuthStore((s) => s.logout);

  const [openGroups, setOpenGroups] = useState<{
    curriculum: boolean;
    questions: boolean;
  }>({
    curriculum: true,
    questions: true,
  });

  useEffect(() => {
    setOpenGroups((prev) => ({
      curriculum:
        prev.curriculum ||
        normalizedPath === '/admin/curriculum' ||
        normalizedPath.startsWith('/admin/curriculum/'),
      questions:
        prev.questions ||
        normalizedPath === '/admin/questions' ||
        normalizedPath.startsWith('/admin/questions/'),
    }));
  }, [normalizedPath]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }
    logout();
    router.replace('/admin/login');
  };

  const isLinkActive = (href: string, exactMatch?: boolean) => {
    if (exactMatch || href === '/admin') {
      return normalizedPath === href;
    }
    return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
  };

  const toggleGroup = (key: 'curriculum' | 'questions') => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const showLabels = !isCollapsed || isMobileOpen;

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-50 bg-white text-slate-700 border-r border-slate-200/90 transition-all duration-300 flex flex-col justify-between select-none shadow-2xs ${
        isMobileOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full md:translate-x-0'
      } ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
    >
      {/* Top Brand Header */}
      <div className="overflow-y-auto flex-1">
        <div className="h-16 flex items-center px-4 border-b border-slate-100 justify-between">
          <Link
            href="/admin"
            onClick={() => onCloseMobile?.()}
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {showLabels && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-sm tracking-wide text-slate-900 truncate flex items-center gap-1.5">
                  poRi Admin
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-indigo-200">
                    v0.2
                  </span>
                </span>
                <span className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  এডটেক কন্ট্রোল স্যুট
                </span>
              </div>
            )}
          </Link>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 md:hidden"
              aria-label="সাইডবার বন্ধ করুন"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <div className="p-3 space-y-1.5">
          {showLabels && (
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              প্রধান মডিউলসমূহ
            </div>
          )}

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href, item.exactMatch);
              const Icon = item.icon;
              const groupKey = item.key;
              const hasChildren = Boolean(item.children?.length && groupKey);
              const isGroupOpen = groupKey ? openGroups[groupKey] : false;

              return (
                <div key={item.href} className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.href}
                      onClick={() => onCloseMobile?.()}
                      title={!showLabels ? item.label : undefined}
                      aria-label={!showLabels ? item.label : undefined}
                      className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group min-w-0 ${
                        active
                          ? 'bg-indigo-50 text-indigo-700 font-bold border-l-2 border-indigo-600 shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 transition-transform ${
                          active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      />
                      {showLabels && (
                        <div className="flex items-center justify-between flex-1 min-w-0 gap-1.5">
                          <span className="truncate">{item.label}</span>
                          {item.badge && !active && (
                            <span className="text-[9px] font-normal px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>

                    {showLabels && hasChildren && groupKey && (
                      <button
                        type="button"
                        onClick={() => toggleGroup(groupKey)}
                        aria-label={`${item.label} সাবমেনু টগল`}
                        aria-expanded={isGroupOpen}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
                      >
                        {isGroupOpen ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {showLabels && item.children && isGroupOpen && (
                    <div className="ml-5 pl-3 pr-1 pt-0.5 pb-1 space-y-1 border-l border-slate-200">
                      {item.children.map((sub) => {
                        const subActive = isLinkActive(sub.href, sub.exactMatch);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => onCloseMobile?.()}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                              subActive
                                ? 'bg-indigo-50 text-indigo-700 font-bold'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                subActive ? 'bg-indigo-600' : 'bg-slate-300'
                              }`}
                            />
                            <span className="truncate">{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/50">
        {adminUser && (
          <div className="space-y-2">
            {showLabels && (
              <div className="px-3 py-2 rounded-xl bg-white border border-slate-200/90 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">
                      {adminUser.fullName || adminUser.phoneNumber || 'অ্যাডমিন'}
                    </div>
                    {adminUser.fullName && adminUser.phoneNumber && (
                      <div className="text-[10px] text-slate-400 truncate font-mono">
                        {adminUser.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {adminUser.role}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleLogout}
              aria-label="লগআউট"
              title="লগআউট"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50/90 border border-rose-200/80 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {showLabels && <span>লগআউট</span>}
            </button>
          </div>
        )}

        <Link
          href="/dashboard"
          onClick={() => onCloseMobile?.()}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/80 transition-colors group"
          title={!showLabels ? 'শিক্ষার্থী অ্যাপে যান' : undefined}
        >
          <Sparkles className="w-4 h-4 shrink-0 text-emerald-600 group-hover:rotate-12 transition-transform" />
          {showLabels && (
            <div className="flex items-center justify-between flex-1 min-w-0">
              <span className="truncate font-semibold">শিক্ষার্থী অ্যাপে যান</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </div>
          )}
        </Link>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="কোল্যাপস"
            className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xs"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[11px] font-medium">সাইডবার সংকুচিত করুন</span>
              </div>
            )}
          </button>
        )}
      </div>
    </aside>
  );
}
