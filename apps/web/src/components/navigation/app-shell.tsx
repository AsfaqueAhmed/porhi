'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PersistentNav } from './persistent-nav';
import { OfflineSyncBanner } from './offline-sync-banner';
import { registerServiceWorker } from '@/lib/sw-register';
import { useUserStore } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    useUserStore.persist.rehydrate();
    useLanguageStore.persist.rehydrate();
    registerServiceWorker();
  }, []);

  if (isAdmin) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-900 pb-16 md:pb-0 overflow-x-hidden">
      <PersistentNav />
      <OfflineSyncBanner />
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-4 md:p-6 min-w-0">{children}</main>
    </div>
  );
}
