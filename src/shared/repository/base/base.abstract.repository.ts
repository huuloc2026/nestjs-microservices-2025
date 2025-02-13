import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { BaseRepositoryInterface } from 'src/shared/repository/base/base.interface.repository';
import { FindAllResponse } from 'src/shared/types/common.types';

export abstract class BaseAbstractRepository<T>
  implements BaseRepositoryInterface<T>
{
  constructor(protected readonly prisma: PrismaService) {}

  abstract getModel(): any; // Định nghĩa trong repository cụ thể

  async create(dto: Partial<T>): Promise<T> {
    return this.getModel().create({ data: dto });
  }

  async findOneById(id: string): Promise<T | null> {
    return this.getModel().findUnique({ where: { id } });
  }

  async findOneByCondition(condition: object): Promise<T | null> {
    return this.getModel().findFirst({ where: condition });
  }

  async findAll(
    condition: object,
    options?: object,
  ): Promise<FindAllResponse<T>> {
    const [data, total] = await Promise.all([
      this.getModel().findMany({ where: condition, ...options }),
      this.getModel().count({ where: condition }),
    ]);
    return { data, total };
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return this.getModel().update({
      where: { id },
      data: dto,
    });
  }

  async softDelete(id: string): Promise<boolean> {
    const deleted = await this.getModel().update({
      where: { id },
      data: { deletedAt: new Date() }, // Trường `deletedAt` phải có trong model
    });
    return !!deleted;
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    await this.getModel().delete({ where: { id } });
    return true;
  }
}
