import { IsIn, IsOptional, IsString } from "class-validator";

type OrderByTypé = "today" | "weekly" | "monthly"

export class ReportQuerydto {
    @IsOptional()
    @IsString()
    @IsIn(["today", "weekly", "monthly"])
    orderBy?: OrderByTypé
}