import type { StudyPlanTaskDTO } from '@pori/shared';

export function formatLocalDateIso(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDueTasks(
  tasks: StudyPlanTaskDTO[],
  todayIso: string = formatLocalDateIso(),
): StudyPlanTaskDTO[] {
  return (tasks || []).filter(
    (task) => !task.completed && Boolean(task.scheduledDate) && task.scheduledDate <= todayIso,
  );
}

export function getUpcomingReminders(
  tasks: StudyPlanTaskDTO[],
  todayIso: string = formatLocalDateIso(),
): StudyPlanTaskDTO[] {
  return (tasks || []).filter(
    (task) =>
      !task.completed &&
      Boolean(task.reminderTime) &&
      Boolean(task.scheduledDate) &&
      task.scheduledDate === todayIso,
  );
}

export async function requestReminderPermission(): Promise<
  NotificationPermission | 'unsupported'
> {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

export function notifyDueTask(task: StudyPlanTaskDTO): void {
  if (
    typeof window === 'undefined' ||
    typeof Notification === 'undefined' ||
    Notification.permission !== 'granted'
  ) {
    return;
  }
  try {
    new Notification('poRi স্টাডি রিমাইন্ডার', {
      body: task.titleBangla,
    });
  } catch {
    // Ignore notification restrictions inside non-secure contexts
  }
}
