import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "src/services/auth.service";
import { User } from "src/utils/decorators/user";
import { AuthDto } from "src/utils/dtos/AuthDto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Res() res: Response, @Body() dto: AuthDto) {
        const accessToken = await this.authService.register(dto);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 12 * 60 * 60 * 1000
        })
    }

    @Post("login")
    async login(@Res() res: Response, @Body() dto: AuthDto) {
        const accessToken = await this.authService.login(dto);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 12 * 60 * 60 * 1000
        })
    }

    @Post("logout") 
    async logout(@Res() res: Response, @User("id") id: string) {
        await this.authService.logout(id);
        res.clearCookie("accessToken")
    }
}