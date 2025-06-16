import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../repositories/ProjectRepository';
import { Project } from '../../entities/Project';
import { ProjectMembershipRepository } from '../../../projectMembership/repositories/ProjectMembershipRepository';
import { ProjectMembership } from '../../../projectMembership/entities/ProjectMembership';

interface CreateProjectRequest {
  name: string;
  description: string;
  evaluatorId: string;
}

@Injectable()
export class CreateProjectUseCase {
  constructor(
    private projectRepository: ProjectRepository,
    private membershipRepository: ProjectMembershipRepository,
  ) {}

  async execute({ name, description, evaluatorId }: CreateProjectRequest) {
    const project = new Project({ name, description });

    await this.projectRepository.create(project);

    const membership = new ProjectMembership({
      evaluatorId,
      projectId: project.id,
      admin: true,
      joinedAt: new Date(),
    });

    await this.membershipRepository.create(membership);

    return project;
  }
}
