import { describe, it, expect } from 'vitest';
import {
  ContentStatus,
  QuestionType,
  ProgramType,
  EducationLevel,
  type ExplanationObject,
  type QuestionDTO,
  type LessonDTO,
  type SubjectDTO,
  type QuestionTopicHierarchy,
  type AdminQuestionItem,
  type QuestionStatusCounts,
  type ListQuestionsResponse,
} from '../src';

describe('Shared Constants and Enums', () => {
  it('should export correct ContentStatus enums', () => {
    expect(ContentStatus.DRAFT).toBe('DRAFT');
    expect(ContentStatus.REVIEW).toBe('REVIEW');
    expect(ContentStatus.PUBLISHED).toBe('PUBLISHED');
    expect(ContentStatus.CORRECTION).toBe('CORRECTION');
    expect(ContentStatus.ARCHIVED).toBe('ARCHIVED');
  });

  it('should support MCQ and CQ QuestionTypes', () => {
    expect(QuestionType.MCQ).toBe('MCQ');
    expect(QuestionType.CQ_CREATIVE).toBe('CQ_CREATIVE');
  });

  it('should support SSC and HSC ProgramTypes', () => {
    expect(ProgramType.SSC).toBe('SSC');
    expect(ProgramType.HSC).toBe('HSC');
  });

  it('should support EducationLevel enums', () => {
    expect(EducationLevel.CLASS_9_10).toBe('CLASS_9_10');
    expect(EducationLevel.CLASS_11_12).toBe('CLASS_11_12');
  });
});

describe('Shared Type Structures', () => {
  it('should construct valid ExplanationObject', () => {
    const explanation: ExplanationObject = {
      directAnswer: '10 m/s',
      coreConcept: 'v = u + at',
      stepDerivation: 'v = 0 + 2 * 5 = 10',
      distractorAnalysis: {
        opt_1: 'Did not multiply by time',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান',
        chapterName: 'গতি',
        pageNumber: 42,
      },
      proTipShortcut: 'Use direct formula when u = 0',
    };
    expect(explanation.directAnswer).toBe('10 m/s');
    expect(explanation.textbookCitation?.bookTitle).toBe('পদার্থবিজ্ঞান');
  });

  it('should construct valid QuestionDTO', () => {
    const question: QuestionDTO = {
      id: 'q1',
      topicId: 'top1',
      type: QuestionType.MCQ,
      stem: 'গাড়ির ত্বরণ কত?',
      options: [
        { id: 'opt_1', text: '10 m/s²', isCorrect: true },
        { id: 'opt_2', text: '5 m/s²', isCorrect: false },
      ],
      explanation: {
        directAnswer: '10 m/s²',
        coreConcept: 'a = (v - u) / t',
      },
      difficulty: 'MEDIUM',
      status: ContentStatus.PUBLISHED,
      version: 1,
      createdAt: '2026-11-08T00:00:00Z',
      updatedAt: '2026-11-08T00:00:00Z',
    };
    expect(question.type).toBe(QuestionType.MCQ);
    expect(question.options?.length).toBe(2);
    expect(question.version).toBe(1);
  });

  it('should construct valid SubjectDTO with strict EducationLevel', () => {
    const subject: SubjectDTO = {
      id: 'sub_1',
      code: 'ssc_physics',
      nameBangla: 'পদার্থবিজ্ঞান',
      classLevel: EducationLevel.CLASS_9_10,
      syllabusYear: 2026,
      isReady: true,
    };
    expect(subject.classLevel).toBe(EducationLevel.CLASS_9_10);
  });

  it('should construct valid LessonDTO', () => {
    const lesson: LessonDTO = {
      id: 'l1',
      topicId: 'top1',
      titleBangla: 'গতির মৌলিক ধারণা',
      learningGoal: 'গতির সমীকরণ বুঝতে পারা',
      explanation: 'সুষম ত্বরণে চলমান বস্তুর ক্ষেত্রে...',
      importantTerms: [
        { termBangla: 'ত্বরণ', termEnglish: 'Acceleration', definition: 'বেগের পরিবর্তনের হার' },
      ],
      workedExample: {
        problem: 'একটি গাড়ি...',
        stepByStepSolution: 'ধাপ ১...',
      },
      memoryAid: 'ভুবন জুড়ে ত্বরণ থাকলে...',
      status: ContentStatus.PUBLISHED,
      version: 1,
    };
    expect(lesson.titleBangla).toBe('গতির মৌলিক ধারণা');
    expect(lesson.importantTerms[0].termEnglish).toBe('Acceleration');
  });

  it('should construct valid QuestionTopicHierarchy, AdminQuestionItem, QuestionStatusCounts, and ListQuestionsResponse', () => {
    const topic: QuestionTopicHierarchy = {
      id: 'top_1',
      titleBangla: 'গতির সমীকরণ',
      chapter: {
        id: 'chap_2',
        titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
        subject: {
          id: 'sub_phy',
          code: 'ssc_physics',
          nameBangla: 'পদার্থবিজ্ঞান',
        },
      },
    };

    const item: AdminQuestionItem = {
      id: 'q_1',
      topicId: topic.id,
      type: 'MCQ',
      stem: 'বেগের একক কী?',
      options: [
        { id: 'opt_q1_a', text: 'm/s', isCorrect: true },
        { id: 'opt_q1_b', text: 'm/s²', isCorrect: false },
      ],
      explanation: {
        directAnswer: 'm/s',
        coreConcept: 'v = s / t',
      },
      cqRubric: null,
      difficulty: 'EASY',
      boardSource: 'Dhaka Board 2024',
      isVerified: true,
      status: ContentStatus.ARCHIVED,
      version: 2,
      createdAt: '2026-11-08T00:00:00Z',
      updatedAt: '2026-11-09T00:00:00Z',
      topic,
    };

    const statusCounts: QuestionStatusCounts = {
      ALL: 10,
      DRAFT: 2,
      REVIEW: 1,
      CORRECTION: 1,
      PUBLISHED: 6,
      ARCHIVED: 3,
    };

    const response: ListQuestionsResponse = {
      items: [item],
      total: 10,
      page: 1,
      limit: 20,
      totalPages: 1,
      statusCounts,
    };

    expect(response.items[0].topic.chapter.subject.code).toBe('ssc_physics');
    expect(response.items[0].status).toBe(ContentStatus.ARCHIVED);
    expect(response.statusCounts.CORRECTION).toBe(1);
    expect(response.statusCounts.ARCHIVED).toBe(3);
  });
});
