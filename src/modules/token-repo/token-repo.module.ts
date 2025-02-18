import { Module } from '@nestjs/common';
import { TokenRepoService } from './token-repo.service';
import { PrismaModule } from 'src/shared/components/prisma/prisma.module';
import { TokenRepository } from 'src/modules/token-repo/infras/repo/TokenUserRepository';

@Module({
  imports: [],
  providers: [TokenRepoService, TokenRepository],
  exports: [TokenRepoService],
})
export class TokenRepoModule {}
