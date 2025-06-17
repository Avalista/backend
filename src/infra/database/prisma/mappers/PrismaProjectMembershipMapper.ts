import { ProjectMembership as ProjectMembershipRaw } from '@prisma/client';
import { ProjectMembership } from 'src/modules/projectMembership/entities/ProjectMembership';

export class PrismaProjectMembershipMapper {
  static toDomain(membership: ProjectMembershipRaw): ProjectMembership {
    return new ProjectMembership(
      {
        evaluatorId: membership.evaluatorId,
        projectId: membership.projectId,
        admin: membership.admin,
        joinedAt: membership.joinedAt,
      },
      membership.id,
    );
  }

  static toPrisma(membership: ProjectMembership): ProjectMembershipRaw {
    return {
      id: membership.id,
      evaluatorId: membership.evaluatorId,
      projectId: membership.projectId,
      admin: membership.admin,
      joinedAt: membership.joinedAt,
    };
  }
}
