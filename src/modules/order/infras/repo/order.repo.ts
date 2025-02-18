import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { CreateOrderDto } from 'src/modules/order/dto/create-order.dto';
import { IOrderRepository } from 'src/modules/order/dto/interface';
import { UpdateOrderDto } from 'src/modules/order/dto/update-order.dto';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';
import { BaseRepositoryPrisma } from 'src/shared/repository/baserepo-prisma';
@Injectable()
export class OrderRepository extends IOrderRepository {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, ModelName.Order);
  }
}
