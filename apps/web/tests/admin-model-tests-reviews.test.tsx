import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AdminModelTestsPage from '../src/app/admin/model-tests/page';
import AdminReviewsPage from '../src/app/admin/reviews/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('Admin Model Tests & Reviews Pages', () => {
  it('renders model tests manager page with presets and configurator button', () => {
    render(<AdminModelTestsPage />);

    expect(screen.getByText(/অধ্যায় ও বিষয়ভিত্তিক মডেল টেস্ট কনফিগারেশন/i)).toBeDefined();
    expect(screen.getByText(/নতুন মডেল টেস্ট তৈরি করো/i)).toBeDefined();
  });

  it('renders editorial review console page with review queue and simulator', () => {
    render(<AdminReviewsPage />);

    expect(screen.getByText(/এডিটোরিয়াল রিভিউ ও অডিট কনসোল/i)).toBeDefined();
    expect(screen.getByText(/পেন্ডিং অনুমোদন কিউ/i)).toBeDefined();
  });
});
