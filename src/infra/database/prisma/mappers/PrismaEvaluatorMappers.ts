import { Evaluator } from 'src/modules/evaluator/entities/Evaluator';
import { Evaluator as EvaluatorRaw } from '@prisma/client';

export class PrismaEvaluatorMapper {
  static toPrisma({
    name,
    password,
    email,
    avatar,
    isSystemAdmin,
    id,
  }: Evaluator): EvaluatorRaw {
    return {
      name,
      password,
      email,
      avatar,
      isSystemAdmin,
      id,
    };
  }

  static toDomain({
    id,
    name,
    email,
    password,
    avatar,
    isSystemAdmin,
  }: EvaluatorRaw): Evaluator {
    return new Evaluator({ name, email, password, avatar, isSystemAdmin }, id);
  }
}
