import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString, Length, Matches, ValidateIf } from "class-validator";

export class PostParamsContent {
    @IsOptional()
    @IsString()
    @Length(1, 500)
    @Matches(/[a-zA-Z0-9\s\=\-\!\)\(\+\&\%\$\#\@\?]/)
    title?: string;

    @IsOptional()
    @IsString()
    @IsIn(["music", "games", "movies&series", "other", "animes", "art"], { message: "Post doesn't match any category" })
    category?: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    page?: number
}