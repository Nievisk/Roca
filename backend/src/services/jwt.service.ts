import * as jwt from "jsonwebtoken"
import { Injectable, UnauthorizedException } from "@nestjs/common";
import "dotenv/config"
import { JwtContent } from "src/utils/interfaces/JwtContent";

@Injectable()
export class JwtService {
    secret = process.env.ACCESS_TOKEN!

    createToken(id: string) {
        return jwt.sign({ sub: id }, this.secret, {
            expiresIn: "12h"
        })
    }

    checkToken(token: string): JwtContent {
        try { return jwt.verify(token, this.secret) as unknown as JwtContent }
        catch (error) { 
            throw new UnauthorizedException("Failed. It can be due to expired token or something else") 
        }
    }
}