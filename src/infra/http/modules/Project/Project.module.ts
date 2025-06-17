import { Module } from '@nestjs/common';
import { ProjectController } from './Project.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateProjectUseCase } from 'src/modules/project/useCases/createProjectUseCase/createProjectUseCase';
import { GetMyProjectsUseCase } from 'src/modules/project/useCases/getMyProjectsUseCase/GetMyProjectsUseCase';
import { GetProjectDetailsUseCase } from 'src/modules/project/useCases/getProjectUseCase/GetProjectDetailUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [
    CreateProjectUseCase,
    GetMyProjectsUseCase,
    GetProjectDetailsUseCase,
  ],
})
export class ProjectModule {}
