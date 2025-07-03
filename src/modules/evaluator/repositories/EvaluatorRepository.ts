import { Evaluator } from '../entities/Evaluator';

export abstract class EvaluatorRepository {
  abstract create(evaluator: Evaluator): Promise<void>;
  abstract findByEmail(email: string): Promise<Evaluator | null>;
  abstract findById(id: string): Promise<Evaluator | null>;
  abstract findBySessionId(sessionId: string): Promise<Evaluator | null>;
}
