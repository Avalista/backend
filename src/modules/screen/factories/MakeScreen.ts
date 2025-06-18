import { Screen } from '../entities/Screen';

type Override = Partial<Screen>;

export const makeScreen = ({ id, ...override }: Override) => {
  return new Screen(
    {
      title: 'Test Screen',
      description: 'A sample description for testing.',
      screenshot: 'test-image-url',
      projectId: 'project-123', // Definir um valor padrão para projectId
      ...override,
    },
    id,
  );
};
