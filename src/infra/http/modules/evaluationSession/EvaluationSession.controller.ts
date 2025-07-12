import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CreateEvaluationSessionUseCase } from 'src/modules/evaluationSession/useCases/createEvaluationSessionUseCase/CreateEvaluationSessionUseCase';
import { CreateEvaluationSessionRequest } from './dtos/CreateEvaluationSessionRequest';
import { AuthenticatedRequestModel } from '../auth/models/AuthenticatedRequestModel';
import { EvaluationSessionViewModel } from './viewModel/EvaluationSessionViewModel';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EvaluationSessionViewModelDTO } from './dtos/EvaluationSessionResponseDTO';
import { GetEvaluationSessionUseCase } from 'src/modules/evaluationSession/useCases/getEvaluationSessionUseCase/GetEvaluationSessionUseCase';

@ApiTags('evaluations')
@ApiBearerAuth()
@Controller('evaluations')
export class EvaluationSessionController {
  constructor(
    private createEvaluationSessionUseCase: CreateEvaluationSessionUseCase,
    private getEvaluationSessionUseCase: GetEvaluationSessionUseCase,
  ) {}

  @Post('initialize')
  @ApiBody({
    description: 'Dados do projeto para iniciar a avaliação',
    type: CreateEvaluationSessionRequest,
  })
  @ApiResponse({
    status: 201,
    description: 'Sessão de avaliação criada com sucesso.',
    type: EvaluationSessionViewModelDTO,
  })
  async createEvaluationSession(
    @Body() body: CreateEvaluationSessionRequest,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const evaluatorId = request.user.id;

    const result = await this.createEvaluationSessionUseCase.execute({
      projectId: body.projectId,
      evaluatorId,
    });

    return EvaluationSessionViewModel.toHttp(result);
  }

  @Get()
  @ApiBody({
    description: 'Dados do projeto para monitorar a avaliação',
    type: CreateEvaluationSessionRequest,
  })
  @ApiResponse({
    status: 200,
    type: EvaluationSessionViewModelDTO,
  })
  async getEvaluation(
    @Body() body: CreateEvaluationSessionRequest,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const evaluatorId = request.user.id;

    const result = await this.getEvaluationSessionUseCase.execute({
      evaluatorId,
      projectId: body.projectId,
    });

    return EvaluationSessionViewModel.toHttp(result);
  }
}
