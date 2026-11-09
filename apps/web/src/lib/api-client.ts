import { useUserStore } from '@/store/user-store';
import { useAdminAuthStore, ADMIN_TOKEN_STORAGE_KEY } from '@/store/admin-auth-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: unknown,
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}

export interface RequestOptions extends RequestInit {
  token?: string;
  scope?: 'student' | 'admin';
}

function getPathname(endpoint: string): string {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    try {
      return new URL(endpoint).pathname;
    } catch {
      // Fallback to relative path parsing
    }
  }
  const pathWithoutQuery = endpoint.split(/[?#]/)[0] || '/';
  return pathWithoutQuery.startsWith('/') ? pathWithoutQuery : `/${pathWithoutQuery}`;
}

function isAdminEndpoint(endpoint: string): boolean {
  const pathname = getPathname(endpoint);
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const { scope, token: explicitToken, ...fetchOptions } = options;
  const pathname = getPathname(endpoint);
  const isAdminScope = scope === 'admin' || (!scope && isAdminEndpoint(endpoint));

  // Resolve authorization token with strict student/admin isolation
  let token = explicitToken;
  if (!token) {
    if (isAdminScope) {
      try {
        token = useAdminAuthStore.getState().token ?? undefined;
      } catch {
        // Running outside store
      }
      if (!token && typeof window !== 'undefined') {
        token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) ?? undefined;
      }
    } else {
      try {
        token = useUserStore.getState().token ?? undefined;
      } catch {
        // Running outside store
      }
      if (!token && typeof window !== 'undefined') {
        token = localStorage.getItem('pori_auth_token') ?? undefined;
      }
    }
  }

  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 && isAdminScope && pathname !== '/auth/admin/login') {
      try {
        useAdminAuthStore.getState().logout();
      } catch {
        // Running outside store
      }
    }

    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }
    throw new ApiError(response.status, response.statusText, errorData);
  }

  // Check if content-type is json
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as unknown as T;
}

export const apiClient = {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'GET' });
  },
  post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },
  put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },
  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
