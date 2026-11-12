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
