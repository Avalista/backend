import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../repositories/ProjectRepository';
import { Project } from '../../entities/Project';
import { ProjectMembershipRepository } from '../../../projectMembership/repositories/ProjectMembershipRepository';
import { ProjectMembership } from '../../../projectMembership/entities/ProjectMembership';
import { EvaluatorRepository } from 'src/modules/evaluator/repositories/EvaluatorRepository';

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
    private evaluatorRepository: EvaluatorRepository,
  ) {}

  async execute({ name, description, evaluatorId }: CreateProjectRequest) {
    const project = new Project({ name, description });

    const evaluator = await this.evaluatorRepository.findById(evaluatorId);

    if (!evaluator) throw new BadRequestException('Evaluator not found');

    await this.projectRepository.create(project);

    const membership = new ProjectMembership({
      evaluatorId,
      projectId: project.id,
      evaluator,
      admin: true,
      joinedAt: new Date(),
    });

    await this.membershipRepository.create(membership);

    return project;
  }
}
