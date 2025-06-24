import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EvaluatorPayload } from '../models/EvaluatorPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt_secret,
    });
  }

  validate({ sub, ...payload }: EvaluatorPayload) {
    return { id: sub, ...payload };
  }
}
