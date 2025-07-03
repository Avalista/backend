import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateProblemBody } from './dtos/CreateProblemBody';
import { CreateProblemUseCase } from 'src/modules/problem/useCases/createProblemUseCase/CreateProblemUseCase';
import { AuthenticatedRequestModel } from '../auth/models/AuthenticatedRequestModel';
import { EvaluationSessionViewModel } from '../evaluationSession/viewModel/EvaluationSessionViewModel';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Problems')
@ApiBearerAuth()
@Controller('problems')
export class ProblemController {
  constructor(private createProblemUseCase: CreateProblemUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new problem' })
  @ApiBody({ type: CreateProblemBody })
  @ApiResponse({
    status: 201,
    description: 'Problem successfully created',
    type: EvaluationSessionViewModel,
  })
  @ApiResponse({
    status: 400,
  })
  @ApiResponse({
    status: 401,
  })
  async createProblem(
    @Body() body: CreateProblemBody,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const {
      screenId,
      heuristicId,
      description,
      screenshots,
      improvementSuggestions,
      severity,
      effort,
      priority,
    } = body;
    const evaluatorId = request.user.id;

    const result = await this.createProblemUseCase.execute({
      evaluatorId,
      screenId,
      heuristicId,
      description,
      screenshots,
      improvementSuggestions,
      severity,
      effort,
      priority,
    });

    return EvaluationSessionViewModel.toHttp(result);
  }
}
