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
  version?: number;
  createdAt?: Date | string;
}
