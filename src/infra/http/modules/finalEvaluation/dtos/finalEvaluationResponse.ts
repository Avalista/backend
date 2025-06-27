import { ApiProperty } from '@nestjs/swagger';

export class FinalEvaluationResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;
}
