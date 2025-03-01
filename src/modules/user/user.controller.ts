import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UserRegistrationDTO,
  UserUpdateDTO,
} from './dto/user.dto';
import { IUserService } from 'src/modules/user/interface';
import { USER_SERVICE } from 'src/modules/user/interface/user-di.token';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDTO) {
    console.log(id, updateUserDto);
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
