import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateEvaluatorUseCase } from 'src/modules/evaluator/useCases/createEvaluatorUseCase/CreateEvaluatorUseCase';
import { CreateEvaluatorBody } from './dtos/createEvaluatorBody';
import { EvaluatorViewModel } from './viewModel/EvaluatorViewModel';

@Controller('evaluators')
export class EvaluatorController {
  constructor(private createEvaluatorUseCase: CreateEvaluatorUseCase) {}

  @Post()
  async createEvaluator(@Body() body: CreateEvaluatorBody) {
    const { name, email, password, passwordConfirm, avatar } = body;

    if (password !== passwordConfirm) {
      throw new BadRequestException('passwordConfirm must match password');
    }

    const evaluator = await this.createEvaluatorUseCase.execute({
      name,
      email,
      password,
      avatar,
    });

    return EvaluatorViewModel.toHttp(evaluator);
  }
}
