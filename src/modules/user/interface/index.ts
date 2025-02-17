import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';

export interface IUserUseCase<T> {
  create(dto: Partial<T>): Promise<T>;
  findAll(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<T>>;
  findOneById(id: string): Promise<T | null>;
  update(id: string, dto: Partial<T>): Promise<T>;
  remove(id: string): Promise<boolean>;
}
