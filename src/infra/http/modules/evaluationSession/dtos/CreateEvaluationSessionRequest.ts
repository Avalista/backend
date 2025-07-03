import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEvaluationSessionRequest {
  @ApiProperty({
    description: 'ID do projeto',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  projectId: string;
}
