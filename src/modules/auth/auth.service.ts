import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Requester, TokenPayload } from 'src/shared/interface/interface';
import {
  UserLoginDTO,
  UserRegistrationDTO,
  UserUpdateDTO,
} from 'src/modules/user/dto/user.dto';
import { AuthAbstractService } from 'src/modules/auth/interface/auth.port';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { CommonService } from 'src/common/common.service';
@Injectable()
export class AuthService extends AuthAbstractService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private commonService: CommonService,
  ) {
    super();
  }
  async register(data: UserRegistrationDTO) {
    const existingUser = await this.userService.findbyEmail(data.email);
    if (existingUser) {
      throw new ForbiddenException('Email already exists');
    }

    const salt = bcrypt.genSaltSync(8);
    const newOTP = this.commonService.generateOTP();

    const hashedPassword = await bcrypt.hash(`${data.password}.${salt}`, 10);
    const user: User = await this.userService.create({
      ...data,
      verifyCode: newOTP.toString(),
      password: hashedPassword,
      salt,
    });

    return user;
  }

  async login(dto: UserLoginDTO) {
    const user = await this.userService.findbyEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await this.verifyPlainContentWithHashedContent(
      dto.password,
      user.password,
      user.salt,
    );
    // 2. Check password

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  private async verifyPlainContentWithHashedContent(
    plain_text: string,
    hashed_text: string,
    salt_user: string,
  ): Promise<boolean> {
    const is_matching: boolean = await bcrypt.compare(
      `${plain_text}.${salt_user}`,
      hashed_text,
    );
    if (!is_matching) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return is_matching;
  }

  async update(
    requester: Requester,
    userId: string,
    dto: UserUpdateDTO,
  ): Promise<void> {
    if (requester.sub !== userId) {
      throw new ForbiddenException('Unauthorized update attempt');
    }
    await this.userService.update(userId, dto);
  }

  async profile(userId: string): Promise<Omit<User, 'password' | 'salt'>> {
    const user = await this.userService.findOnebyId(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password, salt, ...safeUser } = user;
    return safeUser;
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

  async generateToken(payload: TokenPayload) {
    const access_token = await this.generateAccessToken(payload);
    const refresh_token = await this.generateRefreshToken(payload);
    return { access_token, refresh_token };
  }
}
