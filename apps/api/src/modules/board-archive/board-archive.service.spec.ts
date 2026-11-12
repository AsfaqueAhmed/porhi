import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContentStatus } from '@prisma/client';
import { BoardArchiveService } from './board-archive.service';

describe('BoardArchiveService', () => {
  let service: BoardArchiveService;
  let mockPrisma: any;

  const sampleQuestions = [
    {
      id: 'q1',
      topicId: 'top_1',
      type: 'MCQ',
      stem: 'বেগের মাত্রা কোনটি?',
      options: [
        { id: 'opt_1', text: 'LT⁻¹', isCorrect: true },
        { id: 'opt_2', text: 'LT⁻²', isCorrect: false },
      ],
      explanation: { directAnswer: 'LT⁻¹', coreConcept: 'বেগ = সরণ / সময়' },
      cqRubric: null,
      difficulty: 'EASY',
      boardSource: 'Chittagong Board 2022',
      isVerified: true,
      status: ContentStatus.PUBLISHED,
      topic: {
        id: 'top_1',
        titleBangla: 'ভৌত রাশি ও পরিমাপ',
        chapter: {
          id: 'chap_1',
          titleBangla: 'প্রথম অধ্যায়',
          subject: {
            id: 'sub_ssc_physics',
            code: 'ssc_physics',
            nameBangla: 'পদার্থবিজ্ঞান',
            program: 'SSC',
          },
        },
      },
    },
    {
      id: 'q2',
      topicId: 'top_2',
      type: 'MCQ',
      stem: 'ভেক্টর লম্ব হওয়ার শর্ত কী?',
      options: [
        { id: 'opt_1', text: 'ডট গুণন ০', isCorrect: true },
        { id: 'opt_2', text: 'ক্রস গুণন ০', isCorrect: false },
      ],
      explanation: { directAnswer: 'ডট গুণন ০', coreConcept: 'A·B = 0' },
      cqRubric: null,
      difficulty: 'MEDIUM',
      boardSource: 'ঢাকা বোর্ড ২০২৪',
      isVerified: true,
      status: ContentStatus.PUBLISHED,
      topic: {
        id: 'top_2',
        titleBangla: 'ভেক্টর',
        chapter: {
          id: 'chap_hsc_1',
          titleBangla: 'ভেক্টর অধ্যায়',
          subject: {
            id: 'sub_hsc_physics_1',
            code: 'hsc_physics_1',
            nameBangla: 'HSC পদার্থবিজ্ঞান ১ম পত্র',
            program: 'HSC',
          },
        },
      },
    },
    {
      id: 'q3',
      topicId: 'top_1',
      type: 'CQ_CREATIVE',
      stem: 'একটি স্ক্রু গজের পিচ ০.৫ মি.মি.',
      options: null,
      explanation: { directAnswer: '0.01 mm', coreConcept: 'LC = পিচ / ভাগ' },
      cqRubric: { subQuestions: [{ label: 'ক', questionText: 'লঘিষ্ঠ গণন কী?', marks: 1 }] },
      difficulty: 'HARD',
      boardSource: 'Rajshahi Board 2025',
      isVerified: true,
      status: ContentStatus.PUBLISHED,
      topic: {
        id: 'top_1',
        titleBangla: 'ভৌত রাশি ও পরিমাপ',
        chapter: {
          id: 'chap_1',
          titleBangla: 'প্রথম অধ্যায়',
          subject: {
            id: 'sub_ssc_physics',
            code: 'ssc_physics',
            nameBangla: 'পদার্থবিজ্ঞান',
            program: 'SSC',
          },
        },
      },
    },
    {
      id: 'q4',
      topicId: 'top_1',
      type: 'MCQ',
      stem: 'অনুশীলন প্রশ্ন: ত্বরণ কী?',
      options: [{ id: 'opt_1', text: 'বেগ বৃদ্ধির হার', isCorrect: true }],
      explanation: { directAnswer: 'বেগ বৃদ্ধির হার', coreConcept: 'a = dv/dt' },
      cqRubric: null,
      difficulty: 'EASY',
      boardSource: 'Model Practice',
      isVerified: false,
      status: ContentStatus.PUBLISHED,
      topic: {
        id: 'top_1',
        titleBangla: 'ভৌত রাশি ও পরিমাপ',
        chapter: {
          id: 'chap_1',
          titleBangla: 'প্রথম অধ্যায়',
          subject: {
            id: 'sub_ssc_physics',
            code: 'ssc_physics',
            nameBangla: 'পদার্থবিজ্ঞান',
            program: 'SSC',
          },
        },
      },
    },
  ];

  beforeEach(() => {
    mockPrisma = {
      question: {
        findMany: vi.fn().mockResolvedValue(sampleQuestions),
      },
    };
    service = new BoardArchiveService(mockPrisma);
  });

  it('normalizes board spelling variants and aggregates filters accurately', async () => {
    const filters = await service.getFilters();
    expect(filters.totalVerifiedQuestions).toBe(3);

    const ctgFacet = filters.boards.find((b) => b.key === 'CHATTOGRAM');
    const dhakaFacet = filters.boards.find((b) => b.key === 'DHAKA');
    const rajFacet = filters.boards.find((b) => b.key === 'RAJSHAHI');

    expect(ctgFacet?.count).toBe(1);
    expect(dhakaFacet?.count).toBe(1);
    expect(rajFacet?.count).toBe(1);
    expect(filters.years.map((y) => y.year)).toEqual([2025, 2024, 2022]);
    expect(filters.subjects).toHaveLength(2);
  });

  it('filters verified board questions by board key, 2024+ range, program, and keyword', async () => {
    const ctgRes = await service.getQuestions({ board: 'CHATTOGRAM' });
    expect(ctgRes.total).toBe(1);
    expect(ctgRes.items[0].id).toBe('q1');
    expect(ctgRes.items[0].boardKey).toBe('CHATTOGRAM');
    expect(ctgRes.items[0].boardYear).toBe(2022);
    expect(ctgRes.items[0].correctOption).toBe('opt_1');

    const recentRes = await service.getQuestions({ year: '2024+' });
    expect(recentRes.total).toBe(2);
    expect(recentRes.items.map((i) => i.id)).toEqual(['q3', 'q2']);

    const cqRes = await service.getQuestions({ type: 'CQ_CREATIVE' });
    expect(cqRes.total).toBe(1);
    expect(cqRes.items[0].id).toBe('q3');

    const searchRes = await service.getQuestions({ search: 'স্ক্রু', verifiedOnly: 'true' });
    expect(searchRes.total).toBe(1);
    expect(searchRes.items[0].id).toBe('q3');
  });

  it('excludes non-board practice questions by default unless verifiedOnly=false', async () => {
    const defaultRes = await service.getQuestions({});
    expect(defaultRes.total).toBe(3);

    const allRes = await service.getQuestions({ verifiedOnly: 'false' });
    expect(allRes.total).toBe(4);
  });
});
