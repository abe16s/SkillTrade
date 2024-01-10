/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AuthDto {
   
    @IsString()
    @IsNotEmpty()
    fullName: string;

    // @IsNumber()
    // @IsNotEmpty()
    phone: number;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
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
