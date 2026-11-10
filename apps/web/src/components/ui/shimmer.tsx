import React from 'react';

export function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div
      data-testid="shimmer-block"
      className={`shimmer-effect bg-slate-200/80 rounded-md ${className}`}
    />
  );
}

export function LessonPageSkeleton() {
  return (
    <div data-testid="lesson-skeleton" className="space-y-4 sm:space-y-6 md:space-y-8 max-w-3xl mx-auto pb-8 sm:pb-10 animate-in fade-in duration-150">
      {/* Title & Badge */}
      <div className="space-y-2.5 sm:space-y-3">
        <Shimmer className="w-36 h-6 rounded-full" />
        <Shimmer className="w-3/4 h-8 sm:h-10 rounded-xl" />
      </div>

      {/* Learning Goal Skeleton */}
      <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Shimmer className="w-5 h-5 rounded-md bg-emerald-200/60" />
          <Shimmer className="w-28 h-5 rounded-md bg-emerald-200/60" />
        </div>
        <div className="space-y-2 pl-0 sm:pl-7">
          <Shimmer className="w-full h-4 rounded bg-emerald-100/80" />
          <Shimmer className="w-4/5 h-4 rounded bg-emerald-100/80" />
        </div>
      </div>

      {/* Main Explanation Skeleton */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <Shimmer className="w-48 h-6 sm:h-7 rounded-lg" />
          <Shimmer className="w-28 h-5 rounded-full" />
        </div>
        <div className="space-y-3 pt-2">
          <Shimmer className="w-full h-4" />
          <Shimmer className="w-11/12 h-4" />
          <Shimmer className="w-4/5 h-4" />
          <div className="py-2">
            <Shimmer className="w-2/3 h-12 mx-auto rounded-lg" />
          </div>
          <Shimmer className="w-full h-4" />
          <Shimmer className="w-3/4 h-4" />
        </div>
      </div>

      {/* Important Terms Skeleton */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-6 space-y-4">
        <Shimmer className="w-44 h-6 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex justify-between items-center">
                <Shimmer className="w-24 h-4 rounded" />
                <Shimmer className="w-16 h-3 rounded" />
              </div>
              <Shimmer className="w-full h-3.5 rounded" />
              <Shimmer className="w-4/5 h-3.5 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Worked Example Skeleton */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-6 md:p-8 space-y-4">
        <Shimmer className="w-56 h-6 rounded-lg" />
        <div className="p-3.5 sm:p-4 rounded-xl bg-purple-50/40 border border-purple-100 space-y-2">
          <Shimmer className="w-16 h-3.5 bg-purple-200/60" />
          <Shimmer className="w-full h-4 bg-purple-100/70" />
        </div>
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2">
          <Shimmer className="w-28 h-3.5 bg-emerald-200/60" />
          <Shimmer className="w-full h-12 bg-emerald-100/70 rounded-lg" />
        </div>
      </div>

      {/* Quick Practice Skeleton */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-indigo-150 p-4 sm:p-6 md:p-8 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <Shimmer className="w-48 h-6 rounded-lg bg-indigo-100/70" />
          <Shimmer className="w-24 h-5 rounded-full" />
        </div>
        <Shimmer className="w-full h-5 rounded" />
        <div className="grid grid-cols-1 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <Shimmer key={i} className="w-full h-12 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Bottom CTA Skeleton */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
        <Shimmer className="w-36 h-5 rounded" />
        <Shimmer className="w-full sm:w-56 h-11 rounded-xl" />
      </div>
    </div>
  );
}

export function PracticePageSkeleton() {
  return (
    <div data-testid="practice-skeleton" className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header & Progress */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="space-y-1.5">
          <Shimmer className="w-28 h-3.5 rounded" />
          <Shimmer className="w-36 h-6 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <Shimmer className="w-20 h-6 rounded-full" />
          <Shimmer className="w-24 h-6 rounded-full" />
        </div>
      </div>

      {/* Question Card Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="space-y-2">
          <Shimmer className="w-full h-6 rounded" />
          <Shimmer className="w-4/5 h-6 rounded" />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <Shimmer className="w-7 h-7 rounded-lg shrink-0" />
              <Shimmer className="w-2/3 h-4 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex items-center justify-between pt-2">
        <Shimmer className="w-28 h-10 rounded-xl" />
        <Shimmer className="w-32 h-10 rounded-xl" />
      </div>
    </div>
  );
}

export function CurriculumPageSkeleton() {
  return (
    <div data-testid="curriculum-skeleton" className="space-y-4 sm:space-y-6 max-w-4xl mx-auto animate-in fade-in duration-150">
      {/* Header Skeleton */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Shimmer className="w-20 h-4 rounded" />
          <Shimmer className="w-4 h-4 rounded" />
          <Shimmer className="w-28 h-4 rounded" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="space-y-1.5">
            <Shimmer className="w-48 sm:w-64 h-8 rounded-xl" />
            <Shimmer className="w-60 h-4 rounded" />
          </div>
          <div className="flex gap-2">
            <Shimmer className="w-24 h-8 rounded-xl" />
            <Shimmer className="w-24 h-8 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Chapters Skeleton */}
      <div className="space-y-3 sm:space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <Shimmer className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shrink-0" />
                <div className="space-y-1.5">
                  <Shimmer className="w-24 h-3.5 rounded" />
                  <Shimmer className="w-44 sm:w-64 h-5 rounded" />
                </div>
              </div>
              <div className="flex gap-2">
                <Shimmer className="w-28 h-8 rounded-xl" />
                <Shimmer className="w-24 h-8 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SubjectsPageSkeleton() {
  return (
    <div data-testid="subjects-skeleton" className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-150">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Shimmer className="w-40 h-8 rounded-xl" />
          <Shimmer className="w-72 h-4 rounded" />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Shimmer key={i} className="w-16 h-8 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Shimmer className="w-20 h-4 rounded-full" />
                <Shimmer className="w-36 h-6 rounded" />
              </div>
              <Shimmer className="w-10 h-10 rounded-xl" />
            </div>
            <Shimmer className="w-full h-2 rounded-full" />
            <div className="flex justify-between items-center pt-1">
              <Shimmer className="w-24 h-4 rounded" />
              <Shimmer className="w-28 h-8 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExamPageSkeleton() {
  return (
    <div data-testid="exam-skeleton" className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Exam Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <Shimmer className="w-28 h-3.5 rounded" />
          <Shimmer className="w-48 h-6 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <Shimmer className="w-28 h-9 rounded-xl" />
          <Shimmer className="w-24 h-9 rounded-xl" />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
        <Shimmer className="w-3/4 h-6 rounded" />
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Shimmer key={i} className="w-full h-12 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function GenericPageSkeleton() {
  return (
    <div data-testid="generic-skeleton" className="max-w-4xl mx-auto space-y-6 py-6 animate-in fade-in duration-150">
      <div className="space-y-2">
        <Shimmer className="w-48 h-8 rounded-xl" />
        <Shimmer className="w-72 h-4 rounded" />
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <Shimmer className="w-full h-6 rounded" />
        <Shimmer className="w-5/6 h-4 rounded" />
        <Shimmer className="w-2/3 h-4 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Shimmer className="h-28 rounded-xl" />
          <Shimmer className="h-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
