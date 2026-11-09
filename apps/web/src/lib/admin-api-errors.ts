import { ApiError } from './api-client';

export function isHtmlPayload(value: string): boolean {
  return /^\s*</.test(value);
}

export function extractApiErrorMessage(data: unknown): string | null {
  if (data && typeof data === 'object' && 'message' in data) {
    const rawMessage = (data as { message?: unknown }).message;
    if (
      typeof rawMessage === 'string' &&
      rawMessage.trim() &&
      !isHtmlPayload(rawMessage)
    ) {
      return rawMessage.trim();
    }
    if (Array.isArray(rawMessage) && rawMessage.length > 0) {
      const joined = rawMessage
        .filter(
          (item): item is string =>
            typeof item === 'string' && item.trim().length > 0 && !isHtmlPayload(item),
        )
        .join(', ');
      if (joined) {
        return joined;
      }
    }
  } else if (typeof data === 'string' && data.trim() && !isHtmlPayload(data)) {
    return data.trim();
  }
  return null;
}

export interface AdminApiErrorMessages {
  unauthorized?: string;
  forbidden?: string;
  badRequest?: string;
  serverError?: string;
  unknown?: string;
}

const DEFAULT_UNAUTHORIZED = 'সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।';

export function formatAdminApiError(
  err: unknown,
  messages: AdminApiErrorMessages = {},
): string {
  const {
    unauthorized = DEFAULT_UNAUTHORIZED,
    forbidden = 'এই কাজটি করার অনুমতি নেই।',
    badRequest,
    serverError = 'সার্ভার ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
    unknown = serverError,
  } = messages;

  if (err instanceof ApiError) {
    if (err.status === 401) {
      return unauthorized;
    }
    if (err.status === 403) {
      return forbidden;
    }
    const extracted = extractApiErrorMessage(err.data);
    if (extracted) {
      return extracted;
    }
    if (err.status === 400 && badRequest) {
      return badRequest;
    }
    return serverError;
  }

  if (err instanceof Error && err.message.trim() && !isHtmlPayload(err.message)) {
    return err.message.trim();
  }

  return unknown;
}
