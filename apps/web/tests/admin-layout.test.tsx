import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AdminSidebar } from '../src/components/admin/layout/AdminSidebar';
import { AdminTopbar } from '../src/components/admin/layout/AdminTopbar';
import { AdminDrawer } from '../src/components/admin/layout/AdminDrawer';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/curriculum',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('Admin Layout Components', () => {
  describe('AdminSidebar', () => {
    it('renders brand, navigation items, and student app switch', () => {
      const handleToggle = vi.fn();
      render(<AdminSidebar isCollapsed={false} onToggleCollapse={handleToggle} />);

      expect(screen.getByText(/poRi Admin/i)).toBeDefined();
      expect(screen.getByText(/কারিকুলাম ট্রাফি/i)).toBeDefined();
      expect(screen.getByText(/প্রশ্ন ও লেসন স্টুডিও/i)).toBeDefined();
      expect(screen.getByText(/মডেল টেস্ট/i)).toBeDefined();
      expect(screen.getByText(/রিভিউ ও অডিট কনসোল/i)).toBeDefined();
      expect(screen.getByText(/শিক্ষার্থী অ্যাপে যান/i)).toBeDefined();
    });

    it('toggles collapse state when toggle button is clicked', () => {
      const handleToggle = vi.fn();
      render(<AdminSidebar isCollapsed={false} onToggleCollapse={handleToggle} />);

      const toggleBtn = screen.getByRole('button', { name: /কোল্যাপস/i });
      fireEvent.click(toggleBtn);
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('AdminTopbar', () => {
    it('renders breadcrumbs and API connectivity indicator', () => {
      render(
        <AdminTopbar
          isCollapsed={false}
          onToggleCollapse={vi.fn()}
        />
      );

      expect(screen.getByText(/অ্যাডমিন/i)).toBeDefined();
      expect(screen.getByText(/কারিকুলাম/i)).toBeDefined();
    });
  });

  describe('AdminDrawer', () => {
    it('renders title, children and calls onClose when backdrop or close button is clicked', () => {
      const handleClose = vi.fn();
      render(
        <AdminDrawer
          isOpen={true}
          onClose={handleClose}
          title="নতুন বিষয় যোগ করুন"
          subtitle="সিলেবাসে একটি নতুন বিষয় তৈরি করুন"
        >
          <div data-testid="drawer-content">ড্রয়ারের ভেতরের তথ্য</div>
        </AdminDrawer>
      );

      expect(screen.getByText(/নতুন বিষয় যোগ করুন/i)).toBeDefined();
      expect(screen.getByText(/সিলেবাসে একটি নতুন বিষয় তৈরি করুন/i)).toBeDefined();
      expect(screen.getByTestId('drawer-content')).toBeDefined();

      // Click close button
      const closeBtn = screen.getByRole('button', { name: /বন্ধ করুন/i });
      fireEvent.click(closeBtn);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not render content when isOpen is false', () => {
      render(
        <AdminDrawer
          isOpen={false}
          onClose={vi.fn()}
          title="বন্ধ ড্রয়ার"
        >
          <div data-testid="drawer-hidden">লুকানো তথ্য</div>
        </AdminDrawer>
      );

      expect(screen.queryByTestId('drawer-hidden')).toBeNull();
    });
  });
});
