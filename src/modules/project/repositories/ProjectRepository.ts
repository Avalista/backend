import { Project } from '../entities/Project';

export interface FindManyByIdsParams {
  ids: string[];
  search?: string;
  orderBy?: 'name-asc' | 'name-desc' | '';
}

export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
  abstract findManyByIds(params: FindManyByIdsParams): Promise<Project[]>;
  abstract findById(id: string): Promise<Project | null>;
}
