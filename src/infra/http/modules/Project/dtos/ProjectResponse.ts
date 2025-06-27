import { ApiProperty } from '@nestjs/swagger';
import { ProjectMembershipResponse } from '../../projectMembership/dtos/projectMembershipResponse';
import { ScreenResponse } from '../../screen/dtos/ScreenResponse';
import { SessionResponse } from '../../session/dtos/SessionResponse';
import { FinalEvaluationResponse } from '../../finalEvaluation/dtos/finalEvaluationResponse';

export class ProjectResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [ProjectMembershipResponse] })
  memberships: ProjectMembershipResponse[];

  @ApiProperty({ type: [ScreenResponse] })
  screens: ScreenResponse[];

  @ApiProperty({ type: [SessionResponse] })
  sessions: SessionResponse[];

  @ApiProperty({ type: FinalEvaluationResponse, nullable: true })
  finalEvaluation: FinalEvaluationResponse | null;
}
