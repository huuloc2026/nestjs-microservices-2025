import { Product } from '@prisma/client';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { IRepository } from 'src/shared/interface/interface';
import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';
import { FindAllResponse } from 'src/shared/types/common.types';

export interface IProductUseCase {
  create(product: CreateProductDto): Promise<Product>;
  update(id: string, product: UpdateProductDto): Promise<Product>;
  softdelete(id: string): Promise<Product>;
  delete(id: string): Promise<Product>;
  getDetail(id: string): Promise<Product>;
  list(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<Product>>;
}
export class IProductRepository extends BaseRepositoryPrisma<
  Product,
  CreateProductDto,
  UpdateProductDto
> {}
