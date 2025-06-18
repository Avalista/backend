import { Body, Controller, Post } from '@nestjs/common';
import { CreateScreenBody } from './dtos/CreateScreenBody';
import { CreateScreenUseCase } from 'src/modules/screen/useCases/createScreenUseCase/CreateScreenUseCase';
import { ScreenViewModel } from './viewModel/ScreenViewModel';

@Controller('screens')
export class ScreenController {
  constructor(private createScreenUseCase: CreateScreenUseCase) {}

  @Post()
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
