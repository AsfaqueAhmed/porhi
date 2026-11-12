import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export const REPORT_CONTENT_TYPES = ['LESSON', 'QUESTION'] as const;
export const REPORT_CATEGORIES = [
  'WRONG_ANSWER',
  'TYPO_OR_LATEX',
  'UNCLEAR_EXPLANATION',
  'CURRICULUM_MISMATCH',
  'OTHER',
] as const;

export class CreateContentReportDto {
  @IsIn(REPORT_CONTENT_TYPES)
  contentType!: 'LESSON' | 'QUESTION';

  @IsString()
  @IsNotEmpty()
  contentId!: string;

  @IsOptional()
  @IsString()
  topicId?: string;

  @IsIn(REPORT_CATEGORIES)
  category!: (typeof REPORT_CATEGORIES)[number];

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description!: string;
}
