import { Module } from '@nestjs/common';
import { CategoryModule } from './infra/http/modules/category/Category.module';
import { DatabaseModule } from './infra/database/database.module';
import { EvaluatorModule } from './infra/http/modules/evaluator/Evaluator.module';

@Module({
  imports: [DatabaseModule, CategoryModule, EvaluatorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
