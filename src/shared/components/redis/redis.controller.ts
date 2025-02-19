import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post('set')
  async setCache(
    @Body() { key, value, ttl }: { key: string; value: any; ttl?: number },
  ) {
    return this.redisService.createOrUpdate(key, value, ttl);
  }

  @Get(':key')
  async getCache(@Param('key') key: string) {
    return this.redisService.get(key);
  }

  @Delete(':key')
  async deleteCache(@Param('key') key: string) {
    return this.redisService.delete(key);
  }
}
