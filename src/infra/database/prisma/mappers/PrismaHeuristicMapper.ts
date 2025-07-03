import { Heuristic as HeuristicRaw } from '@prisma/client';
import { Heuristic } from 'src/modules/heuristic/entities/Heuristic';

export class PrismaHeuristicMapper {
  static toPrisma({
    id,
    code,
    name,
    description,
    status,
    categoryId,
    authorId,
  }: Heuristic): HeuristicRaw {
    return {
      id,
      code,
      name,
      description,
      status,
      categoryId,
      authorId,
    };
  }

  static toDomain({
    id,
    code,
    name,
    description,
    status,
    categoryId,
    authorId,
  }: HeuristicRaw): Heuristic {
    return new Heuristic(
      {
        code,
        name,
        description,
        status,
        categoryId,
        authorId,
      },
      id,
    );
  }
}
