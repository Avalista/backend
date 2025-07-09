import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
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

  @ApiProperty({
    description: 'Screenshot of the screen',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  screenshot: Express.Multer.File[];

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
