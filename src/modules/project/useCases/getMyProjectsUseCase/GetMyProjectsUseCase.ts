import { Project } from '../../entities/Project';
import { ProjectMembershipRepository } from 'src/modules/projectMembership/repositories/ProjectMembershipRepository';
import { ProjectRepository } from '../../repositories/ProjectRepository';
import { FindProjectsByEvaluator } from '../../interfaces/FindProjects';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetMyProjectsUseCase {
  constructor(
    private projectRepository: ProjectRepository,
    private projectMembershipRepository: ProjectMembershipRepository,
  ) {}

  async execute({
    evaluatorId,
    search,
    orderBy,
  }: FindProjectsByEvaluator): Promise<Project[]> {
    const memberships =
      await this.projectMembershipRepository.findByEvaluatorId(evaluatorId);

    const projectIds = memberships.map((m) => m.projectId);

    const projects = await this.projectRepository.findManyByIds({
      ids: projectIds,
      search,
      orderBy,
    });

    return projects;
  }
}
