import { Module } from '@nestjs/common';
import { ProjectController } from './Project.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateProjectUseCase } from 'src/modules/project/useCases/createProjectUseCase/createProjectUseCase';
import { GetMyProjectsUseCase } from 'src/modules/project/useCases/getMyProjectsUseCase/GetMyProjectsUseCase';
import { GetProjectDetailUseCase } from 'src/modules/project/useCases/getProjectDetailUseCase/GetProjectDetailUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [
    CreateProjectUseCase,
    GetMyProjectsUseCase,
    GetProjectDetailUseCase,
  ],
})
export class ProjectModule {}
