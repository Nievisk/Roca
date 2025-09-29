import { IsBoolean, IsOptional, IsString, Matches } from "class-validator"

export class RegisterContent {
    @IsOptional()
    @IsBoolean()
    admin?: boolean;

    @IsString()
    @Matches(/^(?=.*\d)(?=.*[a-zA-z]).{3,15}$/, { message: "Username can only contain uppercase/lowercase letters and numbers" })
    username: string;

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[&%$#@<>?=():;?*!+]).{8,16}$/, {
        message: 'Password must be 8-16 chars, with upper/lowercase, numbers and symbols: & % $ # @ ? = +'
    })
    password: string;
}