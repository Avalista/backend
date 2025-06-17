import { ProjectMembership } from '../entities/ProjectMembership';

export abstract class ProjectMembershipRepository {
  abstract create(membership: ProjectMembership): Promise<void>;
  abstract findByProjectIdAndEvaluatorId(
    projectId: string,
    evaluatorId: string,
  ): Promise<ProjectMembership | null>;
  abstract findByEvaluatorId(evaluatorId: string): Promise<ProjectMembership[]>;
}
