import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { REPORT_CATEGORIES, REPORT_CONTENT_TYPES } from './dto/create-content-report.dto';

export interface SubmitContentReportInput {
  contentType: string;
  contentId: string;
  topicId?: string;
  category: string;
  description: string;
}

@Injectable()
export class ContentReportService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  private serializeReport(report: any) {
    return {
      id: report.id,
      userId: report.userId ?? null,
      contentType: report.contentType,
      contentId: report.contentId,
      topicId: report.topicId ?? null,
      category: report.category,
      description: report.description,
      status: report.status,
      resolutionNote: report.resolutionNote ?? null,
      resolvedAt: report.resolvedAt ? new Date(report.resolvedAt).toISOString() : null,
      createdAt: report.createdAt ? new Date(report.createdAt).toISOString() : new Date().toISOString(),
    };
  }

  async submitReport(userId: string | undefined, dto: SubmitContentReportInput) {
    if (!REPORT_CONTENT_TYPES.includes(dto?.contentType as any)) {
      throw new BadRequestException('contentType must be LESSON or QUESTION');
    }
    if (!dto?.contentId || !dto.contentId.trim()) {
      throw new BadRequestException('contentId is required');
    }
    if (!REPORT_CATEGORIES.includes(dto?.category as any)) {
      throw new BadRequestException('Invalid report category');
    }
    const cleanDescription = (dto?.description ?? '').trim();
    if (!cleanDescription) {
      throw new BadRequestException('description must not be empty');
    }

    let resolvedTopicId = dto.topicId?.trim() || null;

    if (dto.contentType === 'LESSON') {
      if (typeof (this.prisma.lesson as any)?.findUnique === 'function') {
        const lesson = await (this.prisma.lesson as any).findUnique({
          where: { id: dto.contentId },
        });
        if (!lesson) {
          throw new NotFoundException(`Lesson with id ${dto.contentId} not found`);
        }
        if (!resolvedTopicId && lesson.topicId) {
          resolvedTopicId = lesson.topicId;
        }
      }
    } else if (dto.contentType === 'QUESTION') {
      if (typeof (this.prisma.question as any)?.findUnique === 'function') {
        const question = await (this.prisma.question as any).findUnique({
          where: { id: dto.contentId },
        });
        if (!question) {
          throw new NotFoundException(`Question with id ${dto.contentId} not found`);
        }
        if (!resolvedTopicId && question.topicId) {
          resolvedTopicId = question.topicId;
        }
      }
    }

    const created = await (this.prisma as any).contentReport.create({
      data: {
        userId: userId ?? null,
        contentType: dto.contentType,
        contentId: dto.contentId.trim(),
        topicId: resolvedTopicId,
        category: dto.category,
        description: cleanDescription,
        status: ReportStatus.OPEN,
      },
    });

    if (userId && typeof this.prisma.eventLog?.create === 'function') {
      await this.prisma.eventLog
        .create({
          data: {
            userId,
            eventType: 'CONTENT_REPORT_SUBMITTED',
            payload: {
              reportId: created.id,
              contentType: dto.contentType,
              contentId: dto.contentId.trim(),
              category: dto.category,
            },
          },
        })
        .catch(() => {});
    }

    return this.serializeReport(created);
  }

  async listMyReports(userId: string | undefined) {
    if (!userId || typeof (this.prisma as any).contentReport?.findMany !== 'function') {
      return [];
    }

    const rows = await (this.prisma as any).contentReport.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return (rows as any[]).map((r) => this.serializeReport(r));
  }
}
