import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../core/port/client.repository';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ClientEntity } from 'src/modules/client/core/entities/client.entity';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(client: ClientEntity): Promise<void> {
    await this.prisma.client.create({
      data: {
        id: client.id,
        name: client.email,
        email: client.email,
        password: client.password,
      },
    });
  }

  async findAll(): Promise<ClientEntity[]> {
    const clients = await this.prisma.client.findMany();
    return clients.map(
      (client) => new ClientEntity(client.id, client.name, client.email),
    );
  }

  async findById(id: string): Promise<ClientEntity | null> {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) return null;

    return new ClientEntity(client.id, client.name, client.email);
  }

  async update(id: string, updateData: Partial<ClientEntity>): Promise<void> {
    await this.prisma.client.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({ where: { id } });
  }
}
