import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { ContentReportService } from './content-report.service';
import { CreateContentReportDto } from './dto/create-content-report.dto';

@Controller('content-reports')
@UseGuards(OptionalJwtAuthGuard)
export class ContentReportController {
  constructor(
    @Inject(ContentReportService)
    private readonly contentReportService: ContentReportService,
  ) {}

  @Post()
  async submitReport(
    @Body() dto: CreateContentReportDto,
    @Req() req?: { user?: any },
  ) {
    return this.contentReportService.submitReport(req?.user?.id, dto);
  }

  @Get('mine')
  async listMyReports(@Req() req?: { user?: any }) {
    return this.contentReportService.listMyReports(req?.user?.id);
  }
}
