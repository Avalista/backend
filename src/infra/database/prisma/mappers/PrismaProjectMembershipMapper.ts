import { ProjectMembership as ProjectMembershipRaw } from '@prisma/client';
import { ProjectMembership } from 'src/modules/projectMembership/entities/ProjectMembership';
import { PrismaEvaluatorMapper } from './PrismaEvaluatorMappers';

export class PrismaProjectMembershipMapper {
  static toDomain(
    membership: ProjectMembershipRaw & {
      evaluator: {
        id: string;
        name: string;
        email: string;
        password: string;
        avatar: string;
        isSystemAdmin: boolean;
      };
    },
  ): ProjectMembership {
    const evaluator = PrismaEvaluatorMapper.toDomain(membership.evaluator);

    return new ProjectMembership(
      {
        evaluatorId: membership.evaluatorId,
        projectId: membership.projectId,
        admin: membership.admin,
        joinedAt: membership.joinedAt,
        evaluator,
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
