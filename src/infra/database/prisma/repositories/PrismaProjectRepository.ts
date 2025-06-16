import { Injectable } from '@nestjs/common';
import { Project } from 'src/modules/project/entities/Project';
import { ProjectRepository } from 'src/modules/project/repositories/ProjectRepository';
import { PrismaService } from '../prisma.service';
import { PrismaProjectMapper } from '../mappers/PrismaProjectMapper';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(project: Project): Promise<void> {
    const data = PrismaProjectMapper.toPrisma(project);
    await this.prisma.project.create({ data });
  }
}
