import { Body, Controller, Get, Inject, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

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
    @Body() body: { topicId: string; lessonId?: string; timeSpentSeconds?: number },
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
}
