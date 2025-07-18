import { BadRequestException, Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { PostService } from "src/services/post.service";
import { User } from "src/utils/decorators/user";
import { QueryParamsContent } from "src/utils/dtos/QueryParamsContent";
import { PostContent } from "src/utils/dtos/PostContent";
import { multerConst } from "src/utils/multer/multer";

@Controller("posts")
export class PostController {
    constructor(private postService: PostService) { }

    @Post()
    @UseInterceptors(FileInterceptor("image", multerConst))
    async create(@User("id") id: string, @Body() dto: PostContent, @UploadedFile() file: Express.Multer.File) {

        if (!file && (!dto.text || dto.text.trim() === "")) throw new BadRequestException("Either file or text should exist");

        await this.postService.create(id, { image: file?.path, ...dto });
        return "Ok"
    }

    @Get("search")
    async search(@Query() dto: QueryParamsContent) {
        const data = await this.postService.search(dto);
        return data
    }

    @Get(":id")
    async onePost(@Param("id") id: number) {
        const posts = await this.postService.onePost(id);
        return posts
    }
}
