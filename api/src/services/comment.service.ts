import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { commentContent } from "src/utils/interfaces/CommentContent";
import { FindCommentsQuery } from "src/utils/interfaces/FindCommentsQuery";

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) { }

    async create(data: commentContent) {
        const existingPost = await this.prisma.post.findUnique({ where: { id: data.postId } });

        if (!existingPost) throw new BadRequestException("Post not found");

        await this.prisma.comment.create({
            data: { ...data }
        });
    }

    async find(data: FindCommentsQuery) {
        const skip = (data.page - 1) * (data.parentId ? 5 : 25);

        const totalComments = await this.prisma.comment.count({
            where: {
                postId: data.parentId,
                parentId: data.parentId
            },
            skip
        })

        const totalPages = Math.ceil(totalComments / (data.parentId ? 5 : 25));;

        const comments = await this.prisma.comment.findMany({
            where: {
                postId: data.parentId,
                parentId: data.parentId
            },
            skip,
            take: data.parentId ? 5 : 25,
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                text: true,
                image: true,
                createdAt: true,
                User: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return { comments, totalPages, totalComments };
    }

    async delete(id: number) {
        await this.prisma.comment.delete({ where: { id } })
    }
}