import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class StartExamDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['CHAPTER_TEST', 'TOPIC_TEST', 'WEAK_AREA'])
  testType!: string;

  @IsNotEmpty()
  @IsString()
  subjectId!: string;

  @IsNotEmpty()
  @IsString()
  chapterId!: string;

  @IsOptional()
  @IsString()
  topicId?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  questionLimit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(1.0)
  negativeRatio?: number = 0.25;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(60)
  @Max(7200)
  durationSeconds?: number;
}
