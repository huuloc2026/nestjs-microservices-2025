import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { PrismaModule } from 'src/shared/components/prisma/prisma.module';
import { OrderRepository } from 'src/modules/order/infras/port/order.repo';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
