import { Injectable } from '@nestjs/common';
import { ProductUseCase } from 'src/modules/product/usecase';
import { ProductRepository } from 'src/modules/product/infras/product.repo';
@Injectable()
export class ProductService extends ProductUseCase {
  constructor(private readonly productRepositoy: ProductRepository) {
    super(productRepositoy);
  }
}
