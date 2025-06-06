import { Module } from '@nestjs/common';
import { EvaluatorController } from './Evaluator.controller';
import { CreateEvaluatorUseCase } from 'src/modules/evaluator/useCases/createEvaluatorUseCase/CreateEvaluatorUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EvaluatorController],
  providers: [CreateEvaluatorUseCase],
})
export class EvaluatorModule {}
