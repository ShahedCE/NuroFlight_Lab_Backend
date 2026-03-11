import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @Length(3, 220)
  slug: string;

  @IsString()
  @Length(3, 300)
  title: string;

  @IsString()
  @Length(3, 2000)
  authors: string;

  @IsString()
  @Length(2, 200)
  venue: string;

  @IsInt()
  @Min(1900)
  year: number;

  @IsString()
  @Length(10, 10000)
  abstract: string;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsUrl()
  paperUrl?: string;

  @IsOptional()
  @IsUrl()
  pdfUrl?: string;

  @IsOptional()
  @IsUrl()
  doiUrl?: string;

  @IsOptional()
  @IsUrl()
  codeUrl?: string;

  @IsOptional()
  @IsString()
  bibtex?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  relatedProjectSlugs?: string[];
}