import { Injectable } from '@nestjs/common';
import { ICLIENT_REPOSITORY } from '../../core/port/client.repo.interface';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ClientEntity } from 'src/modules/client/core/entities/client.entity';
import { $Enums } from '@prisma/client';
import { FindAllResponse } from 'src/shared/types/common.types';
import { IRepository } from 'src/shared/interface/interface';
import { PagingSchemaDTO } from 'src/shared/data-model';

@Injectable()
export class PrismaClientRepository extends ICLIENT_REPOSITORY {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'client');
  }
}
