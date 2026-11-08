import { describe, it, expect } from 'vitest';
import {
  ContentStatus,
  QuestionType,
  ProgramType,
  EducationLevel,
  type ExplanationObject,
  type QuestionDTO,
  type LessonDTO,
} from '../src';

describe('Shared Constants and Enums', () => {
  it('should export correct ContentStatus enums', () => {
    expect(ContentStatus.DRAFT).toBe('DRAFT');
    expect(ContentStatus.REVIEW).toBe('REVIEW');
    expect(ContentStatus.PUBLISHED).toBe('PUBLISHED');
    expect(ContentStatus.CORRECTION).toBe('CORRECTION');
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
    };
    expect(question.type).toBe(QuestionType.MCQ);
    expect(question.options?.length).toBe(2);
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
});
