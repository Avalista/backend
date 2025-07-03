import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

class CategoryDTO {
  @ApiProperty({ description: 'ID da categoria' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome da categoria' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Cor da categoria' })
  @IsString()
  color: string;

  @ApiProperty({ description: 'Heurística associada', nullable: true })
  heuristic: HeuristicDTO | null;
}

class ProblemDTO {
  @ApiProperty({ description: 'ID do problema' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Descrição do problema' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Screenshot do problema' })
  @IsString()
  screenshot: string;

  @ApiProperty({
    description: 'Sugestões de melhoria',
    type: [String],
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  improvementSuggestions: string[];

  @ApiProperty({ description: 'Nível de severidade do problema' })
  @IsEnum(['Low', 'Medium', 'High'])
  severity: string;

  @ApiProperty({ description: 'Esforço necessário', nullable: true })
  @IsOptional()
  @IsString()
  effort: string;

  @ApiProperty({
    description: 'Data em que o problema foi resolvido',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  resolvedAt: string | null;

  @ApiProperty({ description: 'Prioridade do problema' })
  @IsString()
  priority: string;
}

class HeuristicDTO {
  @ApiProperty({ description: 'ID da heurística' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome da heurística' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Código da heurística' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Lista de problemas', type: [ProblemDTO] })
  @IsArray()
  problems: ProblemDTO[];
}

class ScreenDTO {
  @ApiProperty({ description: 'ID da tela' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Título da tela' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descrição da tela' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Screenshot da tela' })
  @IsString()
  screenshot: string;

  @ApiProperty({ description: 'Categoria da tela', nullable: true })
  @IsOptional()
  category: CategoryDTO | null;
}

class EvaluationItemDTO {
  @ApiProperty({ description: 'ID do item de avaliação' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Status do item de avaliação' })
  @IsEnum(['NOT_REVIEWED', 'REVIEWED', 'IN_PROGRESS'])
  status: string;

  @ApiProperty({
    description: 'Data em que o item foi revisado',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  reviewedAt: string | null;

  @ApiProperty({ description: 'Informações sobre a tela associada' })
  screen: ScreenDTO;
}

export class EvaluationSessionDTO {
  @ApiProperty({ description: 'ID da sessão de avaliação' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Data de início da sessão de avaliação' })
  @IsDateString()
  startedAt: string;

  @ApiProperty({
    description: 'Data de término da sessão de avaliação',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  finishedAt: string | null;

  @ApiProperty({ description: 'Status da sessão de avaliação' })
  @IsEnum(['IN_PROGRESS', 'COMPLETED', 'PENDING'])
  status: string;

  @ApiProperty({
    description: 'Itens de avaliação associados',
    type: [EvaluationItemDTO],
  })
  @IsArray()
  evaluationItems: EvaluationItemDTO[];
}

export class EvaluatorDTO {
  @ApiProperty({ description: 'ID do avaliador' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do avaliador' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email do avaliador' })
  @IsString()
  email: string;
}

export class ProjectDTO {
  @ApiProperty({ description: 'ID do projeto' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do projeto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descrição do projeto' })
  @IsString()
  description: string;
}

export class EvaluationSessionViewModelDTO {
  @ApiProperty({ description: 'Detalhes do projeto' })
  project: ProjectDTO;

  @ApiProperty({ description: 'Detalhes do avaliador' })
  evaluator: EvaluatorDTO;

  @ApiProperty({ description: 'Detalhes da sessão de avaliação' })
  evaluationSession: EvaluationSessionDTO;
}
