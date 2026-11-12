import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class LessonCompleteDto {
  @IsString()
  @IsNotEmpty()
  topicId!: string;

  @IsOptional()
  @IsString()
  lessonId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  timeSpentSeconds?: number;
}

export class ToggleBookmarkDto {
  @IsString()
  @IsNotEmpty()
  itemId!: string;

  @IsIn(['topic', 'question'])
  itemType!: 'topic' | 'question';

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titleBangla!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  subtitleBangla?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  href!: string;
}

export class SaveNoteDto {
  @IsString()
  @IsNotEmpty()
  topicId!: string;

  @IsString()
  @MaxLength(5000)
  content!: string;
}

export class SubmitFeedbackDto {
  @IsIn(['LESSON', 'QUESTION'])
  contentType!: 'LESSON' | 'QUESTION';

  @IsString()
  @IsNotEmpty()
  contentId!: string;

  @IsBoolean()
  helpful!: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;
}

export class OfflineLessonCompleteDto {
  @IsString()
  @IsNotEmpty()
  offlineEventId!: string;

  @IsString()
  @IsNotEmpty()
  topicId!: string;

  @IsOptional()
  @IsString()
  chapterId?: string;

  @IsOptional()
  @IsString()
  subjectId?: string;

  @IsOptional()
  @IsString()
  completedAt?: string;
}

export class OfflinePracticeAttemptDto {
  @IsString()
  @IsNotEmpty()
  offlineEventId!: string;

  @IsString()
  @IsNotEmpty()
  questionId!: string;

  @IsOptional()
  @IsString()
  topicId?: string;

  @IsBoolean()
  isCorrect!: boolean;

  @IsOptional()
  @IsString()
  selectedOptionId?: string | null;

  @IsOptional()
  @IsString()
  attemptedAt?: string;
}

export class OfflineExamAnswerDto {
  @IsString()
  @IsNotEmpty()
  questionId!: string;

  @IsOptional()
  @IsString()
  selectedOptionId?: string | null;
}

export class OfflineExamSubmissionDto {
  @IsString()
  @IsNotEmpty()
  offlineSessionId!: string;

  @IsString()
  @IsNotEmpty()
  subjectId!: string;

  @IsOptional()
  @IsString()
  chapterId?: string | null;

  @IsOptional()
  @IsString()
  testType?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  durationSeconds?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfflineExamAnswerDto)
  answers!: OfflineExamAnswerDto[];

  @IsOptional()
  @IsString()
  submittedAt?: string;
}

export class SyncOfflineDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfflineLessonCompleteDto)
  lessonCompletes?: OfflineLessonCompleteDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfflinePracticeAttemptDto)
  practiceAttempts?: OfflinePracticeAttemptDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfflineExamSubmissionDto)
  examSubmissions?: OfflineExamSubmissionDto[];
}

export class CreateGuardianShareLinkDto {
  @IsIn(['PARENT', 'TEACHER'])
  audience!: 'PARENT' | 'TEACHER';

  @IsOptional()
  @IsString()
  @MaxLength(80)
  recipientLabel?: string;
}
