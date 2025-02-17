import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseServiceAbstract } from 'src/shared/services/base.abstract.service';
import { $Enums, Product } from '@prisma/client';
import { ProductRepository } from 'src/modules/product/product.repo';
import { BaseAbstractRepository } from 'src/shared/repository/base.abstract.repository';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';

@Injectable()
export class ProductService extends BaseServiceAbstract<Product> {
  constructor(private readonly productRepositoy: ProductRepository) {
    super(productRepositoy);
  }

  findAll(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<
    FindAllResponse<{
      name: string;
      id: string;
      description: string | null;
      price: number;
      stock: number;
      imageUrl: string | null;
      categoryId: string | null;
      status: $Enums.BaseStatus;
      createdAt: Date;
      updatedAt: Date;
    }>
  > {
    if (!filter) {
      filter = { status: $Enums.BaseStatus.ACTIVE };
    }
    return this.productRepositoy.findAll(filter, options);
  }
}
