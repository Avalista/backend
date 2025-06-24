import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateEvaluatorUseCase } from 'src/modules/auth/useCases/validateEvaluatorUseCase/ValidateEvaluatorUseCase';
import { EvaluatorModule } from '../evaluator/Evaluator.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignInDTOValidateMiddleware } from './middleware/SignInDTOValidate.middleware';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/SignInUseCase';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    EvaluatorModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    ValidateEvaluatorUseCase,
    SignInUseCase,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('signIn');
  }
}
