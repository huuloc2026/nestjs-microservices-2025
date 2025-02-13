import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/components/prisma/prisma.module';
import { PrismaService } from './shared/components/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PaymentModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    OrderItemModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
