import { IsString, Matches } from "class-validator"

export class LoginContent {
    @IsString()
    @Matches(/^(?=.*\d)(?=.*[a-zA-z]).{3,15}$/, { message: "Incorrect email or password" })
    username: string;

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[&%$#@<>?=():;?*!+]).{8,16}$/, {
        message: 'Incorrect email or password'
    })
    password: string;
}