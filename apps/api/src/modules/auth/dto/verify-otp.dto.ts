import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { PHONE_REGEX } from './request-otp.dto';

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(PHONE_REGEX, {
    message: 'phoneNumber must be a valid Bangladesh mobile number (e.g. 017XXXXXXXX) or E.164 formatted number',
  })
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  guestId?: string;
}
