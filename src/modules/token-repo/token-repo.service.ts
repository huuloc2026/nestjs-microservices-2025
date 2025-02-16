import { Injectable } from '@nestjs/common';

import { TokenUser } from '@prisma/client';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';

@Injectable()
export class TokenRepoService {
  constructor(private prisma: PrismaService) {}

  async storeToken(
    userId: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<TokenUser> {
    const modelName = 'TokenUser';

    return this.prisma[modelName].create({
      data: {
        refreshToken,
        accessToken,
        userId,
      },
    });
  }
}
