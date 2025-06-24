import { ConflictException, Injectable } from '@nestjs/common';
import { EvaluatorRepository } from '../../repositories/EvaluatorRepository';
import { Evaluator } from '../../entities/Evaluator';
import { hash } from 'bcrypt';

interface CreateEvaluatorRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

@Injectable()
export class CreateEvaluatorUseCase {
  constructor(private evaluatorRepository: EvaluatorRepository) {}

  async execute({ email, name, password, avatar }: CreateEvaluatorRequest) {
    const alreadyExistEvaluator =
      await this.evaluatorRepository.findByEmail(email);

    if (alreadyExistEvaluator)
      throw new ConflictException('Email already registered');

    const evaluator = new Evaluator({
      email,
      name,
      password: await hash(password, 10),
      avatar,
    });

    await this.evaluatorRepository.create(evaluator);

    return evaluator;
  }
}
