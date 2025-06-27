import { ApiProperty } from '@nestjs/swagger';

export class ScreenResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  screenshot: string;
}
