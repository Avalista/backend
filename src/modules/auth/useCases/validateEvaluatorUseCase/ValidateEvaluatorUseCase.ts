import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { EvaluatorRepository } from 'src/modules/evaluator/repositories/EvaluatorRepository';

interface ValidateEvaluatorRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateEvaluatorUseCase {
  constructor(private evaluatorRepository: EvaluatorRepository) {}

  async execute({ email, password }: ValidateEvaluatorRequest) {
    const evaluator = await this.evaluatorRepository.findByEmail(email);

    if (!evaluator)
      throw new UnauthorizedException('Email ou senha incorretos');

    const isPasswordMatched = await compare(password, evaluator.password);

    if (!isPasswordMatched)
      throw new UnauthorizedException('Email ou senha incorretos');

    return evaluator;
  }
}
