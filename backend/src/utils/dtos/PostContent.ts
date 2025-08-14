import { Transform } from "class-transformer";
import { IsIn, IsOptional, IsString, Length, Matches } from "class-validator";

export class PostContent {
    @IsString()
    @Length(1, 30)
    @Matches(/[a-zA-Z0-9\s\=\-!\)\(+&%$#@?]/)
    title: string;

    @Transform(({ value }) => value === undefined ? null : value)
    @IsOptional()
    @IsString()
    @Length(1, 500)
    @Matches(/[a-zA-Z0-9\s\=\-!\)\(+&%$#@?]/)
    text: string | null;

    @IsString()
    @IsIn(["music", "games", "movies & series", "other", "animes", "art"], { message: "Post doesn't match any category" })
    category: string
}