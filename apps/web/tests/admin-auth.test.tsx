import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import AdminLoginPage from '../src/app/admin/login/page';
import { resolveSafeAdminRedirect } from '../src/lib/admin-auth';
import AdminLayout from '../src/app/admin/layout';
import { useAdminAuthStore } from '../src/store/admin-auth-store';
import { apiClient, ApiError } from '../src/lib/api-client';

const mockPush = vi.fn();
const mockReplace = vi.fn();
let mockPathname = '/admin/curriculum';
let mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: mockPush, replace: mockReplace, prefetch: vi.fn() }),
  useSearchParams: () => mockSearchParams,
}));

describe('Admin Authorization UI & Layout Guard', () => {
  beforeEach(() => {
    localStorage.clear();
    useAdminAuthStore.getState().logout();
    mockPush.mockReset();
    mockReplace.mockReset();
    mockPathname = '/admin/curriculum';
    mockSearchParams = new URLSearchParams();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('validates safe ?next= redirects to prevent open redirects or login loops', () => {
    expect(resolveSafeAdminRedirect(null)).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin')).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin/curriculum')).toBe('/admin/curriculum');
    expect(resolveSafeAdminRedirect('/admin/login')).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin/login?next=/admin')).toBe('/admin');
    expect(resolveSafeAdminRedirect('https://evil.com')).toBe('/admin');
    expect(resolveSafeAdminRedirect('//evil.com')).toBe('/admin');
    expect(resolveSafeAdminRedirect('/dashboard')).toBe('/admin');
  });

  it('submits credentials on /admin/login, stores session, and redirects', async () => {
    mockPathname = '/admin/login';
    mockSearchParams = new URLSearchParams('next=/admin/curriculum');

    const postSpy = vi.spyOn(apiClient, 'post').mockResolvedValueOnce({
      accessToken: 'jwt_admin_123',
      user: {
        id: 'adm_1',
        phoneNumber: '01737740010',
        fullName: 'Asfaque (System Admin)',
        role: 'ADMIN',
      },
    });

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByLabelText(/মোবাইল নম্বর/i), {
      target: { value: '01737740010' },
    });
    fireEvent.change(screen.getByLabelText(/পাসওয়ার্ড/i), {
      target: { value: 'Asfaque@321' },
    });
    fireEvent.click(screen.getByRole('button', { name: /লগইন করুন/i }));

    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith(
        '/auth/admin/login',
        { phoneNumber: '01737740010', password: 'Asfaque@321' },
        { scope: 'admin' },
      );
      expect(useAdminAuthStore.getState().token).toBe('jwt_admin_123');
      expect(useAdminAuthStore.getState().isVerified).toBe(true);
      expect(mockReplace).toHaveBeenCalledWith('/admin/curriculum');
    });
  });

  it('toggles password visibility on /admin/login', () => {
    mockPathname = '/admin/login';
    render(<AdminLoginPage />);

    const passwordInput = screen.getByLabelText(/পাসওয়ার্ড/i) as HTMLInputElement;
    expect(passwordInput.type).toBe('password');

    const showBtn = screen.getByRole('button', { name: /অক্ষর দেখান/i });
    fireEvent.click(showBtn);
    expect(passwordInput.type).toBe('text');

    const hideBtn = screen.getByRole('button', { name: /অক্ষর লুকান/i });
    fireEvent.click(hideBtn);
    expect(passwordInput.type).toBe('password');
  });

  it('displays Bengali error banner on 401 invalid credentials', async () => {
    mockPathname = '/admin/login';
    vi.spyOn(apiClient, 'post').mockRejectedValueOnce(
      new ApiError(401, 'Unauthorized', { message: 'Invalid credentials' }),
    );

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByLabelText(/মোবাইল নম্বর/i), {
      target: { value: '01737740010' },
    });
    fireEvent.change(screen.getByLabelText(/পাসওয়ার্ড/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /লগইন করুন/i }));

    expect(await screen.findByText(/ভুল মোবাইল নম্বর অথবা পাসওয়ার্ড/i)).toBeDefined();
  });

  it('displays Bengali error banner on 403 forbidden and network failures', async () => {
    mockPathname = '/admin/login';
    vi.spyOn(apiClient, 'post')
      .mockRejectedValueOnce(new ApiError(403, 'Forbidden', { message: 'Forbidden' }))
      .mockRejectedValueOnce(new Error('Network offline'));

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByLabelText(/মোবাইল নম্বর/i), {
      target: { value: '01712345678' },
    });
    fireEvent.change(screen.getByLabelText(/পাসওয়ার্ড/i), {
      target: { value: 'SomePass@123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /লগইন করুন/i }));

    expect(
      await screen.findByText(/এই অ্যাকাউন্টটির অ্যাডমিন প্যানেলে প্রবেশের অনুমতি নেই/i),
    ).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: /লগইন করুন/i }));

    expect(await screen.findByText(/এপিআই সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি/i)).toBeDefined();
  });

  it('bypasses sidebar, topbar, and auth verification for /admin/login inside AdminLayout', () => {
    mockPathname = '/admin/login';
    const getSpy = vi.spyOn(apiClient, 'get');

    render(
      <AdminLayout>
        <div data-testid="login-page-child">লগইন ফর্ম</div>
      </AdminLayout>,
    );

    expect(screen.getByTestId('login-page-child')).toBeDefined();
    expect(screen.queryByText(/poRi Admin/i)).toBeNull();
    expect(screen.queryByText(/কারিকুলাম ট্রাফি/i)).toBeNull();
    expect(screen.queryByText(/অ্যাডমিন সেশন যাচাই করা হচ্ছে/i)).toBeNull();
    expect(getSpy).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('blocks protected children and redirects unauthenticated user to /admin/login', async () => {
    mockPathname = '/admin/curriculum';

    render(
      <AdminLayout>
        <div data-testid="protected-admin-page">সুরক্ষিত কনটেন্ট</div>
      </AdminLayout>,
    );

    expect(screen.queryByTestId('protected-admin-page')).toBeNull();
    expect(screen.queryByText(/কারিকুলাম ট্রাফি/i)).toBeNull();
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/admin/login?next=%2Fadmin%2Fcurriculum');
    });
  });

  it('rejects STUDENT role from /auth/me and redirects to /admin/login', async () => {
    mockPathname = '/admin/curriculum';
    localStorage.setItem('pori_admin_token', 'student_like_token');
    useAdminAuthStore.setState({ token: 'student_like_token', adminUser: null, isVerified: false });

    vi.spyOn(apiClient, 'get').mockResolvedValueOnce({
      id: 'stu_1',
      phoneNumber: '01712345678',
      role: 'STUDENT',
    });

    render(
      <AdminLayout>
        <div data-testid="protected-admin-page">সুরক্ষিত কনটেন্ট</div>
      </AdminLayout>,
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/admin/login?next=%2Fadmin%2Fcurriculum');
      expect(useAdminAuthStore.getState().token).toBeNull();
    });
    expect(screen.queryByTestId('protected-admin-page')).toBeNull();
  });

  it('renders protected children, admin identity, and supports logout when verified ADMIN', async () => {
    mockPathname = '/admin/curriculum';
    localStorage.setItem('pori_admin_token', 'valid_admin_token');
    useAdminAuthStore.setState({
      token: 'valid_admin_token',
      adminUser: null,
      isVerified: false,
    });

    const getSpy = vi.spyOn(apiClient, 'get').mockImplementation(async (url: string) => {
      if (url === '/auth/me') {
        return {
          id: 'adm_1',
          phoneNumber: '01737740010',
          fullName: 'Asfaque (System Admin)',
          role: 'ADMIN',
        };
      }
      return [];
    });

    render(
      <AdminLayout>
        <div data-testid="protected-admin-page">সুরক্ষিত কনটেন্ট</div>
      </AdminLayout>,
    );

    expect(await screen.findByTestId('protected-admin-page')).toBeDefined();
    expect(getSpy).toHaveBeenCalledWith('/auth/me', {
      scope: 'admin',
      token: 'valid_admin_token',
    });
    expect(screen.getAllByText(/01737740010|Asfaque/i).length).toBeGreaterThanOrEqual(1);

    const logoutBtns = screen.getAllByRole('button', { name: /লগআউট/i });
    expect(logoutBtns.length).toBeGreaterThanOrEqual(2);
    fireEvent.click(logoutBtns[0]);
    expect(useAdminAuthStore.getState().token).toBeNull();
    expect(useAdminAuthStore.getState().adminUser).toBeNull();
    expect(useAdminAuthStore.getState().isVerified).toBe(false);
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/admin/login');
  });

  it('rejects non-staff user returned defensively from /auth/admin/login', async () => {
    mockPathname = '/admin/login';
    vi.spyOn(apiClient, 'post').mockResolvedValueOnce({
      accessToken: 'jwt_student_oops',
      user: {
        id: 'stu_1',
        phoneNumber: '01712345678',
        role: 'STUDENT',
      },
    });

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByLabelText(/মোবাইল নম্বর/i), {
      target: { value: '01712345678' },
    });
    fireEvent.change(screen.getByLabelText(/পাসওয়ার্ড/i), {
      target: { value: 'Password@1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /লগইন করুন/i }));

    expect(
      await screen.findByText(/এই অ্যাকাউন্টটির অ্যাডমিন প্যানেলে প্রবেশের অনুমতি নেই/i),
    ).toBeDefined();
    expect(useAdminAuthStore.getState().token).toBeNull();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('clears session and redirects when /auth/me fails with expired token', async () => {
    mockPathname = '/admin/reviews';
    localStorage.setItem('pori_admin_token', 'expired_token');
    useAdminAuthStore.setState({ token: 'expired_token', adminUser: null, isVerified: false });

    vi.spyOn(apiClient, 'get').mockRejectedValueOnce(
      new ApiError(401, 'Unauthorized', { message: 'Token expired' }),
    );

    render(
      <AdminLayout>
        <div data-testid="protected-admin-page">সুরক্ষিত কনটেন্ট</div>
      </AdminLayout>,
    );

    await waitFor(() => {
      expect(useAdminAuthStore.getState().token).toBeNull();
      expect(localStorage.getItem('pori_admin_token')).toBeNull();
      expect(mockReplace).toHaveBeenCalledWith('/admin/login?next=%2Fadmin%2Freviews');
    });
    expect(screen.queryByTestId('protected-admin-page')).toBeNull();
  });
});
