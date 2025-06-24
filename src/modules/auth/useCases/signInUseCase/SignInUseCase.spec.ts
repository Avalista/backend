import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from './SignInUseCase';
import { makeEvaluator } from 'src/modules/evaluator/factories/EvaluatorFactory';
import { EvaluatorPayload } from '../../models/EvaluatorPayload';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sig In', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Should be able to create valid access_token', () => {
    const evaluator = makeEvaluator({});

    const token = signInUseCase.execute({ evaluator });

    const payload: EvaluatorPayload = jwtService.decode(token);

    expect(payload.sub).toEqual(evaluator.id);
  });
});
