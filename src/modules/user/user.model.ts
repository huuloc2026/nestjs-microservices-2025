import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { BaseEntity, BaseStatus } from 'src/shared/data-model';
import { Prisma, Gender, Role } from '@prisma/client';

// ---------------- DTO ----------------
export class UserSchema extends BaseEntity {
  @IsString()
  @Length(3, 25)
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string | null;

  @IsOptional()
  @IsString()
  avatar?: string | null;

  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.CLIENT;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender = Gender.OTHER;
}
export class User extends UserSchema {}
