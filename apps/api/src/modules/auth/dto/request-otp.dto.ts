import { IsNotEmpty, IsString, Matches } from 'class-validator';

export const PHONE_REGEX = /^(?:\+8801|8801|01)[3-9]\d{8}$|^\+[1-9]\d{7,14}$/;

export class RequestOtpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(PHONE_REGEX, {
    message: 'phoneNumber must be a valid Bangladesh mobile number (e.g. 017XXXXXXXX) or E.164 formatted number',
  })
  phoneNumber!: string;
}
