import { Body, Controller, Post } from '@nestjs/common';
import { CreateScreenBody } from './dtos/CreateScreenBody';
import { CreateScreenUseCase } from 'src/modules/screen/useCases/createScreenUseCase/CreateScreenUseCase';
import { ScreenViewModel } from './viewModel/ScreenViewModel';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateScreenResponse } from './dtos/CreateScreenResponse';

@ApiTags('screens')
@ApiBearerAuth()
@Controller('screens')
export class ScreenController {
  constructor(private createScreenUseCase: CreateScreenUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: CreateScreenBody })
  @ApiResponse({ status: 201, type: CreateScreenResponse })
  async createScreen(@Body() body: CreateScreenBody) {
    const { title, description, screenshot, projectId } = body;

    const screen = await this.createScreenUseCase.execute({
      title,
      description,
      screenshot,
      projectId,
    });

    return ScreenViewModel.toHttp(screen);
  }
}
