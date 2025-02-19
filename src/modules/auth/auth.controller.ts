import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserLoginDTO, UserVerifyDTO } from 'src/modules/user/dto/user.dto';
import {
  ChangePasswordDTO,
  forgotpasswordDTO,
} from 'src/modules/auth/dto/changepasswordDTO';
import { Public } from 'src/shared/decorators/public.decrators';
import { Request } from 'express';
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
  changepassword(
    @Body() data: ChangePasswordDTO,
    @Req() req: AuthenticatedRequest,
  ) {
    if (data.newPassword !== data.confirmPassword) {
      throw new ForbiddenException('Password not match');
    }
    return this.authService.ChangePassword(req.user.email, data);
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

  @Get('me')
  @HttpCode(HttpStatus.OK)
  profile(@Req() req: AuthenticatedRequest) {
    return this.authService.profile(req.user.email);
  }
}
