import { NotFoundException } from '@nestjs/common';
import { CategoryRepositoryInMemory } from '../../repositories/CategoryRepositoryInMemory';
import { EditCategoryUseCase } from './EditCategoryUseCase';
import { makeCategory } from '../../factories/categoryFactory';

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let editCategoryUseCase: EditCategoryUseCase;

describe('Edit Note', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    editCategoryUseCase = new EditCategoryUseCase(categoryRepositoryInMemory);
  });

  it('Should be able ', async () => {
    // Criar usuário admin
    // const user = makeUser({});
    const category = makeCategory({});

    categoryRepositoryInMemory.categories = [category];

    await editCategoryUseCase.execute({
      categoryId: category.id,
      userId: '0',
      name: 'Name changed',
      color: '#111111',
    });

    expect(categoryRepositoryInMemory.categories[0].name).toEqual(
      'Name changed',
    );

    expect(categoryRepositoryInMemory.categories[0].color).toEqual('#111111');
  });

  it('Should be able to throw error when not found category', () => {
    void expect(async () => {
      await editCategoryUseCase.execute({
        categoryId: 'fake id',
        userId: '0',
        name: 'Name',
        color: '#ffffff',
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
  //  name: 'Name',
  //  color: '#ffffff',
  //     });
  //   }).rejects.toThrow(UnauthorizedException);
  // });
});
