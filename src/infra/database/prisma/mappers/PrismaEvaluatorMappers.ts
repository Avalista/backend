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
}
