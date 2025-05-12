import { Module } from '@nestjs/common';
import { CategoryController } from './Category.controller';
import { CreateCategoryUseCase } from 'src/modules/category/useCases/createCategoryUseCase/CreateCategoryUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CreateCategoryUseCase],
})
export class CategoryModule {}
