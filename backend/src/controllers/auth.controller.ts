import { Body, Controller, Delete, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "src/services/auth.service";
import { User } from "src/utils/decorators/user";
import { LoginContent } from "src/utils/dtos/LoginContent";
import { RegisterContent } from "src/utils/dtos/RegisterContent";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Res() res: Response, @Body() dto: RegisterContent) {
        const accessToken = await this.authService.register(dto);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 12 * 60 * 60 * 1000
        })
        res.json({ message: "Ok" })
    }

    @Post("login")
    async login(@Res() res: Response, @Body() dto: LoginContent) {
        const accessToken = await this.authService.login(dto);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 12 * 60 * 60 * 1000
        })
        res.json({ message: "Ok" })

    }

    @Post("logout")
    async logout(@Res() res: Response, @User("id") id: string) {
        await this.authService.logout(id);
        res.clearCookie("accessToken")
        res.json({ message: "Ok" })
    }

    @Delete()
    async delete(@Res() res: Response, @User("id") id: string) {
        await this.authService.delete(id);
        res.clearCookie("accessToken")
        res.json({ message: "Ok" })
    }
}