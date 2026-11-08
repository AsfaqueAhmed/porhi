'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/layout/AdminSidebar';
import { AdminTopbar } from '../../components/admin/layout/AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

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
      />

      {/* Persistent Topbar */}
      <AdminTopbar
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
        onOpenMobile={() => setIsMobileOpen(true)}
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
