import { Module, Provider } from '@nestjs/common';
import { ClientService } from './application/client.service';
import { ClientController } from './infrastructure/controller/client.controller';
import { PrismaClientRepository } from 'src/modules/client/infrastructure/prisma/client.prisma.repo';
import {
  CLIENT_REPOSITORY,
  CLIENT_SERVICE,
} from 'src/modules/client/client-di';
import { ICLIENT_REPOSITORY } from 'src/modules/client/core/port/client.repository';
const repositories: Provider[] = [
  { provide: CLIENT_REPOSITORY, useClass: PrismaClientRepository },
];

const services: Provider[] = [
  { provide: CLIENT_SERVICE, useClass: ClientService },
];
@Module({
  controllers: [ClientController],
  providers: [...services, ...repositories],
  exports: [],
})
export class ClientModule {}
