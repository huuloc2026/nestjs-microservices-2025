import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';

import { User } from '@prisma/client';

import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';
import { ModelName } from 'src/shared/modelName';
import { UserNotFound } from 'src/modules/user/usecase/error';
import { UserRepository } from 'src/modules/user/interface';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, ModelName.User);
  }

  async findbyEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }
}
