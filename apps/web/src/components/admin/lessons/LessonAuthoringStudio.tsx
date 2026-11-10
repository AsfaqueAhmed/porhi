'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle } from 'lucide-react';
import type { AdminLessonItem } from '@pori/shared';
import { apiClient } from '@/lib/api-client';
import { useAdminAuthStore } from '@/store/admin-auth-store';
import { TopicHierarchySelector } from '../authoring/TopicHierarchySelector';
import { EditorialStatusBanners } from '../authoring/EditorialStatusBanners';
import { LessonAuthoringForm } from '../authoring/LessonAuthoringForm';
import {
  ChapterOption,
  DEFAULT_CHAPTERS_MAP,
  DEFAULT_SUBJECTS,
  LessonFormState,
  SAMPLE_LESSON_TEMPLATE,
  SubjectOption,
  buildLessonEditEditorialFields,
  buildLessonEditPayload,
  buildLessonPayload,
  createInitialLessonFormState,
  ensureChapterTopicInList,
  ensureSubjectInList,
  formatAuthoringApiError,
  formatHierarchyFetchError,
} from '../authoring/authoring-helpers';

export interface LessonAuthoringStudioProps {
  mode?: 'create' | 'edit';
  initialLesson?: AdminLessonItem;
  onLessonCreated?: (created: AdminLessonItem) => void;
  onLessonUpdated?: (updated: AdminLessonItem) => void;
  initialTopicId?: string;
  initialSubjectId?: string;
}

export function LessonAuthoringStudio({
  mode = 'create',
  initialLesson,
  onLessonCreated,
  onLessonUpdated,
  initialTopicId,
  initialSubjectId,
}: LessonAuthoringStudioProps) {
  const isEditMode = mode === 'edit' && Boolean(initialLesson);
  const isArchived = isEditMode && initialLesson?.status === 'ARCHIVED';
  const adminRole = useAdminAuthStore((s) => s.adminUser?.role);

  const initialDefaultChapters =
    !isEditMode
      ? DEFAULT_CHAPTERS_MAP[initialSubjectId || 'sub_ssc_physics'] || []
      : [];
  const initialDefaultChapter =
    initialDefaultChapters.find((c) => (c.topics || []).length > 0) ||
    initialDefaultChapters[0];

  const [subjects, setSubjects] = useState<SubjectOption[]>(() =>
    ensureSubjectInList(DEFAULT_SUBJECTS, initialLesson?.topic?.chapter?.subject),
  );
  const [activeSubjectId, setActiveSubjectId] = useState<string>(() => {
    if (isEditMode && initialLesson?.topic?.chapter?.subject?.id) {
      return initialLesson.topic.chapter.subject.id;
    }
    return initialSubjectId || 'sub_ssc_physics';
  });
  const [chapters, setChapters] = useState<ChapterOption[]>(() => {
    if (isEditMode && initialLesson?.topic?.chapter) {
      return ensureChapterTopicInList([], initialLesson.topic);
    }
    return initialDefaultChapters;
  });
  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    if (isEditMode && initialLesson?.topic?.chapter?.id) {
      return initialLesson.topic.chapter.id;
    }
    return initialDefaultChapter?.id || '';
  });
  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    if (isEditMode && initialLesson?.topicId) {
      return initialLesson.topicId;
    }
    if (initialTopicId) {
      return initialTopicId;
    }
    return initialDefaultChapter?.topics?.[0]?.id || '';
  });

  const preferredTopicRef = useRef<string | undefined>(
    isEditMode ? initialLesson?.topicId : initialTopicId,
  );
  const hydratedLessonIdRef = useRef<string | null>(
    isEditMode && initialLesson ? initialLesson.id : null,
  );
  const activeSubjectIdRef = useRef(activeSubjectId);
  activeSubjectIdRef.current = activeSubjectId;
  const prevInitialSubjectIdRef = useRef(initialSubjectId);
  const prevInitialTopicIdRef = useRef(initialTopicId);
  const isMountedRef = useRef(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [preservePublished, setPreservePublished] = useState(false);
  const [submitForReview, setSubmitForReview] = useState(false);

  const [lessonForm, setLessonForm] = useState<LessonFormState>(() =>
    createInitialLessonFormState(isEditMode ? initialLesson : undefined),
  );

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (
      !isEditMode &&
      initialTopicId &&
      prevInitialTopicIdRef.current !== initialTopicId
    ) {
      prevInitialTopicIdRef.current = initialTopicId;
      preferredTopicRef.current = initialTopicId;
      setSelectedTopicId(initialTopicId);
    }
  }, [isEditMode, initialTopicId]);

  useEffect(() => {
    if (
      !isEditMode &&
      initialSubjectId &&
      prevInitialSubjectIdRef.current !== initialSubjectId
    ) {
      prevInitialSubjectIdRef.current = initialSubjectId;
      setChapters([]);
      setSelectedChapterId('');
      if (!initialTopicId) {
        setSelectedTopicId('');
      }
      setActiveSubjectId(initialSubjectId);
    }
  }, [isEditMode, initialSubjectId, initialTopicId]);

  // Keep selectedChapterId aligned when initialTopicId updates within the same subject
  useEffect(() => {
    if (isEditMode || !selectedTopicId || chapters.length === 0) {
      return;
    }
    const matchingChap = chapters.find((c) =>
      (c.topics || []).some((t) => t.id === selectedTopicId),
    );
    if (matchingChap) {
      setSelectedChapterId((curr) =>
        curr === matchingChap.id ? curr : matchingChap.id,
      );
    }
  }, [isEditMode, chapters, selectedTopicId]);

  // Re-hydrate only when switching to a different lesson ID in edit mode
  useEffect(() => {
    if (mode !== 'edit' || !initialLesson) {
      return;
    }
    if (hydratedLessonIdRef.current === initialLesson.id) {
      return;
    }
    hydratedLessonIdRef.current = initialLesson.id;
    setSuccessMessage(null);
    setErrorMessage(null);
    preferredTopicRef.current = initialLesson.topicId;

    const nextSubjectId = initialLesson.topic?.chapter?.subject?.id;
    const isSubjectChanged = Boolean(
      nextSubjectId && nextSubjectId !== activeSubjectIdRef.current,
    );
    if (nextSubjectId) {
      setActiveSubjectId(nextSubjectId);
      setSubjects((prev) =>
        ensureSubjectInList(prev, initialLesson.topic?.chapter?.subject),
      );
    }
    if (initialLesson.topic?.chapter?.id) {
      setChapters((prev) =>
        ensureChapterTopicInList(isSubjectChanged ? [] : prev, initialLesson.topic),
      );
      setSelectedChapterId(initialLesson.topic.chapter.id);
    }
    setSelectedTopicId(initialLesson.topicId);
    setLessonForm(createInitialLessonFormState(initialLesson));
    setPreservePublished(false);
    setSubmitForReview(false);
  }, [mode, initialLesson]);

  const seededSubjectId = initialLesson?.topic?.chapter?.subject?.id;
  const seededSubjectCode = initialLesson?.topic?.chapter?.subject?.code;
  const seededSubjectNameBangla = initialLesson?.topic?.chapter?.subject?.nameBangla;

  // 1. Fetch available subjects
  useEffect(() => {
    let isMounted = true;
    async function fetchSubjects() {
      try {
        const res = await apiClient.get<SubjectOption[]>('/curriculum/subjects', {
          scope: 'admin',
        });
        if (isMounted && Array.isArray(res) && res.length > 0) {
          const seededSubject =
            isEditMode && seededSubjectId && seededSubjectCode && seededSubjectNameBangla
              ? {
                  id: seededSubjectId,
                  code: seededSubjectCode,
                  nameBangla: seededSubjectNameBangla,
                }
              : null;
          setSubjects(ensureSubjectInList(res, seededSubject));
          if (!initialSubjectId && !isEditMode) {
            setActiveSubjectId((current) => {
              if (res.some((s) => s.id === current)) {
                return current;
              }
              const defaultSub = res.find((s) => s.code === 'ssc_physics') || res[0];
              return defaultSub.id;
            });
          }
        }
      } catch {
        // Fallback default
      }
    }
    fetchSubjects();
    return () => {
      isMounted = false;
    };
  }, [
    initialSubjectId,
    isEditMode,
    seededSubjectId,
    seededSubjectCode,
    seededSubjectNameBangla,
  ]);

  // 2. Fetch chapters & topics for activeSubjectId
  useEffect(() => {
    let isMounted = true;
    if (!activeSubjectId) {
      return;
    }
    async function fetchHierarchy() {
      const targetTopic = preferredTopicRef.current;
      const hasTopicPreference = Boolean(targetTopic);

      try {
        const res = await apiClient.get<ChapterOption[]>(
          `/curriculum/subjects/${activeSubjectId}/chapters`,
          { scope: 'admin' },
        );
        if (!isMounted || !Array.isArray(res)) {
          return;
        }

        if (res.length > 0) {
          let matchedChap: ChapterOption | undefined;
          let matchedTopicId = '';

          if (targetTopic) {
            matchedChap = res.find((c) =>
              (c.topics || []).some((t) => t.id === targetTopic),
            );
            if (matchedChap) {
              matchedTopicId = targetTopic;
            } else if (isEditMode && hasTopicPreference) {
              // Preserve original edited lesson topic on partial lists
              return;
            }
          }

          if (!matchedChap) {
            matchedChap = res.find((c) => (c.topics || []).length > 0) || res[0];
            matchedTopicId = matchedChap?.topics?.[0]?.id || '';
          }

          setChapters(res);
          setSelectedChapterId(matchedChap.id);
          setSelectedTopicId(matchedTopicId);
        } else if (!isEditMode || !hasTopicPreference) {
          setChapters([]);
          setSelectedChapterId('');
          setSelectedTopicId('');
        }
      } catch (err: unknown) {
        if (!isMounted) {
          return;
        }
        if (!isEditMode) {
          const fallback = DEFAULT_CHAPTERS_MAP[activeSubjectId] || [];
          setChapters(fallback);
          if (fallback.length > 0) {
            const target = fallback.find((c) => (c.topics || []).length > 0) || fallback[0];
            setSelectedChapterId(target.id);
            setSelectedTopicId(target.topics?.[0]?.id || '');
          } else {
            setSelectedChapterId('');
            setSelectedTopicId('');
          }
        } else if (!hasTopicPreference) {
          setChapters([]);
          setSelectedChapterId('');
          setSelectedTopicId('');
          setErrorMessage(formatHierarchyFetchError(err));
        }
      }
    }
    fetchHierarchy();
    return () => {
      isMounted = false;
    };
  }, [activeSubjectId, isEditMode]);

  const handleSubjectChange = (subjectId: string) => {
    preferredTopicRef.current = undefined;
    setActiveSubjectId(subjectId);
    setErrorMessage(null);
    setSuccessMessage(null);
    setChapters([]);
    setSelectedChapterId('');
    setSelectedTopicId('');
  };

  const handleChapterChange = (chapterId: string) => {
    preferredTopicRef.current = undefined;
    setSelectedChapterId(chapterId);
    const chap = chapters.find((c) => c.id === chapterId);
    setSelectedTopicId(chap?.topics?.[0]?.id || '');
  };

  const handleTopicChange = (topicId: string) => {
    preferredTopicRef.current = topicId;
    setSelectedTopicId(topicId);
  };

  const handleFillSample = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLessonForm({
      ...SAMPLE_LESSON_TEMPLATE,
      terms: SAMPLE_LESSON_TEMPLATE.terms.map((t) => ({ ...t })),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isArchived || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!selectedTopicId) {
      setErrorMessage(
        'একটি নির্দিষ্ট টপিক নির্বাচন করুন। টপিক ছাড়া লেসন সংরক্ষণ করা যাবে না।',
      );
      setIsSubmitting(false);
      return;
    }

    if (!lessonForm.lessonTitle.trim()) {
      setErrorMessage('পাঠের শিরোনাম (বাংলায়) লিখুন।');
      setIsSubmitting(false);
      return;
    }

    if (!lessonForm.learningGoal.trim()) {
      setErrorMessage('শিখনফল (Learning Goal) লিখুন।');
      setIsSubmitting(false);
      return;
    }

    if (!lessonForm.lessonExplanation.trim()) {
      setErrorMessage('মূল ব্যাখ্যা লিখুন।');
      setIsSubmitting(false);
      return;
    }

    const hasValidTerm = lessonForm.terms.some((t) => t.termBangla.trim().length > 0);
    if (!hasValidTerm) {
      setErrorMessage('অন্তত একটি গুরুত্বপূর্ণ পরিভাষা (বাংলা শব্দ) যুক্ত করুন।');
      setIsSubmitting(false);
      return;
    }

    try {
      const formParams = {
        topicId: selectedTopicId,
        lessonTitle: lessonForm.lessonTitle,
        learningGoal: lessonForm.learningGoal,
        lessonExplanation: lessonForm.lessonExplanation,
        interactiveWidgetUrl: lessonForm.interactiveWidgetUrl,
        terms: lessonForm.terms,
        workedExampleProblem: lessonForm.workedExampleProblem,
        workedExampleSolution: lessonForm.workedExampleSolution,
        memoryAid: lessonForm.memoryAid,
      };

      if (isEditMode && initialLesson) {
        const updated = await apiClient.patch<AdminLessonItem>(
          `/admin/content/lessons/${encodeURIComponent(initialLesson.id)}`,
          {
            ...buildLessonEditPayload(formParams),
            ...buildLessonEditEditorialFields(
              initialLesson,
              adminRole,
              preservePublished,
              submitForReview,
            ),
          },
          { scope: 'admin' },
        );
        if (!isMountedRef.current) return;
        setSuccessMessage('✅ লেসনটি সফলভাবে আপডেট করা হয়েছে!');
        setPreservePublished(false);
        setSubmitForReview(false);
        onLessonUpdated?.(updated);
      } else {
        const created = await apiClient.post<AdminLessonItem>(
          '/admin/content/lessons',
          buildLessonPayload(formParams),
          { scope: 'admin' },
        );
        if (!isMountedRef.current) return;
        setSuccessMessage(
          '✅ পাঠ্য লেসন সফলভাবে তৈরি হয়েছে এবং রিভিউ কিউতে যুক্ত করা হয়েছে!',
        );
        onLessonCreated?.(created);
      }
    } catch (err: unknown) {
      if (!isMountedRef.current) return;
      setErrorMessage(formatAuthoringApiError(err));
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  const activeChapter =
    chapters.find((c) => c.id === selectedChapterId) ||
    (!isEditMode ? chapters[0] : undefined);
  const availableTopics = activeChapter?.topics || [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>
              {isEditMode
                ? 'লেসন সম্পাদনা (Edit Lesson)'
                : 'পাঠ্য লেসন স্টুডিও (Lesson Authoring Studio)'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isEditMode && initialLesson
              ? `লেসন আইডি: ${initialLesson.id} • বর্তমান ভার্সন v${initialLesson.version} (${initialLesson.status})`
              : 'শিখনফল, মূল ব্যাখ্যা, পরিভাষা ও গাণিতিক উদাহরণসহ নতুন পাঠ্য লেসন তৈরি করুন।'}
          </p>
        </div>

        {isEditMode && initialLesson ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700">
            <span>পাঠ্য লেসন • v{initialLesson.version}</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleFillSample}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
          >
            নমুনা লেসন ভরুন
          </button>
        )}
      </div>

      <EditorialStatusBanners
        isEditMode={isEditMode}
        isArchived={isArchived}
        status={initialLesson?.status}
        itemTypeLabel="লেসনটি"
        backHref="/admin/curriculum/lessons"
        backLabel="লেসন তালিকায় ফিরুন"
        adminRole={adminRole}
        preservePublished={preservePublished}
        submitForReview={submitForReview}
        onPreservePublishedChange={setPreservePublished}
        onSubmitForReviewChange={setSubmitForReview}
      />

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3.5 rounded-xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <Link
            href="/admin/curriculum/lessons"
            className="underline font-bold text-emerald-900 hover:text-emerald-700 shrink-0"
          >
            তালিকায় ফিরুন
          </Link>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2"
        >
          <span>{errorMessage}</span>
        </div>
      )}

      <TopicHierarchySelector
        subjects={subjects}
        chapters={chapters}
        availableTopics={availableTopics}
        activeSubjectId={activeSubjectId}
        selectedChapterId={selectedChapterId}
        selectedTopicId={selectedTopicId}
        onSubjectChange={handleSubjectChange}
        onChapterChange={handleChapterChange}
        onTopicChange={handleTopicChange}
      />

      <LessonAuthoringForm
        lessonForm={lessonForm}
        mode={isEditMode ? 'edit' : 'create'}
        isArchived={isArchived}
        isSubmitting={isSubmitting}
        onLessonFormChange={setLessonForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
