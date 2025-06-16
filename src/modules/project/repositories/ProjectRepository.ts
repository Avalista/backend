import { Project } from '../entities/Project';

export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
}
