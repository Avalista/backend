import { Category as CategoryRaw } from '@prisma/client';
import { Category } from 'src/modules/category/entities/Category';

export class PrismaCategoryMapper {
  static toPrisma({ id, name, color }: Category): CategoryRaw {
    return {
      id,
      name,
      color,
    };
  }
}
