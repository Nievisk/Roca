import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { IauthData } from "src/utils/interfaces/iAuthData";
import { HashService } from "./hash.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private hash: HashService,
        private jwt: JwtService
    ) { }

    async register(data: IauthData) {
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

    async login(data: IauthData) {
        const user = await this.prisma.user.findUnique({
            where: { username: data.username }
        });
        if (!user) throw new NotFoundException("Username not found");

        const isEqual = this.hash.compareData(data.username, user.passHash);
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
}