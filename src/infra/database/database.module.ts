import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryRepository } from 'src/modules/category/repositories/CategoryRepository';
import { PrismaCategoryRepository } from './prisma/repositories/PrismaCategoryRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [CategoryRepository],
})
export class DatabaseModule {}
