import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

import { Gender } from '@prisma/client';
import { User } from '@prisma/client';
import { UserModel } from 'src/modules/user/user.model';
// user.dto.ts

export enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  SELLER = 'SELLER',
}

export enum BaseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  DELETED = 'DELETED',
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  password?: string; // Password should not be exposed in most DTOs, but included here for completeness
  phone?: string;
  role: Role;
  gender: Gender;
  salt: string;
  verifyCode?: string;
  avatar?: string;
  isVerify: boolean;
  status: BaseStatus;
  createdAt: Date;
  updatedAt: Date;
  cartId?: string; // If you want to include cartId.
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  password?: string;
  phone?: string;
  role?: Role;
  gender?: Gender;
  avatar?: string;
  status?: BaseStatus;
}
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

  @MinLength(10)
  @IsOptional()
  @Expose()
  phone?: string;
  @IsOptional()
  @Expose()
  role?: Role;

  @IsOptional()
  @Expose()
  gender?: Gender;

  @IsOptional()
  @Expose()
  avatar?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @Expose()
  name?: string;

  @IsOptional()
  @Expose()
  email?: string;

  @IsOptional()
  @Expose()
  password?: string;
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

export class UserUpdateDTO {
  @Expose()
  @IsOptional()
  name: string | null;

  @Expose()
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
