'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  AlertTriangle,
  FolderTree,
  PenTool,
  BarChart3,
  Sparkles,
  FileText,
  UserCheck,
  Trophy,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { ContentStatus } from '@pori/shared';
import { ReviewConsole, ContentItem } from '@/components/admin/review-console';
import { AuthoringStudio } from '@/components/admin/authoring-studio';
import { CurriculumManager } from '@/components/admin/curriculum-manager';
import { ModelTestManager } from '@/components/admin/model-test-manager';

const INITIAL_FALLBACK_CONTENT: ContentItem[] = [
  {
    id: 'lesson-draft-1',
    topicId: 'top_ssc_physics_motion_eq',
    type: 'LESSON',
    titleBangla: 'পরন্ত বস্তুর সূত্রাবলী ও গ্যালিলিওর পরীক্ষা',
    contentSnippet: 'স্থির অবস্থান ও একই উচ্চতা হতে বিনা বাধায় পড়ন্ত সকল বস্তু সমান সময়ে সমান পথ অতিক্রম করে: $$h = \\frac{1}{2}gt^2$$',
    status: ContentStatus.REVIEW,
    version: 1,
    authorName: 'কনটেন্ট টিম ১',
  },
  {
    id: 'q-draft-2',
    topicId: 'top_ssc_physics_motion_eq',
    type: 'QUESTION',
    titleBangla: 'গতির ৩য় সমীকরণের গাণিতিক প্রয়োগ',
    contentSnippet: 'একটি বস্তু $10\\text{ ms}^{-1}$ আদিবেগে যাত্রা শুরু করে $2\\text{ ms}^{-2}$ সুষম ত্বরণে চললে $50\\text{ m}$ অতিক্রম করার পর এর শেষ বেগ কত হবে?',
    status: ContentStatus.DRAFT,
    version: 1,
    authorName: 'সম্পাদক ২',
    payload: {
      options: [
        { id: 'opt_1', text: '10 ms⁻¹', isCorrect: false },
        { id: 'opt_2', text: '17.32 ms⁻¹', isCorrect: true },
        { id: 'opt_3', text: '25 ms⁻¹', isCorrect: false },
        { id: 'opt_4', text: '30 ms⁻¹', isCorrect: false },
      ],
      explanation: {
        directAnswer: '17.32 ms⁻¹ (সঠিক উত্তর খ)',
        coreConcept: 'গতির ৩য় সমীকরণ: $v^2 = u^2 + 2as$',
        stepDerivation: '$v^2 = 10^2 + 2(2)(50) = 100 + 200 = 300 \\implies v = \\sqrt{300} \\approx 17.32\\text{ ms}^{-1}$',
      },
    },
  },
  {
    id: 'lesson-draft-3',
    topicId: 'top_ssc_physics_motion_eq',
    type: 'LESSON',
    titleBangla: 'ভরবেগের নিত্যতা সূত্র ও বন্দুকের পশ্চাৎবেগ',
    contentSnippet: 'কোনো ব্যবস্থার ওপর বাহ্যিক বল প্রযুক্ত না হলে মোট ভরবেগ অপরিবর্তিত থাকে: $$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$$',
    status: ContentStatus.CORRECTION,
    version: 2,
    authorName: 'কনটেন্ট টিম ২',
  },
];

type AdminTab =
  | 'CURRICULUM_TREE'
  | 'AUTHORING_STUDIO'
  | 'MODEL_TEST_MANAGER'
  | 'REVIEW_QUEUE'
  | 'OVERVIEW_STATS';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('CURRICULUM_TREE');
  const [simulatedRole, setSimulatedRole] = useState<'ADMIN' | 'EDITOR' | 'REVIEWER'>('ADMIN');
  const [contentList, setContentList] = useState<ContentItem[]>(INITIAL_FALLBACK_CONTENT);
  const [, setLoading] = useState(false);

  // Authoring studio pre-fill state
  const [targetTopicId, setTargetTopicId] = useState<string | undefined>();
  const [targetSubjectId, setTargetSubjectId] = useState<string | undefined>();
  const [authoringType, setAuthoringType] = useState<'MCQ' | 'LESSON' | 'CQ'>('MCQ');

  const fetchPendingContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<any>('/admin/content/pending');
      let items: ContentItem[] = [];
      if (Array.isArray(res)) {
        items = res;
      } else if (res && (res.lessons || res.questions)) {
        const mappedLessons = (res.lessons || []).map((l: any) => ({
          id: l.id,
          type: 'LESSON' as const,
          titleBangla: l.titleBangla,
          contentSnippet: l.explanation?.slice(0, 120) + '...',
          topicId: l.topicId,
          status: l.status as ContentStatus,
          version: l.version || 1,
          authorName: 'সম্পাদকীয় গবেষক',
          payload: l,
        }));
        const mappedQuestions = (res.questions || []).map((q: any) => ({
          id: q.id,
          type: 'QUESTION' as const,
          titleBangla: q.stem?.slice(0, 50) + '...',
          contentSnippet: q.stem,
          topicId: q.topicId,
          status: q.status as ContentStatus,
          version: q.version || 1,
          authorName: 'প্রশ্ন লেখক',
          payload: q,
        }));
        items = [...mappedLessons, ...mappedQuestions];
      }
      if (items.length > 0) {
        setContentList(items);
      }
    } catch {
      // Retain fallback items
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingContent();
  }, [fetchPendingContent]);

  const handleStatusUpdated = (itemId: string, newStatus: ContentStatus) => {
    setContentList((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item))
    );
  };

  // Model Test pre-fill state
  const [targetChapterForModelTest, setTargetChapterForModelTest] = useState<string | undefined>();
  const [targetSubjectForModelTest, setTargetSubjectForModelTest] = useState<string | undefined>();

  const handleNavigateToAuthoring = (topicId: string, subjectId: string, type: 'MCQ' | 'LESSON') => {
    setTargetTopicId(topicId);
    setTargetSubjectId(subjectId);
    setAuthoringType(type);
    setActiveTab('AUTHORING_STUDIO');
  };

  const handleNavigateToModelTest = (chapterId: string, subjectId: string) => {
    setTargetChapterForModelTest(chapterId);
    setTargetSubjectForModelTest(subjectId);
    setActiveTab('MODEL_TEST_MANAGER');
  };

  // KPI Calculations
  const draftCount = contentList.filter((c) => c.status === ContentStatus.DRAFT).length;
  const reviewCount = contentList.filter((c) => c.status === ContentStatus.REVIEW).length;
  const correctionCount = contentList.filter((c) => c.status === ContentStatus.CORRECTION).length;
  const publishedCount = contentList.filter((c) => c.status === ContentStatus.PUBLISHED).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Header & Role Simulator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black bg-indigo-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>poRi Content Hub</span>
            </span>
            <span className="text-xs text-slate-400">NCTB 2026 কমপ্লিট কন্ট্রোল সিস্টেম</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-1.5">
            কারিকুলাম, প্রশ্ন ও মডেল টেস্ট কন্ট্রোল সেন্টার
          </h1>
          <p className="text-xs md:text-sm text-slate-600">
            বিষয় ব্যবস্থাপনা, অধ্যায়ভিত্তিক সেকশন, টপিকভিত্তিক ৬-স্তরের প্রশ্ন ও অধ্যায় মডেল টেস্ট পরিচালনা করুন।
          </p>
        </div>

        {/* Role Simulator Switcher */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold pl-1">
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">সক্রিয় ভূমিকা:</span>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['ADMIN', 'REVIEWER', 'EDITOR'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSimulatedRole(r)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                  simulatedRole === r
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">মোট খসড়া</div>
            <div className="text-xl font-black text-slate-900">{draftCount}টি</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">রিভিউ অপেক্ষমাণ</div>
            <div className="text-xl font-black text-amber-600">{reviewCount}টি</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">সংশোধন আবশ্যক</div>
            <div className="text-xl font-black text-rose-600">{correctionCount}টি</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">অনুমোদিত ও সচল</div>
            <div className="text-xl font-black text-emerald-600">{publishedCount}টি</div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('CURRICULUM_TREE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CURRICULUM_TREE'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FolderTree className="w-4 h-4 text-amber-400" />
          <span>বিষয়, অধ্যায় ও টপিক সেকশন</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('AUTHORING_STUDIO')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'AUTHORING_STUDIO'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <PenTool className="w-4 h-4 text-emerald-400" />
          <span>টপিকভিত্তিক প্রশ্ন ও লেসন লেখক</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('MODEL_TEST_MANAGER')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'MODEL_TEST_MANAGER'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Trophy className="w-4 h-4 text-orange-400" />
          <span>অধ্যায়ভিত্তিক মডেল টেস্ট সেকশন</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('REVIEW_QUEUE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'REVIEW_QUEUE'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-indigo-400" />
          <span>সম্পাদকীয় রিভিউ কিউ ({contentList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('OVERVIEW_STATS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'OVERVIEW_STATS'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>সিলেবাস কভারেজ ও মেট্রিক্স</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'CURRICULUM_TREE' && (
        <CurriculumManager
          onNavigateToAuthoring={handleNavigateToAuthoring}
          onNavigateToModelTest={handleNavigateToModelTest}
        />
      )}

      {activeTab === 'AUTHORING_STUDIO' && (
        <AuthoringStudio
          initialTopicId={targetTopicId}
          initialSubjectId={targetSubjectId}
          initialContentType={authoringType}
          onContentCreated={() => {
            fetchPendingContent();
            setActiveTab('REVIEW_QUEUE');
          }}
        />
      )}

      {activeTab === 'MODEL_TEST_MANAGER' && (
        <ModelTestManager
          initialSubjectId={targetSubjectForModelTest}
          initialChapterId={targetChapterForModelTest}
        />
      )}

      {activeTab === 'REVIEW_QUEUE' && (
        <ReviewConsole
          contentList={contentList}
          onStatusUpdated={handleStatusUpdated}
        />
      )}

      {activeTab === 'OVERVIEW_STATS' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>NCTB 2026 পাইলট সিলেবাস কভারেজ অ্যানালিটিক্স</span>
            </h2>

            <div className="space-y-4">
              {/* SSC Physics Motion Chapter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">
                    SSC পদার্থবিজ্ঞান ➔ ২য় অধ্যায়: গতি (Motion)
                  </span>
                  <span className="text-indigo-600 font-bold">১০০% সম্পন্ন</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>লেসন: ৪টি সমীকরণ, গুরুত্বপূর্ণ পরিভাষা ও উদাহরণ</span>
                  <span>MCQ: ৬-স্তরের পূর্ণ ব্যাখ্যাসহ প্রস্তুত</span>
                </div>
              </div>

              {/* SSC Physics Measurement Chapter */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">
                    SSC পদার্থবিজ্ঞান ➔ ১ম অধ্যায়: ভৌত রাশি ও পরিমাপ
                  </span>
                  <span className="text-amber-600 font-bold">৬০% খসড়া তৈরি</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-3/5" />
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>পরিমাপের একক ও ত্রুটি</span>
                  <span>রিভিউ অপেক্ষমাণ</span>
                </div>
              </div>

              {/* SSC Chemistry Placeholder */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">SSC রসায়ন (Chemistry)</span>
                  <span className="text-slate-400 font-bold">০% (শীঘ্রই আসছে)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full w-0" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>৬-স্তরের গুণগত মান নিশ্চিতকরণ</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                প্রতিটি অনুমোদিত প্রশ্নে অবশ্যই সরাসরি উত্তর, মূল ধারণা, গাণিতিক প্রতিপাদন, অপশনভিত্তিক বিশ্লেষণ, পাঠ্যবই রেফারেন্স এবং সময় বাঁচানোর শর্টকাট কৌশল থাকতে হবে।
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>সম্পাদকীয় সততা ও অডিট ট্রেইল</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                প্রতিটি প্রকাশনা ও সংশোধন সিদ্ধান্ত ডাটাবেজে স্থায়ীভাবে সংরক্ষণ করা হয়। কোনো প্রশ্ন বা লেসন পর্যালোচনার আগে কোনো তথ্য প্রকাশ করা যায় না।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
