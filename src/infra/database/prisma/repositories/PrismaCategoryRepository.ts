import { Category } from 'src/modules/category/entities/Category';
import { CategoryRepository } from 'src/modules/category/repositories/CategoryRepository';
import { PrismaService } from '../prisma.service';
import { PrismaCategoryMapper } from '../mappers/PrismaCategoryMappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(category: Category): Promise<void> {
    const categoryRaw = PrismaCategoryMapper.toPrisma(category);

    await this.prisma.category.create({
      data: categoryRaw,
    });
  }
}
