import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EvaluationSessionRepository } from 'src/modules/evaluationSession/repositories/EvaluationSessionRepository';
import { EvaluationSession } from 'src/modules/evaluationSession/entities/EvaluationSession';
import { PrismaEvaluationSessionMapper } from '../mappers/PrismaEvaluationSessionMapper';

@Injectable()
export class PrismaEvaluationSessionRepository
  implements EvaluationSessionRepository
{
  constructor(private prisma: PrismaService) {}

  async create(
    evaluationSession: EvaluationSession,
  ): Promise<EvaluationSession> {
    const data = PrismaEvaluationSessionMapper.toPrisma(evaluationSession);

    const createdSession = await this.prisma.evaluationSession.create({
      data,
    });

    return PrismaEvaluationSessionMapper.toDomain(createdSession);
  }

  async getEvaluationDetails(id: string): Promise<any> {
    return this.prisma.evaluationSession.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        evaluator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        evaluationItems: {
          select: {
            id: true,
            status: true,
            reviewedAt: true,
            screen: {
              select: {
                id: true,
                title: true,
                description: true,
                screenshot: true,
              },
            },
            heuristic: {
              select: {
                id: true,
                name: true,
                code: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                    color: true,
                  },
                },
              },
            },
            problems: {
              select: {
                id: true,
                description: true,
                screenshot: true,
                improvementSuggestions: true,
                severity: true,
                effort: true,
                resolvedAt: true,
                priority: true,
              },
            },
          },
        },
      },
    });
  }

  async findActiveByEvaluatorAndProject(
    evaluatorId: string,
    projectId: string,
  ): Promise<EvaluationSession | null> {
    const existingSession = await this.prisma.evaluationSession.findFirst({
      where: {
        evaluatorId,
        projectId,
      },
    });

    if (!existingSession) return null;

    return new EvaluationSession(existingSession);
  }
}
