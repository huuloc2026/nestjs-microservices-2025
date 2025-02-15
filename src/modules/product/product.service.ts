import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseServiceAbstract } from 'src/shared/services/base.abstract.service';
import { Product } from '@prisma/client';
import { ProductRepository } from 'src/modules/product/product.repo';

@Injectable()
export class ProductService extends BaseServiceAbstract<Product> {
  constructor(private readonly productRepository: ProductRepository) {
    super(productRepository);
  }
}
