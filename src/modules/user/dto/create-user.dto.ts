import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password (min 6 chars)',
  })
  @MinLength(6)
  @Expose()
  @IsNotEmpty()
  password: string;
}
