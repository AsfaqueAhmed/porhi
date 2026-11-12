import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { ReportStatus } from '@prisma/client';
import { REPORT_CATEGORIES, REPORT_CONTENT_TYPES } from '../../content-report/dto/create-content-report.dto';

export class ListContentReportsQueryDto {
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;

  @IsOptional()
  @IsIn(REPORT_CATEGORIES)
  category?: (typeof REPORT_CATEGORIES)[number];

  @IsOptional()
  @IsIn(REPORT_CONTENT_TYPES)
  contentType?: (typeof REPORT_CONTENT_TYPES)[number];
}

export class ResolveContentReportDto {
  @IsEnum(ReportStatus)
  status!: ReportStatus;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  resolutionNote?: string;

  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  moveContentToCorrection?: boolean;
}
