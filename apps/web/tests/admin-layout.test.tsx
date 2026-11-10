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
    it('renders brand, collapsible Curriculum & Questions submenus, and hides submenus when collapsed', () => {
      const handleToggle = vi.fn();
      const first = render(<AdminSidebar isCollapsed={false} onToggleCollapse={handleToggle} />);

      expect(screen.getByText(/poRi Admin/i)).toBeDefined();
      expect(screen.getByText(/কারিকুলাম ও পাঠ/i)).toBeDefined();
      expect(screen.getByText(/বিষয়, অধ্যায় ও টপিক/i).closest('a')?.getAttribute('href')).toBe(
        '/admin/curriculum',
      );
      expect(screen.getByText(/পাঠ্য লেসন/i).closest('a')?.getAttribute('href')).toBe(
        '/admin/curriculum/lessons',
      );
      expect(screen.getByText(/প্রশ্ন ব্যাংক ও স্টুডিও/i).closest('a')?.getAttribute('href')).toBe(
        '/admin/questions',
      );
      expect(screen.getByText(/MCQ প্রশ্ন/i).closest('a')?.getAttribute('href')).toBe(
        '/admin/questions/mcq',
      );
      expect(screen.getByText(/সৃজনশীল \(CQ\)/i).closest('a')?.getAttribute('href')).toBe(
        '/admin/questions/cq',
      );
      expect(screen.getByText(/মডেল টেস্ট/i)).toBeDefined();
      expect(screen.getByText(/রিভিউ ও অডিট কনসোল/i)).toBeDefined();
      expect(screen.getByText(/শিক্ষার্থী অ্যাপে যান/i)).toBeDefined();

      // Submenu chevron toggle collapses & re-expands child links
      const toggleQuestionsBtn = screen.getByRole('button', {
        name: /প্রশ্ন ব্যাংক ও স্টুডিও সাবমেনু টগল/i,
      });
      fireEvent.click(toggleQuestionsBtn);
      expect(screen.queryByText(/MCQ প্রশ্ন/i)).toBeNull();
      fireEvent.click(toggleQuestionsBtn);
      expect(screen.getByText(/MCQ প্রশ্ন/i)).toBeDefined();

      // Collapsed icon rail hides expanded child submenus
      first.unmount();
      render(<AdminSidebar isCollapsed={true} onToggleCollapse={handleToggle} />);
      expect(screen.queryByText(/বিষয়, অধ্যায় ও টপিক/i)).toBeNull();
      expect(screen.queryByText(/MCQ প্রশ্ন/i)).toBeNull();
    });

    it('toggles collapse state when toggle button is clicked', () => {
      const handleToggle = vi.fn();
      render(<AdminSidebar isCollapsed={false} onToggleCollapse={handleToggle} />);

      const toggleBtn = screen.getByRole('button', { name: /কোল্যাপস/i });
      fireEvent.click(toggleBtn);
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });

    it('highlights active Question and Curriculum submenus accurately across nested routes', () => {
      mockPathname = '/admin/questions/mcq';
      const mcqRender = render(<AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText(/প্রশ্ন ব্যাংক ও স্টুডিও/i).closest('a')?.className).toContain(
        'bg-indigo-50',
      );
      expect(screen.getByText(/MCQ প্রশ্ন/i).closest('a')?.className).toContain('bg-indigo-50');
      expect(screen.getByText(/সৃজনশীল \(CQ\)/i).closest('a')?.className).not.toContain(
        'bg-indigo-50',
      );
      mcqRender.unmount();

      mockPathname = '/admin/questions/cq';
      const cqRender = render(<AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText(/প্রশ্ন ব্যাংক ও স্টুডিও/i).closest('a')?.className).toContain(
        'bg-indigo-50',
      );
      expect(screen.getByText(/সৃজনশীল \(CQ\)/i).closest('a')?.className).toContain(
        'bg-indigo-50',
      );
      expect(screen.getByText(/MCQ প্রশ্ন/i).closest('a')?.className).not.toContain(
        'bg-indigo-50',
      );
      cqRender.unmount();

      mockPathname = '/admin/curriculum';
      const curriculumRender = render(
        <AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />,
      );
      expect(screen.getByText(/কারিকুলাম ও পাঠ/i).closest('a')?.className).toContain(
        'bg-indigo-50',
      );
      expect(screen.getByText(/বিষয়, অধ্যায় ও টপিক/i).closest('a')?.className).toContain(
        'bg-indigo-50',
      );
      expect(screen.getByText(/পাঠ্য লেসন/i).closest('a')?.className).not.toContain(
        'bg-indigo-50',
      );
      curriculumRender.unmount();

      mockPathname = '/admin/curriculum/lessons/les_1/edit';
      const lessonsRender = render(<AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText(/পাঠ্য লেসন/i).closest('a')?.className).toContain('bg-indigo-50');
      expect(screen.getByText(/বিষয়, অধ্যায় ও টপিক/i).closest('a')?.className).not.toContain(
        'bg-indigo-50',
      );
      lessonsRender.unmount();

      mockPathname = '/admin/questions/new';
      const newRender = render(<AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText(/প্রশ্ন ব্যাংক ও স্টুডিও/i).closest('a')?.className).toContain(
        'bg-indigo-50',
      );
      newRender.unmount();

      mockPathname = '/admin/questions/q_1/edit';
      render(<AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText(/প্রশ্ন ব্যাংক ও স্টুডিও/i).closest('a')?.className).toContain(
        'bg-indigo-50',
      );
      expect(screen.getByText(/কারিকুলাম ও পাঠ/i).closest('a')?.className).not.toContain(
        'bg-indigo-50',
      );
    });

    it('auto-expands a collapsed submenu group when navigating into one of its child routes', () => {
      mockPathname = '/admin';
      const view = render(<AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />);

      const toggleQuestionsBtn = screen.getByRole('button', {
        name: /প্রশ্ন ব্যাংক ও স্টুডিও সাবমেনু টগল/i,
      });
      fireEvent.click(toggleQuestionsBtn);
      expect(screen.queryByText(/MCQ প্রশ্ন/i)).toBeNull();

      mockPathname = '/admin/questions/cq';
      view.rerender(<AdminSidebar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText(/সৃজনশীল \(CQ\)/i)).toBeDefined();
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

    it('hides নতুন কনটেন্ট quick action link for REVIEWER role in AdminTopbar', () => {
      render(
        <AdminTopbar
          userRole="REVIEWER"
          isCollapsed={false}
          onToggleCollapse={vi.fn()}
        />
      );

      expect(screen.queryByText(/নতুন কনটেন্ট/i)).toBeNull();
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

    it('renders granular breadcrumbs for MCQ, CQ, and Curriculum Lesson sub-routes', async () => {
      mockPathname = '/admin/questions/mcq';
      const view1 = render(<AdminTopbar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText('প্রশ্ন ব্যাংক').closest('a')?.getAttribute('href')).toBe(
        '/admin/questions',
      );
      expect(screen.getByText('MCQ')).toBeDefined();
      view1.unmount();

      mockPathname = '/admin/questions/cq';
      const view2 = render(<AdminTopbar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText('সৃজনশীল (CQ)')).toBeDefined();
      view2.unmount();

      mockPathname = '/admin/curriculum/lessons';
      const viewLessons = render(<AdminTopbar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText('কারিকুলাম').closest('a')?.getAttribute('href')).toBe(
        '/admin/curriculum',
      );
      expect(screen.getByText('পাঠ্য লেসন')).toBeDefined();
      viewLessons.unmount();

      mockPathname = '/admin/curriculum/lessons/new';
      const view3 = render(<AdminTopbar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText('কারিকুলাম').closest('a')?.getAttribute('href')).toBe(
        '/admin/curriculum',
      );
      expect(screen.getByText('পাঠ্য লেসন').closest('a')?.getAttribute('href')).toBe(
        '/admin/curriculum/lessons',
      );
      expect(screen.getByText('নতুন যোগ')).toBeDefined();
      view3.unmount();

      mockPathname = '/admin/curriculum/lessons/les_1/edit';
      render(<AdminTopbar isCollapsed={false} onToggleCollapse={vi.fn()} />);
      expect(screen.getByText('লেসন সম্পাদনা')).toBeDefined();

      await waitFor(() => {
        expect(apiClient.get).toHaveBeenCalled();
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
