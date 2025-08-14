import { Module } from "@nestjs/common";
import { ReportController } from "src/controllers/report.controller";
import { ReportService } from "src/services/report.service";


@Module({
    controllers: [ReportController],
    providers: [ReportService]
})
export class ReportModule {}