import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/shared/components/prisma/prisma.service';
import { CategoryName } from '../category/dto/category.enum';

@Injectable()
export class CategoryFactory implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    

    const categories = Object.entries(CategoryName).map(([id, name]) => ({
      id,
      name,
    }));

    for (const category of categories) {
      const exists = await this.prisma.category.findUnique({
        where: { id: category.id },
      });

      if (!exists) {
        await this.prisma.category.create({
          data: category,
        });
        console.log(`✅ Created category: ${category.id} - ${category.name}`);
      }
    }

    
  }
}
