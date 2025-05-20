import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/modules/category/useCases/createCategoryUseCase/CreateCategoryUseCase';
import { CreateCategoryBody } from './dtos/CreateCategoryBody';
import { CategoryViewModel } from './viewModel/CategoryViewModel';
import { EditCategoryUseCase } from 'src/modules/category/useCases/editCategoryUseCase/EditCategoryUseCase';
import { EditCategoryBody } from './dtos/EditCategoryBody';
import { DeleteCategoryUseCase } from 'src/modules/category/useCases/deleteCategoryUseCase/DeleteCategoryUseCase';
import { GetManyCategoryUseCase } from 'src/modules/category/useCases/getManyCategoryUseCase/GetManyCategoryUseCase';

@Controller('categories')
export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private editCategoryUseCase: EditCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private getManyCategoryUseCase: GetManyCategoryUseCase,
  ) {}

  //REPASSAR AQUI VALINDO QUAIS USUARIOS PODEM REQUISITAR ESSE ENDPOINTS

  @Post()
  async createCategory(@Body() body: CreateCategoryBody) {
    const { name, color } = body;

    const category = await this.createCategoryUseCase.execute({ name, color });

    return CategoryViewModel.toHttp(category);
  }

  @Put(':id')
  async editCategory(
    @Param('id') categoryId: string,
    @Body() body: EditCategoryBody,
  ) {
    const { name, color } = body;
    const mockUserId = '0';

    await this.editCategoryUseCase.execute({
      categoryId,
      name,
      color,
      userId: mockUserId,
    });
  }

  @Delete(':id')
  async deletCategory(@Param('id') categoryId: string) {
    const mockUserId = '0';
    await this.deleteCategoryUseCase.execute({
      categoryId,
      userId: mockUserId,
    });
  }

  @Get()
  async getManyCategory(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const categories = await this.getManyCategoryUseCase.execute({
      page,
      perPage,
    });

    return categories.map((category) => CategoryViewModel.toHttp(category));
  }
}
