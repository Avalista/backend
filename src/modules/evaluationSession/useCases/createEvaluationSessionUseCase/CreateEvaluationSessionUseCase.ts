import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectRepository } from 'src/modules/project/repositories/ProjectRepository';
import { ScreenRepository } from 'src/modules/screen/repositories/ScreenRepository';
import { EvaluationSessionRepository } from '../../repositories/EvaluationSessionRepository';
import { EvaluationSession } from '../../entities/EvaluationSession';
import { HeuristicRepository } from 'src/modules/heuristic/repositories/HeuristicRepository';
import { EvaluationItemRepository } from 'src/modules/evaluation/repositories/EvaluationItemRepository';
import { EvaluationItem } from 'src/modules/evaluation/entities/EvaluationItem';
import { EvaluatorRepository } from 'src/modules/evaluator/repositories/EvaluatorRepository';

interface CreateEvaluationSessionRequest {
  evaluatorId: string;
  projectId: string;
}

@Injectable()
export class CreateEvaluationSessionUseCase {
  constructor(
    private evaluationSessionRepository: EvaluationSessionRepository,
    private projectRepository: ProjectRepository,
    private evaluationItemRepository: EvaluationItemRepository,
    private screenRepository: ScreenRepository,
    private heuristicRepository: HeuristicRepository,
    private evaluatorRepository: EvaluatorRepository,
  ) {}

  async execute({ evaluatorId, projectId }: CreateEvaluationSessionRequest) {
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new BadRequestException('Projeto não encontrado');
    }

    const existingSession =
      await this.evaluationSessionRepository.findActiveByEvaluatorAndProject(
        evaluatorId,
        projectId,
      );

    if (existingSession) {
      throw new BadRequestException(
        'Já existe uma sessão de avaliação para este usuário neste projeto.',
      );
    }

    const screens = await this.screenRepository.findByProjectId(projectId);

    if (!screens || screens.length === 0)
      throw new BadRequestException(
        'Não há telas cadastradas para esse projeto.',
      );

    const heuristics = await this.heuristicRepository.getAll();

    if (!heuristics) throw new BadRequestException('Não há heuristicas.');

    const newEvaluationSession = new EvaluationSession({
      evaluatorId,
      projectId,
      startedAt: new Date(),
      status: 'IN_PROGRESS',
    });

    // Cria a sessão
    const evaluationSession =
      await this.evaluationSessionRepository.create(newEvaluationSession);

    const evaluationItems: EvaluationItem[] = [];

    // Para cada tela e heuristica, cria um evaluationItem
    for (const screen of screens) {
      for (const heuristic of heuristics) {
        const evaluationItem = new EvaluationItem({
          sessionId: evaluationSession.id,
          screenId: screen.id,
          heuristicId: heuristic.id,
          status: 'NOT_REVIEWED',
        });

        await this.evaluationItemRepository.create(evaluationItem);
        evaluationItems.push(evaluationItem);
      }
    }

    const evaluationSessionDetail =
      (await this.evaluationSessionRepository.getEvaluationDetails(
        evaluationSession.id,
      )) as EvaluationSession;

    return evaluationSessionDetail;
  }
}
