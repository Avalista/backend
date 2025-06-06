import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryRepository } from 'src/modules/category/repositories/CategoryRepository';
import { PrismaCategoryRepository } from './prisma/repositories/PrismaCategoryRepository';
import { EvaluatorRepository } from 'src/modules/evaluator/repositories/EvaluatorRepository';
import { PrismaEvaluatorRepository } from './prisma/repositories/PrismaEvaluatorRepository';

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
  ],
  exports: [CategoryRepository, EvaluatorRepository],
})
export class DatabaseModule {}
