import { BadRequestException, Injectable } from '@nestjs/common';

import { TokenUser } from '@prisma/client';
import { TokenUserRepository } from 'src/modules/token-repo/TokenUserRepository';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { BaseServiceAbstract } from 'src/shared/services/base.abstract.service';
import { FindAllResponse } from 'src/shared/types/common.types';

@Injectable()
export class TokenRepoService extends BaseServiceAbstract<TokenUser> {
  private modelName = 'TokenUser';
  constructor(
    private readonly tokenRepositoy: TokenUserRepository,
    private prisma: PrismaService,
  ) {
    super(tokenRepositoy);
  }

  async create(
    create_dto:
      | {
          id: string;
          userId: string;
          accessToken: string;
          refreshToken: string;
          status: boolean;
          createdAt: Date;
          updatedAt: Date;
        }
      | any,
  ): Promise<{
    id: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
  }> {
    return await this.tokenRepositoy.create(create_dto);
  }

  findAll(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<
    FindAllResponse<{
      id: string;
      userId: string;
      accessToken: string;
      refreshToken: string;
      status: boolean;
      createdAt: Date;
      updatedAt: Date;
    }>
  > {
    return this.tokenRepositoy.findAll(filter, options);
  }

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
