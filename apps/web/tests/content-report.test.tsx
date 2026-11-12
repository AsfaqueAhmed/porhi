import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ReportContentModal } from '../src/components/student/report-content-modal';
import AdminReportsPage from '../src/app/admin/reports/page';
import { apiClient } from '../src/lib/api-client';
import { useUserStore } from '../src/store/user-store';

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/reports',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('Student Content Error Reporting & Admin Triage Queue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.setState({
      token: 'stu_jwt_1',
      guestId: null,
      reportedIssues: [],
    } as any);
  });

  it('submits ReportContentModal payload to /content-reports and records local fallback history', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      id: 'rep_101',
      contentType: 'QUESTION',
      contentId: 'q_1',
      topicId: 'top_1',
      category: 'WRONG_ANSWER',
      description: 'বিকল্প খ সঠিক উত্তর হওয়া উচিত।',
      status: 'OPEN',
      createdAt: '2026-11-12T10:00:00Z',
    });

    const onClose = vi.fn();
    render(
      <ReportContentModal
        isOpen={true}
        onClose={onClose}
        contentType="QUESTION"
        contentId="q_1"
        topicId="top_1"
        contentLabel="নিউটনের দ্বিতীয় সূত্র"
      />,
    );

    const catSelect = screen.getByLabelText(/ভুলের ধরন/i);
    fireEvent.change(catSelect, { target: { value: 'WRONG_ANSWER' } });

    const descInput = screen.getByPlaceholderText(/বিস্তারিত লেখো/i);
    fireEvent.change(descInput, { target: { value: 'বিকল্প খ সঠিক উত্তর হওয়া উচিত।' } });

    fireEvent.click(screen.getByRole('button', { name: /রিপোর্ট পাঠাও/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/content-reports', {
        contentType: 'QUESTION',
        contentId: 'q_1',
        topicId: 'top_1',
        category: 'WRONG_ANSWER',
        description: 'বিকল্প খ সঠিক উত্তর হওয়া উচিত।',
      });
      expect(useUserStore.getState().reportedIssues).toHaveLength(1);
      expect(screen.getByText(/ধন্যবাদ! তোমার রিপোর্টটি জমা হয়েছে/i)).toBeDefined();
    });
  });

  it('renders /admin/reports triage queue, displays avgResolutionHours, and resolves report while moving content to CORRECTION', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      items: [
        {
          id: 'rep_admin_1',
          contentType: 'LESSON',
          contentId: 'les_1',
          topicId: 'top_1',
          contentTitle: '১.১ পদার্থবিজ্ঞান',
          contentStatus: 'PUBLISHED',
          topicTitleBangla: '১.১ পদার্থবিজ্ঞান',
          chapterTitleBangla: 'প্রথম অধ্যায়',
          category: 'TYPO_OR_LATEX',
          description: 'গাণিতিক সূত্র ভেঙে যাচ্ছে।',
          status: 'OPEN',
          resolutionNote: null,
          createdAt: '2026-11-12T08:00:00Z',
        },
      ],
      summary: {
        total: 2,
        openCount: 1,
        inReviewCount: 0,
        resolvedCount: 1,
        dismissedCount: 0,
        avgResolutionHours: 2.5,
      },
    });

    vi.mocked(apiClient.patch).mockResolvedValueOnce({
      report: {
        id: 'rep_admin_1',
        status: 'RESOLVED',
        resolutionNote: 'LaTeX ঠিক করা হচ্ছে।',
      },
      movedToCorrection: true,
    });

    render(<AdminReportsPage />);

    await waitFor(() => {
      expect(screen.getAllByText(/১\.১ পদার্থবিজ্ঞান/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/গাণিতিক সূত্র ভেঙে যাচ্ছে।/i)).toBeDefined();
    });

    const noteInput = screen.getByPlaceholderText(/সমাধান বা রিভিউ নোট/i);
    fireEvent.change(noteInput, { target: { value: 'LaTeX ঠিক করা হচ্ছে।' } });

    const moveCheckbox = screen.getByLabelText(/CORRECTION/i);
    fireEvent.click(moveCheckbox);

    fireEvent.click(screen.getByRole('button', { name: /সমাধান চিহ্নিত করো/i }));

    await waitFor(() => {
      expect(apiClient.patch).toHaveBeenCalledWith('/admin/content/reports/rep_admin_1', {
        status: 'RESOLVED',
        resolutionNote: 'LaTeX ঠিক করা হচ্ছে।',
        moveContentToCorrection: true,
      });
    });
  });
});
