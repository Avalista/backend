import { Module } from '@nestjs/common';
import { ProblemController } from './Problem.controller';
import { CreateProblemUseCase } from 'src/modules/problem/useCases/createProblemUseCase/CreateProblemUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';
import { S3Module } from 'src/infra/aws/s3.module';

@Module({
  imports: [DatabaseModule, S3Module],
  controllers: [ProblemController],
  providers: [CreateProblemUseCase],
})
export class ProblemModule {}
