import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Effort } from 'src/enums/Effort';
import type { Severity } from 'src/enums/Severity';
import { ProblemRepository } from '../../repositories/ProblemRepository';
import { Problem } from '../../entities/Problem';
import { EvaluationItemRepository } from 'src/modules/evaluation/repositories/EvaluationItemRepository';
import { EvaluatorRepository } from 'src/modules/evaluator/repositories/EvaluatorRepository';
import { EvaluationSessionRepository } from 'src/modules/evaluationSession/repositories/EvaluationSessionRepository';
import { EvaluationSession } from 'src/modules/evaluationSession/entities/EvaluationSession';
import { S3Service } from 'src/infra/aws/s3.service';

interface CreateProblemRequest {
  evaluatorId: string;
  screenId: string;
  heuristicId: string;
  description: string;
  screenshots: Express.Multer.File[];
  improvementSuggestions: string;
  severity: Severity;
  effort: Effort;
  priority: boolean;
}

@Injectable()
export class CreateProblemUseCase {
  constructor(
    private evaluatorRepository: EvaluatorRepository,
    private problemRepository: ProblemRepository,
    private evaluationItemRepository: EvaluationItemRepository,
    private evaluationSessionRepository: EvaluationSessionRepository,
    private s3Service: S3Service,
  ) {}

  async execute({
    evaluatorId,
    screenId,
    heuristicId,
    description,
    screenshots,
    improvementSuggestions,
    severity,
    effort,
    priority,
  }: CreateProblemRequest) {
    const evaluationItem =
      await this.evaluationItemRepository.getByScreenAndHeuristic(
        screenId,
        heuristicId,
      );

    if (!evaluationItem?.screenId) {
      throw new BadRequestException('Não existe uma sessão de avaliação ativa');
    }

    const evaluator = await this.evaluatorRepository.findBySessionId(
      evaluationItem?.sessionId,
    );

    if (evaluator?.id !== evaluatorId) {
      throw new UnauthorizedException(
        'Voce nao tem permissão para executar essa ação',
      );
    }

    // PAREI AQUI, FALTA IMPORTA O S3SERVICDE LA NO MODULE
    const screenshotUrls = await Promise.all(
      screenshots.map(async (file) => {
        const fileUrl = await this.s3Service.uploadFile(file);
        return fileUrl;
      }),
    );

    const newProblem: Problem = new Problem({
      description,
      screenshots: screenshotUrls,
      improvementSuggestions,
      severity,
      effort,
      priority,
      evaluationItemId: evaluationItem.id,
    });

    await this.problemRepository.create(newProblem);

    const evaluationSessionDetail =
      (await this.evaluationSessionRepository.getEvaluationDetails(
        evaluationItem?.sessionId,
      )) as EvaluationSession;

    return evaluationSessionDetail;
  }
}
