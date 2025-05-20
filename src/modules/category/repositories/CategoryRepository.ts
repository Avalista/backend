import { Category } from '../entities/Category';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<void>;
  abstract findById(id: string): Promise<Category | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(category: Category): Promise<void>;
  abstract findMany(page: number, perPage: number): Promise<Category[]>;
}
