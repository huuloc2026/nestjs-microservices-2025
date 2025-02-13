import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'Updated Name',
    description: 'New name of the user',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'updated@example.com',
    description: 'New email of the user',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'New password',
    required: false,
  })
  password?: string;
}
