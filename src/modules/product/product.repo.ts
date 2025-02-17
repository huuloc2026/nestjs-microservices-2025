import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { BaseAbstractRepository } from 'src/shared/repository/base.abstract.repository';

@Injectable()
export class ProductRepository extends BaseAbstractRepository<Product> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  getModel() {
    return this.prisma.product;
  }
}
