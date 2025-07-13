import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs"

@Injectable()
export class HashService {
    hashData(str: string) {
        return bcrypt.hashSync(str, 10);
    }

    compareData(str: string, hashedStr: string) {
        return bcrypt.compareSync(str, hashedStr);
    }
}