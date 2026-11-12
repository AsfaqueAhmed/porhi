'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type {
  MultiExamRehearsalDTO,
  RehearsalPaperInputDTO,
  SubjectDTO,
} from '@pori/shared';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Coffee,
  Layers,
  Play,
  Plus,
  Trash2,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { ensureGuestSession } from '@/lib/guest-session';
import { RichContentRenderer } from '@/components/content/rich-content-renderer';

interface ActivePaperSession {
  sessionId: string;
  totalQuestions: number;
  durationSeconds: number;
  negativeRatio: number;
  questions: Array<{
    id: string;
    stem: string;
    options: Array<{ id: string; text: string }>;
  }>;
}

interface StartOrContinueRehearsalResponse {
  rehearsal: MultiExamRehearsalDTO;
  activeSession: ActivePaperSession | null;
}

function formatSeconds(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const mins = Math.floor(safe / 60);
  const rem = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export default function ExamRehearsalPage() {
  const [subjects, setSubjects] = useState<SubjectDTO[]>([]);
  const [history, setHistory] = useState<MultiExamRehearsalDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [rehearsal, setRehearsal] = useState<MultiExamRehearsalDTO | null>(null);
  const [activeSession, setActiveSession] = useState<ActivePaperSession | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Custom builder state
  const [customTitle, setCustomTitle] = useState('কাস্টম বহু-পত্র মক টেস্ট');
  const [customPapers, setCustomPapers] = useState<RehearsalPaperInputDTO[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await ensureGuestSession();
        const [subjRes, histRes] = await Promise.all([
          apiClient.get<SubjectDTO[]>('/curriculum/subjects'),
          apiClient.get<MultiExamRehearsalDTO[]>('/exam/rehearsal/history').catch(() => []),
        ]);
        if (!active) return;
        const readySubjects = Array.isArray(subjRes)
          ? subjRes.filter((s) => s.isReady !== false)
          : [];
        setSubjects(readySubjects);
        setHistory(Array.isArray(histRes) ? histRes : []);

        if (readySubjects.length >= 2) {
          setCustomPapers([
            {
              subjectId: readySubjects[0].id,
              labelBangla: `পত্র ১: ${readySubjects[0].nameBangla}`,
              questionCount: 5,
              durationMinutes: 5,
            },
            {
              subjectId: readySubjects[1].id,
              labelBangla: `পত্র ২: ${readySubjects[1].nameBangla}`,
              questionCount: 5,
              durationMinutes: 5,
            },
          ]);
        }
      } catch (err: any) {
        if (active) setError(err?.message || 'রিহার্সাল সেটআপ লোড করা যায়নি।');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Independent countdown timer for currently active paper
  useEffect(() => {
    if (!rehearsal || rehearsal.status !== 'IN_PROGRESS' || !activeSession) {
      return;
    }
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [rehearsal?.status, activeSession?.sessionId]);

  const subjectByCode = useMemo(() => {
    const map = new Map<string, SubjectDTO>();
    for (const s of subjects) {
      map.set(s.code, s);
      map.set(s.id, s);
    }
    return map;
  }, [subjects]);

  const sscPhysics = subjectByCode.get('ssc_physics');
  const sscChemistry = subjectByCode.get('ssc_chemistry');
  const hscPhysics = subjectByCode.get('hsc_physics_1');
  const admissionPhysics = subjectByCode.get('admission_ka_physics');
  const bcsSubject = subjectByCode.get('bcs_preliminary');

  const launchRehearsal = async (
    titleBangla: string,
    program: string,
    papers: RehearsalPaperInputDTO[],
  ) => {
    setSubmitting(true);
    setError(null);
    try {
      await ensureGuestSession();
      const res = await apiClient.post<StartOrContinueRehearsalResponse>(
        '/exam/rehearsal/start',
        {
          titleBangla,
          program,
          papers,
        },
      );
      setRehearsal(res.rehearsal);
      setActiveSession(res.activeSession);
      setAnswers({});
      setTimeLeft(res.activeSession?.durationSeconds ?? 300);
    } catch (err: any) {
      setError(err?.message || 'রিহার্সাল শুরু করা যায়নি।');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitActivePaper = async () => {
    if (!rehearsal || !activeSession) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        answers: activeSession.questions.map((q) => ({
          questionId: q.id,
          selectedOptionId: answers[q.id] ?? null,
          timeSpent: 15,
        })),
      };
      const res = await apiClient.post<{ rehearsal: MultiExamRehearsalDTO }>(
        `/exam/rehearsal/${rehearsal.id}/paper/${rehearsal.currentPaperIndex}/submit`,
        payload,
      );
      setRehearsal(res.rehearsal);
      setActiveSession(null);
      setAnswers({});
    } catch (err: any) {
      setError(err?.message || 'পত্র জমা দিতে সমস্যা হয়েছে।');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartNextPaper = async () => {
    if (!rehearsal) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await apiClient.post<StartOrContinueRehearsalResponse>(
        `/exam/rehearsal/${rehearsal.id}/paper/${rehearsal.currentPaperIndex}/start`,
        {},
      );
      setRehearsal(res.rehearsal);
      setActiveSession(res.activeSession);
      setAnswers({});
      setTimeLeft(res.activeSession?.durationSeconds ?? 300);
    } catch (err: any) {
      setError(err?.message || 'পরবর্তী পত্র শুরু করা যায়নি।');
    } finally {
      setSubmitting(false);
    }
  };

  const activePaper = rehearsal?.papers?.[rehearsal.currentPaperIndex];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
            <Layers className="h-3.5 w-3.5" />
            মাল্টি-পেপার টাইমড রিহার্সাল
          </span>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            বহু-পত্র মডেল টেস্ট রিহার্সাল
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            আসল পরীক্ষার মতো আলাদা সময়সীমায় একাধিক পত্র ধারাবাহিকভাবে অনুশীলন করুন (পত্র ১ → বিরতি → পত্র ২ → সম্মিলিত বিশ্লেষণ)।
          </p>
        </div>
        {rehearsal && (
          <button
            type="button"
            onClick={() => {
              setRehearsal(null);
              setActiveSession(null);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            নতুন রিহার্সাল সেটআপ
          </button>
        )}
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </div>
      )}

      {/* Paper Stepper when inside a rehearsal */}
      {rehearsal && (
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {rehearsal.titleBangla}
              </h2>
              <p className="text-xs text-slate-500">
                মোট {rehearsal.papers.length}টি পত্র · প্রতিটি পত্রের জন্য স্বতন্ত্র টাইমার
              </p>
            </div>
            {rehearsal.status === 'IN_PROGRESS' && (
              <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2 text-sm font-bold text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                <Clock className="h-4 w-4" />
                <span>{formatSeconds(timeLeft)}</span>
              </div>
            )}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {rehearsal.papers.map((paper) => {
              const isSubmitted = paper.status === 'SUBMITTED';
              const isActive = paper.status === 'ACTIVE';
              return (
                <div
                  key={paper.paperIndex}
                  className={`rounded-xl border p-3 text-xs ${
                    isActive
                      ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40'
                      : isSubmitted
                        ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30'
                        : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>{paper.labelBangla}</span>
                    {isSubmitted && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                  </div>
                  <p className="mt-1 text-slate-500">
                    {paper.questionCount} প্রশ্ন · {paper.durationMinutes} মিনিট
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Setup Mode */}
      {!rehearsal && !loading && (
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-2">
            {sscPhysics && sscChemistry && (
              <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-white p-5 shadow-sm dark:border-indigo-900 dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900">
                <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
                  SSC বিজ্ঞান কম্বো
                </span>
                <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                  SSC বিজ্ঞান ডাবল পেপার
                </h2>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  পত্র ১: পদার্থবিজ্ঞান (১০ মিনিট) + পত্র ২: রসায়ন (১০ মিনিট)। প্রতিটি পত্রের পর বিরতি।
                </p>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    launchRehearsal('SSC বিজ্ঞান ডাবল পেপার', 'SSC', [
                      {
                        subjectId: sscPhysics.id,
                        labelBangla: 'পত্র ১: পদার্থবিজ্ঞান',
                        questionCount: 10,
                        durationMinutes: 10,
                      },
                      {
                        subjectId: sscChemistry.id,
                        labelBangla: 'পত্র ২: রসায়ন',
                        questionCount: 10,
                        durationMinutes: 10,
                      },
                    ])
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Play className="h-4 w-4" />
                  SSC বিজ্ঞান ডাবল পেপার শুরু করো
                </button>
              </div>
            )}

            {(hscPhysics || admissionPhysics || bcsSubject) && (
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-white p-5 shadow-sm dark:border-emerald-900 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900">
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">
                  ভর্তি ও উচ্চমাধ্যমিক ট্র্যাক
                </span>
                <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                  HSC + Admission স্প্রিন্ট রিহার্সাল
                </h2>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  স্বল্প সময়ে নির্ভুল সমাধানের জন্য উচ্চমাধ্যমিক ও ভর্তি প্রস্তুতির ধারাবাহিক মক।
                </p>
                <button
                  type="button"
                  disabled={submitting || subjects.length < 2}
                  onClick={() => {
                    const p1 = hscPhysics || subjects[0];
                    const p2 = admissionPhysics || bcsSubject || subjects[1];
                    if (p1 && p2) {
                      void launchRehearsal('HSC ও ভর্তি স্প্রিন্ট রিহার্সাল', p1.program || 'HSC', [
                        {
                          subjectId: p1.id,
                          labelBangla: `পত্র ১: ${p1.nameBangla}`,
                          questionCount: 5,
                          durationMinutes: 8,
                        },
                        {
                          subjectId: p2.id,
                          labelBangla: `পত্র ২: ${p2.nameBangla}`,
                          questionCount: 5,
                          durationMinutes: 8,
                        },
                      ]);
                    }
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  <Play className="h-4 w-4" />
                  HSC + Admission রিহার্সাল শুরু করো
                </button>
              </div>
            )}
          </section>

          {/* Custom Multi-Paper Builder */}
          {customPapers.length >= 2 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  নিজের মতো বহু-পত্র রিহার্সাল তৈরি করো
                </h3>
                {customPapers.length < 4 && (
                  <button
                    type="button"
                    onClick={() => {
                      const fallbackSub = subjects[customPapers.length % subjects.length];
                      if (!fallbackSub) return;
                      setCustomPapers((prev) => [
                        ...prev,
                        {
                          subjectId: fallbackSub.id,
                          labelBangla: `পত্র ${prev.length + 1}: ${fallbackSub.nameBangla}`,
                          questionCount: 5,
                          durationMinutes: 5,
                        },
                      ]);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    আরও পত্র যোগ করো
                  </button>
                )}
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="রিহার্সালের শিরোনাম..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="mt-4 space-y-3">
                {customPapers.map((paper, idx) => (
                  <div
                    key={idx}
                    className="grid items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:grid-cols-4 dark:border-slate-700 dark:bg-slate-800/40"
                  >
                    <select
                      aria-label={`পত্র ${idx + 1} বিষয়`}
                      value={paper.subjectId}
                      onChange={(e) => {
                        const chosen = subjects.find((s) => s.id === e.target.value);
                        setCustomPapers((prev) =>
                          prev.map((item, pIdx) =>
                            pIdx === idx
                              ? {
                                  ...item,
                                  subjectId: e.target.value,
                                  labelBangla: `পত্র ${idx + 1}: ${chosen?.nameBangla || ''}`,
                                }
                              : item,
                          ),
                        );
                      }}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                    >
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.nameBangla}
                        </option>
                      ))}
                    </select>

                    <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      প্রশ্ন:
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={paper.questionCount}
                        onChange={(e) =>
                          setCustomPapers((prev) =>
                            prev.map((item, pIdx) =>
                              pIdx === idx
                                ? { ...item, questionCount: Number(e.target.value) || 5 }
                                : item,
                            ),
                          )
                        }
                        className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      মিনিট:
                      <input
                        type="number"
                        min={1}
                        max={120}
                        value={paper.durationMinutes}
                        onChange={(e) =>
                          setCustomPapers((prev) =>
                            prev.map((item, pIdx) =>
                              pIdx === idx
                                ? { ...item, durationMinutes: Number(e.target.value) || 5 }
                                : item,
                            ),
                          )
                        }
                        className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>

                    <div className="flex justify-end">
                      {customPapers.length > 2 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCustomPapers((prev) => prev.filter((_, pIdx) => pIdx !== idx))
                          }
                          className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          aria-label="পত্র সরান"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                disabled={submitting}
                onClick={() => launchRehearsal(customTitle, 'CUSTOM', customPapers)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700"
              >
                <Play className="h-4 w-4" />
                কাস্টম রিহার্সাল শুরু করো
              </button>
            </section>
          )}

          {/* History */}
          {history.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                সাম্প্রতিক রিহার্সাল রেকর্ড
              </h3>
              <div className="mt-3 space-y-2">
                {history.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-800/50"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {item.titleBangla}
                      </p>
                      <p className="text-slate-500">{item.papers.length}টি পত্র</p>
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-200">
                      {item.status === 'COMPLETED'
                        ? `সমাপ্ত · ${item.totalScore ?? 0} / ${item.totalMarks}`
                        : 'চলমান'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Active Paper Runner */}
      {rehearsal?.status === 'IN_PROGRESS' && activeSession && activePaper && (
        <section className="space-y-5">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 px-4 py-3 text-xs font-semibold text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-200">
            চলমান পত্র: {activePaper.labelBangla} ({activeSession.totalQuestions}টি প্রশ্ন)
          </div>

          {activeSession.questions.map((q, qIdx) => (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 flex items-start gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">
                  {qIdx + 1}
                </span>
                <div className="flex-1">
                  <RichContentRenderer content={q.stem} />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                      className={`rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                        selected
                          ? 'border-indigo-600 bg-indigo-50 font-semibold text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-100'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200'
                      }`}
                    >
                      <RichContentRenderer content={opt.text} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmitActivePaper}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
            >
              এই পত্র জমা দাও
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Intermission Screen */}
      {rehearsal?.status === 'INTERMISSION' && (
        <section className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-indigo-50 p-8 text-center shadow-sm dark:border-amber-900/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200">
            <Coffee className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
            বিরতি ও পরবর্তী পত্রের প্রস্তুতি
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            পূর্ববর্তী পত্র সফলভাবে জমা হয়েছে! একটু শ্বাস নিন এবং প্রস্তুত হলে পরবর্তী পত্রের স্বতন্ত্র টাইমার চালু করুন।
          </p>

          <div className="mx-auto mt-5 max-w-md space-y-2 text-left">
            {rehearsal.papers.map((p) => (
              <div
                key={p.paperIndex}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-800"
              >
                <span className="font-semibold">{p.labelBangla}</span>
                {p.status === 'SUBMITTED' ? (
                  <span className="font-bold text-emerald-600">
                    স্কোর: {p.score} / {p.totalMarks}
                  </span>
                ) : (
                  <span className="text-indigo-600 font-semibold">অপেক্ষমাণ ({p.durationMinutes} মি.)</span>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={handleStartNextPaper}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            পরবর্তী পত্র শুরু করো ({rehearsal.papers[rehearsal.currentPaperIndex]?.labelBangla})
          </button>
        </section>
      )}

      {/* Combined Multi-Paper Score Report */}
      {rehearsal?.status === 'COMPLETED' && (
        <section className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-900 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  সম্মিলিত রিহার্সাল ফলাফল
                </h2>
                <p className="text-xs text-slate-500">{rehearsal.titleBangla}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-5 py-3 text-center dark:bg-emerald-950/50">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">মোট স্কোর</p>
              <p className="text-2xl font-extrabold text-emerald-900 dark:text-white">
                {rehearsal.totalScore ?? 0} / {rehearsal.totalMarks}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {rehearsal.papers.map((paper) => {
              const total = paper.totalMarks || paper.questionCount || 1;
              const pct = Math.max(0, Math.round(((paper.score ?? 0) / total) * 100));
              return (
                <div
                  key={paper.paperIndex}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {paper.labelBangla}
                    </h3>
                    <span className="text-sm font-bold text-emerald-600">{pct}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <span>
                      সঠিক: {paper.correctCount ?? 0} · ভুল: {paper.wrongCount ?? 0}
                    </span>
                    {paper.sessionId && (
                      <Link
                        href={`/exam/result/${paper.sessionId}`}
                        className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300"
                      >
                        পত্রের সমাধান দেখো
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
