import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/modules/user/user.repo';
import { User } from '@prisma/client';
import { BaseServiceAbstract } from 'src/shared/services/base.abstract.service';

@Injectable()
export class UserService extends BaseServiceAbstract<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
  async findbyEmail(email: string) {
    return await this.userRepository.findOneByCondition({ email });
  }
}
