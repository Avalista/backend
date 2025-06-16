import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectMembershipRepository } from 'src/modules/projectMembership/repositories/ProjectMembershipRepository';
import { ProjectMembership } from 'src/modules/projectMembership/entities/ProjectMembership';

@Injectable()
export class PrismaProjectMembershipRepository
  implements ProjectMembershipRepository
{
  constructor(private prisma: PrismaService) {}

  async create(membership: ProjectMembership): Promise<void> {
    await this.prisma.projectMembership.create({
      data: {
        id: membership.id,
        admin: membership.admin,
        joinedAt: membership.joinedAt,
        evaluatorId: membership.evaluatorId,
        projectId: membership.projectId,
      },
    });
  }
}
