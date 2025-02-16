import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/shared/components/prisma/prisma.module';
import { ProductRepository } from 'src/modules/product/product.repo';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
