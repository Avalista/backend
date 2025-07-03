import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateEvaluationSessionUseCase } from 'src/modules/evaluationSession/useCases/createEvaluationSessionUseCase/CreateEvaluationSessionUseCase';
import { EvaluationSessionController } from './EvaluationSession.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [EvaluationSessionController],
  providers: [CreateEvaluationSessionUseCase],
})
export class EvaluationSessionModule {}
