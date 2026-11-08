'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Send,
  Eye,
  Plus,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { apiClient } from '@/lib/api-client';
import { ContentStatus } from '@pori/shared';
import { useUserStore } from '@/store/user-store';

interface ContentItem {
  id: string;
  topicId: string;
  type: 'LESSON' | 'QUESTION';
  titleBangla: string;
  contentSnippet: string;
  status: ContentStatus;
  version: number;
  authorName?: string;
}

const SAMPLE_PENDING_CONTENT: ContentItem[] = [
  {
    id: 'lesson-draft-1',
    topicId: 'topic-motion-4',
    type: 'LESSON',
    titleBangla: 'পরন্ত বস্তুর সূত্রাবলী ও গ্যালিলিওর পরীক্ষা',
    contentSnippet: 'স্থির অবস্থান ও একই উচ্চতা হতে বিনা বাধায় পড়ন্ত সকল বস্তু সমান সময়ে সমান পথ অতিক্রম করে...',
    status: ContentStatus.REVIEW,
    version: 1,
    authorName: 'কনটেন্ট টিম ১',
  },
  {
    id: 'q-draft-2',
    topicId: 'topic-motion-3',
    type: 'QUESTION',
    titleBangla: 'গতির ৩য় সমীকরণের গাণিতিক প্রয়োগ',
    contentSnippet: '$v^2 = u^2 + 2as$ সমীকরণ ব্যবহার করে সর্বোচ্চ উচ্চতায় উঠার সময়...',
    status: ContentStatus.DRAFT,
    version: 1,
    authorName: 'সম্পাদক ২',
  },
  {
    id: 'lesson-draft-3',
    topicId: 'topic-force-2',
    type: 'LESSON',
    titleBangla: 'ভরবেগের নিত্যতা সূত্র ও বন্দুকের পশ্চাৎবেগ',
    contentSnippet: 'কোনো ব্যবস্থার উপর বাহ্যিক কোনো বল প্রযুক্ত না হলে ব্যবস্থাটির মোট ভরবেগ সংরক্ষিত থাকে...',
    status: ContentStatus.CORRECTION,
    version: 2,
    authorName: 'কনটেন্ট টিম ২',
  },
];

export default function AdminContentPage() {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState<ContentStatus | 'ALL'>('ALL');
  const [contentList, setContentList] = useState<ContentItem[]>(SAMPLE_PENDING_CONTENT);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(SAMPLE_PENDING_CONTENT[0]);
  
  // Reviewer form state
  const [reviewDecision, setReviewDecision] = useState<'APPROVED' | 'REQUEST_CHANGES' | 'REJECTED'>('APPROVED');
  const [reviewComments, setReviewComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Content Draft Form
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newFormulaText, setNewFormulaText] = useState('বল $F = ma$ এবং ত্বরণ $a = \\frac{v - u}{t}$');
  const [newType, setNewType] = useState<'LESSON' | 'QUESTION'>('LESSON');

  useEffect(() => {
    async function fetchPending() {
      try {
        const res = await apiClient.get<ContentItem[]>('/admin/content/pending');
        if (res && Array.isArray(res) && res.length > 0) {
          setContentList(res);
        }
      } catch {
        // Keep sample items
      }
    }
    fetchPending();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setIsSubmitting(true);
    try {
      await apiClient.post('/admin/content/review', {
        contentId: selectedItem.id,
        contentType: selectedItem.type,
        decision: reviewDecision,
        comments: reviewComments,
      });

      // Update state locally
      const updatedStatus =
        reviewDecision === 'APPROVED'
          ? ContentStatus.PUBLISHED
          : reviewDecision === 'REQUEST_CHANGES'
          ? ContentStatus.CORRECTION
          : ContentStatus.DRAFT;

      setContentList((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id ? { ...item, status: updatedStatus } : item
        )
      );
      if (selectedItem) {
        setSelectedItem({ ...selectedItem, status: updatedStatus });
      }
      setReviewComments('');
    } catch {
      // Local fallback for offline mode
      const updatedStatus =
        reviewDecision === 'APPROVED'
          ? ContentStatus.PUBLISHED
          : ContentStatus.CORRECTION;
      setContentList((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id ? { ...item, status: updatedStatus } : item
        )
      );
      if (selectedItem) {
        setSelectedItem({ ...selectedItem, status: updatedStatus });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newItem: ContentItem = {
      id: 'draft_' + Date.now(),
      topicId: 'topic-custom',
      type: newType,
      titleBangla: newTitle,
      contentSnippet: newFormulaText,
      status: ContentStatus.DRAFT,
      version: 1,
      authorName: user?.phoneNumber || 'বর্তমান সম্পাদক',
    };

    setContentList([newItem, ...contentList]);
    setSelectedItem(newItem);
    setShowNewModal(false);
    setNewTitle('');
  };

  const filteredContent = contentList.filter((item) => {
    if (activeTab === 'ALL') return true;
    return item.status === activeTab;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              এডমিনিস্ট্রেটিভ ওয়ার্কস্পেস
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
            কন্টেন্ট রিভিউ ও প্রকাশনা ওয়ার্কফ্লো
          </h1>
          <p className="text-sm text-slate-600">
            খসড়া থেকে সম্পাদকীয় যাচাই (Draft → Review → Publish) জীবনচক্র পরিচালনা করুন।
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কন্টেন্ট খসড়া করো</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { label: 'সবগুলো', value: 'ALL' },
          { label: 'খসড়া (Draft)', value: ContentStatus.DRAFT },
          { label: 'রিভিউ অপেক্ষায় (Review)', value: ContentStatus.REVIEW },
          { label: 'সংশোধন প্রয়োজন (Correction)', value: ContentStatus.CORRECTION },
          { label: 'প্রকাশিত (Published)', value: ContentStatus.PUBLISHED },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === tab.value
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Pending Content List */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-700 flex items-center justify-between">
            <span>কন্টেন্ট তালিকা</span>
            <span className="text-xs text-slate-400">({filteredContent.length}টি)</span>
          </h2>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredContent.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              let badgeColor = 'bg-slate-100 text-slate-700';
              if (item.status === ContentStatus.REVIEW) badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
              if (item.status === ContentStatus.PUBLISHED) badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
              if (item.status === ContentStatus.CORRECTION) badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {item.type} • v{item.version}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{item.titleBangla}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.contentSnippet}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Selected Content Preview & Review Action */}
        <div className="md:col-span-2 space-y-4">
          {selectedItem ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">
                    আইডি: {selectedItem.id}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedItem.titleBangla}</h2>
                  <div className="text-xs text-slate-500 mt-0.5">
                    রচয়িতা: {selectedItem.authorName || 'অজানা'}
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  বর্তমান স্ট্যাটাস: {selectedItem.status}
                </span>
              </div>

              {/* KaTeX Live Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>কন্টেন্ট ও LaTeX সমীকরণ লাইভ প্রিভিউ:</span>
                </span>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-900">
                  <LatexRenderer content={selectedItem.contentSnippet} />
                </div>
              </div>

              {/* Review Decision Form */}
              <form onSubmit={handleReviewSubmit} className="space-y-4 border-t border-slate-100 pt-4">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>সম্পাদকীয় সিদ্ধান্ত গ্রহণ ও যাচাই</span>
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setReviewDecision('APPROVED')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      reviewDecision === 'APPROVED'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    অনুমোদন (Publish)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewDecision('REQUEST_CHANGES')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      reviewDecision === 'REQUEST_CHANGES'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    সংশোধন অনুরোধ
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewDecision('REJECTED')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      reviewDecision === 'REJECTED'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    বাতিল (Reject)
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    রিভিউয়ার মন্তব্য / কারণ (ঐচ্ছিক)
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    placeholder="পাঠ্যবই রেফারেন্স ও গাণিতিক নির্ভুলতা সংক্রান্ত মন্তব্য..."
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>সিদ্ধান্ত সংরক্ষণ ও স্ট্যাটাস আপডেট করো</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-500 text-sm">
              বামদিকের তালিকা থেকে যেকোনো কন্টেন্ট নির্বাচন করুন।
            </div>
          )}
        </div>
      </div>

      {/* Modal: New Content Draft */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900">নতুন কন্টেন্ট খসড়া তৈরি করুন</h3>

            <form onSubmit={handleCreateDraft} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ধরন</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                >
                  <option value="LESSON">লেসন (Lesson)</option>
                  <option value="QUESTION">MCQ প্রশ্ন (Question)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">শিরোনাম</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="যেমন: নিউটনের ৩য় গতিসূত্র"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  মূল টেক্সট ও LaTeX সমীকরণ ($...$ অথবা $$...$$)
                </label>
                <textarea
                  rows={4}
                  required
                  value={newFormulaText}
                  onChange={(e) => setNewFormulaText(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500">তাৎক্ষণিক প্রিভিউ:</span>
                <div className="text-xs text-slate-800 mt-1">
                  <LatexRenderer content={newFormulaText} />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow"
                >
                  খসড়া সংরক্ষণ করো
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
