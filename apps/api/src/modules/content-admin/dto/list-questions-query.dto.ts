import { IsEnum, IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ContentStatus } from '@prisma/client';

export class ListQuestionsQueryDto {
  @IsOptional()
  @IsString()
  subjectId?: string;

  @IsOptional()
  @IsString()
  chapterId?: string;

  @IsOptional()
  @IsString()
  topicId?: string;

  @IsOptional()
  @IsIn(['MCQ', 'CQ_CREATIVE'])
  type?: 'MCQ' | 'CQ_CREATIVE';

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['true', 'false'])
  includeArchived?: string;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  page?: string;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  limit?: string;
}
