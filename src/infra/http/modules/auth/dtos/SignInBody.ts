import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInBody {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
