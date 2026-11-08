import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateTopicAdminDto {
  @IsNotEmpty()
  @IsString()
  chapterId!: string;

  @IsNotEmpty()
  @IsString()
  titleBangla!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  orderIndex?: number;
}
