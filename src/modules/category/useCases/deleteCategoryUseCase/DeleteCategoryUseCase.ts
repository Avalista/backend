import { NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/CategoryRepository';

interface DeleteCategoryRequest {
  categoryId: string;
  userId: string;
}

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ categoryId }: DeleteCategoryRequest) {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) throw new NotFoundException();

    //1 Pegar o user, 2 verificar se existe, 3 verificar se é admin
    //const user = await this.userRepository.findById(userId);
    //if (!user) throw new NotFoundException();
    //if (!userId.admin) throw new UnauthorizedException();

    await this.categoryRepository.delete(categoryId);
  }
}
