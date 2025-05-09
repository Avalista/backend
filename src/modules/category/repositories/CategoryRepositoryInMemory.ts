import { Category } from '../entities/Category';
import { CategoryRepository } from './CategoryRepository';

export class CategoryRepositoryInMemory implements CategoryRepository {
  public categories: Category[] = [];

  create(category: Category): Promise<void> {
    this.categories.push(category);
    return Promise.resolve();
  }
}
