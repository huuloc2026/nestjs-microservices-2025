import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { BaseRepositoryInterface } from 'src/shared/repository/base/base.interface.repository';
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

  async findOneByCondition(condition: object): Promise<T | null> {
    return this.getModel().findFirst({ where: condition });
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return this.getModel().update({
      where: { id },
      data: dto,
    });
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    await this.getModel().delete({ where: { id } });
    return true;
  }
}
