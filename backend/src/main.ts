import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import "dotenv/config"
import { ValidationPipe } from '@nestjs/common';
import cookieParser = require("cookie-parser")
import { AllExceptionsFilter } from './exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter())
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    stopAtFirstError: true
  }));
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
