import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

const redisModuleFactory = CacheModule.registerAsync({
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    ttl: configService.get('CACHE_TTL'),
    store: redisStore,
    isGlobal: true,
    host: configService.getOrThrow('CACHE_HOST'),
    port: configService.getOrThrow('CACHE_PORT'),
    url: configService.getOrThrow('CACHE_URL'),
  }),
  inject: [ConfigService],
});

@Module({
  imports: [redisModuleFactory],
  controllers: [RedisController],
  providers: [RedisService],
})
export class RedisModule {}
