import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GuardianService } from './guardian.service';

@Controller('guardian')
export class GuardianController {
  constructor(
    @Inject(GuardianService)
    private readonly guardianService: GuardianService,
  ) {}

  @Get('report/:shareCode')
  async getReport(@Param('shareCode') shareCode: string) {
    return this.guardianService.getReportByShareCode(shareCode);
  }
}
