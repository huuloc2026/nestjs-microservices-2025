import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    Logger.log('Successfully connected database', PrismaService);
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
