import { Project } from '../entities/Project';
import { FindManyByIdsParams, ProjectRepository } from './ProjectRepository';

export class ProjectRepositoryInMemory implements ProjectRepository {
  public projects: Project[] = [];

  create(project: Project): Promise<void> {
    this.projects.push(project);
    return Promise.resolve();
  }

  async findManyByIds({
    ids,
    search,
    orderBy,
  }: FindManyByIdsParams): Promise<Project[]> {
    let result = this.projects.filter((project) => ids.includes(project.id));

    if (search) {
      result = result.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (orderBy === 'name-asc') {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (orderBy === 'name-desc') {
      result = result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return Promise.resolve(result);
  }
}
