import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { SubmitPracticeDto } from './dto/submit-practice.dto';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('practice')
export class PracticeController {
  constructor(@Inject(PracticeService) private readonly practiceService: PracticeService) {}

  @Get('chapter/:chapterId/questions')
  async getChapterQuestions(@Param('chapterId') chapterId: string) {
    return this.practiceService.getChapterQuestions(chapterId);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Post('submit')
  async submitPractice(
    @Body() dto: SubmitPracticeDto,
    @Req() req: { user?: any },
  ) {
    return this.practiceService.submitPractice(dto, req.user?.id);
  }
}
