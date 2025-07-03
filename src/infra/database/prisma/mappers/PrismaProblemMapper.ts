import { Problem as ProblemRaw } from '@prisma/client';
import { Problem } from 'src/modules/problem/entities/Problem';

export class PrismaProblemMapper {
  static toPrisma(problem: Problem): ProblemRaw {
    return {
      id: problem.id,
      description: problem.description,
      screenshot: problem.screenshots,
      improvementSuggestions: problem.improvementSuggestions,
      severity: problem.severity as unknown as ProblemRaw['severity'],
      effort: problem.effort as unknown as ProblemRaw['effort'],
      priority: problem.priority,
      resolvedAt: problem.resolvedAt ?? null,
      finalEvaluationId: problem.finalEvaluationId ?? null,
      originalProblemId: problem.originalProblemId ?? null,
      evaluationItemId: problem.evaluationItemId,
    };
  }

  static toDomain(problemRaw: ProblemRaw): Problem {
    return new Problem(
      {
        description: problemRaw.description,
        screenshots: problemRaw.screenshot,
        improvementSuggestions: problemRaw.improvementSuggestions,
        severity: problemRaw.severity,
        effort: problemRaw.effort,
        priority: problemRaw.priority,
        evaluationItemId: problemRaw.evaluationItemId,
      },
      problemRaw.id,
    );
  }
}
