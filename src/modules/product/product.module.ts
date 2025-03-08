import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
// import { ProductRepository } from 'src/modules/product/product.repo';
import { PrismaModule } from 'src/shared/components/prisma/prisma.module';
import { ProductRepository } from 'src/modules/product/infras/product.repo';
import { ProductUseCase } from 'src/modules/product/usecase';
import { SharedModule } from 'src/shared/shared.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductUseCase, ProductRepository],
})
export class ProductModule {}
