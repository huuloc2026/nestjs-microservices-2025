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
import { BaseEntity, BaseStatus, UserRole } from 'src/shared/data-model';

// ---------------- ENUMS ----------------
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

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

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;
}
export class User extends UserSchema {}
