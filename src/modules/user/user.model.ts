import { User as PrismaUser, Gender, Cart, Role, Order } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class User implements PrismaUser {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  verifyCode: string;

  @Expose()
  @IsOptional()
  phone: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  password: string;

  @Expose()
  salt: string;

  @Expose()
  role: Role;

  @Expose()
  @IsOptional()
  gender: Gender;

  @Expose()
  @IsOptional()
  avatar: string;

  @Expose()
  @IsOptional()
  orders: Order[];

  @Expose()
  @IsOptional()
  cart: Cart;
}
