'use client';

import React, { Suspense } from 'react';
import { ShieldCheck } from 'lucide-react';
import { ReviewConsole } from '../../../components/admin/review-console';

function ReviewsContent() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>এডিটোরিয়াল রিভিউ ও অডিট কনসোল</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            পেন্ডিং অনুমোদন কিউ, স্টুডেন্ট সিমুলেটর প্রিভিউ ও এডিটোরিয়াল হিস্ট্রি পরিচালনা করুন।
          </p>
        </div>
      </div>

      <ReviewConsole />
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">
          রিভিউ কনসোল লোড হচ্ছে...
        </div>
      }
    >
      <ReviewsContent />
    </Suspense>
  );
}
