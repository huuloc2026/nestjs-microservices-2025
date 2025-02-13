import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Gender, User, UserSchema } from 'src/modules/user/user.model';
import { UserRole } from 'src/shared/data-model';

export class CreateUserDto {
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @MinLength(6)
  @Expose()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;
  email?: string;
  password?: string;
}

export class UserRegistrationDTO extends CreateUserDto {}
export class UserLoginDTO {}
export class UserCondDTO {}
export class UserUpdateDTO extends UserSchema {
  phone?: string | null;

  avatar?: string | null;

  role: UserRole;

  gender?: Gender;
}
