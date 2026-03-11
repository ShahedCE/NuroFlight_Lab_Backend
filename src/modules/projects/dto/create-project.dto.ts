import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ProjectStatus } from '../../../common/enums/project-status.enum';

export class CreateProjectDto {
  @IsString()
  @Length(3, 200) 
  title: string;

  @IsString()
  @Length(10, 5000) // description reasonable length
  description: string;

  @IsEnum(ProjectStatus) // only ONGOING / COMPLETED 
  status: ProjectStatus;

  @IsOptional()
  @IsArray()
  @ArrayUnique() // avoid duplicate tag  
  @IsString({ each: true }) // every array item string 
  tags?: string[];

  @IsString()
  @Length(3, 220) // slug reasonable length
  slug: string;
}