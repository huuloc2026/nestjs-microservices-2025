import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';

export interface BaseRepositoryInterface<T> {
  create(dto: Partial<T>): Promise<T>;

  findOneById(id: string): Promise<T | null>;

  findOneByCondition(condition: object): Promise<T | null>;

  findAll(
    condition?: Record<string, any>,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<T>>;

  update(id: string, dto: Partial<T>): Promise<T>;

  delete(id: string): Promise<any>;

  permanentlyDelete(id: string): Promise<void>;
}
