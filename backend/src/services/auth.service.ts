import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AuthContent } from "src/utils/interfaces/AuthContent";
import { HashService } from "./hash.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private hash: HashService,
        private jwt: JwtService
    ) { }

    async register(data: AuthContent) {
        const user = await this.prisma.user.findUnique({
            where: { username: data.username }
        });
        
        if (user) throw new ConflictException("Username already in use");

        const passHash = this.hash.hashData(data.password);
        const newUser = await this.prisma.user.create({
            data: {
                username: data.username,
                passHash,
                role: data.admin ? "admin" : "user"
            }
        });

        const accessToken = this.jwt.createToken(newUser.id, newUser.role);
        return accessToken
    }

    async login(data: AuthContent) {
        const user = await this.prisma.user.findUnique({
            where: { username: data.username }
        });

        if (!user) throw new NotFoundException("Username not found");

        const isEqual = this.hash.compareData(data.password, user.passHash);
        if (!isEqual) throw new BadRequestException("Incorrect username or password");

        const accessToken = this.jwt.createToken(user.id, user.role);
        return accessToken
    }

    async logout(id: string) {
        await this.prisma.user.update({
            where: { id },
            data: { lastLogout: new Date() }
        })
    }

    async delete(id: string) {
        await this.prisma.user.delete({
            where: { id }
        });
    }
}