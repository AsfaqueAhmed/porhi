import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ActiveSubject {
  id: string;
  code: string;
  nameBangla: string;
  syllabusYear: number;
  program?: string; // 'SSC' | 'HSC'
}

export interface UserProfile {
  id: string;
  guestId?: string | null;
  phoneNumber?: string | null;
  fullName?: string | null;
  role?: string;
  selectedClass?: string;
  isGuest?: boolean;
}

export interface ReportedIssueItem {
  id: string;
  contentType: 'LESSON' | 'QUESTION';
  contentId: string;
  topicId?: string | null;
  category: string;
  description: string;
  status: string;
  resolutionNote?: string | null;
  createdAt: string;
}

export interface TopicMasteryStats {
  attempted: number;
  correct: number;
  lastPracticedAt: string;
}

export interface SavedMistakeItem {
  questionId: string;
  stemBangla: string;
  topicId: string;
  topicTitle: string;
  chapterId: string;
  chapterTitle: string;
  selectedKey: string;
  correctKey: string;
  explanationBangla?: string;
  wrongCount: number;
  resolved: boolean;
  lastWrongAt: string;
}

export interface ExamHistoryItem {
  examSessionId: string;
  chapterId: string;
  chapterTitle: string;
  score: number;
  totalQuestions: number;
  accuracyPercent: number;
  submittedAt: string;
}

export interface BookmarkItem {
  id: string; // topicId or questionId
  type: 'topic' | 'question';
  titleBangla: string;
  subtitleBangla?: string;
  href: string;
  createdAt: string;
}

export interface LastVisitedTopic {
  topicId: string;
  topicTitle: string;
  chapterId: string;
  chapterTitle: string;
  visitedAt: string;
}

export interface ServerOverviewPayload {
  subjectId?: string;
  curriculumTotals?: {
    totalChapters: number;
    totalTopics: number;
    totalPublishedLessons: number;
    totalPublishedQuestions: number;
  };
  completedTopicIds?: string[];
  streakDays?: number;
  studyDates?: string[];
  activityDays?: string[];
  lastStudiedTopic?: {
    topicId: string;
    topicTitle: string;
    chapterId: string;
    chapterTitle: string;
    timestamp: string;
  } | null;
  lastActivity?: {
    topicId: string;
    topicTitle: string;
    chapterId: string;
    chapterTitle: string;
    timestamp: string;
  } | null;
  practiceStats?: {
    totalAttempts: number;
    correctAttempts: number;
    accuracyPercent: number;
    topicMastery: Record<string, { attempts: number; correct: number; accuracy: number }>;
  };
  topicStats?: Record<
    string,
    {
      completedLesson: boolean;
      attempted: number;
      correct: number;
      accuracyPercent: number;
      status: string;
    }
  >;
  dueMistakes?: Array<{
    id?: string;
    questionId: string;
    attemptCount?: number;
    updatedAt?: string;
    topicId: string;
    topicTitle: string;
    chapterId: string;
    chapterTitle: string;
    stem: string;
    correctOptionText: string;
    conceptNote?: string;
  }>;
  unresolvedMistakes?: Array<{
    questionId: string;
    stemBangla: string;
    topicId: string;
    topicTitle: string;
    chapterId: string;
    chapterTitle: string;
    selectedKey: string;
    correctKey: string;
    explanationBangla?: string;
    wrongCount: number;
    lastWrongAt: string;
  }>;
  recentExams?: Array<
    ExamHistoryItem & {
      sessionId?: string;
      completedAt?: string | null;
    }
  >;
  bookmarks?: Array<
    BookmarkItem & {
      subtitleBangla?: string | null;
    }
  >;
  lessonNotes?: Record<string, string>;
}

interface UserState {
  guestId: string | null;
  token: string | null;
  user: UserProfile | null;
  activeSubject: ActiveSubject | null;
  streakDays: number;

  // Dynamic Learning State
  completedTopics: string[];
  lastVisitedTopic: LastVisitedTopic | null;
  topicMastery: Record<string, TopicMasteryStats>;
  savedMistakes: SavedMistakeItem[];
  examHistory: ExamHistoryItem[];
  bookmarks: BookmarkItem[];
  lessonNotes: Record<string, string>;
  reportedIssues: ReportedIssueItem[];
  studyDates: string[];

  setGuestId: (id: string | null) => void;
  setToken: (token: string | null) => void;
  setUser: (user: UserProfile | null) => void;
  setActiveSubject: (subject: ActiveSubject | null) => void;
  setStreakDays: (streak: number) => void;
  logout: () => void;

  // Learning Actions
  recordLessonVisit: (topicId: string, topicTitle: string, chapterId: string, chapterTitle: string) => void;
  markTopicCompleted: (topicId: string, topicTitle?: string, chapterId?: string, chapterTitle?: string) => void;
  recordPracticeAttempt: (payload: {
    questionId: string;
    stemBangla: string;
    topicId: string;
    topicTitle: string;
    chapterId: string;
    chapterTitle: string;
    selectedKey: string;
    correctKey: string;
    explanationBangla?: string;
    isCorrect: boolean;
  }) => void;
  recordExamCompletion: (entry: ExamHistoryItem) => void;
  resolveMistake: (questionId: string) => void;
  toggleBookmark: (item: Omit<BookmarkItem, 'createdAt'>) => void;
  saveLessonNote: (topicId: string, note: string) => void;
  addReportedIssue: (issue: ReportedIssueItem) => void;
  hydrateFromServerOverview: (overview: ServerOverviewPayload) => void;
}

function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function addStudyDate(existing: string[], dateStr = getTodayIsoDate()): string[] {
  const set = new Set([...(existing || []), dateStr]);
  return Array.from(set).sort().slice(-30);
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      guestId: null,
      token: null,
      user: null,
      activeSubject: {
        id: 'sub_ssc_physics',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        syllabusYear: 2026,
        program: 'SSC',
      },
      streakDays: 3,

      completedTopics: [],
      lastVisitedTopic: null,
      topicMastery: {},
      savedMistakes: [],
      examHistory: [],
      bookmarks: [],
      lessonNotes: {},
      reportedIssues: [],
      studyDates: [],

      setGuestId: (id) => set({ guestId: id }),
      setToken: (token) => {
        if (typeof window !== 'undefined') {
          if (token) {
            localStorage.setItem('pori_auth_token', token);
          } else {
            localStorage.removeItem('pori_auth_token');
          }
        }
        set({ token });
      },
      setUser: (user) => set({ user }),
      setActiveSubject: (subject) => set({ activeSubject: subject }),
      setStreakDays: (streakDays) => set({ streakDays }),
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('pori_auth_token');
        }
        set({ token: null, user: null });
      },

      recordLessonVisit: (topicId, topicTitle, chapterId, chapterTitle) =>
        set((state) => ({
          lastVisitedTopic: {
            topicId,
            topicTitle,
            chapterId,
            chapterTitle,
            visitedAt: new Date().toISOString(),
          },
          studyDates: addStudyDate(state.studyDates),
        })),

      markTopicCompleted: (topicId, topicTitle, chapterId, chapterTitle) =>
        set((state) => {
          const completedTopics = state.completedTopics.includes(topicId)
            ? state.completedTopics
            : [...state.completedTopics, topicId];
          const lastVisitedTopic =
            topicTitle && chapterId && chapterTitle
              ? {
                  topicId,
                  topicTitle,
                  chapterId,
                  chapterTitle,
                  visitedAt: new Date().toISOString(),
                }
              : state.lastVisitedTopic;
          return {
            completedTopics,
            lastVisitedTopic,
            studyDates: addStudyDate(state.studyDates),
          };
        }),

      recordPracticeAttempt: (payload) =>
        set((state) => {
          const now = new Date().toISOString();
          const prevStats = state.topicMastery[payload.topicId] || {
            attempted: 0,
            correct: 0,
            lastPracticedAt: now,
          };
          const updatedTopicMastery: Record<string, TopicMasteryStats> = {
            ...state.topicMastery,
            [payload.topicId]: {
              attempted: prevStats.attempted + 1,
              correct: prevStats.correct + (payload.isCorrect ? 1 : 0),
              lastPracticedAt: now,
            },
          };

          let updatedMistakes = [...state.savedMistakes];
          const existingIdx = updatedMistakes.findIndex((m) => m.questionId === payload.questionId);

          if (!payload.isCorrect) {
            if (existingIdx >= 0) {
              const current = updatedMistakes[existingIdx];
              updatedMistakes[existingIdx] = {
                ...current,
                selectedKey: payload.selectedKey,
                correctKey: payload.correctKey,
                explanationBangla: payload.explanationBangla || current.explanationBangla,
                wrongCount: (current.wrongCount || 1) + 1,
                resolved: false,
                lastWrongAt: now,
              };
            } else {
              updatedMistakes = [
                {
                  questionId: payload.questionId,
                  stemBangla: payload.stemBangla,
                  topicId: payload.topicId,
                  topicTitle: payload.topicTitle,
                  chapterId: payload.chapterId,
                  chapterTitle: payload.chapterTitle,
                  selectedKey: payload.selectedKey,
                  correctKey: payload.correctKey,
                  explanationBangla: payload.explanationBangla,
                  wrongCount: 1,
                  resolved: false,
                  lastWrongAt: now,
                },
                ...updatedMistakes,
              ];
            }
          } else if (existingIdx >= 0) {
            updatedMistakes[existingIdx] = {
              ...updatedMistakes[existingIdx],
              resolved: true,
            };
          }

          return {
            topicMastery: updatedTopicMastery,
            savedMistakes: updatedMistakes,
            lastVisitedTopic: {
              topicId: payload.topicId,
              topicTitle: payload.topicTitle,
              chapterId: payload.chapterId,
              chapterTitle: payload.chapterTitle,
              visitedAt: now,
            },
            studyDates: addStudyDate(state.studyDates),
          };
        }),

      recordExamCompletion: (entry) =>
        set((state) => {
          const filtered = state.examHistory.filter((e) => e.examSessionId !== entry.examSessionId);
          return {
            examHistory: [entry, ...filtered].slice(0, 20),
            studyDates: addStudyDate(state.studyDates),
          };
        }),

      resolveMistake: (questionId) =>
        set((state) => ({
          savedMistakes: state.savedMistakes.map((m) =>
            m.questionId === questionId ? { ...m, resolved: true } : m
          ),
        })),

      toggleBookmark: (item) => {
        set((state) => {
          const exists = state.bookmarks.some((b) => b.id === item.id && b.type === item.type);
          const bookmarks = exists
            ? state.bookmarks.filter((b) => !(b.id === item.id && b.type === item.type))
            : [{ ...item, createdAt: new Date().toISOString() }, ...state.bookmarks];
          return { bookmarks };
        });

        if (get().token) {
          import('@/lib/api-client')
            .then(({ apiClient }) =>
              Promise.resolve(
                apiClient.post('/student/bookmarks/toggle', {
                  itemId: item.id,
                  itemType: item.type,
                  titleBangla: item.titleBangla,
                  subtitleBangla: item.subtitleBangla,
                  href: item.href,
                }),
              ).catch(() => {}),
            )
            .catch(() => {});
        }
      },

      saveLessonNote: (topicId, note) => {
        set((state) => ({
          lessonNotes: {
            ...state.lessonNotes,
            [topicId]: note,
          },
        }));

        if (get().token) {
          import('@/lib/api-client')
            .then(({ apiClient }) =>
              Promise.resolve(
                apiClient.post('/student/notes', {
                  topicId,
                  content: note,
                }),
              ).catch(() => {}),
            )
            .catch(() => {});
        }
      },

      addReportedIssue: (issue) =>
        set((state) => {
          const filtered = state.reportedIssues.filter((r) => r.id !== issue.id);
          return {
            reportedIssues: [issue, ...filtered].slice(0, 30),
          };
        }),

      hydrateFromServerOverview: (overview) =>
        set((state) => {
          if (!overview) return state;

          const mergedCompleted = new Set(state.completedTopics);
          if (Array.isArray(overview.completedTopicIds)) {
            for (const tId of overview.completedTopicIds) {
              mergedCompleted.add(tId);
            }
          }

          const mergedMastery: Record<string, TopicMasteryStats> = { ...state.topicMastery };

          if (overview.practiceStats?.topicMastery) {
            for (const [topicId, stats] of Object.entries(overview.practiceStats.topicMastery)) {
              if (stats.attempts > 0) {
                const local = mergedMastery[topicId];
                if (!local || stats.attempts >= local.attempted) {
                  mergedMastery[topicId] = {
                    attempted: stats.attempts,
                    correct: stats.correct,
                    lastPracticedAt: local?.lastPracticedAt || new Date().toISOString(),
                  };
                }
              }
            }
          }

          if (overview.topicStats) {
            for (const [topicId, stats] of Object.entries(overview.topicStats)) {
              if (stats.completedLesson) {
                mergedCompleted.add(topicId);
              }
              if (stats.attempted > 0) {
                const local = mergedMastery[topicId];
                if (!local || stats.attempted >= local.attempted) {
                  mergedMastery[topicId] = {
                    attempted: stats.attempted,
                    correct: stats.correct,
                    lastPracticedAt: local?.lastPracticedAt || new Date().toISOString(),
                  };
                }
              }
            }
          }

          const mergedMistakes = [...state.savedMistakes];
          if (Array.isArray(overview.dueMistakes)) {
            for (const dm of overview.dueMistakes) {
              const idx = mergedMistakes.findIndex((m) => m.questionId === dm.questionId);
              if (idx === -1) {
                mergedMistakes.push({
                  questionId: dm.questionId,
                  stemBangla: dm.stem,
                  topicId: dm.topicId,
                  topicTitle: dm.topicTitle,
                  chapterId: dm.chapterId,
                  chapterTitle: dm.chapterTitle,
                  selectedKey: 'পূর্বে ভুল উত্তর',
                  correctKey: dm.correctOptionText,
                  explanationBangla: dm.conceptNote,
                  wrongCount: dm.attemptCount || 1,
                  resolved: false,
                  lastWrongAt: dm.updatedAt || new Date().toISOString(),
                });
              }
            }
          }
          if (Array.isArray(overview.unresolvedMistakes)) {
            for (const srvMistake of overview.unresolvedMistakes) {
              const idx = mergedMistakes.findIndex((m) => m.questionId === srvMistake.questionId);
              if (idx === -1) {
                mergedMistakes.push({
                  ...srvMistake,
                  resolved: false,
                });
              }
            }
          }

          const mergedExams = [...state.examHistory];
          if (Array.isArray(overview.recentExams)) {
            for (const srvExam of overview.recentExams) {
              const sessionId = srvExam.examSessionId || srvExam.sessionId || '';
              if (sessionId && !mergedExams.some((e) => e.examSessionId === sessionId)) {
                const totalQ = srvExam.totalQuestions || 1;
                const score = srvExam.score ?? 0;
                mergedExams.push({
                  examSessionId: sessionId,
                  chapterId: srvExam.chapterId || 'chap_ssc_physics_ch1',
                  chapterTitle: srvExam.chapterTitle || 'অধ্যায় মডেল টেস্ট',
                  score,
                  totalQuestions: srvExam.totalQuestions ?? 0,
                  accuracyPercent:
                    typeof srvExam.accuracyPercent === 'number'
                      ? srvExam.accuracyPercent
                      : Math.round((score / totalQ) * 100),
                  submittedAt:
                    srvExam.submittedAt || srvExam.completedAt || new Date().toISOString(),
                });
              }
            }
          }

          const mergedStudyDates = Array.from(
            new Set([
              ...state.studyDates,
              ...(overview.studyDates || []),
              ...(overview.activityDays || []),
            ])
          )
            .sort()
            .slice(-30);

          const serverLastTopic = overview.lastStudiedTopic || overview.lastActivity;
          const lastVisitedTopic =
            state.lastVisitedTopic ||
            (serverLastTopic
              ? {
                  topicId: serverLastTopic.topicId,
                  topicTitle: serverLastTopic.topicTitle,
                  chapterId: serverLastTopic.chapterId,
                  chapterTitle: serverLastTopic.chapterTitle,
                  visitedAt: serverLastTopic.timestamp,
                }
              : null);

          const mergedBookmarks = [...state.bookmarks];
          if (Array.isArray(overview.bookmarks)) {
            for (const srvBm of overview.bookmarks) {
              if (!mergedBookmarks.some((b) => b.id === srvBm.id && b.type === srvBm.type)) {
                mergedBookmarks.push({
                  id: srvBm.id,
                  type: srvBm.type,
                  titleBangla: srvBm.titleBangla,
                  subtitleBangla: srvBm.subtitleBangla ?? undefined,
                  href: srvBm.href,
                  createdAt: srvBm.createdAt || new Date().toISOString(),
                });
              }
            }
          }

          const mergedLessonNotes: Record<string, string> = {
            ...(overview.lessonNotes || {}),
            ...state.lessonNotes,
          };

          return {
            completedTopics: Array.from(mergedCompleted),
            topicMastery: mergedMastery,
            savedMistakes: mergedMistakes,
            examHistory: mergedExams.slice(0, 20),
            bookmarks: mergedBookmarks,
            lessonNotes: mergedLessonNotes,
            studyDates: mergedStudyDates,
            lastVisitedTopic,
            streakDays:
              typeof overview.streakDays === 'number' && overview.streakDays > 0
                ? Math.max(state.streakDays, overview.streakDays)
                : state.streakDays,
          };
        }),
    }),
    {
      name: 'pori-user-storage',
      partialize: (state) => ({
        guestId: state.guestId,
        token: state.token,
        user: state.user,
        activeSubject: state.activeSubject,
        streakDays: state.streakDays,
        completedTopics: state.completedTopics,
        lastVisitedTopic: state.lastVisitedTopic,
        topicMastery: state.topicMastery,
        savedMistakes: state.savedMistakes,
        examHistory: state.examHistory,
        bookmarks: state.bookmarks,
        lessonNotes: state.lessonNotes,
        reportedIssues: state.reportedIssues,
        studyDates: state.studyDates,
      }),
    }
  )
);
