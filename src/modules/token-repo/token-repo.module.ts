import { Module } from '@nestjs/common';
import { TokenRepoService } from './token-repo.service';
import { PrismaModule } from 'src/shared/components/prisma/prisma.module';
import { TokenUserRepository } from 'src/modules/token-repo/TokenUserRepository';

@Module({
  imports: [PrismaModule],
  providers: [TokenRepoService, TokenUserRepository],
  exports: [TokenRepoService],
})
export class TokenRepoModule {}
