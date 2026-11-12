import type { QuestionTopicHierarchy } from './question';

export enum ContentStatus {
  DRAFT = 'DRAFT',
  REVIEW = 'REVIEW',
  PUBLISHED = 'PUBLISHED',
  CORRECTION = 'CORRECTION',
  ARCHIVED = 'ARCHIVED',
}

export type ContentType = 'LESSON' | 'QUESTION';

export interface ImportantTerm {
  termBangla: string;
  termEnglish: string;
  definition: string;
}

export interface WorkedExample {
  problem: string;
  stepByStepSolution: string;
}

export interface LessonDTO {
  id: string;
  topicId: string;
  titleBangla: string;
  learningGoal: string;
  explanation: string;
  importantTerms: ImportantTerm[];
  workedExample?: WorkedExample;
  memoryAid?: string;
  interactiveWidgetUrl?: string | null;
  status: ContentStatus;
  version: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  topic?: QuestionTopicHierarchy;
}

export interface LessonTermItem {
  termBangla: string;
  termEnglish?: string;
  definition?: string;
}

export interface LessonWorkedExample {
  problem?: string;
  stepByStepSolution?: string;
}

export interface AdminLessonItem {
  id: string;
  topicId: string;
  titleBangla: string;
  learningGoal: string;
  explanation: string;
  interactiveWidgetUrl?: string | null;
  importantTerms: LessonTermItem[];
  workedExample?: LessonWorkedExample | null;
  memoryAid?: string | null;
  status: ContentStatus | 'DRAFT' | 'REVIEW' | 'CORRECTION' | 'PUBLISHED' | 'ARCHIVED';
  version: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  topic?: QuestionTopicHierarchy;
}

export type MediaCategory = 'IMAGE' | 'AUDIO' | 'VIDEO' | 'INTERACTIVE';

export interface MediaUploadResponse {
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
  category: MediaCategory;
}

export interface LessonStatusCounts {
  ALL: number;
  DRAFT: number;
  REVIEW: number;
  CORRECTION: number;
  PUBLISHED: number;
  ARCHIVED: number;
}

export interface ListLessonsResponse {
  items: AdminLessonItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  statusCounts: LessonStatusCounts;
}

export enum ReportStatus {
  OPEN = 'OPEN',
  IN_REVIEW = 'IN_REVIEW',
  RESOLVED = 'RESOLVED',
  DISMISSED = 'DISMISSED',
}

export type ReportCategory =
  | 'WRONG_ANSWER'
  | 'TYPO_OR_LATEX'
  | 'UNCLEAR_EXPLANATION'
  | 'CURRICULUM_MISMATCH'
  | 'OTHER';

export interface ContentReportDTO {
  id: string;
  userId?: string | null;
  contentType: ContentType;
  contentId: string;
  topicId?: string | null;
  category: ReportCategory;
  description: string;
  status: ReportStatus;
  resolutionNote?: string | null;
  resolvedById?: string | null;
  resolvedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  contentTitle?: string;
}

export interface CqSelfAssessPayload {
  questionId: string;
  selfScores: {
    ka: number;
    kha: number;
    ga: number;
    gha: number;
  };
  totalScore: number;
  maxScore: number;
}

export interface StudentBookmarkSyncItem {
  itemId: string;
  itemType: 'topic' | 'question';
  titleBangla: string;
  subtitleBangla?: string | null;
  href: string;
  createdAt?: Date | string;
}

export type ExamTestType =
  | 'CHAPTER_TEST'
  | 'TOPIC_TEST'
  | 'WEAK_AREA'
  | 'SUBJECT_TEST'
  | 'OFFLINE_CHAPTER_TEST';

export interface ExamHistoryItemDTO {
  sessionId: string;
  testType: ExamTestType | string;
  subjectId: string;
  subjectNameBangla?: string;
  chapterId?: string | null;
  chapterTitleBangla?: string | null;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  score: number;
  accuracyPercent: number;
  percentile?: number | null;
  completedAt: string;
}

export interface ExamHistorySummaryDTO {
  totalTests: number;
  averageAccuracy: number;
  bestScorePercent: number;
  subjectTestsCount: number;
}

export interface ExamTrendPointDTO {
  sessionId: string;
  label: string;
  date: string;
  accuracyPercent: number;
  testType: string;
}

export interface ExamHistoryResponseDTO {
  items: ExamHistoryItemDTO[];
  summary: ExamHistorySummaryDTO;
  trend: ExamTrendPointDTO[];
}

export type StudyPlanTaskType =
  | 'LESSON'
  | 'PRACTICE'
  | 'MODEL_TEST'
  | 'REVISION'
  | 'CUSTOM';

export interface StudyPlanTaskDTO {
  id: string;
  userId?: string;
  subjectId?: string | null;
  chapterId?: string | null;
  topicId?: string | null;
  titleBangla: string;
  scheduledDate: string;
  reminderTime?: string | null;
  targetType: StudyPlanTaskType | string;
  completed: boolean;
  completedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface OfflineChapterPackDTO {
  chapterId: string;
  subjectId: string;
  titleBangla: string;
  versionHash: string;
  downloadedAt: string;
  topics: Array<{
    id: string;
    titleBangla: string;
    orderIndex: number;
  }>;
  lessons: Array<{
    id: string;
    topicId: string;
    titleBangla: string;
    learningGoal: string;
    explanation: string;
    importantTerms: ImportantTerm[];
    workedExample?: WorkedExample | null;
    memoryAid?: string | null;
    interactiveWidgetUrl?: string | null;
    version: number;
  }>;
  questions: Array<{
    id: string;
    topicId: string;
    type: string;
    stem: string;
    options?: Array<{ id: string; text: string; isCorrect?: boolean }> | null;
    modelAnswer?: string | null;
    rubric?: Array<{
      part: string;
      labelBangla: string;
      maxMarks: number;
      criteria: string;
    }> | null;
    explanation?: Record<string, any> | null;
    difficulty?: string;
    version: number;
  }>;
}

export interface OfflineLessonCompleteItem {
  offlineEventId: string;
  topicId: string;
  chapterId?: string;
  subjectId?: string;
  completedAt: string;
}

export interface OfflinePracticeAttemptItem {
  offlineEventId: string;
  questionId: string;
  topicId?: string;
  isCorrect: boolean;
  selectedOptionId?: string | null;
  attemptedAt: string;
}

export interface OfflineExamSubmissionItem {
  offlineSessionId: string;
  subjectId: string;
  chapterId?: string | null;
  testType?: string;
  durationSeconds?: number;
  answers: Array<{ questionId: string; selectedOptionId: string | null }>;
  submittedAt: string;
}

export interface OfflineSyncPayload {
  lessonCompletes?: OfflineLessonCompleteItem[];
  practiceAttempts?: OfflinePracticeAttemptItem[];
  examSubmissions?: OfflineExamSubmissionItem[];
}

export interface OfflineSyncResponseDTO {
  syncedLessons: number;
  syncedAttempts: number;
  syncedExams: number;
}
