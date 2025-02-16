import {
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsInt,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value)) // Important for handling string inputs
  price: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value)) // Important for handling string inputs
  stock: number;

  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @IsOptional()
  @IsString()
  categoryId?: string | null;
}
