import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class RehearsalPaperInputDto {
  @IsNotEmpty()
  @IsString()
  subjectId!: string;

  @IsOptional()
  @IsString()
  labelBangla?: string;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  questionCount!: number;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(120)
  durationMinutes!: number;
}

export class StartRehearsalDto {
  @IsNotEmpty()
  @IsString()
  titleBangla!: string;

  @IsOptional()
  @IsString()
  program?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(1)
  negativeRatio?: number;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => RehearsalPaperInputDto)
  papers!: RehearsalPaperInputDto[];
}
