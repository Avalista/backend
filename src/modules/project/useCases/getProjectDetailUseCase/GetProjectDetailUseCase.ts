import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectRepository } from '../../repositories/ProjectRepository';
import { Project } from '../../entities/Project';
import { ProjectMembershipRepository } from '../../../projectMembership/repositories/ProjectMembershipRepository';

@Injectable()
export class GetProjectDetailUseCase {
  constructor(
    private projectRepository: ProjectRepository,
    private projectMembershipRepository: ProjectMembershipRepository,
  ) {}

  async execute(id: string, evaluatorId: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const membership =
      await this.projectMembershipRepository.findByProjectIdAndEvaluatorId(
        project?.id,
        evaluatorId,
      );

    if (evaluatorId !== membership?.evaluatorId) {
      throw new ForbiddenException(
        'You do not have permission to access or modify this project',
      );
    }

    return project;
  }
}
