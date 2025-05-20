import { Module } from '@nestjs/common';
import { CategoryController } from './Category.controller';
import { CreateCategoryUseCase } from 'src/modules/category/useCases/createCategoryUseCase/CreateCategoryUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';
import { EditCategoryUseCase } from 'src/modules/category/useCases/editCategoryUseCase/EditCategoryUseCase';
import { DeleteCategoryUseCase } from 'src/modules/category/useCases/deleteCategoryUseCase/DeleteCategoryUseCase';
import { GetManyCategoryUseCase } from 'src/modules/category/useCases/getManyCategoryUseCase/GetManyCategoryUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    CreateCategoryUseCase,
    EditCategoryUseCase,
    DeleteCategoryUseCase,
    GetManyCategoryUseCase,
  ],
})
export class CategoryModule {}
