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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectResponseDTO } from './dtos/ProjectResponseDTO';
import { CreateProjectResponse } from './dtos/CreateProjectResponse';
import { projectQueryParams } from './dtos/projectQueryParams';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectController {
  constructor(
    private createProjectUseCase: CreateProjectUseCase,
    private getEvaluatorProjectsUseCase: GetMyProjectsUseCase,
    private getProjectDetailUseCase: GetProjectDetailUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: CreateProjectBody })
  @ApiResponse({ status: 201, type: CreateProjectResponse })
  async createProject(
    @Body() body: CreateProjectBody,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const { name, description } = body;
    const evaluatorId = request.user.id;

    const project = await this.createProjectUseCase.execute({
      name,
      description,
      evaluatorId,
    });

    return {
      id: project.id,
      name: project.name,
      description: project.description,
    };
  }

  @Get()
  @ApiOperation({ summary: 'List my projects' })
  @ApiQuery(projectQueryParams.search)
  @ApiQuery(projectQueryParams.orderBy)
  @ApiResponse({
    status: 200,
    type: [ProjectResponseDTO],
  })
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
  @ApiOperation({ summary: 'Detail an specific project' })
  @ApiResponse({
    status: 200,
    type: ProjectResponseDTO,
  })
  async getProjectDetails(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const evaluatorId = request.user.id;

    const project = await this.getProjectDetailUseCase.execute(id, evaluatorId);

    return ProjectViewModel.toHttp(project);
  }
}
