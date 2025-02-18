import { Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/modules/order/interface';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';

@Injectable()
export class OrderRepository extends IOrderRepository {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, ModelName.Order);
  }
}
