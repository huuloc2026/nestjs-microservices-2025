import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { User } from './user.model';
import { BaseRepositoryInterface } from 'src/shared/repository/base/base.interface.repository';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';

@Injectable()
export class UserRepository implements BaseRepositoryInterface<User> {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: User): Promise<User> {
    const emailExists = await this.checkEmailExist(dto.email);

    if (emailExists) {
      throw new ForbiddenException('Email is already taken');
    }

    return this.prisma.user.create({ data: dto });
  }
  async checkEmailExist(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return !!user;
  }

  async findOneById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByCondition(condition: object): Promise<User | null> {
    return this.prisma.user.findFirst({ where: condition });
  }
  async findAll(
    condition: object = {},
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<User>> {
    const { page = 1, limit = 10 } = options || {};

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where: condition,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count({ where: condition }),
    ]);

    return { data, page, limit, total };
  }

  async update(id: string, dto: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}
