import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { IProductRepository } from 'src/modules/product/interface';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';
import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';
@Injectable()
export class ProductRepository extends IProductRepository {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, ModelName.Product);
  }
}
