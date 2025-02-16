import { FindAllResponse } from 'src/shared/types/common.types';

export interface Write<T> {
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  remove(id: string): Promise<boolean>;
}

export interface Read<T> {
  findAll(
    filter?: Record<string, any>,
    options?: { page?: number; limit?: number },
  ): Promise<FindAllResponse<T>>;
  findOnebyId(id: string): Promise<T | null>;
  findOneByCondition(filter: Partial<T>): Promise<T | null>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
