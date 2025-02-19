import { Inject, Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { CLIENT_REPOSITORY } from 'src/modules/client/client-di';

import { ClientEntity } from 'src/modules/client/core/entities/client.entity';
import { ICLIENT_REPOSITORY } from 'src/modules/client/core/port/client.repo.interface';
import { ClientUseCase } from 'src/modules/client/core/port/client.service.interface';
import { PrismaClientRepository } from 'src/modules/client/infrastructure/prisma/client.prisma.repo';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';

import { FindAllResponse } from 'src/shared/types/common.types';

@Injectable()
export class ClientService extends ClientUseCase<Client> {
  constructor(
    protected readonly prisma: PrismaService,
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ICLIENT_REPOSITORY,
  ) {
    super(prisma, ModelName.Client);
  }
}
