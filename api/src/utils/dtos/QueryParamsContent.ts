import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString, Length, Matches, ValidateIf } from "class-validator";

export class QueryParamsContent {
    @IsString()
    @Length(1, 500)
    @Matches(/[a-zA-Z0-9\s\=\-\!\)\(\+\&\%\$\#\@\?]/)
    text: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    page?: number
}