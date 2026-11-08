import { Controller, Get, Inject, Param, Query, Req, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('lessons')
export class LessonController {
  constructor(@Inject(LessonService) private readonly lessonService: LessonService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get(['topic/:topicId', ':topicId'])
  async getLessonByTopic(
    @Param('topicId') topicId: string,
    @Req() req: { user?: any },
    @Query('draft') draft?: string,
    @Query('includeDraft') includeDraft?: string,
    @Query('status') status?: string,
  ) {
    const isDraftRequested =
      draft === 'true' ||
      includeDraft === 'true' ||
      status?.toUpperCase() === 'DRAFT';

    return this.lessonService.getLessonByTopic(topicId, req.user, isDraftRequested);
  }
}
