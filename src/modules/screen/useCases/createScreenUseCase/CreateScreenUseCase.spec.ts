import { CreateScreenUseCase } from './CreateScreenUseCase';
import { ScreenRepositoryInMemory } from '../../repositories/ScreenRepositoryInMemory';
import { ProjectRepositoryInMemory } from '../../../project/repositories/ProjectRepositoryInMemory';
import { NotFoundException } from '@nestjs/common';
import { makeProject } from '../../../project/factory/ProjectFactory';
import { S3Service } from 'src/infra/aws/s3.service';
import { ConfigService } from '@nestjs/config';
import { createMockFile } from 'src/utils/FileMocks';

jest.mock('src/infra/aws/s3.service');
jest.mock('@nestjs/config');

let createScreenUseCase: CreateScreenUseCase;
let screenRepositoryInMemory: ScreenRepositoryInMemory;
let projectRepositoryInMemory: ProjectRepositoryInMemory;
let s3ServiceMock: jest.Mocked<S3Service>;
let configServiceMock: jest.Mocked<ConfigService>;

describe('Create Screen', () => {
  beforeEach(() => {
    configServiceMock = new ConfigService() as jest.Mocked<ConfigService>;
    configServiceMock.get = jest.fn().mockImplementation((key: string) => {
      switch (key) {
        case 'AWS_REGION':
          return 'us-east-1';
        case 'AWS_ACCESS_KEY_ID':
          return 'accessKey';
        case 'AWS_SECRET_ACCESS_KEY':
          return 'secretKey';
        case 'AWS_S3_BUCKET':
          return 'my-bucket';
        default:
          return undefined;
      }
    });

    s3ServiceMock = new S3Service(configServiceMock) as jest.Mocked<S3Service>;
    s3ServiceMock.uploadFile = jest.fn().mockResolvedValue('test-image-url');

    screenRepositoryInMemory = new ScreenRepositoryInMemory();
    projectRepositoryInMemory = new ProjectRepositoryInMemory();
    createScreenUseCase = new CreateScreenUseCase(
      screenRepositoryInMemory,
      projectRepositoryInMemory,
      s3ServiceMock,
    );
  });

  it('should create a screen successfully if the project exists', async () => {
    const project = makeProject({ id: 'project-123' });
    await projectRepositoryInMemory.create(project);

    const createScreenRequest = {
      title: 'Test Screen',
      description: 'Test Screen Description',
      screenshot: createMockFile(),
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
      screenshot: createMockFile(),
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
