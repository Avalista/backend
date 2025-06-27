import { ApiProperty } from '@nestjs/swagger';

export class ProjectMembershipResponse {
  @ApiProperty()
  evaluatorId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  evaluator: { id: string; name: string };

  @ApiProperty()
  admin: boolean;

  @ApiProperty()
  joinedAt: string;
}
