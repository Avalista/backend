import { Screen as ScreenRaw } from '@prisma/client';
import { Screen } from 'src/modules/screen/entities/Screen';

export class PrismaScreenMapper {
  static toPrisma({
    id,
    title,
    description,
    screenshot,
    projectId,
  }: Screen): ScreenRaw {
    return {
      id,
      title,
      description,
      screenshot,
      projectId,
    };
  }

  static toDomain({
    id,
    title,
    description,
    screenshot,
    projectId,
  }: ScreenRaw): Screen {
    return new Screen({ title, description, screenshot, projectId }, id);
  }
}
