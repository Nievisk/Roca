import { Optional } from "@nestjs/common";
import { IsEnum, IsString, MaxLength } from "class-validator";
import { Reason } from "@prisma/client"

export class ReportContent {
    @IsString()
    @IsEnum(Reason)
    reason: Reason;
    
    @Optional()
    @IsString()
    @MaxLength(100)
    text?: string;
}