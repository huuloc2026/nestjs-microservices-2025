import { $Enums, BaseStatus } from '@prisma/client';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { BaseRepositoryInterface } from 'src/shared/repository/base.interface.repository';
import { FindAllResponse } from 'src/shared/types/common.types';
const { INACTIVE } = BaseStatus;
export abstract class BaseAbstractRepository<T>
  implements BaseRepositoryInterface<T>
{
  constructor(protected readonly prisma: PrismaService) {}

  // Ensure derived classes implement the correct Prisma model
  abstract getModel(): {
    create: (data: any) => Promise<T>;
    findUnique: (args: any) => Promise<T | null>;
    findMany: (args: any) => Promise<T[]>;
    findFirst: (args: any) => Promise<T | null>;
    update: (args: any) => Promise<T>;
    delete: (args: any) => Promise<T>;
    count: (args: any) => Promise<number>;
  };

  async create(dto: Partial<T>): Promise<T> {
    return this.getModel().create({ data: dto });
  }

  async findOneById(id: string): Promise<T | null> {
    return this.getModel().findUnique({ where: { id } });
  }

  async findAll(
    condition: Record<string, any>,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<T>> {
    const { page = 1, limit = 10 } = options || {};

    const [data, total] = await Promise.all([
      this.getModel().findMany({
        where: condition,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.getModel().count({ where: condition }),
    ]);
    return { data, page, limit, total };
  }

  async findOneByCondition(condition: object): Promise<T | null> {
    return this.getModel().findFirst({ where: condition });
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return this.getModel().update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string): Promise<void> {
    await this.getModel().delete({ where: { id } });
  }

  async permanentlyDelete(id: string): Promise<void> {
    await this.getModel().update({
      where: { id },
      data: { status: INACTIVE },
    });
  }
}
