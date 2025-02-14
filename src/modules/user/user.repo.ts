import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { User } from './user.model';
import { BaseRepositoryInterface } from 'src/shared/repository/base/base.interface.repository';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';
import { BaseAbstractRepository } from 'src/shared/repository/base/base.abstract.repository';

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  getModel() {
    return this.prisma.user;
  }
}
