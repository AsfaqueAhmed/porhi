'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/layout/AdminSidebar';
import { AdminTopbar } from '../../components/admin/layout/AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Persistent Left Sidebar */}
      <AdminSidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />

      {/* Persistent Topbar */}
      <AdminTopbar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />

      {/* Main Content Viewport */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
