import { Injectable } from '@nestjs/common';
import { Evaluator } from 'src/modules/evaluator/entities/Evaluator';
import { EvaluatorPayload } from '../../models/EvaluatorPayload';
import { JwtService } from '@nestjs/jwt';

interface SignInRequest {
  evaluator: Evaluator;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  execute({ evaluator }: SignInRequest) {
    const payload: EvaluatorPayload = {
      sub: evaluator.id,
      email: evaluator.email,
      name: evaluator.name,
      isSystemAdmin: evaluator.isSystemAdmin,
    };

    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }
}
