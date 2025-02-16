import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { BaseRepositoryInterface } from 'src/shared/repository/base.interface.repository';
import { FindAllResponse } from 'src/shared/types/common.types';

export abstract class BaseAbstractRepository<T>
  implements BaseRepositoryInterface<T>
{
  constructor(protected readonly prisma: PrismaService) {}

  abstract getModel(): any;

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

  async delete(id: string): Promise<boolean> {
    return await this.getModel().delete({ where: { id } });
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
  async permanentlyDelete(id: string): Promise<void> {
    await this.getModel().delete({ where: { id } });
  }
}
