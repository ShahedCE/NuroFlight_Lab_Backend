import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { JobLevel } from '../../../common/enums/job-level.enum';
import { JobStatus } from '../../../common/enums/job-status.enum';
import { JobTeam } from '../../../common/enums/job-team.enum';
import { JobType } from '../../../common/enums/job-type.enum';

export class CreateJobPostDto {
  @IsString()
  @Length(3, 200)
  title: string;

  @IsEnum(JobTeam)
  team: JobTeam;

  @IsEnum(JobLevel)
  level: JobLevel;

  @IsEnum(JobType)
  type: JobType;

  @IsString()
  @Length(2, 150)
  location: string;

  @IsEnum(JobStatus)
  status: JobStatus;

  @IsString()
  @Length(10, 5000)
  summary: string;

  @Transform(({ value }) => {
    // form-data/json string দুটো handle করার জন্য
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  responsibilities: string[];

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  requirements: string[];

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  tags: string[];

  @IsDateString()
  postedAt: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;
}