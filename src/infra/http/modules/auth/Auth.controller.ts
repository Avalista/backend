import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRequestModel } from './models/authRequestModel';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/SignInUseCase';
import { LocalAuthGuard } from './guards/LocalAuth.guard';
import { Public } from './decorators/IsPublic';

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  signIn(@Request() request: AuthRequestModel) {
    const access_token = this.signInUseCase.execute({
      evaluator: request.user,
    });

    return { access_token };
  }
}
