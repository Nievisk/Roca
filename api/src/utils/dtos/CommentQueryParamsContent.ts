import { Transform } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class CommentQueryParamsContent {
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    parentId?: number;


    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(2)
    page: number;
}