import { Post } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { Injectable } from "@nestjs/common";
import { QueryParamsContent } from "src/utils/dtos/QueryParamsContent";
import { take } from "rxjs";

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }

    async create(id: string, data: Pick<Post, "text" | "category" | "image" | "title">) {
        await this.prisma.post.create({
            data: { ...data, userId: id }
        })
    }

    async search({ text, page = 1 }: QueryParamsContent) {
        const whereCondition: any = {
            OR: [
                { text: { contains: text, mode: "insensitive" } },
                { title: { contains: text, mode: "insensitive" } },
                {
                    Comments: {
                        some: {
                            text: { contains: text, mode: "insensitive" }
                        }
                    }
                }
            ]
        };

        const count = await this.prisma.post.count({ where: whereCondition });

        const pageSize = 20;
        const totalPages = Math.ceil(count / pageSize);
        const pageNumber = Math.min(page, totalPages);

        const posts = await this.prisma.post.findMany({
            where: whereCondition,
            include: {
                User: {
                    select: {
                        username: true
                    }
                },
                Comments: {
                    select: {
                        text: true,
                        image: true,
                        createdAt: true
                    },
                    take: 1,
                }
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