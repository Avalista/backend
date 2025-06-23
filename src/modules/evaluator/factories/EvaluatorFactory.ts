import { Evaluator } from '../entities/Evaluator';

type Override = Partial<Evaluator>;

export const makeEvaluator = ({ id, ...override }: Override) => {
  return new Evaluator(
    {
      name: 'Evaluator',
      email: 'evaluator@email.com',
      password: 'password',
      avatar: '',
      isSystemAdmin: false,
      ...override,
    },
    id,
  );
};
