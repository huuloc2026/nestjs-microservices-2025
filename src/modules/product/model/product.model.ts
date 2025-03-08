import { BaseStatus, PrismaClient } from '@prisma/client';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Min,
  IsPositive,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { CategoryName } from 'src/modules/category/dto/category.enum';
import { ModelName } from 'src/shared/modelName';

export class ProductSchema {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255, { message: 'Name cannot exceed 255 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  @Min(0, { message: 'Price cannot be negative' })
  price: number;

  @IsNotEmpty({ message: 'Stock is required' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsPositive({ message: 'Stock must be a positive number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  @IsUrl({}, { message: 'Invalid image URL' })
  imageUrl?: string;

  @IsOptional()
  @IsString({ message: 'Category ID must be a string' })
  categoryId: string;

  @IsEnum(BaseStatus, { message: 'Invalid status' })
  status: BaseStatus = BaseStatus.ACTIVE; // Default value as in your schema
}

export class UpdateProdDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255, { message: 'Name cannot exceed 255 characters' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  @Min(0, { message: 'Price cannot be negative' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsPositive({ message: 'Stock must be a positive number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  @IsUrl({}, { message: 'Invalid image URL' })
  imageUrl?: string;

  @IsOptional()
  @IsString({ message: 'Category ID must be a string' })
  categoryId?: string;

  @IsOptional()
  @IsEnum(BaseStatus, { message: 'Invalid status' })
  status?: BaseStatus;
}
