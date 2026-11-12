import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateLessonAdminDto {
  @IsOptional()
  @IsString()
  topicId?: string;

  @IsOptional()
  @IsString()
  titleBangla?: string;

  @IsOptional()
  @IsString()
  learningGoal?: string;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'importantTerms must have at least one entry if provided' })
  importantTerms?: any[];

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsObject()
  workedExample?: { problem?: string; stepByStepSolution?: string } | null;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  memoryAid?: string | null;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  interactiveWidgetUrl?: string | null;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  audioUrl?: string | null;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsInt()
  @Min(0)
  audioDurationSeconds?: number | null;

  @IsOptional()
  @IsBoolean()
  preservePublished?: boolean;

  @IsOptional()
  @IsBoolean()
  submitForReview?: boolean;
}
