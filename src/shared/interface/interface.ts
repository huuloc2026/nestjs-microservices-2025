import { Prisma, Role, BaseStatus } from '@prisma/client';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';

export interface TokenPayload {
  sub: string;
  email: string;
  role: Role;
}

export interface Requester extends TokenPayload {}

// export interface IProductUseCase {
//   create(product: CreateProductDto): Promise<Product>;
//   update(id: string, product: UpdateProductDto): Promise<Product>;
//   delete(id: string): Promise<Product>;
//   getDetail(id: string): Promise<Product>;
//   list(
//     filter?: object,
//     options?: PagingSchemaDTO,
//   ): Promise<FindAllResponse<Product>>;
// }

export const filterCond = {
  status: BaseStatus.ACTIVE,
};
export interface IRepository<Entity, CreateDto, UpdateDto>
  extends ICommandRepository<Entity, CreateDto, UpdateDto>,
    IQueryRepository<Entity> {}
export interface ICommandRepository<Entity, CreateDto, UpdateDto> {
  insert(data: CreateDto): Promise<Entity>;
  update(id: string, data: UpdateDto): Promise<Entity>;
  delete(id: string): Promise<Entity>;
}
export interface IQueryRepository<Entity> {
  getDetail(id: string): Promise<Entity>;
  list(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<Entity>>;
}
