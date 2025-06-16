import { Injectable } from '@nestjs/common';
import { Project } from 'src/modules/project/entities/Project';
import { ProjectRepository } from 'src/modules/project/repositories/ProjectRepository';
import { PrismaService } from '../prisma.service';
import { PrismaProjectMapper } from '../mappers/PrismaProjectMapper';
import { ProjectMembership } from 'src/modules/projectMembership/entities/ProjectMembership';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(project: Project): Promise<void> {
    const data = PrismaProjectMapper.toPrisma(project);
    await this.prisma.project.create({ data });
  }

  async findManyByIds(params: {
    ids: string[];
    search?: string;
    orderBy?: 'name-asc' | 'name-desc' | '';
  }): Promise<Project[]> {
    const { ids, search, orderBy } = params;

    const projects = await this.prisma.project.findMany({
      where: {
        id: { in: ids },
        name: search ? { contains: search, mode: 'insensitive' } : undefined,
      },
      orderBy:
        orderBy === 'name-asc'
          ? { name: 'asc' }
          : orderBy === 'name-desc'
            ? { name: 'desc' }
            : undefined,
      include: {
        memberships: true,
      },
    });

    return projects.map(
      (p) =>
        new Project(
          {
            name: p.name,
            description: p.description,
            memberships: p.memberships.map(
              (m) =>
                new ProjectMembership(
                  {
                    evaluatorId: m.evaluatorId,
                    projectId: m.projectId,
                    joinedAt: m.joinedAt,
                    admin: m.admin,
                  },
                  m.id,
                ),
            ),
          },
          p.id,
        ),
    );
  }
}
