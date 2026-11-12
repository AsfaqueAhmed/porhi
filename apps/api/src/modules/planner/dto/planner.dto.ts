import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

const PLANNER_TARGET_TYPES = [
  'LESSON',
  'PRACTICE',
  'MODEL_TEST',
  'REVISION',
  'CUSTOM',
] as const;

export class CreateStudyTaskDto {
  @IsNotEmpty()
  @IsString()
  titleBangla!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'scheduledDate must use YYYY-MM-DD format',
  })
  scheduledDate!: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'reminderTime must use HH:mm format',
  })
  reminderTime?: string;

  @IsOptional()
  @IsString()
  @IsIn(PLANNER_TARGET_TYPES)
  targetType?: string;

  @IsOptional()
  @IsString()
  subjectId?: string;

  @IsOptional()
  @IsString()
  chapterId?: string;

  @IsOptional()
  @IsString()
  topicId?: string;
}

export class UpdateStudyTaskDto {
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  titleBangla?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'scheduledDate must use YYYY-MM-DD format',
  })
  scheduledDate?: string;

  @IsOptional()
  @IsString()
  reminderTime?: string;
}

export class AutoGeneratePlanDto {
  @IsOptional()
  @IsString()
  subjectId?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate must use YYYY-MM-DD format',
  })
  startDate?: string;
}
