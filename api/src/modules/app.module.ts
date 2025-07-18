import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UtilsModule } from "./utils.module";
import { AuthModule } from "./auth.module";
import { AuthMiddleware } from "src/utils/middlewares/AuthMiddleware";
import { PostModule } from "./post.module";
import { CommentModule } from "./comment.module";

@Module({
    imports: [UtilsModule, AuthModule, PostModule, CommentModule]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: "auth/logout", method: RequestMethod.POST },
                { path: "auth", method: RequestMethod.DELETE },
                { path: "posts", method: RequestMethod.POST },
                { path: "posts/:id/comments", method: RequestMethod.POST }
            )
    }
}