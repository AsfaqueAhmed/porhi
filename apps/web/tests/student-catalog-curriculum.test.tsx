import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import SubjectsPage from '../src/app/subjects/page';
import CurriculumPage from '../src/app/curriculum/[subjectId]/page';
import { useUserStore } from '../src/store/user-store';
import { apiClient } from '../src/lib/api-client';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ subjectId: 'sub_ssc_physics' }),
  usePathname: () => '/curriculum/sub_ssc_physics',
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('SubjectsPage & CurriculumPage dynamic mastery UI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.setState({
      activeSubject: {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        syllabusYear: 2026,
        program: 'SSC',
      },
      completedTopics: ['top_ssc_physics_ch1_1'],
      topicMastery: {
        top_ssc_physics_ch1_2: {
          attempted: 4,
          correct: 1,
          lastPracticedAt: '2026-11-12T00:00:00.000Z',
        },
      },
      bookmarks: [],
      savedMistakes: [],
      examHistory: [],
      lessonNotes: {},
      studyDates: [],
    });
  });

  it('renders dynamic chapter/topic counts, completion percentage, and subject search on SubjectsPage', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce([
      {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        syllabusYear: 2026,
        classLevel: 'CLASS_9_10',
        program: 'SSC',
        isReady: true,
        chapterCount: 12,
        topicCount: 72,
      },
      {
        id: 'sub_ssc_chemistry',
        code: 'ssc_chemistry',
        nameBangla: 'রসায়ন',
        syllabusYear: 2026,
        classLevel: 'CLASS_9_10',
        program: 'SSC',
        isReady: true,
        chapterCount: 12,
        topicCount: 72,
      },
      {
        id: 'sub_ssc_math',
        code: 'ssc_math',
        nameBangla: 'সাধারণ গণিত',
        syllabusYear: 2026,
        classLevel: 'CLASS_9_10',
        program: 'SSC',
        isReady: false,
        chapterCount: 17,
        topicCount: 95,
      },
    ] as any);

    render(<SubjectsPage />);

    await waitFor(() => {
      expect(screen.getByText('পদার্থবিজ্ঞান')).toBeDefined();
    });

    // Dynamic chapter/topic metadata on ready subject
    expect(screen.getAllByText(/১২টি অধ্যায়/i).length).toBeGreaterThanOrEqual(1);

    // Search filter
    const searchInput = screen.getByPlaceholderText(/বিষয় খুঁজুন/i);
    fireEvent.change(searchInput, { target: { value: 'রসায়ন' } });

    expect(screen.getByText('রসায়ন')).toBeDefined();
    expect(screen.queryByText('সাধারণ গণিত')).toBeNull();
  });

  it('renders chapter completion progress, interactive lab badges, mastery statuses, and filter pills on CurriculumPage', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce([
      {
        id: 'chap_ssc_physics_ch1',
        subjectId: 'sub_ssc_physics',
        orderIndex: 1,
        titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
        topics: [
          { id: 'top_ssc_physics_ch1_1', chapterId: 'chap_ssc_physics_ch1', orderIndex: 1, titleBangla: '১.১ পদার্থবিজ্ঞান (Physics)' },
          { id: 'top_ssc_physics_ch1_2', chapterId: 'chap_ssc_physics_ch1', orderIndex: 2, titleBangla: '১.২ পদার্থবিজ্ঞানের পরিসর' },
          { id: 'top_ssc_physics_ch1_3', chapterId: 'chap_ssc_physics_ch1', orderIndex: 3, titleBangla: '১.৩ পদার্থবিজ্ঞানের ক্রমবিকাশ' },
          { id: 'top_ssc_physics_ch1_4', chapterId: 'chap_ssc_physics_ch1', orderIndex: 4, titleBangla: '১.৪ পদার্থবিজ্ঞানের উদ্দেশ্য' },
          { id: 'top_ssc_physics_ch1_5', chapterId: 'chap_ssc_physics_ch1', orderIndex: 5, titleBangla: '১.৫ ভৌত রাশি ও তাদের পরিমাপ', hasInteractiveLab: true },
          { id: 'top_ssc_physics_ch1_6', chapterId: 'chap_ssc_physics_ch1', orderIndex: 6, titleBangla: '১.৬ পরিমাপের যন্ত্রপাতি', hasInteractiveLab: true },
          { id: 'top_ssc_physics_ch1_7', chapterId: 'chap_ssc_physics_ch1', orderIndex: 7, titleBangla: '১.৭ পরিমাপের ত্রুটি ও নির্ভুলতা', hasInteractiveLab: true },
        ],
      },
    ] as any);

    render(<CurriculumPage />);

    await waitFor(() => {
      expect(screen.getByText('প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ')).toBeDefined();
    });

    // Chapter 1 has 1 of 7 completed
    expect(screen.getByText(/১\/৭ সম্পন্ন/i)).toBeDefined();

    // Mastery badges: completed and needs revision
    expect(screen.getAllByText(/✓ সম্পন্ন/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/⚠️ রিভিশন প্রয়োজন/i).length).toBeGreaterThanOrEqual(1);

    // Interactive lab badge
    expect(screen.getAllByText(/⚡ ল্যাব/i).length).toBeGreaterThanOrEqual(1);

    // Filter by interactive lab pill
    const labFilterBtn = screen.getByRole('button', { name: /⚡ ইন্টারেক্টিভ ল্যাব/i });
    fireEvent.click(labFilterBtn);

    expect(screen.getByText(/১\.৫ ভৌত রাশি ও তাদের পরিমাপ/i)).toBeDefined();
    expect(screen.queryByText(/১\.১ পদার্থবিজ্ঞান \(Physics\)/i)).toBeNull();

    // Bookmark a topic and filter by bookmarked
    const bookmarkBtns = screen.getAllByRole('button', { name: /বুকমার্ক করুন/i });
    fireEvent.click(bookmarkBtns[0]);
    expect(useUserStore.getState().bookmarks.length).toBe(1);
  });
});
