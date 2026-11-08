import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateChapterAdminDto {
  @IsNotEmpty()
  @IsString()
  subjectId!: string;

  @IsNotEmpty()
  @IsString()
  titleBangla!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  orderIndex?: number;
}
