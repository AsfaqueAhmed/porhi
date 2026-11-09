import { ContentStatus } from './content';

export enum QuestionType {
  MCQ = 'MCQ',
  CQ_CREATIVE = 'CQ_CREATIVE',
}

export type QuestionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface ExplanationObject {
  directAnswer: string;
  coreConcept: string;
  stepDerivation?: string;
  distractorAnalysis?: Record<string, string>;
  textbookCitation?: {
    bookTitle: string;
    chapterName: string;
    pageNumber?: number;
  };
  proTipShortcut?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface CQRubricItem {
  mark: number;
  criteria: string;
}

export interface CQRubric {
  ka: CQRubricItem;
  kha: CQRubricItem;
  ga: CQRubricItem;
  gha: CQRubricItem;
}

export interface QuestionSource {
  board?: string;
  year?: number;
  isVerified: boolean;
}

export interface QuestionDTO {
  id: string;
  topicId: string;
  type: QuestionType;
  stem: string;
  options?: QuestionOption[];
  explanation: ExplanationObject;
  cqRubric?: CQRubric;
  difficulty: QuestionDifficulty;
  source?: QuestionSource;
  status: ContentStatus;
  version: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface QuestionTopicHierarchy {
  id: string;
  titleBangla: string;
  chapter: {
    id: string;
    titleBangla: string;
    subject: {
      id: string;
      code: string;
      nameBangla: string;
    };
  };
}

export interface AdminQuestionItem {
  id: string;
  topicId: string;
  type: 'MCQ' | 'CQ_CREATIVE' | string;
  stem: string;
  options?: QuestionOption[] | null;
  explanation: ExplanationObject;
  cqRubric?: Partial<CQRubric> | null;
  difficulty: QuestionDifficulty | string;
  boardSource?: string | null;
  isVerified: boolean;
  status: ContentStatus | 'DRAFT' | 'REVIEW' | 'CORRECTION' | 'PUBLISHED' | 'ARCHIVED';
  version: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  topic: QuestionTopicHierarchy;
}

export interface QuestionStatusCounts {
  ALL: number;
  DRAFT: number;
  REVIEW: number;
  CORRECTION: number;
  PUBLISHED: number;
  ARCHIVED: number;
}

export interface ListQuestionsResponse {
  items: AdminQuestionItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  statusCounts: QuestionStatusCounts;
}
