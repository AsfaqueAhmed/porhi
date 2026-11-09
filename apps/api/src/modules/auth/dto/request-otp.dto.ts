import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { PHONE_REGEX } from '../phone.util';

export { PHONE_REGEX };

export class RequestOtpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(PHONE_REGEX, {
    message: 'phoneNumber must be a valid Bangladesh mobile number (e.g. 017XXXXXXXX) or E.164 formatted number',
  })
  phoneNumber!: string;
}
