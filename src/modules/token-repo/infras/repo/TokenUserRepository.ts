import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { TokenUser } from '@prisma/client';
import { BaseAbstractRepository } from 'src/shared/repository/base.abstract.repository';
import { BaseRepositoryPrisma } from 'src/shared/repository/baserepo-prisma';
import { ModelName } from 'src/shared/modelName';

@Injectable()
export class TokenRepository extends BaseRepositoryPrisma<TokenUser, any, any> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, ModelName.TokenUser);
  }
}
