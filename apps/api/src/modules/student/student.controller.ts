import { Body, Controller, Get, Inject, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import {
  LessonCompleteDto,
  SaveNoteDto,
  SubmitFeedbackDto,
  SyncOfflineDto,
  ToggleBookmarkDto,
} from './dto/student.dto';

@Controller('student')
@UseGuards(OptionalJwtAuthGuard)
export class StudentController {
  constructor(@Inject(StudentService) private readonly studentService: StudentService) {}

  @Get('overview')
  async getOverview(
    @Query('subjectId') subjectId?: string,
    @Req() req?: { user?: any },
  ) {
    return this.studentService.getOverview(subjectId, req?.user?.id);
  }

  @Post('lesson-complete')
  async markLessonComplete(
    @Body() body: LessonCompleteDto,
    @Req() req?: { user?: any },
  ) {
    return this.studentService.markLessonComplete(req?.user?.id, body);
  }

  @Post('mistakes/:questionId/resolve')
  async resolveMistake(
    @Param('questionId') questionId: string,
    @Req() req?: { user?: any },
  ) {
    return this.studentService.resolveMistake(req?.user?.id, questionId);
  }

  @Post('bookmarks/toggle')
  async toggleBookmark(
    @Body() body: ToggleBookmarkDto,
    @Req() req?: { user?: any },
  ) {
    return this.studentService.toggleBookmark(req?.user?.id, body);
  }

  @Post('notes')
  async saveNote(
    @Body() body: SaveNoteDto,
    @Req() req?: { user?: any },
  ) {
    return this.studentService.saveNote(req?.user?.id, body.topicId, body.content);
  }

  @Post('feedback')
  async submitFeedback(
    @Body() body: SubmitFeedbackDto,
    @Req() req?: { user?: any },
  ) {
    return this.studentService.submitFeedback(req?.user?.id, body);
  }

  @Post('sync-offline')
  async syncOfflineActivity(
    @Body() body: SyncOfflineDto,
    @Req() req?: { user?: any },
  ) {
    return this.studentService.syncOfflineActivity(req?.user?.id, body);
  }
}
