export function resolveSafeAdminRedirect(nextParam: string | null): string {
  if (
    nextParam &&
    (nextParam === '/admin' || nextParam.startsWith('/admin/')) &&
    !nextParam.startsWith('//') &&
    !nextParam.includes('\\') &&
    nextParam !== '/admin/login' &&
    !nextParam.startsWith('/admin/login?') &&
    !nextParam.startsWith('/admin/login/') &&
    !nextParam.startsWith('/admin/login#')
  ) {
    return nextParam;
  }
  return '/admin';
}
