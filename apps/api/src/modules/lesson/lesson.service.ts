import { ForbiddenException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ContentStatus, Role } from '@prisma/client';
import { CONTENT_HIERARCHY_INCLUDE } from '../content-admin/admin-content-query.util';

export interface LessonAuthUser {
  id: string;
  role?: Role | string;
}

@Injectable()
export class LessonService {
  private readonly logger = new Logger(LessonService.name);

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getLessonByTopic(
    topicId: string,
    user?: LessonAuthUser | null,
    draftRequested: boolean = false,
  ) {
    const isEditor = user?.role === Role.EDITOR || user?.role === Role.ADMIN;

    if (draftRequested && !isEditor) {
      throw new ForbiddenException('Only editors can view draft lessons');
    }

    let lesson = null;

    if (draftRequested) {
      lesson = await this.prisma.lesson.findFirst({
        where: {
          topicId,
          status: ContentStatus.DRAFT,
        },
        include: CONTENT_HIERARCHY_INCLUDE,
        orderBy: { version: 'desc' },
      });
    } else {
      lesson = await this.prisma.lesson.findFirst({
        where: {
          topicId,
          status: ContentStatus.PUBLISHED,
        },
        include: CONTENT_HIERARCHY_INCLUDE,
        orderBy: { version: 'desc' },
      });

      if (!lesson && isEditor) {
        // Fallback to non-archived latest version for editor
        lesson = await this.prisma.lesson.findFirst({
          where: {
            topicId,
            status: { not: ContentStatus.ARCHIVED },
          },
          include: CONTENT_HIERARCHY_INCLUDE,
          orderBy: { version: 'desc' },
        });
      }
    }

    if (!lesson) {
      throw new NotFoundException(`Lesson not found for topic: ${topicId}`);
    }

    // Log LESSON_OPEN event if authenticated user is present
    if (user?.id) {
      await this.prisma.eventLog
        .create({
          data: {
            userId: user.id,
            eventType: 'LESSON_OPEN',
            payload: {
              topicId,
              lessonId: lesson.id,
            },
          },
        })
        .catch((err) => {
          this.logger.warn(`Failed to log LESSON_OPEN event: ${err?.message ?? err}`);
        });
    }

    return lesson;
  }
}
