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
  Query,
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
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('order') order: string = 'desc',
  ) {
    page = Math.max(1, page);
    limit = Math.max(1, limit);
    return this.userService.findAll({}, { page, limit });
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
