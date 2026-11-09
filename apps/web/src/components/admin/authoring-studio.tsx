'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PenTool, CheckCircle } from 'lucide-react';
import type { AdminQuestionItem } from '@pori/shared';
import { apiClient } from '@/lib/api-client';
import { useAdminAuthStore } from '@/store/admin-auth-store';
import { TopicHierarchySelector } from './authoring/TopicHierarchySelector';
import { EditorialStatusBanners } from './authoring/EditorialStatusBanners';
import { QuestionAuthoringForm } from './authoring/QuestionAuthoringForm';
import {
  AuthoringContentType,
  ChapterOption,
  DEFAULT_CHAPTERS_MAP,
  DEFAULT_SUBJECTS,
  QuestionFormState,
  SAMPLE_CQ_TEMPLATE,
  SAMPLE_MCQ_TEMPLATE,
  SubjectOption,
  buildCqCreatePayload,
  buildCqRubricPayload,
  buildDistractorPayload,
  buildEditEditorialFields,
  buildExplanationPayload,
  buildMcqPayload,
  buildSubjectBookTitle,
  createInitialQuestionFormState,
  ensureChapterTopicInList,
  ensureSubjectInList,
  formatAuthoringApiError,
  formatHierarchyFetchError,
  hasCqRubricCriteria,
  normalizeRubric,
} from './authoring/authoring-helpers';

export interface AuthoringStudioProps {
  mode?: 'create' | 'edit';
  initialQuestion?: AdminQuestionItem;
  onContentCreated?: () => void;
  onQuestionUpdated?: (updated: AdminQuestionItem) => void;
  initialTopicId?: string;
  initialSubjectId?: string;
  initialContentType?: 'MCQ' | 'CQ';
}

export function AuthoringStudio({
  mode = 'create',
  initialQuestion,
  onContentCreated,
  onQuestionUpdated,
  initialTopicId,
  initialSubjectId,
  initialContentType,
}: AuthoringStudioProps) {
  const isEditMode = mode === 'edit' && Boolean(initialQuestion);
  const isArchived = isEditMode && initialQuestion?.status === 'ARCHIVED';
  const adminRole = useAdminAuthStore((s) => s.adminUser?.role);

  const [contentType, setContentType] = useState<AuthoringContentType>(() => {
    if (isEditMode && initialQuestion) {
      return initialQuestion.type === 'CQ_CREATIVE' ? 'CQ' : 'MCQ';
    }
    return initialContentType || 'MCQ';
  });

  const [subjects, setSubjects] = useState<SubjectOption[]>(() =>
    ensureSubjectInList(DEFAULT_SUBJECTS, initialQuestion?.topic?.chapter?.subject),
  );
  const [activeSubjectId, setActiveSubjectId] = useState<string>(() => {
    if (isEditMode && initialQuestion?.topic?.chapter?.subject?.id) {
      return initialQuestion.topic.chapter.subject.id;
    }
    return initialSubjectId || 'sub_ssc_physics';
  });
  const [chapters, setChapters] = useState<ChapterOption[]>(() => {
    if (isEditMode && initialQuestion?.topic?.chapter) {
      return ensureChapterTopicInList([], initialQuestion.topic);
    }
    return DEFAULT_CHAPTERS_MAP[initialSubjectId || 'sub_ssc_physics'] || [];
  });
  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    if (isEditMode && initialQuestion?.topic?.chapter?.id) {
      return initialQuestion.topic.chapter.id;
    }
    return isEditMode ? '' : 'chap_ssc_physics_ch2';
  });
  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    if (isEditMode && initialQuestion?.topicId) {
      return initialQuestion.topicId;
    }
    return initialTopicId || 'top_ssc_physics_motion_eq';
  });

  const preferredTopicRef = useRef<string | undefined>(
    isEditMode ? initialQuestion?.topicId : initialTopicId,
  );
  const hydratedQuestionIdRef = useRef<string | null>(
    isEditMode && initialQuestion ? initialQuestion.id : null,
  );
  const activeSubjectIdRef = useRef(activeSubjectId);
  activeSubjectIdRef.current = activeSubjectId;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [preservePublished, setPreservePublished] = useState(false);
  const [submitForReview, setSubmitForReview] = useState(false);

  const [questionForm, setQuestionForm] = useState<QuestionFormState>(() =>
    createInitialQuestionFormState(isEditMode ? initialQuestion : undefined),
  );

  useEffect(() => {
    if (!isEditMode && initialTopicId) {
      preferredTopicRef.current = initialTopicId;
      setSelectedTopicId(initialTopicId);
    }
  }, [isEditMode, initialTopicId]);

  useEffect(() => {
    if (!isEditMode && initialSubjectId) {
      setActiveSubjectId(initialSubjectId);
    }
  }, [isEditMode, initialSubjectId]);

  useEffect(() => {
    if (!isEditMode && initialContentType) {
      setContentType(initialContentType);
    }
  }, [isEditMode, initialContentType]);

  // Re-hydrate if initialQuestion changes to a different question ID in edit mode
  useEffect(() => {
    if (mode !== 'edit' || !initialQuestion) {
      return;
    }
    if (hydratedQuestionIdRef.current === initialQuestion.id) {
      return;
    }
    hydratedQuestionIdRef.current = initialQuestion.id;
    setSuccessMessage(null);
    setErrorMessage(null);
    setContentType(initialQuestion.type === 'CQ_CREATIVE' ? 'CQ' : 'MCQ');
    preferredTopicRef.current = initialQuestion.topicId;

    const nextSubjectId = initialQuestion.topic?.chapter?.subject?.id;
    const isSubjectChanged = Boolean(
      nextSubjectId && nextSubjectId !== activeSubjectIdRef.current,
    );
    if (nextSubjectId) {
      setActiveSubjectId(nextSubjectId);
      setSubjects((prev) =>
        ensureSubjectInList(prev, initialQuestion.topic?.chapter?.subject),
      );
    }
    if (initialQuestion.topic?.chapter?.id) {
      setChapters((prev) =>
        ensureChapterTopicInList(isSubjectChanged ? [] : prev, initialQuestion.topic),
      );
      setSelectedChapterId(initialQuestion.topic.chapter.id);
    }
    setSelectedTopicId(initialQuestion.topicId);
    setQuestionForm(createInitialQuestionFormState(initialQuestion));
    setPreservePublished(false);
    setSubmitForReview(false);
  }, [mode, initialQuestion]);

  const seededSubjectId = initialQuestion?.topic?.chapter?.subject?.id;
  const seededSubjectCode = initialQuestion?.topic?.chapter?.subject?.code;
  const seededSubjectNameBangla = initialQuestion?.topic?.chapter?.subject?.nameBangla;

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
              // Preflight Ruling #2: preserve original edited question topic on partial lists
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
    if (isEditMode) {
      setChapters([]);
      setSelectedChapterId('');
      setSelectedTopicId('');
      return;
    }
    const sub = subjects.find((s) => s.id === subjectId);
    if (sub) {
      setQuestionForm((prev) => ({
        ...prev,
        citationBook: buildSubjectBookTitle(sub),
      }));
    }
  };

  const handleChapterChange = (chapterId: string) => {
    preferredTopicRef.current = undefined;
    setSelectedChapterId(chapterId);
    const chap = chapters.find((c) => c.id === chapterId);
    if (chap) {
      if (!isEditMode) {
        setQuestionForm((prev) => ({ ...prev, citationChapter: chap.titleBangla }));
      }
      setSelectedTopicId(chap.topics?.[0]?.id || '');
    } else {
      setSelectedTopicId('');
    }
  };

  const handleTopicChange = (topicId: string) => {
    preferredTopicRef.current = topicId;
    setSelectedTopicId(topicId);
  };

  const handleFillSample = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (contentType === 'MCQ') {
      setQuestionForm((prev) => ({
        ...prev,
        ...SAMPLE_MCQ_TEMPLATE,
        options: SAMPLE_MCQ_TEMPLATE.options!.map((opt) => ({ ...opt })),
        distractorMap: { ...SAMPLE_MCQ_TEMPLATE.distractorMap },
      }));
    } else {
      setQuestionForm((prev) => ({
        ...prev,
        ...SAMPLE_CQ_TEMPLATE,
        cqRubric: normalizeRubric(SAMPLE_CQ_TEMPLATE.cqRubric),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isArchived) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!selectedTopicId) {
      setErrorMessage(
        'একটি নির্দিষ্ট টপিক নির্বাচন করুন। টপিক ছাড়া প্রশ্ন তৈরি করা যাবে না।',
      );
      setIsSubmitting(false);
      return;
    }

    try {
      if (contentType === 'CQ') {
        if (!hasCqRubricCriteria(questionForm.cqRubric)) {
          setErrorMessage(
            'সৃজনশীল (CQ) প্রশ্নের জন্য অন্তত একটি অংশের (ক/খ/গ/ঘ) মানদণ্ড লিখুন।',
          );
          setIsSubmitting(false);
          return;
        }

        const cqCreatePayload = buildCqCreatePayload({
          topicId: selectedTopicId,
          stem: questionForm.stem,
          cqRubric: buildCqRubricPayload(questionForm.cqRubric),
          difficulty: questionForm.difficulty,
          boardSource: questionForm.boardSource,
          explanation: buildExplanationPayload(questionForm),
        });

        if (isEditMode && initialQuestion) {
          const updated = await apiClient.patch<AdminQuestionItem>(
            `/admin/content/questions/${initialQuestion.id}`,
            {
              ...cqCreatePayload,
              options: null,
              ...buildEditEditorialFields(
                initialQuestion,
                questionForm.boardSource,
                adminRole,
                preservePublished,
                submitForReview,
              ),
            },
            { scope: 'admin' },
          );
          setSuccessMessage('✅ সৃজনশীল (CQ) প্রশ্নটি সফলভাবে আপডেট করা হয়েছে!');
          setPreservePublished(false);
          setSubmitForReview(false);
          onQuestionUpdated?.(updated);
        } else {
          await apiClient.post('/admin/content/questions', cqCreatePayload, {
            scope: 'admin',
          });
          setSuccessMessage(
            '✅ ৬-স্তরের ব্যাখ্যাসহ সৃজনশীল (CQ) প্রশ্ন সফলভাবে তৈরি হয়েছে!',
          );
        }
      } else {
        const distractorAnalysis = buildDistractorPayload(
          questionForm.options,
          questionForm.distractorMap,
        );
        const mcqPayload = buildMcqPayload({
          topicId: selectedTopicId,
          stem: questionForm.stem,
          difficulty: questionForm.difficulty,
          boardSource: questionForm.boardSource,
          options: questionForm.options,
          correctOptionIndex: questionForm.correctOptionIndex,
          explanation: buildExplanationPayload({
            ...questionForm,
            distractorAnalysis,
          }),
        });

        if (isEditMode && initialQuestion) {
          const updated = await apiClient.patch<AdminQuestionItem>(
            `/admin/content/questions/${initialQuestion.id}`,
            {
              ...mcqPayload,
              ...buildEditEditorialFields(
                initialQuestion,
                questionForm.boardSource,
                adminRole,
                preservePublished,
                submitForReview,
              ),
            },
            { scope: 'admin' },
          );
          setSuccessMessage('✅ প্রশ্নটি সফলভাবে আপডেট করা হয়েছে!');
          setPreservePublished(false);
          setSubmitForReview(false);
          onQuestionUpdated?.(updated);
        } else {
          await apiClient.post('/admin/content/questions', mcqPayload, { scope: 'admin' });
          setSuccessMessage(
            '✅ ৬-স্তরের ব্যাখ্যাসহ MCQ প্রশ্ন সফলভাবে তৈরি হয়েছে এবং রিভিউ কিউতে যুক্ত করা হয়েছে!',
          );
        }
      }

      if (!isEditMode && onContentCreated) {
        onContentCreated();
      }
    } catch (err: unknown) {
      setErrorMessage(formatAuthoringApiError(err));
    } finally {
      setIsSubmitting(false);
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
            <PenTool className="w-5 h-5 text-indigo-600" />
            <span>
              {isEditMode
                ? 'প্রশ্ন সম্পাদনা (Edit Question)'
                : 'অথরিং স্টুডিও (Content Authoring Studio)'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isEditMode && initialQuestion
              ? `প্রশ্ন আইডি: ${initialQuestion.id} • বর্তমান ভার্সন v${initialQuestion.version} (${initialQuestion.status})`
              : 'কাঠামোগত ইনপুট, LaTeX সমীকরণ ও ৬-স্তরের ব্যাখ্যার সাথে নতুন প্রশ্ন তৈরি করুন।'}
          </p>
        </div>

        {isEditMode && initialQuestion ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700">
            <span>
              {initialQuestion.type === 'CQ_CREATIVE' ? 'সৃজনশীল (CQ)' : 'MCQ'} • v
              {initialQuestion.version}
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleFillSample}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              নমুনা ভরুন
            </button>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {(
                [
                  { type: 'MCQ', label: '৬-স্তরের MCQ' },
                  { type: 'CQ', label: 'সৃজনশীল (CQ)' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => setContentType(tab.type)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    contentType === tab.type
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <EditorialStatusBanners
        isEditMode={isEditMode}
        isArchived={isArchived}
        questionStatus={initialQuestion?.status}
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
            href="/admin/questions"
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

      <QuestionAuthoringForm
        contentType={contentType}
        questionForm={questionForm}
        isEditMode={isEditMode}
        isSubmitting={isSubmitting}
        isArchived={isArchived}
        onQuestionFormChange={setQuestionForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
