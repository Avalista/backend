import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { fileValidators } from '../fileUpload/dtos/fileValidators';

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
  @UseInterceptors(FileInterceptor('screenshots'))
  async createProblem(
    @Body() body: CreateProblemBody,
    @Request() request: AuthenticatedRequestModel,
    @UploadedFiles(
      new ParseFilePipe({
        validators: fileValidators,
      }),
    )
    screenshots: Express.Multer.File[],
  ) {
    const {
      screenId,
      heuristicId,
      description,
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
