import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export const STUDENT_TRACKS = ['CLASS_6_8', 'SSC', 'HSC', 'ADMISSION', 'BCS'] as const;
export type ProgramTrack = (typeof STUDENT_TRACKS)[number];

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  fullName?: string;

  @IsOptional()
  @IsIn(STUDENT_TRACKS, {
    message: 'selectedClass must be one of CLASS_6_8, SSC, HSC, ADMISSION, BCS',
  })
  selectedClass?: ProgramTrack;
}
