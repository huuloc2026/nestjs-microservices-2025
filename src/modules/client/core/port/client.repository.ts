import { ClientEntity } from 'src/modules/client/core/entities/client.entity';

export abstract class ClientRepository {
  abstract create(client: ClientEntity): Promise<void>;
  abstract findAll(): Promise<ClientEntity[]>;
  abstract findById(id: string): Promise<ClientEntity | null>;
  abstract update(id: string, client: Partial<ClientEntity>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
