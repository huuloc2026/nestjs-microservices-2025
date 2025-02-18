import { Module } from '@nestjs/common';
import { ClientService } from './application/client.service';
import { ClientController } from './infrastructure/controller/client.controller';
import { ClientRepository } from 'src/modules/client/core/port/client.repository';
import { PrismaClientRepository } from 'src/modules/client/infrastructure/prisma/client.prisma.repo';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
  exports: [ClientRepository],
})
export class ClientModule {}
