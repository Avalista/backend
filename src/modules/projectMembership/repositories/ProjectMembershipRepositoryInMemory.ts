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
}
