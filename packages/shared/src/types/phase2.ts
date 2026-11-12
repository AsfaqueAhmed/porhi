import type { BoardKey, TrackProgramCode } from '../utils/board-parser';
import type { CQRubric, ExplanationObject, QuestionOption } from './question';

declare module './content' {
  interface LessonDTO {
    audioUrl?: string | null;
    audioDurationSeconds?: number | null;
  }

  interface AdminLessonItem {
    audioUrl?: string | null;
    audioDurationSeconds?: number | null;
  }

  interface OfflineChapterPackDTO {
    lessonAudioMap?: Record<string, { audioUrl: string; audioDurationSeconds?: number | null }>;
  }
}

export interface BoardFacetItemDTO {
  key: BoardKey;
  labelBangla: string;
  labelEnglish: string;
  count: number;
}

export interface YearFacetItemDTO {
  year: number;
  count: number;
}

export interface BoardSubjectFacetDTO {
  id: string;
  code: string;
  nameBangla: string;
  program: TrackProgramCode | string;
  count: number;
}

export interface BoardArchiveFiltersDTO {
  boards: BoardFacetItemDTO[];
  years: YearFacetItemDTO[];
  subjects: BoardSubjectFacetDTO[];
  totalVerifiedQuestions: number;
}

export interface BoardQuestionItemDTO {
  id: string;
  topicId: string;
  type: 'MCQ' | 'CQ_CREATIVE' | string;
  stem: string;
  options?: QuestionOption[] | null;
  correctOption?: string | null;
  explanation?: ExplanationObject | null;
  cqRubric?: CQRubric | null;
  difficulty: string;
  boardSource: string | null;
  boardKey: BoardKey;
  boardKeys: BoardKey[];
  boardLabelBangla: string;
  boardYear: number | null;
  isVerifiedBoard: boolean;
  subjectId: string;
  subjectCode: string;
  subjectNameBangla: string;
  program: string;
  chapterId: string;
  chapterTitleBangla: string;
  topicTitleBangla: string;
}

export interface BoardArchiveResponseDTO {
  items: BoardQuestionItemDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RehearsalPaperInputDTO {
  subjectId: string;
  labelBangla?: string;
  questionCount: number;
  durationMinutes: number;
}

export type RehearsalPaperStatus = 'PENDING' | 'ACTIVE' | 'SUBMITTED';
export type MultiRehearsalStatus = 'IN_PROGRESS' | 'INTERMISSION' | 'COMPLETED';

export interface RehearsalPaperStateDTO {
  paperIndex: number;
  subjectId: string;
  subjectCode: string;
  subjectNameBangla: string;
  labelBangla: string;
  questionCount: number;
  durationMinutes: number;
  status: RehearsalPaperStatus;
  sessionId: string | null;
  score: number | null;
  totalMarks: number | null;
  correctCount: number | null;
  wrongCount: number | null;
  unansweredCount: number | null;
  timeSpentSeconds: number | null;
  startedAt: string | null;
  submittedAt: string | null;
}

export interface MultiExamRehearsalDTO {
  id: string;
  titleBangla: string;
  program: string;
  currentPaperIndex: number;
  status: MultiRehearsalStatus;
  totalScore: number | null;
  totalMarks: number;
  startedAt: string;
  submittedAt: string | null;
  papers: RehearsalPaperStateDTO[];
}

export type GuardianAudience = 'PARENT' | 'TEACHER';

export interface GuardianShareLinkDTO {
  id: string;
  shareCode: string;
  audience: GuardianAudience;
  recipientLabel: string | null;
  isActive: boolean;
  sharePath: string;
  createdAt: string;
  revokedAt: string | null;
  lastViewedAt: string | null;
}

export interface GuardianReportDTO {
  shareCode: string;
  audience: GuardianAudience;
  recipientLabel: string | null;
  generatedAt: string;
  student: {
    displayName: string;
    selectedClass: string;
  };
  summary: {
    completedLessons: number;
    streakDays: number;
    weeklyStudyMinutes: number;
    weeklyCompletedTasks: number;
    weeklyTotalTasks: number;
    averageExamAccuracy: number;
    totalExamsTaken: number;
    totalRehearsalsCompleted: number;
    dueRevisionCount: number;
  };
  chapterMastery: Array<{
    chapterId: string;
    titleBangla: string;
    subjectNameBangla: string;
    accuracy: number;
    questionsAttempted: number;
  }>;
  weakTopics: Array<{
    topicId: string;
    titleBangla: string;
    chapterTitleBangla: string;
    accuracy: number;
    attempts: number;
  }>;
  recentExams: Array<{
    id: string;
    subjectNameBangla: string;
    testType: string;
    score: number;
    totalMarks: number;
    accuracy: number;
    submittedAt: string;
  }>;
}
