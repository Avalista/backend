import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region:
        this.configService.get<string>('AWS_REGION') ||
        (() => {
          throw new Error('AWS_REGION is not defined');
        })(),
      credentials: {
        accessKeyId:
          this.configService.get<string>('AWS_ACCESS_KEY_ID') ||
          (() => {
            throw new Error('AWS_ACCESS_KEY_ID is not defined');
          })(),
        secretAccessKey:
          this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ||
          (() => {
            throw new Error('AWS_SECRET_ACCESS_KEY is not defined');
          })(),
      },
    });
    this.bucket =
      this.configService.get<string>('AWS_S3_BUCKET') ||
      (() => {
        throw new Error('AWS_S3_BUCKET is not defined');
      })();
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: this.bucket,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: ObjectCannedACL.public_read,
    };

    try {
      await this.s3.send(new PutObjectCommand(params));
      return `https://${this.bucket}.s3.amazonaws.com/${fileKey}`;
    } catch (error) {
      throw new Error(`Erro ao enviar arquivo para o S3 ${error}`);
    }
  }
}
