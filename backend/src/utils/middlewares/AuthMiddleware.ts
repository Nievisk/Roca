import { NestMiddleware, Injectable, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { JwtService } from "src/services/jwt.service";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async use(req: any, res: Response, next: NextFunction) {
        const accessToken = req.cookies["accessToken"];
        if (!accessToken) return next(new UnauthorizedException("Denied. Missing token"));
        try {
            const { sub, iat } = this.jwtService.checkToken(accessToken);
            const user = await this.prisma.user.findUnique({ where: { id: sub } });

            if (!user) return next("Coudn't identify source of the connection");
            
            if (user.lastLogout && iat / 1000 > user.lastLogout.valueOf())
                return next("The session has finished")

            req.user = { id: sub };
            return next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) return next(error);
        }
    }
}