'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitFork,
  FileQuestion,
  Trophy,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'ড্যাশবোর্ড ওভারভিউ',
      href: '/admin',
      icon: LayoutDashboard,
      badge: 'মেট্রিক্স',
    },
    {
      label: 'কারিকুলাম ট্রাফি',
      href: '/admin/curriculum',
      icon: GitFork,
      badge: 'মূল গঠন',
    },
    {
      label: 'প্রশ্ন ও লেসন স্টুডিও',
      href: '/admin/questions',
      icon: FileQuestion,
      badge: '৬-লেয়ার',
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

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-50 bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between select-none ${
        isMobileOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full md:translate-x-0'
      } ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
    >
      {/* Top Brand Header */}
      <div>
        <div className="h-16 flex items-center px-4 border-b border-slate-800 justify-between">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-sm tracking-wide text-white truncate flex items-center gap-1.5">
                  poRi Admin
                  <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-indigo-400/30">
                    v0.2
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  এডটেক কন্ট্রোল স্যুট
                </span>
              </div>
            )}
          </Link>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
              aria-label="সাইডবার বন্ধ করুন"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <div className="p-3 space-y-1.5">
          {!isCollapsed && (
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              প্রধান মডিউলসমূহ
            </div>
          )}

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      active ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  {!isCollapsed && (
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge && !active && (
                        <span className="text-[9px] font-normal px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {/* Student App Shortcut */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 hover:bg-emerald-900/60 transition-colors group"
          title={isCollapsed ? 'শিক্ষার্থী অ্যাপে যান' : undefined}
        >
          <Sparkles className="w-4 h-4 shrink-0 text-emerald-400 group-hover:rotate-12 transition-transform" />
          {!isCollapsed && (
            <div className="flex items-center justify-between flex-1 min-w-0">
              <span className="truncate">শিক্ষার্থী অ্যাপে যান</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </div>
          )}
        </Link>

        {/* Collapse Toggle Button */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="কোল্যাপস"
            className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[11px]">সাইডবার সংকুচিত করুন</span>
              </div>
            )}
          </button>
        )}
      </div>
    </aside>
  );
}
