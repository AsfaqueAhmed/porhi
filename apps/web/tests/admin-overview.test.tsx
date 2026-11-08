import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AdminOverviewPage from '../src/app/admin/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/admin',
}));

describe('Admin Overview Page', () => {
  it('renders KPI metrics cards, quick actions, and subject completion list', async () => {
    render(<AdminOverviewPage />);

    expect(screen.getByText(/এডটেক কন্ট্রোল ওভারভিউ/i)).toBeDefined();
    expect(screen.getByText(/মোট বিষয়/i)).toBeDefined();
    expect(screen.getByText(/মোট অধ্যায়/i)).toBeDefined();
    expect(screen.getByText(/৬-লেয়ার প্রশ্ন ব্যাংক/i)).toBeDefined();
    expect(screen.getByText(/পেন্ডিং রিভিউ/i)).toBeDefined();
    expect(screen.getByText(/দ্রুত অ্যাকশন/i)).toBeDefined();
  });
});
