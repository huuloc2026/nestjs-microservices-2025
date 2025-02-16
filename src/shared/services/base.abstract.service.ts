import { FindAllResponse } from 'src/shared/types/common.types';
import { BaseServiceInterface } from './base.interface.service';
import { BaseRepositoryInterface } from 'src/shared/repository/base.interface.repository';
import { BaseEntity, PagingSchemaDTO } from 'src/shared/data-model';

export abstract class BaseServiceAbstract<T>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(create_dto: T | any): Promise<T> {
    return await this.repository.create(create_dto);
  }

  async findAll(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<T>> {
    return await this.repository.findAll(filter, options);
  }

  async findOnebyId(id: string) {
    return await this.repository.findOneById(id);
  }

  async findOneByCondition(filter: Partial<T>) {
    return await this.repository.findOneByCondition(filter);
  }

  async update(id: string, update_dto: Partial<T>) {
    return await this.repository.update(id, update_dto);
  }

  async remove(id: string) {
    return !!(await this.repository.delete(id));
  }
}
