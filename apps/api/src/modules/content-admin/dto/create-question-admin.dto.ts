import {
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQuestionAdminDto {
  @IsNotEmpty()
  @IsString()
  topicId!: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['MCQ', 'CQ_CREATIVE'])
  type!: string;

  @IsNotEmpty()
  @IsString()
  stem!: string;

  @IsOptional()
  @IsArray()
  options?: any[];

  @IsDefined()
  @IsObject()
  explanation!: any;

  @IsOptional()
  cqRubric?: any;

  @IsNotEmpty()
  @IsString()
  @IsIn(['EASY', 'MEDIUM', 'HARD'])
  difficulty!: string;

  @IsOptional()
  @IsString()
  boardSource?: string;
}
