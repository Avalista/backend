import { Module } from '@nestjs/common';
import { CategoryModule } from './infra/http/modules/category/Category.module';
import { DatabaseModule } from './infra/database/database.module';
import { EvaluatorModule } from './infra/http/modules/evaluator/Evaluator.module';
import { ProjectModule } from './infra/http/modules/Project/Project.module';
import { ScreenModule } from './infra/http/modules/screen/Screen.module';

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    EvaluatorModule,
    ProjectModule,
    ScreenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
