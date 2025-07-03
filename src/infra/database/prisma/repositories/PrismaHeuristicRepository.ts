import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { HeuristicRepository } from 'src/modules/heuristic/repositories/HeuristicRepository';
import { Heuristic } from 'src/modules/heuristic/entities/Heuristic';
import { PrismaHeuristicMapper } from '../mappers/PrismaHeuristicMapper';

@Injectable()
export class PrismaHeuristicRepository implements HeuristicRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Heuristic[] | null> {
    const heuristics = await this.prisma.heuristic.findMany();

    if (heuristics.length === 0) {
      return null;
    }

    return heuristics.map((heuristic) =>
      PrismaHeuristicMapper.toDomain(heuristic),
    );
  }
}
