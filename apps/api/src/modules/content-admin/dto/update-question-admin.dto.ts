import {
  IsArray,
  IsBoolean,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateQuestionAdminDto {
  @IsOptional()
  @IsString()
  topicId?: string;

  @IsOptional()
  @IsIn(['MCQ', 'CQ_CREATIVE'])
  type?: 'MCQ' | 'CQ_CREATIVE';

  @IsOptional()
  @IsString()
  stem?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsArray()
  options?: any[] | null;

  @IsOptional()
  @IsObject()
  explanation?: any;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsObject()
  cqRubric?: Record<string, { mark?: number; criteria?: string }> | null;

  @IsOptional()
  @IsIn(['EASY', 'MEDIUM', 'HARD'])
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  boardSource?: string | null;

  @IsOptional()
  @IsBoolean()
  preservePublished?: boolean;

  @IsOptional()
  @IsBoolean()
  submitForReview?: boolean;
}
