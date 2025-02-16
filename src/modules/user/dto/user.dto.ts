import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

import { Gender } from '@prisma/client';
import { User } from '@prisma/client';
import { InforBasic } from 'src/modules/user/utils.type';

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

export class UserRegistrationDTO extends CreateUserDto {}
export class UserCondDTO {}
export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @MinLength(6)
  @Expose()
  @IsNotEmpty()
  password: string;
}

export class UserVerifyDTO {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;
  @Expose()
  @IsNotEmpty()
  verifyCode: string;
}

export class UserUpdateDTO implements InforBasic {
  @Expose()
  @IsOptional()
  phone?: string | null;

  @Expose()
  @IsOptional()
  avatar?: string | null;

  @Expose()
  @IsOptional()
  gender?: Gender;
}
