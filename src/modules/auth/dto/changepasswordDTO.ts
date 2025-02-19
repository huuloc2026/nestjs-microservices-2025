import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDTO {
  @Expose()
  @IsNotEmpty()
  oldPassword: string;
  @Expose()
  @IsNotEmpty()
  newPassword: string;
  @Expose()
  @IsNotEmpty()
  confirmPassword: string;
}

export class forgotpasswordDTO {
  @Expose()
  @IsNotEmpty()
  newPassword: string;
  @Expose()
  @IsNotEmpty()
  confirmPassword: string;
}
