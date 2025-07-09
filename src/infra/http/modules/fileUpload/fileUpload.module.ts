import { Module } from '@nestjs/common';
import { S3Module } from 'src/infra/aws/s3.module';
import { FileUploadController } from './fileUpload.controler';
import { UploadFileUseCase } from 'src/modules/fileUpload/useCases/uploadFileUseCase';

@Module({
  imports: [S3Module],
  controllers: [FileUploadController],
  providers: [UploadFileUseCase],
})
export class FileUploadModule {}
