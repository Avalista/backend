import { Project } from '../entities/Project';

type Override = Partial<Project>;

export const makeProject = ({ id, ...override }: Override) => {
  return new Project(
    {
      name: 'Test Project',
      description: 'A sample description for testing.',
      ...override,
    },
    id,
  );
};
