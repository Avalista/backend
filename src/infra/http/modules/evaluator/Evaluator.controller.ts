import { Body, Controller, Post } from '@nestjs/common';
import { CreateEvaluatorUseCase } from 'src/modules/evaluator/useCases/createEvaluatorUseCase/CreateEvaluatorUseCase';
import { CreateEvaluatorBody } from './dtos/createEvaluatorBody';
import { EvaluatorViewModel } from './viewModel/EvaluatorViewModel';
import { Public } from '../auth/decorators/IsPublic';

@Controller('evaluators')
export class EvaluatorController {
  constructor(private createEvaluatorUseCase: CreateEvaluatorUseCase) {}

  @Post()
  @Public()
  async createEvaluator(@Body() body: CreateEvaluatorBody) {
    const { name, email, password, avatar } = body;

    const evaluator = await this.createEvaluatorUseCase.execute({
      name,
      email,
      password,
      avatar,
    });

    return EvaluatorViewModel.toHttp(evaluator);
  }
}
