import { ProjectMembership } from '../entities/ProjectMembership';
import { ProjectMembershipRepository } from './ProjectMembershipRepository';

export class ProjectMembershipRepositoryInMemory
  implements ProjectMembershipRepository
{
  public memberships: ProjectMembership[] = [];

  async create(membership: ProjectMembership): Promise<void> {
    this.memberships.push(membership);
    return Promise.resolve();
  }

  async findByEvaluatorId(evaluatorId: string): Promise<ProjectMembership[]> {
    return Promise.resolve(
      this.memberships.filter(
        (membership) => membership.evaluatorId === evaluatorId,
      ),
    );
  }

  async findByProjectIdAndEvaluatorId(
    projectId: string,
    evaluatorId: string,
  ): Promise<ProjectMembership | null> {
    const membership = this.memberships.find(
      (m) => m.projectId === projectId && m.evaluatorId === evaluatorId,
    );

    return Promise.resolve(membership || null);
  }
}
