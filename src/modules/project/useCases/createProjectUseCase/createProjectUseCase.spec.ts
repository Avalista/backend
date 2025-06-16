import { ProjectRepositoryInMemory } from '../../repositories/ProjectRepositoryInMemory';
import { ProjectMembershipRepositoryInMemory } from '../../../projectMembership/repositories/ProjectMembershipRepositoryInMemory';
import { CreateProjectUseCase } from './createProjectUseCase';

let createProjectUseCase: CreateProjectUseCase;
let projectRepositoryInMemory: ProjectRepositoryInMemory;
let membershipRepositoryInMemory: ProjectMembershipRepositoryInMemory;

describe('Create Project', () => {
  beforeEach(() => {
    projectRepositoryInMemory = new ProjectRepositoryInMemory();
    membershipRepositoryInMemory = new ProjectMembershipRepositoryInMemory();
    createProjectUseCase = new CreateProjectUseCase(
      projectRepositoryInMemory,
      membershipRepositoryInMemory,
    );
  });

  it('Should create a project and assign the creator as admin', async () => {
    const evaluatorId = 'evaluator-123';

    const project = await createProjectUseCase.execute({
      name: 'Avaliador Aqui',
      description: 'Projeto de avaliação de heurísticas',
      evaluatorId,
    });

    expect(projectRepositoryInMemory.projects).toContain(project);

    const membership = membershipRepositoryInMemory.memberships.find(
      (m) => m.projectId === project.id && m.evaluatorId === evaluatorId,
    );

    expect(membership).toBeDefined();
    expect(membership?.admin).toBe(true);
  });
});
