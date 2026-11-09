export function resolveSafeAdminRedirect(nextParam: string | null): string {
  if (!nextParam) {
    return '/admin';
  }

  const trimmed = nextParam.trim();
  if (
    !trimmed ||
    !trimmed.startsWith('/') ||
    trimmed.startsWith('//') ||
    trimmed.includes('\\') ||
    /[\u0000-\u001F\u007F]/.test(trimmed)
  ) {
    return '/admin';
  }

  try {
    const parsed = new URL(trimmed, 'http://localhost');
    if (parsed.origin !== 'http://localhost') {
      return '/admin';
    }

    const normalizedPath = parsed.pathname.replace(/\/+$/, '') || '/';
    const isAdminRoute = normalizedPath === '/admin' || normalizedPath.startsWith('/admin/');
    const isLoginRoute =
      normalizedPath === '/admin/login' || normalizedPath.startsWith('/admin/login/');

    if (!isAdminRoute || isLoginRoute) {
      return '/admin';
    }

    return `${normalizedPath === '/admin' ? '/admin' : parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return '/admin';
  }
}
