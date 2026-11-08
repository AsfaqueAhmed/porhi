import { IsNotEmpty, IsString } from 'class-validator';

export class GuestLoginDto {
  @IsString()
  @IsNotEmpty()
  guestId!: string;
}
