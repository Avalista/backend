import { Category } from '../entities/Category';
import { CategoryRepository } from './CategoryRepository';

export class CategoryRepositoryInMemory implements CategoryRepository {
  public categories: Category[] = [];

  create(category: Category): Promise<void> {
    this.categories.push(category);
    return Promise.resolve();
  }

  findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id);

    if (!category) return Promise.resolve(null);

    return Promise.resolve(category);
  }

  delete(id: string): Promise<void> {
    this.categories = this.categories.filter((category) => category.id !== id);
    return Promise.resolve();
  }

  save(category: Category): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (currentCategory) => currentCategory.id === category.id,
    );

    if (categoryIndex >= 0) this.categories[categoryIndex] = category;

    return Promise.resolve();
  }

  findMany(page: number, perPage: number): Promise<Category[]> {
    return Promise.resolve(
      this.categories.slice((page - 1) * perPage, page * perPage),
    );
  }
}
