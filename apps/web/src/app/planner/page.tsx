'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Sparkles,
  Plus,
  Bell,
  Trash2,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import type { StudyPlanTaskDTO } from '@pori/shared';
import { apiClient } from '@/lib/api-client';
import { ensureGuestSession } from '@/lib/guest-session';
import { useUserStore } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import { toBanglaDigits } from '@/lib/formatters';
import {
  formatLocalDateIso,
  getDueTasks,
  requestReminderPermission,
  notifyDueTask,
} from '@/lib/reminders';

function getTaskLaunchHref(task: StudyPlanTaskDTO, fallbackSubjectId: string): string | null {
  if (task.topicId) return `/lesson/${task.topicId}`;
  if (task.chapterId) return `/practice/${task.chapterId}`;
  if (task.targetType === 'MODEL_TEST') {
    return `/exam/subject/${task.subjectId || fallbackSubjectId}`;
  }
  return null;
}

export default function PlannerPage() {
  const {
    activeSubject,
    studyPlanTasks,
    setStudyPlanTasks,
    addStudyPlanTask,
    toggleStudyPlanTask,
    removeStudyPlanTask,
  } = useUserStore();
  const { tr, language } = useLanguageStore();
  const subjectId = activeSubject?.id || 'sub_ssc_physics';
  const todayIso = formatLocalDateIso();

  const [titleBangla, setTitleBangla] = useState('');
  const [scheduledDate, setScheduledDate] = useState(todayIso);
  const [reminderTime, setReminderTime] = useState('18:00');
  const [targetType, setTargetType] = useState<'LESSON' | 'PRACTICE' | 'MODEL_TEST' | 'REVISION' | 'CUSTOM'>('CUSTOM');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [notifStatus, setNotifStatus] = useState<string>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  useEffect(() => {
    let active = true;
    async function loadPlanner() {
      setIsLoading(true);
      try {
        await Promise.resolve(ensureGuestSession()).catch(() => {});
        const res = await Promise.resolve(
          apiClient.get<{ tasks?: StudyPlanTaskDTO[] }>('/planner')
        ).catch(() => null);
        if (active && res && Array.isArray(res.tasks)) {
          setStudyPlanTasks(res.tasks);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }
    loadPlanner();
    return () => {
      active = false;
    };
  }, [setStudyPlanTasks]);

  const dueTasks = useMemo(() => getDueTasks(studyPlanTasks, todayIso), [studyPlanTasks, todayIso]);
  const upcomingTasks = useMemo(
    () =>
      studyPlanTasks.filter(
        (task) => !task.completed && task.scheduledDate > todayIso
      ),
    [studyPlanTasks, todayIso]
  );
  const completedTasks = useMemo(
    () => studyPlanTasks.filter((task) => task.completed),
    [studyPlanTasks]
  );

  const handleEnableNotifications = async () => {
    const permission = await requestReminderPermission();
    setNotifStatus(permission);
    if (permission === 'granted' && dueTasks[0]) {
      notifyDueTask(dueTasks[0]);
      setStatusMessage(
        tr('ব্রাউজার রিমাইন্ডার চালু করা হয়েছে।', 'Browser study reminders enabled.')
      );
    } else if (permission === 'unsupported') {
      setStatusMessage(
        tr('এই ব্রাউজারে নোটিফিকেশন সমর্থিত নয়; অ্যাপের ভেতরেই রিমাইন্ডার দেখাবে।', 'System notifications unavailable; in-app reminders stay active.')
      );
    }
  };

  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    setStatusMessage(null);
    try {
      await Promise.resolve(ensureGuestSession()).catch(() => {});
      const res = await apiClient.post<{
        createdCount: number;
        tasks: StudyPlanTaskDTO[];
      }>('/planner/auto-generate', {
        subjectId,
        startDate: todayIso,
      });
      if (res && Array.isArray(res.tasks) && res.tasks.length > 0) {
        const mergedMap = new Map<string, StudyPlanTaskDTO>();
        for (const t of studyPlanTasks) mergedMap.set(t.id, t);
        for (const t of res.tasks) mergedMap.set(t.id, t);
        setStudyPlanTasks(Array.from(mergedMap.values()));
        setStatusMessage(
          language === 'bn'
            ? `${toBanglaDigits(res.tasks.length)}টি স্মার্ট স্টাডি লক্ষ্য যুক্ত হয়েছে।`
            : `Added ${res.tasks.length} smart study tasks.`
        );
      } else {
        setStatusMessage(
          tr('সব সক্রিয় টপিক ইতিমধ্যেই তোমার রুটিনে রয়েছে!', 'All active topics are already scheduled!')
        );
      }
    } catch {
      const localAuto: StudyPlanTaskDTO = {
        id: `local_task_${Date.now()}`,
        subjectId,
        titleBangla: `${activeSubject?.nameBangla || 'পদার্থবিজ্ঞান'} — দৈনিক রিভিশন`,
        scheduledDate: todayIso,
        reminderTime: '18:00',
        targetType: 'REVISION',
        completed: false,
      };
      addStudyPlanTask(localAuto);
      setStatusMessage(
        tr('অফলাইনে একটি দৈনিক রিভিশন লক্ষ্য তৈরি করা হয়েছে।', 'Added offline daily revision goal.')
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = titleBangla.trim();
    if (!cleanTitle) return;

    const payload = {
      titleBangla: cleanTitle,
      scheduledDate,
      reminderTime: reminderTime || undefined,
      targetType,
      subjectId,
    };

    try {
      await Promise.resolve(ensureGuestSession()).catch(() => {});
      const created = await apiClient.post<StudyPlanTaskDTO>('/planner', payload);
      if (created && created.id) {
        addStudyPlanTask(created);
      } else {
        addStudyPlanTask({ id: `local_task_${Date.now()}`, ...payload, completed: false });
      }
    } catch {
      addStudyPlanTask({ id: `local_task_${Date.now()}`, ...payload, completed: false });
    }

    setTitleBangla('');
    setStatusMessage(tr('নতুন লক্ষ্য রুটিনে যোগ করা হয়েছে।', 'Task added to your study plan.'));
  };

  const handleToggleTask = async (task: StudyPlanTaskDTO) => {
    const nextCompleted = !task.completed;
    toggleStudyPlanTask(task.id);
    if (!task.id.startsWith('local_task_')) {
      try {
        await Promise.resolve(
          apiClient.patch(`/planner/${task.id}`, { completed: nextCompleted })
        ).catch(() => {});
      } catch {
        // Optimistic update stays in store
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    removeStudyPlanTask(taskId);
    if (!taskId.startsWith('local_task_')) {
      try {
        await Promise.resolve(apiClient.delete(`/planner/${taskId}`)).catch(() => {});
      } catch {
        // Already removed from store
      }
    }
  };

  const renderTaskCard = (task: StudyPlanTaskDTO) => {
    const launchHref = getTaskLaunchHref(task, subjectId);
    return (
      <div
        key={task.id}
        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
          task.completed
            ? 'bg-emerald-50/60 border-emerald-200'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-start gap-3 min-w-0">
          <input
            type="checkbox"
            checked={Boolean(task.completed)}
            onChange={() => handleToggleTask(task)}
            aria-label={task.titleBangla}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <div className="min-w-0">
            <p
              className={`text-sm font-bold ${
                task.completed ? 'line-through text-slate-500' : 'text-slate-900'
              }`}
            >
              {task.titleBangla}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="w-3 h-3 text-indigo-600" />
                {language === 'bn' ? toBanglaDigits(task.scheduledDate) : task.scheduledDate}
              </span>
              {task.reminderTime && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600" />
                  {language === 'bn' ? toBanglaDigits(task.reminderTime) : task.reminderTime}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-700">
                {task.targetType}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {launchHref && !task.completed && (
            <Link
              href={launchHref}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
            >
              <span>{tr('শুরু করো', 'Start')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => handleDeleteTask(task.id)}
            aria-label={tr('মুছে ফেলো', 'Delete Task')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{tr('দৈনিক ও সাপ্তাহিক স্টাডি প্ল্যানার', 'Daily & Weekly Study Planner')}</span>
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
            {tr('স্টাডি রুটিন ও রিমাইন্ডার', 'Study Routine & Reminders')}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            {tr(
              'ভুল প্রশ্ন ও বাকি টপিকগুলো অনুযায়ী ৭ দিনের রুটিন সাজাও এবং দৈনিক রিমাইন্ডার সেট করো।',
              'Organize a 7-day study schedule around weak topics and set daily reminders.'
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleEnableNotifications}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4 text-amber-600" />
            <span>
              {notifStatus === 'granted'
                ? tr('রিমাইন্ডার সক্রিয়', 'Reminders On')
                : tr('রিমাইন্ডার চালু করো', 'Enable Reminders')}
            </span>
          </button>

          <button
            type="button"
            onClick={handleAutoGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs disabled:opacity-60 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {isGenerating
                ? tr('তৈরি হচ্ছে...', 'Generating...')
                : tr('স্মার্ট ৭-দিনের রুটিন তৈরি করো', 'Auto-Generate 7-Day Plan')}
            </span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between">
          <span>{statusMessage}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-indigo-700 font-bold hover:underline"
          >
            ✕
          </button>
        </div>
      )}

      {/* Custom Task Form */}
      <form
        onSubmit={handleCreateTask}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3"
      >
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-4 h-4 text-indigo-600" />
          <span>{tr('নিজে নতুন পড়ার লক্ষ্য যোগ করো', 'Add Custom Study Goal')}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <input
            type="text"
            value={titleBangla}
            onChange={(e) => setTitleBangla(e.target.value)}
            placeholder={tr(
              'আজকের পড়ার লক্ষ্য লিখো (যেমন: গতির সমীকরণ রিভিশন)...',
              'Enter study goal (e.g. Revise Equations of Motion)...'
            )}
            className="md:col-span-5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            aria-label={tr('তারিখ', 'Scheduled Date')}
            className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            aria-label={tr('সময়', 'Reminder Time')}
            className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value as any)}
            aria-label={tr('ধরন', 'Task Type')}
            className="md:col-span-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="CUSTOM">{tr('সাধারণ লক্ষ্য', 'Custom')}</option>
            <option value="LESSON">{tr('লেসন পড়া', 'Lesson')}</option>
            <option value="PRACTICE">{tr('MCQ অনুশীলন', 'Practice')}</option>
            <option value="REVISION">{tr('ভুল রিভিশন', 'Revision')}</option>
            <option value="MODEL_TEST">{tr('মডেল টেস্ট', 'Model Test')}</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{tr('নতুন লক্ষ্য যোগ করো', 'Add Study Goal')}</span>
          </button>
        </div>
      </form>

      {/* Due Today */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            {tr('আজকের ও বকেয়া রুটিন', 'Due Today & Overdue')} (
            {language === 'bn' ? toBanglaDigits(dueTasks.length) : dueTasks.length})
          </h2>
          {isLoading && (
            <span className="text-[11px] text-slate-400">{tr('লোড হচ্ছে...', 'Syncing...')}</span>
          )}
        </div>
        {dueTasks.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            {tr(
              'আজকের কোনো বাকি লক্ষ্য নেই। স্মার্ট ৭-দিনের রুটিন তৈরি করে শুরু করতে পারো!',
              'No overdue or due tasks today. Try generating a 7-day plan above!'
            )}
          </p>
        ) : (
          <div className="space-y-2.5">{dueTasks.map(renderTaskCard)}</div>
        )}
      </div>

      {/* Upcoming Week */}
      {upcomingTasks.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            {tr('আসন্ন দিনের রুটিন', 'Upcoming Schedule')} (
            {language === 'bn' ? toBanglaDigits(upcomingTasks.length) : upcomingTasks.length})
          </h2>
          <div className="space-y-2.5">{upcomingTasks.map(renderTaskCard)}</div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
          <h2 className="text-base font-bold text-emerald-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              {tr('সম্পন্ন হওয়া লক্ষ্য', 'Completed Goals')} (
              {language === 'bn' ? toBanglaDigits(completedTasks.length) : completedTasks.length})
            </span>
          </h2>
          <div className="space-y-2.5">{completedTasks.map(renderTaskCard)}</div>
        </div>
      )}
    </div>
  );
}
