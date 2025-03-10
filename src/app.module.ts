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
import { SharedModule } from './shared/shared.module';
import { ClientModule } from './modules/client/client.module';
import { AtStrategy } from 'src/shared/strategies/at.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from 'src/shared/guard';
import { NodemailerModule } from './shared/components/nodemailer/nodemailer.module';
import { BullmqModule } from './shared/components/bullmq/bullmq.module';
import { CategoryFactory } from './modules/category/category.factory';
import { StripeModule } from './shared/components/stripe/stripe.module';

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
    SharedModule,
    ClientModule,
    NodemailerModule,
    BullmqModule,
    StripeModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    CategoryFactory,
    AtStrategy,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
