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
  type LessonTermItem,
  type LessonWorkedExample,
  type AdminLessonItem,
  type LessonStatusCounts,
  type ListLessonsResponse,
  ReportStatus,
  type ReportCategory,
  type ContentReportDTO,
  type CqSelfAssessPayload,
  type StudentBookmarkSyncItem,
  type ExamHistoryResponseDTO,
  type StudyPlanTaskDTO,
  type OfflineChapterPackDTO,
  type OfflineSyncPayload,
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

  it('should construct valid AdminLessonItem, LessonStatusCounts, and ListLessonsResponse', () => {
    const hierarchy: QuestionTopicHierarchy = {
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

    const term: LessonTermItem = {
      termBangla: 'জড়তা',
      termEnglish: 'Inertia',
      definition: 'অবস্থা পরিবর্তনের অনীহা',
    };
    const example: LessonWorkedExample = {
      problem: '$F = ma$ বের কর',
      stepByStepSolution: '$F = 2 \\times 5 = 10\\text{ N}$',
    };

    const lesson: AdminLessonItem = {
      id: 'les_1',
      topicId: hierarchy.id,
      titleBangla: 'নিউটনের গতিসূত্র',
      learningGoal: 'বল ও ত্বরণের সম্পর্ক বোঝা',
      explanation: 'সুষম ত্বরণের ব্যাখ্যা $F=ma$',
      importantTerms: [term],
      workedExample: example,
      memoryAid: 'F সমান m গুণ a',
      status: ContentStatus.DRAFT,
      version: 1,
      createdAt: '2026-11-09T00:00:00Z',
      updatedAt: '2026-11-09T01:00:00Z',
      topic: hierarchy,
    };

    const statusCounts: LessonStatusCounts = {
      ALL: 5,
      DRAFT: 2,
      REVIEW: 1,
      CORRECTION: 0,
      PUBLISHED: 2,
      ARCHIVED: 1,
    };

    const list: ListLessonsResponse = {
      items: [lesson],
      total: 5,
      page: 1,
      limit: 20,
      totalPages: 1,
      statusCounts,
    };

    expect(list.items[0].importantTerms[0].termBangla).toBe('জড়তা');
    expect(list.items[0].topic?.chapter.subject.code).toBe('ssc_physics');
    expect(list.statusCounts.PUBLISHED).toBe(2);
    expect(list.statusCounts.ARCHIVED).toBe(1);
  });

  it('should support ReportStatus, ContentReportDTO, CqSelfAssessPayload, and StudentBookmarkSyncItem', () => {
    expect(ReportStatus.OPEN).toBe('OPEN');
    expect(ReportStatus.IN_REVIEW).toBe('IN_REVIEW');
    expect(ReportStatus.RESOLVED).toBe('RESOLVED');
    expect(ReportStatus.DISMISSED).toBe('DISMISSED');

    const category: ReportCategory = 'WRONG_ANSWER';
    const report: ContentReportDTO = {
      id: 'rep_1',
      contentType: 'QUESTION',
      contentId: 'q_1',
      topicId: 'top_1',
      category,
      description: 'বিকল্প খ সঠিক হওয়া উচিত',
      status: ReportStatus.OPEN,
      createdAt: '2026-11-12T00:00:00Z',
      updatedAt: '2026-11-12T00:00:00Z',
    };
    const cqAssess: CqSelfAssessPayload = {
      questionId: 'q_cq_1',
      selfScores: { ka: 1, kha: 2, ga: 3, gha: 3 },
      totalScore: 9,
      maxScore: 10,
    };
    const bookmark: StudentBookmarkSyncItem = {
      itemId: 'top_1',
      itemType: 'topic',
      titleBangla: '১.১ পদার্থবিজ্ঞান',
      href: '/lesson/top_1',
    };

    expect(report.category).toBe('WRONG_ANSWER');
    expect(cqAssess.totalScore).toBe(9);
    expect(bookmark.itemType).toBe('topic');
  });

  it('should support v1.1 ExamHistoryResponseDTO, StudyPlanTaskDTO, OfflineChapterPackDTO, and OfflineSyncPayload', () => {
    const history: ExamHistoryResponseDTO = {
      items: [
        {
          sessionId: 'sess_1',
          testType: 'SUBJECT_TEST',
          subjectId: 'sub_phy',
          subjectNameBangla: 'পদার্থবিজ্ঞান',
          chapterId: null,
          totalQuestions: 25,
          correctCount: 20,
          wrongCount: 3,
          skippedCount: 2,
          score: 19.25,
          accuracyPercent: 80,
          percentile: 85,
          completedAt: '2026-11-12T10:00:00Z',
        },
      ],
      summary: {
        totalTests: 1,
        averageAccuracy: 80,
        bestScorePercent: 80,
        subjectTestsCount: 1,
      },
      trend: [
        {
          sessionId: 'sess_1',
          label: '১২ নভে',
          date: '2026-11-12',
          accuracyPercent: 80,
          testType: 'SUBJECT_TEST',
        },
      ],
    };

    const task: StudyPlanTaskDTO = {
      id: 'task_1',
      titleBangla: 'নিউটনের সূত্র রিভিশন',
      scheduledDate: '2026-11-12',
      reminderTime: '18:30',
      targetType: 'REVISION',
      completed: false,
    };

    const pack: OfflineChapterPackDTO = {
      chapterId: 'chap_1',
      subjectId: 'sub_phy',
      titleBangla: 'গতি',
      versionHash: 'v1',
      downloadedAt: '2026-11-12T10:00:00Z',
      topics: [{ id: 'top_1', titleBangla: 'সরণ ও বেগ', orderIndex: 1 }],
      lessons: [],
      questions: [],
    };

    const syncPayload: OfflineSyncPayload = {
      lessonCompletes: [
        {
          offlineEventId: 'ev_1',
          topicId: 'top_1',
          completedAt: '2026-11-12T10:05:00Z',
        },
      ],
      practiceAttempts: [],
      examSubmissions: [],
    };

    expect(history.items[0].percentile).toBe(85);
    expect(task.targetType).toBe('REVISION');
    expect(pack.chapterId).toBe('chap_1');
    expect(syncPayload.lessonCompletes).toHaveLength(1);
  });
});
