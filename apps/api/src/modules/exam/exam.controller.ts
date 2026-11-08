import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { StartExamDto } from './dto/start-exam.dto';
import { HeartbeatExamDto } from './dto/heartbeat-exam.dto';
import { SubmitExamDto } from './dto/submit-exam.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('exam')
@UseGuards(JwtAuthGuard)
export class ExamController {
  constructor(@Inject(ExamService) private readonly examService: ExamService) {}

  @Post('start')
  async startExam(
    @Body() dto: StartExamDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.examService.startExam(dto, req.user.id);
  }

  @Put('heartbeat/:sessionId')
  async heartbeat(
    @Param('sessionId') sessionId: string,
    @Body() dto: HeartbeatExamDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.examService.heartbeat(sessionId, dto, req.user.id);
  }

  @Post('submit/:sessionId')
  async submitExam(
    @Param('sessionId') sessionId: string,
    @Body() dto: SubmitExamDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.examService.submitExam(sessionId, dto, req.user.id);
  }

  @Get('session/:sessionId')
  async getSession(
    @Param('sessionId') sessionId: string,
    @Req() req: { user: { id: string } },
  ) {
    return this.examService.getSession(sessionId, req.user.id);
  }
}
