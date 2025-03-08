import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductUseCase } from 'src/modules/product/usecase';
import { ProductRepository } from 'src/modules/product/infras/product.repo';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService extends ProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService
  ) {
    super(productRepository);
  }

  async createNewProduct(createProductDto: CreateProductDto) {
    const { name, description, price, stock, imageUrl, categoryId } = createProductDto;

  
    await this.categoryService.getCategoryById(categoryId);

    return await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl,
        categoryId,
      },
    });
  }
}
