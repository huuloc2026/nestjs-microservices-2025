import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserLoginDTO } from 'src/modules/user/dto/user.dto';
import { forgotpasswordDTO } from 'src/modules/auth/dto/changepasswordDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() newUser: CreateAuthDto) {
    return this.authService.register(newUser);
  }
  @Post('checkjwt')
  checkjwt(@Body() UserExist: any) {
    return this.authService.checkjwt(UserExist);
  }

  @Post('login')
  login(@Body() UserExist: UserLoginDTO) {
    return this.authService.login(UserExist);
  }

  @Post('changepassword')
  changepassword(@Body() UserExist: any) {
    const { email, oldPassword, newPassword, confirmPassword } = UserExist;
    return this.authService.ChangePassword(email, {
      oldPassword,
      newPassword,
      confirmPassword,
    });
  }

  @Post('forgotpassword')
  forgotpassword(@Body() UserExist: forgotpasswordDTO) {
    return this.authService.forgotpassword(UserExist);
  }

  @Post('verify')
  verify(@Body() UserExist: any) {
    return this.authService.verifyAccount(UserExist);
  }

  @Post('me')
  profile(@Body() UserExist: string) {
    UserExist = 'zxczzxczxzxzxcccxcssasssssd@gmail.com';
    return this.authService.profile(UserExist);
  }
}
