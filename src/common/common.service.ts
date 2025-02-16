import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { omit, pick } from 'lodash';

@Injectable()
export class CommonService {
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

  getUserOmitPassword(user: User) {
    return omit(user, ['password']);
  }
  getEssentialUserData(user: User) {
    return pick(user, ['id', 'email', 'role']);
  }
  getEssentialByCondition(user: User, condition: string[]) {
    return pick(user, condition);
  }
}
