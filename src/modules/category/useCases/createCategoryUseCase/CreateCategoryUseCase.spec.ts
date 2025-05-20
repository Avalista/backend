import { CategoryRepositoryInMemory } from '../../repositories/CategoryRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('Should be able to create category', async () => {
    expect(categoryRepositoryInMemory.categories).toEqual([]);

    const category = await createCategoryUseCase.execute({
      name: 'Acessibilidade',
      color: '#ddeaf6',
    });

    expect(categoryRepositoryInMemory.categories).toEqual([category]);
  });
});
