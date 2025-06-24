import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from './SignInUseCase';
import { makeEvaluator } from 'src/modules/evaluator/factories/EvaluatorFactory';
import { EvaluatorPayload } from '../../models/EvaluatorPayload';

let sigInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sig In', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    sigInUseCase = new SignInUseCase(jwtService);
  });

  it('Should be able to create valid access_token', () => {
    const evaluator = makeEvaluator({});

    const token = sigInUseCase.execute({ evaluator });

    const payload: EvaluatorPayload = jwtService.decode(token);

    expect(payload.sub).toEqual(evaluator.id);
  });
});
