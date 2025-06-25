import { ProjectRepositoryInMemory } from '../../repositories/ProjectRepositoryInMemory';
import { ProjectMembershipRepositoryInMemory } from '../../../projectMembership/repositories/ProjectMembershipRepositoryInMemory';
import { GetProjectDetailUseCase } from './GetProjectDetailUseCase';
import { makeProject } from '../../factory/ProjectFactory';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { ProjectMembership } from '../../../projectMembership/entities/ProjectMembership';
import { makeEvaluator } from 'src/modules/evaluator/factories/EvaluatorFactory';

let getProjectDetailUseCase: GetProjectDetailUseCase;
let projectRepositoryInMemory: ProjectRepositoryInMemory;
let membershipRepositoryInMemory: ProjectMembershipRepositoryInMemory;

describe('GetProjectDetailUseCase', () => {
  beforeEach(() => {
    projectRepositoryInMemory = new ProjectRepositoryInMemory();
    membershipRepositoryInMemory = new ProjectMembershipRepositoryInMemory();
    getProjectDetailUseCase = new GetProjectDetailUseCase(
      projectRepositoryInMemory,
      membershipRepositoryInMemory,
    );
  });

  it('Should throw NotFoundException if project is not found', async () => {
    const projectId = 'project-123';
    const evaluatorId = 'evaluator-123';

    await expect(
      getProjectDetailUseCase.execute(projectId, evaluatorId),
    ).rejects.toThrow(new NotFoundException('Project not found'));
  });

  it('Should throw ForbiddenException if no membership is found for the evaluator', async () => {
    const projectId = 'project-123';
    const evaluatorId = 'evaluator-123';
    const project = makeProject({ id: projectId });

    await projectRepositoryInMemory.create(project);

    await expect(
      getProjectDetailUseCase.execute(projectId, evaluatorId),
    ).rejects.toThrow(
      new ForbiddenException(
        'You do not have permission to access or modify this project',
      ),
    );
  });

  it('Should throw ForbiddenException if evaluatorId does not match the membership evaluatorId', async () => {
    const projectId = 'project-123';
    const evaluatorId = 'evaluator-123';
    const wrongEvaluatorId = 'evaluator-456';
    const project = makeProject({ id: projectId });
    const evaluator = makeEvaluator({});

    projectRepositoryInMemory.projects.push(project);

    membershipRepositoryInMemory.memberships.push(
      new ProjectMembership({
        evaluatorId: wrongEvaluatorId,
        projectId: projectId,
        evaluator,
        admin: false,
        joinedAt: new Date(),
      }),
    );

    await expect(
      getProjectDetailUseCase.execute(projectId, evaluatorId),
    ).rejects.toThrow(
      new ForbiddenException(
        'You do not have permission to access or modify this project',
      ),
    );
  });

  it('Should return the project when evaluator has the correct permissions', async () => {
    const projectId = 'project-123';
    const evaluatorId = 'evaluator-123';
    const project = makeProject({ id: projectId });
    const evaluator = makeEvaluator({});

    projectRepositoryInMemory.projects.push(project);

    membershipRepositoryInMemory.memberships.push(
      new ProjectMembership({
        evaluatorId: evaluatorId,
        projectId: projectId,
        evaluator,
        admin: false,
        joinedAt: new Date(),
      }),
    );

    const result = await getProjectDetailUseCase.execute(
      projectId,
      evaluatorId,
    );
    expect(result).toEqual(project);
  });
});
