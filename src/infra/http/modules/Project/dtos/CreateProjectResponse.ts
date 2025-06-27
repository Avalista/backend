import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectResponse {
  @ApiProperty({
    description: 'ID do projeto',
    example: '39c992dd-1111-1111-9568-e8803d511111',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do projeto',
    example: 'New Project',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição do projeto',
    example: 'Um projeto de exemplo',
  })
  description: string;
}
