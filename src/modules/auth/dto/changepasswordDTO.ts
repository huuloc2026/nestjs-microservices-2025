import { Expose } from 'class-transformer';

export class ChangePasswordDTO {
  @Expose()
  oldPassword: string;
  @Expose()
  newPassword: string;
  @Expose()
  confirmPassword: string;
}

export class forgotpasswordDTO {
  @Expose()
  email: string;
  @Expose()
  newPassword: string;
  @Expose()
  confirmPassword: string;
}
