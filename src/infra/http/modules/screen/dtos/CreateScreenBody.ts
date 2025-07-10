import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateScreenBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Screen title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Screen description' })
  description: string;

  @ApiProperty({
    description: 'Screenshot of the screen',
    type: 'string',
    format: 'binary',
  })
  screenshot: Express.Multer.File;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'Screen project id' })
  projectId: string;
}
