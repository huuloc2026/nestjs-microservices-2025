import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsInt,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value)) // Important for handling string inputs
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value)) // Important for handling string inputs
  stock?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @IsOptional()
  @IsString()
  categoryId?: string | null;
}
