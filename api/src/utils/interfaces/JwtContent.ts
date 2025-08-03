export class JwtContent {
    sub: string;
    iat: number;
    role: "admin" | "user";
}