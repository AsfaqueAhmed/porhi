export enum ProgramType {
  CLASS_6_8 = 'CLASS_6_8',
  SSC = 'SSC',
  HSC = 'HSC',
  ADMISSION = 'ADMISSION',
  BCS = 'BCS',
}

export enum EducationLevel {
  CLASS_6_8 = 'CLASS_6_8',
  CLASS_9_10 = 'CLASS_9_10',
  CLASS_11_12 = 'CLASS_11_12',
  ADMISSION = 'ADMISSION',
  BCS = 'BCS',
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
  classLevel: EducationLevel | string;
  program?: ProgramType | string;
  syllabusYear: number;
  isReady: boolean;
  chapters?: ChapterDTO[];
}
