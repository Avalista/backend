/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export class EvaluationSessionViewModel {
  static toHttp(data: any) {
    return {
      project: {
        id: data.project.id,
        name: data.project.name,
        description: data.project.description,
      },
      evaluator: {
        id: data.evaluator.id,
        name: data.evaluator.name,
        email: data.evaluator.email,
      },
      evaluationSession: {
        id: data.id,
        startedAt: data.startedAt,
        finishedAt: data.finishedAt,
        status: data.status,
        evaluationItems: data.evaluationItems.map((item: any) => {
          return {
            id: item.id,
            status: item.status,
            reviewedAt: item.reviewedAt,
            screen: {
              id: item.screen.id,
              title: item.screen.title,
              description: item.screen.description,
              screenshot: item.screen.screenshot,
              category: item.heuristic
                ? {
                    id: item.heuristic.category.id,
                    name: item.heuristic.category.name,
                    color: item.heuristic.category.color,
                    heuristic: {
                      id: item.heuristic.id,
                      name: item.heuristic.name,
                      code: item.heuristic.code,
                      problems: item.problems.map((problem: any) => ({
                        id: problem.id,
                        description: problem.description,
                        screenshot: problem.screenshot,
                        improvementSuggestions: problem.improvementSuggestions,
                        severity: problem.severity,
                        effort: problem.effort,
                        resolvedAt: problem.resolvedAt,
                        priority: problem.priority,
                      })),
                    },
                  }
                : null,
            },
          };
        }),
      },
    };
  }
}
