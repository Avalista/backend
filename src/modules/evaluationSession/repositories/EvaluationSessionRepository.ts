import { EvaluationSession } from '../entities/EvaluationSession';

export abstract class EvaluationSessionRepository {
  abstract create(
    evaluationSession: EvaluationSession,
  ): Promise<EvaluationSession>;
  abstract getEvaluationDetails(id: string): Promise<any>;
  abstract findActiveByEvaluatorAndProject(
    evaluatorId: string,
    projectId: string,
  ): Promise<EvaluationSession | null>;
}
