import { Module } from '@nestjs/common';
import { BullmqService } from './bullmq.service';
import { BullmqController } from './bullmq.controller';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

const bullMQModuleFactory = BullModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    connection: {
      url: configService.getOrThrow('CACHE_URL'),
    },
  }),
});

@Module({
  imports: [bullMQModuleFactory],
  controllers: [BullmqController],
  providers: [BullmqService],
  exports: [BullmqService],
})
export class BullmqModule {}
