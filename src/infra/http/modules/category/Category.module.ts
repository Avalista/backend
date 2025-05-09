import { Module } from '@nestjs/common';
import { CategoryController } from './Category.controller';
import { CreateCategoryUseCase } from 'src/modules/category/useCases/createCategoryUseCase/CreateCategoryUseCase';

@Module({
  controllers: [CategoryController],
  providers: [CreateCategoryUseCase],
})
export class CategoryModule {}
