import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ScreenController } from './Screen.controller';
import { CreateScreenUseCase } from 'src/modules/screen/useCases/createScreenUseCase/CreateScreenUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [ScreenController],
  providers: [CreateScreenUseCase],
})
export class ScreenModule {}
