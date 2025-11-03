import { Post } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PostParamsContent } from "src/utils/dtos/PostParamsContent";

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }

    async create(id: string, data: Pick<Post, "text" | "category" | "image" | "title">) {
        await this.prisma.post.create({
            data: { ...data, userId: id }
        })
    }

    async search({ title, page = 1, category }: PostParamsContent) {
        const count = await this.prisma.post.count({
            where: {
                OR: [
                    { title: { contains: title, mode: "insensitive" } },
                    { category: { equals: category } },

                ]
            }
        });

        if (count === 0) throw new NotFoundException("No posts was found")

        const pageSize = 5;
        const totalPages = Math.ceil(count / pageSize);
        const pageNumber = Math.min(page, totalPages);

        const posts = await this.prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: title, mode: "insensitive" } },
                    { category: { equals: category } },

                ]
            },
            include: {
                User: {
                    select: {
                        username: true
                    }
                },
            },
            take: pageSize,
            skip: (pageNumber - 1) * pageSize,
            orderBy: { createdAt: "desc" },
        })
        return {
            posts,
            total_posts: count,
            page: pageNumber,
            total_pages: totalPages
        }
    }

    async onePost(id: number) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            select: {
                id: true,
                text: true,
                image: true,
                title: true,
                createdAt: true,
                User: {
                    select: {
                        username: true
                    }
                },
                Comments: {
                    select: {
                        id: true,
                        text: true,
                        image: true,
                        createdAt: true,
                        User: {
                            select: {
                                username: true
                            }
                        },
                        replies: {
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
                            },
                            orderBy: { createdAt: "desc" },
                            take: 5
                        }
                    },
                    take: 25,
                    orderBy: { createdAt: "desc" }
                }
            }
        })

        return post ?? []
    }
}