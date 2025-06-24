import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';
import { IsSystemAdminGuard } from '../guards/IsSystemAdmin.guard';

export function SystemAdminOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard, IsSystemAdminGuard));
}
