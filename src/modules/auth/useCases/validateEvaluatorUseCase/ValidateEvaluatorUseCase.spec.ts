import { makeEvaluator } from 'src/modules/evaluator/factories/EvaluatorFactory';
import { ValidateEvaluatorUseCase } from './ValidateEvaluatorUseCase';
import { EvaluatorRepositoryInMemory } from 'src/modules/evaluator/repositories/EvaluatorRepositoryInMemory';
import { hash } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

let validateEvaluatorUseCase: ValidateEvaluatorUseCase;
let evaluatorRepositoryInMemory: EvaluatorRepositoryInMemory;

describe('Valide Evaluator', () => {
  beforeEach(() => {
    evaluatorRepositoryInMemory = new EvaluatorRepositoryInMemory();
    validateEvaluatorUseCase = new ValidateEvaluatorUseCase(
      evaluatorRepositoryInMemory,
    );
  });

  it('Should be able to return evaluator when credentials are correct', async () => {
    const evaluatorPassowordWithoutEncryption = '123123';

    const evaluator = makeEvaluator({
      password: await hash(evaluatorPassowordWithoutEncryption, 10),
    });

    await evaluatorRepositoryInMemory.create(evaluator);

    const result = await validateEvaluatorUseCase.execute({
      email: evaluator.email,
      password: evaluatorPassowordWithoutEncryption,
    });

    expect(result).toEqual(evaluator);
  });

  it('Should be able to throw error when the credentials are incorrect', async () => {
    const evaluatorPassowordWithoutEncryption = '123123';

    const evaluator = makeEvaluator({
      password: await hash(evaluatorPassowordWithoutEncryption, 10),
    });

    await evaluatorRepositoryInMemory.create(evaluator);

    await expect(
      validateEvaluatorUseCase.execute({
        email: 'incorrect@email.com',
        password: evaluatorPassowordWithoutEncryption,
      }),
    ).rejects.toThrow(UnauthorizedException);

    await expect(
      validateEvaluatorUseCase.execute({
        email: evaluator.email,
        password: 'incorrectPassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
