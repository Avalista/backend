import { Injectable, NotFoundException } from '@nestjs/common';
import { Screen } from '../../entities/Screen';
import { ScreenRepository } from '../../repositories/ScreenRepository';
import { ProjectRepository } from '../../../project/repositories/ProjectRepository';
import { S3Service } from '../../../../infra/aws/s3.service';

interface CreateScreenRequest {
  title: string;
  description: string;
  screenshot: Express.Multer.File;
  projectId: string;
}

@Injectable()
export class CreateScreenUseCase {
  constructor(
    private screenRepository: ScreenRepository,
    private projectRepository: ProjectRepository,
    private readonly s3Service: S3Service,
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

    const screenshotUrl = await this.s3Service.uploadFile(screenshot);

    const screen = new Screen({
      title,
      description,
      screenshot: screenshotUrl,
      projectId,
    });

    await this.screenRepository.create(screen);

    return screen;
  }
}
