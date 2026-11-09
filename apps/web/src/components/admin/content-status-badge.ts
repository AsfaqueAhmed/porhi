export function getContentStatusBadge(status: string): {
  label: string;
  className: string;
} {
  switch (status) {
    case 'PUBLISHED':
      return {
        label: 'প্রকাশিত (PUBLISHED)',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    case 'REVIEW':
      return {
        label: 'রিভিউ (REVIEW)',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    case 'CORRECTION':
      return {
        label: 'সংশোধন (CORRECTION)',
        className: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    case 'ARCHIVED':
      return {
        label: 'আর্কাইভড (ARCHIVED)',
        className: 'bg-slate-200 text-slate-600 border-slate-300',
      };
    default:
      return {
        label: 'খসড়া (DRAFT)',
        className: 'bg-slate-100 text-slate-700 border-slate-200',
      };
  }
}

export function formatAdminDateTime(value?: Date | string | null): string {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return '—';
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  try {
    return date.toLocaleString('bn-BD', {
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
