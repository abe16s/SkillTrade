/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class TechnicianDto {
  @IsString()
  @IsOptional()
  fullName: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  skills: string;

  @IsString()
  @IsOptional()
  experience: string;

  @IsString()
  @IsOptional()
  educationLevel: string;

  @IsString()
  @IsOptional()
  availableLocation: string;

  @IsString()
  @IsOptional()
  additionalBio: string;
}
