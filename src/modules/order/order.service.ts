import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { $Enums, BaseStatus, Order } from '@prisma/client';
import { OrderRepository } from 'src/modules/order/order.repo';
import { BaseServiceAbstract } from 'src/shared/services/base.abstract.service';
import { BaseAbstractRepository } from 'src/shared/repository/base.abstract.repository';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';

@Injectable()
export class OrderService extends BaseServiceAbstract<Order> {
  constructor(private readonly orderRepository: OrderRepository) {
    super(orderRepository);
  }
}
