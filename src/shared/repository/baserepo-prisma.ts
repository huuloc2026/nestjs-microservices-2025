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
    return this.getModel().create({ data });
  }

  // Update an entity by ID
  async update(id: string, data: updateDto): Promise<Entity> {
    return this.getModel().update({
      where: { id },
      data,
    });
  }

  // Delete an entity by ID
  async delete(id: string): Promise<Entity> {
    return this.getModel().delete({
      where: { id },
    });
  }

  // Get the details of an entity by ID
  async getDetail(id: string): Promise<Entity | null> {
    return this.getModel().findUnique({
      where: { id },
    });
  }

  async list(
    filter: object = {},
    options?: any,
  ): Promise<FindAllResponse<Entity>> {
    const { skip = 0, take = 10 } = options || {};
    return this.getModel().findMany({
      where: filter,
      skip,
      take,
    });
  }
}
