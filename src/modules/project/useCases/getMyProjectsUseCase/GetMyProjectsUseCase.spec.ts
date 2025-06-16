import { ProjectRepositoryInMemory } from '../../repositories/ProjectRepositoryInMemory';
import { ProjectMembershipRepositoryInMemory } from '../../../projectMembership/repositories/ProjectMembershipRepositoryInMemory';
import { GetMyProjectsUseCase } from './GetMyProjectsUseCase';
import { ProjectMembership } from '../../../projectMembership/entities/ProjectMembership';
import { makeProject } from '../../factory/ProjectFactory';

let getMyProjectUseCase: GetMyProjectsUseCase;
let projectRepositoryInMemory: ProjectRepositoryInMemory;
let membershipRepositoryInMemory: ProjectMembershipRepositoryInMemory;

describe('GetMyProjectUseCase', () => {
  beforeEach(() => {
    projectRepositoryInMemory = new ProjectRepositoryInMemory();
    membershipRepositoryInMemory = new ProjectMembershipRepositoryInMemory();
    getMyProjectUseCase = new GetMyProjectsUseCase(projectRepositoryInMemory);
  });

  it('Should return projects where evaluator is a member', async () => {
    const evaluatorId = 'evaluator-123';

    const project1 = makeProject({});
    const project2 = makeProject({});

    projectRepositoryInMemory.projects.push(project1, project2);

    // Criar memberships associando projetos ao evaluator
    membershipRepositoryInMemory.memberships.push(
      new ProjectMembership({
        evaluatorId,
        projectId: project1.id,
        admin: false,
        joinedAt: new Date(),
      }),
      new ProjectMembership({
        evaluatorId,
        projectId: project2.id,
        admin: true,
        joinedAt: new Date(),
      }),
    );

    const projects = await getMyProjectUseCase.execute({ evaluatorId });

    expect(projects).toHaveLength(2);
    expect(projects).toEqual(expect.arrayContaining([project1, project2]));
  });

  it('Should return empty array if evaluator has no projects', async () => {
    const evaluatorId = 'non-existent-id';

    const projects = await getMyProjectUseCase.execute({ evaluatorId });

    expect(projects).toEqual([]);
  });
});
