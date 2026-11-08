'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { PersistentNav } from './persistent-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen bg-slate-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-900 pb-16 md:pb-0">
      <PersistentNav />
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6">{children}</main>
    </div>
  );
}
