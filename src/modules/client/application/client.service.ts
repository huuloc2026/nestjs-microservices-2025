import { Inject, Injectable } from '@nestjs/common';
import { CLIENT_REPOSITORY } from 'src/modules/client/client-di';

import { ClientEntity } from 'src/modules/client/core/entities/client.entity';
import { ICLIENT_REPOSITORY } from 'src/modules/client/core/port/client.repository';
import { PrismaClientRepository } from 'src/modules/client/infrastructure/prisma/client.prisma.repo';

import { FindAllResponse } from 'src/shared/types/common.types';

@Injectable()
export class ClientService {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: PrismaClientRepository,
  ) {}

  async createClient(
    name: string,
    email: string,
    password: string,
  ): Promise<ClientEntity> {
    const uuid = Math.random().toString();
    const client = new ClientEntity(uuid, name, email, password);

    await this.clientRepository.insert(client);
    return client;
  }

  async getAllClients(): Promise<FindAllResponse<ClientEntity>> {
    return await this.clientRepository.list();
  }

  async getClientById(id: string): Promise<ClientEntity | null> {
    return this.clientRepository.getDetail(id);
  }

  async updateClient(
    id: string,
    updateData: Partial<ClientEntity>,
  ): Promise<ClientEntity | null> {
    return this.clientRepository.update(id, updateData);
  }

  async deleteClient(id: string): Promise<ClientEntity> {
    return this.clientRepository.softdelete(id);
  }
}
