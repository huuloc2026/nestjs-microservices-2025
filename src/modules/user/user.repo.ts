import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';

import { User } from '@prisma/client';

import { BaseRepositoryPrisma } from 'src/shared/repository/baserepo-prisma';
import { CreateUserDto, UpdateUserDto } from 'src/modules/user/dto/user.dto';
import { ModelName } from 'src/shared/modelName';
import { UserNotFound } from 'src/modules/user/usecase/error';

@Injectable()
export class UserRepository extends BaseRepositoryPrisma<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, ModelName.User);
  }

  async findbyEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }
}
