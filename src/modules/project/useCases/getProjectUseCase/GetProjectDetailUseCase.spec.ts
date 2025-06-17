import { ProjectRepositoryInMemory } from '../../repositories/ProjectRepositoryInMemory';
import { ProjectMembershipRepositoryInMemory } from '../../../projectMembership/repositories/ProjectMembershipRepositoryInMemory';
import { GetProjectDetailsUseCase } from './GetProjectDetailUseCase';
import { makeProject } from '../../factory/ProjectFactory';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { ProjectMembership } from '../../../projectMembership/entities/ProjectMembership';

let getProjectDetailsUseCase: GetProjectDetailsUseCase;
let projectRepositoryInMemory: ProjectRepositoryInMemory;
let membershipRepositoryInMemory: ProjectMembershipRepositoryInMemory;

describe('GetProjectDetailsUseCase', () => {
  beforeEach(() => {
    projectRepositoryInMemory = new ProjectRepositoryInMemory();
    membershipRepositoryInMemory = new ProjectMembershipRepositoryInMemory();
    getProjectDetailsUseCase = new GetProjectDetailsUseCase(
      projectRepositoryInMemory,
      membershipRepositoryInMemory,
    );
  });

  it('Should throw NotFoundException if project is not found', async () => {
    const projectId = 'project-123';
    const evaluatorId = 'evaluator-123';

    await expect(
      getProjectDetailsUseCase.execute(projectId, evaluatorId),
    ).rejects.toThrow(new NotFoundException('Project not found'));
  });

  it('Should throw ForbiddenException if no membership is found for the evaluator', async () => {
    const projectId = 'project-123';
    const evaluatorId = 'evaluator-123';
    const project = makeProject({ id: projectId });

    await projectRepositoryInMemory.create(project);

    await expect(
      getProjectDetailsUseCase.execute(projectId, evaluatorId),
    ).rejects.toThrow(
      new ForbiddenException(
        'You do not have permission to access or modify this project membership.',
      ),
    );
  });

  it('Should throw ForbiddenException if evaluatorId does not match the membership evaluatorId', async () => {
    const projectId = 'project-123';
    const evaluatorId = 'evaluator-123';
    const wrongEvaluatorId = 'evaluator-456';
    const project = makeProject({ id: projectId });

    // Adicionar o projeto no repositório
    projectRepositoryInMemory.projects.push(project);

    // Adicionar membership com o evaluatorId errado
    membershipRepositoryInMemory.memberships.push(
      new ProjectMembership({
        evaluatorId: wrongEvaluatorId,
        projectId: projectId,
        admin: false,
        joinedAt: new Date(),
      }),
    );

    await expect(
      getProjectDetailsUseCase.execute(projectId, evaluatorId),
    ).rejects.toThrow(
      new ForbiddenException(
        'You do not have permission to access or modify this project membership.',
      ),
    );
  });

  it('Should return the project when evaluator has the correct permissions', async () => {
    const projectId = 'project-123';
    const evaluatorId = 'evaluator-123';
    const project = makeProject({ id: projectId });

    projectRepositoryInMemory.projects.push(project);

    membershipRepositoryInMemory.memberships.push(
      new ProjectMembership({
        evaluatorId: evaluatorId,
        projectId: projectId,
        admin: false,
        joinedAt: new Date(),
      }),
    );

    const result = await getProjectDetailsUseCase.execute(
      projectId,
      evaluatorId,
    );
    expect(result).toEqual(project);
  });
});
