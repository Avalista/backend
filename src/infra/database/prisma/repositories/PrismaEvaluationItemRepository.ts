import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EvaluationItem } from 'src/modules/evaluation/entities/EvaluationItem';
import { EvaluationItemRepository } from 'src/modules/evaluation/repositories/EvaluationItemRepository';
import { PrismaEvaluationItemMapper } from '../mappers/PrismaEvaluationItemMapper';

@Injectable()
export class PrismaEvaluationItemRepository
  implements EvaluationItemRepository
{
  constructor(private prisma: PrismaService) {}

  async create(evaluationItem: EvaluationItem): Promise<EvaluationItem> {
    const data = PrismaEvaluationItemMapper.toPrisma(evaluationItem);

    const createdItem = await this.prisma.evaluationItem.create({ data });

    return PrismaEvaluationItemMapper.toDomain(createdItem);
  }
}
