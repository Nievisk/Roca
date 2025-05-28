import jwt from "jsonwebtoken"
import { Injectable, UnauthorizedException } from "@nestjs/common";
import "dotenv/config"
import { IJwtToken } from "src/utils/interfaces/IJwtToken";

@Injectable()
export class JwtService {
    secret = process.env.ACCESS_TOKEN!

    createToken(id: string) {
        return jwt.sign({ sub: id }, this.secret, {
            expiresIn: "12h"
        })
    }

    checkToken(token: string): IJwtToken {
        try { return jwt.verify(token, this.secret) as unknown as IJwtToken }
        catch (error) { 
            throw new UnauthorizedException("Unauthorized access token.") 
        }
    }
}