import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import AdminOverviewPage from '../src/app/admin/page';
import { apiClient } from '../src/lib/api-client';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/admin',
}));

describe('Admin Overview Page', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders KPI metrics cards, quick actions, and updated /admin/questions & /admin/questions/new links', async () => {
    const getSpy = vi.spyOn(apiClient, 'get').mockResolvedValueOnce([]);
    render(<AdminOverviewPage />);

    expect(screen.getByText(/এডটেক কন্ট্রোল ওভারভিউ/i)).toBeDefined();
    expect(screen.getByText(/মোট বিষয়/i)).toBeDefined();
    expect(screen.getByText(/মোট অধ্যায়/i)).toBeDefined();
    expect(screen.getByText(/৬-লেয়ার প্রশ্ন ব্যাংক/i)).toBeDefined();
    expect(screen.getByText(/পেন্ডিং রিভিউ/i)).toBeDefined();
    expect(screen.getByText(/দ্রুত অ্যাকশন/i)).toBeDefined();

    expect(screen.getByText('প্রশ্ন ব্যাংক').closest('a')?.getAttribute('href')).toBe(
      '/admin/questions',
    );
    expect(screen.getByText(/৬-লেয়ার প্রশ্ন তৈরি/i).closest('a')?.getAttribute('href')).toBe(
      '/admin/questions/new',
    );

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
      expect(screen.getByText(/কোনো বিষয় পাওয়া যায়নি/i)).toBeDefined();
    });
  });
});

