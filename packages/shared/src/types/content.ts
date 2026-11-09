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
  status: ContentStatus;
  version: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
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
  importantTerms: LessonTermItem[];
  workedExample?: LessonWorkedExample | null;
  memoryAid?: string | null;
  status: ContentStatus | 'DRAFT' | 'REVIEW' | 'CORRECTION' | 'PUBLISHED' | 'ARCHIVED';
  version: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  topic?: QuestionTopicHierarchy;
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
