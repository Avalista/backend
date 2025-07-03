import { EvaluationItem as EvaluationItemRaw } from '@prisma/client';
import { EvaluationItem } from 'src/modules/evaluation/entities/EvaluationItem';

export class PrismaEvaluationItemMapper {
  static toPrisma(evaluationItem: EvaluationItem): EvaluationItemRaw {
    return {
      id: evaluationItem.id,
      status: evaluationItem.status,
      reviewedAt: evaluationItem.reviewedAt,
      sessionId: evaluationItem.sessionId,
      screenId: evaluationItem.screenId,
      heuristicId: evaluationItem.heuristicId,
    };
  }

  static toDomain({
    id,
    status,
    reviewedAt,
    sessionId,
    screenId,
    heuristicId,
  }: EvaluationItemRaw): EvaluationItem {
    return new EvaluationItem(
      {
        status,
        reviewedAt,
        sessionId,
        screenId,
        heuristicId,
      },
      id,
    );
  }
}
