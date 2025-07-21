import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { MulterError } from "multer";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let statusCode = 500
        let message = "500 Internal Server Error";

        if (exception instanceof MulterError) {
            if (exception.code === 'LIMIT_FILE_SIZE') {
                statusCode = 413;
                message = 'File size exceeds the limit';
            }
            else {
                statusCode = 400;
                message = exception.message;
            }
        }

        response.status(statusCode).json({
            statusCode,
            message,
            time: new Date().toISOString(),
        })
    }
}