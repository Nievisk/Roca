import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { RegisterContent } from "src/utils/interfaces/RegisterContent";
import { HashService } from "./hash.service";
import { JwtService } from "./jwt.service";
import { LoginContent } from "src/utils/dtos/LoginContent";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private hash: HashService,
        private jwt: JwtService
    ) { }

    async register(data: RegisterContent) {
        const user = await this.prisma.user.findUnique({
            where: { username: data.username }
        });

        if (user) throw new ConflictException("Username already in use");

        const passHash = this.hash.hashData(data.password);
        const newUser = await this.prisma.user.create({
            data: {
                username: data.username,
                passHash
            }
        });

        const accessToken = this.jwt.createToken(newUser.id);
        return accessToken
    }

    async login(data: LoginContent) {
        const user = await this.prisma.user.findUnique({
            where: { username: data.username }
        });

        if (!user) throw new NotFoundException("Username not found");

        const isEqual = this.hash.compareData(data.password, user.passHash);
        if (!isEqual) throw new BadRequestException("Incorrect username or password");

        const accessToken = this.jwt.createToken(user.id);
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

    async status(id: string) {
        return await this.prisma.user.findUnique({
            where: { id },
            select: { username: true }
        })
    }
}