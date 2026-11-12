'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { ensureGuestSession } from '@/lib/guest-session';
import { useLanguageStore } from '@/store/language-store';
import { toBanglaDigits } from '@/lib/formatters';
import {
  clearSyncQueue,
  getPendingCount,
  getPendingSyncPayload,
  OFFLINE_QUEUE_EVENT,
} from '@/lib/offline-store';
import type { OfflineSyncResponseDTO } from '@pori/shared';

export function OfflineSyncBanner() {
  const { tr, language } = useLanguageStore();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncDoneMessage, setSyncDoneMessage] = useState<string | null>(null);

  const refreshQueueCount = useCallback(async () => {
    const count = await getPendingCount();
    setPendingCount(count);
    return count;
  }, []);

  const flushSyncQueue = useCallback(async () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return;
    const payload = await getPendingSyncPayload();
    const total =
      (payload.lessonCompletes?.length || 0) +
      (payload.practiceAttempts?.length || 0) +
      (payload.examSubmissions?.length || 0);
    if (total === 0) return;

    setIsSyncing(true);
    try {
      await Promise.resolve(ensureGuestSession()).catch(() => {});
      await apiClient.post<OfflineSyncResponseDTO>('/student/sync-offline', payload);
      await clearSyncQueue();
      setPendingCount(0);
      setSyncDoneMessage(
        tr('অফলাইন অগ্রগতি সার্ভারে সিঙ্ক হয়েছে।', 'Offline progress synced cleanly.')
      );
    } catch {
      // Keep items queued for next retry
    } finally {
      setIsSyncing(false);
    }
  }, [tr]);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsOnline(navigator.onLine);
    }
    refreshQueueCount();

    const handleOnline = () => {
      setIsOnline(true);
      flushSyncQueue();
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    const handleQueueUpdate = () => {
      refreshQueueCount().then((count) => {
        if (count > 0 && (typeof navigator === 'undefined' || navigator.onLine)) {
          flushSyncQueue();
        }
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener(OFFLINE_QUEUE_EVENT, handleQueueUpdate);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener(OFFLINE_QUEUE_EVENT, handleQueueUpdate);
    };
  }, [refreshQueueCount, flushSyncQueue]);

  if (isOnline && pendingCount === 0 && !syncDoneMessage) {
    return null;
  }

  return (
    <div
      role="status"
      className={`w-full px-3 sm:px-4 py-2 text-xs font-semibold border-b ${
        !isOnline
          ? 'bg-amber-50 border-amber-200 text-amber-950'
          : syncDoneMessage && pendingCount === 0
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-indigo-50 border-indigo-200 text-indigo-900'
      }`}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {!isOnline ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                {tr(
                  'অফলাইন মোড সক্রিয় — ডাউনলোড করা অধ্যায়ে পড়তে ও পরীক্ষা দিতে পারো।',
                  'Offline mode active — study downloaded chapters & tests seamlessly.'
                )}
              </span>
            </>
          ) : pendingCount > 0 ? (
            <>
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 shrink-0 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>
                {language === 'bn'
                  ? `${toBanglaDigits(pendingCount)}টি অফলাইন অগ্রগতি সিঙ্ক অপেক্ষমাণ`
                  : `${pendingCount} offline updates pending sync`}
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{syncDoneMessage}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isOnline && pendingCount > 0 && (
            <button
              type="button"
              onClick={flushSyncQueue}
              disabled={isSyncing}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold transition-colors cursor-pointer disabled:opacity-60"
            >
              {isSyncing ? tr('সিঙ্ক হচ্ছে...', 'Syncing...') : tr('এখনই সিঙ্ক করো', 'Sync Now')}
            </button>
          )}
          {syncDoneMessage && isOnline && pendingCount === 0 && (
            <button
              type="button"
              onClick={() => setSyncDoneMessage(null)}
              className="text-emerald-700 hover:underline font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
