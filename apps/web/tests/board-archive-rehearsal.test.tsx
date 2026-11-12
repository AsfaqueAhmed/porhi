import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BoardArchivePage from '../src/app/board-archive/page';
import ExamRehearsalPage from '../src/app/exam/rehearsal/page';
import { apiClient } from '../src/lib/api-client';
import { useUserStore } from '../src/store/user-store';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/board-archive',
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

vi.mock('../src/components/content/rich-content-renderer', () => ({
  RichContentRenderer: ({ content }: { content: string }) => <div>{content}</div>,
}));

describe('Phase 2 Track A & B: Verified Board Archive + Multi-Subject Exam Rehearsal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    useUserStore.setState({
      token: 'guest-jwt',
      guestId: 'guest_1',
    });
  });

  it('loads Verified Board Archive facets, filters by Chattogram & Year, and toggles MCQ explanation/CQ rubric', async () => {
    vi.mocked(apiClient.get).mockImplementation(async (url: string) => {
      if (url.startsWith('/board-archive/filters')) {
        return {
          totalVerifiedQuestions: 2,
          boards: [
            { key: 'DHAKA', labelBangla: 'ঢাকা বোর্ড', labelEnglish: 'Dhaka Board', count: 1 },
            { key: 'CHATTOGRAM', labelBangla: 'চট্টগ্রাম বোর্ড', labelEnglish: 'Chattogram Board', count: 1 },
          ],
          years: [
            { year: 2024, count: 1 },
            { year: 2022, count: 1 },
          ],
          subjects: [
            { id: 'sub_ssc_physics', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান', program: 'SSC', count: 2 },
          ],
        } as any;
      }

      if (url.includes('board=CHATTOGRAM')) {
        return {
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
          items: [
            {
              id: 'q_ctg_1',
              topicId: 'top_1',
              type: 'MCQ',
              stem: 'ভার্নিয়ার ধ্রুবক নির্ণয়ের সূত্র কোনটি?',
              options: [
                { id: 'opt_1', text: 's / n', isCorrect: true },
                { id: 'opt_2', text: 's × n', isCorrect: false },
              ],
              correctOption: 'opt_1',
              explanation: {
                directAnswer: 's / n',
                coreConcept: 'ভার্নিয়ার ধ্রুবক = প্রধান স্কেলের ক্ষুদ্রতম ভাগ / ভার্নিয়ার ভাগ সংখ্যা',
                stepDerivation: 'VC = s / n',
                proTipShortcut: 'সরাসরি ভাগ সংখ্যা দিয়ে ভাগ করো',
              },
              cqRubric: null,
              difficulty: 'MEDIUM',
              boardSource: 'Chattogram Board 2024',
              boardKey: 'CHATTOGRAM',
              boardKeys: ['CHATTOGRAM'],
              boardLabelBangla: 'চট্টগ্রাম বোর্ড',
              boardYear: 2024,
              isVerifiedBoard: true,
              subjectId: 'sub_ssc_physics',
              subjectCode: 'ssc_physics',
              subjectNameBangla: 'পদার্থবিজ্ঞান',
              program: 'SSC',
              chapterId: 'chap_1',
              chapterTitleBangla: 'ভৌত রাশি ও পরিমাপ',
              topicTitleBangla: 'ভার্নিয়ার স্কেল',
            },
          ],
        } as any;
      }

      return {
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
        items: [
          {
            id: 'q_dhk_cq',
            topicId: 'top_1',
            type: 'CQ_CREATIVE',
            stem: 'একটি গাড়ি স্থির অবস্থান থেকে সুষম ত্বরণে যাত্রা শুরু করল।',
            options: null,
            correctOption: null,
            explanation: {
              directAnswer: 'গতি বিষয়ক সৃজনশীল',
              coreConcept: 'v = u + at',
            },
            cqRubric: {
              subQuestions: [
                { label: 'ক', questionText: 'ত্বরণ কাকে বলে?', marks: 1, modelAnswer: 'বেগের পরিবর্তনের হার।', markingCriteria: '১ নম্বর' },
              ],
            },
            difficulty: 'MEDIUM',
            boardSource: 'Dhaka Board 2022',
            boardKey: 'DHAKA',
            boardKeys: ['DHAKA'],
            boardLabelBangla: 'ঢাকা বোর্ড',
            boardYear: 2022,
            isVerifiedBoard: true,
            subjectId: 'sub_ssc_physics',
            subjectCode: 'ssc_physics',
            subjectNameBangla: 'পদার্থবিজ্ঞান',
            program: 'SSC',
            chapterId: 'chap_2',
            chapterTitleBangla: 'গতি',
            topicTitleBangla: 'গতির সমীকরণ',
          },
        ],
      } as any;
    });

    render(<BoardArchivePage />);

    await waitFor(() => {
      expect(screen.getByText(/ভেরিফায়েড বোর্ড প্রশ্ন ব্যাংক/i)).toBeDefined();
      expect(screen.getByText(/একটি গাড়ি স্থির অবস্থান/i)).toBeDefined();
    });

    // Reveal CQ rubric
    fireEvent.click(screen.getByRole('button', { name: /নম্বর বণ্টন ও উত্তর দেখো/i }));
    expect(screen.getByText(/ত্বরণ কাকে বলে\?/i)).toBeDefined();

    // Filter by Chattogram board
    fireEvent.click(screen.getByRole('button', { name: /চট্টগ্রাম বোর্ড/i }));

    await waitFor(() => {
      expect(screen.getByText(/ভার্নিয়ার ধ্রুবক নির্ণয়ের সূত্র কোনটি\?/i)).toBeDefined();
    });

    // Answer MCQ option and reveal 6-layer explanation
    fireEvent.click(screen.getByRole('button', { name: /s \/ n/i }));
    fireEvent.click(screen.getByRole('button', { name: /ব্যাখ্যা দেখো/i }));
    expect(screen.getByText(/সরাসরি ভাগ সংখ্যা দিয়ে ভাগ করো/i)).toBeDefined();
  });

  it('completes Multi-Subject Exam Rehearsal flow: Paper 1 -> Intermission -> Paper 2 -> Combined Score', async () => {
    vi.mocked(apiClient.get).mockImplementation(async (url: string) => {
      if (url.startsWith('/curriculum/subjects')) {
        return [
          { id: 'sub_ssc_physics', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান', program: 'SSC', isReady: true },
          { id: 'sub_ssc_chemistry', code: 'ssc_chemistry', nameBangla: 'রসায়ন', program: 'SSC', isReady: true },
        ] as any;
      }
      if (url.startsWith('/exam/rehearsal/history')) {
        return [] as any;
      }
      return [] as any;
    });

    vi.mocked(apiClient.post).mockImplementation(async (url: string) => {
      if (url === '/exam/rehearsal/start') {
        return {
          rehearsal: {
            id: 'reh_1',
            titleBangla: 'SSC বিজ্ঞান ডাবল পেপার',
            program: 'SSC',
            currentPaperIndex: 0,
            status: 'IN_PROGRESS',
            totalScore: null,
            totalMarks: 1,
            startedAt: new Date().toISOString(),
            submittedAt: null,
            papers: [
              { paperIndex: 0, subjectId: 'sub_ssc_physics', subjectCode: 'ssc_physics', subjectNameBangla: 'পদার্থবিজ্ঞান', labelBangla: 'পত্র ১: পদার্থবিজ্ঞান', questionCount: 1, durationMinutes: 5, status: 'ACTIVE', sessionId: 'sess_p1', score: null, totalMarks: 1, correctCount: null, wrongCount: null, unansweredCount: null, timeSpentSeconds: null, startedAt: new Date().toISOString(), submittedAt: null },
              { paperIndex: 1, subjectId: 'sub_ssc_chemistry', subjectCode: 'ssc_chemistry', subjectNameBangla: 'রসায়ন', labelBangla: 'পত্র ২: রসায়ন', questionCount: 1, durationMinutes: 5, status: 'PENDING', sessionId: null, score: null, totalMarks: null, correctCount: null, wrongCount: null, unansweredCount: null, timeSpentSeconds: null, startedAt: null, submittedAt: null },
            ],
          },
          activeSession: {
            sessionId: 'sess_p1',
            totalQuestions: 1,
            durationSeconds: 300,
            negativeRatio: 0.25,
            questions: [
              { id: 'qp1', stem: 'পত্র ১ প্রশ্ন: বলের একক কী?', options: [{ id: 'o1', text: 'নিউটন' }] },
            ],
          },
        } as any;
      }

      if (url === '/exam/rehearsal/reh_1/paper/0/submit') {
        return {
          rehearsal: {
            id: 'reh_1',
            titleBangla: 'SSC বিজ্ঞান ডাবল পেপার',
            program: 'SSC',
            currentPaperIndex: 1,
            status: 'INTERMISSION',
            totalScore: null,
            totalMarks: 2,
            startedAt: new Date().toISOString(),
            submittedAt: null,
            papers: [
              { paperIndex: 0, subjectId: 'sub_ssc_physics', subjectCode: 'ssc_physics', subjectNameBangla: 'পদার্থবিজ্ঞান', labelBangla: 'পত্র ১: পদার্থবিজ্ঞান', questionCount: 1, durationMinutes: 5, status: 'SUBMITTED', sessionId: 'sess_p1', score: 1, totalMarks: 1, correctCount: 1, wrongCount: 0, unansweredCount: 0, timeSpentSeconds: 10, startedAt: new Date().toISOString(), submittedAt: new Date().toISOString() },
              { paperIndex: 1, subjectId: 'sub_ssc_chemistry', subjectCode: 'ssc_chemistry', subjectNameBangla: 'রসায়ন', labelBangla: 'পত্র ২: রসায়ন', questionCount: 1, durationMinutes: 5, status: 'PENDING', sessionId: null, score: null, totalMarks: null, correctCount: null, wrongCount: null, unansweredCount: null, timeSpentSeconds: null, startedAt: null, submittedAt: null },
            ],
          },
          paperResult: { score: 1, totalQuestions: 1, correctCount: 1, wrongCount: 0, skippedCount: 0 },
        } as any;
      }

      if (url === '/exam/rehearsal/reh_1/paper/1/start') {
        return {
          rehearsal: {
            id: 'reh_1',
            titleBangla: 'SSC বিজ্ঞান ডাবল পেপার',
            program: 'SSC',
            currentPaperIndex: 1,
            status: 'IN_PROGRESS',
            totalScore: null,
            totalMarks: 2,
            startedAt: new Date().toISOString(),
            submittedAt: null,
            papers: [
              { paperIndex: 0, subjectId: 'sub_ssc_physics', subjectCode: 'ssc_physics', subjectNameBangla: 'পদার্থবিজ্ঞান', labelBangla: 'পত্র ১: পদার্থবিজ্ঞান', questionCount: 1, durationMinutes: 5, status: 'SUBMITTED', sessionId: 'sess_p1', score: 1, totalMarks: 1, correctCount: 1, wrongCount: 0, unansweredCount: 0, timeSpentSeconds: 10, startedAt: new Date().toISOString(), submittedAt: new Date().toISOString() },
              { paperIndex: 1, subjectId: 'sub_ssc_chemistry', subjectCode: 'ssc_chemistry', subjectNameBangla: 'রসায়ন', labelBangla: 'পত্র ২: রসায়ন', questionCount: 1, durationMinutes: 5, status: 'ACTIVE', sessionId: 'sess_p2', score: null, totalMarks: 1, correctCount: null, wrongCount: null, unansweredCount: null, timeSpentSeconds: null, startedAt: new Date().toISOString(), submittedAt: null },
            ],
          },
          activeSession: {
            sessionId: 'sess_p2',
            totalQuestions: 1,
            durationSeconds: 300,
            negativeRatio: 0.25,
            questions: [
              { id: 'qp2', stem: 'পত্র ২ প্রশ্ন: পানির সংকেত কী?', options: [{ id: 'o2', text: 'H2O' }] },
            ],
          },
        } as any;
      }

      if (url === '/exam/rehearsal/reh_1/paper/1/submit') {
        return {
          rehearsal: {
            id: 'reh_1',
            titleBangla: 'SSC বিজ্ঞান ডাবল পেপার',
            program: 'SSC',
            currentPaperIndex: 1,
            status: 'COMPLETED',
            totalScore: 2,
            totalMarks: 2,
            startedAt: new Date().toISOString(),
            submittedAt: new Date().toISOString(),
            papers: [
              { paperIndex: 0, subjectId: 'sub_ssc_physics', subjectCode: 'ssc_physics', subjectNameBangla: 'পদার্থবিজ্ঞান', labelBangla: 'পত্র ১: পদার্থবিজ্ঞান', questionCount: 1, durationMinutes: 5, status: 'SUBMITTED', sessionId: 'sess_p1', score: 1, totalMarks: 1, correctCount: 1, wrongCount: 0, unansweredCount: 0, timeSpentSeconds: 10, startedAt: new Date().toISOString(), submittedAt: new Date().toISOString() },
              { paperIndex: 1, subjectId: 'sub_ssc_chemistry', subjectCode: 'ssc_chemistry', subjectNameBangla: 'রসায়ন', labelBangla: 'পত্র ২: রসায়ন', questionCount: 1, durationMinutes: 5, status: 'SUBMITTED', sessionId: 'sess_p2', score: 1, totalMarks: 1, correctCount: 1, wrongCount: 0, unansweredCount: 0, timeSpentSeconds: 12, startedAt: new Date().toISOString(), submittedAt: new Date().toISOString() },
            ],
          },
          paperResult: { score: 1, totalQuestions: 1, correctCount: 1, wrongCount: 0, skippedCount: 0 },
        } as any;
      }

      return {} as any;
    });

    render(<ExamRehearsalPage />);

    await waitFor(() => {
      expect(screen.getByText(/বহু-পত্র মডেল টেস্ট রিহার্সাল/i)).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /SSC বিজ্ঞান ডাবল পেপার শুরু করো/i }));

    await waitFor(() => {
      expect(screen.getByText(/পত্র ১ প্রশ্ন: বলের একক কী\?/i)).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /নিউটন/i }));
    fireEvent.click(screen.getByRole('button', { name: /এই পত্র জমা দাও/i }));

    await waitFor(() => {
      expect(screen.getByText(/বিরতি ও পরবর্তী পত্রের প্রস্তুতি/i)).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /পরবর্তী পত্র শুরু করো/i }));

    await waitFor(() => {
      expect(screen.getByText(/পত্র ২ প্রশ্ন: পানির সংকেত কী\?/i)).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /H2O/i }));
    fireEvent.click(screen.getByRole('button', { name: /এই পত্র জমা দাও/i }));

    await waitFor(() => {
      expect(screen.getByText(/সম্মিলিত রিহার্সাল ফলাফল/i)).toBeDefined();
      expect(screen.getByText(/2 \/ 2/)).toBeDefined();
    });
  });
});
