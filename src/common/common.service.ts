import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { omit, pick } from 'lodash';
import { TokenPayload } from 'src/shared/interface/interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class CommonService {
  constructor(private configService: ConfigService) {}
  async generateSecretKey(type: 'AT' | 'RT', salt: string) {
    const AT_SECRET = `${this.configService.get<string>('AT_SECRET')}${salt}`;
    const RT_SECRET = `${this.configService.get<string>('RT_SECRET')}${salt}`;
    const Secret = type == 'AT' ? AT_SECRET : RT_SECRET;
    console.log(Secret);
    return Secret;
  }
  async generateSalt() {
    return await bcrypt.genSalt(10);
  }
  generateOTP(): number {
    // Declare a digits variable
    // which stores all digits
    let digits = '0123456789';
    let OTP = '';
    let len = digits.length;
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }
    return Number(OTP);
  }
  /**
   *
   * @param user @type User
   * @returns User without password
   */
  getUserOmitPassword(user: User) {
    return omit(user, ['password']);
  }
  /**
   *
   * @param user @type User
   * @returns User with essential data
   */
  getEssentialUserData(user: User) {
    return pick(user, ['id', 'email', 'role']);
  }
  /**
   *
   * @param user @type User
   * @returns User with essential data
   */
  getPayloadFromUser(user: User): TokenPayload {
    const userPicked = pick(user, ['id', 'email', 'role']);
    const result: TokenPayload = {
      sub: userPicked.id,
      email: userPicked.email,
      role: userPicked.role,
    };
    return result;
  }

  /**
   *
   * @param user @type User
   * @returns User with pick optional
   */
  getEssentialByCondition(user: User, condition: string[]) {
    return pick(user, condition);
  }
}
