import { Project } from 'src/modules/project/entities/Project';

export class ProjectViewModel {
  static toHttp({ id, name, description }: Project) {
    return {
      id,
      name,
      description,
    };
  }
}
