import { Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ReportService } from "src/services/report.service";
import { User } from "src/utils/decorators/user";
import { ReportQuerydto } from "src/utils/dtos/ReportQuerydto";
import { ReportContent } from "src/utils/dtos/ReportContent";
import { RoleGuard } from "src/utils/guards/RoleGuard.guard";

@Controller("reports")
export class ReportController {
    constructor(private reportService: ReportService) { }

    @Get()
    @UseGuards(RoleGuard)
    async reports(@Query() dto: ReportQuerydto) {
        const reports = await this.reportService.find(dto?.orderBy);
        return reports
    }

    @Post("posts/:id")
    async reportPost(@User("id") userId: string, @Param("id") id: string, dto: ReportContent) {
        await this.reportService.create({
            ...dto,
            postId: Number(id),
            userId,
        });

        return "Ok"
    }

    @Post("comments/:id")
    async reportComment(@User("id") userId: string, @Param("id") id: string, dto: ReportContent) {
        await this.reportService.create({
            ...dto,
            commentId: Number(id),
            userId,
        });

        return "Ok"
    }
}