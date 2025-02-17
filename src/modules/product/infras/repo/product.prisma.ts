import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';
import { BaseRepositoryPrisma } from 'src/shared/repository/baserepo-prisma';
@Injectable()
export class ProductRepository extends BaseRepositoryPrisma<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, ModelName.Product);
  }
}
