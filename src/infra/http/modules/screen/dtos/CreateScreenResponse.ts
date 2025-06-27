import { ApiProperty } from '@nestjs/swagger';

export class CreateScreenResponse {
  @ApiProperty({ description: 'Screen id' })
  id: string;

  @ApiProperty({ description: 'Screen title' })
  title: string;

  @ApiProperty({ description: 'Screen description' })
  description: string;

  @ApiProperty({ description: 'Screen screenshot' })
  screenshot: string;

  @ApiProperty({ description: 'Screen project id' })
  projectId: string;
}
