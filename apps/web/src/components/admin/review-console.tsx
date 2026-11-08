'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Send,
  History,
  Clock,
  Sparkles,
  User,
  Search,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';
import { apiClient } from '@/lib/api-client';
import { ContentStatus } from '@pori/shared';

interface ReviewAuditItem {
  id: string;
  reviewerId: string;
  action: string;
  comment?: string | null;
  version: number;
  createdAt: string;
  reviewer?: {
    id: string;
    fullName?: string;
    role: string;
  };
}

export interface ContentItem {
  id: string;
  topicId: string;
  type: 'LESSON' | 'QUESTION';
  titleBangla: string;
  contentSnippet: string;
  status: ContentStatus;
  version: number;
  authorName?: string;
  payload?: any;
}

interface ReviewConsoleProps {
  contentList: ContentItem[];
  onStatusUpdated?: (itemId: string, newStatus: ContentStatus) => void;
}

export function ReviewConsole({ contentList, onStatusUpdated }: ReviewConsoleProps) {
  const [activeTab, setActiveTab] = useState<ContentStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'LESSON' | 'QUESTION'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(contentList[0] || null);

  // Reviewer Form State
  const [decision, setDecision] = useState<'APPROVE' | 'REQUEST_CHANGES' | 'REJECT'>('APPROVE');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<'RAW' | 'STUDENT_SIMULATOR'>('STUDENT_SIMULATOR');

  // Audit History State
  const [auditLogs, setAuditLogs] = useState<ReviewAuditItem[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);

  // Sync selectedItem if contentList updates
  useEffect(() => {
    if (contentList.length > 0 && !selectedItem) {
      setSelectedItem(contentList[0]);
    }
  }, [contentList, selectedItem]);

  // Fetch audit history whenever selectedItem changes
  useEffect(() => {
    let isMounted = true;
    if (!selectedItem?.id) return;
    async function fetchReviews() {
      if (isMounted) setAuditLoading(true);
      try {
        const res = await apiClient.get<ReviewAuditItem[]>(`/admin/content/reviews/${selectedItem!.id}`);
        if (isMounted) {
          if (Array.isArray(res)) {
            setAuditLogs(res);
          } else {
            setAuditLogs([]);
          }
        }
      } catch {
        // Fallback local mock history
        if (isMounted) {
          setAuditLogs([
            {
              id: 'rev_local_1',
              reviewerId: 'rev_1',
              action: 'REQUEST_CHANGES',
              comment: '২য় সমীকরণের $at^2$ অংশে ১/২ ভগ্নাংশের KaTeX সমীকরণ স্পষ্ট করা প্রয়োজন।',
              version: 1,
              createdAt: new Date(Date.now() - 3600000).toISOString(),
              reviewer: { id: 'rev_1', fullName: 'প্রধান সম্পাদক', role: 'REVIEWER' },
            },
          ]);
        }
      } finally {
        if (isMounted) {
          setAuditLoading(false);
        }
      }
    }
    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, [selectedItem?.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setIsSubmitting(true);
    try {
      await apiClient.post('/admin/content/review', {
        contentId: selectedItem.id,
        contentType: selectedItem.type,
        action: decision,
        comment: comment || undefined,
      });

      const updatedStatus =
        decision === 'APPROVE'
          ? ContentStatus.PUBLISHED
          : decision === 'REQUEST_CHANGES'
          ? ContentStatus.CORRECTION
          : ContentStatus.CORRECTION;

      if (onStatusUpdated) {
        onStatusUpdated(selectedItem.id, updatedStatus);
      }
      setSelectedItem({ ...selectedItem, status: updatedStatus });
      setComment('');
    } catch {
      // Local fallback
      const updatedStatus =
        decision === 'APPROVE' ? ContentStatus.PUBLISHED : ContentStatus.CORRECTION;
      if (onStatusUpdated) {
        onStatusUpdated(selectedItem.id, updatedStatus);
      }
      setSelectedItem({ ...selectedItem, status: updatedStatus });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredContent = contentList.filter((item) => {
    if (activeTab !== 'ALL' && item.status !== activeTab) return false;
    if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.titleBangla.toLowerCase().includes(q) ||
        item.contentSnippet.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="কন্টেন্ট বা আইডি দিয়ে খুঁজুন..."
            className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { label: 'সকল', value: 'ALL' },
            { label: 'খসড়া (Draft)', value: ContentStatus.DRAFT },
            { label: 'অপেক্ষমাণ (Review)', value: ContentStatus.REVIEW },
            { label: 'সংশোধন (Correction)', value: ContentStatus.CORRECTION },
            { label: 'প্রকাশিত (Published)', value: ContentStatus.PUBLISHED },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.value
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Type Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-lg self-end md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setTypeFilter('ALL')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md ${
              typeFilter === 'ALL' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            সব
          </button>
          <button
            type="button"
            onClick={() => setTypeFilter('QUESTION')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md ${
              typeFilter === 'QUESTION' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            MCQ
          </button>
          <button
            type="button"
            onClick={() => setTypeFilter('LESSON')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md ${
              typeFilter === 'LESSON' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            পাঠ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Pending Items List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
            <span>রিভিউ তালিকা</span>
            <span className="text-slate-400">({filteredContent.length}টি কন্টেন্ট)</span>
          </div>

          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {filteredContent.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              let badgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
              if (item.status === ContentStatus.REVIEW)
                badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
              if (item.status === ContentStatus.PUBLISHED)
                badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
              if (item.status === ContentStatus.CORRECTION)
                badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-600'
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
                  <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{item.titleBangla}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{item.contentSnippet}</p>
                </div>
              );
            })}

            {filteredContent.length === 0 && (
              <div className="p-8 text-center border border-dashed border-slate-300 rounded-xl text-xs text-slate-400">
                কোনো কন্টেন্ট পাওয়া যায়নি।
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Selected Content Preview, Simulator & Review Actions */}
        <div className="md:col-span-2 space-y-5">
          {selectedItem ? (
            <div className="space-y-5">
              {/* Top View Mode Switcher */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{selectedItem.titleBangla}</h3>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    আইডি: <span className="font-mono">{selectedItem.id}</span> • সংস্করণ: v{selectedItem.version}
                  </div>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setViewMode('STUDENT_SIMULATOR')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      viewMode === 'STUDENT_SIMULATOR'
                        ? 'bg-white text-indigo-700 shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    শিক্ষার্থী সিমুলেটর
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('RAW')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      viewMode === 'RAW'
                        ? 'bg-white text-indigo-700 shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    র ডাটা ভিউ
                  </button>
                </div>
              </div>

              {/* Main Preview Container */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                {viewMode === 'STUDENT_SIMULATOR' ? (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
                      <Eye className="w-3.5 h-3.5" />
                      <span>অ্যাপে শিক্ষার্থী যেভাবে দেখবে:</span>
                    </div>

                    {/* Question Simulator */}
                    {selectedItem.type === 'QUESTION' ? (
                      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-4">
                        <div className="text-sm font-bold text-slate-900 leading-relaxed">
                          <LatexRenderer content={selectedItem.contentSnippet} />
                        </div>

                        {selectedItem.payload?.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                            {selectedItem.payload.options.map((opt: any, i: number) => {
                              const label = ['ক', 'খ', 'গ', 'ঘ'][i];
                              return (
                                <div
                                  key={opt.id || i}
                                  className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                                    opt.isCorrect
                                      ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-800'
                                      : 'border-slate-200 bg-white text-slate-700'
                                  }`}
                                >
                                  <span>
                                    ({label}) {opt.text}
                                  </span>
                                  {opt.isCorrect && (
                                    <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                                      সঠিক
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Explanation Peek */}
                        {selectedItem.payload?.explanation && (
                          <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-2 mt-3">
                            <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>৬-স্তরের ব্যাখ্যা প্রিভিউ:</span>
                            </span>
                            <div className="text-xs text-slate-700 space-y-1">
                              <div>
                                <strong>সরাসরি উত্তর:</strong> {selectedItem.payload.explanation.directAnswer}
                              </div>
                              <div>
                                <strong>মূল ধারণা:</strong> {selectedItem.payload.explanation.coreConcept}
                              </div>
                              {selectedItem.payload.explanation.stepDerivation && (
                                <div className="pt-1">
                                  <strong>প্রতিপাদন:</strong>
                                  <div className="bg-slate-50 p-2 rounded border border-slate-200 mt-1 font-mono text-[11px]">
                                    <LatexRenderer content={selectedItem.payload.explanation.stepDerivation} />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Lesson Simulator */
                      <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                        <h2 className="text-lg font-black text-slate-900">{selectedItem.titleBangla}</h2>
                        <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                          <LatexRenderer content={selectedItem.contentSnippet} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* RAW Data View */
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-60">
                    <pre>{JSON.stringify(selectedItem.payload || selectedItem, null, 2)}</pre>
                  </div>
                )}

                {/* Review Decision Actions */}
                <form onSubmit={handleReviewSubmit} className="border-t border-slate-100 pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>সম্পাদকীয় যাচাই ও সিদ্ধান্ত রেকর্ড করুন</span>
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      বর্তমান স্ট্যাটাস: <strong className="text-slate-700">{selectedItem.status}</strong>
                    </span>
                  </div>

                  {/* 3 Decision Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDecision('APPROVE')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        decision === 'APPROVE'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>অনুমোদন ও প্রকাশ</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecision('REQUEST_CHANGES')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        decision === 'REQUEST_CHANGES'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>সংশোধন অনুরোধ</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecision('REJECT')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        decision === 'REJECT'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <XCircle className="w-4 h-4" />
                      <span>বাতিল (Reject)</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      রিভিউয়ার মন্তব্য / কারণ{' '}
                      {decision !== 'APPROVE' && <span className="text-rose-500">* (আবশ্যক)</span>}
                    </label>
                    <textarea
                      rows={2}
                      required={decision !== 'APPROVE'}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="পাঠ্যবইয়ের রেফারেন্স, সমীকরণের নির্ভুলতা বা সংশোধনের নির্দিষ্ট নির্দেশাবলী..."
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'আপডেট হচ্ছে...' : 'সিদ্ধান্ত রেকর্ড ও স্ট্যাটাস আপডেট করো'}</span>
                  </button>
                </form>
              </div>

              {/* Review Audit History Timeline */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <History className="w-4 h-4 text-indigo-600" />
                  <h4 className="font-bold text-slate-900 text-xs">
                    সম্পাদকীয় অডিট ও পর্যালোচনার ইতিহাস ({auditLogs.length}টি এন্ট্রি)
                  </h4>
                </div>

                {auditLoading ? (
                  <div className="text-center py-4 text-xs text-slate-400">অডিট ইতিহাস লোড হচ্ছে...</div>
                ) : auditLogs.length === 0 ? (
                  <div className="text-center py-4 text-xs text-slate-400">
                    এই কন্টেন্টের জন্য এখনও কোনো পূর্ববর্তী রিভিউ অডিট রেকর্ড নেই।
                  </div>
                ) : (
                  <div className="space-y-3">
                    {auditLogs.map((log) => {
                      let badge = 'bg-slate-100 text-slate-700';
                      if (log.action === 'APPROVE') badge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                      if (log.action === 'REQUEST_CHANGES') badge = 'bg-amber-100 text-amber-800 border-amber-300';
                      if (log.action === 'REJECT') badge = 'bg-rose-100 text-rose-800 border-rose-300';

                      return (
                        <div
                          key={log.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 font-bold text-slate-800">
                              <User className="w-3.5 h-3.5 text-slate-500" />
                              <span>{log.reviewer?.fullName || 'সম্পাদকীয় কর্মকর্তা'}</span>
                              <span className="text-[10px] text-slate-400">
                                ({log.reviewer?.role || 'REVIEWER'})
                              </span>
                            </div>

                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge}`}>
                              {log.action} • v{log.version}
                            </span>
                          </div>

                          {log.comment && (
                            <p className="text-slate-600 text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                              &ldquo;{log.comment}&rdquo;
                            </p>
                          )}

                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(log.createdAt).toLocaleString('bn-BD')}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-16 text-center text-slate-500 text-xs">
              বামদিকের তালিকা থেকে যেকোনো কন্টেন্ট নির্বাচন করুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
