'use client';

import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BOARD_METADATA,
  PROGRAM_TRACK_METADATA,
  type BoardArchiveFiltersDTO,
  type BoardArchiveResponseDTO,
  type BoardQuestionItemDTO,
} from '@pori/shared';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { RichContentRenderer } from '@/components/content/rich-content-renderer';

const YEAR_PILLS: Array<{ value: string; label: string }> = [
  { value: 'ALL', label: 'সকল বছর' },
  { value: '2024+', label: '২০২৪+' },
  { value: '2025', label: '২০২৫' },
  { value: '2024', label: '২০২৪' },
  { value: '2023', label: '২০২৩' },
  { value: '2022', label: '২০২২' },
  { value: '2021', label: '২০২১' },
  { value: '2020', label: '২০২০' },
];

interface NormalizedCqSubItem {
  label: string;
  questionText: string;
  marks: number;
  modelAnswer?: string;
  markingCriteria?: string;
}

function normalizeCqSubItems(raw: any): NormalizedCqSubItem[] {
  if (!raw || typeof raw !== 'object') return [];
  if (Array.isArray(raw.subQuestions)) {
    return raw.subQuestions.map((sub: any) => ({
      label: String(sub?.label ?? ''),
      questionText: String(sub?.questionText ?? ''),
      marks: Number(sub?.marks ?? 0),
      modelAnswer: sub?.modelAnswer ? String(sub.modelAnswer) : undefined,
      markingCriteria: sub?.markingCriteria ? String(sub.markingCriteria) : undefined,
    }));
  }

  const keyMeta = [
    { key: 'ka', label: 'ক', defaultMarks: 1 },
    { key: 'kha', label: 'খ', defaultMarks: 2 },
    { key: 'ga', label: 'গ', defaultMarks: 3 },
    { key: 'gha', label: 'ঘ', defaultMarks: 4 },
  ];

  const items: NormalizedCqSubItem[] = [];
  for (const { key, label, defaultMarks } of keyMeta) {
    const val = raw[key];
    if (!val) continue;
    if (typeof val === 'string') {
      items.push({ label, questionText: val, marks: defaultMarks });
    } else if (typeof val === 'object') {
      items.push({
        label,
        questionText: String(val.questionText || val.criteria || ''),
        marks: Number(val.mark ?? val.marks ?? defaultMarks),
        modelAnswer: val.modelAnswer ? String(val.modelAnswer) : undefined,
        markingCriteria: val.criteria ? String(val.criteria) : undefined,
      });
    }
  }
  return items;
}

function BoardArchiveContent() {
  const [filters, setFilters] = useState<BoardArchiveFiltersDTO | null>(null);
  const [archive, setArchive] = useState<BoardArchiveResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedBoard, setSelectedBoard] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedProgram, setSelectedProgram] = useState<string>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});
  const [expandedRubrics, setExpandedRubrics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;
    apiClient
      .get<BoardArchiveFiltersDTO>('/board-archive/filters')
      .then((res) => {
        if (active) setFilters(res);
      })
      .catch(() => {
        // Facets fallback seamlessly to canonical lists
      });
    return () => {
      active = false;
    };
  }, []);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedBoard !== 'ALL') params.set('board', selectedBoard);
      if (selectedYear !== 'ALL') params.set('year', selectedYear);
      if (selectedProgram !== 'ALL') params.set('program', selectedProgram);
      if (selectedSubject !== 'ALL') params.set('subjectId', selectedSubject);
      if (selectedType !== 'ALL') params.set('type', selectedType);
      params.set('verifiedOnly', verifiedOnly ? 'true' : 'false');
      if (searchInput.trim()) params.set('search', searchInput.trim());
      params.set('page', String(page));
      params.set('limit', '15');

      const res = await apiClient.get<BoardArchiveResponseDTO>(
        `/board-archive/questions?${params.toString()}`,
      );
      setArchive(res);
    } catch (err: any) {
      setError(err?.message || 'বোর্ড প্রশ্ন লোড করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  }, [
    page,
    searchInput,
    selectedBoard,
    selectedProgram,
    selectedSubject,
    selectedType,
    selectedYear,
    verifiedOnly,
  ]);

  useEffect(() => {
    void fetchQuestions();
  }, [fetchQuestions]);

  const boardOptions = useMemo(() => {
    if (filters?.boards && filters.boards.length > 0) {
      return filters.boards;
    }
    return BOARD_METADATA.slice(0, 6).map((b) => ({
      key: b.key,
      labelBangla: b.labelBangla,
      labelEnglish: b.labelEnglish,
      count: 0,
    }));
  }, [filters]);

  const handleToggleExplanation = (qId: string) => {
    setExpandedExplanations((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleToggleRubric = (qId: string) => {
    setExpandedRubrics((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-8 rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 shadow-sm dark:border-emerald-900/60 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              যাচাইকৃত বোর্ড আর্কাইভ (২০২০–২০২৫+)
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              ভেরিফায়েড বোর্ড প্রশ্ন ব্যাংক
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              ঢাকা, রাজশাহী, চট্টগ্রাম ও অন্যান্য শিক্ষা বোর্ডের বিগত বছরের MCQ ও সৃজনশীল (CQ) প্রশ্ন বোর্ড, বছর ও বিষয় অনুযায়ী খুঁজুন এবং ৬-স্তরের ব্যাখ্যাসহ অনুশীলন করুন।
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/exam/rehearsal"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Sparkles className="h-4 w-4" />
              বহু-পত্র রিহার্সাল
            </Link>
            <Link
              href="/subjects"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <BookOpen className="h-4 w-4" />
              বিষয়সমূহ
            </Link>
          </div>
        </div>
      </header>

      {/* Filter Panel */}
      <section className="mb-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Filter className="h-4 w-4 text-emerald-600" />
            বোর্ড ও বছর ফিল্টার
          </div>
          {filters && (
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              মোট যাচাইকৃত প্রশ্ন: {filters.totalVerifiedQuestions}টি
            </span>
          )}
        </div>

        {/* Board Pills */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">শিক্ষা বোর্ড</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedBoard('ALL');
                setPage(1);
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedBoard === 'ALL'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              সকল বোর্ড
            </button>
            {boardOptions.map((board) => (
              <button
                key={board.key}
                type="button"
                onClick={() => {
                  setSelectedBoard(board.key);
                  setPage(1);
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  selectedBoard === board.key
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {board.labelBangla}
                {board.count > 0 ? ` (${board.count})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Year Pills */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">পরীক্ষার বছর</p>
          <div className="flex flex-wrap gap-2">
            {YEAR_PILLS.map((yr) => (
              <button
                key={yr.value}
                type="button"
                onClick={() => {
                  setSelectedYear(yr.value);
                  setPage(1);
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  selectedYear === yr.value
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {yr.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Controls */}
        <div className="grid gap-3 pt-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1);
              }}
              placeholder="প্রশ্ন বা টপিক খুঁজুন..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <select
            aria-label="প্রোগ্রাম ফিল্টার"
            value={selectedProgram}
            onChange={(e) => {
              setSelectedProgram(e.target.value);
              setSelectedSubject('ALL');
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="ALL">সকল প্রোগ্রাম</option>
            {PROGRAM_TRACK_METADATA.map((track) => (
              <option key={track.program} value={track.program}>
                {track.labelBangla}
              </option>
            ))}
          </select>

          <select
            aria-label="বিষয় ফিল্টার"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="ALL">সকল বিষয়</option>
            {(filters?.subjects || []).map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.nameBangla} ({sub.count})
              </option>
            ))}
          </select>

          <div className="flex items-center justify-between gap-2">
            <select
              aria-label="প্রশ্নের ধরন"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setPage(1);
              }}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="ALL">MCQ ও CQ সব</option>
              <option value="MCQ">শুধু MCQ</option>
              <option value="CQ_CREATIVE">সৃজনশীল (CQ)</option>
            </select>
            <label className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => {
                  setVerifiedOnly(e.target.checked);
                  setPage(1);
                }}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600"
              />
              ভেরিফায়েড
            </label>
          </div>
        </div>
      </section>

      {/* Results List */}
      {error && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
            />
          ))}
        </div>
      ) : !archive || archive.items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
            এই ফিল্টারে কোনো বোর্ড প্রশ্ন পাওয়া যায়নি
          </p>
          <p className="mt-1 text-sm text-slate-500">
            অন্য বোর্ড, বছর অথবা সকল প্রোগ্রাম নির্বাচন করে আবার চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {archive.items.map((q: BoardQuestionItemDTO, idx: number) => {
            const chosenOptionId = selectedOptions[q.id];
            const showExplanation = Boolean(expandedExplanations[q.id]);
            const showRubric = Boolean(expandedRubrics[q.id]);

            return (
              <article
                key={q.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {q.boardLabelBangla}
                      {q.boardYear ? ` ${q.boardYear}` : ''}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {q.subjectNameBangla}
                    </span>
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      {q.type === 'CQ_CREATIVE' ? 'সৃজনশীল (CQ)' : 'বহুনির্বাচনি (MCQ)'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    #{(archive.page - 1) * archive.limit + idx + 1} · {q.chapterTitleBangla}
                  </span>
                </div>

                <div className="prose prose-slate max-w-none text-base font-medium text-slate-900 dark:prose-invert dark:text-white">
                  <RichContentRenderer content={q.stem} />
                </div>

                {/* Interactive MCQ Options */}
                {q.type === 'MCQ' && Array.isArray(q.options) && q.options.length > 0 && (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = chosenOptionId === opt.id;
                      const isCorrect = opt.id === q.correctOption || opt.isCorrect === true;
                      let optionStyle =
                        'border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/40 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200';
                      if (chosenOptionId) {
                        if (isCorrect) {
                          optionStyle =
                            'border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-100';
                        } else if (isChosen) {
                          optionStyle =
                            'border-rose-500 bg-rose-50 text-rose-900 dark:border-rose-500 dark:bg-rose-950/50 dark:text-rose-100';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, [q.id]: opt.id }))
                          }
                          className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${optionStyle}`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-bold text-slate-500">
                              {['ক', 'খ', 'গ', 'ঘ'][optIdx] || optIdx + 1}.
                            </span>
                            <RichContentRenderer content={opt.text} />
                          </span>
                          {chosenOptionId && isCorrect && (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                          )}
                          {chosenOptionId && isChosen && !isCorrect && (
                            <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* CQ Rubric Reveal */}
                {q.type === 'CQ_CREATIVE' && normalizeCqSubItems(q.cqRubric).length > 0 && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleToggleRubric(q.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200"
                    >
                      নম্বর বণ্টন ও উত্তর দেখো
                      {showRubric ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {showRubric && (
                      <div className="mt-3 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                        {normalizeCqSubItems(q.cqRubric).map((sub, sIdx) => (
                          <div key={sIdx} className="border-b border-slate-200 pb-2 last:border-b-0 last:pb-0 dark:border-slate-700">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                              <span>
                                ({sub.label}) {sub.questionText}
                              </span>
                              <span className="rounded bg-slate-200 px-2 py-0.5 dark:bg-slate-700">
                                নম্বর: {sub.marks}
                              </span>
                            </div>
                            {sub.modelAnswer && (
                              <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                                <strong>উত্তর নির্দেশিকা:</strong> {sub.modelAnswer}
                              </p>
                            )}
                            {sub.markingCriteria && (
                              <p className="mt-0.5 text-xs text-slate-500">
                                <strong>মূল্যায়ন:</strong> {sub.markingCriteria}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Footer + 6-Layer Explanation */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleExplanation(q.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                    >
                      ব্যাখ্যা দেখো
                      {showExplanation ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <Link
                      href={`/practice/${q.topicId}`}
                      className="inline-flex items-center rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300"
                    >
                      টপিক প্র্যাকটিস
                    </Link>
                    {q.subjectId && (
                      <Link
                        href={`/exam/subject/${q.subjectId}`}
                        className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300"
                      >
                        মডেল টেস্ট
                      </Link>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{q.topicTitleBangla}</span>
                </div>

                {showExplanation && q.explanation && (
                  <div className="mt-3 space-y-2 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-slate-800 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-slate-200">
                    {q.explanation.directAnswer && (
                      <p>
                        <strong className="text-emerald-800 dark:text-emerald-300">সরাসরি উত্তর:</strong>{' '}
                        {q.explanation.directAnswer}
                      </p>
                    )}
                    {q.explanation.coreConcept && (
                      <p>
                        <strong>মূল ধারণা:</strong> {q.explanation.coreConcept}
                      </p>
                    )}
                    {q.explanation.stepDerivation && (
                      <p>
                        <strong>ধাপে ধাপে সমাধান:</strong> {q.explanation.stepDerivation}
                      </p>
                    )}
                    {q.explanation.proTipShortcut && (
                      <p className="rounded-lg bg-amber-100/70 px-2.5 py-1.5 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
                        <strong>প্রো টিপস:</strong> {q.explanation.proTipShortcut}
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}

          {archive.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                পূর্ববর্তী
              </button>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                পৃষ্ঠা {archive.page} / {archive.totalPages}
              </span>
              <button
                type="button"
                disabled={page >= archive.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                পরবর্তী
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default function BoardArchivePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="h-48 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />
        </div>
      }
    >
      <BoardArchiveContent />
    </Suspense>
  );
}
