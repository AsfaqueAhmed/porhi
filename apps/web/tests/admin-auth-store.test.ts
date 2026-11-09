import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  useAdminAuthStore,
  ADMIN_TOKEN_STORAGE_KEY,
  isAllowedAdminRole,
  type AdminUserProfile,
} from '../src/store/admin-auth-store';
import { useUserStore } from '../src/store/user-store';
import { apiClient, ApiError } from '../src/lib/api-client';

describe('useAdminAuthStore & scoped apiClient', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    useAdminAuthStore.getState().logout();
    useUserStore.getState().logout();
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('validates allowed staff roles accurately', () => {
    expect(isAllowedAdminRole('ADMIN')).toBe(true);
    expect(isAllowedAdminRole('EDITOR')).toBe(true);
    expect(isAllowedAdminRole('REVIEWER')).toBe(true);
    expect(isAllowedAdminRole('STUDENT')).toBe(false);
    expect(isAllowedAdminRole(null)).toBe(false);
    expect(isAllowedAdminRole(undefined)).toBe(false);
  });

  it('stores admin session independently from student useUserStore', () => {
    useUserStore.getState().setToken('student_jwt_token');
    useAdminAuthStore.getState().setSession('admin_jwt_token', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      fullName: 'Asfaque (System Admin)',
      role: 'ADMIN',
      selectedClass: 'SSC',
    });

    expect(localStorage.getItem('pori_auth_token')).toBe('student_jwt_token');
    expect(localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)).toBe('admin_jwt_token');
    expect(useAdminAuthStore.getState().isVerified).toBe(true);
    expect(useAdminAuthStore.getState().adminUser?.role).toBe('ADMIN');

    useAdminAuthStore.getState().logout();
    expect(localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)).toBeNull();
    expect(useAdminAuthStore.getState().token).toBeNull();
    expect(useAdminAuthStore.getState().adminUser).toBeNull();
    expect(useAdminAuthStore.getState().isVerified).toBe(false);
    expect(localStorage.getItem('pori_auth_token')).toBe('student_jwt_token');
  });

  it('omits isVerified from persisted pori-admin-auth-storage JSON', () => {
    useAdminAuthStore.getState().setSession('admin_jwt_token', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      fullName: 'Asfaque (System Admin)',
      role: 'ADMIN',
      selectedClass: 'SSC',
    });

    const raw = localStorage.getItem('pori-admin-auth-storage');
    expect(raw).not.toBeNull();
    const persisted = JSON.parse(raw!) as { state: Record<string, unknown> };
    expect(persisted.state.token).toBe('admin_jwt_token');
    expect(persisted.state.adminUser).toBeDefined();
    expect(persisted.state).not.toHaveProperty('isVerified');
  });

  it('never stores passwordHash in admin client state', () => {
    useAdminAuthStore.getState().setSession('admin_jwt_token', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      role: 'ADMIN',
      passwordHash: 'secret_hash',
    } as AdminUserProfile);

    expect(useAdminAuthStore.getState().adminUser).not.toHaveProperty('passwordHash');
    expect(localStorage.getItem('pori-admin-auth-storage')).not.toContain('secret_hash');

    useAdminAuthStore.getState().setVerified(true, {
      id: 'adm_1',
      phoneNumber: '01737740010',
      role: 'ADMIN',
      passwordHash: 'secret_hash_2',
    } as AdminUserProfile);

    expect(useAdminAuthStore.getState().adminUser).not.toHaveProperty('passwordHash');
    expect(localStorage.getItem('pori-admin-auth-storage')).not.toContain('secret_hash_2');
  });

  it('updates verification state via setVerified without losing existing profile', () => {
    useAdminAuthStore.getState().setSession('admin_jwt_token', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      role: 'EDITOR',
    });

    useAdminAuthStore.getState().setVerified(false);
    expect(useAdminAuthStore.getState().isVerified).toBe(false);
    expect(useAdminAuthStore.getState().adminUser?.id).toBe('adm_1');

    useAdminAuthStore.getState().setVerified(true, {
      id: 'adm_1',
      phoneNumber: '01737740010',
      fullName: 'Updated Editor',
      role: 'REVIEWER',
    });
    expect(useAdminAuthStore.getState().isVerified).toBe(true);
    expect(useAdminAuthStore.getState().adminUser?.role).toBe('REVIEWER');
  });

  it('uses admin token automatically on /admin endpoints and never leaks student token', async () => {
    useUserStore.getState().setToken('student_jwt_token');
    fetchMock.mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    );

    // Without admin token, /admin/content/pending must NOT attach student token
    await apiClient.get('/admin/content/pending');
    const firstHeaders = fetchMock.mock.calls[0][1].headers as Headers;
    expect(firstHeaders.get('Authorization')).toBeNull();

    // Student endpoint continues using student token
    await apiClient.get('/progress/summary');
    const studentHeaders = fetchMock.mock.calls[1][1].headers as Headers;
    expect(studentHeaders.get('Authorization')).toBe('Bearer student_jwt_token');

    // With admin token, /admin endpoints use admin token even when student token exists
    useAdminAuthStore.getState().setSession('admin_jwt_token', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      role: 'ADMIN',
    });
    await apiClient.get('/admin/content/pending');
    const secondHeaders = fetchMock.mock.calls[2][1].headers as Headers;
    expect(secondHeaders.get('Authorization')).toBe('Bearer admin_jwt_token');
  });

  it('handles full URLs, query strings, boundary paths, and explicit options cleanly', async () => {
    useUserStore.getState().setToken('student_jwt_token');
    useAdminAuthStore.getState().setSession('admin_jwt_token', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      role: 'ADMIN',
    });

    fetchMock.mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    );

    await apiClient.get('http://localhost:3001/admin/users?page=1');
    await apiClient.get('/admin?tab=overview');
    await apiClient.get('/admin-public/status');
    await apiClient.get('/auth/me', { scope: 'admin', token: 'override_token' });
    await apiClient.get('/admin/content/pending', { scope: 'student' });

    const call0Init = fetchMock.mock.calls[0][1] as Record<string, unknown>;
    const call1Init = fetchMock.mock.calls[1][1] as Record<string, unknown>;
    const call2Init = fetchMock.mock.calls[2][1] as Record<string, unknown>;
    const call3Init = fetchMock.mock.calls[3][1] as Record<string, unknown>;
    const call4Init = fetchMock.mock.calls[4][1] as Record<string, unknown>;

    expect((call0Init.headers as Headers).get('Authorization')).toBe('Bearer admin_jwt_token');
    expect((call1Init.headers as Headers).get('Authorization')).toBe('Bearer admin_jwt_token');
    expect((call2Init.headers as Headers).get('Authorization')).toBe('Bearer student_jwt_token');
    expect((call3Init.headers as Headers).get('Authorization')).toBe('Bearer override_token');
    expect((call4Init.headers as Headers).get('Authorization')).toBe('Bearer student_jwt_token');

    // Custom scope/token options must not leak onto fetch RequestInit
    expect('scope' in call3Init).toBe(false);
    expect('token' in call3Init).toBe(false);
  });

  it('falls back to pori_admin_token in localStorage when admin store token is null', async () => {
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, 'persisted_admin_jwt');
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    await apiClient.get('/admin/content/pending');
    const headers = fetchMock.mock.calls[0][1].headers as Headers;
    expect(headers.get('Authorization')).toBe('Bearer persisted_admin_jwt');
  });

  it('clears stale admin session when admin-scoped request returns 401', async () => {
    useAdminAuthStore.getState().setSession('expired_admin_jwt', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      role: 'ADMIN',
    });

    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        statusText: 'Unauthorized',
        headers: { 'content-type': 'application/json' },
      }),
    );

    await expect(apiClient.get('/auth/me', { scope: 'admin' })).rejects.toBeInstanceOf(ApiError);
    expect(useAdminAuthStore.getState().token).toBeNull();
    expect(useAdminAuthStore.getState().isVerified).toBe(false);
    expect(localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)).toBeNull();
  });

  it('does not clear admin session on /auth/admin/login 401, student 401, or admin 403', async () => {
    useAdminAuthStore.getState().setSession('valid_admin_jwt', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      role: 'REVIEWER',
    });

    fetchMock
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Invalid credentials' }), {
          status: 401,
          statusText: 'Unauthorized',
          headers: { 'content-type': 'application/json' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Unauthorized' }), {
          status: 401,
          statusText: 'Unauthorized',
          headers: { 'content-type': 'application/json' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Forbidden' }), {
          status: 403,
          statusText: 'Forbidden',
          headers: { 'content-type': 'application/json' },
        }),
      );

    await expect(
      apiClient.post('/auth/admin/login', { phoneNumber: '017', password: 'bad' }, { scope: 'admin' }),
    ).rejects.toBeInstanceOf(ApiError);
    expect(useAdminAuthStore.getState().token).toBe('valid_admin_jwt');

    await expect(apiClient.get('/progress/summary')).rejects.toBeInstanceOf(ApiError);
    expect(useAdminAuthStore.getState().token).toBe('valid_admin_jwt');

    await expect(apiClient.get('/admin/content/publish')).rejects.toBeInstanceOf(ApiError);
    expect(useAdminAuthStore.getState().token).toBe('valid_admin_jwt');
  });

  it('reads error response body once and throws ApiError(502) on non-JSON text/html 502 Bad Gateway', async () => {
    fetchMock
      .mockResolvedValueOnce(
        new Response('<html><body>502 Bad Gateway</body></html>', {
          status: 502,
          statusText: 'Bad Gateway',
          headers: { 'content-type': 'text/html' },
        }),
      )
      .mockResolvedValueOnce(
        new Response('', {
          status: 500,
          statusText: 'Internal Server Error',
        }),
      );

    await expect(apiClient.get('/admin/content/pending')).rejects.toMatchObject({
      name: 'ApiError',
      status: 502,
      statusText: 'Bad Gateway',
      data: '<html><body>502 Bad Gateway</body></html>',
    });

    await expect(apiClient.get('/admin/content/pending')).rejects.toMatchObject({
      name: 'ApiError',
      status: 500,
      statusText: 'Internal Server Error',
      data: '',
    });
  });

  it('normalizes URL protocols, relative paths starting with http, and trailing slashes on /auth/admin/login/', async () => {
    useAdminAuthStore.getState().setSession('valid_admin_jwt', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      role: 'ADMIN',
    });

    fetchMock
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Invalid credentials' }), {
          status: 401,
          statusText: 'Unauthorized',
          headers: { 'content-type': 'application/json' },
        }),
      );

    await apiClient.get('/http-status');
    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:3001/http-status');

    await apiClient.get('HTTPS://api.example.com/admin/users');
    expect(fetchMock.mock.calls[1][0]).toBe('HTTPS://api.example.com/admin/users');
    expect((fetchMock.mock.calls[1][1].headers as Headers).get('Authorization')).toBe(
      'Bearer valid_admin_jwt',
    );

    await expect(
      apiClient.post(
        '/auth/admin/login/',
        { phoneNumber: '017', password: 'bad' },
        { scope: 'admin' },
      ),
    ).rejects.toBeInstanceOf(ApiError);
    expect(useAdminAuthStore.getState().token).toBe('valid_admin_jwt');
  });
});
