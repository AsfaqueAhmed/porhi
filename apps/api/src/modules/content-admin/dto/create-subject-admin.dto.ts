import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateSubjectAdminDto {
  @IsNotEmpty()
  @IsString()
  code!: string;

  @IsNotEmpty()
  @IsString()
  nameBangla!: string;

  @IsNotEmpty()
  @IsString()
  classLevel!: string;

  @IsOptional()
  @IsInt()
  @Min(2020)
  syllabusYear?: number = 2026;

  @IsOptional()
  @IsBoolean()
  isReady?: boolean = false;
}
