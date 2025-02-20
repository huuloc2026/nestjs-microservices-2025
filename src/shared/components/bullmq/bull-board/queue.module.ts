import {
  Module,
  MiddlewareConsumer,
  NestModule,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { QUEUENAME } from 'src/shared/components/bullmq/constants';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({
      name: QUEUENAME.sendEmail,
      prefix: '::User',
    }),
  ],
})
export class UIBullBoardModule implements OnModuleInit, NestModule {
  private readonly serverAdapter = new ExpressAdapter();
  private readonly logger = new Logger('::::BullBoardModule:::');

  constructor(
    @InjectQueue(QUEUENAME.sendEmail) private readonly emailQueue: Queue,
  ) {}

  onModuleInit() {
    this.serverAdapter.setBasePath('/v1/api/queues');

    createBullBoard({
      queues: [new BullMQAdapter(this.emailQueue)],
      serverAdapter: this.serverAdapter,
    });

    this.logger.log(
      '✅ Bull Board UI is available at http://localhost:8386/v1/api/queues',
    );
  }

  configure(consumer: MiddlewareConsumer) {
    this.logger.log('📌 Applying Bull Board Middleware...');
    consumer.apply(this.serverAdapter.getRouter()).forRoutes('/queues');
  }
}
