import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ReportContent } from "src/utils/interfaces/ReportContent";
import { endOfDay, startOfDay, startOfISOWeek, startOfMonth } from "date-fns"

type QueryType = "today" | "weekly" | "monthly"

@Injectable()
export class ReportService {
    constructor(private prisma: PrismaService) { }

    async find(query?: QueryType) {
        let whereCondition: any = {}

        switch (query) {
            case "today":
                whereCondition = {
                    createdAt: {
                        gte: startOfDay(new Date()),
                        lt: endOfDay(new Date())
                    }
                };
                break;

            case "weekly":
                whereCondition = {
                    createdAt: {
                        gte: startOfISOWeek(new Date()),
                        lt: new Date()
                    }
                };
                break;

            case "monthly":
                whereCondition = {
                    createdAt: {
                        gte: startOfMonth(new Date()),
                        lt: new Date()
                    }
                };
                break;

            default: break;
        }

        const reports = await this.prisma.report.findMany({
            where: whereCondition,
            select: {
                id: true,
                reason: true,
                text: true,
                createdAt: true,
                Post: {
                    select: {
                        id: true,
                        title: true,
                        image: true,
                        text: true,
                        User: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
                Comment: {
                    select: {
                        id: true,
                        text: true,
                        image: true,
                        User: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
                User: {
                    select: {
                        username: true
                    }
                }
            }
        })

        return reports;
    }

    async create(data: ReportContent) {
        const post = await this.prisma.post.findUnique({ where: { id: data.postId } });

        if (!post) throw new NotFoundException(`Post "${data.postId}" not found`)
        if (post.userId === data.userId) throw new ForbiddenException("Cannot report own post")

        const existingReport = await this.prisma.report.findFirst({
            where: {
                postId: data.postId,
                commentId: data.commentId,
                userId: data.userId,
            },
        });

        if (existingReport) throw new ConflictException(`Duplicate report not allowed`);

        await this.prisma.report.create({
            data: {
                postId: data.postId,
                commentId: data.commentId,
                userId: data.userId,
                reason: data.reason,
            },
        })
    }
}