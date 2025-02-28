import { BaseStatus } from '@prisma/client';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { IRepository } from 'src/shared/interface/interface';
import { FindAllResponse } from 'src/shared/types/common.types';

export class BaseRepositoryPrisma<Entity, createDto, updateDto>
  implements IRepository<Entity, createDto, updateDto>
{
  constructor(
    protected readonly prisma: PrismaService,
    private readonly modelName: string,
  ) {}

  private getModel() {
    return this.prisma[this.modelName];
  }

  // Insert an entity into the database
  async insert(data: createDto): Promise<Entity> {
    return await this.getModel().create({ data });
  }

  // Update an entity by ID
  async update(id: string, data: updateDto): Promise<Entity> {
    return await this.getModel().update({
      where: { id },
      data,
    });
  }

  // Delete an entity by ID
  async softdelete(id: string): Promise<Entity> {
    return await this.getModel().update({
      where: { id },
      data: { status: BaseStatus.INACTIVE },
    });
  }

  async delete(id: string): Promise<Entity> {
    return await this.getModel().delete({
      where: { id },
    });
  }

  // Get the details of an entity by ID
  async getDetail(id: string): Promise<Entity | null> {
    return await this.getModel().findUnique({
      where: { id },
    });
  }

  async list(
    filter: object = {},
    options?: any,
  ): Promise<FindAllResponse<Entity>> {
    const {
      page = 1,
      limit = 10,
      orderBy = { createdAt: 'asc' },
    } = options || {};
    const [data, total] = await Promise.all([
      this.getModel().findMany({
        where: filter,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.getModel().count({ where: filter }),
    ]);
    return { data, page, limit, total };
  }
}
