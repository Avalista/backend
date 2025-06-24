import { compare } from 'bcrypt';
import { EvaluatorRepositoryInMemory } from '../../repositories/EvaluatorRepositoryInMemory';
import { CreateEvaluatorUseCase } from './CreateEvaluatorUseCase';
import { ConflictException } from '@nestjs/common';

let evaluatorRepositoryInMemory: EvaluatorRepositoryInMemory;
let createEvaluatorUseCase: CreateEvaluatorUseCase;

describe('Create Evaluator', () => {
  beforeEach(() => {
    evaluatorRepositoryInMemory = new EvaluatorRepositoryInMemory();
    createEvaluatorUseCase = new CreateEvaluatorUseCase(
      evaluatorRepositoryInMemory,
    );
  });

  it('Should be able to create evaluator', async () => {
    expect(evaluatorRepositoryInMemory.evaluators).toEqual([]);

    const evaluator = await createEvaluatorUseCase.execute({
      email: 'email@email.com',
      name: 'name',
      password: 'password',
    });

    expect(evaluatorRepositoryInMemory.evaluators).toEqual([evaluator]);
  });

  it('Should be able to create evaluator with password encrypted', async () => {
    const evaluatorPasswordWithoutEncryption = 'password';

    const evaluator = await createEvaluatorUseCase.execute({
      email: 'email@email.com',
      name: 'name',
      password: evaluatorPasswordWithoutEncryption,
    });

    const userHasPasswordEncrypted = await compare(
      evaluatorPasswordWithoutEncryption,
      evaluator.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });

  it('should throw ConflictException if email already exists', async () => {
    await createEvaluatorUseCase.execute({
      email: 'email@email.com',
      name: 'evaluator1',
      password: 'password',
    });

    await expect(
      createEvaluatorUseCase.execute({
        email: 'email@email.com',
        name: 'evaluator2',
        password: 'password2',
      }),
    ).rejects.toThrow(ConflictException);
  });
});
