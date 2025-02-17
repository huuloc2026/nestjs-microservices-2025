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
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from './common/common.module';
import { TokenRepoModule } from './modules/token-repo/token-repo.module';
import { RedisModule } from './shared/components/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    UserModule,
    PaymentModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    OrderItemModule,
    AuthModule,
    CommonModule,
    TokenRepoModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
