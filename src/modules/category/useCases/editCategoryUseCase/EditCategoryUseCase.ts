import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/CategoryRepository';

interface EditCategoryRequest {
  categoryId: string;
  userId: string;
  name: string;
  color: string;
}

@Injectable()
export class EditCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ categoryId, name, color }: EditCategoryRequest) {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) throw new NotFoundException();

    //1 Pegar o user, 2 verificar se existe, 3 verificar se é admin
    //const user = await this.userRepository.findById(userId);
    //if (!user) throw new NotFoundException();
    //if (!userId.admin) throw new UnauthorizedException();

    category.name = name;
    category.color = color;

    await this.categoryRepository.save(category);

    return category;
  }
}
