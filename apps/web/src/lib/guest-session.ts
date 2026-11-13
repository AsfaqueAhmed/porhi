import { apiClient } from '@/lib/api-client';
import { useUserStore } from '@/store/user-store';

let inFlightGuestPromise: Promise<{ token: string; guestId: string } | null> | null = null;
let cachedGuestLoginEnabled: boolean | null = null;

export async function fetchGuestLoginEnabled(): Promise<boolean> {
  if (cachedGuestLoginEnabled !== null) {
    return cachedGuestLoginEnabled;
  }
  try {
    const res = await apiClient.get<{ guestLoginEnabled?: boolean }>('/auth/config');
    if (typeof res?.guestLoginEnabled === 'boolean') {
      cachedGuestLoginEnabled = res.guestLoginEnabled;
      return res.guestLoginEnabled;
    }
  } catch {
    // Fallback to enabled if backend is unreachable
  }
  return true;
}

export function resetGuestLoginConfigCache(): void {
  cachedGuestLoginEnabled = null;
}

/**
 * Ensures the browser session has a valid guest or student JWT before invoking
 * authenticated student endpoints (e.g., exam start, bookmarks, notes sync).
 */
export async function ensureGuestSession(): Promise<{ token: string; guestId: string } | null> {
  const state = useUserStore.getState();

  if (state.token) {
    return {
      token: state.token,
      guestId: state.guestId || state.user?.guestId || '',
    };
  }

  if (inFlightGuestPromise) {
    return inFlightGuestPromise;
  }

  const guestId =
    state.guestId ||
    state.user?.guestId ||
    `guest_${Math.random().toString(36).substring(2, 10)}`;

  state.setGuestId(guestId);

  inFlightGuestPromise = (async () => {
    try {
      const res = await apiClient.post<{ accessToken?: string; user?: any }>('/auth/guest', {
        guestId,
      });

      if (res?.accessToken) {
        const current = useUserStore.getState();
        const resolvedGuestId = res.user?.guestId || guestId;
        current.setGuestId(resolvedGuestId);
        current.setToken(res.accessToken);
        current.setUser(
          res.user || {
            id: resolvedGuestId,
            guestId: resolvedGuestId,
            isGuest: true,
            selectedClass: 'SSC',
          },
        );
        return { token: res.accessToken, guestId: resolvedGuestId };
      }

      if (!useUserStore.getState().user) {
        useUserStore.getState().setUser({
          id: guestId,
          guestId,
          isGuest: true,
          selectedClass: 'SSC',
        });
      }
      return null;
    } catch (err: any) {
      if (err?.status === 403 || String(err?.message || '').toLowerCase().includes('disabled')) {
        cachedGuestLoginEnabled = false;
        return null;
      }
      if (!useUserStore.getState().user) {
        useUserStore.getState().setUser({
          id: guestId,
          guestId,
          isGuest: true,
          selectedClass: 'SSC',
        });
      }
      return null;
    } finally {
      inFlightGuestPromise = null;
    }
  })();

  return inFlightGuestPromise;
}
