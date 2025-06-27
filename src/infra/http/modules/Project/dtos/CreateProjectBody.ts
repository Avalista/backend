import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Project name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Project description' })
  description: string;
}
