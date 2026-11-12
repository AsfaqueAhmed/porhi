import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Max, Min, ValidateNested } from 'class-validator';

export class CqSelfScoresDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1)
  ka!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(2)
  kha!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(3)
  ga!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(4)
  gha!: number;
}

export class CqSelfAssessDto {
  @IsString()
  @IsNotEmpty()
  questionId!: string;

  @ValidateNested()
  @Type(() => CqSelfScoresDto)
  selfScores!: CqSelfScoresDto;
}
