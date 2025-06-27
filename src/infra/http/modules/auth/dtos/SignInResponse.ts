import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({
    description: 'Token de acesso gerado após o login',
    example: 'your-jwt-token-here',
  })
  access_token: string;
}
