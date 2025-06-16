import { IsOptional, IsString } from 'class-validator';

export class GetMyProjectsQuery {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  orderBy?: 'name-asc' | 'name-desc';
}
