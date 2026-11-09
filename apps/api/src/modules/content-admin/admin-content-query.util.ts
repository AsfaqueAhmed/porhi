import { BadRequestException } from '@nestjs/common';
import { ContentStatus, Prisma } from '@prisma/client';

export const CONTENT_HIERARCHY_INCLUDE = {
  topic: {
    select: {
      id: true,
      titleBangla: true,
      chapter: {
        select: {
          id: true,
          titleBangla: true,
          subject: {
            select: {
              id: true,
              code: true,
              nameBangla: true,
            },
          },
        },
      },
    },
  },
} as const;

export interface BaseContentListQuery {
  subjectId?: unknown;
  chapterId?: unknown;
  topicId?: unknown;
  status?: unknown;
  includeArchived?: unknown;
  search?: unknown;
  page?: unknown;
  limit?: unknown;
}

export function validateBaseListQuery(query: BaseContentListQuery) {
  if (!query || typeof query !== 'object' || Array.isArray(query)) {
    throw new BadRequestException('Query must be an object');
  }

  const stringFilterFields = [
    'subjectId',
    'chapterId',
    'topicId',
    'search',
    'page',
    'limit',
  ] as const;

  for (const field of stringFilterFields) {
    if (query[field] !== undefined && typeof query[field] !== 'string') {
      throw new BadRequestException(`${field} must be a string`);
    }
  }

  const validStatuses = Object.values(ContentStatus) as string[];
  if (
    query.status !== undefined &&
    (typeof query.status !== 'string' || !validStatuses.includes(query.status))
  ) {
    throw new BadRequestException('Invalid status filter');
  }

  if (
    query.includeArchived !== undefined &&
    (typeof query.includeArchived !== 'string' ||
      !['true', 'false'].includes(query.includeArchived))
  ) {
    throw new BadRequestException('includeArchived must be true or false');
  }

  if (query.page !== undefined && !/^\d+$/.test(query.page as string)) {
    throw new BadRequestException('page must be a non-negative integer string');
  }

  if (query.limit !== undefined && !/^\d+$/.test(query.limit as string)) {
    throw new BadRequestException('limit must be a non-negative integer string');
  }
}

export function buildTopicFilter(query: {
  chapterId?: string;
  subjectId?: string;
}): Prisma.TopicWhereInput | undefined {
  const topicFilter: Prisma.TopicWhereInput = {};
  if (query.chapterId?.trim()) {
    topicFilter.chapterId = query.chapterId.trim();
  }
  if (query.subjectId?.trim()) {
    topicFilter.chapter = { subjectId: query.subjectId.trim() };
  }
  return Object.keys(topicFilter).length > 0 ? topicFilter : undefined;
}

export function parseListPagination(query: { page?: string; limit?: string }) {
  const parsedLimit = Number.parseInt(query.limit ?? '20', 10);
  const limit =
    Number.isFinite(parsedLimit) && parsedLimit >= 1 ? Math.min(100, parsedLimit) : 20;
  const MAX_INT32 = 2_147_483_647;
  const maxPage = Math.floor(MAX_INT32 / limit) + 1;
  const parsedPage = Number.parseInt(query.page ?? '1', 10);
  const page =
    Number.isFinite(parsedPage) && parsedPage >= 1
      ? Math.min(maxPage, parsedPage)
      : parsedPage === Infinity
        ? maxPage
        : 1;
  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

export function aggregateStatusCounts(
  groupedCounts: Array<{ status: ContentStatus; _count: { _all: number } }>,
) {
  const statusCounts = {
    ALL: 0,
    DRAFT: 0,
    REVIEW: 0,
    CORRECTION: 0,
    PUBLISHED: 0,
    ARCHIVED: 0,
  };

  for (const row of groupedCounts) {
    const count = row._count._all;
    if (row.status === ContentStatus.DRAFT) {
      statusCounts.DRAFT += count;
      statusCounts.ALL += count;
    } else if (row.status === ContentStatus.REVIEW) {
      statusCounts.REVIEW += count;
      statusCounts.ALL += count;
    } else if (row.status === ContentStatus.CORRECTION) {
      statusCounts.CORRECTION += count;
      statusCounts.ALL += count;
    } else if (row.status === ContentStatus.PUBLISHED) {
      statusCounts.PUBLISHED += count;
      statusCounts.ALL += count;
    } else if (row.status === ContentStatus.ARCHIVED) {
      statusCounts.ARCHIVED += count;
    }
  }

  return statusCounts;
}
