import { ApiProperty } from '@nestjs/swagger';

export class SessionResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  startedAt: string;

  @ApiProperty()
  finishedAt: string;

  @ApiProperty()
  status: string;
}
