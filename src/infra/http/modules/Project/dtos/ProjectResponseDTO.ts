import { ApiProperty } from '@nestjs/swagger';
import { ProjectMembershipResponse } from '../../projectMembership/dtos/projectMembershipResponse';
import { ScreenResponseDTO } from '../../screen/dtos/ScreenResponseDTO';
import { SessionResponse } from '../../session/dtos/SessionResponse';
import { FinalEvaluationResponse } from '../../finalEvaluation/dtos/finalEvaluationResponse';

export class ProjectResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [ProjectMembershipResponse] })
  memberships: ProjectMembershipResponse[];

  @ApiProperty({ type: [ScreenResponseDTO] })
  screens: ScreenResponseDTO[];

  @ApiProperty({ type: [SessionResponse] })
  sessions: SessionResponse[];

  @ApiProperty({ type: FinalEvaluationResponse, nullable: true })
  finalEvaluation: FinalEvaluationResponse | null;
}
