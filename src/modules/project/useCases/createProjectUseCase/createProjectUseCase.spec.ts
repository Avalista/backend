import { ProjectRepositoryInMemory } from '../../repositories/ProjectRepositoryInMemory';
import { ProjectMembershipRepositoryInMemory } from '../../../projectMembership/repositories/ProjectMembershipRepositoryInMemory';
import { CreateProjectUseCase } from './createProjectUseCase';
import { EvaluatorRepositoryInMemory } from 'src/modules/evaluator/repositories/EvaluatorRepositoryInMemory';
import { makeEvaluator } from 'src/modules/evaluator/factories/EvaluatorFactory';

let createProjectUseCase: CreateProjectUseCase;
let projectRepositoryInMemory: ProjectRepositoryInMemory;
let evaluatorRepositoryInMemory: EvaluatorRepositoryInMemory;
let membershipRepositoryInMemory: ProjectMembershipRepositoryInMemory;

describe('Create Project', () => {
  beforeEach(() => {
    projectRepositoryInMemory = new ProjectRepositoryInMemory();
    evaluatorRepositoryInMemory = new EvaluatorRepositoryInMemory();
    membershipRepositoryInMemory = new ProjectMembershipRepositoryInMemory();
    createProjectUseCase = new CreateProjectUseCase(
      projectRepositoryInMemory,
      membershipRepositoryInMemory,
      evaluatorRepositoryInMemory,
    );
  });

  it('Should create a project and assign the creator as admin', async () => {
    const evaluator = makeEvaluator({});

    await evaluatorRepositoryInMemory.create(evaluator);

    const project = await createProjectUseCase.execute({
      name: 'Avaliador Aqui',
      description: 'Projeto de avaliação de heurísticas',
      evaluatorId: evaluator.id,
    });

    expect(projectRepositoryInMemory.projects).toContain(project);

    const membership = membershipRepositoryInMemory.memberships.find(
      (m) => m.projectId === project.id && m.evaluatorId === evaluator.id,
    );

    expect(membership).toBeDefined();
    expect(membership?.admin).toBe(true);
  });
});
