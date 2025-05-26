import { Global, Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";

@Global()
@Module({
    imports: [PrismaService],
    exports: [PrismaService]
})
export class UtilsModule { }