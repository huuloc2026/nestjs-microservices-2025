import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserLoginDTO, UserVerifyDTO } from 'src/modules/user/dto/user.dto';
import { forgotpasswordDTO } from 'src/modules/auth/dto/changepasswordDTO';
import { Public } from 'src/shared/decorators/public.decrators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() newUser: CreateAuthDto) {
    return this.authService.register(newUser);
  }
  @Post('checkjwt')
  @HttpCode(HttpStatus.OK)
  checkjwt(@Body() UserExist: any) {
    return this.authService.checkjwt(UserExist);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() UserExist: UserLoginDTO) {
    return this.authService.login(UserExist);
  }

  @Post('changepassword')
  @HttpCode(HttpStatus.CREATED)
  changepassword(@Body() UserExist: any) {
    const { email, oldPassword, newPassword, confirmPassword } = UserExist;
    return this.authService.ChangePassword(email, {
      oldPassword,
      newPassword,
      confirmPassword,
    });
  }

  @Post('forgotpassword')
  @HttpCode(HttpStatus.CREATED)
  forgotpassword(@Body() data: forgotpasswordDTO) {
    return this.authService.forgotpassword(data);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() data: UserVerifyDTO) {
    return this.authService.verifyAccount(data.email, data.verifyCode);
  }

  @Post('me')
  @HttpCode(HttpStatus.OK)
  profile(@Body() data: UserLoginDTO) {
    return this.authService.profile(data.email);
  }
}
