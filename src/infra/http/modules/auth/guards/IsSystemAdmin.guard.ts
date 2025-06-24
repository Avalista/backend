import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { EvaluatorPayload } from 'src/modules/auth/models/EvaluatorPayload';

@Injectable()
export class IsSystemAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const evaluator = request.user as EvaluatorPayload;

    if (!evaluator.isSystemAdmin)
      throw new ForbiddenException(
        'Permission denied. This action is restricted to system admins.',
      );

    return true;
  }
}
