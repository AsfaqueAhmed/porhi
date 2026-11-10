import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsArray()
  @ArrayMinSize(1)
  importantTerms!: any[];

  @IsOptional()
  workedExample?: any;

  @IsOptional()
  @IsString()
  memoryAid?: string;

  @IsOptional()
  @IsString()
  interactiveWidgetUrl?: string;
}
