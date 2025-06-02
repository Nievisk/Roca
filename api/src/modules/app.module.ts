import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UtilsModule } from "./utils.module";
import { AuthModule } from "./auth.module";
import { AuthMiddleware } from "src/utils/middlewares/AuthMiddleware";

@Module({
    imports: [UtilsModule, AuthModule, AuthMiddleware]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: "auth/logout", "method": RequestMethod.POST }
            )
    }
}