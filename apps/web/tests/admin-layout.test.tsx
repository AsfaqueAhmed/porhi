import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { AdminSidebar } from '../src/components/admin/layout/AdminSidebar';
import { AdminTopbar } from '../src/components/admin/layout/AdminTopbar';
import { AdminDrawer } from '../src/components/admin/layout/AdminDrawer';
import { apiClient } from '../src/lib/api-client';

let mockPathname = '/admin/curriculum';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('Admin Layout Components', () => {
  beforeEach(() => {
    mockPathname = '/admin/curriculum';
    vi.spyOn(apiClient, 'get').mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe('AdminSidebar', () => {
    it('renders brand, navigation items, and student app switch', () => {
      const handleToggle = vi.fn();
      render(<AdminSidebar isCollapsed={false} onToggleCollapse={handleToggle} />);

      expect(screen.getByText(/poRi Admin/i)).toBeDefined();
      expect(screen.getByText(/কারিকুলাম ট্রাফি/i)).toBeDefined();
      expect(screen.getByText(/প্রশ্ন ব্যাংক ও স্টুডিও/i)).toBeDefined();
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

    it('highlights প্রশ্ন ব্যাংক ও স্টুডিও across /admin/questions/new and /admin/questions/[id]/edit', () => {
      mockPathname = '/admin/questions/new';
      const first = render(<AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />);

      const questionsLinkNew = screen.getByText(/প্রশ্ন ব্যাংক ও স্টুডিও/i).closest('a');
      const overviewLinkNew = screen.getByText(/ড্যাশবোর্ড ওভারভিউ/i).closest('a');
      expect(questionsLinkNew?.getAttribute('href')).toBe('/admin/questions');
      expect(questionsLinkNew?.className).toContain('bg-indigo-50');
      expect(questionsLinkNew?.className).toContain('text-indigo-700');
      expect(overviewLinkNew?.className).not.toContain('bg-indigo-50');
      first.unmount();

      mockPathname = '/admin/questions/q_motion_mcq_1/edit';
      render(<AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />);

      const questionsLinkEdit = screen.getByText(/প্রশ্ন ব্যাংক ও স্টুডিও/i).closest('a');
      const curriculumLinkEdit = screen.getByText(/কারিকুলাম ট্রাফি/i).closest('a');
      expect(questionsLinkEdit?.className).toContain('bg-indigo-50');
      expect(questionsLinkEdit?.className).toContain('text-indigo-700');
      expect(curriculumLinkEdit?.className).not.toContain('bg-indigo-50');
    });
  });

  describe('AdminTopbar', () => {
    it('renders breadcrumbs, API connectivity indicator, and নতুন কনটেন্ট link to /admin/questions/new', async () => {
      render(
        <AdminTopbar
          isCollapsed={false}
          onToggleCollapse={vi.fn()}
        />
      );

      expect(screen.getByText(/অ্যাডমিন/i)).toBeDefined();
      expect(screen.getByText(/কারিকুলাম/i)).toBeDefined();

      const newContentLink = screen.getByText(/নতুন কনটেন্ট/i).closest('a');
      expect(newContentLink?.getAttribute('href')).toBe('/admin/questions/new');

      await waitFor(() => {
        expect(apiClient.get).toHaveBeenCalledWith('/curriculum/subjects', { scope: 'admin' });
      });
    });

    it('renders question bank breadcrumbs for /admin/questions/new and /admin/questions/[id]/edit', async () => {
      mockPathname = '/admin/questions/new';
      const firstRender = render(
        <AdminTopbar isCollapsed={false} onToggleCollapse={vi.fn()} />,
      );

      expect(screen.getByText('প্রশ্ন ব্যাংক').closest('a')?.getAttribute('href')).toBe(
        '/admin/questions',
      );
      expect(screen.getByText('নতুন যোগ')).toBeDefined();

      await waitFor(() => {
        expect(apiClient.get).toHaveBeenCalled();
      });
      firstRender.unmount();

      mockPathname = '/admin/questions/q_motion_mcq_1/edit';
      render(<AdminTopbar isCollapsed={false} onToggleCollapse={vi.fn()} />);

      expect(screen.getByText('প্রশ্ন ব্যাংক').closest('a')?.getAttribute('href')).toBe(
        '/admin/questions',
      );
      expect(screen.getByText('প্রশ্ন সম্পাদনা')).toBeDefined();

      await waitFor(() => {
        expect(apiClient.get).toHaveBeenCalledTimes(2);
      });
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
