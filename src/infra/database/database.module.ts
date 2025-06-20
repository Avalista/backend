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
  ],
  exports: [
    CategoryRepository,
    EvaluatorRepository,
    ProjectRepository,
    ProjectMembershipRepository,
    ScreenRepository,
  ],
})
export class DatabaseModule {}
