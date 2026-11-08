import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReviewContentDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['LESSON', 'QUESTION'])
  contentType!: 'LESSON' | 'QUESTION';

  @IsNotEmpty()
  @IsString()
  contentId!: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['APPROVE', 'REJECT', 'REQUEST_CHANGES'])
  action!: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES';

  @IsOptional()
  @IsString()
  comment?: string;
}
