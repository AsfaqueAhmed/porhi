import { Body, Controller, Get, Inject, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { SubmitPracticeDto } from './dto/submit-practice.dto';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('practice')
export class PracticeController {
  constructor(@Inject(PracticeService) private readonly practiceService: PracticeService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get(['chapter/:chapterId/questions', ':chapterId/questions'])
  async getChapterQuestions(
    @Param('chapterId') chapterId: string,
    @Query('topicId') topicId?: string,
    @Query('difficulty') difficulty?: string,
    @Query('mode') mode?: string,
    @Req() req?: { user?: any },
  ) {
    return this.practiceService.getChapterQuestions(
      chapterId,
      topicId,
      difficulty,
      mode,
      req?.user?.id,
    );
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Post('submit')
  async submitPractice(
    @Body() dto: SubmitPracticeDto,
    @Req() req: { user?: any },
  ) {
    const userId = req.user?.id;
    return this.practiceService.submitPractice(dto, userId);
  }
}
