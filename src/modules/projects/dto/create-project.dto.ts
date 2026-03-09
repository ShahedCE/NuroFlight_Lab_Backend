import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';

export enum ProjectStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
}

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  slug: string;
}