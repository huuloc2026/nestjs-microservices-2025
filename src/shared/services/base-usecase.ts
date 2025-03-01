import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';

export interface IBaseUseCase<T> {
  create(dto: Partial<T>): Promise<T>;
  findAll(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<T>>;
  findOneById(id: string): Promise<T | null>;
  update(id: string, dto: Partial<T>): Promise<T>;
  remove(id: string): Promise<boolean>;
}
export abstract class BaseUseCase<T> implements IBaseUseCase<T> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly model: string,
  ) {}

  // Phương thức để lấy model
  protected getModel() {
    return this.prisma[this.model];
  }

  async create(dto: Partial<T>): Promise<T> {
    return await this.getModel().create({ data: dto });
  }

  async findMany(userId: string) {
    return await this.getModel().findMany({ where: { userId } });
  }

  async findAll(
    filter: object = {},
    options?: PagingSchemaDTO & { sortBy?: string; order?: 'asc' | 'desc' },
  ): Promise<FindAllResponse<T>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
    } = options || {};
    const allowedFields = ['createdAt'];
    if (!allowedFields.includes(sortBy)) {
      throw new Error(`Invalid sortBy field: ${sortBy}`);
    }
    const [data, total] = await this.prisma.$transaction([
      this.getModel().findMany({
        where: filter,
        orderBy: { [sortBy]: order },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.getModel().count({ where: filter }),
    ]);

    return { data, page, limit, total };
  }

  async findOneById(id: string): Promise<T | null> {
    return await this.getModel().findUnique({ where: { id } });
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return await this.getModel().update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<boolean> {
    await this.getModel().delete({ where: { id } });
    return true;
  }
}
