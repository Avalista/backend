import { ApiProperty } from '@nestjs/swagger';

export class ScreenResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  screenshot: string;
}
