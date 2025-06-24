import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';
import { IsSystemAdminGuard } from '../guards/IsSytemAdmin.guard';

export function SystemAdminOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard, IsSystemAdminGuard));
}
