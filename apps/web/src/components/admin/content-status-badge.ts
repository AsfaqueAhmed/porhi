import type { Language } from '@/lib/i18n/translations';

export function getContentStatusBadge(status: string, lang: Language = 'bn'): {
  label: string;
  className: string;
} {
  switch (status) {
    case 'PUBLISHED':
      return {
        label: lang === 'en' ? 'Published' : 'প্রকাশিত (PUBLISHED)',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    case 'REVIEW':
      return {
        label: lang === 'en' ? 'In Review' : 'রিভিউ (REVIEW)',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    case 'CORRECTION':
      return {
        label: lang === 'en' ? 'Correction' : 'সংশোধন (CORRECTION)',
        className: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    case 'ARCHIVED':
      return {
        label: lang === 'en' ? 'Archived' : 'আর্কাইভড (ARCHIVED)',
        className: 'bg-slate-200 text-slate-600 border-slate-300',
      };
    default:
      return {
        label: lang === 'en' ? 'Draft' : 'খসড়া (DRAFT)',
        className: 'bg-slate-100 text-slate-700 border-slate-200',
      };
  }
}

export function formatAdminDateTime(value?: Date | string | null, lang: Language = 'bn'): string {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return '—';
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  try {
    return date.toLocaleString(lang === 'en' ? 'en-US' : 'bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return date.toISOString();
  }
}
