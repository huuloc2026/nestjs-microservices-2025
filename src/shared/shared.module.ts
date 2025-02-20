import { Global, Module, Provider } from '@nestjs/common';
import { BullmqModule } from 'src/shared/components/bullmq/bullmq.module';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { RedisModule } from 'src/shared/components/redis/redis.module';
import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';
@Global()
@Module({
  imports: [RedisModule, BullmqModule],
  providers: [BaseRepositoryPrisma, PrismaService],
  exports: [BaseRepositoryPrisma, PrismaService],
})
export class SharedModule {}
