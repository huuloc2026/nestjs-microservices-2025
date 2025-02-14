import { FindAllResponse } from 'src/shared/types/common.types';

export interface BaseRepositoryInterface<T> {
  create(dto: Partial<T>): Promise<T>;

  findOneById(id: string): Promise<T | null>;

  findOneByCondition(condition: object): Promise<T | null>;

  findAll(
    condition?: Record<string, any>,
    options?: object,
  ): Promise<FindAllResponse<T>>;

  update(id: string, dto: Partial<T>): Promise<T>;

  delete(id: string): Promise<T>;

  permanentlyDelete(id: string): Promise<boolean>;
}
