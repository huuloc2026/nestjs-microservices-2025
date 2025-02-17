import { Global, Module, Provider } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { BaseRepositoryPrisma } from 'src/shared/repository/baserepo-prisma';
@Global()
@Module({
  providers: [BaseRepositoryPrisma, PrismaService],
  exports: [BaseRepositoryPrisma, PrismaService],
})
export class SharedModule {}
