import { Module } from '@nestjs/common';
import { ProblemController } from './Problem.controller';
import { CreateProblemUseCase } from 'src/modules/problem/useCases/createProblemUseCase/CreateProblemUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProblemController],
  providers: [CreateProblemUseCase],
})
export class ProblemModule {}
