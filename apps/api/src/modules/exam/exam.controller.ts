import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { StartExamDto } from './dto/start-exam.dto';
import { HeartbeatExamDto } from './dto/heartbeat-exam.dto';
import { SubmitExamDto } from './dto/submit-exam.dto';
import { StartRehearsalDto } from './dto/rehearsal.dto';
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

  @Get('history')
  async getHistory(
    @Req() req: { user: { id: string } },
    @Query('subjectId') subjectId?: string,
    @Query('testType') testType?: string,
  ) {
    return this.examService.getHistory(req.user.id, { subjectId, testType });
  }

  @Post('rehearsal/start')
  async startRehearsal(
    @Body() dto: StartRehearsalDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.examService.startRehearsal(req.user.id, dto);
  }

  @Get('rehearsal/history')
  async getRehearsalHistory(@Req() req: { user: { id: string } }) {
    return this.examService.getRehearsalHistory(req.user.id);
  }

  @Get('rehearsal/:id')
  async getRehearsal(
    @Param('id') id: string,
    @Req() req: { user: { id: string } },
  ) {
    return this.examService.getRehearsal(id, req.user.id);
  }

  @Post('rehearsal/:id/paper/:paperIndex/start')
  async startRehearsalPaper(
    @Param('id') id: string,
    @Param('paperIndex', ParseIntPipe) paperIndex: number,
    @Req() req: { user: { id: string } },
  ) {
    return this.examService.startRehearsalPaper(id, paperIndex, req.user.id);
  }

  @Post('rehearsal/:id/paper/:paperIndex/submit')
  async submitRehearsalPaper(
    @Param('id') id: string,
    @Param('paperIndex', ParseIntPipe) paperIndex: number,
    @Body() dto: SubmitExamDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.examService.submitRehearsalPaper(id, paperIndex, req.user.id, dto);
  }
}
