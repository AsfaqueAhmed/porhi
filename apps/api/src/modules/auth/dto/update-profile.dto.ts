import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  fullName?: string;

  @IsOptional()
  @IsIn(['SSC', 'HSC'], { message: 'selectedClass must be either SSC or HSC' })
  selectedClass?: 'SSC' | 'HSC';
}
