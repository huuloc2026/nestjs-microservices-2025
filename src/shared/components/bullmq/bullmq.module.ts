import { Module, NestModule } from '@nestjs/common';
import { BullmqService } from './bullmq.service';
import { BullmqController } from './bullmq.controller';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { UIBullBoardModule } from 'src/shared/components/bullmq/bull-board/queue.module';

export const bullMQModuleFactory = BullModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    connection: {
      url: configService.getOrThrow('CACHE_URL'),
    },
  }),
});
// // const expressAdapter = new ExpressAdapter();
// // expressAdapter.setBasePath('/queues');
// const BullBoardModuleFactoryUI = BullBoardModule.forRoot({
//   route: 'queues',
//   adapter: ExpressAdapter,
// });

@Module({
  imports: [bullMQModuleFactory, UIBullBoardModule],
  controllers: [BullmqController],
  providers: [BullmqService],
  exports: [BullmqService],
})
export class BullmqModule {}
