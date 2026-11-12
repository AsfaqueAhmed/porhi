import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { ContentReportController } from './content-report.controller';
import { ContentReportService } from './content-report.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ContentReportController],
  providers: [ContentReportService],
  exports: [ContentReportService],
})
export class ContentReportModule {}
