import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async register(data: Omit<User, "id">) { }

    async login(data: Omit<User, "id">) { }
}