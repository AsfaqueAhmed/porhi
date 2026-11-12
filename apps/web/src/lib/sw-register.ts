export async function registerServiceWorker(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const host = window.location.hostname;
  const isLocalDev = host === 'localhost' || host === '127.0.0.1';

  // Keep Next.js dev server free of stale service worker caches
  if (isLocalDev) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((reg) => reg.unregister()));
    } catch {
      // Ignore cleanup errors
    }
    return;
  }

  try {
    await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  } catch {
    // Ignore registration failures gracefully
  }
}
