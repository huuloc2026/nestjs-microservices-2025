import { $Enums, Order } from '@prisma/client';
import { CreateOrderDto } from 'src/modules/order/infras/dto/create-order.dto';
import { UpdateOrderDto } from 'src/modules/order/infras/dto/update-order.dto';
import { OrderRepository } from 'src/modules/order/infras/port/order.repo';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { ModelName } from 'src/shared/modelName';
import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';
import { BaseUseCase, IBaseUseCase } from 'src/shared/services/base-usecase';
import { FindAllResponse } from 'src/shared/types/common.types';

export class OrderUseCase extends BaseUseCase<Order> {}

export class IOrderRepository extends BaseRepositoryPrisma<
  Order,
  Partial<Order>,
  Partial<Order>
> {}
