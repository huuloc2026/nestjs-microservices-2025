import { Type } from 'class-transformer';
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

export enum BaseStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  DELETED = 'deleted',
}

export class BaseEntity {
  @IsUUID()
  id: string;
  @IsOptional()
  @IsEnum(BaseStatus)
  status?: BaseStatus;
  @IsDate()
  @Type(() => Date)
  createdAt: Date;
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
