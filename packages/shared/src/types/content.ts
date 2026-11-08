export enum ContentStatus {
  DRAFT = 'DRAFT',
  REVIEW = 'REVIEW',
  PUBLISHED = 'PUBLISHED',
  CORRECTION = 'CORRECTION',
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
