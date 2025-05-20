import { Category } from 'src/modules/category/entities/Category';

export class CategoryViewModel {
  static toHttp({ id, name, color }: Category) {
    return { id, name, color };
  }
}
