import { Module } from "@nestjs/common";
import { CommentController } from "src/controllers/comment.controller";
import { CommentService } from "src/services/comment.controller";

@Module({
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule {}