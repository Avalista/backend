import { Injectable } from '@nestjs/common';
import { Project } from 'src/modules/project/entities/Project';
import { ProjectRepository } from 'src/modules/project/repositories/ProjectRepository';
import { PrismaService } from '../prisma.service';
import { PrismaProjectMapper } from '../mappers/PrismaProjectMapper';
import { PrismaProjectMembershipMapper } from '../mappers/PrismaProjectMembershipMapper';

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
        memberships: {
          include: {
            evaluator: true,
          },
        },
        screens: true,
        sessions: true,
        finalEvaluation: true,
      },
    });

    return projects.map(
      (p) =>
        new Project(
          {
            name: p.name,
            description: p.description,
            memberships: p.memberships.map((m) =>
              PrismaProjectMembershipMapper.toDomain(m),
            ),
            screens: p.screens.map((s) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              screenshot: s.screenshot,
            })),
            sessions: p.sessions.map((s) => ({
              id: s.id,
              startedAt: s.startedAt,
              finishedAt: s.finishedAt,
              status: s.status,
            })),
            finalEvaluation: p.finalEvaluation
              ? {
                  id: p.finalEvaluation.id,
                  createdAt: p.finalEvaluation.createdAt,
                }
              : null,
          },
          p.id,
        ),
    );
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            evaluator: true,
          },
        },
        screens: true,
        sessions: true,
        finalEvaluation: true,
      },
    });

    if (!project) {
      return null;
    }

    const memberships = project.memberships.map((m) =>
      PrismaProjectMembershipMapper.toDomain(m),
    );

    return new Project(
      {
        name: project.name,
        description: project.description,
        memberships,
        screens: project.screens.map((s) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          screenshot: s.screenshot,
        })),
        sessions: project.sessions.map((s) => ({
          id: s.id,
          startedAt: s.startedAt,
          finishedAt: s.finishedAt,
          status: s.status,
        })),
        finalEvaluation: project.finalEvaluation
          ? {
              id: project.finalEvaluation.id,
              createdAt: project.finalEvaluation.createdAt,
            }
          : null,
      },
      project.id,
    );
  }
}
