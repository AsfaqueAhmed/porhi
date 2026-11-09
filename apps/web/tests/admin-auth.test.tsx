import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import AdminLoginPage from '../src/app/admin/login/page';
import { resolveSafeAdminRedirect } from '../src/lib/admin-auth';
import AdminLayout from '../src/app/admin/layout';
import { useAdminAuthStore } from '../src/store/admin-auth-store';
import { apiClient, ApiError } from '../src/lib/api-client';
import { CurriculumManager } from '../src/components/admin/curriculum-manager';
import { AuthoringStudio } from '../src/components/admin/authoring-studio';
import { ModelTestManager } from '../src/components/admin/model-test-manager';
import { AdminTopbar } from '../src/components/admin/layout/AdminTopbar';
import { AdminSidebar } from '../src/components/admin/layout/AdminSidebar';
import { ReviewConsole } from '../src/components/admin/review-console';
import AdminOverviewPage from '../src/app/admin/page';

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

  it('validates safe ?next= redirects to prevent open redirects, path traversal, or login loops', () => {
    expect(resolveSafeAdminRedirect(null)).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin')).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin/curriculum')).toBe('/admin/curriculum');
    expect(resolveSafeAdminRedirect('/admin/login')).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin/login?next=/admin')).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin/login/')).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin/./login')).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin/../dashboard')).toBe('/admin');
    expect(resolveSafeAdminRedirect('/admin/reviews?tab=pending')).toBe('/admin/reviews?tab=pending');
    expect(resolveSafeAdminRedirect('  /admin/curriculum#top  ')).toBe('/admin/curriculum#top');
    expect(resolveSafeAdminRedirect('/admin/\ndashboard')).toBe('/admin');
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

  it('surfaces authorization error banner instead of faking success when CurriculumManager gets 403', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue([]);
    vi.spyOn(apiClient, 'post').mockRejectedValueOnce(
      new ApiError(403, 'Forbidden', { message: 'Forbidden resource' }),
    );

    render(<CurriculumManager />);

    fireEvent.click(screen.getByRole('button', { name: /নতুন বিষয় যোগ করুন/i }));
    fireEvent.change(screen.getByLabelText(/বিষয়ের বাংলা নাম/i), {
      target: { value: 'উচ্চতর গণিত' },
    });
    const codeInput = screen.getByLabelText(/ইউনিক কোড/i);
    fireEvent.change(codeInput, { target: { value: 'ssc_higher_math' } });
    fireEvent.click(screen.getByRole('button', { name: /বিষয় সংরক্ষণ করো/i }));

    expect(await screen.findByRole('alert')).toBeDefined();
    expect(screen.getByText(/অনুমতি নেই|লগইন|ব্যর্থ হয়েছে/i)).toBeDefined();
    expect(screen.queryByText(/উচ্চতর গণিত/i)).toBeNull();
  });

  it('surfaces authorization error banner instead of faking status update when ReviewConsole gets 401', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue([]);
    vi.spyOn(apiClient, 'post').mockRejectedValueOnce(
      new ApiError(401, 'Unauthorized', { message: 'Unauthorized' }),
    );

    render(<ReviewConsole />);

    fireEvent.click(screen.getByRole('button', { name: /সিদ্ধান্ত রেকর্ড ও স্ট্যাটাস আপডেট করো/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toBeDefined();
    expect(alert.textContent).toMatch(/সেশনের মেয়াদ শেষ|পুনরায় লগইন|অনুমতি নেই/i);
    expect(screen.queryByText(/^PUBLISHED$/)).toBeNull();
  });

  it('preserves form inputs and surfaces conflict error on CurriculumManager 409, and blocks toggle-ready on 401', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue([]);
    vi.spyOn(apiClient, 'post')
      .mockRejectedValueOnce(new ApiError(409, 'Conflict', { message: 'Duplicate code' }))
      .mockRejectedValueOnce(new ApiError(401, 'Unauthorized', { message: 'Expired' }));

    render(<CurriculumManager />);

    fireEvent.click(screen.getByRole('button', { name: /নতুন বিষয় যোগ করুন/i }));
    fireEvent.change(screen.getByLabelText(/বিষয়ের বাংলা নাম/i), {
      target: { value: 'উচ্চতর গণিত' },
    });
    fireEvent.change(screen.getByLabelText(/ইউনিক কোড/i), {
      target: { value: 'ssc_higher_math' },
    });
    fireEvent.click(screen.getByRole('button', { name: /বিষয় সংরক্ষণ করো/i }));

    const conflictAlert = await screen.findByRole('alert');
    expect(conflictAlert.textContent).toMatch(/ইতোমধ্যে সংরক্ষিত/i);
    expect(screen.queryByText(/উচ্চতর গণিত/i)).toBeNull();

    // Reopening the drawer should keep user inputs intact
    fireEvent.click(screen.getByRole('button', { name: /নতুন বিষয় যোগ করুন/i }));
    expect((screen.getByLabelText(/বিষয়ের বাংলা নাম/i) as HTMLInputElement).value).toBe('উচ্চতর গণিত');
    expect((screen.getByLabelText(/ইউনিক কোড/i) as HTMLInputElement).value).toBe('ssc_higher_math');
    fireEvent.click(screen.getByRole('button', { name: /বাতিল/i }));

    // Toggle ready should NOT flip Live/Draft badge when API returns 401
    const toggleBtn = screen.getByRole('button', { name: /সচল \(Live\)/i });
    fireEvent.click(toggleBtn);

    const authAlert = await screen.findByRole('alert');
    expect(authAlert.textContent).toMatch(/সেশনের মেয়াদ শেষ/i);
    expect(screen.getByRole('button', { name: /সচল \(Live\)/i })).toBeDefined();
  });

  it('surfaces 403 error and skips onStatusUpdated callback on ReviewConsole', async () => {
    const onStatusUpdated = vi.fn();
    vi.spyOn(apiClient, 'get').mockResolvedValue([]);
    vi.spyOn(apiClient, 'post').mockRejectedValueOnce(
      new ApiError(403, 'Forbidden', { message: 'Forbidden' }),
    );

    render(<ReviewConsole onStatusUpdated={onStatusUpdated} />);

    fireEvent.click(screen.getByRole('button', { name: /সিদ্ধান্ত রেকর্ড ও স্ট্যাটাস আপডেট করো/i }));

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toMatch(/অনুমতি নেই/i);
    expect(onStatusUpdated).not.toHaveBeenCalled();
    expect(screen.queryByText(/^PUBLISHED$/)).toBeNull();
  });

  it('loads admin overview subjects via apiClient with admin scope', async () => {
    const getSpy = vi.spyOn(apiClient, 'get').mockResolvedValueOnce([
      {
        id: 'sub_1',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        classLevel: 'CLASS_9_10',
        syllabusYear: 2026,
        isReady: true,
        chapterCount: 5,
      },
    ]);

    render(<AdminOverviewPage />);

    expect(await screen.findByText('পদার্থবিজ্ঞান')).toBeDefined();
    expect(getSpy).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
  });

  it('surfaces authorization error banner and preserves inputs on chapter and topic creation ApiError', async () => {
    vi.spyOn(apiClient, 'get').mockImplementation(async (url: string) => {
      if (url.includes('/chapters')) {
        return [
          {
            id: 'chap_1',
            subjectId: 'sub_ssc_physics',
            orderIndex: 1,
            titleBangla: '১ম অধ্যায়: ভৌত রাশি',
            topics: [],
          },
        ];
      }
      return [];
    });
    vi.spyOn(apiClient, 'post')
      .mockRejectedValueOnce(new ApiError(403, 'Forbidden', { message: 'Forbidden' }))
      .mockRejectedValueOnce(new ApiError(401, 'Unauthorized', { message: 'Expired' }));

    render(<CurriculumManager />);

    expect(await screen.findByText(/১ম অধ্যায়: ভৌত রাশি/i)).toBeDefined();

    // Test chapter creation 403
    fireEvent.click(screen.getByRole('button', { name: /\+ এই বিষয়ে নতুন অধ্যায় যোগ করুন/i }));
    fireEvent.change(screen.getByLabelText(/অধ্যায়ের নাম ও নম্বর/i), {
      target: { value: '২য় অধ্যায়: গতি' },
    });
    fireEvent.click(screen.getByRole('button', { name: /অধ্যায় সংরক্ষণ করো/i }));

    const chapterAlert = await screen.findByRole('alert');
    expect(chapterAlert.textContent).toMatch(/অনুমতি নেই/i);
    expect(screen.queryByText(/২য় অধ্যায়: গতি/i)).toBeNull();

    // Test topic creation 401
    fireEvent.click(screen.getByRole('button', { name: /\+ টপিক\/সেকশন যোগ/i }));
    fireEvent.change(screen.getByLabelText(/টপিক\/সেকশনের নাম/i), {
      target: { value: 'পরিমাপের ত্রুটি' },
    });
    fireEvent.click(screen.getByRole('button', { name: /টপিক সংরক্ষণ করো/i }));

    const topicAlert = await screen.findByRole('alert');
    expect(topicAlert.textContent).toMatch(/সেশনের মেয়াদ শেষ/i);
    expect(screen.queryByText(/পরিমাপের ত্রুটি/i)).toBeNull();
  });

  it('AuthoringStudio passes admin scope on curriculum GETs and surfaces 403/400 ApiError in role="alert" without clearing inputs', async () => {
    const getSpy = vi.spyOn(apiClient, 'get').mockImplementation(async (url: string) => {
      if (url === '/curriculum/subjects') {
        return [
          {
            id: 'sub_ssc_physics',
            code: 'ssc_physics',
            nameBangla: 'পদার্থবিজ্ঞান',
            classLevel: 'CLASS_9_10',
            syllabusYear: 2026,
          },
        ];
      }
      return [
        {
          id: 'chap_1',
          titleBangla: '১ম অধ্যায়',
          topics: [{ id: 'top_1', titleBangla: 'টপিক ১' }],
        },
      ];
    });

    vi.spyOn(apiClient, 'post')
      .mockRejectedValueOnce(new ApiError(403, 'Forbidden', { message: 'Forbidden resource' }))
      .mockRejectedValueOnce(
        new ApiError(400, 'Bad Request', {
          message: ['stem should not be empty', 'topicId must be a string'],
        }),
      );

    render(<AuthoringStudio />);

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
      expect(getSpy).toHaveBeenCalledWith('/curriculum/subjects/sub_ssc_physics/chapters', {
        scope: 'admin',
      });
    });

    fireEvent.click(screen.getByText(/নমুনা ভরুন/i));

    const stemInput = screen.getByPlaceholderText(/প্রশ্নের মূল বিবরণ লিখুন/i) as HTMLTextAreaElement;
    fireEvent.change(stemInput, { target: { value: 'কাস্টম পদার্থবিজ্ঞান প্রশ্ন স্টেম' } });

    const submitBtn = screen
      .getByText(/৬-স্তরের ব্যাখ্যাসহ প্রশ্ন জমা দাও/i)
      .closest('button') as HTMLButtonElement;
    expect(submitBtn).not.toBeNull();
    fireEvent.click(submitBtn);

    const alert403 = await screen.findByRole('alert');
    expect(alert403.textContent).toMatch(/অনুমতি নেই/i);
    expect(stemInput.value).toBe('কাস্টম পদার্থবিজ্ঞান প্রশ্ন স্টেম');

    fireEvent.click(submitBtn);

    await waitFor(() => {
      const alert400 = screen.getByRole('alert');
      expect(alert400.textContent).toContain('stem should not be empty, topicId must be a string');
    });
    expect(stemInput.value).toBe('কাস্টম পদার্থবিজ্ঞান প্রশ্ন স্টেম');
  });

  it('CurriculumManager & ModelTestManager pass admin scope on curriculum GETs', async () => {
    const getSpy = vi.spyOn(apiClient, 'get').mockResolvedValue([
      {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        classLevel: 'CLASS_9_10',
        syllabusYear: 2026,
        isReady: true,
      },
    ]);

    render(<CurriculumManager />);

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
      expect(getSpy).toHaveBeenCalledWith('/curriculum/subjects/sub_ssc_physics/chapters', {
        scope: 'admin',
      });
    });

    getSpy.mockClear();
    render(<ModelTestManager />);

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
      expect(getSpy).toHaveBeenCalledWith('/curriculum/subjects/sub_ssc_physics/chapters', {
        scope: 'admin',
      });
    });
  });

  it('AdminLayout bypasses trailing-slash /admin/login/ and recovers unhydrated localStorage token for EDITOR and REVIEWER', async () => {
    mockPathname = '/admin/login/';
    const getSpy = vi.spyOn(apiClient, 'get');

    const { unmount } = render(
      <AdminLayout>
        <div data-testid="login-slash-child">লগইন ফর্ম</div>
      </AdminLayout>,
    );

    expect(screen.getByTestId('login-slash-child')).toBeDefined();
    expect(getSpy).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
    unmount();

    // Verify handleLogout resets mobile drawer open state across re-login
    mockPathname = '/admin/curriculum';
    useAdminAuthStore.getState().setSession('admin_jwt', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      fullName: 'Asfaque',
      role: 'ADMIN',
    });
    vi.spyOn(apiClient, 'get').mockResolvedValue([]);

    const { container, rerender, unmount: unmountMobile } = render(
      <AdminLayout>
        <div data-testid="mobile-protected">সুরক্ষিত</div>
      </AdminLayout>,
    );

    expect(container.querySelector('div[aria-hidden="true"]')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /মেনু টগল/i }));
    expect(container.querySelector('div[aria-hidden="true"]')).not.toBeNull();

    const logoutBtns = screen.getAllByRole('button', { name: /লগআউট/i });
    fireEvent.click(logoutBtns[0]);
    expect(useAdminAuthStore.getState().isVerified).toBe(false);

    act(() => {
      useAdminAuthStore.getState().setSession('admin_jwt_2', {
        id: 'adm_1',
        phoneNumber: '01737740010',
        fullName: 'Asfaque',
        role: 'ADMIN',
      });
    });
    rerender(
      <AdminLayout>
        <div data-testid="mobile-protected">সুরক্ষিত</div>
      </AdminLayout>,
    );
    expect(container.querySelector('div[aria-hidden="true"]')).toBeNull();
    unmountMobile();
    vi.restoreAllMocks();

    for (const role of ['EDITOR', 'REVIEWER'] as const) {
      localStorage.clear();
      useAdminAuthStore.getState().logout();
      mockPathname = '/admin/reviews';
      localStorage.setItem('pori_admin_token', `unhydrated_${role.toLowerCase()}_token`);

      const authSpy = vi.spyOn(apiClient, 'get').mockImplementation(async (url: string) => {
        if (url === '/auth/me') {
          return {
            id: `usr_${role.toLowerCase()}`,
            phoneNumber: '01722223333',
            fullName: `Staff ${role}`,
            role,
          };
        }
        return [];
      });

      const view = render(
        <AdminLayout>
          <div data-testid={`protected-${role}`}>সুরক্ষিত</div>
        </AdminLayout>,
      );

      expect(await screen.findByTestId(`protected-${role}`)).toBeDefined();
      expect(authSpy).toHaveBeenCalledWith('/auth/me', {
        scope: 'admin',
        token: `unhydrated_${role.toLowerCase()}_token`,
      });
      expect(useAdminAuthStore.getState().isVerified).toBe(true);
      expect(useAdminAuthStore.getState().adminUser?.role).toBe(role);

      view.unmount();
      vi.restoreAllMocks();
    }
  });

  it('AdminTopbar pings /curriculum/subjects with admin scope and AdminTopbar/AdminSidebar logout controls have pointer cursor and title', async () => {
    useAdminAuthStore.getState().setSession('admin_jwt', {
      id: 'adm_1',
      phoneNumber: '01737740010',
      fullName: 'Asfaque',
      role: 'ADMIN',
    });

    const getSpy = vi.spyOn(apiClient, 'get').mockResolvedValue([]);

    render(
      <>
        <AdminTopbar isCollapsed={false} onToggleCollapse={vi.fn()} />
        <AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />
      </>,
    );

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
    });

    const logoutBtns = screen.getAllByRole('button', { name: /লগআউট/i });
    expect(logoutBtns.length).toBe(2);
    for (const btn of logoutBtns) {
      expect(btn.getAttribute('title')).toBe('লগআউট');
      expect(btn.className).toContain('cursor-pointer');
    }
  });

  it('displays Bengali 400 validation banner on /admin/login', async () => {
    mockPathname = '/admin/login';
    vi.spyOn(apiClient, 'post').mockRejectedValueOnce(
      new ApiError(400, 'Bad Request', {
        message: ['Password must be at least 6 characters'],
      }),
    );

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByLabelText(/মোবাইল নম্বর/i), {
      target: { value: '01737740010' },
    });
    fireEvent.change(screen.getByLabelText(/পাসওয়ার্ড/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /লগইন করুন/i }));

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toMatch(/সঠিক ১১ সংখ্যার মোবাইল নম্বর.*৬ অক্ষরের পাসওয়ার্ড/i);
  });

  it('CurriculumManager shows contextual 403 roles, preserves reopened chapter/topic drawer inputs, and handles 400/500 ApiError', async () => {
    vi.spyOn(apiClient, 'get').mockImplementation(async (url: string) => {
      if (url.includes('/chapters')) {
        return [
          {
            id: 'chap_1',
            subjectId: 'sub_ssc_physics',
            orderIndex: 1,
            titleBangla: '১ম অধ্যায়: ভৌত রাশি',
            topics: [],
          },
        ];
      }
      return [];
    });

    vi.spyOn(apiClient, 'post')
      .mockRejectedValueOnce(new ApiError(403, 'Forbidden', { message: 'Forbidden' }))
      .mockRejectedValueOnce(new ApiError(403, 'Forbidden', { message: 'Forbidden' }))
      .mockRejectedValueOnce(new ApiError(403, 'Forbidden', { message: 'Forbidden' }))
      .mockRejectedValueOnce(new ApiError(400, 'Bad Request', { message: 'Invalid payload' }))
      .mockRejectedValueOnce(new ApiError(500, 'Internal Server Error', { message: 'Boom' }));

    render(<CurriculumManager />);
    expect(await screen.findByText(/১ম অধ্যায়: ভৌত রাশি/i)).toBeDefined();

    // Subject 403 -> Admin অধিকার প্রয়োজন
    fireEvent.click(screen.getByRole('button', { name: /নতুন বিষয় যোগ করুন/i }));
    fireEvent.change(screen.getByLabelText(/বিষয়ের বাংলা নাম/i), {
      target: { value: 'জীববিজ্ঞান' },
    });
    fireEvent.change(screen.getByLabelText(/ইউনিক কোড/i), {
      target: { value: 'ssc_bio' },
    });
    fireEvent.click(screen.getByRole('button', { name: /বিষয় সংরক্ষণ করো/i }));

    const subjectAlert = await screen.findByRole('alert');
    expect(subjectAlert.textContent).toContain('Admin অধিকার প্রয়োজন');
    expect(subjectAlert.textContent).not.toContain('Editor বা Admin');

    // Chapter 403 -> Editor বা Admin অধিকার প্রয়োজন + preserved on reopen
    fireEvent.click(screen.getByRole('button', { name: /\+ এই বিষয়ে নতুন অধ্যায় যোগ করুন/i }));
    fireEvent.change(screen.getByLabelText(/অধ্যায়ের নাম ও নম্বর/i), {
      target: { value: '৩য় অধ্যায়: বল' },
    });
    fireEvent.click(screen.getByRole('button', { name: /অধ্যায় সংরক্ষণ করো/i }));

    const chapterAlert = await screen.findByRole('alert');
    expect(chapterAlert.textContent).toContain('Editor বা Admin অধিকার প্রয়োজন');

    fireEvent.click(screen.getByRole('button', { name: /\+ এই বিষয়ে নতুন অধ্যায় যোগ করুন/i }));
    expect((screen.getByLabelText(/অধ্যায়ের নাম ও নম্বর/i) as HTMLInputElement).value).toBe(
      '৩য় অধ্যায়: বল',
    );
    fireEvent.click(screen.getByRole('button', { name: /বাতিল/i }));

    // Topic 403 -> Editor বা Admin অধিকার প্রয়োজন + preserved on reopen
    fireEvent.click(screen.getByRole('button', { name: /\+ টপিক\/সেকশন যোগ/i }));
    fireEvent.change(screen.getByLabelText(/টপিক\/সেকশনের নাম/i), {
      target: { value: 'নিউটনের সূত্র' },
    });
    fireEvent.click(screen.getByRole('button', { name: /টপিক সংরক্ষণ করো/i }));

    const topicAlert = await screen.findByRole('alert');
    expect(topicAlert.textContent).toContain('Editor বা Admin অধিকার প্রয়োজন');

    fireEvent.click(screen.getByRole('button', { name: /\+ টপিক\/সেকশন যোগ/i }));
    expect((screen.getByLabelText(/টপিক\/সেকশনের নাম/i) as HTMLInputElement).value).toBe(
      'নিউটনের সূত্র',
    );
    fireEvent.click(screen.getByRole('button', { name: /বাতিল/i }));

    // Default 400 ApiError handling
    fireEvent.click(screen.getByRole('button', { name: /\+ টপিক\/সেকশন যোগ/i }));
    fireEvent.click(screen.getByRole('button', { name: /টপিক সংরক্ষণ করো/i }));

    const alert400 = await screen.findByRole('alert');
    expect(alert400.textContent).toContain('সার্ভারে সংরক্ষণ ব্যর্থ হয়েছে');

    // Default 500 ApiError handling
    fireEvent.click(screen.getByRole('button', { name: /\+ টপিক\/সেকশন যোগ/i }));
    fireEvent.click(screen.getByRole('button', { name: /টপিক সংরক্ষণ করো/i }));

    const alert500 = await screen.findByRole('alert');
    expect(alert500.textContent).toContain('সার্ভারে সংরক্ষণ ব্যর্থ হয়েছে');
  });
});
