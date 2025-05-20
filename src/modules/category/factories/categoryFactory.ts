import { Category } from '../entities/Category';

type Override = Partial<Category>;

export const makeCategory = ({ id, ...override }: Override) => {
  return new Category(
    {
      name: 'test category',
      color: '#cccccc',
      ...override,
    },
    id,
  );
};
