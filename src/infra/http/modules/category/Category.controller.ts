import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/modules/category/useCases/createCategoryUseCase/CreateCategoryUseCase';
import { CreateCategoryBody } from './dtos/CreateCategoryBody';
import { CategoryViewModel } from './viewModel/CategoryViewModel';

@Controller('categories/')
export class CategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  async createCategory(@Body() body: CreateCategoryBody) {
    const { name, color } = body;

    const category = await this.createCategoryUseCase.execute({ name, color });

    return CategoryViewModel.toHttp(category);
  }
}
