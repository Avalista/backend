import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCategoryBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^#([0-9A-Fa-f]{6})$/, {
    message: 'color must be a valid hex code in the format #RRGGBB',
  })
  color: string;
}
