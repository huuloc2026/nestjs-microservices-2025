import { Inject, Injectable } from '@nestjs/common';

import { OrderUseCase } from 'src/modules/order/interface';
import { OrderRepository } from 'src/modules/order/infras/port/order.repo';

import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';

@Injectable()
export class OrderService extends OrderUseCase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, ModelName.Order);
  }
}
