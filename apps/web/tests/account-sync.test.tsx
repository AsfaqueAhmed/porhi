import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useUserStore } from '../src/store/user-store';
import { apiClient } from '../src/lib/api-client';
import {
  ensureGuestSession,
  fetchGuestLoginEnabled,
  resetGuestLoginConfigCache,
} from '../src/lib/guest-session';
import AccountPage from '../src/app/account/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/account',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Guest session bootstrap, bookmark/note hydration & /account page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetGuestLoginConfigCache();
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    useUserStore.setState({
      guestId: null,
      token: null,
      user: null,
      bookmarks: [],
      lessonNotes: {},
      reportedIssues: [],
      completedTopics: [],
      topicMastery: {},
      savedMistakes: [],
      examHistory: [],
      studyDates: [],
    } as any);
  });

  it('ensureGuestSession generates and persists guestId + token once, and skips API when token exists', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      accessToken: 'guest_jwt_123',
      user: { id: 'usr_g_1', guestId: 'guest_xyz', isGuest: true, selectedClass: 'SSC' },
    });

    const first = await ensureGuestSession();
    expect(first?.token).toBe('guest_jwt_123');
    expect(useUserStore.getState().token).toBe('guest_jwt_123');
    expect(useUserStore.getState().guestId).toBeTruthy();
    expect(apiClient.post).toHaveBeenCalledWith('/auth/guest', {
      guestId: expect.stringMatching(/^guest_/),
    });

    vi.clearAllMocks();
    const second = await ensureGuestSession();
    expect(second?.token).toBe('guest_jwt_123');
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it('fetchGuestLoginEnabled reads backend config and ensureGuestSession returns null when guest login is disabled', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      guestLoginEnabled: false,
    });
    const enabled = await fetchGuestLoginEnabled(true);
    expect(enabled).toBe(false);
    expect(apiClient.get).toHaveBeenCalledWith('/auth/config');

    vi.mocked(apiClient.post).mockRejectedValueOnce(
      new Error('Guest login is currently disabled (403)'),
    );
    const session = await ensureGuestSession();
    expect(session).toBeNull();
    expect(useUserStore.getState().user).toBeNull();
  });

  it('hydrates bookmarks and lessonNotes from server overview without duplicates', () => {
    useUserStore.setState({
      bookmarks: [
        {
          id: 'top_1',
          type: 'topic',
          titleBangla: '১.১ পদার্থবিজ্ঞান',
          href: '/lesson/top_1',
          createdAt: '2026-11-11T00:00:00Z',
        },
      ],
      lessonNotes: { top_1: 'লোকাল নোট' },
    });

    useUserStore.getState().hydrateFromServerOverview({
      bookmarks: [
        {
          id: 'top_1',
          type: 'topic',
          titleBangla: '১.১ পদার্থবিজ্ঞান',
          href: '/lesson/top_1',
          createdAt: '2026-11-10T00:00:00Z',
        },
        {
          id: 'top_2',
          type: 'topic',
          titleBangla: '১.২ পরিমাপ',
          href: '/lesson/top_2',
          createdAt: '2026-11-12T00:00:00Z',
        },
      ],
      lessonNotes: {
        top_1: 'সার্ভার পুরোনো নোট',
        top_2: 'সার্ভার নতুন নোট',
      },
    } as any);

    const state = useUserStore.getState();
    expect(state.bookmarks).toHaveLength(2);
    expect(state.lessonNotes.top_1).toBe('লোকাল নোট');
    expect(state.lessonNotes.top_2).toBe('সার্ভার নতুন নোট');
  });

  it('upgrades guest account via phone OTP preserving guestId and updates profile on /account', async () => {
    useUserStore.setState({
      guestId: 'guest_local_99',
      token: 'guest_jwt_99',
      user: { id: 'usr_g_99', isGuest: true, selectedClass: 'SSC' },
    });

    vi.mocked(apiClient.get).mockResolvedValue([]);
    vi.mocked(apiClient.post)
      .mockResolvedValueOnce({ message: 'OTP sent' })
      .mockResolvedValueOnce({
        accessToken: 'perm_jwt_1',
        user: {
          id: 'usr_perm_1',
          phoneNumber: '01712345678',
          role: 'STUDENT',
          selectedClass: 'SSC',
          isGuest: false,
        },
        progressMigrated: true,
      });

    vi.mocked(apiClient.patch).mockResolvedValueOnce({
      id: 'usr_perm_1',
      phoneNumber: '01712345678',
      fullName: 'রাফি আহমেদ',
      selectedClass: 'HSC',
      role: 'STUDENT',
      isGuest: false,
    });

    render(<AccountPage />);

    const phoneInput = screen.getByPlaceholderText(/01XXXXXXXXX/i);
    fireEvent.change(phoneInput, { target: { value: '01712345678' } });
    fireEvent.click(screen.getByRole('button', { name: /OTP পাঠান/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/auth/request-otp', {
        phoneNumber: '01712345678',
      });
    });

    const otpInput = await screen.findByPlaceholderText(/১২৩৪|1234/i);
    fireEvent.change(otpInput, { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /ভেরিফাই ও মাইগ্রেট/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/auth/verify-otp', {
        phoneNumber: '01712345678',
        code: '1234',
        guestId: 'guest_local_99',
      });
      expect(useUserStore.getState().token).toBe('perm_jwt_1');
      expect(useUserStore.getState().user?.isGuest).toBe(false);
    });

    const nameInput = screen.getByLabelText(/পূর্ণ নাম/i);
    fireEvent.change(nameInput, { target: { value: 'রাফি আহমেদ' } });
    const hscRadio = screen.getByRole('button', { name: /HSC/i });
    fireEvent.click(hscRadio);
    fireEvent.click(screen.getByRole('button', { name: /প্রোফাইল সংরক্ষণ/i }));

    await waitFor(() => {
      expect(apiClient.patch).toHaveBeenCalledWith('/auth/profile', {
        fullName: 'রাফি আহমেদ',
        selectedClass: 'HSC',
      });
      expect((useUserStore.getState().user as any)?.fullName).toBe('রাফি আহমেদ');
    });
  });
});
