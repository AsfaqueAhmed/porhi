import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class HeartbeatAnswerDto {
  @IsNotEmpty()
  @IsString()
  questionId!: string;

  @IsOptional()
  @IsString()
  selectedOptionId?: string | null;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  timeSpent?: number;
}

export class HeartbeatExamDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeartbeatAnswerDto)
  answers!: HeartbeatAnswerDto[];
}
