import { Inject, Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { BaseAbstractRepository } from 'src/shared/repository/base.abstract.repository';

@Injectable()
export class OrderRepository extends BaseAbstractRepository<Order> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  getModel() {
    return this.prisma.order;
  }
}
