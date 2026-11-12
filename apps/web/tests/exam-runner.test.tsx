import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExamRunnerPage from '../src/app/exam/[chapterId]/page';
import ExamResultPage from '../src/app/exam/result/[sessionId]/page';
import { apiClient } from '../src/lib/api-client';
import { ensureGuestSession } from '../src/lib/guest-session';
import { useUserStore } from '../src/store/user-store';

let mockParams: Record<string, string> = { chapterId: 'chap_ssc_physics_ch2' };
let mockSearchParams = new URLSearchParams();
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useParams: () => mockParams,
  useSearchParams: () => mockSearchParams,
  usePathname: () => `/exam/${mockParams.chapterId || ''}`,
  useRouter: () => ({ push: mockPush, replace: vi.fn() }),
}));

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

vi.mock('../src/lib/guest-session', () => ({
  ensureGuestSession: vi.fn().mockResolvedValue({ token: 'guest-jwt', guestId: 'guest_1' }),
}));

describe('ExamRunnerPage & ExamResultPage (Task 7)', () => {
  const sampleQuestions = [
    {
      id: 'q_ex_1',
      topicId: 'top_ssc_physics_ch2_1',
      stem: 'নিচের কোনটি ভেক্টর রাশি?',
      options: [
        { id: 'opt_1a', text: 'দ্রুতি', isCorrect: false },
        { id: 'opt_1b', text: 'বেগ', isCorrect: true },
        { id: 'opt_1c', text: 'কাজ', isCorrect: false },
        { id: 'opt_1d', text: 'সময়', isCorrect: false },
      ],
    },
    {
      id: 'q_ex_2',
      topicId: 'top_ssc_physics_ch2_4',
      stem: 'সরণের একক কী?',
      options: [
        { id: 'opt_2a', text: 'মিটার', isCorrect: true },
        { id: 'opt_2b', text: 'সেকেন্ড', isCorrect: false },
      ],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockParams = { chapterId: 'chap_ssc_physics_ch2' };
    mockSearchParams = new URLSearchParams();
    vi.mocked(apiClient.put).mockResolvedValue({ savedCount: 0 } as any);
    useUserStore.setState({
      token: null,
      guestId: null,
      examHistory: [],
      topicMastery: {},
      savedMistakes: [],
      reportedIssues: [],
      studyDates: [],
    });
  });

  it('shows exam setup screen first and calls ensureGuestSession + POST /exam/start with selected config', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      sessionId: 'sess_cfg_1',
      totalQuestions: 2,
      durationSeconds: 1200,
      negativeRatio: 0,
      questions: sampleQuestions,
    } as any);

    render(<ExamRunnerPage />);

    // Should render setup controls without immediately starting exam
    expect(screen.getByText(/মডেল টেস্ট সেটআপ/i)).toBeDefined();
    expect(apiClient.post).not.toHaveBeenCalled();

    // Select Weak Area mode, 20 questions limit, and 0 negative marking
    fireEvent.click(screen.getByRole('button', { name: /দুর্বল টপিক ফোকাস/i }));
    fireEvent.click(screen.getByRole('button', { name: /২০টি/i }));
    fireEvent.click(screen.getByRole('button', { name: /নেগেটিভ মার্কিং নেই/i }));

    fireEvent.click(screen.getByRole('button', { name: /পরীক্ষা শুরু করো/i }));

    await waitFor(() => {
      expect(ensureGuestSession).toHaveBeenCalledTimes(1);
      expect(apiClient.post).toHaveBeenCalledWith(
        '/exam/start',
        expect.objectContaining({
          testType: 'WEAK_AREA',
          chapterId: 'chap_ssc_physics_ch2',
          questionLimit: 20,
          negativeRatio: 0,
        })
      );
      expect(screen.getByText(/নিচের কোনটি ভেক্টর রাশি\?/i)).toBeDefined();
    });

    // LocalStorage autosave entry should exist for this session
    const savedRaw = localStorage.getItem('pori_active_exam_chap_ssc_physics_ch2');
    expect(savedRaw).toBeTruthy();
    expect(JSON.parse(savedRaw!).sessionId).toBe('sess_cfg_1');
  });

  it('resumes an active exam from localStorage + GET /exam/session/:sessionId after reload', async () => {
    const recentStart = new Date(Date.now() - 60_000).toISOString();
    localStorage.setItem(
      'pori_active_exam_chap_ssc_physics_ch2',
      JSON.stringify({
        sessionId: 'sess_resume_1',
        chapterId: 'chap_ssc_physics_ch2',
        durationSeconds: 900,
        negativeRatio: 0.25,
        startedAtIso: recentStart,
        answers: { q_ex_1: 'opt_1b' },
        flagged: {},
        questionTimes: { q_ex_1: 14 },
        questions: sampleQuestions,
      })
    );

    vi.mocked(apiClient.get).mockResolvedValueOnce({
      sessionId: 'sess_resume_1',
      status: 'IN_PROGRESS',
      testType: 'CHAPTER_TEST',
      subjectId: 'sub_ssc_physics',
      chapterId: 'chap_ssc_physics_ch2',
      totalQuestions: 2,
      durationSeconds: 900,
      negativeRatio: 0.25,
      startedAt: recentStart,
      answers: { q_ex_1: 'opt_1b' },
      questions: sampleQuestions,
    } as any);

    render(<ExamRunnerPage />);

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith('/exam/session/sess_resume_1');
      expect(screen.getByText(/নিচের কোনটি ভেক্টর রাশি\?/i)).toBeDefined();
      expect(screen.getByText(/প্রশ্ন ১ \/ ২/)).toBeDefined();
      expect(screen.getAllByText(/১ \/ ২/).length).toBeGreaterThanOrEqual(2);
    });
  });

  it('shows expired recovery prompt when a saved session elapsed while tab was closed', async () => {
    const expiredStart = new Date(Date.now() - 2_000_000).toISOString();
    localStorage.setItem(
      'pori_active_exam_chap_ssc_physics_ch2',
      JSON.stringify({
        sessionId: 'sess_expired_1',
        chapterId: 'chap_ssc_physics_ch2',
        durationSeconds: 600,
        negativeRatio: 0.25,
        startedAtIso: expiredStart,
        answers: { q_ex_1: 'opt_1b' },
        flagged: {},
        questionTimes: { q_ex_1: 12 },
        questions: sampleQuestions,
      })
    );

    vi.mocked(apiClient.get).mockResolvedValueOnce({
      sessionId: 'sess_expired_1',
      status: 'IN_PROGRESS',
      testType: 'CHAPTER_TEST',
      subjectId: 'sub_ssc_physics',
      chapterId: 'chap_ssc_physics_ch2',
      totalQuestions: 2,
      durationSeconds: 600,
      negativeRatio: 0.25,
      startedAt: expiredStart,
      answers: { q_ex_1: 'opt_1b' },
      questions: sampleQuestions,
    } as any);

    render(<ExamRunnerPage />);

    await waitFor(() => {
      expect(screen.getByText(/পূর্ববর্তী পরীক্ষার সময় শেষ হয়েছে/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /ফলাফল জমা দাও/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /নতুন পরীক্ষা শুরু করো/i })).toBeDefined();
    });
  });

  it('submits exam with per-question timeSpent, displays negative marking deduction, weak-topic links, and Report Error button', async () => {
    vi.mocked(apiClient.post)
      .mockResolvedValueOnce({
        sessionId: 'sess_submit_1',
        totalQuestions: 2,
        durationSeconds: 600,
        negativeRatio: 0.25,
        questions: sampleQuestions,
      } as any)
      .mockResolvedValueOnce({
        score: 0.75,
        totalQuestions: 2,
        correctCount: 1,
        wrongCount: 1,
        skippedCount: 0,
        durationSeconds: 600,
        negativeRatio: 0.25,
        negativeDeduction: 0.25,
        answersWithExplanation: [
          {
            questionId: 'q_ex_1',
            topicId: 'top_ssc_physics_ch2_1',
            stem: 'নিচের কোনটি ভেক্টর রাশি?',
            options: [
              { id: 'opt_1a', text: 'দ্রুতি', isCorrect: false },
              { id: 'opt_1b', text: 'বেগ', isCorrect: true },
            ],
            selectedOptionId: 'opt_1b',
            correctOptionId: 'opt_1b',
            isCorrect: true,
            explanation: { directAnswer: 'বেগ একটি ভেক্টর রাশি।' },
            timeSpent: 5,
          },
          {
            questionId: 'q_ex_2',
            topicId: 'top_ssc_physics_ch2_4',
            stem: 'সরণের একক কী?',
            options: [
              { id: 'opt_2a', text: 'মিটার', isCorrect: true },
              { id: 'opt_2b', text: 'সেকেন্ড', isCorrect: false },
            ],
            selectedOptionId: 'opt_2b',
            correctOptionId: 'opt_2a',
            isCorrect: false,
            explanation: { directAnswer: 'সরণের SI একক মিটার।' },
            timeSpent: 7,
          },
        ],
      } as any);

    render(<ExamRunnerPage />);
    fireEvent.click(screen.getByRole('button', { name: /পরীক্ষা শুরু করো/i }));

    await waitFor(() => {
      expect(screen.getByText(/নিচের কোনটি ভেক্টর রাশি\?/i)).toBeDefined();
    });

    fireEvent.click(screen.getByText('বেগ'));
    fireEvent.click(screen.getByRole('button', { name: /পরবর্তী প্রশ্ন/i }));

    await waitFor(() => {
      expect(screen.getByText(/সরণের একক কী\?/i)).toBeDefined();
    });

    fireEvent.click(screen.getByText('সেকেন্ড'));
    fireEvent.click(screen.getByRole('button', { name: /পরীক্ষা সাবমিট করো/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith(
        '/exam/submit/sess_submit_1',
        expect.objectContaining({
          answers: expect.arrayContaining([
            expect.objectContaining({
              questionId: 'q_ex_1',
              selectedOptionId: 'opt_1b',
              timeSpent: expect.any(Number),
            }),
            expect.objectContaining({
              questionId: 'q_ex_2',
              selectedOptionId: 'opt_2b',
              timeSpent: expect.any(Number),
            }),
          ]),
        })
      );
      expect(screen.getByText(/০\.৭৫/)).toBeDefined();
      expect(screen.getByText(/নেগেটিভ মার্কিং/i)).toBeDefined();
      // LocalStorage autosave cleared after completion
      expect(localStorage.getItem('pori_active_exam_chap_ssc_physics_ch2')).toBeNull();
    });

    // Weak topic /lesson link & Report Error action present on review items
    const lessonLinks = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
      .filter(Boolean);
    expect(lessonLinks).toContain('/lesson/top_ssc_physics_ch2_4');

    const reportBtns = screen.getAllByRole('button', { name: /ভুল রিপোর্ট/i });
    expect(reportBtns.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(reportBtns[0]);
    expect(screen.getByRole('dialog', { name: /কনটেন্ট ভুল রিপোর্ট করো/i })).toBeDefined();
  });

  it('renders dedicated /exam/result/[sessionId] page from GET /exam/session/:sessionId', async () => {
    mockParams = { sessionId: 'sess_saved_99' };
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      sessionId: 'sess_saved_99',
      status: 'COMPLETED',
      testType: 'CHAPTER_TEST',
      subjectId: 'sub_ssc_physics',
      chapterId: 'chap_ssc_physics_ch2',
      score: 1.75,
      totalQuestions: 2,
      correctCount: 2,
      wrongCount: 0,
      skippedCount: 0,
      durationSeconds: 600,
      negativeRatio: 0.25,
      negativeDeduction: 0,
      answersWithExplanation: [
        {
          questionId: 'q_ex_1',
          topicId: 'top_ssc_physics_ch2_1',
          stem: 'সংরক্ষিত ফলাফল প্রশ্ন ১',
          options: [
            { id: 'opt_1b', text: 'বেগ', isCorrect: true },
          ],
          selectedOptionId: 'opt_1b',
          correctOptionId: 'opt_1b',
          isCorrect: true,
          explanation: { directAnswer: 'সঠিক।' },
          timeSpent: 12,
        },
      ],
    } as any);

    render(<ExamResultPage />);

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith('/exam/session/sess_saved_99');
      expect(screen.getByText(/সংরক্ষিত ফলাফল প্রশ্ন ১/i)).toBeDefined();
      expect(screen.getByText(/১\.৭৫/)).toBeDefined();
    });
  });
});
