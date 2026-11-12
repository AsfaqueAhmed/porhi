'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  Save,
  Play,
  SlidersHorizontal,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { apiClient } from '@/lib/api-client';
import { ensureGuestSession } from '@/lib/guest-session';
import { useUserStore } from '@/store/user-store';
import { QuestionDTO, QuestionType, ContentStatus } from '@pori/shared';
import { toBanglaDigits } from '@/lib/formatters';
import { useLanguageStore } from '@/store/language-store';
import { DEFAULT_CHAPTERS, findTopicHierarchy } from '@/lib/curriculum-data';
import { ExamPageSkeleton } from '@/components/ui/shimmer';
import {
  getOfflinePackQuestions,
  getOfflineSubjectQuestions,
  enqueueExamSubmission,
} from '@/lib/offline-store';
import {
  ExamResultView,
  ExamResultData,
  ExamResultAnswerItem,
} from '@/components/student/exam-result-view';

type ExamTestType = 'CHAPTER_TEST' | 'TOPIC_TEST' | 'WEAK_AREA' | 'SUBJECT_TEST';
type ExamPhase = 'SETUP' | 'ACTIVE' | 'EXPIRED' | 'RESULT';

export interface ExamRunnerClientProps {
  mode?: 'chapter' | 'subject';
  subjectId?: string;
  chapterId?: string;
}

interface SavedExamState {
  sessionId: string;
  testType: ExamTestType;
  chapterId: string;
  durationSeconds: number;
  negativeRatio: number;
  startedAtIso: string;
  questions: QuestionDTO[];
  answers: Record<string, string>;
  flagged: Record<string, boolean>;
  questionTimes: Record<string, number>;
  currentIndex: number;
}

interface SessionStatusResponse {
  sessionId: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  testType?: ExamTestType;
  subjectId?: string;
  chapterId?: string;
  totalQuestions?: number;
  durationSeconds?: number;
  negativeRatio?: number;
  negativeDeduction?: number;
  percentile?: number | null;
  startedAt?: string;
  score?: number;
  correctCount?: number;
  wrongCount?: number;
  skippedCount?: number;
  answers?: Record<string, string>;
  questions?: QuestionDTO[];
  answersWithExplanation?: ExamResultAnswerItem[];
}

interface SubmitExamResponse {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  durationSeconds?: number;
  negativeRatio?: number;
  negativeDeduction?: number;
  percentile?: number | null;
  answersWithExplanation?: ExamResultAnswerItem[];
}

const FALLBACK_EXAM_QUESTIONS: QuestionDTO[] = [
  {
    id: 'exam-q-1',
    topicId: 'top_ssc_physics_ch2_3',
    type: QuestionType.MCQ,
    stem: 'নিচের কোনটি স্কেলার রাশি?',
    options: [
      { id: 'opt-1a', text: 'ত্বরণ', isCorrect: false },
      { id: 'opt-1b', text: 'বেগ', isCorrect: false },
      { id: 'opt-1c', text: 'দূরত্ব', isCorrect: true },
      { id: 'opt-1d', text: 'বল', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর (গ) দূরত্ব।',
      coreConcept:
        'যেসব ভৌত রাশি প্রকাশের জন্য শুধু মানের প্রয়োজন হয় কিন্তু দিকের প্রয়োজন হয় না, তাদের স্কেলার রাশি বলে।',
    },
    difficulty: 'EASY',
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'exam-q-2',
    topicId: 'top_ssc_physics_ch2_7',
    type: QuestionType.MCQ,
    stem: 'একটি গাড়ি স্থির অবস্থান থেকে $3\\text{ ms}^{-2}$ সুষম ত্বরণে চললে $5\\text{ s}$ পর এর বেগ কত হবে?',
    options: [
      { id: 'opt-2a', text: '$8\\text{ ms}^{-1}$', isCorrect: false },
      { id: 'opt-2b', text: '$15\\text{ ms}^{-1}$', isCorrect: true },
      { id: 'opt-2c', text: '$20\\text{ ms}^{-1}$', isCorrect: false },
      { id: 'opt-2d', text: '$45\\text{ ms}^{-1}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর (খ) $15\\text{ ms}^{-1}$।',
      coreConcept:
        'গতির ১ম সমীকরণ: $v = u + at$। এখানে $u = 0, a = 3, t = 5$। সুতরাং $v = 15\\text{ ms}^{-1}$।',
    },
    difficulty: 'EASY',
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'exam-q-3',
    topicId: 'top_ssc_physics_ch2_8',
    type: QuestionType.MCQ,
    stem: 'মুক্তভাবে পড়ন্ত বস্তু $1\\text{ s}$, $2\\text{ s}$, $3\\text{ s}$ এ যে দূরত্ব অতিক্রম করে তার অনুপাত কত?',
    options: [
      { id: 'opt-3a', text: '$1 : 2 : 3$', isCorrect: false },
      { id: 'opt-3b', text: '$1 : 3 : 5$', isCorrect: false },
      { id: 'opt-3c', text: '$1 : 4 : 9$', isCorrect: true },
      { id: 'opt-3d', text: '$1 : 8 : 27$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর (গ) $1 : 4 : 9$।',
      coreConcept: 'গ্যালিলিওর পড়ন্ত বস্তুর ৩য় সূত্র অনুসারে $h \\propto t^2$।',
    },
    difficulty: 'MEDIUM',
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];

export function ExamRunnerClient({
  mode = 'chapter',
  subjectId: propSubjectId,
  chapterId: propChapterId,
}: ExamRunnerClientProps = {}) {
  const params = useParams();
  const searchParams = useSearchParams();
  const isSubjectMode = mode === 'subject';
  const effectiveSubjectId =
    propSubjectId ||
    (params?.subjectId as string) ||
    '';
  const chapterId = isSubjectMode
    ? `subject_${effectiveSubjectId || 'sub_ssc_physics'}`
    : propChapterId || (params?.chapterId as string) || 'chap_ssc_physics_ch2';
  const queryTopicId = searchParams?.get('topicId') || '';
  const storageKey = isSubjectMode
    ? `pori_active_exam_subject_${effectiveSubjectId || 'sub_ssc_physics'}`
    : `pori_active_exam_${chapterId}`;

  const { activeSubject, recordExamCompletion, recordPracticeAttempt } = useUserStore();
  const { tr, language } = useLanguageStore();

  const subjectIdToSend = effectiveSubjectId || activeSubject?.id || 'sub_ssc_physics';
  const resolvedChapter = DEFAULT_CHAPTERS.find((c) => c.id === chapterId);
  const chapterTitle = isSubjectMode
    ? activeSubject?.id === subjectIdToSend && activeSubject?.nameBangla
      ? `${activeSubject.nameBangla} — পূর্ণ বিষয় মডেল টেস্ট`
      : tr('পূর্ণ বিষয় মডেল টেস্ট (Subject Model Test)', 'Full Subject Model Test')
    : resolvedChapter?.titleBangla || 'মডেল টেস্ট (Model Test)';
  const chapterTopics = resolvedChapter?.topics || [];

  // Setup state
  const [phase, setPhase] = useState<ExamPhase>('SETUP');
  const [testType, setTestType] = useState<ExamTestType>(
    isSubjectMode ? 'SUBJECT_TEST' : queryTopicId ? 'TOPIC_TEST' : 'CHAPTER_TEST'
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    queryTopicId || chapterTopics[0]?.id || ''
  );
  const [questionLimit, setQuestionLimit] = useState<number | undefined>(
    isSubjectMode ? 25 : 10
  );
  const [negativeRatio, setNegativeRatio] = useState<number>(0.25);
  const [durationSeconds, setDurationSeconds] = useState<number>(
    isSubjectMode ? 25 * 60 : 10 * 60
  );
  const [isStarting, setIsStarting] = useState(false);

  // Active & Resume state
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const [isCheckingResume, setIsCheckingResume] = useState(false);
  const [wasResumed, setWasResumed] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [startedAtIso, setStartedAtIso] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isSaving, setIsSaving] = useState(false);
  const [resultData, setResultData] = useState<ExamResultData | null>(null);

  const activeQuestionEnteredAtRef = useRef<number>(Date.now());
  const questionTimesRef = useRef<Record<string, number>>({});
  const isSubmittingRef = useRef<boolean>(false);

  const clearSavedExam = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignore storage errors
    }
  }, [storageKey]);

  // Attempt resume from localStorage + GET /exam/session/:sessionId on mount
  useEffect(() => {
    let active = true;
    let savedRaw: string | null = null;
    try {
      savedRaw = localStorage.getItem(storageKey);
    } catch {
      savedRaw = null;
    }
    if (!savedRaw) return;

    let saved: SavedExamState | null = null;
    try {
      saved = JSON.parse(savedRaw) as SavedExamState;
    } catch {
      clearSavedExam();
      return;
    }

    if (!saved?.sessionId) {
      clearSavedExam();
      return;
    }

    async function restoreSession(localState: SavedExamState) {
      setIsCheckingResume(true);
      try {
        if (!localState.sessionId.startsWith('local_sess_')) {
          const remote = await apiClient.get<SessionStatusResponse>(
            `/exam/session/${localState.sessionId}`
          );
          if (!active) return;

          if (remote?.status === 'COMPLETED') {
            clearSavedExam();
            setResultData({
              sessionId: remote.sessionId,
              chapterId: remote.chapterId || chapterId,
              chapterTitle,
              score: remote.score ?? 0,
              totalQuestions: remote.totalQuestions ?? remote.answersWithExplanation?.length ?? 0,
              correctCount: remote.correctCount ?? 0,
              wrongCount: remote.wrongCount ?? 0,
              skippedCount: remote.skippedCount ?? 0,
              durationSeconds: remote.durationSeconds,
              negativeRatio: remote.negativeRatio ?? localState.negativeRatio,
              negativeDeduction: remote.negativeDeduction ?? 0,
              percentile: remote.percentile ?? null,
              answersWithExplanation: remote.answersWithExplanation || [],
            });
            setPhase('RESULT');
            return;
          }

          const totalDur = remote.durationSeconds ?? localState.durationSeconds;
          const startIso = remote.startedAt || localState.startedAtIso;
          const elapsed = Math.max(0, Math.floor((Date.now() - new Date(startIso).getTime()) / 1000));
          const remaining = Math.max(0, totalDur - elapsed);
          const mergedAnswers = { ...(remote.answers || {}), ...(localState.answers || {}) };
          const restoredQs =
            remote.questions && remote.questions.length > 0 ? remote.questions : localState.questions;

          setSessionId(remote.sessionId);
          setTestType(remote.testType || localState.testType || 'CHAPTER_TEST');
          setDurationSeconds(totalDur);
          setNegativeRatio(remote.negativeRatio ?? localState.negativeRatio ?? 0.25);
          setStartedAtIso(startIso);
          setQuestions(restoredQs);
          setAnswers(mergedAnswers);
          setFlagged(localState.flagged || {});
          questionTimesRef.current = localState.questionTimes || {};
          setQuestionTimes(questionTimesRef.current);
          setCurrentIndex(Math.min(localState.currentIndex || 0, Math.max(0, restoredQs.length - 1)));
          activeQuestionEnteredAtRef.current = Date.now();
          setTimeLeft(remaining);
          setWasResumed(true);
          setPhase(remaining === 0 ? 'EXPIRED' : 'ACTIVE');
          return;
        }

        // Offline local session restore
        const elapsed = Math.max(
          0,
          Math.floor((Date.now() - new Date(localState.startedAtIso).getTime()) / 1000)
        );
        const remaining = Math.max(0, localState.durationSeconds - elapsed);
        setSessionId(localState.sessionId);
        setTestType(localState.testType || 'CHAPTER_TEST');
        setDurationSeconds(localState.durationSeconds);
        setNegativeRatio(localState.negativeRatio ?? 0.25);
        setStartedAtIso(localState.startedAtIso);
        setQuestions(localState.questions || FALLBACK_EXAM_QUESTIONS);
        setAnswers(localState.answers || {});
        setFlagged(localState.flagged || {});
        questionTimesRef.current = localState.questionTimes || {};
        setQuestionTimes(questionTimesRef.current);
        setCurrentIndex(localState.currentIndex || 0);
        activeQuestionEnteredAtRef.current = Date.now();
        setTimeLeft(remaining);
        setWasResumed(true);
        setPhase(remaining === 0 ? 'EXPIRED' : 'ACTIVE');
      } catch {
        if (active) {
          clearSavedExam();
          setPhase('SETUP');
        }
      } finally {
        if (active) setIsCheckingResume(false);
      }
    }

    restoreSession(saved);
    return () => {
      active = false;
    };
  }, [storageKey, chapterId, chapterTitle, clearSavedExam]);

  const flushActiveQuestionTime = useCallback(() => {
    const activeQ = questions[currentIndex];
    if (!activeQ) return questionTimesRef.current;
    const now = Date.now();
    const elapsedSec = Math.max(0, Math.round((now - activeQuestionEnteredAtRef.current) / 1000));
    activeQuestionEnteredAtRef.current = now;
    if (elapsedSec > 0) {
      const updated = {
        ...questionTimesRef.current,
        [activeQ.id]: (questionTimesRef.current[activeQ.id] || 0) + elapsedSec,
      };
      questionTimesRef.current = updated;
      setQuestionTimes(updated);
      return updated;
    }
    return questionTimesRef.current;
  }, [questions, currentIndex]);

  // Persist localStorage autosave while exam is active
  useEffect(() => {
    if (phase !== 'ACTIVE' || !sessionId || questions.length === 0) return;
    try {
      const payload: SavedExamState = {
        sessionId,
        testType,
        chapterId,
        durationSeconds,
        negativeRatio,
        startedAtIso,
        questions,
        answers,
        flagged,
        questionTimes,
        currentIndex,
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // Ignore quota errors
    }
  }, [
    phase,
    sessionId,
    testType,
    chapterId,
    durationSeconds,
    negativeRatio,
    startedAtIso,
    questions,
    answers,
    flagged,
    questionTimes,
    currentIndex,
    storageKey,
  ]);

  const handleSelectQuestionCount = (limit: number | undefined) => {
    setQuestionLimit(limit);
    const autoMinutes =
      limit !== undefined ? Math.min(90, limit) : isSubjectMode ? 60 : 30;
    setDurationSeconds(autoMinutes * 60);
  };

  const handleStartExam = async () => {
    setIsStarting(true);
    setWasResumed(false);
    isSubmittingRef.current = false;

    const resolveFallbackQuestions = async (): Promise<QuestionDTO[]> => {
      const cachedQs = isSubjectMode
        ? await getOfflineSubjectQuestions(subjectIdToSend, 'MCQ').catch(() => [])
        : await getOfflinePackQuestions(chapterId, {
            type: 'MCQ',
            topicId: testType === 'TOPIC_TEST' && selectedTopicId ? selectedTopicId : undefined,
          }).catch(() => []);
      const sourcePool = cachedQs.length > 0 ? cachedQs : FALLBACK_EXAM_QUESTIONS;
      return questionLimit !== undefined ? sourcePool.slice(0, questionLimit) : sourcePool;
    };

    const activateSession = (
      loadedQs: QuestionDTO[],
      nextSessionId?: string,
      effDuration: number = durationSeconds,
      effNegRatio: number = negativeRatio,
    ) => {
      setSessionId(nextSessionId || `local_sess_${Date.now()}`);
      setQuestions(loadedQs);
      setDurationSeconds(effDuration);
      setNegativeRatio(effNegRatio);
      setStartedAtIso(new Date().toISOString());
      setAnswers({});
      setFlagged({});
      questionTimesRef.current = {};
      setQuestionTimes({});
      setCurrentIndex(0);
      setTimeLeft(effDuration);
      activeQuestionEnteredAtRef.current = Date.now();
      setPhase('ACTIVE');
    };

    try {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        activateSession(await resolveFallbackQuestions());
        return;
      }
      await ensureGuestSession();
      const body: Record<string, unknown> = {
        testType: isSubjectMode ? 'SUBJECT_TEST' : testType,
        subjectId: subjectIdToSend,
        negativeRatio,
        durationSeconds,
      };
      if (!isSubjectMode) {
        body.chapterId = chapterId;
        if (testType === 'TOPIC_TEST' && selectedTopicId) {
          body.topicId = selectedTopicId;
        }
      }
      if (questionLimit !== undefined) {
        body.questionLimit = questionLimit;
      }

      const res = await apiClient.post<{
        sessionId: string;
        totalQuestions?: number;
        durationSeconds?: number;
        negativeRatio?: number;
        questions?: QuestionDTO[];
      }>('/exam/start', body);

      const loadedQs =
        res?.questions && res.questions.length > 0
          ? res.questions
          : await resolveFallbackQuestions();
      activateSession(
        loadedQs,
        res?.sessionId,
        res?.durationSeconds ?? durationSeconds,
        res?.negativeRatio ?? negativeRatio,
      );
    } catch {
      activateSession(await resolveFallbackQuestions());
    } finally {
      setIsStarting(false);
    }
  };

  const handleSubmitExam = useCallback(async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const finalTimes = phase === 'ACTIVE' ? flushActiveQuestionTime() : questionTimesRef.current;

    const localAnswersWithExplanation: ExamResultAnswerItem[] = questions.map((q) => {
      const chosenId = answers[q.id] ?? null;
      const correctOpt = q.options?.find((o) => o.isCorrect);
      const isRight = Boolean(chosenId && chosenId === correctOpt?.id);
      return {
        questionId: q.id,
        topicId: q.topicId,
        stem: q.stem,
        options: q.options?.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
        selectedOptionId: chosenId,
        correctOptionId: correctOpt?.id || '',
        isCorrect: isRight,
        explanation: q.explanation || null,
        timeSpent: finalTimes[q.id] || 0,
      };
    });

    const localCorrect = localAnswersWithExplanation.filter((a) => a.isCorrect).length;
    const localWrong = localAnswersWithExplanation.filter(
      (a) => Boolean(a.selectedOptionId) && !a.isCorrect
    ).length;
    const localSkipped = questions.length - localCorrect - localWrong;
    const localDeduction = Number((localWrong * negativeRatio).toFixed(2));
    const localNetScore = Math.max(0, Number((localCorrect - localDeduction).toFixed(2)));

    let finalResult: ExamResultData = {
      sessionId: sessionId || undefined,
      chapterId,
      chapterTitle,
      score: localNetScore,
      totalQuestions: questions.length,
      correctCount: localCorrect,
      wrongCount: localWrong,
      skippedCount: localSkipped,
      durationSeconds,
      negativeRatio,
      negativeDeduction: localDeduction,
      answersWithExplanation: localAnswersWithExplanation,
    };

    const queueOfflineExam = async () => {
      await enqueueExamSubmission({
        offlineSessionId: sessionId || `local_sess_${Date.now()}`,
        subjectId: subjectIdToSend,
        chapterId: isSubjectMode ? null : chapterId,
        testType: isSubjectMode ? 'SUBJECT_TEST' : testType,
        durationSeconds,
        answers: questions.map((q) => ({
          questionId: q.id,
          selectedOptionId: answers[q.id] ?? null,
        })),
        submittedAt: new Date().toISOString(),
      }).catch(() => {});
    };

    if (
      sessionId &&
      !sessionId.startsWith('local_sess_') &&
      (typeof navigator === 'undefined' || navigator.onLine)
    ) {
      try {
        const formattedAnswers = questions.map((q) => ({
          questionId: q.id,
          selectedOptionId: answers[q.id] ?? null,
          timeSpent: finalTimes[q.id] || 0,
        }));
        const res = await apiClient.post<SubmitExamResponse>(`/exam/submit/${sessionId}`, {
          answers: formattedAnswers,
        });
        if (res && typeof res.score === 'number') {
          finalResult = {
            sessionId,
            chapterId,
            chapterTitle,
            score: res.score,
            totalQuestions: res.totalQuestions ?? questions.length,
            correctCount: res.correctCount ?? localCorrect,
            wrongCount: res.wrongCount ?? localWrong,
            skippedCount: res.skippedCount ?? localSkipped,
            durationSeconds: res.durationSeconds ?? durationSeconds,
            negativeRatio: res.negativeRatio ?? negativeRatio,
            negativeDeduction: res.negativeDeduction ?? localDeduction,
            percentile: res.percentile ?? null,
            answersWithExplanation:
              res.answersWithExplanation && res.answersWithExplanation.length > 0
                ? res.answersWithExplanation
                : localAnswersWithExplanation,
          };
        }
      } catch {
        // Offline / fallback result already computed above; enqueue replay for later sync
        await queueOfflineExam();
      }
    } else {
      await queueOfflineExam();
    }

    const totalForPct = finalResult.totalQuestions || 1;
    const accuracyPercent = Math.max(0, Math.round((finalResult.score / totalForPct) * 100));

    recordExamCompletion({
      examSessionId: sessionId || `local_sess_${Date.now()}`,
      chapterId,
      chapterTitle,
      score: finalResult.score,
      totalQuestions: finalResult.totalQuestions,
      accuracyPercent,
      submittedAt: new Date().toISOString(),
    });

    finalResult.answersWithExplanation.forEach((ans) => {
      if (!ans.selectedOptionId) return;
      const chosenOpt = ans.options?.find((o) => o.id === ans.selectedOptionId);
      const correctOpt = ans.options?.find((o) => o.isCorrect || o.id === ans.correctOptionId);
      const h = findTopicHierarchy(ans.topicId || chapterId);
      recordPracticeAttempt({
        questionId: ans.questionId,
        stemBangla: ans.stem,
        topicId: ans.topicId || h.topicId,
        topicTitle: h.topicTitle,
        chapterId,
        chapterTitle,
        selectedKey: chosenOpt?.text || ans.selectedOptionId,
        correctKey: correctOpt?.text || ans.correctOptionId || '',
        explanationBangla: ans.explanation?.directAnswer || ans.explanation?.coreConcept,
        isCorrect: ans.isCorrect,
      });
    });

    clearSavedExam();
    setResultData(finalResult);
    setPhase('RESULT');
  }, [
    phase,
    flushActiveQuestionTime,
    questions,
    answers,
    negativeRatio,
    sessionId,
    chapterId,
    chapterTitle,
    durationSeconds,
    recordExamCompletion,
    recordPracticeAttempt,
    clearSavedExam,
  ]);

  // Countdown Timer when ACTIVE
  useEffect(() => {
    if (phase !== 'ACTIVE' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  // Auto-submit on timer expiration while active
  useEffect(() => {
    if (phase === 'ACTIVE' && timeLeft === 0) {
      handleSubmitExam();
    }
  }, [phase, timeLeft, handleSubmitExam]);

  // Heartbeat every 10 seconds while active
  useEffect(() => {
    if (phase !== 'ACTIVE' || !sessionId || sessionId.startsWith('local_sess_')) return;

    const heartbeat = setInterval(async () => {
      setIsSaving(true);
      try {
        const times = flushActiveQuestionTime();
        const formattedAnswers = questions.map((q) => ({
          questionId: q.id,
          selectedOptionId: answers[q.id] ?? null,
          timeSpent: times[q.id] || 0,
        }));
        await Promise.resolve(
          apiClient.put(`/exam/heartbeat/${sessionId}`, { answers: formattedAnswers })
        ).catch(() => {});
      } finally {
        setIsSaving(false);
      }
    }, 10000);

    return () => clearInterval(heartbeat);
  }, [phase, sessionId, questions, answers, flushActiveQuestionTime]);

  const goToQuestion = useCallback(
    (nextIdx: number) => {
      flushActiveQuestionTime();
      setCurrentIndex(nextIdx);
    },
    [flushActiveQuestionTime]
  );

  const handleSelectOption = (qId: string, optId: string) => {
    if (phase !== 'ACTIVE') return;
    flushActiveQuestionTime();
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const toggleFlag = (qId: string) => {
    setFlagged((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const currentQ = questions[currentIndex] || questions[0];

  // Keyboard shortcuts during ACTIVE exam
  useEffect(() => {
    if (phase !== 'ACTIVE' || !currentQ) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const tagName = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = Number(e.key) - 1;
        const opt = currentQ.options?.[idx];
        if (opt) handleSelectOption(currentQ.id, opt.id);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFlag(currentQ.id);
      } else if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        goToQuestion(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        goToQuestion(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentQ, currentIndex, questions.length, goToQuestion]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const minsStr = mins.toString().padStart(2, '0');
    const secsStr = secs.toString().padStart(2, '0');
    return language === 'bn'
      ? `${toBanglaDigits(minsStr)}:${toBanglaDigits(secsStr)}`
      : `${minsStr}:${secsStr}`;
  };

  const handleRetake = () => {
    clearSavedExam();
    isSubmittingRef.current = false;
    setResultData(null);
    setSessionId(null);
    setAnswers({});
    setFlagged({});
    questionTimesRef.current = {};
    setQuestionTimes({});
    setCurrentIndex(0);
    setPhase('SETUP');
  };

  if (isCheckingResume) {
    return <ExamPageSkeleton />;
  }

  // SETUP SCREEN
  if (phase === 'SETUP') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{chapterTitle}</span>
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {isSubjectMode
                ? tr('পূর্ণ বিষয় মডেল টেস্ট সেটআপ', 'Full Subject Model Test Setup')
                : tr('মডেল টেস্ট সেটআপ', 'Model Test Setup')}
            </h1>
            <p className="text-xs text-slate-500">
              {tr(
                'তোমার পছন্দ অনুযায়ী পরীক্ষার ধরন, প্রশ্নের সংখ্যা ও নেগেটিভ মার্কিং নির্বাচন করো।',
                'Customize exam mode, question count, negative marking, and duration before starting.'
              )}
            </p>
          </div>

          {/* 1. Test Type */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">
              {tr('১. পরীক্ষার ধরন', '1. Exam Mode')}
            </label>
            {isSubjectMode ? (
              <div className="p-3.5 rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-950">
                <div className="text-sm font-bold">
                  {tr('সম্পূর্ণ বিষয় (সব অধ্যায়)', 'Full Subject (All Chapters)')}
                </div>
                <div className="text-[11px] text-indigo-700 mt-0.5">
                  {tr(
                    'সিলেবাসের সব অধ্যায় থেকে বাছাইকৃত প্রশ্ন নিয়ে পূর্ণাঙ্গ পরীক্ষা',
                    'Comprehensive model test drawing questions across every chapter'
                  )}
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(
                [
                  {
                    key: 'CHAPTER_TEST',
                    bn: 'সম্পূর্ণ অধ্যায়',
                    en: 'Full Chapter',
                    descBn: 'অধ্যায়ের সব টপিক',
                  },
                  {
                    key: 'TOPIC_TEST',
                    bn: 'টপিকভিত্তিক টেস্ট',
                    en: 'Topic Test',
                    descBn: 'নির্দিষ্ট টপিক',
                  },
                  {
                    key: 'WEAK_AREA',
                    bn: 'দুর্বল টপিক ফোকাস',
                    en: 'Weak Area Focus',
                    descBn: 'ভুল ও দুর্বল টপিক',
                  },
                ] as const
              ).map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setTestType(m.key)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    testType === m.key
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm font-bold">{tr(m.bn, m.en)}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{m.descBn}</div>
                </button>
              ))}
            </div>
            )}

            {!isSubjectMode && testType === 'TOPIC_TEST' && chapterTopics.length > 0 && (
              <div className="pt-2">
                <select
                  aria-label={tr('টপিক নির্বাচন', 'Select Topic')}
                  value={selectedTopicId}
                  onChange={(e) => setSelectedTopicId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  {chapterTopics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.titleBangla}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* 2. Question Limit */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">
              {tr('২. প্রশ্নের সংখ্যা', '2. Question Count')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                isSubjectMode
                  ? ([
                      { value: 25, bn: '২৫টি', en: '25' },
                      { value: 50, bn: '৫০টি', en: '50' },
                      { value: 100, bn: '১০০টি', en: '100' },
                      { value: undefined, bn: 'সব প্রশ্ন', en: 'All' },
                    ] as const)
                  : ([
                      { value: 10, bn: '১০টি', en: '10' },
                      { value: 20, bn: '২০টি', en: '20' },
                      { value: 30, bn: '৩০টি', en: '30' },
                      { value: undefined, bn: 'সব প্রশ্ন', en: 'All' },
                    ] as const)
              ).map((opt) => {
                const active = questionLimit === opt.value;
                return (
                  <button
                    key={String(opt.value ?? 'all')}
                    type="button"
                    onClick={() => handleSelectQuestionCount(opt.value)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {tr(opt.bn, opt.en)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Negative Marking */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">
              {tr('৩. নেগেটিভ মার্কিং', '3. Negative Marking')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setNegativeRatio(0.25)}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                  negativeRatio === 0.25
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tr('সক্রিয় (−০.২৫ প্রতি ভুলে)', 'Enabled (−0.25 per wrong)')}
              </button>
              <button
                type="button"
                onClick={() => setNegativeRatio(0)}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                  negativeRatio === 0
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tr('নেগেটিভ মার্কিং নেই (০)', 'No Negative Marking (0)')}
              </button>
            </div>
          </div>

          {/* 4. Duration */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">
              {tr('৪. পরীক্ষার সময়', '4. Duration')}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(isSubjectMode ? [25, 45, 60, 90] : [10, 15, 20, 30]).map((mins) => {
                const secs = mins * 60;
                const active = durationSeconds === secs;
                return (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDurationSeconds(secs)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {language === 'bn' ? `${toBanglaDigits(mins)} মি.` : `${mins} min`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/progress"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              {tr('← ফিরে যাও', '← Back')}
            </Link>
            <button
              type="button"
              onClick={handleStartExam}
              disabled={isStarting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold shadow-sm disabled:opacity-60 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isStarting ? tr('শুরু হচ্ছে...', 'Starting...') : tr('পরীক্ষা শুরু করো', 'Start Exam')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // EXPIRED RECOVERY PROMPT
  if (phase === 'EXPIRED') {
    const answeredSoFar = Object.keys(answers).length;
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-amber-200 shadow-sm p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900">
          {tr('পূর্ববর্তী পরীক্ষার সময় শেষ হয়েছে', 'Previous Exam Time Expired')}
        </h1>
        <p className="text-sm text-slate-600">
          {language === 'bn'
            ? `তুমি ইতিমধ্যে ${toBanglaDigits(answeredSoFar)}টি প্রশ্নের উত্তর সংরক্ষণ করেছিলে। এখনই ফলাফল জমা দিতে পারো অথবা নতুন পরীক্ষা শুরু করতে পারো।`
            : `You had ${answeredSoFar} saved answers. Submit them for grading now or start a fresh exam.`}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSubmitExam}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold cursor-pointer"
          >
            {tr('ফলাফল জমা দাও', 'Submit Saved Answers')}
          </button>
          <button
            type="button"
            onClick={handleRetake}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{tr('নতুন পরীক্ষা শুরু করো', 'Start New Exam')}</span>
          </button>
        </div>
      </div>
    );
  }

  // RESULT SHEET
  if (phase === 'RESULT' && resultData) {
    return <ExamResultView result={resultData} onRetake={handleRetake} />;
  }

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  // ACTIVE EXAM RUNNER
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {wasResumed && (
        <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between">
          <span>
            {tr(
              'তোমার পূর্ববর্তী অসমাপ্ত পরীক্ষাটি স্বয়ংক্রিয়ভাবে পুনরুদ্ধার করা হয়েছে।',
              'Your previous in-progress exam session has been restored.'
            )}
          </span>
        </div>
      )}

      {/* Top Bar with Timer & Autosave Status */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">
              {chapterTitle} • {tr('অবশিষ্ট সময়', 'Time Remaining')}
            </div>
            <div
              className={`text-lg font-black font-mono ${
                timeLeft < 180 ? 'text-rose-600 animate-pulse' : 'text-slate-900'
              }`}
            >
              {formatTimer(timeLeft)}
            </div>
          </div>
        </div>

        {/* Autosave Heartbeat Indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Save className={`w-3.5 h-3.5 ${isSaving ? 'text-indigo-600 animate-spin' : 'text-emerald-500'}`} />
          <span className="hidden sm:inline">{tr('অটোসেভ সক্রিয়', 'Autosave Active')}</span>
        </div>

        {/* Finish Exam Button */}
        <button
          type="button"
          onClick={handleSubmitExam}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
        >
          {tr('পরীক্ষা সাবমিট করো', 'Submit Exam')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Question Panel */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                {tr('প্রশ্ন ', 'Question ')}
                {language === 'bn' ? toBanglaDigits(currentIndex + 1) : currentIndex + 1} /{' '}
                {language === 'bn' ? toBanglaDigits(questions.length) : questions.length}
              </span>

              <button
                type="button"
                onClick={() => currentQ && toggleFlag(currentQ.id)}
                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                  currentQ && flagged[currentQ.id]
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {currentQ && flagged[currentQ.id]
                  ? tr('★ ফ্ল্যাগ করা হয়েছে', '★ Flagged')
                  : tr('☆ ফ্ল্যাগ করে রাখো', '☆ Flag for Review')}
              </button>
            </div>

            <div className="text-lg font-semibold text-slate-900 leading-relaxed">
              <LatexRenderer content={currentQ?.stem} />
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentQ?.options?.map((opt, idx) => {
                const isChosen = answers[currentQ.id] === opt.id;
                const letters = language === 'bn' ? ['ক', 'খ', 'গ', 'ঘ'] : ['A', 'B', 'C', 'D'];
                const letter = letters[idx] || String(idx + 1);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isChosen
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-2 ring-indigo-500/30'
                        : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isChosen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {letter}
                    </span>
                    <div className="text-sm">
                      <LatexRenderer content={opt.text} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => goToQuestion(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{tr('পূর্ববর্তী', 'Previous')}</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => goToQuestion(currentIndex + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow cursor-pointer"
              >
                <span>{tr('পরবর্তী প্রশ্ন', 'Next Question')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitExam}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow cursor-pointer"
              >
                <span>{tr('পরীক্ষা সমাপ্ত করো', 'Finish Exam')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4 h-fit md:sticky md:top-20">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>{tr('প্রশ্ন নেভিগেটর', 'Question Navigator')}</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {language === 'bn' ? toBanglaDigits(answeredCount) : answeredCount} /{' '}
              {language === 'bn' ? toBanglaDigits(questions.length) : questions.length}
            </span>
          </div>

          <div className="space-y-1">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${Math.min(100, Math.round((answeredCount / (questions.length || 1)) * 100))}%`,
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 max-h-[340px] overflow-y-auto p-1.5 select-none">
            {questions.map((q, idx) => {
              const isAnswered = Boolean(answers[q.id]);
              const isFlag = Boolean(flagged[q.id]);
              const isCurrent = idx === currentIndex;

              let btnStyle = '';
              if (isAnswered) {
                btnStyle = isCurrent
                  ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-500 ring-offset-2 font-black shadow-sm'
                  : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 font-bold shadow-xs';
              } else if (isCurrent) {
                btnStyle =
                  'bg-indigo-50 text-indigo-700 border-indigo-500 ring-2 ring-indigo-500 ring-offset-1 font-black shadow-xs';
              } else if (isFlag) {
                btnStyle =
                  'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 font-bold';
              } else {
                btnStyle =
                  'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 font-medium';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goToQuestion(idx)}
                  className={`relative aspect-square rounded-xl border text-xs flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                  title={`${tr('প্রশ্ন', 'Question')} ${idx + 1}`}
                >
                  <span>{language === 'bn' ? toBanglaDigits(idx + 1) : idx + 1}</span>
                  {isFlag && (
                    <span
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white shadow-xs"
                      title={tr('পর্যালোচনার জন্য ফ্ল্যাগড', 'Flagged for Review')}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-3 text-xs text-slate-600 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-600 shrink-0" />
                <span className="truncate">
                  {tr('উত্তর সম্পন্ন', 'Answered')} (
                  {language === 'bn' ? toBanglaDigits(answeredCount) : answeredCount})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 shrink-0" />
                <span className="truncate">
                  {tr('বাকি প্রশ্ন', 'Remaining')} (
                  {language === 'bn'
                    ? toBanglaDigits(questions.length - answeredCount)
                    : questions.length - answeredCount}
                  )
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="relative w-3 h-3 rounded bg-amber-50 border border-amber-300 shrink-0 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </span>
              <span>
                {tr('পর্যালোচনার জন্য ফ্ল্যাগড', 'Flagged for Review')} (
                {language === 'bn' ? toBanglaDigits(flaggedCount) : flaggedCount})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
