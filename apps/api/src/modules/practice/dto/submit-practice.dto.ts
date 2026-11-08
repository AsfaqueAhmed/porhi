import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitPracticeDto {
  @IsNotEmpty()
  @IsString()
  questionId!: string;

  @IsNotEmpty()
  @IsString()
  selectedOptionId!: string;
}

