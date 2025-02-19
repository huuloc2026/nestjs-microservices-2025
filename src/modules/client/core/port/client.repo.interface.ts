import { Client } from '@prisma/client';
import { ClientEntity } from 'src/modules/client/core/entities/client.entity';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';
import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';

export class ICLIENT_REPOSITORY extends BaseRepositoryPrisma<
  Client,
  any,
  any
> {}
