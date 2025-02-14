import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { User } from './user.model';
import { BaseRepositoryInterface } from 'src/shared/repository/base/base.interface.repository';

@Injectable()
export class UserRepository implements BaseRepositoryInterface<User> {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: User): Promise<User> {
    return this.prisma.user.create({ data: dto });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByCondition(condition: object): Promise<User | null> {
    return this.prisma.user.findFirst({ where: condition });
  }

  async findAll(condition: object, options?: object) {
    const users = await this.prisma.user.findMany({
      where: condition,
      ...options,
    });
    const total = await this.prisma.user.count({ where: condition });
    return { data: users, total };
  }

  async update(id: string, dto: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}
