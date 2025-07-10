import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateScreenBody } from './dtos/CreateScreenBody';
import { CreateScreenUseCase } from 'src/modules/screen/useCases/createScreenUseCase/CreateScreenUseCase';
import { ScreenViewModel } from './viewModel/ScreenViewModel';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateScreenResponse } from './dtos/CreateScreenResponse';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileValidators } from '../fileUpload/dtos/fileValidators';

@ApiTags('screens')
@ApiBearerAuth()
@Controller('screens')
export class ScreenController {
  constructor(private createScreenUseCase: CreateScreenUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateScreenBody })
  @ApiResponse({ status: 201, type: CreateScreenResponse })
  @UseInterceptors(FileInterceptor('screenshot'))
  async createScreen(
    @UploadedFile(
      new ParseFilePipe({
        validators: fileValidators,
      }),
    )
    screenshot: Express.Multer.File,
    @Body() body: CreateScreenBody,
  ) {
    const { title, description, projectId } = body;

    const screen = await this.createScreenUseCase.execute({
      title,
      description,
      screenshot,
      projectId,
    });

    return ScreenViewModel.toHttp(screen);
  }
}
