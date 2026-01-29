import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  activity_type: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  max_participants: number;

  @IsDateString()
  @IsNotEmpty()
  activity_date: string;

  @IsString()
  @IsNotEmpty()
  location: string;
} 