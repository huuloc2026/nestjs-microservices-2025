import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserLoginDTO } from 'src/modules/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() newUser: CreateAuthDto) {
    return this.authService.register(newUser);
  }

  @Post('login')
  login(@Body() UserExist: UserLoginDTO) {
    return this.authService.login(UserExist);
  }
}
