import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class StartExamDto {
  @IsNotEmpty()
  @IsString()
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
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  negativeRatio?: number = 0.25;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  durationSeconds?: number;
}
