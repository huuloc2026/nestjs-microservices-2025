import { Global, Module, Provider } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { RedisModule } from 'src/shared/components/redis/redis.module';
import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';
@Global()
@Module({
  imports: [RedisModule],
  providers: [BaseRepositoryPrisma, PrismaService],
  exports: [BaseRepositoryPrisma, PrismaService],
})
export class SharedModule {}
