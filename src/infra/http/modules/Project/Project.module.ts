import { Module } from '@nestjs/common';
import { ProjectController } from './Project.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateProjectUseCase } from 'src/modules/project/useCases/createProjectUseCase/createProjectUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [CreateProjectUseCase],
})
export class ProjectModule {}
