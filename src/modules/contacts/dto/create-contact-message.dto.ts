import { IsEmail, IsString, Length } from 'class-validator';

export class CreateContactMessageDto {
  @IsString()
  @Length(2, 150)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 200)
  subject: string;

  @IsString()
  @Length(10, 5000)
  message: string;
}