import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CreateProjectBody } from './dtos/CreateProjectBody';
import { ProjectViewModel } from './viewModel/ProjectViewModel';
import { CreateProjectUseCase } from 'src/modules/project/useCases/createProjectUseCase/createProjectUseCase';
import { GetMyProjectsUseCase } from 'src/modules/project/useCases/getMyProjectsUseCase/GetMyProjectsUseCase';
import { GetMyProjectsQuery } from './dtos/GetProjectsQuery';
import { GetProjectDetailUseCase } from 'src/modules/project/useCases/getProjectDetailUseCase/GetProjectDetailUseCase';
import { AuthenticatedRequestModel } from '../auth/models/AuthenticatedRequestModel';

@Controller('projects')
export class ProjectController {
  constructor(
    private createProjectUseCase: CreateProjectUseCase,
    private getEvaluatorProjectsUseCase: GetMyProjectsUseCase,
    private getProjectDetailUseCase: GetProjectDetailUseCase,
  ) {}

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

  @Get()
  async getMyProjects(
    @Query() query: GetMyProjectsQuery,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const evaluatorId = request.user.id;

    const projects = await this.getEvaluatorProjectsUseCase.execute({
      evaluatorId,
      search: query.search,
      orderBy: query.orderBy,
    });

    return projects.map((project) => ProjectViewModel.toHttp(project));
  }

  @Get(':id')
  async getProjectDetails(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const evaluatorId = request.user.id;

    const project = await this.getProjectDetailUseCase.execute(id, evaluatorId);

    return ProjectViewModel.toHttp(project);
  }
}
