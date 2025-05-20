import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { Category } from '../../entities/Category';

interface CreateCategoryRequest {
  name: string;
  color: string;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ name, color }: CreateCategoryRequest) {
    const category = new Category({ name, color });

    await this.categoryRepository.create(category);

    return category;
  }
}
