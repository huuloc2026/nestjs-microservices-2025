import {
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
@Injectable()
export class AuthService extends AuthAbstractService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }
  async register(createAuthDto: UserRegistrationDTO) {
    const existingUser = await this.userService.findbyEmail(
      createAuthDto.email,
    );
    if (existingUser) {
      throw new ForbiddenException('Email already exists');
    }

    const salt = bcrypt.genSaltSync(8);

    const hashedPassword = await bcrypt.hash(
      `${createAuthDto.password}.${salt}`,
      10,
    );
    const user = await this.userService.create({
      ...createAuthDto,
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
    // 2. Check password
    const isMatch = await bcrypt.compare(
      `${dto.password}.${user.salt}`,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
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
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password, salt, ...safeUser } = user;
    return safeUser;
  }

  async generateToken(payload: Requester) {
    return payload;
  }
}
