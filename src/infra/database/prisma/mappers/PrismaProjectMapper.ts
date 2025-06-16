import { Project as ProjectRaw } from '@prisma/client';
import { Project } from 'src/modules/project/entities/Project';

export class PrismaProjectMapper {
  static toPrisma({ id, name, description }: Project): ProjectRaw {
    return {
      id,
      name,
      description,
    };
  }

  static toDomain({ id, name, description }: ProjectRaw): Project {
    return new Project({ name, description }, id);
  }
}
