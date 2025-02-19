import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    Logger.log('Successfully connected database ✅', 'Prisma');
  }
  async onModuleDestroy() {
    await this.$disconnect();
    Logger.log('Successfully disconnected database ⛔️', 'Prisma');
  }
}
