import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-puiblication.dto';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {}