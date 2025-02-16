import { Module } from '@nestjs/common';
import { TokenRepoService } from './token-repo.service';
import { PrismaModule } from 'src/shared/components/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TokenRepoService],
  exports: [TokenRepoService],
})
export class TokenRepoModule {}
