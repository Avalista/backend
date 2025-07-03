import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryRepository } from 'src/modules/category/repositories/CategoryRepository';
import { PrismaCategoryRepository } from './prisma/repositories/PrismaCategoryRepository';
import { EvaluatorRepository } from 'src/modules/evaluator/repositories/EvaluatorRepository';
import { PrismaEvaluatorRepository } from './prisma/repositories/PrismaEvaluatorRepository';
import { ProjectRepository } from 'src/modules/project/repositories/ProjectRepository';
import { ProjectMembershipRepository } from 'src/modules/projectMembership/repositories/ProjectMembershipRepository';
import { PrismaProjectRepository } from './prisma/repositories/PrismaProjectRepository';
import { PrismaProjectMembershipRepository } from './prisma/repositories/PrismaProjectMembershipRepository';
import { ScreenRepository } from 'src/modules/screen/repositories/ScreenRepository';
import { PrismaScreenRepository } from './prisma/repositories/PrismaScreenRepository';
import { HeuristicRepository } from 'src/modules/heuristic/repositories/HeuristicRepository';
import { PrismaHeuristicRepository } from './prisma/repositories/PrismaHeuristicRepository';
import { EvaluationItemRepository } from 'src/modules/evaluation/repositories/EvaluationItemRepository';
import { PrismaEvaluationItemRepository } from './prisma/repositories/PrismaEvaluationItemRepository';
import { EvaluationSessionRepository } from 'src/modules/evaluationSession/repositories/EvaluationSessionRepository';
import { PrismaEvaluationSessionRepository } from './prisma/repositories/PrismaEvaluationSessionRepository';
import { ProblemRepository } from 'src/modules/problem/repositories/ProblemRepository';
import { PrismaProblemRepository } from './prisma/repositories/PrismaProblemRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: EvaluatorRepository,
      useClass: PrismaEvaluatorRepository,
    },
    {
      provide: ProjectRepository,
      useClass: PrismaProjectRepository,
    },
    {
      provide: ProjectMembershipRepository,
      useClass: PrismaProjectMembershipRepository,
    },
    {
      provide: ScreenRepository,
      useClass: PrismaScreenRepository,
    },
    {
      provide: HeuristicRepository,
      useClass: PrismaHeuristicRepository,
    },
    {
      provide: EvaluationItemRepository,
      useClass: PrismaEvaluationItemRepository,
    },
    {
      provide: EvaluationSessionRepository,
      useClass: PrismaEvaluationSessionRepository,
    },
    {
      provide: ProblemRepository,
      useClass: PrismaProblemRepository,
    },
  ],
  exports: [
    CategoryRepository,
    EvaluatorRepository,
    ProjectRepository,
    ProjectMembershipRepository,
    ScreenRepository,
    HeuristicRepository,
    EvaluationItemRepository,
    EvaluationSessionRepository,
    ProblemRepository,
  ],
})
export class DatabaseModule {}
