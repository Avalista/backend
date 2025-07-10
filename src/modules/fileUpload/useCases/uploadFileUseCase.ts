import { Injectable } from '@nestjs/common';
import { S3Service } from '../../../infra/aws/s3.service';

@Injectable()
export class UploadFileUseCase {
  constructor(private readonly s3Service: S3Service) {}

  async execute(file: Express.Multer.File): Promise<string> {
    return this.s3Service.uploadFile(file);
  }
}
