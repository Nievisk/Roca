import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "src/services/jwt.service";
import { Request } from "express";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const request = ctx.switchToHttp().getRequest<Request>();
        const accessToken = request.cookies["accessToken"];

        if (!accessToken) throw new ForbiddenException("Missing access token");

        const decode = this.jwtService.checkToken(accessToken);

        if (decode.role !== "admin") throw new ForbiddenException("Denied access attempt");

        const user = await this.prisma.user.findUnique({ where: { id: decode.sub } });

        if (!user) throw new ForbiddenException("Denied access attempt");

        if (user.lastLogout && decode.iat / 1000 > user.lastLogout.valueOf()) throw new ForbiddenException("Expired connection");


        else return true
    }
}