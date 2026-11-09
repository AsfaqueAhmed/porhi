'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { AdminSidebar } from '../../components/admin/layout/AdminSidebar';
import { AdminTopbar } from '../../components/admin/layout/AdminTopbar';
import { apiClient } from '@/lib/api-client';
import {
  ADMIN_TOKEN_STORAGE_KEY,
  isAllowedAdminRole,
  useAdminAuthStore,
  type AdminUserProfile,
} from '@/store/admin-auth-store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isManualLogoutRef = useRef(false);

  const token = useAdminAuthStore((s) => s.token);
  const adminUser = useAdminAuthStore((s) => s.adminUser);
  const isVerified = useAdminAuthStore((s) => s.isVerified);
  const setSession = useAdminAuthStore((s) => s.setSession);
  const logout = useAdminAuthStore((s) => s.logout);

  const isLoginRoute = pathname === '/admin/login' || pathname === '/admin/login/';

  const handleLogout = useCallback(() => {
    isManualLogoutRef.current = true;
    setIsMobileOpen(false);
    logout();
    router.replace('/admin/login');
  }, [logout, router]);

  useEffect(() => {
    if (isLoginRoute) {
      isManualLogoutRef.current = false;
      return;
    }

    let isCancelled = false;
    const loginRedirectUrl = `/admin/login?next=${encodeURIComponent(pathname || '/admin')}`;

    const activeToken =
      token ||
      (typeof window !== 'undefined' ? localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) : null);

    if (!activeToken) {
      logout();
      if (!isManualLogoutRef.current) {
        router.replace(loginRedirectUrl);
      }
      return;
    }

    isManualLogoutRef.current = false;

    if (isVerified && isAllowedAdminRole(adminUser?.role)) {
      return;
    }

    apiClient
      .get<AdminUserProfile>('/auth/me', { scope: 'admin', token: activeToken })
      .then((profile) => {
        if (isCancelled) {
          return;
        }
        if (isAllowedAdminRole(profile?.role)) {
          setSession(activeToken, profile);
        } else {
          logout();
          router.replace(loginRedirectUrl);
        }
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }
        logout();
        router.replace(loginRedirectUrl);
      });

    return () => {
      isCancelled = true;
    };
  }, [isLoginRoute, pathname, token, isVerified, adminUser?.role, router, setSession, logout]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  if (isLoginRoute) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </div>
    );
  }

  if (!isVerified || !isAllowedAdminRole(adminUser?.role)) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
          <span className="text-sm font-semibold text-slate-700">
            অ্যাডমিন সেশন যাচাই করা হচ্ছে...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Persistent Left Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onLogout={handleLogout}
      />

      {/* Persistent Topbar */}
      <AdminTopbar
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
        onOpenMobile={() => setIsMobileOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Viewport */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ml-0 ${
          isCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
