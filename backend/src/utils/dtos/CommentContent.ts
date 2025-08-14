import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID, Length, Matches } from "class-validator";

export class CommentContent {
    @Transform(({ value }) => value === undefined ? null : value)
    @IsOptional()
    @IsString()
    @Length(1, 500)
    @Matches(/[a-zA-Z0-9\s\=\-!\)\(+&%$#@?]/)
    text?: string;

    @IsOptional()
    @IsNumber()
    parentId?: number;
}