import { Evaluator } from '../entities/Evaluator';
import { EvaluatorRepository } from './EvaluatorRepository';

export class EvaluatorRepositoryInMemory implements EvaluatorRepository {
  public evaluators: Evaluator[] = [];

  async create(evaluator: Evaluator): Promise<void> {
    this.evaluators.push(evaluator);
    return Promise.resolve();
  }
}
