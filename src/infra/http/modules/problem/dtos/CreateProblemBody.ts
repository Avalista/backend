import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { Effort, EffortEnum } from 'src/enums/Effort';
import { Severity, SeverityEnum } from 'src/enums/Severity';

export class CreateProblemBody {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'ID da tela associada' })
  screenId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'ID da heurística associada' })
  heuristicId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Descrição do problema' })
  description: string;

  @ApiProperty({
    description: 'Screenshots of the screen',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  screenshots: Express.Multer.File[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Sugestões de melhoria' })
  improvementSuggestions: string;

  @IsEnum(SeverityEnum)
  @ApiProperty({ description: 'Severidade do problema', enum: SeverityEnum })
  severity: Severity;

  @IsEnum(EffortEnum)
  @ApiProperty({
    description: 'Esforço necessário para resolver',
    enum: EffortEnum,
  })
  effort: Effort;

  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value === true;
  })
  @ApiProperty({
    description: 'Indica se o problema é prioritário',
    type: 'boolean',
  })
  priority: boolean;
}
