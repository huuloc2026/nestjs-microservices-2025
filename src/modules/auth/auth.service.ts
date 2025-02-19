import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Requester, TokenPayload } from 'src/shared/interface/interface';
import { UserLoginDTO } from 'src/modules/user/dto/user.dto';

import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { CommonService } from 'src/common/common.service';
import {
  ChangePasswordDTO,
  forgotpasswordDTO,
} from 'src/modules/auth/dto/changepasswordDTO';
import { TokenRepoService } from 'src/modules/token-repo/token-repo.service';
import { AuthAbstractService } from 'src/modules/auth/interface';
import { USER_SERVICE } from 'src/modules/user/interface/user-di.token';

@Injectable()
export class AuthService extends AuthAbstractService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private commonService: CommonService,
    private TokenService: TokenRepoService,
  ) {
    super();
  }
  //TODO:
  async register(data: CreateAuthDto): Promise<any> {
    const existingUser = await this.userService.checkExistEmail(data.email);

    if (existingUser) {
      throw new ForbiddenException('Email already exists');
    }

    const salt = await this.commonService.generateSalt();
    const newOTP = this.commonService.generateOTP();

    const hashedPassword = await bcrypt.hash(`${data.password}.${salt}`, 10);
    const newUserInfor = {
      ...data,
      password: hashedPassword,
      salt,
      verifyCode: newOTP.toString(),
    };
    const user = await this.userService.create(newUserInfor);

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
    const userPayload: TokenPayload =
      this.commonService.getPayloadFromUser(user);

    const { accessToken, refreshToken } = await this.generateToken(userPayload);
    //Check Limit Device
    await this.TokenService.CheckManyTokenStored(user.id);

    // // stored token
    await this.TokenService.storeToken(user.id, accessToken, refreshToken);

    return { accessToken, refreshToken };
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

  async profile(email: string): Promise<Omit<User, 'password' | 'salt'>> {
    console.log(email);
    const user = await this.userService.findbyEmail(email);
    console.log(user);
    const safeUser = this.commonService.getUserOmitPassword(user);
    return safeUser;
  }

  async checkjwt(UserExist) {
    return 'checkjwt';
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
  async forgotpassword(data: forgotpasswordDTO) {}
}
