import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

import { Requester, TokenPayload } from 'src/shared/interface/interface';
import { UserLoginDTO } from 'src/modules/user/dto/user.dto';

import { ConfigService } from '@nestjs/config';
import { CommonService } from 'src/common/common.service';
import {
  ChangePasswordDTO,
  forgotpasswordDTO,
} from 'src/modules/auth/dto/changepasswordDTO';
import { TokenRepoService } from 'src/modules/token-repo/token-repo.service';
import { AuthAbstractService } from 'src/modules/auth/interface';
import { RedisService } from 'src/shared/components/redis/redis.service';
import { InjectQueue } from '@nestjs/bullmq';
import { QUEUENAME } from 'src/shared/components/bullmq/constants';
import { Queue } from 'bullmq';
import { StripeService } from 'src/shared/components/stripe/stripe.service';

@Injectable()
export class AuthService extends AuthAbstractService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private commonService: CommonService,
    private TokenService: TokenRepoService,
    private redisService: RedisService,
    @InjectQueue(QUEUENAME.sendEmail)
    private readonly sendEmailServiceBullMQ: Queue,
    
  ) {
    super();
  }
  //TODO:
  async register(data: CreateAuthDto): Promise<any> {
    const existingUser = await this.userService.checkExistEmail(data.email);

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
    // insert new user
    const user = await this.userService.create(newUserInfor);
    // send OTP to email
    //#TODO:  hardcore email to test const toEmailService = user.email

    const EmailReceiver = 'huuloc2026@gmail.com';
    this.sendEmailServiceBullMQ.add(EmailReceiver, newOTP);
    // return user infor basic
    return this.commonService.getUserOmitPassword(user);
  }
  //TODO:
  async login(dto: UserLoginDTO) {
    const user = await this.userService.findbyEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // 2. Check password
    const isMatch = await this.verifyPlainContentWithHashedContent(
      dto.password,
      user.password,
      user.salt,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === 'BANNED') {
      throw new ForbiddenException('User banned');
    }
    const userPayload: TokenPayload =
      this.commonService.getPayloadFromUser(user);

    const { accessToken, refreshToken } = await this.generateToken(userPayload);
    //Check Limit Device
    //await this.TokenService.CheckManyTokenStored(user.id);

    // // stored token
    //await this.TokenService.storeToken(user.id, accessToken, refreshToken);
    await this.redisService.saveAccessToken(user.id, accessToken, 3600000);
    const returnData = await this.commonService.getEssentialUserData(user)
    return { user:returnData,accessToken, refreshToken };
  }

  async logout(id: string): Promise<any> {
    console.log(id);
    return await this.redisService.deleteAccessToken(id);
    //return await this.TokenService.DeleteAllTokenOfUser(id);
  }

  private async verifyPlainContentWithHashedContent(
    plainText: string,
    hashedText: string,
    saltOfUser: string,
  ): Promise<boolean> {
    const is_matching: boolean = await bcrypt.compare(
      `${plainText}.${saltOfUser}`,
      hashedText,
    );
    if (!is_matching) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return is_matching;
  }
  //TODO:
  async update(requester: Requester, userId: string, dto: any): Promise<void> {
    if (requester.sub !== userId) {
      throw new ForbiddenException('Unauthorized update attempt');
    }
    await this.userService.update(userId, dto);
  }

  async profile(email: string): Promise<any> {
    const user = await this.userService.profile(email);
    return user;
  }

  async checkjwt(UserExist: string) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMzhlYzdkMi1kMjdjLTRlNDgtOTE4ZS1iM2NkY2FkYzM2ZjUiLCJlbWFpbCI6InNBQTEyMzEyYXNkc2Eyc3NzZHNzc3NzYXNkQGdtYWlsLmNvbSIsInJvbGUiOiJDTElFTlQiLCJpYXQiOjE3Mzk5NjgxNDEsImV4cCI6MTc0MDA1NDU0MX0.YpCnw1cgnLsVfqMxoqhzBT9lYdHeY6ewkw1Lb_fqk5w';
    const decode = await this.VerifyToken(token, 'AT');
    return decode;
  }

  generateAccessToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('AT_SECRET'),
      expiresIn: this.configService.getOrThrow<string>('AT_EXPIRE'),
    });
  }

  generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('RT_SECRET'),
      expiresIn: this.configService.getOrThrow<string>('RT_EXPIRE'),
    });
  }

  async VerifyToken(token: string, type: 'AT' | 'RT') {
    const decoded =
      type == 'AT'
        ? await this.jwtService.verify(token, {
            secret: this.configService.get<string>('AT_SECRET'),
          })
        : await this.jwtService.verify(token, {
            secret: this.configService.get<string>('RT_SECRET'),
          });
    return decoded;
  }

  async validateToken(token: string) {
    const decoded = await this.jwtService.verify(token, {
      secret: this.configService.get<string>('AT_SECRET'),
    });
    return decoded;
  }

  async generateToken(payload: TokenPayload) {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async ChangePassword(email: string, passwordBody: ChangePasswordDTO) {
    const existUser = await this.userService.findbyEmail(email);

    //check password match
    const checkMatch = await this.verifyPlainContentWithHashedContent(
      passwordBody.oldPassword,
      existUser.password,
      existUser.salt,
    );
    if (!checkMatch) {
      throw new BadRequestException('Wrong password');
    }
    const newHashedpassword = await bcrypt.hash(
      `${passwordBody.newPassword}.${existUser.salt}`,
      10,
    );

    // update in db
    await this.userService.update(existUser.id, {
      password: newHashedpassword,
    });

    const Payload = this.commonService.getPayloadFromUser(existUser);
    //create new key
    const { accessToken, refreshToken } = await this.generateToken(Payload);
    // delete all old session
    await this.TokenService.DeleteAllTokenOfUser(existUser.id);
    //store new Session
    await this.TokenService.storeToken(existUser.id, accessToken, refreshToken);

    return {
      message: "'Successfully changed password'",
      accessToken,
      refreshToken,
    };
  }
  async UploadAvatar() {}
  async verifyAccount(email: string, code: string) {
    const user = await this.userService.findbyEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.isVerify || user.verifyCode === null) {
      throw new UnauthorizedException('Account already verified');
    }
    if (code !== user.verifyCode) {
      throw new UnauthorizedException('Invalid code');
    }
    await this.userService.update(user.id, { isVerify: true });
    return {
      message: 'Successfully verify account',
    };
  }

  async forgotpassword(
    data: { newPassword: string; confirmPassword: string },
    email: string,
  ) {
    const user = await this.userService.findbyEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newOTP = await this.SendNewOTP(user.id);
    Logger.log(`New OTP ${newOTP} sending to ${user.email}`, 'ForgetPassword');
    //validated new otp <-> user in db
    await this.ValidateNewOTP(email, newOTP);
    //updated new password
    await this.updateNewPassword(
      user.id,
      data.newPassword,
      data.confirmPassword,
    );
    //revoke all session
    await this.TokenService.DeleteAllTokenOfUser(user.id);
    return {
      message: 'Successfully new password. Please re-login',
    };
  }
  async SendNewOTP(id: string) {
    //genereate new OTP
    const newOTP = this.commonService.generateOTP().toString();
    // save new OTP to this user
    await this.userService.update(id, { verifyCode: newOTP.toString() });
    return newOTP;
  }
  async ValidateNewOTP(email: string, code: string) {
    const user = await this.userService.findbyEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (code !== user.verifyCode) {
      throw new UnauthorizedException('Invalid code');
    }
    return {
      message: 'Successfully verify OTP',
    };
  }
  async updateNewPassword(
    id: string,
    password: string,
    confimrPassword: string,
  ) {
    if (password !== confimrPassword) {
      throw new ForbiddenException('Password not match');
    }
    await this.userService.update(id, { password });
  }
}
