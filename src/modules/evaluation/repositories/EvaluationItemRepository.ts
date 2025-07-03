import { EvaluationItem } from '../entities/EvaluationItem';

export abstract class EvaluationItemRepository {
  abstract create(evaluationItem: EvaluationItem): Promise<EvaluationItem>;
}
