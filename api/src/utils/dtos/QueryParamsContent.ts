import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString, Length, Matches, ValidateIf } from "class-validator";

export class QueryParamsContent {
    @IsOptional()
    @IsString()
    @Length(1, 500)
    @Matches(/[a-zA-Z0-9\s\=\-\!\)\(\+\&\%\$\#\@\?]/)
    text?: string;

    @IsOptional()
    @IsString()
    @IsIn(["Music", "Games", "Movies & series", "Others", "Animes", "Art"], { message: "Post doesn't match any category" })
    category?: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    page?: number
}