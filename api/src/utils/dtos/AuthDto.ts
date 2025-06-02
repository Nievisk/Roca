import { IsString, Matches } from "class-validator"

export class AuthDto {
    @IsString()
    @Matches(/^[a-zA-Z0-9]{3,15}$/)
    username: string;

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[&%$#@\?\=\+]){8,16}$/)
    password: string;
}