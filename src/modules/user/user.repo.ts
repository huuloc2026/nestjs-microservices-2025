import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';

import { User } from '@prisma/client';
import { BaseAbstractRepository } from 'src/shared/repository/base.abstract.repository';

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  getModel() {
    return this.prisma.user;
  }
}
