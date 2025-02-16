import { BadRequestException, Injectable } from '@nestjs/common';

import { TokenUser } from '@prisma/client';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';

@Injectable()
export class TokenRepoService {
  private modelName = 'TokenUser';
  constructor(private prisma: PrismaService) {}

  async storeToken(
    userId: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<TokenUser> {
    return this.prisma[this.modelName].create({
      data: {
        refreshToken,
        accessToken,
        userId,
      },
    });
  }
  async CheckToken(userId: string): Promise<TokenUser> {
    return await this.prisma[this.modelName].findOne({
      where: {
        userId: userId,
      },
    });
  }
  async CheckManyTokenStored(userId: string): Promise<any> {
    const resutl = await this.prisma[this.modelName].findMany({
      where: {
        userId: userId,
      },
    });
    if (resutl.length > 3) {
      throw new BadRequestException('Too many login attempts');
    }
    return resutl;
  }
}
