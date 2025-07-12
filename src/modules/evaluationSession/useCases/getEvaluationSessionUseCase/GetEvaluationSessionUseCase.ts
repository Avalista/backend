import { BadRequestException, Injectable } from '@nestjs/common';
import { EvaluationSessionRepository } from '../../repositories/EvaluationSessionRepository';
import { ProjectRepository } from 'src/modules/project/repositories/ProjectRepository';
import { EvaluationSession } from '../../entities/EvaluationSession';

interface GetEvaluationSessionRequest {
  evaluatorId: string;
  projectId: string;
}

@Injectable()
export class GetEvaluationSessionUseCase {
  constructor(
    private evaluationSessionRepository: EvaluationSessionRepository,
    private projectRepository: ProjectRepository,
  ) {}

  async execute({ evaluatorId, projectId }: GetEvaluationSessionRequest) {
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new BadRequestException('Projeto não encontrado');
    }

    const existingSession =
      await this.evaluationSessionRepository.findActiveByEvaluatorAndProject(
        evaluatorId,
        projectId,
      );

    if (!existingSession) {
      throw new BadRequestException(
        'Ainda não existe uma sessão de avaliação para este usuário nesse projeto',
      );
    }

    const evaluationSessionDetail =
      (await this.evaluationSessionRepository.getEvaluationDetails(
        existingSession.id,
      )) as EvaluationSession;

    return evaluationSessionDetail;
  }
}
