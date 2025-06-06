import { Evaluator } from 'src/modules/evaluator/entities/Evaluator';

export class EvaluatorViewModel {
  static toHttp({ id, name, email, avatar, isSystemAdmin }: Evaluator) {
    return {
      id,
      name,
      email,
      avatar,
      isSystemAdmin,
    };
  }
}
