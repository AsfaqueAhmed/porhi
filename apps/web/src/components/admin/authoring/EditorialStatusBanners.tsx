'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import type { AdminQuestionItem } from '@pori/shared';

export interface EditorialStatusBannersProps {
  isEditMode: boolean;
  isArchived: boolean;
  questionStatus?: AdminQuestionItem['status'];
  adminRole?: string;
  preservePublished: boolean;
  submitForReview: boolean;
  onPreservePublishedChange: (checked: boolean) => void;
  onSubmitForReviewChange: (checked: boolean) => void;
}

export function EditorialStatusBanners({
  isEditMode,
  isArchived,
  questionStatus,
  adminRole,
  preservePublished,
  submitForReview,
  onPreservePublishedChange,
  onSubmitForReviewChange,
}: EditorialStatusBannersProps) {
  if (!isEditMode) {
    return null;
  }

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
              এই প্রশ্নটি আর্কাইভ (ARCHIVED) অবস্থায় আছে — সরাসরি সম্পাদনা করা যাবে না।
            </span>
          </div>
          <Link
            href="/admin/questions"
            className="underline text-rose-900 hover:text-rose-700 shrink-0"
          >
            প্রশ্ন তালিকায় ফিরুন
          </Link>
        </div>
      )}

      {questionStatus === 'PUBLISHED' && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-start gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              এই প্রশ্নটি বর্তমানে প্রকাশিত (PUBLISHED) অবস্থায় আছে। সংরক্ষণ করলে এটি স্বয়ংক্রিয়ভাবে REVIEW অবস্থায় যাবে।
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

      {(questionStatus === 'DRAFT' || questionStatus === 'CORRECTION') && (
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
