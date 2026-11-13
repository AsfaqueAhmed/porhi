import { IsBoolean } from 'class-validator';

export class UpdateAuthConfigDto {
  @IsBoolean()
  guestLoginEnabled!: boolean;
}
