import { Client } from '@prisma/client';
import { ClientEntity } from 'src/modules/client/core/entities/client.entity';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';
import { BaseRepositoryPrisma } from 'src/shared/repository/baserepo-prisma';

// export abstract class ClientRepository {
//   abstract create(client: ClientEntity): Promise<void>;
//   abstract findAll(): Promise<ClientEntity[]>;
//   abstract findById(id: string): Promise<ClientEntity | null>;
//   abstract update(id: string, client: Partial<ClientEntity>): Promise<void>;
//   abstract delete(id: string): Promise<void>;
// }

export class ICLIENT_REPOSITORY extends BaseRepositoryPrisma<
  Client,
  any,
  any
> {}
