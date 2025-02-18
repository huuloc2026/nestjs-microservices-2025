import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenUser } from '@prisma/client';
import { TokenRepository } from 'src/modules/token-repo/infras/repo/TokenUserRepository';
import { ITokenUseCase } from 'src/modules/token-repo/usecase';

import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { ModelName } from 'src/shared/modelName';
import { BaseUseCase } from 'src/shared/services/base-usecase';

@Injectable()
export class TokenRepoService
  extends BaseUseCase<TokenUser>
  implements ITokenUseCase<TokenUser>
{
  constructor(
    private readonly repository: TokenRepository,
    protected prisma: PrismaService,
  ) {
    super(prisma, ModelName.TokenUser);
  }

  async storeToken(userId: string, accessToken: string, refreshToken: string) {
    const data = { userId, accessToken, refreshToken };
    const result = await this.repository.insert(data);
    return result;
  }

  //#TODO: check tokenUser
  async CheckManyTokenStored(userId: string): Promise<void> {
    const LimitDevice = 2;
    const result = await this.prisma.tokenUser.findMany({
      where: { userId },
    });
    if (result.length > LimitDevice) {
      throw new BadRequestException(
        `Too many login attempts. Less than ${LimitDevice} Device. Please Log out `,
      );
    }
  }

  async deleteByToken(token: string): Promise<boolean> {
    try {
      await this.repository.list({ where: { token } });
      return true;
    } catch (error) {
      throw new BadRequestException('Failed to delete token');
    }
  }
}
