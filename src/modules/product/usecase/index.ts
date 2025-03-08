import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import {
  IProductRepository,
  IProductUseCase,
} from 'src/modules/product/interface';
import { NotfoundProduct } from 'src/modules/product/usecase/error';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';
import { FindAllResponse } from 'src/shared/types/common.types';
@Injectable()
export class ProductUseCase implements IProductUseCase {
  constructor(
    private readonly repository: BaseRepositoryPrisma<
      Product,
      CreateProductDto,
      UpdateProductDto
    >,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    
    return await this.repository.insert(product);
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    return await this.repository.update(id, product);
  }

  async delete(id: string): Promise<Product> {
    return this.repository.delete(id);
  }

  async getDetail(id: string): Promise<Product> {
    const product = await this.repository.getDetail(id);
    if (!product) {
      throw new NotFoundException(NotfoundProduct);
    }
    return product;
  }

  async list(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<Product>> {
    filter = {
      ...filter,
      status: 'ACTIVE'
    };
    options = {
      ...options,
      orderBy: { createdAt: 'desc' },
    };
    return await this.repository.list(filter, options);
  }
  async softdelete(id: string): Promise<Product> {
    return await this.repository.softdelete(id);
  }
}
