'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import type { AdminLessonItem, AdminQuestionItem } from '@pori/shared';

type ContentEditorialStatus = AdminQuestionItem['status'] | AdminLessonItem['status'];

export interface EditorialStatusBannersProps {
  isEditMode: boolean;
  isArchived: boolean;
  status?: ContentEditorialStatus;
  questionStatus?: AdminQuestionItem['status'];
  itemTypeLabel?: string;
  backHref?: string;
  backLabel?: string;
  adminRole?: string;
  preservePublished: boolean;
  submitForReview: boolean;
  onPreservePublishedChange: (checked: boolean) => void;
  onSubmitForReviewChange: (checked: boolean) => void;
}

export function EditorialStatusBanners({
  isEditMode,
  isArchived,
  status,
  questionStatus,
  itemTypeLabel = 'প্রশ্নটি',
  backHref = '/admin/questions',
  backLabel = 'প্রশ্ন তালিকায় ফিরুন',
  adminRole,
  preservePublished,
  submitForReview,
  onPreservePublishedChange,
  onSubmitForReviewChange,
}: EditorialStatusBannersProps) {
  if (!isEditMode) {
    return null;
  }

  const resolvedStatus = status ?? questionStatus;

  return (
    <>
      {isArchived && (
        <div
          role="alert"
          className="bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl p-4 text-xs flex items-center justify-between gap-3 font-bold"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              এই {itemTypeLabel} আর্কাইভ (ARCHIVED) অবস্থায় আছে — সরাসরি সম্পাদনা করা যাবে না।
            </span>
          </div>
          <Link
            href={backHref}
            className="underline text-rose-900 hover:text-rose-700 shrink-0"
          >
            {backLabel}
          </Link>
        </div>
      )}

      {resolvedStatus === 'PUBLISHED' && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-start gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              এই {itemTypeLabel} বর্তমানে প্রকাশিত (PUBLISHED) অবস্থায় আছে। সংরক্ষণ করলে এটি স্বয়ংক্রিয়ভাবে REVIEW অবস্থায় যাবে।
            </span>
          </div>
          {adminRole === 'ADMIN' && (
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-amber-950 pl-6">
              <input
                type="checkbox"
                checked={preservePublished}
                onChange={(e) => onPreservePublishedChange(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>সরাসরি প্রকাশিত রাখুন (Keep Published)</span>
            </label>
          )}
        </div>
      )}

      {(resolvedStatus === 'DRAFT' || resolvedStatus === 'CORRECTION') && (
        <div className="bg-indigo-50/70 border border-indigo-200 text-indigo-950 rounded-2xl p-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={submitForReview}
              onChange={(e) => onSubmitForReviewChange(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>রিভিউয়ের জন্য পাঠান (Submit for Review)</span>
          </label>
        </div>
      )}
    </>
  );
}
