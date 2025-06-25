import { Project } from 'src/modules/project/entities/Project';

export class ProjectViewModel {
  static toHttp({
    id,
    name,
    description,
    memberships,
    screens,
    sessions,
    finalEvaluation,
  }: Project) {
    return {
      id,
      name,
      description,
      memberships: memberships.map((m) => ({
        evaluatorId: m.evaluatorId,
        projectId: m.projectId,
        evaluator: {
          id: m.evaluator.id,
          name: m.evaluator.name,
        },
        admin: m.admin,
        joinedAt: m.joinedAt,
      })),
      screens:
        screens && screens.length > 0
          ? screens.map((s) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              screenshot: s.screenshot,
            }))
          : [],
      sessions:
        sessions && sessions.length > 0
          ? sessions.map((s) => ({
              id: s.id,
              startedAt: s.startedAt,
              finishedAt: s.finishedAt,
              status: s.status,
            }))
          : [],
      finalEvaluation: finalEvaluation
        ? { id: finalEvaluation.id, createdAt: finalEvaluation.createdAt }
        : null,
    };
  }
}
