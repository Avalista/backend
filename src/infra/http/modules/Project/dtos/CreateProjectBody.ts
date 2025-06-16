import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProjectBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  evaluatorId: string;
}
