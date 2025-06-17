import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectMembershipRepository } from 'src/modules/projectMembership/repositories/ProjectMembershipRepository';
import { ProjectMembership } from 'src/modules/projectMembership/entities/ProjectMembership';
import { PrismaProjectMembershipMapper } from '../mappers/PrismaProjectMembershipMapper';

@Injectable()
export class PrismaProjectMembershipRepository
  implements ProjectMembershipRepository
{
  constructor(private prisma: PrismaService) {}

  async create(membership: ProjectMembership): Promise<void> {
    const prismaData = PrismaProjectMembershipMapper.toPrisma(membership);
    await this.prisma.projectMembership.create({
      data: prismaData,
    });
  }

  async findByEvaluatorId(evaluatorId: string): Promise<ProjectMembership[]> {
    const records = await this.prisma.projectMembership.findMany({
      where: { evaluatorId },
    });

    return records.map((m) => PrismaProjectMembershipMapper.toDomain(m));
  }

  async findByProjectIdAndEvaluatorId(
    projectId: string,
    evaluatorId: string,
  ): Promise<ProjectMembership | null> {
    const membership = await this.prisma.projectMembership.findFirst({
      where: {
        projectId,
        evaluatorId,
      },
      include: {
        evaluator: true,
        project: true,
      },
    });

    if (!membership) {
      return null;
    }

    return PrismaProjectMembershipMapper.toDomain(membership);
  }
}
