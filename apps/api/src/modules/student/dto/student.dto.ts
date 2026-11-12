import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

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
