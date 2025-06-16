import { ProjectMembership } from '../entities/ProjectMembership';

export abstract class ProjectMembershipRepository {
  abstract create(membership: ProjectMembership): Promise<void>;
}
