import { NotFoundException } from '@nestjs/common';
import { makeCategory } from '../../factories/categoryFactory';
import { CategoryRepositoryInMemory } from '../../repositories/CategoryRepositoryInMemory';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe('Delete Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('Should be able to delete category', async () => {
    // Criar usuário admin
    // const user = makeUser({});
    const category = makeCategory({});

    categoryRepositoryInMemory.categories = [category];

    await deleteCategoryUseCase.execute({
      categoryId: category.id,
      userId: '0',
    });

    expect(categoryRepositoryInMemory.categories).toHaveLength(0);
  });

  it('Should be able to throw error when not found category', () => {
    void expect(async () => {
      await deleteCategoryUseCase.execute({
        categoryId: 'fake id',
        userId: '0',
      });
    }).rejects.toThrow(NotFoundException);
  });

  // it('Should be able to throw error when user is not admin', () => {
  //   const category = makeCategory({});

  //   categoryRepositoryInMemory.categories = [category];

  //   void expect(async () => {
  //     await deleteCategoryUseCase.execute({
  //       categoryId: category.id,
  //       userId: 'fakeid',
  //     });
  //   }).rejects.toThrow(UnauthorizedException);
  // });
});
