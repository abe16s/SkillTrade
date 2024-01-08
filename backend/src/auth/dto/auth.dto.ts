/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
}