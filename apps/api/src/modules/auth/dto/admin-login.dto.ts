import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { PHONE_REGEX } from './request-otp.dto';

export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  @Matches(PHONE_REGEX, {
    message:
      'phoneNumber must be a valid Bangladesh mobile number (e.g. 017XXXXXXXX) or E.164 formatted number',
  })
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;
}
