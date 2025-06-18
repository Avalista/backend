import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateScreenBody {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  screenshot: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}
