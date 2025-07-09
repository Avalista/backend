import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ScreenController } from './Screen.controller';
import { CreateScreenUseCase } from 'src/modules/screen/useCases/createScreenUseCase/CreateScreenUseCase';
import { S3Module } from 'src/infra/aws/s3.module';

@Module({
  imports: [DatabaseModule, S3Module],
  controllers: [ScreenController],
  providers: [CreateScreenUseCase],
})
export class ScreenModule {}
