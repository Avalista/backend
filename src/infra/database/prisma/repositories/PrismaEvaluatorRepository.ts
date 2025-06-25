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

  async findByEmail(email: string): Promise<Evaluator | null> {
    const evaluator = await this.prisma.evaluator.findUnique({
      where: {
        email,
      },
    });

    if (!evaluator) return null;

    return PrismaEvaluatorMapper.toDomain(evaluator);
  }

  async findById(id: string): Promise<Evaluator | null> {
    const evaluator = await this.prisma.evaluator.findUnique({
      where: {
        id,
      },
    });

    if (!evaluator) return null;

    return PrismaEvaluatorMapper.toDomain(evaluator);
  }
}
