import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { ModelName } from 'src/modules/product/model/product.model';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { IRepository } from 'src/shared/interface/interface';
import { BaseRepositoryPrisma } from 'src/shared/repository/baserepo-prisma';
@Injectable()
export class ProductRepository extends BaseRepositoryPrisma<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, ModelName);
  }
}
