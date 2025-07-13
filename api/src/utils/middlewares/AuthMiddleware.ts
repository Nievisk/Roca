import { NestMiddleware, Injectable, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { JwtService } from "src/services/jwt.service";
import { PrismaService } from "src/services/prisma.service";
import { JwtContent } from "../interfaces/JwtContent";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async use(req: any, res: Response, next: NextFunction) {
        const accessToken = req.cookies["accessToken"];
        if (!accessToken) return next(new UnauthorizedException("Missing access cookie"));
        try {
            const { sub, iat } = this.jwtService.checkToken(accessToken) as JwtContent;
            const user = await this.prisma.user.findUnique({ where: { id: sub } });

            if (!user) return next("User not found");
            
            if (user.lastLogout && iat / 1000 > user.lastLogout.valueOf())
                return next("Unauthorized access token")

            req.user = { id: sub };
            return next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) return next(error);
        }
    }
}