import { Project } from '../entities/Project';
import { ProjectRepository } from './ProjectRepository';

export class ProjectRepositoryInMemory implements ProjectRepository {
  public projects: Project[] = [];

  create(project: Project): Promise<void> {
    this.projects.push(project);
    return Promise.resolve();
  }
}
