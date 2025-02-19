import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
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

  async findbyEmail(email: string) {
    const exist = await this.prisma.user.findFirst({ where: { email } });
    if (!exist) {
      throw new NotFoundException();
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
}
