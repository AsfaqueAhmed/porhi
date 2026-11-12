import { Inject, Injectable } from '@nestjs/common';
import { ContentStatus } from '@prisma/client';
import {
  BOARD_METADATA,
  BoardArchiveFiltersDTO,
  BoardArchiveResponseDTO,
  BoardFacetItemDTO,
  BoardKey,
  BoardQuestionItemDTO,
  BoardSubjectFacetDTO,
  YearFacetItemDTO,
  matchesBoardYearFilter,
  parseBoardSource,
} from '@pori/shared';
import { PrismaService } from '../../database/prisma.service';

export interface BoardArchiveQuery {
  board?: string;
  year?: string;
  program?: string;
  subjectId?: string;
  chapterId?: string;
  type?: string;
  verifiedOnly?: string;
  search?: string;
  page?: string;
  limit?: string;
}

@Injectable()
export class BoardArchiveService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  private extractCorrectOption(options: unknown): string | null {
    if (!Array.isArray(options)) {
      return null;
    }
    const correct = options.find(
      (opt: any) => opt && typeof opt === 'object' && opt.isCorrect === true && typeof opt.id === 'string',
    );
    return correct?.id ?? null;
  }

  private async loadPublishedNormalizedQuestions(): Promise<BoardQuestionItemDTO[]> {
    const rawQuestions = await this.prisma.question.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
      },
      include: {
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
                    program: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    return rawQuestions.map((q: any): BoardQuestionItemDTO => {
      const parsed = parseBoardSource(q.boardSource);
      const subject = q.topic?.chapter?.subject;
      const isVerifiedBoard = Boolean(q.isVerified) && parsed.isVerifiedBoard;

      return {
        id: q.id,
        topicId: q.topicId,
        type: q.type,
        stem: q.stem,
        options: Array.isArray(q.options) ? q.options : null,
        correctOption: this.extractCorrectOption(q.options),
        explanation: q.explanation ?? null,
        cqRubric: q.cqRubric ?? null,
        difficulty: q.difficulty ?? 'MEDIUM',
        boardSource: q.boardSource ?? null,
        boardKey: parsed.boardKey,
        boardKeys: parsed.boardKeys,
        boardLabelBangla: parsed.boardLabelBangla,
        boardYear: parsed.year,
        isVerifiedBoard,
        subjectId: subject?.id ?? '',
        subjectCode: subject?.code ?? '',
        subjectNameBangla: subject?.nameBangla ?? '',
        program: subject?.program ?? 'SSC',
        chapterId: q.topic?.chapter?.id ?? '',
        chapterTitleBangla: q.topic?.chapter?.titleBangla ?? '',
        topicTitleBangla: q.topic?.titleBangla ?? '',
      };
    });
  }

  async getFilters(): Promise<BoardArchiveFiltersDTO> {
    const allItems = await this.loadPublishedNormalizedQuestions();
    const verifiedItems = allItems.filter((item) => item.isVerifiedBoard);

    const boardCounts = new Map<BoardKey, number>();
    const yearCounts = new Map<number, number>();
    const subjectMap = new Map<string, BoardSubjectFacetDTO>();

    for (const item of verifiedItems) {
      for (const bKey of item.boardKeys) {
        if (bKey !== 'OTHER') {
          boardCounts.set(bKey, (boardCounts.get(bKey) ?? 0) + 1);
        }
      }
      if (item.boardYear !== null) {
        yearCounts.set(item.boardYear, (yearCounts.get(item.boardYear) ?? 0) + 1);
      }
      if (item.subjectId) {
        const existing = subjectMap.get(item.subjectId);
        if (existing) {
          existing.count += 1;
        } else {
          subjectMap.set(item.subjectId, {
            id: item.subjectId,
            code: item.subjectCode,
            nameBangla: item.subjectNameBangla,
            program: item.program,
            count: 1,
          });
        }
      }
    }

    const boards: BoardFacetItemDTO[] = BOARD_METADATA.map((meta) => ({
      key: meta.key,
      labelBangla: meta.labelBangla,
      labelEnglish: meta.labelEnglish,
      count: boardCounts.get(meta.key) ?? 0,
    })).filter((item) => item.count > 0);

    const years: YearFacetItemDTO[] = Array.from(yearCounts.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => b.year - a.year);

    const subjects = Array.from(subjectMap.values()).sort((a, b) =>
      a.nameBangla.localeCompare(b.nameBangla),
    );

    return {
      boards,
      years,
      subjects,
      totalVerifiedQuestions: verifiedItems.length,
    };
  }

  async getQuestions(query: BoardArchiveQuery = {}): Promise<BoardArchiveResponseDTO> {
    const allItems = await this.loadPublishedNormalizedQuestions();
    const requireVerified = query.verifiedOnly !== 'false';
    const boardFilter = query.board?.trim().toUpperCase();
    const programFilter = query.program?.trim().toUpperCase();
    const typeFilter = query.type?.trim().toUpperCase();
    const searchLower = query.search?.trim().toLowerCase() || '';

    const filtered = allItems.filter((item) => {
      if (requireVerified && !item.isVerifiedBoard) {
        return false;
      }
      if (boardFilter && boardFilter !== 'ALL') {
        if (!item.boardKeys.includes(boardFilter as BoardKey)) {
          return false;
        }
      }
      if (!matchesBoardYearFilter(item.boardYear, query.year)) {
        return false;
      }
      if (programFilter && programFilter !== 'ALL' && item.program.toUpperCase() !== programFilter) {
        return false;
      }
      if (
        query.subjectId &&
        query.subjectId !== 'ALL' &&
        item.subjectId !== query.subjectId &&
        item.subjectCode !== query.subjectId
      ) {
        return false;
      }
      if (query.chapterId && query.chapterId !== 'ALL' && item.chapterId !== query.chapterId) {
        return false;
      }
      if (typeFilter && typeFilter !== 'ALL' && item.type.toUpperCase() !== typeFilter) {
        return false;
      }
      if (searchLower) {
        const haystack = [
          item.stem,
          item.boardSource ?? '',
          item.boardLabelBangla,
          item.subjectNameBangla,
          item.chapterTitleBangla,
          item.topicTitleBangla,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(searchLower)) {
          return false;
        }
      }
      return true;
    });

    filtered.sort((a, b) => {
      const yearA = a.boardYear ?? 0;
      const yearB = b.boardYear ?? 0;
      if (yearA !== yearB) {
        return yearB - yearA;
      }
      return a.id.localeCompare(b.id);
    });

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(query.limit) || 20));
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;

    return {
      items: filtered.slice(start, start + limit),
      total,
      page,
      limit,
      totalPages,
    };
  }
}
