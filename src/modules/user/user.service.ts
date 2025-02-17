import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/modules/user/user.repo';
import { $Enums, User } from '@prisma/client';
import { BaseServiceAbstract } from 'src/shared/services/base.abstract.service';
import { IUserUseCase } from 'src/modules/user/interface';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';

@Injectable()
export class UserService implements IUserUseCase<User> {
  constructor(private readonly repository: UserRepository) {}

  async create(data: User) {
    return await this.repository.insert(data);
  }

  async update(id: string, data: any): Promise<any> {
    return await this.repository.update(id, data);
  }

  async findOneById(id: string) {
    return await this.repository.getDetail(id);
  }

  async findAll(filter?: object, options?: PagingSchemaDTO) {
    return await this.repository.list(filter, options);
  }
  async findbyEmail(email: string) {
    return await this.repository.findbyEmail(email);
  }
  async remove(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
