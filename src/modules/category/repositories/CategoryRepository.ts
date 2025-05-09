import { Category } from '../entities/Category';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<void>;
}
