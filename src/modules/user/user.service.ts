import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { CreateUserDto } from 'src/modules/user/dto/user.dto';
import { UserUseCase } from 'src/modules/user/interface';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';

@Injectable()
export class UserService extends UserUseCase<User> {
  constructor(
    protected readonly prisma: PrismaService,
    private commonService: CommonService,
  ) {
    super(prisma, ModelName.User);
  }

  async createNewUser(data: CreateUserDto) {
    const existingUser = await this.checkExistEmail(data.email);

    if (existingUser) {
      throw new ForbiddenException('Email already exists');
    }
    //generate salt, otp
    const salt = await this.commonService.generateSalt();
    const newOTP = this.commonService.generateOTP();
    const hashedPassword = await bcrypt.hash(`${data.password}.${salt}`, 10);
    const newUserInfor = {
      ...data,
      password: hashedPassword,
      salt,
      verifyCode: newOTP.toString(),
    };
    console.log(newUserInfor);
    // insert new user
    const user = await this.create(newUserInfor);
    // send OTP to email

    // return user infor basic
    return this.commonService.getUserOmitPassword(user);
  }

  async findbyEmail(email: string) {
    const exist = await this.prisma.user.findFirst({ where: { email } });
    if (!exist) {
      throw new NotFoundException('User not found');
    }
    return exist;
  }
  async checkExistEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async getUserWithRole(id: string) {
    const existUser = await this.findbyEmail(id);
    return this.commonService.getEssentialUserData(existUser);
  }
  async profile(email: string): Promise<any> {
    const user = await this.findbyEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.status === 'BANNED' || user.status === 'DELETED') {
      throw new UnauthorizedException('User banned or Deleted');
    }
    const safeUser = this.commonService.getEssentialUserData(user);
    return safeUser;
  }
}
