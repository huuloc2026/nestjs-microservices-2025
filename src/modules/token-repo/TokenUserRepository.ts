import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { TokenUser } from '@prisma/client';
import { BaseAbstractRepository } from 'src/shared/repository/base.abstract.repository';

@Injectable()
export class TokenUserRepository extends BaseAbstractRepository<TokenUser> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  getModel() {
    return this.prisma.tokenUser;
  }
}
