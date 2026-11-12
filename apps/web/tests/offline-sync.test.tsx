import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  saveChapterPack,
  getChapterPack,
  listDownloadedPacks,
  removeChapterPack,
  enqueueLessonComplete,
  enqueuePracticeAttempt,
  enqueueExamSubmission,
  getPendingSyncPayload,
  getPendingCount,
  clearSyncQueue,
  findOfflineLessonByTopic,
  getOfflinePackQuestions,
  getOfflineSubjectQuestions,
} from '../src/lib/offline-store';
import { OfflineSyncBanner } from '../src/components/navigation/offline-sync-banner';
import CurriculumPage from '../src/app/curriculum/[subjectId]/page';
import PracticeRunnerPage from '../src/app/practice/[chapterId]/page';
import { ExamRunnerClient } from '../src/components/student/exam-runner-client';
import { apiClient } from '../src/lib/api-client';
import { useUserStore } from '../src/store/user-store';

vi.mock('next/navigation', () => ({
  useParams: () => ({
    subjectId: 'sub_ssc_physics',
    chapterId: 'chap_ssc_physics_ch1',
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/curriculum/sub_ssc_physics',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock('../src/lib/guest-session', () => ({
  ensureGuestSession: vi.fn().mockResolvedValue({ token: 'guest-jwt', guestId: 'guest_1' }),
}));

describe('Track 3: Offline Chapter Packs, Storage & Sync Queue', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.clear();
    await clearSyncQueue();
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: true,
    });
    useUserStore.setState({
      token: 'guest-jwt',
      guestId: 'guest_1',
      activeSubject: {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        syllabusYear: 2026,
      },
      completedTopics: [],
      topicMastery: {},
      bookmarks: [],
    });
  });

  it('saves/reads/deletes offline chapter packs and queues sync actions in offline-store', async () => {
    await saveChapterPack({
      chapterId: 'chap_ssc_physics_ch1',
      subjectId: 'sub_ssc_physics',
      titleBangla: 'ভৌত রাশি ও পরিমাপ',
      versionHash: 'v1-1-1-1',
      downloadedAt: '2026-11-12T10:00:00Z',
      topics: [{ id: 'top_ssc_physics_ch1_1', titleBangla: 'পদার্থবিজ্ঞান', orderIndex: 1 }],
      lessons: [
        {
          id: 'les_1',
          topicId: 'top_ssc_physics_ch1_1',
          titleBangla: 'পদার্থবিজ্ঞানের পরিসর',
          learningGoal: 'মূল ধারণা',
          explanation: 'ব্যাখ্যা',
          importantTerms: [],
          version: 1,
        },
      ],
      questions: [],
    });

    const pack = await getChapterPack('chap_ssc_physics_ch1');
    expect(pack?.titleBangla).toBe('ভৌত রাশি ও পরিমাপ');

    const packs = await listDownloadedPacks();
    expect(packs).toHaveLength(1);

    const offlineLesson = await findOfflineLessonByTopic('top_ssc_physics_ch1_1');
    expect(offlineLesson?.id).toBe('les_1');

    await enqueueLessonComplete({
      offlineEventId: 'ev_off_1',
      topicId: 'top_ssc_physics_ch1_1',
      completedAt: '2026-11-12T10:05:00Z',
    });
    await enqueuePracticeAttempt({
      offlineEventId: 'att_off_1',
      questionId: 'q_1',
      isCorrect: false,
      attemptedAt: '2026-11-12T10:06:00Z',
    });
    await enqueueExamSubmission({
      offlineSessionId: 'ses_off_1',
      subjectId: 'sub_ssc_physics',
      chapterId: 'chap_ssc_physics_ch1',
      answers: [{ questionId: 'q_1', selectedOptionId: 'opt_1' }],
      submittedAt: '2026-11-12T10:10:00Z',
    });

    expect(await getPendingCount()).toBe(3);
    const payload = await getPendingSyncPayload();
    expect(payload.lessonCompletes).toHaveLength(1);
    expect(payload.practiceAttempts).toHaveLength(1);
    expect(payload.examSubmissions).toHaveLength(1);

    await removeChapterPack('chap_ssc_physics_ch1');
    expect(await getChapterPack('chap_ssc_physics_ch1')).toBeNull();
  });

  it('shows offline banner when offline and flushes queued activity when online', async () => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: false,
    });

    await enqueueLessonComplete({
      offlineEventId: 'ev_sync_1',
      topicId: 'top_1',
      completedAt: '2026-11-12T10:00:00Z',
    });

    render(<OfflineSyncBanner />);

    await waitFor(() => {
      expect(screen.getByText(/অফলাইন মোড সক্রিয়/i)).toBeDefined();
    });

    vi.mocked(apiClient.post).mockResolvedValueOnce({
      syncedLessons: 1,
      syncedAttempts: 0,
      syncedExams: 0,
    } as any);

    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: true,
    });
    fireEvent(window, new Event('online'));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith(
        '/student/sync-offline',
        expect.objectContaining({
          lessonCompletes: expect.arrayContaining([
            expect.objectContaining({ offlineEventId: 'ev_sync_1' }),
          ]),
        }),
      );
    });

    await waitFor(async () => {
      expect(await getPendingCount()).toBe(0);
    });
  });

  it('downloads chapter offline pack from CurriculumPage and marks it saved', async () => {
    vi.mocked(apiClient.get).mockImplementation(async (url: string) => {
      if (url.includes('/offline-pack')) {
        return {
          chapterId: 'chap_ssc_physics_ch1',
          subjectId: 'sub_ssc_physics',
          titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
          versionHash: 'v1-1-1-1',
          downloadedAt: '2026-11-12T10:00:00Z',
          topics: [],
          lessons: [],
          questions: [],
        };
      }
      return null;
    });

    render(<CurriculumPage />);

    const downloadButtons = await screen.findAllByRole('button', {
      name: /^অফলাইন ডাউনলোড$/i,
    });
    fireEvent.click(downloadButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByText(/অফলাইন সংরক্ষিত/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('loads cached pack questions offline and queues practice & exam submissions', async () => {
    await saveChapterPack({
      chapterId: 'chap_ssc_physics_ch1',
      subjectId: 'sub_ssc_physics',
      titleBangla: 'ভৌত রাশি ও পরিমাপ',
      versionHash: 'v1-pack',
      downloadedAt: '2026-11-12T10:00:00Z',
      topics: [{ id: 'top_ssc_physics_ch1_1', titleBangla: 'পদার্থবিজ্ঞান', orderIndex: 1 }],
      lessons: [],
      questions: [
        {
          id: 'q_pack_1',
          topicId: 'top_ssc_physics_ch1_1',
          type: 'MCQ',
          stem: 'অফলাইন সংরক্ষিত প্রশ্ন: SI এককে দৈর্ঘ্যের একক কী?',
          options: [
            { id: 'opt_m', text: 'মিটার', isCorrect: true },
            { id: 'opt_s', text: 'সেকেন্ড', isCorrect: false },
          ],
          explanation: { directAnswer: 'মিটার' },
          difficulty: 'EASY',
          version: 1,
        },
      ],
    });

    const chapQs = await getOfflinePackQuestions('chap_ssc_physics_ch1', { type: 'MCQ' });
    expect(chapQs).toHaveLength(1);
    expect(chapQs[0].id).toBe('q_pack_1');
    expect(await getOfflineSubjectQuestions('sub_ssc_physics', 'MCQ')).toHaveLength(1);

    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: false,
    });

    const practiceRender = render(<PracticeRunnerPage />);

    await waitFor(() => {
      expect(screen.getByText(/অফলাইন সংরক্ষিত প্রশ্ন/i)).toBeDefined();
    });

    fireEvent.click(screen.getByText('মিটার'));

    await waitFor(async () => {
      const payload = await getPendingSyncPayload();
      expect(payload.practiceAttempts).toHaveLength(1);
      expect(payload.practiceAttempts?.[0].questionId).toBe('q_pack_1');
    });

    practiceRender.unmount();

    render(<ExamRunnerClient mode="chapter" chapterId="chap_ssc_physics_ch1" />);
    fireEvent.click(screen.getByRole('button', { name: /পরীক্ষা শুরু করো/i }));

    await waitFor(() => {
      expect(screen.getByText(/অফলাইন সংরক্ষিত প্রশ্ন/i)).toBeDefined();
    });

    fireEvent.click(screen.getByText('মিটার'));
    fireEvent.click(screen.getByRole('button', { name: /পরীক্ষা সমাপ্ত করো/i }));

    await waitFor(async () => {
      const payload = await getPendingSyncPayload();
      expect(payload.examSubmissions).toHaveLength(1);
      expect(payload.examSubmissions?.[0].chapterId).toBe('chap_ssc_physics_ch1');
      expect(payload.examSubmissions?.[0].answers[0]).toEqual({
        questionId: 'q_pack_1',
        selectedOptionId: 'opt_m',
      });
    });
  });
});
