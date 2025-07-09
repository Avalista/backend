import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from 'src/modules/fileUpload/useCases/uploadFileUseCase';
import { fileValidators } from './dtos/fileValidators';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly uploadFileUseCase: UploadFileUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: fileValidators,
      }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ): Promise<{ url: string }> {
    const fileUrl = await this.uploadFileUseCase.execute(file);
    return { url: fileUrl };
  }
}
