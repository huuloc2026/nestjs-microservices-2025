import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserLoginDTO, UserVerifyDTO } from 'src/modules/user/dto/user.dto';
import {
  ChangePasswordDTO,
  forgotpasswordDTO,
} from 'src/modules/auth/dto/changepasswordDTO';
import { Public } from 'src/shared/decorators/public.decrators';
import { AuthenticatedRequest } from 'src/shared/types/common.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() newUser: CreateAuthDto) {
    return this.authService.register(newUser);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  profile(@Req() req: AuthenticatedRequest) {
    return this.authService.profile(req.user.email);
  }

  @Post('forgotpassword')
  @HttpCode(HttpStatus.CREATED)
  forgotpassword(
    @Body() data: { newPassword: string; confirmPassword: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.authService.forgotpassword({ ...data }, req.user.email);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() UserExist: UserLoginDTO) {
    return this.authService.login(UserExist);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: AuthenticatedRequest) {
    return this.authService.logout(req.user.sub);
  }

  @Post('changepassword')
  @HttpCode(HttpStatus.CREATED)
  changepassword(
    @Body() data: ChangePasswordDTO,
    @Req() req: AuthenticatedRequest,
  ) {
    if (data.newPassword !== data.confirmPassword) {
      throw new ForbiddenException('Password not match');
    }
    return this.authService.ChangePassword(req.user.email, data);
  }

  @Post('verify')
  @Public()
  @HttpCode(HttpStatus.OK)
  verify(@Body() data: UserVerifyDTO) {
    return this.authService.verifyAccount(data.email, data.verifyCode);
  }
}
