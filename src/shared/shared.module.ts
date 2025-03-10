import { Global, Module, Provider } from '@nestjs/common';
import { BullmqModule } from 'src/shared/components/bullmq/bullmq.module';
import { sendEmailProcessor } from 'src/shared/components/bullmq/queues/send-email.process';
import { NodemailerModule } from 'src/shared/components/nodemailer/nodemailer.module';
import { NodemailerService } from 'src/shared/components/nodemailer/nodemailer.service';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { RedisModule } from 'src/shared/components/redis/redis.module';
import { RedisService } from 'src/shared/components/redis/redis.service';
import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';
import { StripeModule } from './components/stripe/stripe.module';
import { StripeService } from './components/stripe/stripe.service';

@Global()
@Module({
  imports: [RedisModule, BullmqModule, NodemailerModule,StripeModule],
  providers: [
    BaseRepositoryPrisma,
    PrismaService,
    NodemailerService,
    RedisService,
    StripeService,
    // sendEmailProcessor,
  ],
  exports: [
    BaseRepositoryPrisma,
    PrismaService,
    NodemailerService,
    RedisService,

    // sendEmailProcessor,
  ],
})
export class SharedModule {}
