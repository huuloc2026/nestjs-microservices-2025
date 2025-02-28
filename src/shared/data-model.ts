import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Transform as ClassTransformerTransform } from 'class-transformer';

export enum BaseStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
}

export class PagingSchemaDTO {
  @IsNumber()
  @Min(1)
  @ClassTransformerTransform(({ value }) => parseInt(value, 10))
  page: number = 1;

  @IsNumber()
  @Min(1)
  @Max(100)
  @ClassTransformerTransform(({ value }) => parseInt(value, 10))
  limit: number = 10;

  @IsOptional()
  orderBy?: Record<string, 'asc' | 'desc'>;

  @IsNumber()
  @IsOptional()
  @ClassTransformerTransform(({ value }) => parseInt(value, 10))
  total?: number | undefined;
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
