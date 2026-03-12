import {
  ArrayUnique, IsArray,IsEmail,IsEnum,IsInt,IsOptional,
   IsString,IsUrl,Length, Min,
} from 'class-validator';
import { TeamGroup } from '../../../common/enums/team-group.enum';
import { TeamTag } from '../../../common/enums/team-tag.enum';
import { Transform } from 'class-transformer';

export class CreateTeamMemberDto {
  @IsString()
  @Length(3, 220)
  slug: string;

  @IsString()
  @Length(2, 150)
  name: string;

  @IsString()
  @Length(2, 200)
  title: string;

  @IsOptional()
  @IsString()
  @Length(2, 255)
  primaryAffiliation?: string;

  @Transform(({value})=>{
    //if string comes from form-data, then convering to string[](array)
    if(typeof value === 'string'){
      return JSON.parse(value);
    }
    return value;
  })
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  bioLines: string[];

  @Transform(({value})=>{
    if(typeof value === 'string'){
      return JSON.parse(value);
    }
  })

  @Transform(({value})=>{
    //if string comes from form-data, then convering to string[](array)
    if(typeof value === 'string'){
      return JSON.parse(value);
    }
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  expertise?: string[];

  @Transform(({value})=>{
    //if string comes from form-data, then convering to string[](array)
    if(typeof value === 'string'){
      return JSON.parse(value);
    }
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsEnum(TeamTag, { each: true }) // array এর প্রতিটা value TeamTag enum হতে হবে
  tags?: TeamTag[];

  @IsEnum(TeamGroup)
  group: TeamGroup;

  @IsOptional()
  @IsInt()
  @Min(1)
  priority?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @IsOptional()
  @IsUrl()
  github?: string;

  @IsOptional()
  @IsUrl()
  scholar?: string;
}