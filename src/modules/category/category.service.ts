import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { CategoryName } from './dto/category.enum';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { id, name } = createCategoryDto;

    if (!(id in CategoryName)) {
      throw new NotFoundException(`Invalid category ID: ${id}`);
    }

    if (CategoryName[id] !== name) {
      throw new NotFoundException(`Category name does not match ID`);
    }

    return await this.prisma.category.create({
      data: {
        id,
        name,
      },
    });
  }

  async getCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
}
