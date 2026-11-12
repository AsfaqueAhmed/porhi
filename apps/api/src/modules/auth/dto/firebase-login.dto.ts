import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ProgramTrack, STUDENT_TRACKS } from './update-profile.dto';

export class FirebaseLoginDto {
  @IsString()
  @IsNotEmpty()
  idToken!: string;

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
