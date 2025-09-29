import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UtilsModule } from "./utils.module";
import { AuthModule } from "./auth.module";
import { AuthMiddleware } from "src/utils/middlewares/AuthMiddleware";
import { PostModule } from "./post.module";
import { CommentModule } from "./comment.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { ReportModule } from "./report.module";

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                name: "short",
                ttl: 1000,
                limit: 3
            },
            {
                name: "medium",
                ttl: 60000,
                limit: 25
            },
            {
                name: "long",
                ttl: 600000,
                limit: 100
            }
        ]),
        UtilsModule, AuthModule, PostModule,
        CommentModule, ReportModule
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: "auth/logout", method: RequestMethod.POST },
                { path: "auth/user", method: RequestMethod.GET },
                { path: "auth", method: RequestMethod.DELETE },
                { path: "posts", method: RequestMethod.POST },
                { path: "posts/:id/comments", method: RequestMethod.POST }
            )
    }
}