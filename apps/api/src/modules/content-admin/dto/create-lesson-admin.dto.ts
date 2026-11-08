import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLessonAdminDto {
  @IsNotEmpty()
  @IsString()
  topicId!: string;

  @IsNotEmpty()
  @IsString()
  titleBangla!: string;

  @IsNotEmpty()
  @IsString()
  learningGoal!: string;

  @IsNotEmpty()
  @IsString()
  explanation!: string;

  @IsDefined()
  importantTerms!: any;

  @IsOptional()
  workedExample?: any;

  @IsOptional()
  @IsString()
  memoryAid?: string;
}
