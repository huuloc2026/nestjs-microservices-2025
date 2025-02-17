import { FindAllResponse } from 'src/shared/types/common.types';
import { BaseServiceInterface } from './base.interface.service';
import { BaseRepositoryInterface } from 'src/shared/repository/base.interface.repository';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseServiceAbstract<T>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(createDto: Partial<T>): Promise<T> {
    return this.repository.create(createDto);
  }

  async findAll(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<T>> {
    return this.repository.findAll(filter, options);
  }

  async findOnebyId(id: string): Promise<T | null> {
    return this.repository.findOneById(id);
  }

  async findOneByCondition(filter: Record<string, any>): Promise<T | null> {
    return this.repository.findOneByCondition(filter);
  }

  async update(id: string, updateDto: Partial<T>): Promise<T> {
    return this.repository.update(id, updateDto);
  }

  async remove(id: string): Promise<any> {
    const data = await this.findOnebyId(id);
    if (!data) {
      throw new NotFoundException('Data not found');
    }
    await this.repository.delete(id);
  }

  async permanentlyDelete(id: string): Promise<void> {
    await this.repository.permanentlyDelete(id);
  }
}
