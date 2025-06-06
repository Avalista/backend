import { Evaluator } from 'src/modules/evaluator/entities/Evaluator';
import { EvaluatorRepository } from 'src/modules/evaluator/repositories/EvaluatorRepository';
import { PrismaService } from '../prisma.service';
import { PrismaEvaluatorMapper } from '../mappers/PrismaEvaluatorMappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaEvaluatorRepository implements EvaluatorRepository {
  constructor(private prisma: PrismaService) {}

  async create(evaluator: Evaluator): Promise<void> {
    const evaluatorRaw = PrismaEvaluatorMapper.toPrisma(evaluator);

    await this.prisma.evaluator.create({ data: evaluatorRaw });
  }
}
