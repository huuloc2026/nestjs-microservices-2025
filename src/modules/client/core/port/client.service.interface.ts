import { Client } from '@prisma/client';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';
import { BaseUseCase, IBaseUseCase } from 'src/shared/services/base-usecase';
import { FindAllResponse } from 'src/shared/types/common.types';

export interface IClientService extends IBaseUseCase<Client> {}

export abstract class ClientUseCase<Client>
  extends BaseUseCase<Client>
  implements IBaseUseCase<Client> {}
