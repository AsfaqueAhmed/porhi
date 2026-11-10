'use client';

import React from 'react';
import { Send } from 'lucide-react';
import type { CQRubric } from '@pori/shared';
import { useLanguageStore } from '@/store/language-store';
import { StudentSimulatorFrame } from '../student-simulator-frame';
import { CqRubricEditor } from './CqRubricEditor';
import { McqOptionsEditor } from './McqOptionsEditor';
import { QuestionStemCard } from './QuestionStemCard';
import { SixLayerExplanationFields } from './SixLayerExplanationFields';
import type { QuestionFormState } from './authoring-helpers';

export interface QuestionAuthoringFormProps {
  contentType: 'MCQ' | 'CQ';
  questionForm: QuestionFormState;
  isEditMode: boolean;
  isSubmitting: boolean;
  isArchived: boolean;
  onQuestionFormChange: React.Dispatch<React.SetStateAction<QuestionFormState>>;
  onSubmit: (e: React.FormEvent) => void;
}

export function QuestionAuthoringForm({
  contentType,
  questionForm,
  isEditMode,
  isSubmitting,
  isArchived,
  onQuestionFormChange,
  onSubmit,
}: QuestionAuthoringFormProps) {
  const tr = useLanguageStore((s) => s.tr);
  const updateField = <K extends keyof QuestionFormState>(
    field: K,
    value: QuestionFormState[K],
  ) => {
    onQuestionFormChange((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionCorrectChange = (index: number) => {
    onQuestionFormChange((prev) => ({
      ...prev,
      correctOptionIndex: index,
      options: prev.options.map((opt, i) => ({ ...opt, isCorrect: i === index })),
    }));
  };

  const handleOptionTextChange = (index: number, text: string) => {
    onQuestionFormChange((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? { ...opt, text } : opt)),
    }));
  };

  const handleRubricChange = (
    key: keyof CQRubric,
    field: 'mark' | 'criteria',
    value: string | number,
  ) => {
    onQuestionFormChange((prev) => ({
      ...prev,
      cqRubric: {
        ...prev.cqRubric,
        [key]: { ...prev.cqRubric[key], [field]: value },
      },
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <QuestionStemCard
            isCq={contentType === 'CQ'}
            stem={questionForm.stem}
            difficulty={questionForm.difficulty}
            boardSource={questionForm.boardSource}
            onStemChange={(value) => updateField('stem', value)}
            onDifficultyChange={(value) => updateField('difficulty', value)}
            onBoardSourceChange={(value) => updateField('boardSource', value)}
            onInsertFormula={(formula) =>
              onQuestionFormChange((prev) => ({
                ...prev,
                stem: `${prev.stem} $${formula}$ `,
              }))
            }
          />

          {contentType === 'MCQ' ? (
            <McqOptionsEditor
              options={questionForm.options}
              correctOptionIndex={questionForm.correctOptionIndex}
              onOptionCorrectChange={handleOptionCorrectChange}
              onOptionTextChange={handleOptionTextChange}
            />
          ) : (
            <CqRubricEditor cqRubric={questionForm.cqRubric} onChange={handleRubricChange} />
          )}

          <SixLayerExplanationFields
            showDistractors={contentType === 'MCQ'}
            mcqOptions={questionForm.options}
            directAnswer={questionForm.directAnswer}
            coreConcept={questionForm.coreConcept}
            stepDerivation={questionForm.stepDerivation}
            distractorMap={questionForm.distractorMap}
            citationBook={questionForm.citationBook}
            citationChapter={questionForm.citationChapter}
            citationPage={questionForm.citationPage}
            proTip={questionForm.proTip}
            onDirectAnswerChange={(v) => updateField('directAnswer', v)}
            onCoreConceptChange={(v) => updateField('coreConcept', v)}
            onStepDerivationChange={(v) => updateField('stepDerivation', v)}
            onDistractorChange={(optionId, value) =>
              onQuestionFormChange((prev) => ({
                ...prev,
                distractorMap: { ...prev.distractorMap, [optionId]: value },
              }))
            }
            onCitationBookChange={(v) => updateField('citationBook', v)}
            onCitationChapterChange={(v) => updateField('citationChapter', v)}
            onCitationPageChange={(v) => updateField('citationPage', v)}
            onProTipChange={(v) => updateField('proTip', v)}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isArchived}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? tr('সংরক্ষণ হচ্ছে...', 'Saving...')
                  : isEditMode
                    ? tr('পরিবর্তন সংরক্ষণ করুন', 'Save Changes')
                    : contentType === 'CQ'
                      ? tr('৬-স্তরের ব্যাখ্যাসহ সৃজনশীল প্রশ্ন জমা দাও', 'Submit Creative Question with 6-Layer Explanation')
                      : tr('৬-স্তরের ব্যাখ্যাসহ প্রশ্ন জমা দাও', 'Submit Question with 6-Layer Explanation')}
              </span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <StudentSimulatorFrame
            questionType={contentType === 'CQ' ? 'CQ_CREATIVE' : 'MCQ'}
            stem={questionForm.stem}
            options={questionForm.options.map((o) => ({
              id: o.id,
              text: o.text,
              isCorrect: o.isCorrect,
            }))}
            cqRubric={questionForm.cqRubric}
            coreConcept={questionForm.coreConcept}
            distractors={questionForm.distractorMap}
            formulaSteps={questionForm.stepDerivation}
            citationBook={questionForm.citationBook}
            citationChapter={questionForm.citationChapter}
            citationPage={questionForm.citationPage}
            proTip={questionForm.proTip}
          />
        </div>
      </div>
    </form>
  );
}
