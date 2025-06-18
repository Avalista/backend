import { CreateScreenUseCase } from './CreateScreenUseCase';
import { ScreenRepositoryInMemory } from '../../repositories/ScreenRepositoryInMemory';
import { ProjectRepositoryInMemory } from '../../../project/repositories/ProjectRepositoryInMemory';
import { NotFoundException } from '@nestjs/common';
import { makeProject } from '../../../project/factory/ProjectFactory'; // Importando makeProject

let createScreenUseCase: CreateScreenUseCase;
let screenRepositoryInMemory: ScreenRepositoryInMemory;
let projectRepositoryInMemory: ProjectRepositoryInMemory;

describe('Create Screen', () => {
  beforeEach(() => {
    screenRepositoryInMemory = new ScreenRepositoryInMemory();
    projectRepositoryInMemory = new ProjectRepositoryInMemory();
    createScreenUseCase = new CreateScreenUseCase(
      screenRepositoryInMemory,
      projectRepositoryInMemory,
    );
  });

  it('should create a screen successfully if the project exists', async () => {
    const project = makeProject({ id: 'project-123' });
    await projectRepositoryInMemory.create(project);

    const createScreenRequest = {
      title: 'Test Screen',
      description: 'Test Screen Description',
      screenshot: 'test-image-url',
      projectId: 'project-123',
    };

    const screen = await createScreenUseCase.execute(createScreenRequest);

    expect(screenRepositoryInMemory.screens).toContain(screen);
    expect(screen.title).toBe(createScreenRequest.title);
    expect(screen.projectId).toBe(createScreenRequest.projectId);
  });

  it('should throw a NotFoundException if the project does not exist', async () => {
    const createScreenRequest = {
      title: 'Test Screen',
      description: 'Test Screen Description',
      screenshot: 'test-image-url',
      projectId: 'non-existing-project-id',
    };

    await expect(
      createScreenUseCase.execute(createScreenRequest),
    ).rejects.toThrow(
      new NotFoundException(
        `Project with ID ${createScreenRequest.projectId} not found.`,
      ),
    );
  });
});
