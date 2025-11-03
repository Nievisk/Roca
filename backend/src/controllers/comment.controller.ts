import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CommentService } from "src/services/comment.service";
import { User } from "src/utils/decorators/user";
import { CommentContent } from "src/utils/dtos/CommentContent";
import { CommentParamsContent } from "src/utils/dtos/CommentParamsContent";

import { multerConst } from "src/utils/multer/multer";

@Controller("posts/:id/comments")
export class CommentController {
    constructor(private commentservice: CommentService) { }

    @Post()
    @UseInterceptors(FileInterceptor("image", multerConst))
    async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CommentContent, @User("id") id: string, @Param("id") postId: number) {

        if (!file && (!dto.text || dto.text.trim() === "")) throw new BadRequestException("Either file or text must be provided");

        await this.commentservice.create({ ...dto, image: file?.path, userId: id, postId });
        return "Ok";
    }

    @Get()
    async find(@Param("id") postId: number, @Query() dto: CommentParamsContent) {
        const comments = await this.commentservice.find({ ...dto, postId });
        return comments;
    }
}