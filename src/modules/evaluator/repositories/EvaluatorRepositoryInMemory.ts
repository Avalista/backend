import { Evaluator } from '../entities/Evaluator';
import { EvaluatorRepository } from './EvaluatorRepository';

export class EvaluatorRepositoryInMemory implements EvaluatorRepository {
  public evaluators: Evaluator[] = [];

  async create(evaluator: Evaluator): Promise<void> {
    this.evaluators.push(evaluator);
    return Promise.resolve();
  }

  async findByEmail(email: string): Promise<Evaluator | null> {
    const evaluator = this.evaluators.find((e) => e.email === email);
    return Promise.resolve(evaluator || null);
  }

  async findById(id: string): Promise<Evaluator | null> {
    const evaluator = this.evaluators.find((e) => e.id === id);
    return Promise.resolve(evaluator || null);
  }
}
