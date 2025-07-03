import { Problem } from 'src/modules/problem/entities/Problem';
import { ProblemRepository } from 'src/modules/problem/repositories/ProblemRepository';
import { PrismaService } from '../prisma.service';
import { PrismaProblemMapper } from '../mappers/PrismaProblemMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProblemRepository implements ProblemRepository {
  constructor(private prisma: PrismaService) {}

  async create(problem: Problem): Promise<void> {
    const problemData = PrismaProblemMapper.toPrisma(problem);
    await this.prisma.problem.create({
      data: problemData,
    });
  }
}
