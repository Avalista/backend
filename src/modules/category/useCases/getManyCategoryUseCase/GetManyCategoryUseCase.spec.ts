import { makeCategory } from '../../factories/categoryFactory';
import { CategoryRepositoryInMemory } from '../../repositories/CategoryRepositoryInMemory';
import { GetManyCategoryUseCase } from './GetManyCategoryUseCase';

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let getManyCategoryUseCase: GetManyCategoryUseCase;

describe('Get many categories', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    getManyCategoryUseCase = new GetManyCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('Should be able to get many categories', async () => {
    const categories = Array.from({ length: 10 }, () => makeCategory({}));

    categoryRepositoryInMemory.categories = categories;

    const result = await getManyCategoryUseCase.execute({});

    expect(result).toEqual(categories);
  });

  it('Should be able to control categories per page', async () => {
    const categories = Array.from({ length: 10 }, () => makeCategory({}));

    categoryRepositoryInMemory.categories = categories;

    const result = await getManyCategoryUseCase.execute({ perPage: '8' });

    expect(result).toHaveLength(8);
  });

  it('Should be able to control category page', async () => {
    const categories = Array.from({ length: 10 }, (_, index) =>
      makeCategory({ name: index < 5 ? 'page 1' : 'page 2' }),
    );

    categoryRepositoryInMemory.categories = categories;

    const result1 = await getManyCategoryUseCase.execute({
      page: '1',
      perPage: '5',
    });

    const result2 = await getManyCategoryUseCase.execute({
      page: '2',
      perPage: '5',
    });

    expect(result1[0].name).toEqual('page 1');
    expect(result2[0].name).toEqual('page 2');
  });
});
