import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectBody } from './dtos/CreateProjectBody';
import { ProjectViewModel } from './viewModel/ProjectViewModel';
import { CreateProjectUseCase } from 'src/modules/project/useCases/createProjectUseCase/createProjectUseCase';

@Controller('projects')
export class ProjectController {
  constructor(private createProjectUseCase: CreateProjectUseCase) {}

  @Post()
  async createProject(@Body() body: CreateProjectBody) {
    const { name, description, evaluatorId } = body;

    const project = await this.createProjectUseCase.execute({
      name,
      description,
      evaluatorId,
    });

    return ProjectViewModel.toHttp(project);
  }
}
