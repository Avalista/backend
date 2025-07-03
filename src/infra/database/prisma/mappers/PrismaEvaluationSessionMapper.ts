import { EvaluationSession as EvaluationSessionRaw } from '@prisma/client';
import { EvaluationSession } from 'src/modules/evaluationSession/entities/EvaluationSession';

export class PrismaEvaluationSessionMapper {
  static toPrisma(evaluationSession: EvaluationSession): EvaluationSessionRaw {
    return {
      id: evaluationSession.id,
      startedAt: evaluationSession.startedAt,
      finishedAt: evaluationSession.finishedAt,
      status: evaluationSession.status,
      evaluatorId: evaluationSession.evaluatorId,
      projectId: evaluationSession.projectId,
    };
  }

  static toDomain({
    id,
    startedAt,
    finishedAt,
    status,
    evaluatorId,
    projectId,
  }: EvaluationSessionRaw): EvaluationSession {
    return new EvaluationSession(
      {
        startedAt,
        finishedAt,
        status,
        evaluatorId,
        projectId,
      },
      id,
    );
  }
}
