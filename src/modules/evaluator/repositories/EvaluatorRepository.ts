import { Evaluator } from '../entities/Evaluator';

export abstract class EvaluatorRepository {
  abstract create(evaluator: Evaluator): Promise<void>;
}
