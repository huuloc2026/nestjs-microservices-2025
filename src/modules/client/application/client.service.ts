import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../core/port/client.repository';
import { ClientEntity } from 'src/modules/client/core/entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async createClient(name: string, email: string): Promise<ClientEntity> {
    const client = new ClientEntity(
      'uuid', // Generate UUID here
      name,
      email,
    );

    await this.clientRepository.create(client);
    return client;
  }

  async getAllClients(): Promise<ClientEntity[]> {
    return this.clientRepository.findAll();
  }

  async getClientById(id: string): Promise<ClientEntity | null> {
    return this.clientRepository.findById(id);
  }

  async updateClient(
    id: string,
    updateData: Partial<ClientEntity>,
  ): Promise<void> {
    return this.clientRepository.update(id, updateData);
  }

  async deleteClient(id: string): Promise<void> {
    return this.clientRepository.delete(id);
  }
}
