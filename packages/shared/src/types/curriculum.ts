export enum ProgramType {
  SSC = 'SSC',
  HSC = 'HSC',
}

export enum EducationLevel {
  CLASS_9_10 = 'CLASS_9_10',
  CLASS_11_12 = 'CLASS_11_12',
}

export interface TopicDTO {
  id: string;
  chapterId: string;
  orderIndex: number;
  titleBangla: string;
}

export interface ChapterDTO {
  id: string;
  subjectId: string;
  orderIndex: number;
  titleBangla: string;
  topics?: TopicDTO[];
}

export interface SubjectDTO {
  id: string;
  code: string;
  nameBangla: string;
  classLevel: EducationLevel;
  syllabusYear: number;
  isReady: boolean;
  chapters?: ChapterDTO[];
}
