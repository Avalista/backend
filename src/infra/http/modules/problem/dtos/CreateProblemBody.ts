import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Effort, EffortEnum } from 'src/enums/Effort';
import { Severity, SeverityEnum } from 'src/enums/Severity';

export class CreateProblemBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID da tela associada' })
  screenId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID da heurística associada' })
  heuristicId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Descrição do problema' })
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'Capturas de tela relacionadas', type: [String] })
  screenshots: string[];

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
  @ApiProperty({ description: 'Indica se o problema é prioritário' })
  priority: boolean;
}
