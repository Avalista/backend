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

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  async save(category: Category): Promise<void> {
    const categoryRaw = PrismaCategoryMapper.toPrisma(category);

    await this.prisma.category.update({
      data: categoryRaw,
      where: { id: categoryRaw.id },
    });
  }

  async findById(id: string): Promise<Category | null> {
    const categoryRaw = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryRaw) return null;

    return PrismaCategoryMapper.toDomain(categoryRaw);
  }

  async findMany(page: number, perPage: number): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return categories.map((category) =>
      PrismaCategoryMapper.toDomain(category),
    );
  }
}
