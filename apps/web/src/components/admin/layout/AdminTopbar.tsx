'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  ChevronRight,
  Database,
  Search,
  PlusCircle,
  HelpCircle,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useAdminAuthStore } from '@/store/admin-auth-store';

export interface AdminTopbarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onOpenMobile?: () => void;
  onLogout?: () => void;
}

export function AdminTopbar({
  isCollapsed = false,
  onToggleCollapse,
  onOpenMobile,
  onLogout,
}: AdminTopbarProps) {
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const [apiOnline, setApiOnline] = useState<boolean>(true);
  const adminUser = useAdminAuthStore((s) => s.adminUser);
  const logout = useAdminAuthStore((s) => s.logout);

  useEffect(() => {
    let isMounted = true;
    const checkApi = async () => {
      try {
        await apiClient.get('/curriculum/subjects', { scope: 'admin' });
        if (isMounted) {
          setApiOnline(true);
        }
      } catch {
        if (isMounted) {
          setApiOnline(false);
        }
      }
    };

    checkApi();
    const interval = setInterval(checkApi, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }
    logout();
    router.replace('/admin/login');
  };

  // Compute breadcrumb segments from pathname
  const getBreadcrumbs = () => {
    const segments = [{ label: 'অ্যাডমিন', href: '/admin' }];

    if (pathname.includes('/curriculum')) {
      segments.push({ label: 'কারিকুলাম ট্রাফি', href: '/admin/curriculum' });
    } else if (pathname.includes('/questions')) {
      const normalizedPath = pathname.replace(/\/+$/, '');
      segments.push({ label: 'প্রশ্ন ব্যাংক', href: '/admin/questions' });
      if (normalizedPath.endsWith('/questions/new')) {
        segments.push({ label: 'নতুন যোগ', href: '/admin/questions/new' });
      } else if (normalizedPath.endsWith('/edit')) {
        segments.push({ label: 'প্রশ্ন সম্পাদনা', href: pathname });
      }
    } else if (pathname.includes('/model-tests')) {
      segments.push({ label: 'মডেল টেস্ট ম্যানেজার', href: '/admin/model-tests' });
    } else if (pathname.includes('/reviews')) {
      segments.push({ label: 'রিভিউ ও অডিট কনসোল', href: '/admin/reviews' });
    }

    return segments;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 left-0 ${
        isCollapsed ? 'md:left-20' : 'md:left-64'
      }`}
    >
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {(onOpenMobile || onToggleCollapse) && (
          <button
            type="button"
            onClick={onOpenMobile || onToggleCollapse}
            aria-label="মেনু টগল"
            className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.href || idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                {isLast ? (
                  <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-indigo-600 transition-colors hover:underline"
                  >
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right: Search, API Status, Quick Actions, Admin Identity & Logout */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Search Trigger */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100/80 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs text-slate-400 font-medium cursor-pointer hover:bg-slate-100 transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span>দ্রুত খুঁজুন...</span>
          <kbd className="hidden xl:inline-block bg-white text-slate-500 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
            ⌘K
          </kbd>
        </div>

        {/* API Backend Health Indicator */}
        <div
          title={apiOnline ? 'NestJS ব্যাকএন্ড এপিআই লাইভ সংযুক্ত' : 'এপিআই সংযোগ বিচ্ছিন্ন'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
            apiOnline
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}
        >
          <Database className={`w-3 h-3 ${apiOnline ? 'text-emerald-500' : 'text-rose-500'}`} />
          <span className="hidden md:inline">{apiOnline ? 'API Connected' : 'API Offline'}</span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              apiOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
            }`}
          />
        </div>

        {/* Quick Action Link to New Question */}
        <Link
          href="/admin/questions/new"
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">নতুন কনটেন্ট</span>
        </Link>

        {/* Signed-in Admin Identity & Logout */}
        {adminUser && (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100/90 border border-slate-200 px-2.5 py-1 rounded-xl text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="font-semibold text-slate-700 max-w-[140px] truncate">
                {adminUser.fullName || adminUser.phoneNumber || 'অ্যাডমিন'}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                {adminUser.role}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              aria-label="লগআউট"
              title="লগআউট"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">লগআউট</span>
            </button>
          </div>
        )}

        {/* Help Link */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          title="ডকুমেন্টেশন ও সহায়তা"
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}
