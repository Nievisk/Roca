import { IsBoolean, IsOptional, IsString, Matches } from "class-validator"

export class AuthContent {
    @IsOptional()
    @IsBoolean()
    admin?: boolean;

    @IsString()
    @Matches(/^[a-zA-Z0-9]{3,15}$/, { message: "Username can only contain uppercase/lowercase letters and numbers" })
    username: string;

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[&%$#@<>?=+]).{8,16}$/, {
        message: 'Password must be 8-16 chars, with upper/lowercase, numbers and symbols: & % $ # @ ? = +'
    })
    password: string;
}