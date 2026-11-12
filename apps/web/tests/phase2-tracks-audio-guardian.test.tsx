import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubjectsPage from '../src/app/subjects/page';
import ProgressPage from '../src/app/progress/page';
import { LessonAudioPlayer } from '../src/components/student/lesson-audio-player';
import GuardianReportPage from '../src/app/guardian/[shareCode]/page';
import { apiClient } from '../src/lib/api-client';
import { useUserStore } from '../src/store/user-store';

let mockShareCodeParam = 'demo_share_123';

vi.mock('next/navigation', () => ({
  useParams: () => ({ shareCode: mockShareCodeParam, subjectId: 'sub_ssc_physics' }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/subjects',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../src/lib/guest-session', () => ({
  ensureGuestSession: vi.fn().mockResolvedValue({ token: 'guest-jwt', guestId: 'guest_1' }),
}));

describe('Phase 2 Track C: Expanded Tracks, Audio Lessons, & Parent/Teacher Share Views', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    useUserStore.setState({
      token: 'guest-jwt',
      guestId: 'guest_1',
      activeSubject: {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        syllabusYear: 2026,
        program: 'SSC',
      },
      completedTopics: ['top_ssc_physics_ch1_1'],
      topicMastery: {},
      savedMistakes: [],
      examHistory: [],
      bookmarks: [],
      lessonNotes: {},
      studyDates: [],
    });
  });

  it('filters Class 6–8, SSC, HSC, Admission, and BCS tracks on SubjectsPage', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce([
      { id: 'sub_c8', code: 'class8_science', nameBangla: 'অষ্টম শ্রেণির বিজ্ঞান', program: 'CLASS_6_8', classLevel: 'CLASS_6_8', syllabusYear: 2026, isReady: true, chapterCount: 1, topicCount: 1 },
      { id: 'sub_ssc_physics', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান', program: 'SSC', classLevel: 'CLASS_9_10', syllabusYear: 2026, isReady: true, chapterCount: 12, topicCount: 70 },
      { id: 'sub_hsc', code: 'hsc_physics_1', nameBangla: 'HSC পদার্থবিজ্ঞান ১ম পত্র', program: 'HSC', classLevel: 'CLASS_11_12', syllabusYear: 2026, isReady: true, chapterCount: 1, topicCount: 1 },
      { id: 'sub_adm', code: 'admission_ka_physics', nameBangla: 'বিশ্ববিদ্যালয় ভর্তি: ক-ইউনিট', program: 'ADMISSION', classLevel: 'ADMISSION', syllabusYear: 2026, isReady: true, chapterCount: 1, topicCount: 1 },
      { id: 'sub_bcs', code: 'bcs_preliminary', nameBangla: 'BCS প্রিলিমিনারি বিজ্ঞান', program: 'BCS', classLevel: 'BCS', syllabusYear: 2026, isReady: true, chapterCount: 1, topicCount: 1 },
    ] as any);

    render(<SubjectsPage />);

    await waitFor(() => {
      expect(screen.getByText('অষ্টম শ্রেণির বিজ্ঞান')).toBeDefined();
      expect(screen.getByText('BCS প্রিলিমিনারি বিজ্ঞান')).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /৬ষ্ঠ–৮ম/i }));
    expect(screen.getByText('অষ্টম শ্রেণির বিজ্ঞান')).toBeDefined();
    expect(screen.queryByText('BCS প্রিলিমিনারি বিজ্ঞান')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /ভর্তি প্রস্তুতি/i }));
    expect(screen.getByText(/বিশ্ববিদ্যালয় ভর্তি/i)).toBeDefined();
    expect(screen.queryByText('অষ্টম শ্রেণির বিজ্ঞান')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /^BCS$/i }));
    expect(screen.getByText('BCS প্রিলিমিনারি বিজ্ঞান')).toBeDefined();
  });

  it('renders LessonAudioPlayer speed controls and Web Speech voice narration trigger', () => {
    const speakMock = vi.fn();
    const cancelMock = vi.fn();
    Object.defineProperty(window, 'speechSynthesis', {
      value: { speak: speakMock, cancel: cancelMock, getVoices: () => [] },
      configurable: true,
    });
    (globalThis as any).SpeechSynthesisUtterance = class {
      text: string;
      lang = '';
      rate = 1;
      onend: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    };

    render(
      <LessonAudioPlayer
        audioUrl="/audio/lesson-intro.wav"
        audioDurationSeconds={100}
        title="১.১ পদার্থবিজ্ঞান"
        narrationText="পদার্থবিজ্ঞান হলো প্রকৃতির নিয়ম বোঝার বিজ্ঞান।"
      />,
    );

    expect(screen.getByText(/অডিও লেসন ও ভয়েস পাঠ/i)).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: '1.25x' }));
    fireEvent.click(screen.getByRole('button', { name: /ভয়েস পাঠ শুরু/i }));
    expect(speakMock).toHaveBeenCalledTimes(1);
  });

  it('creates Parent/Teacher share links on ProgressPage and renders read-only GuardianReportPage', async () => {
    vi.mocked(apiClient.get).mockImplementation(async (url: string) => {
      if (url.startsWith('/student/share-links')) {
        return [] as any;
      }
      if (url.startsWith('/student/overview')) {
        return null as any;
      }
      if (url.startsWith('/exam/history')) {
        return null as any;
      }
      if (url.startsWith('/guardian/report/')) {
        return {
          shareCode: 'demo_share_123',
          audience: 'TEACHER',
          recipientLabel: 'রফিক স্যার',
          generatedAt: '2026-11-12T12:00:00Z',
          student: { displayName: 'সাদিয়া ইসলাম', selectedClass: 'SSC' },
          summary: {
            completedLessons: 14,
            streakDays: 6,
            weeklyStudyMinutes: 210,
            weeklyCompletedTasks: 5,
            weeklyTotalTasks: 6,
            averageExamAccuracy: 84,
            totalExamsTaken: 4,
            totalRehearsalsCompleted: 2,
            dueRevisionCount: 3,
          },
          chapterMastery: [
            {
              chapterId: 'chap_1',
              titleBangla: 'ভৌত রাশি ও পরিমাপ',
              subjectNameBangla: 'পদার্থবিজ্ঞান',
              accuracy: 88,
              questionsAttempted: 25,
            },
          ],
          weakTopics: [
            {
              topicId: 'top_2',
              titleBangla: 'ভার্নিয়ার ধ্রুবক',
              chapterTitleBangla: 'ভৌত রাশি ও পরিমাপ',
              accuracy: 45,
              attempts: 6,
            },
          ],
          recentExams: [
            {
              id: 'ex_1',
              subjectNameBangla: 'পদার্থবিজ্ঞান',
              testType: 'EXAM',
              score: 18,
              totalMarks: 20,
              accuracy: 90,
              submittedAt: '2026-11-12T10:00:00Z',
            },
          ],
        } as any;
      }
      return null as any;
    });

    vi.mocked(apiClient.post).mockResolvedValueOnce({
      id: 'share_1',
      shareCode: 'newcode99',
      audience: 'PARENT',
      recipientLabel: 'আব্বু',
      isActive: true,
      sharePath: '/guardian/newcode99',
      createdAt: '2026-11-12T12:00:00Z',
      revokedAt: null,
      lastViewedAt: null,
    } as any);

    const { unmount } = render(<ProgressPage />);

    await waitFor(() => {
      expect(screen.getByText(/অভিভাবক \/ শিক্ষক অগ্রগতি শেয়ার/i)).toBeDefined();
    });

    fireEvent.change(screen.getByPlaceholderText(/যেমন: আম্মু বা রসায়ন স্যার/i), {
      target: { value: 'আব্বু' },
    });
    fireEvent.click(screen.getByRole('button', { name: /শেয়ার লিংক তৈরি করো/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith(
        '/student/share-links',
        expect.objectContaining({ audience: 'PARENT', recipientLabel: 'আব্বু' }),
      );
      expect(screen.getByText(/\/guardian\/newcode99/i)).toBeDefined();
    });

    unmount();

    render(<GuardianReportPage />);

    await waitFor(() => {
      expect(screen.getByText(/সাদিয়া ইসলাম/)).toBeDefined();
      expect(screen.getAllByText(/ভৌত রাশি ও পরিমাপ/).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/ভার্নিয়ার ধ্রুবক/)).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /অভিভাবক ভিউ/i }));
    expect(screen.getByText(/সাপ্তাহিক অধ্যয়ন নিয়মিততা/i)).toBeDefined();
  });
});
