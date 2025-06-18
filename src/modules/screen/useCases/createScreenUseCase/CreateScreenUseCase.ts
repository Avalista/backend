import { Injectable, NotFoundException } from '@nestjs/common';
import { Screen } from '../../entities/Screen';
import { ScreenRepository } from '../../repositories/ScreenRepository';
import { ProjectRepository } from '../../../project/repositories/ProjectRepository';

interface CreateScreenRequest {
  title: string;
  description: string;
  screenshot: string;
  projectId: string;
}

@Injectable()
export class CreateScreenUseCase {
  constructor(
    private screenRepository: ScreenRepository,
    private projectRepository: ProjectRepository,
  ) {}

  async execute({
    title,
    description,
    screenshot,
    projectId,
  }: CreateScreenRequest): Promise<Screen> {
    const projectExist = await this.projectRepository.findById(projectId);

    if (!projectExist) {
      throw new NotFoundException(`Project with ID ${projectId} not found.`);
    }

    const screen = new Screen({ title, description, screenshot, projectId });

    await this.screenRepository.create(screen);

    return screen;
  }
}
