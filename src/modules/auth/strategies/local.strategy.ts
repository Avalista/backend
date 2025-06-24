import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidateEvaluatorUseCase } from '../useCases/validateEvaluatorUseCase/ValidateEvaluatorUseCase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateEvaluatorUseCase: ValidateEvaluatorUseCase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return await this.validateEvaluatorUseCase.execute({ email, password });
  }
}
