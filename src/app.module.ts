import { Module } from '@nestjs/common';
import { CategoryModule } from './infra/http/modules/category/Category.module';
import { DatabaseModule } from './infra/database/database.module';
import { EvaluatorModule } from './infra/http/modules/evaluator/Evaluator.module';
import { ProjectModule } from './infra/http/modules/Project/Project.module';
import { ScreenModule } from './infra/http/modules/screen/Screen.module';
import { AuthModule } from './infra/http/modules/auth/Auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/JwtAuth.guard';
import { EvaluationSessionModule } from './infra/http/modules/evaluationSession/EvaluationSession.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CategoryModule,
    EvaluatorModule,
    ProjectModule,
    ScreenModule,
    EvaluationSessionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
